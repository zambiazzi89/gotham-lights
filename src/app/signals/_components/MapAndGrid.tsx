'use client'

import SignalCardGrid from './SignalCardGrid'
import { LatLong, Signal, SignalWithComment } from '@/lib/types'
import { useEffect, useState } from 'react'
import ReactGoogleMap from '@/components/GoogleTools/ReactGoogleMap'
import GoogleAutocompleteInput from '@/components/GoogleTools/googleAutocomplete'
import { subwayLine } from '@/data/SubwayLines'

export default function MapAndGrid({
  signals,
  selectedSubwayLine,
}: {
  signals: SignalWithComment[]
  selectedSubwayLine?: subwayLine
}) {
  const [boundsNE, setBoundsNE] = useState<LatLong>()
  const [boundsSW, setBoundsSW] = useState<LatLong>()
  const [signalsInBound, setSignalsInBound] = useState<SignalWithComment[]>([])

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
    <div className="h-full flex flex-col overflow-y-auto lg:grid lg:overflow-hidden lg:grid-cols-2">
      <div className="lg:h-full m-4">
        <div className="m-4">
          <GoogleAutocompleteInput />
        </div>
        <div className="h-[400px] md:h-[500px] lg:h-[85%]">
          <ReactGoogleMap
            signals={signals}
            setBoundsNE={setBoundsNE}
            setBoundsSW={setBoundsSW}
          />
        </div>
      </div>
      <SignalCardGrid
        signalsInBound={signalsInBound}
        selectedSubwayLine={selectedSubwayLine}
      />
    </div>
  )
}
