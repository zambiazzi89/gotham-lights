import db from '@/db/db'
import SignalCard from './_components/SignalCard'
import GoBackButton from './_components/GoBackButton'
import CommentSection from './_components/CommentSection'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MySignalCard from './_components/MySignalCard'

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
    <div className="h-full w-full py-4 grid place-items-center">
      {signal ? (
        <div className="flex flex-col w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
          {profile.username === signal.created_by_username ? (
            <MySignalCard signalCardProps={signal} />
          ) : (
            <SignalCard signalCardProps={signal} />
          )}
          <CommentSection
            comments={signal.comments}
            signalId={signal.id}
            username={profile.username}
          />
        </div>
      ) : (
        <div>Signal not found</div>
      )}
    </div>
  )
}
