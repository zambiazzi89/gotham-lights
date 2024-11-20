'use client'

import UsernameDropdown from '@/components/UsernameDropdown'
import { SignalComment } from '@/lib/types'

export default function Comment({ comment }: { comment: SignalComment }) {
  return (
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
