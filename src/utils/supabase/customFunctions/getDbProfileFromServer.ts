import db from '@/db/db'
import getServerUser from './getServerUser'
import { redirect } from 'next/navigation'

export default async function getDbProfileFromServer() {
  const user = await getServerUser()

  const profile = await db.profile.findUnique({
    where: { id: user.id },
  })

  if (!profile?.username) {
    redirect('/login')
  }
  return profile
}
