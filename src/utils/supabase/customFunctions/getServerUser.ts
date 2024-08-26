import { redirect } from 'next/navigation'
import { createClient } from '../server'

export default async function getServerUser() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    redirect('/error')
  }
  return data.user
}
