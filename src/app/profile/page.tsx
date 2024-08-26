import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProfileForm from './_components/ProfileForm'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

export default async function Profile() {
  const profile = await getDbProfileFromServer()

  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar isAuth={!!profile} />
        <div className="flex flex-col justify-center items-center">
          <ProfileForm profile={profile} />
        </div>
        <Footer />
      </div>
    </div>
  )
}
