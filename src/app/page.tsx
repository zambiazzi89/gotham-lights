import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LandingPage from './_components/LandingPage'
import getServerSession from '@/utils/supabase/customFunctions/getServerSession'

export default async function Home() {
  const session = await getServerSession()

  return (
    <div className="min-h-svh bg-[url(/bg-img4.jpeg)] bg-center bg-cover">
      <div className="grid grid-rows-layout bg-opacity-50 min-h-svh bg-black">
        <Navbar isAuth={!!session} fontColor="text-white" withToggle={false} />
        <LandingPage />
        <Footer />
      </div>
    </div>
  )
}
