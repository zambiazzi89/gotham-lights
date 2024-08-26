import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CreateSignalForm from './_components/CreateSignalForm'
import getServerSession from '@/utils/supabase/customFunctions/getServerSession'

export default async function CreateSignal() {
  const session = await getServerSession()
  return (
    <div className="h-svh">
      <div className="grid grid-rows-layout h-full">
        <Navbar isAuth={!!session} />
        <div className="flex flex-col justify-center items-center">
          <CreateSignalForm />
        </div>
        <Footer />
      </div>
    </div>
  )
}
