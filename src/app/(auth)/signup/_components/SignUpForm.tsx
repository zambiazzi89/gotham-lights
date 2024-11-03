'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { signup } from '../_actions/signup'

export function SignUpForm() {
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

  const [error, action] = useFormState(signup, {})

  return (
    <Card className="mx-auto bg-secondary p-8">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                />
                {error?.firstName && (
                  <div className="text-destructive text-sm">
                    {error.firstName}
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  required
                />
                {error?.lastName && (
                  <div className="text-destructive text-sm">
                    {error.lastName}
                  </div>
                )}
              </div>
            </div>
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
                className={
                  confirmPassMatch ? '' : 'border-destructive border-2'
                }
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
              Create an account
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
