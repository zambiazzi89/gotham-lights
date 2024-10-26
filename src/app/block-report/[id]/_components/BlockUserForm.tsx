'use client'

import { Button } from '@/components/ui/button'
import { useFormState } from 'react-dom'
import { blockUser } from '../_actions/blockUser'
import { Input } from '@/components/ui/input'

export default function BlockUserForm({
  alreadyBlocked,
  currentUsername,
  usernameToBlock,
}: {
  alreadyBlocked: boolean
  currentUsername: string
  usernameToBlock: string
}) {
  const [error, action] = useFormState(blockUser, {})
  return (
    <form action={action}>
      <Input type="hidden" name="current_username" value={currentUsername} />
      <Input type="hidden" name="username_to_block" value={usernameToBlock} />
      <Button
        disabled={!!alreadyBlocked}
        className="w-32"
        variant={'destructive'}
      >
        Block
      </Button>
    </form>
  )
}
