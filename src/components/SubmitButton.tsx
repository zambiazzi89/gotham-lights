'use client'

import { useFormStatus } from 'react-dom'
import { Button } from './ui/button'

export default function SubmitButton({
  buttonText = 'Submit',
  buttonVariant = 'default',
}: {
  buttonText?: string
  buttonVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined
}) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} variant={buttonVariant}>
      {pending ? 'Saving' : buttonText}
    </Button>
  )
}
