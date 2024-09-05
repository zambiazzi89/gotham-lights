import { SignalComment } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
import CommentForm from './CommentForm'
import { deleteComment } from '@/app/profile/my-activity/_actions/deleteActions'

export default function CommentSection({
  comments,
  signalId,
  username,
}: {
  comments: SignalComment[]
  signalId: string
  username: string | null
}) {
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
                <div className="flex-grow">{comment.content}</div>
                {comment.created_by_username === username && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MdMoreVert className="text-xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Comment</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DeleteCommentWithDialog id={comment.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            )
          })
        ) : (
          <div>There are no comments yet.</div>
        )}
      </div>
      {!username ? (
        <div className="py-8 flex flex-col items-center">
          <p>You must create a username before commenting</p>
          <Link className="my-3" href="/profile">
            <Button>Update Profile</Button>
          </Link>
        </div>
      ) : (
        <CommentForm signalId={signalId} />
      )}
    </div>
  )
}
