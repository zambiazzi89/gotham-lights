import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import BlockUserForm from './_components/BlockUserForm'
import ReportUserForm from './_components/ReportUserForm'

export default async function BlockReport({
  params: id,
}: {
  params: { id: string }
}) {
  const { id: username } = id

  const { profile } = await getDbProfileFromServer()

  // If no profile
  if (!profile) {
    redirect('/error?code=no_profile_found')
  }

  // If no username
  if (!profile.username) {
    redirect('/error?code=missing_username')
  }

  // Does the username exist?
  const usernameExists = await db.profile.count({
    where: { username: username },
  })

  if (usernameExists === 0) {
    console.error(`Username ${username} does not exist`)
    redirect('/')
  }

  if (usernameExists > 1) {
    console.error(
      `Username ${username} is not unique. This is an invalid scenario!`
    )
    redirect('/error?code=unique_username')
  }

  // Did the current user already block this username?
  const alreadyBlocked = await db.blocked_profile.count({
    where: {
      blocked_username: username,
      AND: { blocked_by_username: profile.username },
    },
  })

  // Did the current user already report this username?
  const alreadyReported = await db.reported_profile.count({
    where: {
      reported_username: username,
      AND: { reported_by_username: profile.username },
    },
  })

  return (
    <Card className="p-6 max-w-[90svw] md:flex md:gap-4 md:w-[80svw] lg:w-[75svw] xl:w-[60svw]">
      <div className="md:flex-grow md:flex md:flex-col md:justify-between">
        <CardHeader className="font-semibold">Block {username}</CardHeader>
        <CardContent>
          <div>This user will not be able to:</div>
          <div className="pl-2 text-sm">
            <div>See or comment on your signals</div>
            <div>See your comments</div>
            <div>See your chat, if already existent</div>
            <div>Send you messages</div>
          </div>
        </CardContent>
        <CardContent className="my-4">
          {!!alreadyBlocked && (
            <div className="font-semibold text-destructive pb-1">
              You have already blocked this user
            </div>
          )}
          <BlockUserForm
            alreadyBlocked={!!alreadyBlocked}
            currentUsername={profile.username}
            usernameToBlock={username}
          />
        </CardContent>
      </div>
      <DropdownMenuSeparator className="my-4" />
      <div className="md:flex-grow md:flex md:flex-col md:justify-between">
        <CardHeader className="font-semibold">Report {username}</CardHeader>
        <CardContent>
          <div className="text-sm pb-2">Please enter the details below</div>
          {!!alreadyReported && (
            <div className="font-semibold text-destructive pb-1">
              You have already reported this user
            </div>
          )}
        </CardContent>
        <ReportUserForm
          alreadyReported={!!alreadyReported}
          currentUsername={profile.username}
          usernameToReport={username}
        />
      </div>
    </Card>
  )
}
