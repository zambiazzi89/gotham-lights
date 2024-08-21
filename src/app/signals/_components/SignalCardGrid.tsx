import SignalCard from './SignalCard'
// import { SignalCardType } from '../_types/SignalCardType'
import Link from 'next/link'
import { Signal } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'

export default function SignalCardGrid({
  signalsInBound,
  setSelectedSignal,
}: {
  signalsInBound: Signal[]
  setSelectedSignal: Dispatch<SetStateAction<Signal | null>>
}) {
  return (
    <div className="flex flex-col md:overflow-y-auto">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
        {/* To do: if SelectedSignal, render only the signal and a button to go back
        (the button would just set the selectedSignal to null) */}

        {signalsInBound.map((signal) => {
          return (
            // <Link
            //   className="flex m-2"
            //   href={`/signals/${signal.id}`}
            //   key={signal.id}
            // >
            <div key={signal.id} onClick={() => setSelectedSignal(signal)}>
              <SignalCard signalCardProps={signal} />
            </div>
            // </Link>
          )
        })}
      </div>
    </div>
  )
}
