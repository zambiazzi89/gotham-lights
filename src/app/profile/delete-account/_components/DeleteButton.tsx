'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import deleteAccountAction from '../_actions/deleteAccountAction'

export default function DeleteButton() {
  const [confirmDeletion, setConfirmDeletion] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [error, action] = useFormState(deleteAccountAction, {})
  const { pending } = useFormStatus()

  return (
    <CardFooter className="py-4">
      {!confirmDeletion ? (
        <Button
          variant={'destructive'}
          onClick={() => setConfirmDeletion(true)}
        >
          Delete Account
        </Button>
      ) : (
        <form action={action} className="flex flex-col gap-4">
          <div>
            <div>To confirm you want to delete your account,</div>
            <div>please enter "Delete my account" below</div>
          </div>
          <Input
            placeholder="Delete my account"
            name="inputText"
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error?.inputText && (
            <div className="text-destructive text-sm">{error.inputText}</div>
          )}
          <div className="flex gap-8 justify-between">
            <Button
              variant={'destructive'}
              type="submit"
              disabled={pending || inputValue !== 'Delete my account'}
            >
              Delete Account
            </Button>
            <Button
              variant={'outline'}
              onClick={() => {
                setConfirmDeletion(false)
                setInputValue('')
              }}
              type="reset"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </CardFooter>
  )
}
