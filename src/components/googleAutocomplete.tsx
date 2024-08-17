'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'
import { LatLong } from '@/lib/types'

export default function GoogleAutocompleteInput({
  setSelectedLocation,
}: {
  setSelectedLocation: Dispatch<
    SetStateAction<google.maps.places.PlaceResult | null>
  >
}) {
  const defaultLatlong: LatLong = { coordinates: [40.73061, -73.935242] }

  const [location, setLocation] = useState<LatLong>(defaultLatlong)

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = await coords
        setLocation({ coordinates: [latitude, longitude] })
      })
    }
  }, [])

  const isLoaded = useGoogleAPIContext()

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const autocompleteRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isLoaded) {
      // bounds [SW,NE]
      const NYCBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng({ lat: 40.481145, lng: -74.263983 }),
        new google.maps.LatLng({ lat: 40.916347, lng: -73.673468 })
      )

      // Set autocomplete
      const autocompleteInput = new google.maps.places.Autocomplete(
        autocompleteRef.current as HTMLInputElement,
        {
          strictBounds: true,
          bounds: NYCBounds,
          fields: ['address_components', 'geometry', 'name'],
        }
      )
      setAutocomplete(autocompleteInput)
    }
  }, [isLoaded])

  useEffect(() => {
    autocomplete?.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      setSelectedLocation(place)
      // console.log(place)
      // const position = place.geometry?.location
      // console.log(position)
      // console.log(position?.lat())
    })
  }, [autocomplete])
  return (
    <div className="flex w-full items-center">
      <Input
        name="googleAutocomplete"
        type="text"
        placeholder="Where?"
        ref={autocompleteRef}
      />
    </div>
  )
}
