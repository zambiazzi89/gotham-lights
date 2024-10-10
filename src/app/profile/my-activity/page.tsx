import GridSignalCard from '@/app/signals/_components/GridSignalCard'
import { Card } from '@/components/ui/card'
import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MySignalsCard from './_components/MySignalsCard'
import MyCommentsCard from './_components/MyCommentsCard'

export default async function MyActivity() {
  const profile = await getDbProfileFromServer()
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
        },
      })
    : []

  return (
    <div className="grid place-items-center">
      <Card className="p-4 flex flex-col gap-2 lg:px-12 max-w-[90svw]">
        <div className="font-bold">My Signals</div>
        <div className="flex flex-col gap-2">
          {mySignals.map((signal) => (
            <MySignalsCard key={signal.id} signal={signal} />
          ))}
        </div>
        <div className="py-3">
          <hr />
        </div>
        <div className="font-bold">My Comments</div>
        {myComments.map((comment) => (
          <MyCommentsCard key={comment.id} comment={comment} />
        ))}
      </Card>
    </div>
  )
}
