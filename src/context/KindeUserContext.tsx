import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { createContext, useContext } from 'react'

const KindeUserContext = createContext<KindeUser | null>(null)

export default async function KindeUserContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <KindeUserContext.Provider value={user}>
      {children}
    </KindeUserContext.Provider>
  )
}

export function useKindeUserContext() {
  const context = useContext(KindeUserContext)
  if (context === null) {
    throw new Error(
      'useKindeUserContext must be used within a KindeUserContextProvider'
    )
  }
  return context
}
