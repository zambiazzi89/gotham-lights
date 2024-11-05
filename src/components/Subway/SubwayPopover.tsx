import { SUBWAY_LINES, subwayLine } from '@/data/SubwayLines'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import SubwayLineButton, { SubwayLineLink } from './SubwayLineButton'
import { Dispatch, SetStateAction } from 'react'

export default function SubwayPopover({
  setSelectedSubwayLine,
}: {
  setSelectedSubwayLine: Dispatch<SetStateAction<subwayLine | null>>
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'} className="bg-background hover:bg-primary-20">
          Subway Lines
        </Button>
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
  )
}

export function SubwayPopoverLinks() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'}>Subway Lines</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80 bg-secondary flex flex-wrap">
        {SUBWAY_LINES.map((lineGroup, i) => (
          <div key={i} className="flex p-3 gap-2">
            {lineGroup.map((line, i) => (
              <SubwayLineLink key={i} subwayLine={line} />
            ))}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
