'use client'

import SignalCardGrid from './SignalCardGrid'
import { LatLong, Signal } from '@/lib/types'
import { useEffect, useState } from 'react'
import ReactGoogleMap from '@/components/ReactGoogleMap'
import { useRouter, useSearchParams } from 'next/navigation'
import GoogleAutocompleteInput from '@/components/googleAutocomplete'

export default function MapAndGrid({ signals }: { signals: Signal[] }) {
  const router = useRouter()

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

  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null)

  useEffect(() => {
    if (selectedLocation) {
      router.push(
        `/signals?lat=${selectedLocation.geometry?.location?.lat()}&lng=${selectedLocation.geometry?.location?.lng()}`
      )
    }
  }, [selectedLocation])

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
    <div className="h-full flex flex-col overflow-y-auto lg:grid lg:overflow-hidden lg:grid-cols-2">
      <div className="lg:h-full m-4">
        <div className="m-4">
          <GoogleAutocompleteInput setSelectedLocation={setSelectedLocation} />
        </div>
        <div className="h-[400px] md:h-[500px] lg:h-full">
          <ReactGoogleMap
            useSearchParams={searchParams.has('lat') && searchParams.has('lng')}
            center={center}
            signals={signals}
            setBoundsNE={setBoundsNE}
            setBoundsSW={setBoundsSW}
          />
        </div>
      </div>
      <SignalCardGrid
        signalsInBound={signalsInBound}
        selectedSignal={selectedSignal}
        setSelectedSignal={setSelectedSignal}
      />
    </div>
  )
}
