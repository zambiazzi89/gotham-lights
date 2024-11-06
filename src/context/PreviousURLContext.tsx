'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

const PreviousUrlContext = createContext<string | null>(null)

export const PreviousUrlProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [previousURL, setPreviousURL] = useState<string | null>(null)
  const [currentURL, setCurrentsURL] = useState<string | null>(null)
  const path = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setPreviousURL(currentURL)

    !searchParams.toString()
      ? setCurrentsURL(path)
      : setCurrentsURL(`${path}?${searchParams}`)
  }, [path, searchParams])

  return (
    <PreviousUrlContext.Provider value={previousURL}>
      {children}
    </PreviousUrlContext.Provider>
  )
}

export function usePreviousURLContext() {
  const context = useContext(PreviousUrlContext)

  return context
}
