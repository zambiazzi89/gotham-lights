'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  conversationId: z.string(),
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

export async function sendMessage(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

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

  const otherUser = await db.conversation_participant.findMany({
    where: {
      conversation_id: data.conversationId,
      NOT: {
        participant_username: profile.username,
      },
    },
  })

  if (otherUser.length > 1) {
    console.error(
      `More than one participant found for conversation ID ${data.conversationId} other than ${profile.username}`
    )
    redirect('/error?code=conversation_participants')
  }

  if (!otherUser.length) {
    console.error(
      `No other participant found for conversation ID ${data.conversationId} other than ${profile.username}`
    )
    redirect('/error?code=conversation_participants')
  }

  const message = await db.message.create({
    data: {
      conversation_id: data.conversationId,
      from_username: profile.username,
      to_username: otherUser[0].participant_username,
      content: data.content,
    },
  })

  await db.conversation.update({
    data: {
      last_message: message.content,
      last_sent_by: profile.username,
      read: false,
      updated_at: message.created_at,
    },
    where: {
      id: data.conversationId,
    },
  })

  redirect(`/messages/${data.conversationId}`)
}
