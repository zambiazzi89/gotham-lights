import { MdMenu } from 'react-icons/md'
import NavButton from './NavButton'
import Link from 'next/link'
import { Croissant_One } from 'next/font/google'
import { ModeToggle } from './ui/modeToggle'
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server'

const navButtonStyle = `pt-2 w-32 h-12 grid place-items-center backdrop-blur
                        border border-solid border-t-0
                        [border-image:radial-gradient(circle_at_bottom,rgb(120,113,108,1),55%,rgba(0,0,0,0))1]
                        hover:cursor-pointer hover:bg-stone-500  hover:bg-opacity-20`

const croissantOne = Croissant_One({ subsets: ['latin'], weight: ['400'] })

type fontColor = 'text-white' | 'text-black' | ''

export default async function Navbar({
  fontColor = '',
  withToggle = true,
}: {
  fontColor?: fontColor
  withToggle?: boolean
}) {
  const { isAuthenticated } = getKindeServerSession()
  const isAuth = await isAuthenticated()

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
        <MdMenu className="text-white mr-2 self-center scale-150 lg:hidden" />
        <div
          className={`hidden lg:flex justify-end items-center  ${fontColor}`}
        >
          <NavButton title="About" href="/about" />
          <NavButton title="Signals" href="/signals" />
          <NavButton title="Messages" href="/messages" />
          {isAuth ? (
            <>
              <NavButton title="Profile" href="/profile" />
              <LogoutLink className={navButtonStyle}>Logout</LogoutLink>
            </>
          ) : (
            <>
              <LoginLink className={navButtonStyle}>Login</LoginLink>
              <RegisterLink className={navButtonStyle}>Register</RegisterLink>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
