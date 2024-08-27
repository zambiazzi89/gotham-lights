import db from '@/db/db'
import getServerUser from './getServerUser'
import { redirect } from 'next/navigation'

export default async function getDbProfileFromServer() {
  const user = await getServerUser()

  const profile = await db.profile.findUnique({
    where: { id: user.id },
  })

  if (!profile) {
    console.error('No profile found in getDbProfileFromServer()')
    redirect('/login')
  }
  return profile
}
