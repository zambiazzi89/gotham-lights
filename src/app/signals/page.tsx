import MapAndGrid from './_components/MapAndGrid'
import db from '@/db/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import MyLocationButton from './_components/MyLocationButton'
import getDbProfileFromServer from '@/utils/supabase/customFunctions/getDbProfileFromServer'

export default async function Signals() {
  // Only perform the action if user is logged in
  const { allBlocks } = await getDbProfileFromServer()

  const signals = await db.signal.findMany({
    where: {
      created_by_username: { notIn: allBlocks },
    },
  })

  return (
    <div className="h-full w-full grid grid-rows-layout-signals">
      <MapAndGrid signals={signals} />
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
