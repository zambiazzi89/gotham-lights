'use client'

import { Library } from '@googlemaps/js-api-loader'
import { useJsApiLoader } from '@react-google-maps/api'
import { createContext, useContext } from 'react'

const GoogleAPIContext = createContext<boolean | null>(null)

const libs: Library[] = ['places', 'core', 'maps', 'marker']

type GoogleAPIContextProviderProps = {
  children: React.ReactNode
}

export default function GoogleAPIContextProvider({
  children,
}: GoogleAPIContextProviderProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
    libraries: libs,
  })

  return (
    <GoogleAPIContext.Provider value={isLoaded}>
      {children}
    </GoogleAPIContext.Provider>
  )
}

export function useGoogleAPIContext() {
  const context = useContext(GoogleAPIContext)
  if (context === null) {
    throw new Error(
      'useGoogleAPIContext must be used within a GoogleAPIContextProvider'
    )
  }
  return context
}
