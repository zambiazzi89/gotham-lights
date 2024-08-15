'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// id        String   @id @default(uuid())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt

//   locationName    String
//   latitude        Float
//   longitude       Float
//   dateOfEncounter DateTime
//   title           String
//   content         String

//   createdByUserId String?
//   user            User?   @relation(fields: [createdByUserId], references: [id], onDelete: SetNull)

export async function addSignal(formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  console.log(formData)
}
