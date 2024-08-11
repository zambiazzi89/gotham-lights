'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'

export default function GoogleAutocompleteInput() {
  const isLoaded = useGoogleAPIContext()

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const autocompleteRef = useRef<HTMLInputElement>(null)

  const [selectedLocation, setSelectedLocation] = useState<String | null>(null)

  useEffect(() => {
    if (isLoaded) {
      // bounds
      const NYCBounds = new google.maps.LatLngBounds(
        // SW
        new google.maps.LatLng({ lat: 40.481145, lng: -74.263983 }),
        // NE
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
      setSelectedLocation(place.formatted_address as String)
      console.log(place)
      const position = place.geometry?.location
      console.log(position)
      console.log(position?.lat())
    })
  }, [autocomplete])
  return (
    <div className="flex w-full items-center py-2">
      <Input type="text" placeholder="Where?" ref={autocompleteRef} />
    </div>
  )
}
