'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import db from '@/db/db'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
    } else if (error.code === 'invalid_credentials') {
      return {
        password: ['Invalid email and/or password.'],
      }
    }
    redirect(`/error?code=${error.code}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
