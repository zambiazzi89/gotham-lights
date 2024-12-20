'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SignInWithGoogle from './signInWithGoogle'
import { useFormState } from 'react-dom'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { MdOutlineInfo } from 'react-icons/md'
import { login } from '../_actions/login'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export function LoginForm() {
  const [error, action] = useFormState(login, {})
  const [viewPassword, setViewPassword] = useState(false)

  return (
    <Card className="mx-auto p-4 bg-secondary">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="pb-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
              />
              {error?.email && (
                <div className="text-destructive text-sm">{error.email}</div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <HoverCard>
                  <HoverCardTrigger>
                    <MdOutlineInfo className="mx-2" />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-sm">
                    <div className="pb-2">Passwords criteria</div>
                    <div className="pl-2">
                      <div>8 to 16 characters</div>
                      <div>Uppercase character(s)</div>
                      <div>Lowercase character(s)</div>
                      <div>Number(s)</div>
                      <div>Special character(s)</div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Link
                  href="/reset-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="flex gap-2">
                <div className="grid gap-2 flex-grow">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type={viewPassword ? 'text' : 'password'}
                    min={8}
                    max={16}
                    required
                  />
                  {error?.password && (
                    <div className="text-destructive text-sm">
                      {error.password}
                    </div>
                  )}
                </div>
                <div className="self-center px-1 place-items-center text-muted-foreground grid gap-1">
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
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <SignInWithGoogle />
        <div className="mt-4 text-center text-sm">
          {`Don't have an account? `}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
