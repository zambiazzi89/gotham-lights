'use server'

import getAuthUser from '@/app/api/authServerFunctions'
import db from '@/db/db'
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
    .max(400, {
      message:
        'Your signal content length must be between 5 and 400 characters.',
    }),
})

export async function addSignal(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { isLoggedIn, dbUser } = await getAuthUser()

  if (!isLoggedIn) {
    redirect('/')
  }

  // Continue if logged in

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await db.signal.create({
    data: {
      title: data.title,
      locationName: data.location_name,
      latitude: data.location_lat,
      longitude: data.location_lng,
      dateOfEncounter: data.date,
      content: data.content,
      createdByUserId: dbUser?.id,
    },
  })
}
