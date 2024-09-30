'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavButtonStyle(pathname: string, href?: string) {
  return `pt-2 w-32 h-12 grid place-items-center
    backdrop-blur
    border border-solid
    border-t-0
    [border-image:radial-gradient(circle_at_bottom,rgb(120,113,108,1),55%,rgba(0,0,0,0))1]
    ${
      href && pathname.startsWith(`${href}`)
        ? 'bg-primary-20 hover:cursor-default'
        : 'hover:cursor-pointer'
    }
    ${
      pathname === '/'
        ? 'hover:bg-secondary/15'
        : href && !pathname.startsWith(`${href}`)
        ? 'hover:bg-secondary'
        : ''
    }
    `
}

export function NavButton({ title, href }: { title: string; href: string }) {
  const pathname = usePathname()
  return (
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
