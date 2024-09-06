'use client'

import { SignalComment } from '@/lib/types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
            <Textarea
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
              <DropdownMenuLabel>My Comment</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEdit(!edit)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DeleteCommentWithDialog id={comment.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full flex gap-4 items-end text-muted-foreground">
        <div className="flex flex-col flex-grow">
          <p>{comment.created_by_username || '[deleted]'}</p>
          <p>{comment.created_at.toLocaleString()}</p>
        </div>
        {comment.updated_at &&
          comment.updated_at.toLocaleString() >
            comment.created_at.toLocaleString() && <p>{'[Edited]'}</p>}
      </div>
    </div>
  )
}
