import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  getKindeServerSession,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/server'
import MapAndGrid from './_components/MapAndGrid'
import db from '@/db/db'
import getUsername from './_actions/getUsername'
import { Signal } from '@/lib/types'

export default async function Signals() {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()

  const signals = await db.signal.findMany()
  const signalsWithUsername: Signal[] = await Promise.all(
    signals.map(
      async (signal) =>
        ({
          ...signal,
          createdByUsername: await getUsername(signal.createdByUserId),
        } as Signal)
    )
  )

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <MapAndGrid signals={signalsWithUsername} />
      <div className="h-14 flex justify-end items-center">
        {isAuth ? (
          <Link href="/signals/create" className="h-8 m-4">
            <Button className="w-60 font-bold">Send a Signal</Button>
          </Link>
        ) : (
          <LoginLink postLoginRedirectURL="/signals/create" className="h-8 m-4">
            <Button className="w-60 font-bold">Send a Signal</Button>
          </LoginLink>
        )}
      </div>
      <Footer />
    </div>
  )
}
