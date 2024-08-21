import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import getAuthUser from '../api/authServerFunctions'
import ProfileForm from './_components/ProfileForm'

export default async function Profile() {
  const { dbUser } = await getAuthUser()

  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          {dbUser && <ProfileForm dbUser={dbUser} />}
        </div>
        <Footer />
      </div>
    </div>
  )
}
