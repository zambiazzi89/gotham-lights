'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function markSignalAsRead(signalId: string) {
  const { profile } = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  const recordCount = await db.signal_read_by_username.count({
    where: {
      signal_id: signalId,
      username: profile.username,
    },
  })

  if (!recordCount) {
    await db.signal_read_by_username.create({
      data: {
        signal_id: signalId,
        username: profile.username,
        read: true,
        updated_at: new Date().toISOString(),
      },
    })
  } else {
    await db.signal_read_by_username.updateMany({
      where: {
        signal_id: signalId,
        username: profile.username,
      },
      data: {
        read: true,
        updated_at: new Date().toISOString(),
      },
    })
  }
  revalidatePath('/signals*')
}
