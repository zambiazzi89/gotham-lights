import { MdMenu } from 'react-icons/md'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
import { Session } from '@supabase/supabase-js'
import { logout } from '@/app/logout/actions'

export default function NavbarMenuDropdown({
  session,
}: {
  session: Session | null
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MdMenu className="mr-2 self-center scale-150 lg:hidden hover:cursor-pointer" />
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
          <>
            <Link href="/login">Login/Register</Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
