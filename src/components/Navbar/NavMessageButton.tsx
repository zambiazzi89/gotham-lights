'use client'

import { Conversation } from '@/lib/types'
import { NavButton } from './NavButton'

export default function NavMessageButton({
  hasNewMessages,
  conversations,
}: {
  hasNewMessages: string
  conversations: Conversation[]
}) {
  return (
    <NavButton
      title="Messages"
      // notification={hasNewMessages}
      href="/messages"
    />
  )
}
