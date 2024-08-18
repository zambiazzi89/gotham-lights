import SignalCard from './SignalCard'
import { SignalCardType } from '../_types/SignalCardType'
import Link from 'next/link'
import { Signal } from '@/lib/types'

export default function SignalCardGrid({
  signalsInBound,
}: {
  signalsInBound: Signal[]
}) {
  return (
    <div className="flex flex-col md:overflow-y-auto">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap ">
        {signalsInBound.map((signal) => {
          return (
            <Link
              className="flex m-2"
              href={`/signals/${signal.id}`}
              key={signal.id}
            >
              <SignalCard
                key={signal.id}
                signalCardProps={signal as SignalCardType}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
