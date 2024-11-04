'use client'

import { Input } from '@/components/ui/input'
import { CancelButtonWithDialog } from '@/components/AlertDialog'
import { DatePicker } from '@/components/ui/DatePicker'
import { Textarea } from '@/components/ui/textarea'
import { addSignal } from '../_actions/signalActions'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import GoogleAutocompleteInput from '@/components/googleAutocomplete'
import SubmitButton from '@/components/SubmitButton'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { MdOutlineInfo } from 'react-icons/md'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import SubwayLineButton, { SubwayLineLogo } from '@/components/SubwayLineButton'
import { SUBWAY_LINES, subwayLine } from '@/data/SubwayLines'

export default function CreateSignalForm() {
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null)
  const [error, action] = useFormState(addSignal, {})
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedSubwayLine, setSelectedSubwayLine] =
    useState<subwayLine | null>(null)

  return (
    <Card className="w-[32rem] max-w-[80dvw] bg-secondary p-8">
      <form action={action}>
        <CardTitle>Create a Signal</CardTitle>
        <div className="flex flex-col gap-3 py-8">
          <div>
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
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'link'}>Subway Lines</Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-80 bg-secondary flex flex-wrap">
                {SUBWAY_LINES.map((lineGroup, i) => (
                  <div key={i} className="flex p-3 gap-2">
                    {lineGroup.map((line, i) => (
                      <SubwayLineButton
                        key={i}
                        subwayLine={line}
                        setSelectedSubwayLine={setSelectedSubwayLine}
                      />
                    ))}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <div className="text-xs px-2">(Optional)</div>
            <HoverCard>
              <HoverCardTrigger>
                <MdOutlineInfo className="mx-2" />
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                <p className="font-light text-sm my-2">
                  You can select a subway line if it happened on the subway
                </p>
              </HoverCardContent>
            </HoverCard>
            <Input
              name="subway_line"
              value={selectedSubwayLine?.line || ''}
              type="hidden"
            />
            {selectedSubwayLine && (
              <div className="ml-auto px-2">
                <SubwayLineLogo subwayLine={selectedSubwayLine} />
              </div>
            )}
          </div>
          <div>
            <Input
              type="hidden"
              name="location_name"
              value={`${selectedLocation?.name}`}
            />
            <Input
              type="hidden"
              name="location_lat"
              value={`${selectedLocation?.geometry?.location?.lat()}`}
            />
            <Input
              type="hidden"
              name="location_lng"
              value={`${selectedLocation?.geometry?.location?.lng()}`}
            />
            <GoogleAutocompleteInput
              setSelectedLocationFromProps={setSelectedLocation}
            />
          </div>
          <div>
            <Input type="hidden" name="date" value={`${date?.toISOString()}`} />
            <DatePicker date={date} setDate={setDate} />
            {error?.date && (
              <div className="text-destructive text-sm">{error.date}</div>
            )}
          </div>
          <div>
            <Textarea
              name="content"
              placeholder="What do you want to share?"
              required
            />
            {error?.content && (
              <div className="text-destructive text-sm">{error.content}</div>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <CancelButtonWithDialog />
          <SubmitButton />
        </div>
      </form>
    </Card>
  )
}
