import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import MapAndGrid from './_components/MapAndGrid'
import db from '@/db/db'

export default async function Signals() {
  const signals = await db.signal.findMany({})

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <MapAndGrid signals={signals} />
      <Footer />
    </div>
  )
}
