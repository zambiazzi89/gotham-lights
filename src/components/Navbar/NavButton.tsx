'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../ui/modeToggle'
import { MdMenu } from 'react-icons/md'

function NavButtonStyle(pathname: string, href?: string) {
  return `pt-2 w-32 h-14 grid place-items-center
    backdrop-blur
    border border-solid
    border-t-0
    [border-image:radial-gradient(circle_at_bottom,rgb(120,113,108,1),55%,rgba(0,0,0,0))1]
    ${
      href && pathname.startsWith(`${href}`)
        ? 'bg-primary-20 hover:cursor-default pointer-events-none'
        : 'hover:cursor-pointer'
    }
    ${
      pathname === '/'
        ? 'text-white hover:bg-secondary/15'
        : !pathname.startsWith(`${href}`)
        ? 'hover:bg-secondary'
        : ''
    }
    `
}

export function NavButton({
  title,
  notification = false,
  href,
}: {
  title: string
  notification?: boolean
  href: string
}) {
  const pathname = usePathname()
  return notification ? (
    <Link href={`${href}`} className={NavButtonStyle(pathname, href)}>
      <div className="flex relative">
        <div>{title}</div>
        <div className="absolute -ml-4 w-2 h-2 self-center rounded-full bg-primary"></div>
      </div>
    </Link>
  ) : (
    <Link href={`${href}`} className={NavButtonStyle(pathname, href)}>
      {title}
    </Link>
  )
}

export function NavLogoutButton({ title }: { title: String }) {
  const pathname = usePathname()
  return (
    <button type="submit" className={NavButtonStyle(pathname)}>
      {title}
    </button>
  )
}

export function NavThemeButton() {
  const pathname = usePathname()
  return (
    <div
      className={
        pathname === '/'
          ? `hidden`
          : `justify-self-end h-full grid place-items-center px-2`
      }
    >
      <ModeToggle />
    </div>
  )
}

export function NavMenuButton() {
  const pathname = usePathname()
  return (
    <MdMenu
      className={`mr-2 self-center scale-150 lg:hidden hover:cursor-pointer ${
        pathname === '/' ? `text-white` : ``
      }`}
    />
  )
}
