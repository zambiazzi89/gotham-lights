import { SignalComment } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CommentForm from './CommentForm'
import MyComment from './MyComment'

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
        {!comments.length && <div>There are no comments yet.</div>}
        {comments.map((comment) => {
          return comment.created_by_username === username ? (
            <MyComment key={comment.id} comment={comment} />
          ) : (
            <div key={comment.id} className="flex gap-4">
              <div className="flex flex-col items-end font-semibold text-muted-foreground">
                <p>{comment.created_at.toLocaleString()}</p>
                <p>{comment.created_by_username || '[deleted]'}</p>
              </div>
              <div className="flex-grow">{comment.content}</div>
            </div>
          )
        })}
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
