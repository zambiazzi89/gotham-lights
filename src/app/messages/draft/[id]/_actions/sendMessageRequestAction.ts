'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  username: z
    .string()
    .min(4, {
      message: 'Username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Username length must be between 4 and 12 characters.',
    }),
  content: z
    .string()
    .min(1, {
      message:
        'Your message content length must be between 1 and 1000 characters.',
    })
    .max(1000, {
      message:
        'Your message content length must be between 1 and 10000 characters.',
    }),
})

export async function sendMessageRequest(
  prevState: unknown,
  formData: FormData
) {
  // Only perform the action if user is logged in
  const profile = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  // Continue if logged in and has username

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  const conversation = await db.conversation.create({
    data: {
      status: 'Pending',
      last_message: data.content,
      last_sent_by: profile.username,
      read: false,
    },
  })

  await db.conversation_participant.create({
    data: {
      conversation_id: conversation.id,
      participant_username: profile.username,
    },
  })

  await db.conversation_participant.create({
    data: {
      conversation_id: conversation.id,
      participant_username: data.username,
    },
  })

  await db.message.create({
    data: {
      conversation_id: conversation.id,
      from_username: profile.username,
      to_username: data.username,
      content: data.content,
    },
  })

  redirect('/messages')
}
