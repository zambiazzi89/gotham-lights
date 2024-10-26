'use client'

import { Conversation } from '@/lib/types'
import { useEffect, useState } from 'react'
import { NavButton } from './NavButton'
import { createClient } from '@/utils/supabase/client'
import { usePathname } from 'next/navigation'
import revalidatePathAction from '@/app/messages/[id]/_actions/revalidatePathAction'

export default function NavMessageButton({
  username,
  conversations,
}: {
  username: string
  conversations: Conversation[]
}) {
  const pathname = usePathname()
  console.debug(pathname)

  const initialHasNewMessages = conversations
    ? conversations
        .map((conversation) => {
          if (conversation.last_sent_by !== username) {
            return conversation.read
          }
        })
        .includes(false)
    : false

  const conversationIdsArray = conversations.map(
    (conversation) => conversation.id
  )

  const [conversationIdsString, setConversationIdsString] = useState(
    conversationIdsArray.join(',')
  )

  const supabase = createClient()

  const [hasNewMessages, setHasNewMessages] = useState(initialHasNewMessages)

  useEffect(() => {
    const message_channel = supabase
      .channel('message-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
          filter: `to_username=eq.${username}`,
        },
        (payload) => {
          console.log('Change received!', payload, username)
          if (!conversationIdsArray.includes(payload.new.conversation_id)) {
            setHasNewMessages(true)
            console.log('New Conversation!')
            setConversationIdsString((conversationIdsString) =>
              conversationIdsString.concat(',', payload.new.conversation_id)
            )
            console.log('Revalidate pathname')
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Message Subscription is active')
        } else {
          console.log('Message Subscription status', status)
        }
      })

    const conversation_channel = supabase
      .channel('conversation-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversation',
          filter: `id=in.(${conversationIdsString})`,
        },
        (payload) => {
          console.log('Change received!', payload, username)
          if (payload.new.last_sent_by !== username) {
            setHasNewMessages(!payload.new.read)
            console.log('Has new messages? ', !payload.new.read)
            revalidatePathAction(pathname)
            console.log('Revalidate pathname')
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Conversation Subscription is active')
        } else {
          console.log('Conversation Subscription status', status)
        }
      })
    return () => {
      console.log('Unsubscribing from channel')
      supabase.removeChannel(message_channel)
      supabase.removeChannel(conversation_channel)
    }
  }, [conversationIdsString])

  console.log(username, 'hasNewMessages', hasNewMessages)

  return (
    <NavButton
      title="Messages"
      notification={hasNewMessages}
      href="/messages"
    />
  )
}
