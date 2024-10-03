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

  const message = await db.message.create({
    data: {
      conversation_id: data.conversationId,
      from_username: profile.username,
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
