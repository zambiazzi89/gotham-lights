import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'
import { LatLong, Signal } from '@/lib/types'
import { useRouter, useSearchParams } from 'next/navigation'

function ReactGoogleMap({
  signals,
  setBoundsNE,
  setBoundsSW,
}: {
  signals: Signal[]
  setBoundsNE: Dispatch<SetStateAction<LatLong | undefined>>
  setBoundsSW: Dispatch<SetStateAction<LatLong | undefined>>
}) {
  const router = useRouter()

  const isLoaded = useGoogleAPIContext()

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const searchParams = useSearchParams()

  const paramsExist = searchParams.has('lat') && searchParams.has('lng')

  const center: LatLong = {
    lat: Number(searchParams.get('lat')) || 40.73061,
    lng: Number(searchParams.get('lng')) || -73.935242,
  }

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    let bounds: google.maps.LatLngBounds | null = null
    if (paramsExist) {
      bounds = new window.google.maps.LatLngBounds(center)
    } else {
      bounds = new window.google.maps.LatLngBounds()
      signals.map((signal) => {
        bounds?.extend({
          lat: signal.latitude,
          lng: signal.longitude,
        })
      })
      map.fitBounds(bounds)
    }

    setMap(map)
  }, [])

  function setBounds() {
    const bounds = map?.getBounds()
    if (bounds) {
      setBoundsNE({
        lat: bounds.getNorthEast().lat(),
        lng: bounds.getNorthEast().lng(),
      })
      setBoundsSW({
        lat: bounds.getSouthWest().lat(),
        lng: bounds.getSouthWest().lng(),
      })
    }
  }

  function handleDragEnd() {
    const selectedLocation = map?.getCenter()
    if (selectedLocation) {
      router.push(
        `/signals?lat=${selectedLocation.lat()}&lng=${selectedLocation.lng()}`
      )
    }
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onBoundsChanged={setBounds}
        onDragEnd={handleDragEnd}
      >
        {signals &&
          signals.map((signal) => {
            return (
              <Marker
                key={signal.id}
                position={{ lat: signal.latitude, lng: signal.longitude }}
              />
            )
          })}
      </GoogleMap>
    </>
  ) : (
    <div>Loading...</div>
  )
}

export default React.memo(ReactGoogleMap)
