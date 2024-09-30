import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LandingPage from './_components/LandingPage'

export default async function Home() {
  return (
    <div className="min-h-svh bg-[url(/bg-img4.jpeg)] bg-center bg-cover">
      <div className="grid grid-rows-layout bg-opacity-50 min-h-svh bg-black">
        <Navbar fontColor="text-white" withToggle={false} />
        <LandingPage />
        <Footer />
      </div>
    </div>
  )
}
