'use server'

import db from '@/db/db'

export default async function updateConversationAsRead(conversationId: string) {
  await db.conversation.update({
    where: { id: conversationId },
    data: { read: true },
  })
}
