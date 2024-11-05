import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'
import { LatLong, Signal } from '@/lib/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { darkMapStyles } from './darkMapStyles'

function ReactGoogleMap({
  signals,
  setBoundsNE,
  setBoundsSW,
}: {
  signals: Signal[]
  setBoundsNE: Dispatch<SetStateAction<LatLong | undefined>>
  setBoundsSW: Dispatch<SetStateAction<LatLong | undefined>>
}) {
  const { theme } = useTheme()

  const router = useRouter()
  const pathname = usePathname()

  const isLoaded = useGoogleAPIContext()

  const containerStyle = {
    width: '100%',
    height: '100%',
  }

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const searchParams = useSearchParams()

  const paramsExist = searchParams.has('lat') && searchParams.has('lng')

  const zoomParam = Number(searchParams.get('zoom'))
  const viewAll = Boolean(searchParams.get('viewAll'))

  const paramsCenter: LatLong = {
    lat: Number(searchParams.get('lat')),
    lng: Number(searchParams.get('lng')),
  }
  const defaultCenter: LatLong = {
    lat: 40.7394225,
    lng: -73.990602,
  }

  const defaultZoom: number = zoomParam || 15

  const firstSignalCenter: LatLong = {
    lat: signals[0]?.latitude || defaultCenter.lat,
    lng: signals[0]?.longitude || defaultCenter.lng,
  }

  // Update zoom if it's coming from Params
  useEffect(() => {
    if (zoomParam && zoomParam !== map?.getZoom()) {
      map?.setZoom(zoomParam)
    }
  }, [zoomParam])

  // Update zoom if it's coming from Params
  useEffect(() => {
    if (viewAll) {
      map?.moveCamera({
        center: {
          lat: signals[0]?.latitude || defaultCenter.lat,
          lng: signals[0]?.longitude || defaultCenter.lng,
        },
        zoom: 15,
      })
      const bounds = map?.getBounds()
      if (bounds) {
        signals.map((signal) => {
          bounds?.extend({
            lat: signal.latitude,
            lng: signal.longitude,
          })
        })
        map?.fitBounds(bounds)
      }
    }
  }, [viewAll])

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
    }

    setMap(map)
  }, [])

  // Updates the Signals in Bound
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

  // Updates the URL Params
  function handleDragEnd() {
    const selectedLocation = map?.getCenter()
    const zoom = map?.getZoom()
    if (selectedLocation) {
      router.push(
        `${pathname}?lat=${selectedLocation.lat()}&lng=${selectedLocation.lng()}&zoom=${zoom}`
      )
    }
  }

  // Updates the URL Params
  function handleZoomChange() {
    const selectedLocation = map?.getCenter()
    const zoom = map?.getZoom()
    if (selectedLocation) {
      router.push(
        `${pathname}?lat=${selectedLocation.lat()}&lng=${selectedLocation.lng()}&zoom=${zoom}`
      )
    }
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={defaultZoom}
      onLoad={onLoad}
      onBoundsChanged={setBounds}
      onDragEnd={handleDragEnd}
      onZoomChanged={handleZoomChange}
      options={theme === 'dark' ? { styles: darkMapStyles } : { styles: [] }}
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
