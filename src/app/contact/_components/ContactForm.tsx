'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormState, useFormStatus } from 'react-dom'
import sendEmail from '../_actions/sendEmail'
import { useRef, useState } from 'react'

export default function ComponentForm() {
  const [error, action] = useFormState(sendEmail, {})
  const ref = useRef<HTMLFormElement>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { pending } = useFormStatus()

  return (
    <Card className="p-8 min-w-[50svw] max-w-[90svw] bg-secondary">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          action={(formData) => {
            ref.current?.reset()
            action(formData)
            setFormSubmitted(true)
          }}
          ref={ref}
        >
          <Input name="name" placeholder="Name" required />
          {error?.name && (
            <div className="text-destructive text-sm">{error.name}</div>
          )}
          <Input name="email" placeholder="Email" required />
          {error?.email && (
            <div className="text-destructive text-sm">{error.email}</div>
          )}
          <Textarea
            name="content"
            placeholder="Give us the details!"
            className="h-36"
            required
          />
          {error?.content && (
            <div className="text-destructive text-sm">{error.content}</div>
          )}
          {formSubmitted && (
            <div className="pt-8 text-primary">Your message has been sent!</div>
          )}
          <Button
            className="w-fit mt-4 self-end"
            type="submit"
            disabled={pending}
          >
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
