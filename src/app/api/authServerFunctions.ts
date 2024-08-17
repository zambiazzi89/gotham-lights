import db from '@/db/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function getAuthUser() {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  const user = await getUser()
  let dbUser = null

  if (isLoggedIn && user) {
    dbUser = await db.user.findUnique({ where: { kindeId: user?.id } })

    /*
    If it's the first time that the user is authenticating with Kinde,
    the user record will not have been created yet, so we need to create it.
    */
    if (!dbUser) {
      console.debug('User not found in DB, creating...')
      dbUser = await db.user.create({
        data: {
          kindeId: user.id,
          firstName: user.given_name,
          lastName: user.family_name,
          emailAddress: user.email,
          username: user.username,
        },
      })
    }
  }

  return { isLoggedIn, dbUser }
}
