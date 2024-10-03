'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'

export async function approveMessageRequest(
  conversationId: string,
  newStatus: string
) {
  // Only perform the action if user is logged in
  const profile = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  // Continue if logged in and has username
  const conversation = await db.conversation.update({
    data: {
      status: newStatus,
      updated_at: new Date(),
    },
    where: {
      id: conversationId,
    },
  })

  redirect(`/messages/${conversation.id}`)
}
