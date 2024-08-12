import db from '@/db/db'
import SignalCard from './SignalCard'
import { SignalCardType } from '../_types/SignalCardType'
import Link from 'next/link'

async function getSignals() {
  const dummySignals = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: null,
      locationName: 'Main Drag 1',
      latitude: 70,
      longitude: 75,
      dateOfEncounter: new Date(),
      title: 'Test title',
      content:
        'The quick quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog,The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog',
      createdByUserId: '1',
    },
    {
      id: '2',
      createdAt: new Date(),
      updatedAt: null,
      locationName:
        'Really loooong loooong loooong loooong loooong loooong location',
      latitude: 70,
      longitude: 75,
      dateOfEncounter: new Date(),
      title:
        'Really loooong loooong loooong loooong loooong loooong loooongloooong loooong loooong title',
      content:
        'The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog,The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog',
      createdByUserId: '1',
    },
  ]

  const signals = await db.signal.findMany()

  return signals.length ? signals : dummySignals
}

export default async function SignalCardGrid() {
  const signals = await getSignals()
  return (
    <div className="flex flex-col md:overflow-y-scroll">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap">
        {signals.map((signal) => {
          return (
            <Link href={`/signals/${signal.id}`} key={signal.id}>
              <SignalCard
                key={signal.id}
                signalCardProps={signal as SignalCardType}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
