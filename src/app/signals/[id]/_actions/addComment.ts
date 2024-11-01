'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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
  const { profile } = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data

  await db.comment.create({
    data: {
      content: resultData.content,
      created_by_username: profile.username,
      signal_id: resultData.signalId,
    },
  })

  redirect(`/signals/${resultData.signalId}`)
}
