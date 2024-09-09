import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import MapAndGrid from './_components/MapAndGrid'
import db from '@/db/db'
import MyLocationButton from './_components/MyLocationButton'

export default async function Signals() {
  const signals = await db.signal.findMany({})

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <MapAndGrid signals={signals} />
      <div className="h-14 px-4 flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <Button variant={'secondary'}>View All</Button>
          <MyLocationButton />
        </div>
        <Link href="/signals/create" className="h-8">
          <Button className="px-8 sm:px-16 font-bold">Create a Signal</Button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
