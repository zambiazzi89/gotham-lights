'use client'

import { Button } from '@/components/ui/button'
import { LatLong } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { MdOutlineMyLocation } from 'react-icons/md'

export default function MyLocationButton() {
  const router = useRouter()
  const [userLocation, setUserLocation] = useState<LatLong | null>(null)

  function handleUserLocation() {
    if (userLocation) {
      router.push(`/signals?lat=${userLocation.lat}&lng=${userLocation.lng}`)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  return (
    <>
      <Button
        variant={'secondary'}
        className="hidden sm:block"
        onClick={() => handleUserLocation()}
      >
        My Location
      </Button>
      <Button
        variant={'secondary'}
        className="sm:hidden"
        onClick={() => handleUserLocation()}
      >
        <MdOutlineMyLocation />
      </Button>
    </>
  )
}
