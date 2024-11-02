'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'

export default async function unblockAction(username: string) {
  const { profile } = await getDbProfileFromServer()

  if (!profile || !profile.username) {
    console.error('No profile found')
    redirect('/error')
  }

  await db.blocked_profile.deleteMany({
    where: {
      blocked_by_username: profile.username,
      blocked_username: username,
    },
  })
}
