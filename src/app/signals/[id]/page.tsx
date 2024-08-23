import db from '@/db/db'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SignalCard from './_components/SignalCard'
import { Signal } from '@/lib/types'
import getUsername from '../_actions/getUsername'
import GoBackButton from './_components/GoBackButton'

export default async function UniqueSignal({
  params: id,
}: {
  params: { id: string }
}) {
  const { id: signalId } = id

  const signal = await db.signal.findUnique({
    where: {
      id: signalId,
    },
  })

  const signalsWithUsername: Signal | null = signal?.createdByUserId
    ? ({
        ...signal,
        createdByUsername: await getUsername(signal?.createdByUserId),
      } as Signal)
    : null

  return (
    <div className="h-svh grid grid-rows-layout-signals">
      <Navbar />
      <div className="grid place-items-center">
        {signalsWithUsername ? (
          <SignalCard signalCardProps={signalsWithUsername} />
        ) : (
          <h1>Signal not found</h1>
        )}
      </div>
      <div className="mx-3">
        <GoBackButton />
      </div>
      <Footer />
    </div>
  )
}
