import { NavButton, NavLogoutButton, NavThemeButton } from './NavButton'
import Link from 'next/link'
import { Croissant_One } from 'next/font/google'
import { logout } from '@/app/logout/actions'
import NavbarMenuDropdown from './NavbarMenuDropdown'
import { createClient } from '@/utils/supabase/server'
import db from '@/db/db'
import getConversations from '@/app/messages/_actions/getConversations'
import { ProfileWithConversations } from '@/lib/types'
import { revalidatePath } from 'next/cache'

const croissantOne = Croissant_One({ subsets: ['latin'], weight: ['400'] })

export default async function Navbar() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user data: ', error)
  }

  const profile = data.user
    ? ((await db.profile.findUnique({
        where: { id: data.user.id },
        include: { conversations: true },
      })) as ProfileWithConversations)
    : null

  const conversations = await getConversations(profile)

  const hasNewMessages = conversations
    ? conversations
        .map((conversation) => {
          if (conversation.last_sent_by !== profile?.username) {
            return conversation.read
          }
        })
        .includes(false)
    : false

  if (profile?.username && profile?.conversations) {
    const conversations = await db.conversation_participant.findMany({
      select: {
        conversation_id: true,
      },
      where: { participant_username: profile.username },
    })

    const conversationIdsArray = conversations.map(
      (conversation) => conversation.conversation_id
    )

    const conversationIdsString = conversationIdsArray.join(',')

    const channels = supabase
      .channel('custom-update-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversation',
          filter: `id=in.${conversationIdsString}`,
        },
        (payload) => {
          console.log('Change received!', profile.username, payload)
          revalidatePath('/')
        }
      )
      .subscribe()
  }
  return (
    <div className="flex px-2 items-center justify-between">
      <Link
        className={`bg-black grid text-white place-items-center rounded my-2 p-2 font-semibold text-lg hover:cursor-pointer ${croissantOne.className}`}
        href="/"
      >
        gotham lights
      </Link>
      <div className="flex justify-end items-center">
        <NavThemeButton />
        <NavbarMenuDropdown session={!!profile} />
        <div className="hidden lg:flex justify-end items-center">
          <NavButton title="About" href="/about" />
          <NavButton title="Signals" href="/signals" />
          {hasNewMessages ? (
            <NavButton title="Messages" notification={true} href="/messages" />
          ) : (
            <NavButton title="Messages" href="/messages" />
          )}
          {!!profile ? (
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
