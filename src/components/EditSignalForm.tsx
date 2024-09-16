'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { editSignal } from '@/app/profile/my-activity/_actions/editSignal'
import { useFormState } from 'react-dom'
import GoogleAutocompleteInput from './googleAutocomplete'
import { DatePicker } from './ui/DatePicker'
import { Textarea } from './ui/textarea'
import { Signal } from '@/lib/types'
import SubmitButton from './SubmitButton'

export default function EditSignalForm({
  signal,
  setEdit,
}: {
  signal: Signal
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null)
  const [error, action] = useFormState(editSignal, {})
  const [date, setDate] = useState<Date | undefined>(signal.date_encounter)

  return (
    <form
      action={(formData) => {
        action(formData)
        setEdit(false)
        router.refresh()
      }}
    >
      <div className="my-2">
        <Input type="hidden" name="signalId" value={`${signal.id}`} />
        <Input
          placeholder="Name your signal"
          type="text"
          id="title"
          name="title"
          defaultValue={signal.title}
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
          value={`${selectedLocation?.name || signal.location_name}`}
        />
        <Input
          type="hidden"
          name="location_lat"
          value={`${
            selectedLocation?.geometry?.location?.lat() || signal.latitude
          }`}
        />
        <Input
          type="hidden"
          name="location_lng"
          value={`${
            selectedLocation?.geometry?.location?.lng() || signal.longitude
          }`}
        />
        <GoogleAutocompleteInput
          defaultValue={signal.location_name}
          setSelectedLocationFromProps={setSelectedLocation}
        />
      </div>
      <div className="my-2">
        <Input
          type="hidden"
          name="date"
          defaultValue={signal.date_encounter.toISOString()}
        />
        <DatePicker date={date} setDate={setDate} />
        {error?.date && (
          <div className="text-destructive text-sm">{error.date}</div>
        )}
      </div>
      <div className="my-2">
        <Textarea
          name="content"
          placeholder="What do you want to share?"
          defaultValue={signal.content}
          required
        />
        {error?.content && (
          <div className="text-destructive text-sm">{error.content}</div>
        )}
      </div>
      <div className="flex justify-end w-full pt-8 gap-4">
        <Button onClick={() => setEdit(false)} variant={'ghost'}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  )
}
