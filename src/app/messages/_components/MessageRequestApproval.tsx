'use client'

import { Button } from '@/components/ui/button'
import { approveMessageRequest } from '../_actions/ApproveMessageRequest'

export default function MessageRequestApproval({
  from_username,
  conversationId,
}: {
  from_username: string
  conversationId: string
}) {
  return (
    <>
      <div>Do you want to accept this message request?</div>
      <div>
        {from_username} will not be able to send you more messages if you don't.
      </div>
      <div className="pt-3 flex gap-6">
        <Button variant={'destructive'}>Decline</Button>
        <Button onClick={() => approveMessageRequest(conversationId)}>
          Accept
        </Button>
      </div>
    </>
  )
}
