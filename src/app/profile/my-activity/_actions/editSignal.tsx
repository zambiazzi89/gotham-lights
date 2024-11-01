'use server'

import db from '@/db/db'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
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
  signalId: z.string(),
})

export async function editSignal(prevState: unknown, formData: FormData) {
  // Only perform the action if user is logged in
  const { profile } = await getDbProfileFromServer()

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data

  await db.signal.update({
    where: { id: resultData.signalId },
    data: {
      title: resultData.title,
      location_name: resultData.location_name,
      latitude: resultData.location_lat,
      longitude: resultData.location_lng,
      date_encounter: resultData.date,
      content: resultData.content,
    },
  })
}
