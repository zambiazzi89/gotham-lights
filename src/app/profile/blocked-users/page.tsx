import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

export default async function BlockedContacts() {
  const { profile, blockedUsernames } = await getDbProfileFromServer()

  return (
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
                <Button variant={'default'}>Unblock</Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
