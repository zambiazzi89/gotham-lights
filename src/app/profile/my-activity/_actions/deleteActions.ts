'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'

export async function deleteSignal(id: string) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  // If no profile
  if (!profile) {
    redirect('/error?code=no_profile_found')
  }

  // If no username
  if (!profile.username) {
    redirect('/error?code=missing_username')
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

  // If no profile
  if (!profile) {
    redirect('/error?code=no_profile_found')
  }

  // If no username
  if (!profile.username) {
    redirect('/error?code=missing_username')
  }

  await db.comment.delete({
    where: {
      id: id,
      created_by_username: profile.username,
    },
  })
}
