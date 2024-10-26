'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'
import { reportUser } from '../_actions/reportUser'
import { Input } from '@/components/ui/input'

export default function ReportUserForm({
  alreadyReported,
  currentUsername,
  usernameToReport,
}: {
  alreadyReported: boolean
  currentUsername: string
  usernameToReport: string
}) {
  const [error, action] = useFormState(reportUser, {})
  return (
    <form action={action}>
      <CardContent>
        <Input type="hidden" name="current_username" value={currentUsername} />
        <Input
          type="hidden"
          name="username_to_report"
          value={usernameToReport}
        />
        <Textarea
          name="reason"
          disabled={!!alreadyReported}
          className="w-full min-h-36"
          placeholder="Reason for reporting"
          minLength={4}
        />
        {error?.reason && (
          <div className="text-destructive text-sm">{error.reason}</div>
        )}
      </CardContent>
      <CardContent className="my-4">
        <Button
          disabled={!!alreadyReported}
          className="w-32"
          variant={'destructive'}
        >
          Report
        </Button>
      </CardContent>
    </form>
  )
}
