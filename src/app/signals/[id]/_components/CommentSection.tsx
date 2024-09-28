import { SignalComment } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CommentForm from './CommentForm'
import MyComment from './MyComment'
import UsernameDropdown from '@/components/UsernameDropdown'

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
                <div className="p-2 flex flex-col gap-4">
                  <div className="flex">
                    <div className="flex-grow">{comment.content}</div>
                  </div>
                  <div className="w-full flex gap-4 items-end text-muted-foreground">
                    <div className="flex flex-col flex-grow">
                      <div>
                        <UsernameDropdown
                          username={comment.created_by_username}
                        ></UsernameDropdown>
                      </div>
                      <p>
                        {comment.created_at.toLocaleString([], {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    {comment.updated_at &&
                      comment.updated_at.toLocaleString([], {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) >
                        comment.created_at.toLocaleString([], {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }) && <p>{'[Edited]'}</p>}
                  </div>
                </div>
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
