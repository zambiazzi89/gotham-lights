'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import unblockAction from '../_actions/unblockAction'

export default function UnblockButton({ username }: { username: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <Button
      variant={'default'}
      onClick={() =>
        startTransition(async () => {
          await unblockAction(username)
          router.refresh()
        })
      }
    >
      Unblock
    </Button>
  )
}
