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
import { useRef, useState } from 'react'
import { updatePassword } from '../_actions/updatePassword'

export function UpdatePasswordForm() {
  const [error, action] = useFormState(updatePassword, {})
  const ref = useRef<HTMLFormElement>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const passRef = useRef<HTMLInputElement>(null)
  const confirmpassRef = useRef<HTMLInputElement>(null)

  function handlePassChange() {
    setConfirmPassMatch(
      confirmpassRef.current?.value === passRef.current?.value
    )
  }

  const [passLengthValidation, setPassLengthValidation] = useState(false)
  const [uppercaseValidation, setUppercaseValidation] = useState(false)
  const [lowercaseValidation, setLowercaseValidation] = useState(false)
  const [numberValidation, setNumberValidation] = useState(false)
  const [specialCharValidation, setSpecialCharValidation] = useState(false)

  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setPassLengthValidation(password.length >= 8 && password.length <= 16)
    setUppercaseValidation(/[A-Z]/.test(password))
    setLowercaseValidation(/[a-z]/.test(password))
    setNumberValidation(/\d/.test(password))
    setSpecialCharValidation(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    )
  }

  const [confirmPassMatch, setConfirmPassMatch] = useState(false)

  return (
    <Card className="mx-auto p-8 bg-secondary">
      <CardHeader>
        <CardTitle className="text-xl">Update Password</CardTitle>

        <CardDescription>Enter your new password below</CardDescription>
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                ref={passRef}
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  handlePasswordValidation(e)
                  handlePassChange()
                }}
                required
              />
              {error?.password && (
                <div className="text-destructive text-sm">{error.password}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Input
                ref={confirmpassRef}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                onChange={handlePassChange}
                required
              />
              {error?.confirmPassword && (
                <div className="text-destructive text-sm">
                  {error.confirmPassword}
                </div>
              )}
            </div>
            <div className="text-sm font-sans font-semibold flex gap-4 justify-between">
              <div className="self-center">Password criteria:</div>
              <div className="pl-2">
                <div
                  className={
                    passLengthValidation ? 'text-green-600' : 'text-destructive'
                  }
                >
                  8 to 16 characters
                </div>
                <div
                  className={
                    uppercaseValidation ? 'text-green-600' : 'text-destructive'
                  }
                >
                  Uppercase character(s)
                </div>
                <div
                  className={
                    lowercaseValidation ? 'text-green-600' : 'text-destructive'
                  }
                >
                  Lowercase character(s)
                </div>
                <div
                  className={
                    numberValidation ? 'text-green-600' : 'text-destructive'
                  }
                >
                  Number(s)
                </div>
                <div
                  className={
                    specialCharValidation
                      ? 'text-green-600'
                      : 'text-destructive'
                  }
                >
                  Special character(s)
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!confirmPassMatch}
            >
              Reset Password
            </Button>
          </div>
        </form>
        {formSubmitted ? (
          <div className="pt-8 text-primary">
            Your password has been updated!
          </div>
        ) : (
          <CardDescription className="place-self-center pt-4">
            This form will expire in 5 minutes
          </CardDescription>
        )}
      </CardContent>
    </Card>
  )
}
