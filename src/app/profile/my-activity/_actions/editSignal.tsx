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
  subway_line: z
    .string()
    .max(1, { message: 'Error processing the subway line' }),
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
  connection_found: z.coerce.boolean(),
})

export async function editSignal(prevState: unknown, formData: FormData) {
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

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))
  console.log(formData)
  console.log(result)

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const resultData = result.data

  const subwayLine =
    resultData.subway_line === '' ? null : resultData.subway_line

  await db.signal.update({
    where: { id: resultData.signalId, created_by_username: profile.username },
    data: {
      title: resultData.title,
      subway_line: subwayLine,
      location_name: resultData.location_name,
      latitude: resultData.location_lat,
      longitude: resultData.location_lng,
      date_encounter: resultData.date,
      content: resultData.content,
      connection_found: resultData.connection_found,
      updated_at: new Date(),
    },
  })
}
