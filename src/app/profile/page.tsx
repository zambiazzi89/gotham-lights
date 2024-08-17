import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import getAuthUser from '../api/authServerFunctions'

export default async function Profile() {
  const { dbUser } = await getAuthUser()

  console.log(dbUser)

  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          {dbUser && (
            <>
              <div>Hi {dbUser.firstName}! Here's your profile information:</div>
              <div>Id: {dbUser.id}</div>
              <div>Email: {dbUser.emailAddress}</div>
              <div>First name: {dbUser.firstName}</div>
              <div>Last name: {dbUser.lastName}</div>
              <div>Username: {dbUser.username}</div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}
