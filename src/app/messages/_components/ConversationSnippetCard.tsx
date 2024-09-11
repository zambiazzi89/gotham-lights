type ConversationSnippet = {
  selected?: boolean
  newMessage?: boolean
  username: string
  lastMessage: string
  timestamp: string
}

export default function ConversationSnippet({
  selected,
  newMessage,
  username,
  lastMessage,
  timestamp,
}: ConversationSnippet) {
  return (
    <div
      className={`my-1 flex justify-between ${
        selected ? 'bg-primary-20' : 'bg-muted'
      }`}
    >
      <div className="p-4 ">
        <div className="font-bold">{username}</div>
        <div>{lastMessage}</div>
        <div className="text-muted-foreground">{timestamp}</div>
      </div>
      {newMessage && <div className="w-1 bg-primary"></div>}
    </div>
  )
}
