'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const passwordRegEx =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s).{8,16}$/

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Password length must be from 8 to 16 characters-long.',
      })
      .max(16, {
        message: 'Password length must be from 8 to 16 characters-long.',
      })
      .regex(passwordRegEx, {
        message: 'Password does not match complexity requirements.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // This specifies where the error should be added
    message: "Passwords don't match",
  })

export async function updatePassword(prevState: unknown, formData: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }
  const supabase = createClient()

  const { data, error } = await supabase.auth.updateUser({
    password: result.data.password,
  })

  if (error) {
    console.error(error)
    redirect('/error?code=update_password')
  }
}
