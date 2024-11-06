import db from '@/db/db'
import SignalCard from './_components/SignalCard'
import CommentSection from './_components/CommentSection'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MySignalCard from './_components/MySignalCard'
import GoBackButton from './_components/GoBackButton'
import markSignalAsRead from './_actions/markSignalAsRead'

export default async function UniqueSignal({
  params: id,
}: {
  params: { id: string }
}) {
  const { profile, allBlocks } = await getDbProfileFromServer()
  const { id: signalId } = id

  const signal = await db.signal.findUnique({
    include: {
      comments: {
        where: { created_by_username: { notIn: allBlocks } },
        include: { profile: { select: { username: true } } },
      },
      profile: {
        select: { username: true },
      },
    },
    where: {
      id: signalId,
      created_by_username: { notIn: allBlocks },
    },
  })

  if (signal?.id) {
    markSignalAsRead(signal.id)
  }

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
        <div className="flex flex-col items-center gap-4">
          <div>Signal not found</div>
          <GoBackButton />
        </div>
      )}
    </div>
  )
}
