'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'
import { useRouter } from 'next/navigation'

/*
  If setSelectedLocationFromProps is passed, it will just update the state
  If nothing is passed, selecting a location will push the coordinates to the signals URL
*/

export default function GoogleAutocompleteInput({
  setSelectedLocationFromProps,
}: {
  setSelectedLocationFromProps?: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult | null>
  >
}) {
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
      setSelectedLocationFromProps
        ? setSelectedLocationFromProps(place)
        : setSelectedLocation(place)
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
