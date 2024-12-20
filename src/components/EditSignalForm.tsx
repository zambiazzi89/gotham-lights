'use client'

import { Button } from './ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { editSignal } from '@/app/profile/my-activity/_actions/editSignal'
import { useFormState } from 'react-dom'
import GoogleAutocompleteInput from './GoogleTools/googleAutocomplete'
import { DatePicker } from './ui/DatePicker'
import { Textarea } from './ui/textarea'
import { Signal } from '@/lib/types'
import SubmitButton from './SubmitButton'
import { SUBWAY_LINES_JSON, subwayLine } from '@/data/SubwayLines'
import { SubwayLineLogo } from './Subway/SubwayLineButton'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { MdOutlineInfo } from 'react-icons/md'
import SubwayPopover from './Subway/SubwayPopover'
import { TbHeartCheck } from 'react-icons/tb'

export default function EditSignalForm({
  signal,
  setEdit,
}: {
  signal: Signal
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null)
  const [error, action] = useFormState(editSignal, {})
  const [date, setDate] = useState<Date | undefined>(signal.date_encounter)
  const [selectedSubwayLine, setSelectedSubwayLine] =
    useState<subwayLine | null>(
      signal.subway_line ? SUBWAY_LINES_JSON[signal.subway_line] : null
    )
  const [found, setFound] = useState<boolean>(signal.connection_found)

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
      <div className="flex items-center">
        <SubwayPopover setSelectedSubwayLine={setSelectedSubwayLine} />
        <HoverCard>
          <HoverCardTrigger>
            <MdOutlineInfo className="mx-2" />
          </HoverCardTrigger>
          <HoverCardContent className="text-sm">
            <p className="font-light text-sm my-2">
              Optional - Did it happen on the subway?
            </p>
          </HoverCardContent>
        </HoverCard>
        <Input
          name="subway_line"
          value={selectedSubwayLine?.line || ''}
          type="hidden"
        />
        {selectedSubwayLine && (
          <div className="ml-auto px-2 flex items-center gap-2">
            <Button
              variant={'ghost'}
              onClick={() => setSelectedSubwayLine(null)}
            >
              Clear
            </Button>
            <SubwayLineLogo subwayLine={selectedSubwayLine} />
          </div>
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
          defaultValue={signal.content}
          required
        />
        {error?.content && (
          <div className="text-destructive text-sm">{error.content}</div>
        )}
      </div>
      <Input
        type="checkbox"
        name="connection_found"
        checked={found}
        className="hidden"
      />
      <div className="flex gap-2 items-center">
        <Button
          variant={'outline'}
          className={`flex gap-2 items-center ${
            found
              ? 'text-primary font-semibold hover:font-bold hover:text-primary'
              : 'text-muted-foreground'
          }`}
          onClick={(e) => {
            e.preventDefault()
            setFound(!found)
          }}
        >
          <TbHeartCheck className="text-xl" />
          <div className="text-sm ">Found!</div>
        </Button>
        <HoverCard>
          <HoverCardTrigger>
            <MdOutlineInfo className="mx-2" />
          </HoverCardTrigger>
          <HoverCardContent className="text-sm">
            <p className="font-light text-sm my-2">
              Let others know if you found your person!
            </p>
          </HoverCardContent>
        </HoverCard>
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
