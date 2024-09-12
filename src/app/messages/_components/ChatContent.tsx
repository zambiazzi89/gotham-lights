import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import ChatMessages from './ChatMessages'

export default function ChatContent() {
  return (
    <Card className="bg-secondary flex flex-col w-full p-4">
      <ChatMessages />
      <div className="flex gap-4">
        <Textarea />
        <Button variant={'outline'} className="h-full">
          Send
        </Button>
      </div>
    </Card>
  )
}
