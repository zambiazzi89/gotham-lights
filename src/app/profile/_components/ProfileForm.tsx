'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Profile } from '@/lib/types'
import { useFormState, useFormStatus } from 'react-dom'
import { GrUpdate } from 'react-icons/gr'
import { updateUsername } from '../_actions/profileActions'

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [error, action] = useFormState(updateUsername, {})
  return (
    <div className="w-[32rem] max-w-[80dvw] bg-secondary p-4 rounded shadow-md font-medium">
      <div className="font-semibold text-lg my-3">Hi {profile.firstName}!</div>
      <div className="text-md mb-4">Here's your profile information:</div>
      <div className="grid grid-cols-1fr-2fr">
        <div className="my-2">Email</div>
        <div>{profile.emailAddress}</div>
        <div className="my-2">First name</div>
        <div>{profile.firstName}</div>
        <div className="my-2">Last name</div>
        <div>{profile.lastName}</div>
        <div className="my-2">Username</div>
        <form className="flex gap-2" action={action}>
          {profile.username ? (
            <Input
              defaultValue={`${profile.username}`}
              type="text"
              id="username"
              name="username"
              required
            />
          ) : (
            <Input
              placeholder="Pick a username"
              type="text"
              id="username"
              name="username"
              minLength={4}
              maxLength={12}
              pattern="[a-zA-Z0-9]+"
              required
            />
          )}
          <SubmitButton />
        </form>
      </div>
      {error?.username && (
        <div className="text-destructive text-sm">{error.username}</div>
      )}
      <p className="font-light text-sm">
        Username must be alphanumeric and 4 to 12 characters long
      </p>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      className="text-sm"
      type="submit"
      variant="outline"
      disabled={pending}
    >
      {pending ? 'Saving' : <GrUpdate />}
    </Button>
  )
}
