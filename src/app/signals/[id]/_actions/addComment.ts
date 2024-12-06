'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { z } from 'zod'
import CommentEmail from '../_components/CommentEmail'

const formSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: 'Your comment must not be empty.',
    })
    .max(200, {
      message: 'Your comment must have a maximum of 200 characters',
    }),
  signalId: z.string(),
})

export async function addComment(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in and has username
  const { profile, allBlocks } = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  // Check if ID exists and if it wasn't created by a blocked username
  const isSignalValid = await db.signal.count({
    where: {
      id: data.signalId,
      created_by_username: { notIn: allBlocks },
    },
  })

  if (!isSignalValid) {
    console.error('Signal is not valid')
    redirect('/error?code=invalid_signal')
  }

  await db.comment.create({
    data: {
      content: data.content,
      created_by_username: profile.username,
      signal_id: data.signalId,
    },
  })

  await db.signal_read_by_username.updateMany({
    where: {
      signal_id: data.signalId,
    },
    data: {
      read: false,
    },
  })

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Gotham Lights <noreply@gothamlights.com>',
      to: ['zambiazzi89@gmail.com'],
      subject: 'Comment created!',
      text: `Comment created by user: ${profile.username}\nContent: ${data.content}`,
      react: CommentEmail({
        username: profile.username,
        content: data.content,
      }),
    })
  } catch (error) {
    console.error(error)
    redirect('/error?code=email_not_sent')
  }

  redirect(`/signals/${data.signalId}`)
}
