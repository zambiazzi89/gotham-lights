'use client'

import { SignalComment } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MdMoreVert } from 'react-icons/md'
import DeleteCommentWithDialog from '@/components/DeleteCommentWithDialog'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { Textarea } from '@/components/ui/textarea'
import SubmitButton from '@/components/SubmitButton'
import { editComment } from '@/app/profile/my-activity/_actions/editComment'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { deleteComment } from '@/app/profile/my-activity/_actions/deleteActions'

export default function MyComment({ comment }: { comment: SignalComment }) {
  const [edit, setEdit] = useState(false)
  const [error, action] = useFormState(editComment, {})
  const router = useRouter()

  return (
    <div className="bg-accent rounded-lg p-2 flex flex-col gap-4">
      <div className="flex">
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
          <div className="flex-grow">{comment.content}</div>
        )}
        <div>
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
      <div className="w-full flex gap-4 items-end text-muted-foreground">
        <div className="flex flex-col flex-grow">
          <div className="font-semibold">{comment.created_by_username}</div>
          <div className="font-sans text-sm flex gap-2">
            <div>
              {comment.created_at.toLocaleString([], {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            {comment.updated_at && comment.updated_at > comment.created_at && (
              <div className="italic font-semibold">{'[Edited]'}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
