'use client'

import GoogleAutocompleteInput from '@/components/googleAutocomplete'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null)

  useEffect(() => {
    if (selectedLocation) {
      router.push(
        `/signals?lat=${selectedLocation.geometry?.location?.lat()}&lng=${selectedLocation.geometry?.location?.lng()}`
      )
    }
  }, [selectedLocation])

  return (
    <div className="flex flex-col justify-center items-center text-white">
      <div className="max-w-[80vw] flex flex-col items-center bg-black bg-opacity-50  backdrop-blur-sm p-8 rounded border-white">
        <h2 className="text-center text-2xl">Crushed on a stranger in NYC?</h2>
        <h2 className="font-medium text-2xl text-primary">
          Send them a signal!
        </h2>
        <GoogleAutocompleteInput setSelectedLocation={setSelectedLocation} />
      </div>
    </div>
  )
}
