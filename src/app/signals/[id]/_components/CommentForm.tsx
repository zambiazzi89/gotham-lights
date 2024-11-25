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
        placeholder="Enter a comment"
        className="min-h-16"
        minLength={1}
        maxLength={100}
        required
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
