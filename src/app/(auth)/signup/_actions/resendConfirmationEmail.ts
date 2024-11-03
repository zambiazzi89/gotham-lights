'use server'

import db from '@/db/db'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export default async function resendConfirmationEmail(
  prevState: unknown,
  formData: FormData
) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  const doesEmailExist = await db.profile.count({
    where: {
      email_address: data.email,
    },
  })

  if (!doesEmailExist) {
    return {
      email: ['There is no account with this email address'],
    }
  }

  const supabase = createClient()

  await supabase.auth.resend({
    type: 'signup',
    email: data.email,
    options: {
      emailRedirectTo: 'https://localhost:3000/profile',
    },
  })
}
