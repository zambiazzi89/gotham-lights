import db from '@/db/db'
import { LatLong } from '@/lib/types'

export default async function getManySignalsByBounds(
  latlngNE: LatLong,
  latlngSW: LatLong
) {
  const signals = await db.signal.findMany({
    where: {
      AND: [
        { latitude: { gt: latlngSW.lat } },
        { latitude: { lt: latlngNE.lat } },
        { longitude: { gt: latlngSW.lng } },
        { longitude: { lt: latlngNE.lng } },
      ],
    },
  })

  return signals
}
