import SignalCard from './SignalCard'
// import { SignalCardType } from '../_types/SignalCardType'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'
import { Signal } from '@/lib/types'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'

export default function SignalCardGrid({
  signalsInBound,
  selectedSignal,
  setSelectedSignal,
}: {
  signalsInBound: Signal[]
  selectedSignal: Signal | null
  setSelectedSignal: Dispatch<SetStateAction<Signal | null>>
}) {
  return (
    <div className="p-4 flex flex-col lg:overflow-y-auto">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 ">
        {selectedSignal ? (
          <div>
            <SignalCard signalCardProps={selectedSignal} />
            <Button className="my-3" onClick={() => setSelectedSignal(null)}>
              <IoIosArrowBack />
            </Button>
          </div>
        ) : (
          signalsInBound.map((signal) => {
            return (
              // <Link
              //   className="flex m-2"
              //   href={`/signals/${signal.id}`}
              //   key={signal.id}
              // >
              <div
                className="flex"
                key={signal.id}
                onClick={() => setSelectedSignal(signal)}
              >
                <SignalCard signalCardProps={signal} />
              </div>
              // </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
