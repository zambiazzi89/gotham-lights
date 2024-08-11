import { MdMenu } from 'react-icons/md'
import NavButton from './NavButton'
import Link from 'next/link'
import { Croissant_One } from 'next/font/google'
import { ModeToggle } from './ui/modeToggle'

const croissantOne = Croissant_One({ subsets: ['latin'], weight: ['400'] })

type fontColor = 'text-white' | 'text-black' | ''

export default function Navbar({
  fontColor = '',
  withToggle = true,
}: {
  fontColor?: fontColor
  withToggle?: boolean
}) {
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
        <MdMenu className="mr-2 self-center scale-150 md:hidden" />
        <div
          className={`hidden md:flex justify-end items-center  ${fontColor}`}
        >
          <NavButton title="About" href="/about" />
          <NavButton title="Signals" href="/signals" />
          <NavButton title="Messages" href="/messages" />
          <NavButton title="Profile" href="/profile" />
        </div>
      </div>
    </div>
  )
}
