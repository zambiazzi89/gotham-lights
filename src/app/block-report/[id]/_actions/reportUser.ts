'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  username_to_report: z
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
  reason: z.string().min(4, { message: 'Reason is required' }),
})

export async function reportUser(prevState: unknown, formData: FormData) {
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

  await db.reported_profile.create({
    data: {
      reported_username: data.username_to_report,
      reported_by_username: data.current_username,
      reason: data.reason,
    },
  })

  redirect('/profile/reported-users')
}
