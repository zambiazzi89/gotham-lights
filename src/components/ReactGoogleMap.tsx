import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'
import { LatLong, Signal } from '@/lib/types'

function ReactGoogleMap({
  signals,
  setBoundsNE,
  setBoundsSW,
}: {
  signals: Signal[]
  setBoundsNE: Dispatch<SetStateAction<LatLong | undefined>>
  setBoundsSW: Dispatch<SetStateAction<LatLong | undefined>>
}) {
  const isLoaded = useGoogleAPIContext()

  const containerStyle = {
    width: '100%',
    height: '100%',
  }
  const center: LatLong = { lat: 40.73061, lng: -73.935242 }

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center)
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

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds()
      signals.map((signal) => {
        bounds.extend({
          lat: signal.latitude,
          lng: signal.longitude,
        })
      })
      map.fitBounds(bounds)
    }
  }, [map, signals])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onBoundsChanged={setBounds}
    >
      {signals &&
        signals.map((signal) => {
          return (
            <Marker
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
