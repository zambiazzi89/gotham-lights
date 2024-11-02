'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'

export async function deleteSignal(id: string) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  if (!profile || !profile.username) {
    console.error('Profile or username not found')
    redirect('/error')
  }

  await db.signal.delete({
    where: {
      id: id,
      created_by_username: profile.username,
    },
  })
}

export async function deleteComment(id: string) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  if (!profile || !profile.username) {
    console.error('Profile or username not found')
    redirect('/error')
  }

  await db.comment.delete({
    where: {
      id: id,
      created_by_username: profile.username,
    },
  })
}
