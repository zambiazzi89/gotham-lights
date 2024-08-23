import GridSignalCard from './GridSignalCard'
import Link from 'next/link'
import { Signal } from '@/lib/types'

export default function SignalCardGrid({
  signalsInBound,
}: {
  signalsInBound: Signal[]
}) {
  return (
    <div className="p-4 flex flex-col lg:overflow-y-auto">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 ">
        {signalsInBound.map((signal) => {
          return (
            <Link className="" key={signal.id} href={`/signals/${signal.id}`}>
              <GridSignalCard signalCardProps={signal} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
