import ProfileForm from './_components/ProfileForm'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import Link from 'next/link'
import { Card } from '@/components/ui/card'

export default async function Profile() {
  const { profile } = await getDbProfileFromServer()

  return (
    <div className="flex flex-col md:grid md:grid-cols-1fr-2fr gap-2">
      <Card className="p-4 flex flex-col gap-2 font-semibold">
        <div className="text-muted-foreground">Profile</div>
        <Link href="/profile/my-activity">My Activity</Link>
        <Link href="/profile/blocked-users">Blocked Users</Link>
        <Link href="/profile/reported-users">Reported Users</Link>
        <Link
          href="/profile/delete-account"
          className="hidden md:flex mt-auto text-destructive"
        >
          Delete Account
        </Link>
      </Card>
      <ProfileForm profile={profile} />
      <Link
        href="/profile/delete-account"
        className="flex md:hidden pt-6 mt-auto font-semibold text-destructive"
      >
        Delete Account
      </Link>
    </div>
  )
}
