import { NavButton, NavLogoutButton, NavThemeButton } from './NavButton'
import Link from 'next/link'
import { Croissant_One } from 'next/font/google'
import { logout } from '@/app/logout/actions'
import getServerSession from '@/utils/supabase/customFunctions/getServerSession'
import NavbarMenuDropdown from './NavbarMenuDropdown'

const croissantOne = Croissant_One({ subsets: ['latin'], weight: ['400'] })

export default async function Navbar() {
  const session = await getServerSession()

  return (
    <div className="flex p-2 items-center justify-between">
      <Link
        className={`bg-black grid text-white place-items-center rounded p-2 font-semibold text-lg hover:cursor-pointer ${croissantOne.className}`}
        href="/"
      >
        gotham lights
      </Link>
      <div className="flex justify-end items-center">
        <NavThemeButton />
        <NavbarMenuDropdown session={session} />
        <div className="hidden lg:flex justify-end items-center">
          <NavButton title="About" href="/about" />
          <NavButton title="Signals" href="/signals" />
          <NavButton title="Messages" href="/messages" />
          {session ? (
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
      </div>
    </div>
  )
}
