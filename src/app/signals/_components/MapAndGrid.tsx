'use client'

import SignalCardGrid from './SignalCardGrid'
import { Input } from '@/components/ui/input'
import { LatLong, Signal } from '@/lib/types'
import { useEffect, useState } from 'react'
import ReactGoogleMap from '@/components/ReactGoogleMap'

export default function MapAndGrid({ signals }: { signals: Signal[] }) {
  const [boundsNE, setBoundsNE] = useState<LatLong>()
  const [boundsSW, setBoundsSW] = useState<LatLong>()
  const [signalsInBound, setSignalsInBound] = useState<Signal[]>([])

  useEffect(() => {
    if (boundsNE && boundsSW) {
      setSignalsInBound(
        signals.filter((signal) => {
          if (
            signal.latitude < boundsNE.lat &&
            signal.latitude > boundsSW.lat &&
            signal.longitude < boundsNE.lng &&
            signal.longitude > boundsSW.lng
          )
            return signal
        })
      )
    }
  }, [boundsNE, boundsSW])

  return (
    <div className="mt-4 grid grid-cols-1 overflow-y-auto md:overflow-hidden md:grid-cols-2">
      <div className="m-4">
        <Input className="border-primary shadow-md" placeholder="Where?" />
        <div className="my-4 h-40 md:h-full text-center">
          <ReactGoogleMap
            signals={signals}
            setBoundsNE={setBoundsNE}
            setBoundsSW={setBoundsSW}
          />
        </div>
      </div>
      <SignalCardGrid signalsInBound={signalsInBound} />
    </div>
  )
}
