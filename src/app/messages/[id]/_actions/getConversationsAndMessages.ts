'use server'

import db from '@/db/db'
import {
  ConversationWithMessages,
  ConversationWithMessagesAndParticipants,
  ConversationWithParticipants,
} from '@/lib/types'

export async function getConversationWithParticipants(
  username: string,
  allBlocks: string[]
) {
  const conversations: ConversationWithParticipants[] =
    await db.conversation.findMany({
      where: {
        conversation_participants: {
          some: { participant_username: username },
          every: { participant_username: { notIn: allBlocks } },
        },
      },
      include: {
        conversation_participants: {
          select: {
            participant_username: true,
          },
          where: { participant_username: { not: username } },
        },
      },
      orderBy: {
        updated_at: 'desc',
      },
    })

  return conversations
}

export async function getConversationWithMessages(
  username: string,
  conversationId: string
) {
  const selectedConversation: ConversationWithMessages | null =
    await db.conversation.findUnique({
      where: {
        conversation_participants: {
          some: { participant_username: username },
        },
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    })

  return selectedConversation
}

export async function getConversationWithMessagesAndParticipants(
  username: string,
  conversationId: string,
  allBlocks: string[]
) {
  const selectedConversation: ConversationWithMessagesAndParticipants | null =
    await db.conversation.findUnique({
      where: {
        conversation_participants: {
          some: { participant_username: username },
          every: { participant_username: { notIn: allBlocks } },
        },
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            created_at: 'asc',
          },
        },
        conversation_participants: {
          select: {
            participant_username: true,
          },
          where: { participant_username: { not: username } },
        },
      },
    })
  return selectedConversation
}
