'use client'

import { Input } from '@/components/ui/input'
import resendConfirmationEmail from '../../_actions/resendConfirmationEmail'
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { useRef, useState } from 'react'

export default function ConfirmationEmailForm() {
  const [error, action] = useFormState(resendConfirmationEmail, {})
  const { pending } = useFormStatus()
  const ref = useRef<HTMLFormElement>(null)

  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <form
      ref={ref}
      action={(formData) => {
        ref.current?.reset()
        action(formData)
        setFormSubmitted(true)
      }}
      className="py-8"
    >
      <div className="flex gap-4">
        <Input
          name="email"
          type="email"
          placeholder="email@example.com"
          className="min-w-72"
          required
        />
        <Button type="submit" disabled={pending}>
          Resend
        </Button>
      </div>
      {error?.email && (
        <div className="text-destructive text-sm pt-2">{error.email}</div>
      )}
      {formSubmitted && (
        <div className="pt-8 text-primary">
          Your request has been submitted, please check your email
        </div>
      )}
    </form>
  )
}
