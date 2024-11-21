import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { logout } from '@/app/logout/actions'
import { NavMenuButton } from './NavButton'

export default function NavbarMenuDropdown({
  session,
  hasUsername,
  signalsWithNewComments,
  newMessages,
}: {
  session: boolean
  hasUsername: boolean
  signalsWithNewComments: boolean
  newMessages: boolean
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="lg:hidden relative hover:cursor-pointer">
          <NavMenuButton />
          {(signalsWithNewComments || newMessages) && (
            <div className="absolute -mt-1 -ml-1 w-2 h-2 self-center rounded-full bg-primary"></div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem asChild>
          <Link href="/about" className="w-full">
            About
          </Link>
        </DropdownMenuItem>
        {hasUsername && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/signals" className="w-full">
                <div>Signals</div>
                {signalsWithNewComments && (
                  <div className="ml-auto w-2 h-2 self-center rounded-full bg-primary"></div>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/messages" className="w-full">
                <div>Messages</div>
                {newMessages && (
                  <div className="ml-auto w-2 h-2 self-center rounded-full bg-primary"></div>
                )}
              </Link>
            </DropdownMenuItem>
          </>
        )}
        {session ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <form action={logout}>
                <button type="submit" className="w-full text-start">
                  Logout
                </button>
              </form>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login" className="w-full">
              Login/Register
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
