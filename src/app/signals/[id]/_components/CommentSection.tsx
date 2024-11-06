import { SignalComment } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CommentForm from './CommentForm'
import MyComment from './MyComment'
import Comment from './Comment'

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
          return (
            <div key={comment.id}>
              {comment.created_by_username === username ? (
                <MyComment comment={comment} />
              ) : (
                <Comment comment={comment} />
              )}
              <div className="py-4">
                <hr />
              </div>
            </div>
          )
        })}
      </div>
      {!username ? (
        <div className="py-8 flex flex-col items-center">
          <div>You must create a username before commenting</div>
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
