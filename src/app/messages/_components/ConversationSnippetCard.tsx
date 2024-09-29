type ConversationSnippet = {
  selected?: boolean
  newMessage?: boolean
  username: string
  lastMessage: string
  timestamp: Date
}

export default function ConversationSnippetCard({
  selected,
  newMessage,
  username,
  lastMessage,
  timestamp,
}: ConversationSnippet) {
  return (
    <div
      className={`w-60 my-1 flex justify-between ${
        selected ? 'bg-primary-20' : 'bg-muted'
      }`}
    >
      <div className="p-4 ">
        <div className="font-bold">{username}</div>
        {lastMessage.length > 27 ? (
          <div>{lastMessage.substring(0, 27)}...</div>
        ) : (
          <div>{lastMessage}</div>
        )}
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
      {newMessage && <div className="w-1 bg-primary"></div>}
    </div>
  )
}
