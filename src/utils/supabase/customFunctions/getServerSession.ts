import { redirect } from 'next/navigation'
import { createClient } from '../server'

export default async function getServerSession() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    redirect('/error')
  }
  return data.session
}
