import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import LandingPage from './_components/LandingPage'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { profile } = await getDbProfileFromServer()

  if (!profile.username) {
    redirect('/profile')
  }

  return (
    <div className="grid place-items-center ">
      <div className="-z-10 absolute top-0 left-0 min-h-svh w-full bg-opacity-50 bg-black" />
      <div className="-z-20 absolute top-0 left-0 min-h-svh w-full bg-[url(/bg-img4.jpeg)] bg-center bg-cover" />
      <LandingPage />
    </div>
  )
}
