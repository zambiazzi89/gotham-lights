import db from '@/db/db'

export default async function getUsername(idFromSignal: string | null) {
  if (!idFromSignal) return '[deleted]'
  const createdBy = await db.profile.findUnique({
    where: { id: idFromSignal },
    select: { username: true },
  })
  return createdBy?.username
}
