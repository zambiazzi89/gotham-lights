'use server'

import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { createClient } from '@supabase/supabase-js'

import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
  inputText: z.literal('Delete my account'),
})

export default async function deleteAccountAction(
  prevState: unknown,
  formData: FormData
) {
  const { profile } = await getDbProfileFromServer()

  if (!profile) {
    console.error('Profile not found')
    redirect('/error')
  }

  const result = formSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  console.log('here')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )

  const { data, error } = await supabase.auth.admin.deleteUser(profile.id)

  if (error) {
    console.error('Error deleting account', error)
    redirect('/error')
  }

  console.debug('Deleting account: ', data)

  redirect('/')
}
