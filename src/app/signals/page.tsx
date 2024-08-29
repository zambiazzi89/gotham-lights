import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MapAndGrid from './_components/MapAndGrid'
import db from '@/db/db'

export default async function Signals() {
  const signals = await db.signal.findMany({})

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <MapAndGrid signals={signals} />
      <div className="h-14 flex justify-end items-center">
        <Link href="/signals/create" className="h-8 m-4">
          <Button className="w-60 font-bold">Send a Signal</Button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
