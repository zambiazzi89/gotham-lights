'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { resetPassword } from '../_actions/resetPassword'
import { useRef, useState } from 'react'

export function ResetPasswordForm() {
  const [error, action] = useFormState(resetPassword, {})
  const ref = useRef<HTMLFormElement>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <Card className="mx-auto p-8 bg-secondary">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={(formData) => {
            ref.current?.reset()
            action(formData)
            setFormSubmitted(true)
          }}
          ref={ref}
        >
          <div className="grid gap-8">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="email@example.com"
                required
              />
              {error?.email && (
                <div className="text-destructive text-sm">{error.email}</div>
              )}
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </div>
          {formSubmitted && (
            <div className="pt-8 text-primary">
              We sent you an email for resetting your password!
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
