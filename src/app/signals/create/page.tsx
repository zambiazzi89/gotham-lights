import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CreateSignalForm from './_components/CreateSignalForm'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CreateSignal() {
  const profile = await getDbProfileFromServer()
  return (
    <div className="h-svh">
      <div className="grid grid-rows-layout h-full">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          {profile.username ? (
            <CreateSignalForm />
          ) : (
            <div className="flex flex-col items-center">
              <p>You must create a username before creating a Signal.</p>
              <Link className="my-3" href="/profile">
                <Button>Update Profile</Button>
              </Link>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}
