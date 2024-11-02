import { MdLockClock } from 'react-icons/md'

type ConversationSnippet = {
  selected?: boolean
  lastByUser: boolean
  read: boolean
  to_username: string
  lastMessage: string
  timestamp: Date
  status: string
}

export default function ConversationSnippetCard({
  selected,
  lastByUser,
  read,
  to_username,
  lastMessage,
  timestamp,
  status,
}: ConversationSnippet) {
  const displayMessage = lastByUser ? 'You: ' + lastMessage : lastMessage
  const sizedMessage =
    displayMessage.length > 24
      ? displayMessage.substring(0, 24) + '...'
      : displayMessage

  return (
    <div
      className={`w-60 my-1 flex justify-between ${
        selected ? 'bg-primary-20' : 'bg-muted'
      }`}
    >
      <div className="p-4 flex-grow">
        <div className="flex justify-between">
          <div className="font-bold">{to_username}</div>
          {status === 'Pending' && <MdLockClock />}
        </div>
        <div className="py-1 italic">{sizedMessage}</div>
        <div className="font-sans text-xs text-muted-foreground">
          {timestamp.toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
      {!read && <div className="w-1 bg-primary"></div>}
    </div>
  )
}
