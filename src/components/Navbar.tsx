import { NavButton, NavLogoutButton } from './NavButton'
import Link from 'next/link'
import { Croissant_One } from 'next/font/google'
import { ModeToggle } from './ui/modeToggle'
import { logout } from '@/app/logout/actions'
import getServerSession from '@/utils/supabase/customFunctions/getServerSession'
import NavbarMenuDropdown from './NavbarMenuDropdown'

const croissantOne = Croissant_One({ subsets: ['latin'], weight: ['400'] })

type fontColor = 'text-white' | 'text-black' | ''

export default async function Navbar({
  fontColor = '',
  withToggle = true,
}: {
  fontColor?: fontColor
  homeButtonHoverColor?: fontColor
  withToggle?: boolean
}) {
  const session = await getServerSession()

  return (
    <div className="flex px-2 items-center justify-between">
      <Link
        className={`mt-2 bg-black grid text-white place-items-center rounded p-2 font-semibold text-lg hover:cursor-pointer ${croissantOne.className}`}
        href="/"
      >
        gotham lights
      </Link>
      <div className="flex justify-end items-center">
        {withToggle && (
          <div className="justify-self-end h-full grid place-items-center px-2">
            <ModeToggle />
          </div>
        )}
        <NavbarMenuDropdown session={session} />
        <div
          className={`hidden lg:flex justify-end items-center  ${fontColor}`}
        >
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
