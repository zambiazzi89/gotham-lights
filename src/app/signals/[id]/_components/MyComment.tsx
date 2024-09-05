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

export default function MyComment({ comment }: { comment: SignalComment }) {
  const [edit, setEdit] = useState(false)
  const [error, action] = useFormState(editComment, {})
  const router = useRouter()

  return (
    <div key={comment.id} className="flex gap-4">
      <div className="flex flex-col items-end font-semibold text-muted-foreground">
        <p>{comment.created_at.toLocaleString()}</p>
        {comment.updated_at &&
          comment.updated_at.toLocaleString() >
            comment.created_at.toLocaleString() && <p>{'[Edited]'}</p>}
        <p>{comment.created_by_username || '[deleted]'}</p>
      </div>
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
            className="min-h-28"
            defaultValue={comment.content}
            placeholder="Enter a comment"
            minLength={1}
            maxLength={100}
          />
          {error?.content && (
            <div className="text-destructive text-sm">{error.content}</div>
          )}
          <div className="grid place-items-end">
            <SubmitButton />
          </div>
        </form>
      ) : (
        <div className="flex-grow">{comment.content}</div>
      )}
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
  )
}
