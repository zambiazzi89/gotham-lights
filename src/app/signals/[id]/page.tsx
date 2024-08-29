import db from '@/db/db'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SignalCard from './_components/SignalCard'
import GoBackButton from './_components/GoBackButton'
import CommentSection from './_components/CommentSection'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

export default async function UniqueSignal({
  params: id,
}: {
  params: { id: string }
}) {
  const profile = await getDbProfileFromServer()
  const { id: signalId } = id

  const signal = await db.signal.findUnique({
    include: {
      comments: { include: { profile: { select: { username: true } } } },
      profile: {
        select: { username: true },
      },
    },
    where: {
      id: signalId,
    },
  })

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      {signal ? (
        <div className="pt-12 px-3 overflow-y-auto xl:w-[50%] justify-self-center">
          <SignalCard signalCardProps={signal} />
          <CommentSection
            comments={signal.comments}
            signalId={signal.id}
            hasUsername={!!profile.username}
          />
        </div>
      ) : (
        <div className="grid place-items-center">
          <h1>Signal not found</h1>
        </div>
      )}
      <div className="mx-3">
        <GoBackButton />
      </div>
      <Footer />
    </div>
  )
}
