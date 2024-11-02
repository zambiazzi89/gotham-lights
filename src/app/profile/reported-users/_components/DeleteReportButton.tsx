'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import deleteReportAction from '../_actions/deleteReportAction'

export default function DeleteReportButton({ username }: { username: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <Button
      variant={'destructive'}
      onClick={() =>
        startTransition(async () => {
          await deleteReportAction(username)
          router.refresh()
        })
      }
    >
      Delete
    </Button>
  )
}
