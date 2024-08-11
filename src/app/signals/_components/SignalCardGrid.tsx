import db from '@/db/db'
import SignalCard from './SignalCard'
import { SignalCardType } from '../_types/SignalCardType'

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
        'I saw you standing blablablablabalbal I saw you standing blablablablabalbal, I saw you standing blablablablabalbal,I saw you standing blablablablabalbal I saw you standing blablablablabalbal.',
      createdByUserId: '1',
    },
    {
      id: '2',
      createdAt: new Date(),
      updatedAt: null,
      locationName: 'Main Drag 2',
      latitude: 70,
      longitude: 75,
      dateOfEncounter: new Date(),
      title: 'Test title',
      content: 'I saw you standing blablablablabalbal.',
      createdByUserId: '1',
    },
    {
      id: '3',
      createdAt: new Date(),
      updatedAt: null,
      locationName: 'Main Drag 3',
      latitude: 70,
      longitude: 75,
      dateOfEncounter: new Date(),
      title: 'Test title',
      content: 'I saw you standing blablablablabalbal.',
      createdByUserId: '1',
    },
    {
      id: '4',
      createdAt: new Date(),
      updatedAt: null,
      locationName: 'Main Drag 4',
      latitude: 70,
      longitude: 75,
      dateOfEncounter: new Date(),
      title: 'Test title',
      content: 'I saw you standing blablablablabalbal.',
      createdByUserId: '1',
    },
    {
      id: '5',
      createdAt: new Date(),
      updatedAt: null,
      locationName: 'Main Drag 5',
      latitude: 70,
      longitude: 75,
      dateOfEncounter: new Date(),
      title: 'Test title',
      content: 'I saw you standing blablablablabalbal.',
      createdByUserId: '1',
    },
  ]

  const signals = await db.signal.findMany()

  return signals.length ? signals : dummySignals
}

export default async function SignalCardGrid() {
  const signals = await getSignals()
  return (
    <div className="flex flex-col overflow-y-scroll">
      <div className="text-lg font-bold text-center py-4">Latest Signals</div>
      <div className="grid grid-cols-1 gap-2">
        {signals.map((signal) => {
          return (
            <SignalCard
              key={signal.id}
              signalCardProps={signal as SignalCardType}
            />
          )
        })}
      </div>
    </div>
  )
}
