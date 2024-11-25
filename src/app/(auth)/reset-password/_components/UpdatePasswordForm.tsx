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
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

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
  const [viewPassword, setViewPassword] = useState(false)

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
    <Card className="mx-auto p-4 bg-secondary">
      <CardHeader>
        <CardTitle className="text-xl">Update Password</CardTitle>
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
            <div className="flex gap-2">
              <div className="flex-grow flex flex-col gap-4">
                <div className="grid gap-2">
                  <Input
                    ref={passRef}
                    id="password"
                    name="password"
                    type={viewPassword ? 'text' : 'password'}
                    placeholder="New password"
                    onChange={(e) => {
                      handlePasswordValidation(e)
                      handlePassChange()
                    }}
                    required
                  />
                  {error?.password && (
                    <div className="text-destructive text-sm">
                      {error.password}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    ref={confirmpassRef}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={viewPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    onChange={handlePassChange}
                    required
                  />
                  {error?.confirmPassword && (
                    <div className="text-destructive text-sm">
                      {error.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <div className="self-center px-1 place-items-center text-muted-foreground grid gap-1">
                <div className="h-4 w-4 border-muted-foreground border-t border-r rounded-tr-md -ml-4" />
                {viewPassword ? (
                  <FaEye
                    className="hover:cursor-pointer"
                    onClick={() => setViewPassword(false)}
                  />
                ) : (
                  <FaEyeSlash
                    className="hover:cursor-pointer"
                    onClick={() => setViewPassword(true)}
                  />
                )}
                <div className="h-4 w-4 border-muted-foreground border-b border-r rounded-br-md -ml-4" />
              </div>
            </div>
            <div className="text-sm font-sans flex gap-4 justify-between">
              <div className="self-center">Password criteria:</div>
              <div className="pl-2 flex-grow">
                <div className="flex gap-2 items-center">
                  {passLengthValidation ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaXmark className="text-destructive" />
                  )}
                  <div>8 to 16 characters</div>
                </div>
                <div className="flex gap-2 items-center">
                  {uppercaseValidation ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaXmark className="text-destructive" />
                  )}
                  <div>Uppercase character(s)</div>
                </div>
                <div className="flex gap-2 items-center">
                  {lowercaseValidation ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaXmark className="text-destructive" />
                  )}
                  <div>Lowercase character(s)</div>
                </div>
                <div className="flex gap-2 items-center">
                  {numberValidation ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaXmark className="text-destructive" />
                  )}
                  <div>Number(s)</div>
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    {specialCharValidation ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaXmark className="text-destructive" />
                    )}
                    Special character(s)
                  </div>
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
