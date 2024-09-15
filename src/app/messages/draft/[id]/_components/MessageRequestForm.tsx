import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function MessageRequestForm({
  toUsername,
}: {
  toUsername: string
}) {
  return (
    <div className="grid place-items-center">
      <Card className="w-80 p-4">
        <div>To: {toUsername}</div>
        <form>
          <Textarea />
        </form>
      </Card>
    </div>
  )
}
