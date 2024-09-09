import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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

  const [fitBounds, setFitBounds] = useState(false)

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const searchParams = useSearchParams()

  const paramsExist = searchParams.has('lat') && searchParams.has('lng')

  const paramsCenter: LatLong = {
    lat: Number(searchParams.get('lat')),
    lng: Number(searchParams.get('lng')),
  }
  const defaultCenter: LatLong = {
    lat: 40.7394225,
    lng: -73.990602,
  }

  const firstSignalCenter: LatLong = {
    lat: signals[0].latitude,
    lng: signals[0].longitude,
  }

  const center = paramsExist
    ? paramsCenter
    : signals.length === 1
    ? firstSignalCenter
    : defaultCenter

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    if (!paramsExist && signals.length > 1) {
      signals.map((signal) => {
        bounds?.extend({
          lat: signal.latitude,
          lng: signal.longitude,
        })
      })
      map.fitBounds(bounds)
      setFitBounds(true)
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
  ) : (
    <div>Loading...</div>
  )
}

export default React.memo(ReactGoogleMap)
