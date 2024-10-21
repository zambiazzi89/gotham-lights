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

  const conversationIdsString = conversationIdsArray.join(',')

  const supabase = createClient()

  const [hasNewMessages, setHasNewMessages] = useState(initialHasNewMessages)

  // TO-DO: add channel for new conversations

  useEffect(() => {
    const message_button_channel = supabase
      .channel('message-button-channel')
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
            console.debug('has new messages? ', !payload.new.read)
            revalidatePathAction(pathname)
            console.debug('revalidate pathname')
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug('Message Button Subscription is active')
        } else {
          console.debug('Message Button Subscription status', status)
        }
      })
    return () => {
      console.debug('Unsubscribing from channel')
      supabase.removeChannel(message_button_channel)
    }
  }, [])

  console.debug(username, 'hasNewMessages', hasNewMessages)

  return (
    <NavButton
      title="Messages"
      notification={hasNewMessages}
      href="/messages"
    />
  )
}
