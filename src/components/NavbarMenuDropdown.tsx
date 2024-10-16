import { MdMenu } from 'react-icons/md'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { logout } from '@/app/logout/actions'
import { NavMenuButton } from './NavButton'

export default function NavbarMenuDropdown({ session }: { session: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <NavMenuButton />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link href="/about">About</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/signals">Signals</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/messages">Messages</Link>
        </DropdownMenuItem>
        {session ? (
          <>
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={logout}>
                <button type="submit">Logout</button>
              </form>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Login/Register</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
