'use client'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Message } from '@/lib/types'
import { useEffect, useRef } from 'react'

export default function ChatMessages({
  username,
  messages,
}: {
  username: string | null
  messages: Message[]
}) {
  const cardRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length > 0) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth' }) //Use scrollIntoView to automatically scroll to my ref
    }
  }, [messages.length])

  return (
    <div className="h-[60svh] bg-background flex-grow mb-4 border-2 overflow-y-auto">
      <ScrollArea className="h-full  px-2">
        {messages.map((message, i) => {
          return username === message.from_username ? (
            <Card
              ref={i + 1 === messages.length ? cardRef : null}
              key={message.id}
              className="w-fit p-4 my-2 bg-primary-20 ml-auto mr-2 grid"
            >
              <div>{message.content}</div>
              <div className="font-sans text-xs text-muted-foreground place-self-end">
                {message.created_at.toLocaleString([], {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </Card>
          ) : (
            <Card
              ref={i + 1 === messages.length ? cardRef : null}
              key={message.id}
              className="w-fit p-4 my-2 bg-secondary"
            >
              <div>{message.content}</div>
              <div className="font-sans text-xs text-muted-foreground">
                {message.created_at.toLocaleString([], {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </Card>
          )
        })}
      </ScrollArea>
    </div>
  )
}
