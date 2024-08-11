'use client'

import { LatLong } from '@/lib/types'
import { useEffect, useRef, useState } from 'react'

export default function GoogleMap({
  isLoaded,
  latlong,
}: {
  isLoaded: boolean
  latlong: LatLong
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: {
          lat: latlong.coordinates[0],
          lng: latlong.coordinates[1],
        },
        zoom: 13,
        mapId: 'Gotham',
      }

      // Initialize the map
      const googleMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions
      )

      setMap(googleMap)
    }
  }, [isLoaded, latlong])

  return (
    <div className="flex flex-col space-y-4">
      {isLoaded ? (
        <div className="h-96 w-full" ref={mapRef}></div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
