import GridSignalCard from './GridSignalCard'
import Link from 'next/link'
import { Signal } from '@/lib/types'
import { SubwayPopoverLinks } from '@/components/Subway/SubwayPopover'
import { subwayLine } from '@/data/SubwayLines'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SubwayLineLogo } from '@/components/Subway/SubwayLineButton'

export default function SignalCardGrid({
  signalsInBound,
  selectedSubwayLine,
}: {
  signalsInBound: Signal[]
  selectedSubwayLine?: subwayLine
}) {
  return (
    <div className="p-4 flex flex-col lg:overflow-y-auto">
      <div className="py-4 flex items-center gap-4 justify-between">
        <div className="flex gap-2 items-center">
          <SubwayPopoverLinks />
          {selectedSubwayLine && (
            <div className="ml-auto px-2 flex items-center gap-2">
              <SubwayLineLogo subwayLine={selectedSubwayLine} />
              <Link href={'/signals?viewAll=true'}>Clear</Link>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>Order</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Published Date</DropdownMenuItem>
            <DropdownMenuItem>Encounter Date</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 ">
        {signalsInBound.map((signal) => {
          return (
            <Link
              className="flex"
              key={signal.id}
              href={`/signals/${signal.id}`}
            >
              <GridSignalCard signalCardProps={signal} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
