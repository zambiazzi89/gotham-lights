'use client'

import SignalCardGrid from './SignalCardGrid'
import { LatLong, Signal } from '@/lib/types'
import { useEffect, useState } from 'react'
import ReactGoogleMap from '@/components/ReactGoogleMap'
import GoogleAutocompleteInput from '@/components/googleAutocomplete'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MyLocationButton from '../_components/MyLocationButton'
import { useRouter } from 'next/navigation'

export default function MapAndGrid({ signals }: { signals: Signal[] }) {
  const [boundsNE, setBoundsNE] = useState<LatLong>()
  const [boundsSW, setBoundsSW] = useState<LatLong>()
  const [signalsInBound, setSignalsInBound] = useState<Signal[]>([])
  const router = useRouter()

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
    <>
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
        <SignalCardGrid signalsInBound={signalsInBound} />
      </div>
      <div className="h-14 px-4 flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <Link href="/signals?viewAll=true">
            <Button variant={'secondary'}>View All</Button>
          </Link>
          <MyLocationButton />
        </div>
        <Link href="/signals/create" className="h-8">
          <Button className="px-8 sm:px-16 font-bold">Create a Signal</Button>
        </Link>
      </div>
    </>
  )
}
