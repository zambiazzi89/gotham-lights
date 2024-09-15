import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MessageRequestForm from './_components/MessageRequestForm'

export default async function MessageDraft({
  params: id,
}: {
  params: { id: string }
}) {
  const { id: toUsername } = id
  const profile = await getDbProfileFromServer()
  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />

        <MessageRequestForm toUsername={toUsername} />
        <Footer />
      </div>
    </div>
  )
}
