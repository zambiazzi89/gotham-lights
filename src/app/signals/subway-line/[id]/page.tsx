import MapAndGrid from '../../_components/MapAndGrid'
import db from '@/db/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import MyLocationButton from '../../_components/MyLocationButton'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'
import { SUBWAY_LINES_JSON } from '@/data/SubwayLines'

export default async function Signals({
  params: id,
}: {
  params: { id: string }
}) {
  // Only perform the action if user is logged in
  const { profile, allBlocks } = await getDbProfileFromServer()

  const subwayLine = id.id

  const signals = await db.signal.findMany({
    where: {
      created_by_username: { notIn: allBlocks },
      subway_line: subwayLine,
    },
    include: {
      comments: true,
      signal_read_by_username: {
        where: {
          username: profile.username || '',
          read: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  return (
    <div className="h-full w-full grid grid-rows-layout-signals">
      <MapAndGrid
        signals={signals}
        hasUsername={!!profile.username}
        selectedSubwayLine={SUBWAY_LINES_JSON[subwayLine]}
      />
      <div className="h-14 px-4 flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <Link href="/signals?viewAll=true">
            <Button variant={'secondary'}>View All</Button>
          </Link>
          <MyLocationButton />
        </div>
        <Link href="/signals/create" className="h-8">
          <Button className="px-8 sm:px-16 font-bold">Create a Signal</Button>
        </Link>
      </div>
    </div>
  )
}
