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

export default async function Signals() {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()

  const signals = await db.signal.findMany()

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <MapAndGrid signals={signals} />
      {isAuth ? (
        <Link href="/signals/create" className="h-8 m-4 place-self-end">
          <Button className="w-60 font-bold">Send a Signal</Button>
        </Link>
      ) : (
        <LoginLink
          postLoginRedirectURL="/signals/create"
          className="h-8 m-4 place-self-end"
        >
          <Button className="w-60 font-bold">Send a Signal</Button>
        </LoginLink>
      )}
      <Footer />
    </div>
  )
}
