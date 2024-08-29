'use client'

import SubmitButton from '@/components/SubmitButton'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SignalComment } from '@/lib/types'
import { useFormState } from 'react-dom'
import { addComment } from '../_actions/addComment'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CommentSection({
  comments,
  signalId,
  hasUsername,
}: {
  comments: SignalComment[]
  signalId: string
  hasUsername: boolean
}) {
  const [error, action] = useFormState(addComment, {})
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="font-bold text-lg ">Comment Section</h1>
      <div className="py-4 w-full">
        {comments.length ? (
          comments.map((comment) => {
            return (
              <div key={comment.id} className="flex gap-4">
                <div className="flex flex-col items-end font-semibold text-muted-foreground">
                  <p>{comment.created_at.toLocaleString()}</p>
                  <p>{comment.created_by_username || '[deleted]'}</p>
                </div>
                <h1>{comment.content}</h1>
              </div>
            )
          })
        ) : (
          <div>There are no comments yet.</div>
        )}
      </div>
      {!hasUsername ? (
        <div className="py-8 flex flex-col items-center">
          <p>You must create a username before commenting</p>
          <Link className="my-3" href="/profile">
            <Button>Update Profile</Button>
          </Link>
        </div>
      ) : (
        <form action={action} className="grid w-full">
          <Input type="hidden" name="signalId" value={`${signalId}`} />
          <Textarea
            name="content"
            className="min-h-28"
            placeholder="Enter a comment"
            maxLength={100}
          />
          {error?.content && (
            <div className="text-destructive text-sm">{error.content}</div>
          )}
          <div className="grid place-items-end">
            <SubmitButton />
          </div>
        </form>
      )}
    </div>
  )
}
