import { Card } from '@/components/ui/card'
import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MySignalsCard from './_components/MySignalsCard'
import MyCommentsCard from './_components/MyCommentsCard'
import GoBackButton from '@/app/signals/[id]/_components/GoBackButton'

export default async function MyActivity() {
  const { profile, allBlocks } = await getDbProfileFromServer()

  // Get Signal IDs created by blocked usernames to omit them
  const blockedSignals = await db.signal.findMany({
    where: {
      created_by_username: { in: allBlocks },
    },
    select: {
      id: true,
    },
  })

  const mySignals = profile.username
    ? await db.signal.findMany({
        where: {
          created_by_username: profile.username,
        },
      })
    : []

  const myComments = profile.username
    ? await db.comment.findMany({
        where: {
          created_by_username: profile.username,
          signal_id: {
            notIn: blockedSignals.map((signal) => signal.id),
          },
        },
      })
    : []

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <GoBackButton styles={'h-auto'} variant="secondary" />
      <Card className="py-8 flex flex-col gap-2 lg:px-12 max-w-[90svw] p-8">
        <div className="font-bold">My Signals</div>
        {!mySignals.length && (
          <div className="text-muted-foreground">No signals to display</div>
        )}
        <div className="flex flex-col gap-2">
          {mySignals.map((signal) => (
            <MySignalsCard key={signal.id} signal={signal} />
          ))}
        </div>
        <div className="py-3">
          <hr />
        </div>
        <div className="font-bold">My Comments</div>
        {!myComments.length && (
          <div className="text-muted-foreground">No comments to display</div>
        )}
        {myComments.map((comment) => (
          <MyCommentsCard key={comment.id} comment={comment} />
        ))}
      </Card>
    </div>
  )
}
