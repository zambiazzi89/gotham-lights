import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import MessageRequestForm from './_components/MessageRequestForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { redirect } from 'next/navigation'

export default async function MessageDraft({
  params: id,
}: {
  params: { id: string }
}) {
  const { id: toUsername } = id
  const profile = await getDbProfileFromServer()

  if (profile.username) {
    const conversationExists = await db.conversation.findMany({
      where: {
        AND: [
          {
            conversation_participants: {
              some: {
                participant_username: profile.username,
              },
            },
          },
          {
            conversation_participants: {
              some: {
                participant_username: toUsername,
              },
            },
          },
          {
            conversation_participants: {
              every: {
                participant_username: { in: [profile.username, toUsername] },
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    })
    if (conversationExists.length > 0) {
      redirect(`/messages/${conversationExists[0].id}`)
    }
  }

  return (
    <>
      {profile.username ? (
        <MessageRequestForm toUsername={toUsername} />
      ) : (
        <div className="grid place-items-center">
          <div className="flex flex-col items-center">
            <p>
              You must create a username before using the Message functionality.
            </p>
            <Link className="my-3" href="/profile">
              <Button>Update Profile</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
