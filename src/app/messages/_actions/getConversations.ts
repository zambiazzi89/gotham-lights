import db from '@/db/db'
import { ProfileWithConversations } from '@/lib/types'

export default async function getConversations(
  profile: ProfileWithConversations | null
) {
  if (!profile || !profile.username) {
    console.debug('Profile is null')
    return []
  }

  const conversations = await db.conversation.findMany({
    where: {
      id: {
        in: await db.conversation_participant
          .findMany({
            where: {
              participant_username: profile.username,
            },
            select: {
              conversation_id: true,
            },
          })
          .then((participants) => participants.map((p) => p.conversation_id)),
      },
    },
  })

  return conversations
}
