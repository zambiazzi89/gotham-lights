import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MapAndGrid from './_components/MapAndGrid'
import db from '@/db/db'
import getUsername from './_actions/getUsername'
import { Signal } from '@/lib/types'
import getServerSession from '@/utils/supabase/customFunctions/getServerSession'

export default async function Signals() {
  const session = await getServerSession()

  const signals = await db.signal.findMany({})

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar isAuth={!!session} />
      <MapAndGrid signals={signals} />
      <div className="h-14 flex justify-end items-center">
        {session ? (
          <Link href="/signals/create" className="h-8 m-4">
            <Button className="w-60 font-bold">Send a Signal</Button>
          </Link>
        ) : (
          <Link href="/login" className="h-8 m-4">
            <Button className="w-60 font-bold">Login to send a Signal</Button>
          </Link>
        )}
      </div>
      <Footer />
    </div>
  )
}
