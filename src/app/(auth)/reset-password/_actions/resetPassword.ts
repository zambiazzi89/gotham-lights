'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
})

export async function resetPassword(prevState: unknown, formData: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }
  const supabase = createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(
    result.data.email,
    { redirectTo: 'http://localhost:3000/reset-password' }
  )

  if (error) {
    console.log(error)
    redirect('/error')
  }
}
