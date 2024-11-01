'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  username_to_block: z
    .string()
    .min(4, {
      message: 'Username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Username length must be between 4 and 12 characters.',
    }),
  current_username: z
    .string()
    .min(4, {
      message: 'Username length must be between 4 and 12 characters.',
    })
    .max(12, {
      message: 'Username length must be between 4 and 12 characters.',
    }),
})

export async function blockUser(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  if (!profile.username) {
    console.error('No username found for profile')
    redirect('/profile')
  }

  // Continue if logged in and has username

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.blocked_profile.create({
    data: {
      blocked_username: data.username_to_block,
      blocked_by_username: data.current_username,
    },
  })

  redirect('/profile/blocked-users')
}
