import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MessageBox from './_components/MessageBox'
import db from '@/db/db'

export default async function Messages() {
  const profile = await getDbProfileFromServer()

  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        {profile.username ? (
          <MessageBox username={profile.username} />
        ) : (
          <div className="grid place-items-center">
            <div className="flex flex-col items-center">
              <p>
                You must create a username before using the Message
                functionality.
              </p>
              <Link className="my-3" href="/profile">
                <Button>Update Profile</Button>
              </Link>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  )
}
