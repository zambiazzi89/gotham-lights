import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ChatContent from '../../_components/ChatContent'

export default async function Conversation() {
  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="h-full flex p-4 gap-4">
          <ChatContent />
        </div>
        <Footer />
      </div>
    </div>
  )
}
