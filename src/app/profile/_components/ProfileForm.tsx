'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Profile } from '@/lib/types'
import { useFormState, useFormStatus } from 'react-dom'
import { updateUserProfile } from '../_actions/profileActions'
import { Label } from '@/components/ui/label'
import { MdOutlineInfo } from 'react-icons/md'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [error, action] = useFormState(updateUserProfile, {})
  return (
    <div className="w-[32rem] max-w-[80dvw] bg-secondary p-8 rounded shadow-md font-medium">
      <div className="font-semibold text-lg my-3">Hi {profile.first_name}!</div>
      <div className="text-md mb-4">{`Here's your profile information:`}</div>
      {!profile.username && (
        <div className="text-destructive pb-4 font-light text-pretty">{`Please create a username to use the app's functionalities!`}</div>
      )}
      <div>
        <div className="grid grid-cols-1fr-2fr gap-2 pb-2">
          <Label className="leading-8">Email</Label>
          <Input value={profile.email_address || ''} disabled />
        </div>
        <form action={action}>
          <div className="grid grid-cols-1fr-2fr gap-2">
            <Label className="leading-8">
              <div className="flex items-center gap-2">
                <div className="pt-1 -ml-4">*</div>
                <div>First name</div>
              </div>
            </Label>
            <Input
              defaultValue={`${profile.first_name || ''}`}
              placeholder="Enter your first name"
              type="text"
              id="first_name"
              name="first_name"
              minLength={1}
              maxLength={20}
              required
              className={`${!profile.first_name && 'border-red-500'}`}
            />
            <Label className="leading-8">Last name</Label>
            <Input
              defaultValue={`${profile.last_name || ''}`}
              placeholder="Enter your last name"
              type="text"
              id="last_name"
              name="last_name"
            />
            <div className="flex items-center">
              <Label className="leading-8">
                <div className="flex items-center gap-2">
                  <div className="pt-1 -ml-4">*</div>
                  <div>Username</div>
                </div>
              </Label>
              <HoverCard>
                <HoverCardTrigger>
                  <MdOutlineInfo className="mx-2" />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  <p className="font-light text-sm my-2">
                    Username must be alphanumeric and 4 to 12 characters long
                  </p>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Input
              defaultValue={`${profile.username || ''}`}
              placeholder="Pick a username"
              type="text"
              id="username"
              name="username"
              minLength={4}
              maxLength={12}
              pattern="[a-zA-Z0-9]+"
              required
              className={`${!profile.first_name && 'border-red-500'}`}
            />
          </div>

          <div className="pt-5 place-self-end">
            <SubmitButton />
          </div>
        </form>
      </div>
      {error?.first_name && (
        <div className="text-destructive text-sm">{error.first_name}</div>
      )}
      {error?.last_name && (
        <div className="text-destructive text-sm">{error.last_name}</div>
      )}
      {error?.username && (
        <div className="text-destructive text-sm">{error.username}</div>
      )}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="text-sm" type="submit" disabled={pending}>
      {pending ? 'Saving' : 'Update'}
    </Button>
  )
}
