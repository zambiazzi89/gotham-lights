'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Your signal title length must be between 5 and 70 characters.',
    })
    .max(70, {
      message: 'Your signal title length must be between 5 and 70 characters.',
    }),
  location_name: z.string(),
  location_lat: z.coerce.number(),
  location_lng: z.coerce.number(),
  date: z.coerce.date(),
  content: z
    .string()
    .min(5, {
      message:
        'Your signal content length must be between 5 and 400 characters.',
    })
    .max(1000, {
      message:
        'Your signal content length must be between 5 and 1000 characters.',
    }),
})

export async function addSignal(prevState: unknown, formData: FormData) {
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

  await db.signal.create({
    data: {
      title: data.title,
      location_name: data.location_name,
      latitude: data.location_lat,
      longitude: data.location_lng,
      date_encounter: data.date,
      content: data.content,
      created_by_username: profile.username,
    },
  })

  redirect('/signals')
}
