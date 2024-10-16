import { redirect } from 'next/navigation'
import { createClient } from '../server'

export default async function getServerUser() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error in getServerUser()')
    console.error(error)

    redirect('/login')
  }
  return data.user
}
