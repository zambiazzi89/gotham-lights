'use server'

import db from '@/db/db'

export default async function setConversationAsRead(conversationId: string) {
  await db.conversation.update({
    where: { id: conversationId },
    data: { read: true },
  })
}
