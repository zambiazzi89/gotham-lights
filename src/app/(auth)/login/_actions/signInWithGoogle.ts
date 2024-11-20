'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signInWithGoogle() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: `${process.env.ENV_BASE_URL}/auth/callback`,
    },
  })

  if (error) {
    redirect('/error?code=signin_with_google')
  }

  redirect(data.url)
}
