import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
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
          <Link href="/about" className="w-full">
            About
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/signals" className="w-full">
            Signals
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/messages" className="w-full">
            Messages
          </Link>
        </DropdownMenuItem>
        {session ? (
          <>
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={logout}>
                <button type="submit" className="w-full">
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/login" className="w-full">
              Login/Register
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
