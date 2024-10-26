'use client'

import { CancelButtonWithDialog } from '@/components/AlertDialog'
import SubmitButton from '@/components/SubmitButton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useFormState } from 'react-dom'
import { sendMessageRequest } from '../_actions/sendMessageRequestAction'
import { Input } from '@/components/ui/input'

export default function MessageRequestForm({
  toUsername,
}: {
  toUsername: string
}) {
  const [error, action] = useFormState(sendMessageRequest, {})
  return (
    <div className="grid place-items-center">
      <Card className="w-[80svw] lg:w-[50svw] p-4 bg-secondary">
        <CardHeader>
          <div className="font-bold text-lg self-center">
            Send a message request to {toUsername}
          </div>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <Input type="hidden" name="username" value={toUsername} />
            <Input name="content" />
            {error?.content && (
              <div className="text-destructive text-sm">{error.content}</div>
            )}
            <div className="py-4 flex justify-end">
              <CancelButtonWithDialog />
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
