'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'
import { addComment } from '../_actions/addComment'
import SubmitButton from '@/components/SubmitButton'
import { useRef } from 'react'

export default function CommentForm({ signalId }: { signalId: string }) {
  const [error, action] = useFormState(addComment, {})
  const ref = useRef<HTMLFormElement>(null)
  return (
    <form
      ref={ref}
      action={(formData) => {
        ref.current?.reset()
        action(formData)
      }}
      className="grid w-full"
    >
      <Input type="hidden" name="signalId" value={`${signalId}`} />
      <Textarea
        name="content"
        // className="min-h-28"
        placeholder="Enter a comment"
        minLength={1}
        maxLength={100}
        // className="border-primary"
      />
      {error?.content && (
        <div className="text-destructive text-sm">{error.content}</div>
      )}
      <div className="grid place-items-end pt-3">
        <SubmitButton />
      </div>
    </form>
  )
}
