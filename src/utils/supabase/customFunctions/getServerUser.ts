import { redirect } from 'next/navigation'
import { createClient } from '../server'

export default async function getServerUser() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    console.error('Error in getServerUser()')
    redirect('/login')
  }
  return data.user
}
