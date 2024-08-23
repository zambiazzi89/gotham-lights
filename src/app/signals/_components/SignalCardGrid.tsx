import SignalCard from './SignalCard'
import Link from 'next/link'
import { Signal } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

export default function SignalCardGrid({
  signalsInBound,
}: // selectedSignal,
// setSelectedSignal,
{
  signalsInBound: Signal[]
  // selectedSignal: Signal | null
  // setSelectedSignal: Dispatch<SetStateAction<Signal | null>>
}) {
  return (
    <div className="p-4 flex flex-col lg:overflow-y-auto">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 ">
        {signalsInBound.map((signal) => {
          return (
            <Link className="" key={signal.id} href={`/signals/${signal.id}`}>
              <SignalCard signalCardProps={signal} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
