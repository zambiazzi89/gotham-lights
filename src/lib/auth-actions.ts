'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signout() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    redirect('/error?code=signout')
  }

  redirect('/logout')
}
