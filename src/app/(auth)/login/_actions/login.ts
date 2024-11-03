'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import db from '@/db/db'

const passwordRegEx =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s).{8,16}$/

const formSchema = z.object({
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
})

export async function login(prevState: unknown, formData: FormData) {
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
      email: ['No account was found with this email.'],
    }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error(error)
    if (error.code === 'email_not_confirmed') {
      redirect('/signup/email-confirmation')
    }
    redirect(`/error?code=${error.code}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
