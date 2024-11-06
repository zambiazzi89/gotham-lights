'use client'

import DeleteCommentWithDialog from '@/components/DeleteCommentWithDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignalComment } from '@/lib/types'
import { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { deleteComment } from '../_actions/deleteActions'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { editComment } from '../_actions/editComment'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/SubmitButton'

export default function MyCommentsCard({
  comment,
}: {
  comment: SignalComment
}) {
  const [edit, setEdit] = useState(false)
  const [error, action] = useFormState(editComment, {})
  const router = useRouter()

  return (
    <div className="h-fit p-3 shadow-md flex gap-4 justify-between items-center">
      {edit ? (
        <form
          action={(formData) => {
            action(formData)
            setEdit(!edit)
            router.refresh()
          }}
          className="grid w-full"
        >
          <Input type="hidden" name="commentId" value={`${comment.id}`} />
          <Input
            name="content"
            defaultValue={comment.content}
            placeholder="Enter a comment"
            minLength={1}
            maxLength={100}
          />
          {error?.content && (
            <div className="text-destructive text-sm">{error.content}</div>
          )}
          <div className="flex gap-4 justify-end pt-3">
            <Button
              variant={'ghost'}
              onClick={() => {
                setEdit(false)
              }}
            >
              Cancel
            </Button>
            <SubmitButton />
          </div>
        </form>
      ) : (
        <Link
          href={`/signals/${comment.signal_id}`}
          className="grow border-r-2 pr-3"
        >
          <div>{comment.content}</div>
          <div className="text-xs font-sans">
            {comment.updated_at && comment.updated_at > comment.created_at
              ? comment.updated_at.toLocaleString([], {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : comment.created_at.toLocaleString([], {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
          </div>
        </Link>
      )}
      <div className="grid place-items-center py-3 px-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdMoreVert className="text-xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setEdit(!edit)
              }}
            >
              Edit
            </DropdownMenuItem>
            <DeleteCommentWithDialog
              id={comment.id}
              deleteAction={deleteComment}
              objectToDelete="comment"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
