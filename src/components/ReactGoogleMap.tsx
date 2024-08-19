import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'
import { LatLong, Signal } from '@/lib/types'

function ReactGoogleMap({
  useSearchParams,
  center,
  signals,
  setBoundsNE,
  setBoundsSW,
}: {
  useSearchParams: boolean
  center: LatLong
  signals: Signal[]
  setBoundsNE: Dispatch<SetStateAction<LatLong | undefined>>
  setBoundsSW: Dispatch<SetStateAction<LatLong | undefined>>
}) {
  const isLoaded = useGoogleAPIContext()

  const containerStyle = {
    width: '80%',
    height: '80%',
  }

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    let bounds: google.maps.LatLngBounds | null = null
    if (useSearchParams) {
      bounds = new window.google.maps.LatLngBounds(center)
    } else {
      bounds = new window.google.maps.LatLngBounds()
      signals.map((signal) => {
        bounds?.extend({
          lat: signal.latitude,
          lng: signal.longitude,
        })
      })
    }

    map.fitBounds(bounds)

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

  // useEffect(() => {
  //   if (map) {
  //     const bounds = new window.google.maps.LatLngBounds()
  //     signals.map((signal) => {
  //       bounds.extend({
  //         lat: signal.latitude,
  //         lng: signal.longitude,
  //       })
  //     })
  //     map.fitBounds(bounds)
  //   }
  // }, [map, signals])

  return isLoaded ? (
    <div className="grid place-items-center h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onBoundsChanged={setBounds}
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
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default React.memo(ReactGoogleMap)
