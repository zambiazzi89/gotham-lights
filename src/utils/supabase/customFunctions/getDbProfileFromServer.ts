import db from '@/db/db'
import getServerUser from './getServerUser'
import { redirect } from 'next/navigation'

export default async function getDbProfileFromServer() {
  const user = await getServerUser()

  const profile = await db.profile.findUnique({
    where: { id: user.id },
    include: {
      blocks_created: true,
      blocks_received: true,
    },
  })

  if (!profile) {
    console.error('No profile found in getDbProfileFromServer()')
    redirect('/login')
  }

  const blockedUsernames = profile.blocks_created.map(
    (block) => block.blocked_username
  )

  const blockedByUsernames = profile.blocks_received.map(
    (block) => block.blocked_by_username
  )

  const allBlocks = [...blockedUsernames, ...blockedByUsernames]

  return { profile, blockedUsernames, blockedByUsernames, allBlocks }
}
