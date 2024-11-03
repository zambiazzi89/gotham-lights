'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'

const passwordRegEx =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s).{8,16}$/

const formSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
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

export async function signup(prevState: unknown, formData: FormData) {
  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  const supabase = createClient()

  const signUpData = {
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: `${data.firstName + ' ' + data.lastName}`,
        email: data.email,
      },
    },
  }

  const { error } = await supabase.auth.signUp(signUpData)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/signup/email-confirmation')
}
