'use client'

import SignalCardGrid from './SignalCardGrid'
import { Input } from '@/components/ui/input'
import { LatLong, Signal } from '@/lib/types'
import { useEffect, useState } from 'react'
import ReactGoogleMap from '@/components/ReactGoogleMap'
import { useSearchParams } from 'next/navigation'

export default function MapAndGrid({ signals }: { signals: Signal[] }) {
  const [boundsNE, setBoundsNE] = useState<LatLong>()
  const [boundsSW, setBoundsSW] = useState<LatLong>()
  const [signalsInBound, setSignalsInBound] = useState<Signal[]>([])

  const searchParams = useSearchParams()

  const defaultCenter: LatLong = {
    lat: Number(searchParams.get('lat')) || 40.73061,
    lng: Number(searchParams.get('lng')) || -73.935242,
  }

  const [center, setCenter] = useState<LatLong>(defaultCenter)
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null)

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

  useEffect(() => {
    if (selectedSignal) {
      setCenter({ lat: selectedSignal.latitude, lng: selectedSignal.longitude })
    }
  }, [selectedSignal])

  return (
    <div className="h-full mt-4 grid grid-cols-1 overflow-y-auto md:overflow-hidden md:grid-cols-2">
      <div className="m-4">
        <Input className="border-primary shadow-md" placeholder="Where?" />
        <ReactGoogleMap
          useSearchParams={searchParams.has('lat') && searchParams.has('lng')}
          center={center}
          signals={signals}
          setBoundsNE={setBoundsNE}
          setBoundsSW={setBoundsSW}
        />
      </div>
      <SignalCardGrid
        signalsInBound={signalsInBound}
        setSelectedSignal={setSelectedSignal}
      />
    </div>
  )
}
