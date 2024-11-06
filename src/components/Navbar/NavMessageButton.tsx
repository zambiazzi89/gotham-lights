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
          console.debug('Change received!', payload, username)
          if (!conversationIdsArray.includes(payload.new.conversation_id)) {
            setHasNewMessages(true)
            console.debug('New Conversation!')
            console.debug('conversationIdsString', conversationIdsString)
            console.debug(
              'payload.new.conversation_id',
              payload.new.conversation_id
            )
            setConversationIdsString((conversationIdsString) =>
              conversationIdsString.length === 0
                ? payload.new.conversation_id
                : conversationIdsString.concat(',', payload.new.conversation_id)
            )
            console.debug('Revalidate pathname', pathname)
            document.title = 'gotham lights (new message!)'
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug('Message Subscription is active')
        } else {
          console.debug('Message Subscription status', status)
        }
      })
    return () => {
      console.debug('Unsubscribing from message_channel')
      supabase.removeChannel(message_channel)
    }
  }, [])

  useEffect(() => {
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
          console.debug('Change received!', payload, username)
          if (payload.new.last_sent_by !== username) {
            setHasNewMessages(!payload.new.read)
            payload.new.read
              ? (document.title = 'gotham lights')
              : (document.title = 'gotham lights (new message!)')
            console.debug('Has new messages? ', !payload.new.read)
            revalidatePathAction(pathname)
            revalidatePathAction('/messages')
            console.debug('Revalidate pathname')
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug('Conversation Subscription is active')
        } else {
          console.debug('Conversation Subscription status', status)
        }
      })
    return () => {
      console.debug('Unsubscribing from conversation_channel')
      supabase.removeChannel(conversation_channel)
    }
  }, [conversationIdsString])

  return (
    <NavButton
      title="Messages"
      notification={hasNewMessages}
      href="/messages"
    />
  )
}
