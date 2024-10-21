'use client'

import ConversationSnippets from './ConversationSnippets'
import ChatContent from './ChatContent'
import { DialogConversations } from './DialogConversations'
import {
  ConversationWithMessages,
  ConversationWithParticipants,
} from '@/lib/types'
import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'
import revalidatePathAction from '../_actions/revalidatePathAction'

export default function RealtimeChat({
  username,
  conversations,
  selectedConversation,
}: {
  username: string
  conversations: ConversationWithParticipants[]
  selectedConversation: ConversationWithMessages
}) {
  const supabase = createClient()

  const conversationIdsArray = conversations.map(
    (conversation) => conversation.id
  )

  const conversationIdsString = conversationIdsArray.join(',')

  //   // TO-DO: add channel for new conversations

  //   useEffect(() => {
  //     const chat_channel = supabase
  //       .channel('chat-channel')
  //       .on(
  //         'postgres_changes',
  //         {
  //           event: 'UPDATE',
  //           schema: 'public',
  //           table: 'conversation',
  //           filter: `id=in.(${conversationIdsString})`,
  //         },
  //         (payload) => {
  //           console.log('Change received!', payload, username)
  //           revalidatePathAction(`/messages/${selectedConversation.id}`)
  //         }
  //       )
  //       .subscribe((status) => {
  //         if (status === 'SUBSCRIBED') {
  //           console.log('Chat Subscription is active')
  //         } else {
  //           console.log('Chat Subscription status', status)
  //         }
  //       })
  //     return () => {
  //       console.log('Unsubscribing from chat channel')
  //       supabase.removeChannel(chat_channel)
  //     }
  //   }, [])

  return (
    <div className="h-full flex flex-col items-center lg:flex-row lg:p-4 gap-4">
      <div className="hidden lg:block">
        <ConversationSnippets
          conversations={conversations}
          username={username}
        />
      </div>
      <div className="lg:hidden">
        <DialogConversations
          conversations={conversations}
          username={username}
        />
      </div>
      <div className="w-full">
        <ChatContent
          username={username}
          conversation={selectedConversation}
          status={selectedConversation.status}
        />
      </div>
    </div>
  )
}
