import GridSignalCard from '@/app/signals/_components/GridSignalCard'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Card } from '@/components/ui/card'
import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

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
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="grid place-items-center">
          <Card className="p-4 flex flex-col gap-2">
            <div className="font-bold">My Signals</div>
            {mySignals.map((signal) => (
              <GridSignalCard key={signal.id} signalCardProps={signal} />
            ))}
            <div className="py-3">
              <hr />
            </div>
            <div className="font-bold">My Comments</div>
            {myComments.map((comment) => (
              <div key={comment.id}>
                {comment.content}
                <br />
                <span className="text-sm text-muted-foreground">
                  {comment.created_at.toLocaleDateString()}
                </span>
              </div>
            ))}
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  )
}
