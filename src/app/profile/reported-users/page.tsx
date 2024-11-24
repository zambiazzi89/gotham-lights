import GoBackButton from '@/app/signals/[id]/_components/GoBackButton'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import DeleteReportButton from './_components/DeleteReportButton'

export default async function ReportedUsers() {
  const { reportedUsernames } = await getDbProfileFromServer()

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <GoBackButton styles={'h-auto'} variant="secondary" />
      <Card className="bg-secondary p-4 w-[80svw] lg:w-[50svw] grid place-items-center gap-4">
        <CardTitle className="text-center">Reported Users</CardTitle>
        <CardContent>
          {!reportedUsernames.length ? (
            <div>You have not reported any users.</div>
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
