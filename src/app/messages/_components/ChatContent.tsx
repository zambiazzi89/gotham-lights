import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function ChatContent() {
  return (
    <Card className="bg-secondary flex flex-col w-full p-4">
      <div className="bg-background flex-grow mb-4 border-2 p-4">
        Chat content are
      </div>
      <div className="flex gap-4">
        <Textarea />
        <Button variant={'outline'} className="h-full">
          Send
        </Button>
      </div>
    </Card>
  )
}
