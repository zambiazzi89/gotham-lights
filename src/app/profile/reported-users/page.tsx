import { Card, CardContent, CardTitle } from '@/components/ui/card'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

export default async function ReportedUsers() {
  const { reportedUsernames } = await getDbProfileFromServer()

  return (
    <div>
      <Card className="bg-secondary p-4 w-[80svw] lg:w-[50svw] grid place-items-center">
        <CardTitle className="py-4 text-center">Reported Users</CardTitle>
        <CardContent>
          {!reportedUsernames.length ? (
            <div>You have not blocked any users.</div>
          ) : (
            <div>
              {reportedUsernames.map((reportedUser, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                  <div className="flex-grow">
                    {reportedUser.reported_username}
                  </div>
                  <div className="">{reportedUser.reason}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
