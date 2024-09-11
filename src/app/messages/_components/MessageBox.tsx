import ConversationCarousel from './ConversationCarousel'
import ChatContent from './ChatContent'

export default function MessageBox() {
  return (
    <div className="h-full flex p-4 gap-4">
      <ConversationCarousel />
      <ChatContent />
    </div>
  )
}
