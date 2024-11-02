import GoBackButton from '@/app/signals/[id]/_components/GoBackButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import DeleteReportButton from './_components/DeleteReportButton'

export default async function ReportedUsers() {
  const { reportedUsernames } = await getDbProfileFromServer()

  return (
    <div className="flex gap-4">
      <GoBackButton route={'/profile'} styles={'h-auto'} variant="secondary" />
      <Card className="bg-secondary p-4 w-[80svw] lg:w-[50svw] grid place-items-center">
        <CardTitle className="py-4 text-center">Reported Users</CardTitle>
        <CardContent>
          {!reportedUsernames.length ? (
            <div>You have not blocked any users.</div>
          ) : (
            <div>
              {reportedUsernames.map((reportedUser, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                  <div>{reportedUser.reported_username}</div>
                  <div className="flex-grow">{reportedUser.reason}</div>
                  <DeleteReportButton
                    username={reportedUser.reported_username}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
