import { Card, CardContent, CardTitle } from '@/components/ui/card'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import UnblockButton from './_components/UnblockButton'
import GoBackButton from '@/app/signals/[id]/_components/GoBackButton'

export default async function BlockedContacts() {
  const { blockedUsernames } = await getDbProfileFromServer()

  return (
    <div className="flex gap-4">
      <GoBackButton route={'/profile'} styles={'h-auto'} variant="secondary" />
      <Card className="bg-secondary p-4 w-[80svw] lg:w-[50svw] grid place-items-center">
        <CardTitle className="py-4 text-center">Blocked Users</CardTitle>
        <CardContent>
          {!blockedUsernames.length ? (
            <div>You have not blocked any users.</div>
          ) : (
            <div>
              {blockedUsernames.map((blockedUser, i) => (
                <div key={i} className="flex items-center gap-4 py-2">
                  <div className="flex-grow">{blockedUser}</div>
                  <UnblockButton username={blockedUser} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
