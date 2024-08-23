'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CancelButtonWithDialog } from '@/components/AlertDialog'
import { DatePicker } from '@/components/ui/DatePicker'
import { Textarea } from '@/components/ui/textarea'
import { addSignal } from '../_actions/signalActions'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import GoogleAutocompleteInput from '@/components/googleAutocomplete'

export default function CreateSignalForm() {
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null)
  const [error, action] = useFormState(addSignal, {})
  const [date, setDate] = useState<Date | undefined>(undefined)

  return (
    <form
      action={action}
      className="w-[32rem] max-w-[80dvw] bg-secondary p-4 rounded shadow-md"
    >
      <div className="font-semibold text-lg mb-3">Create a Signal</div>

      <div className="my-2">
        <Input
          placeholder="Name your signal"
          type="text"
          id="title"
          name="title"
          required
        />
        {error?.title && (
          <div className="text-destructive text-sm">{error.title}</div>
        )}
      </div>
      <div className="my-2">
        <Input
          type="hidden"
          name="location_name"
          value={selectedLocation?.name}
        />
        <Input
          type="hidden"
          name="location_lat"
          value={selectedLocation?.geometry?.location?.lat()}
        />
        <Input
          type="hidden"
          name="location_lng"
          value={selectedLocation?.geometry?.location?.lng()}
        />
        <GoogleAutocompleteInput
          setSelectedLocationFromProps={setSelectedLocation}
        />
      </div>
      <div className="my-2">
        <Input type="hidden" name="date" value={date?.toISOString()} />
        <DatePicker date={date} setDate={setDate} />
        {error?.date && (
          <div className="text-destructive text-sm">{error.date}</div>
        )}
      </div>
      <div className="my-2">
        <Textarea
          name="content"
          placeholder="What do you want to share?"
          required
        />
        {error?.content && (
          <div className="text-destructive text-sm">{error.content}</div>
        )}
      </div>
      <div className="flex justify-between w-full mt-8">
        <CancelButtonWithDialog href="/signals" />
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving' : 'Submit'}
    </Button>
  )
}
