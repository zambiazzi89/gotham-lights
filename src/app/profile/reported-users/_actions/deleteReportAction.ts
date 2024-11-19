'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'

export default async function deleteReportAction(username: string) {
  const { profile } = await getDbProfileFromServer()
  // If no profile
  if (!profile) {
    redirect('/error?code=no_profile_found')
  }

  // If no username
  if (!profile.username) {
    redirect('/error?code=missing_username')
  }

  await db.reported_profile.deleteMany({
    where: {
      reported_by_username: profile.username,
      reported_username: username,
    },
  })
}
