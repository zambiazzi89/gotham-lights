'use client'

import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { sendMessage } from '../_actions/sendMessage'
import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ChatTextarea({
  conversationId,
}: {
  conversationId: string
}) {
  const [error, action] = useFormState(sendMessage, {})
  const ref = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  return (
    <form
      ref={ref}
      action={(formData) => {
        ref.current?.reset()
        action(formData)
      }}
      className="flex gap-4"
    >
      <Input type="hidden" name="conversationId" value={`${conversationId}`} />
      <Textarea
        name="content"
        placeholder="Type your message"
        minLength={1}
        maxLength={1000}
        className="min-h-24"
      />
      {error?.content && (
        <div className="text-destructive text-sm">{error.content}</div>
      )}
      <div className="grid place-items-end">
        <Button
          type="submit"
          disabled={pending}
          variant={'outline'}
          className="h-full"
        >
          {pending ? 'Saving' : 'Send'}
        </Button>
      </div>
    </form>
  )
}
