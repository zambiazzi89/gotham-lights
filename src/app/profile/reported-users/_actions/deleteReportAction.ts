'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'

export default async function deleteReportAction(username: string) {
  const { profile } = await getDbProfileFromServer()

  if (!profile || !profile.username) {
    console.error('No profile found')
    redirect('/error')
  }

  await db.reported_profile.deleteMany({
    where: {
      reported_by_username: profile.username,
      reported_username: username,
    },
  })
}
