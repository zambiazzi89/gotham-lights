import { redirect } from 'next/navigation'
import { createClient } from '../server'

export default async function getServerSession() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getSession()
  const currentTime = Math.floor(Date.now() / 1000)

  if (data.session?.expires_at && data.session.expires_at < currentTime) {
    await supabase.auth.signOut()
    redirect('/login')
  }

  if (error) {
    console.error('Error in getServerSession()')
    redirect('/error')
  }
  return data.session
}
