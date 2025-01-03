import { NavButton, NavLogoutButton, NavThemeButton } from './NavButton'
import Link from 'next/link'
import { Croissant_One } from 'next/font/google'
import { logout } from '@/app/logout/actions'
import NavbarMenuDropdown from './NavbarMenuDropdown'
import { createClient } from '@/utils/supabase/server'
import db from '@/db/db'
import getConversations from '@/app/messages/_actions/getConversations'
import { ProfileWithConversations } from '@/lib/types'
import NavMessageButton from './NavMessageButton'
import NavbarWithUsername from './NavbarWithUsername'

const croissantOne = Croissant_One({ subsets: ['latin'], weight: ['400'] })

export default async function Navbar() {
  const supabase = createClient()
  const { data: sessionData } = await supabase.auth.getSession()

  const session = sessionData.session

  const { data, error } = !!session
    ? await supabase.auth.getUser()
    : { data: { user: null }, error: null }

  if (error) {
    console.error('Error fetching user data:', error.message)
  }

  const profile = data.user
    ? ((await db.profile.findUnique({
        where: { id: data.user.id },
        include: { conversations: true },
      })) as ProfileWithConversations)
    : null

  const conversations =
    profile?.username && profile?.conversations
      ? await getConversations(profile)
      : []

  const signalsWithNewComments = profile?.username
    ? await db.signal.count({
        where: {
          created_by_username: profile.username,
          signal_read_by_username: {
            none: { username: profile.username, read: true },
          },
        },
      })
    : null

  return (
    <div className="flex px-2 items-center justify-between">
      <Link
        className={`bg-black grid text-white place-items-center rounded my-2 p-2 font-semibold text-lg hover:cursor-pointer ${croissantOne.className}`}
        href="/"
      >
        gotham lights
      </Link>
      <div className="flex justify-end items-center">
        {profile?.username ? (
          <NavbarWithUsername
            username={profile.username}
            signalsWithNewComments={!!signalsWithNewComments}
            conversations={conversations}
          />
        ) : (
          <>
            <NavThemeButton />
            <NavbarMenuDropdown
              session={!!profile}
              signalsWithNewComments={false}
              hasUsername={false}
              newMessages={false}
            />
            <div className="hidden lg:flex justify-end items-center">
              <NavButton title="About" href="/about" />
              {!!profile ? (
                <>
                  <NavButton title="Profile" href="/profile" />
                  <form action={logout}>
                    <NavLogoutButton title="Logout" />
                  </form>
                </>
              ) : (
                <NavButton title="Login" href="/login" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
