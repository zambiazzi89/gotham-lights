import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Profile() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <div>Hi {user?.given_name}! Here's your profile information:</div>
          <div>Id: {user?.id}</div>
          <div>Email: {user?.email}</div>
          <div>First name: {user?.given_name}</div>
          <div>Last name: {user?.family_name}</div>
          <div>Username: {user?.username}</div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
