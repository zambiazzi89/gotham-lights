import ConversationSnippets from './ConversationSnippets'
import ChatContent from './ChatContent'

export default function MessageBox() {
  return (
    <div className="h-full flex p-4 gap-4">
      <ConversationSnippets />
      <ChatContent />
    </div>
  )
}
