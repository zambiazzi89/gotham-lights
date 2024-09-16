import { CancelButtonWithDialog } from '@/components/AlertDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export default function MessageRequestForm({
  toUsername,
}: {
  toUsername: string
}) {
  return (
    <div className="grid place-items-center">
      <Card className="w-[80svw] p-4">
        <CardHeader>
          <div>To {toUsername}</div>
        </CardHeader>
        <CardContent>
          <div>Message</div>
          <form>
            <Textarea className="h-60" />
            <div className="py-4 flex justify-end">
              <CancelButtonWithDialog />
              <Button>Send</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
