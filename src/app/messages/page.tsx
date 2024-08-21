import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import getAuthUser from '../api/authServerFunctions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Messages() {
  const { dbUser } = await getAuthUser()

  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          {dbUser?.username ? (
            <div>Hi {dbUser.username}!</div>
          ) : (
            <div className="flex flex-col items-center">
              <p>
                You must create a username before using the Message
                functionality.
              </p>
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
