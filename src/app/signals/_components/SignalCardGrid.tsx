import GridSignalCard from './GridSignalCard'
import Link from 'next/link'
import { SignalWithCommentsAndReads } from '@/lib/types'
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
  hasUsername,
}: {
  signalsInBound: SignalWithCommentsAndReads[]
  selectedSubwayLine?: subwayLine
  hasUsername: boolean
}) {
  return (
    <div className="p-4 flex flex-col lg:overflow-y-auto">
      <div className="py-4 flex items-center gap-4 justify-between">
        <div className="flex gap-2 items-center">
          <SubwayPopoverLinks />
          {selectedSubwayLine && (
            <div className="ml-auto px-2 flex items-center gap-3">
              <SubwayLineLogo subwayLine={selectedSubwayLine} />
              <Link href={'/signals?viewAll=true'} className="text-sm">
                Clear
              </Link>
            </div>
          )}
        </div>
        {hasUsername && (
          <Link href={'/signals/my-signals'}>
            <Button variant={'outline'}>My Signals</Button>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>Order</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Published Date</DropdownMenuItem>
            <DropdownMenuItem>Encounter Date</DropdownMenuItem>
            <DropdownMenuItem>Most Commented</DropdownMenuItem>
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
              <GridSignalCard
                signalCardProps={signal}
                hasUsername={hasUsername}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
