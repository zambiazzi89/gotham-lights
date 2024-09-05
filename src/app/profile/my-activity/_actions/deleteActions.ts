'use server'

import db from '@/db/db'

export async function deleteSignal(id: string) {
  await db.signal.delete({
    where: {
      id,
    },
  })
}

export async function deleteComment(id: string) {
  await db.comment.delete({
    where: {
      id,
    },
  })
}
