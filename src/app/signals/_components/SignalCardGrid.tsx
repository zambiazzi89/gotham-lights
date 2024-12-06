import GridSignalCard from './GridSignalCard'
import Link from 'next/link'
import { SignalWithCommentsAndReads } from '@/lib/types'
import { SubwayPopoverLinks } from '@/components/Subway/SubwayPopover'
import { subwayLine } from '@/data/SubwayLines'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SubwayLineLogo } from '@/components/Subway/SubwayLineButton'
import { CgSortAz } from 'react-icons/cg'
import { CgSortZa } from 'react-icons/cg'
import { useEffect, useState } from 'react'

type signalOrderByField = 'publishedDate' | 'encounterDate' | 'mostCommented'
type signalOrder = 'asc' | 'desc'

export default function SignalCardGrid({
  signalsInBound,
  selectedSubwayLine,
  hasUsername,
  hasSignalsWithNewComments,
}: {
  signalsInBound: SignalWithCommentsAndReads[]
  selectedSubwayLine?: subwayLine
  hasUsername: boolean
  hasSignalsWithNewComments: boolean
}) {
  const [orderButtonTag, setOrderButtonTag] = useState('Order')
  const [orderByField, setOrderByField] =
    useState<signalOrderByField>('publishedDate')
  const [order, setOrder] = useState<signalOrder>('desc')
  const [sortedSignals, setSortedSignals] =
    useState<SignalWithCommentsAndReads[]>(signalsInBound)

  function sortByPublishedDateAsc() {
    const sortedArray = [...signalsInBound].sort((a, b) => {
      const publishedDateA = new Date(a.created_at).getTime()
      const publishedDateB = new Date(b.created_at).getTime()
      return publishedDateA - publishedDateB
    })
    setSortedSignals(sortedArray)
  }
  function sortByPublishedDateDesc() {
    const sortedArray = [...signalsInBound].sort((a, b) => {
      const publishedDateA = new Date(a.created_at).getTime()
      const publishedDateB = new Date(b.created_at).getTime()
      return publishedDateB - publishedDateA
    })
    setSortedSignals(sortedArray)
  }

  function sortByEncounterDateAsc() {
    const sortedArray = [...signalsInBound].sort((a, b) => {
      const encounterDateA = new Date(a.date_encounter).getTime()
      const encounterDateB = new Date(b.date_encounter).getTime()
      return encounterDateA - encounterDateB
    })
    setSortedSignals(sortedArray)
  }
  function sortByEncounterDateDesc() {
    const sortedArray = [...signalsInBound].sort((a, b) => {
      const encounterDateA = new Date(a.date_encounter).getTime()
      const encounterDateB = new Date(b.date_encounter).getTime()
      return encounterDateB - encounterDateA
    })
    setSortedSignals(sortedArray)
  }
  function sortByMostCommentedAsc() {
    const sortedArray = [...signalsInBound].sort((a, b) => {
      return a.comments.length - b.comments.length
    })
    setSortedSignals(sortedArray)
  }
  function sortByMostCommentedDesc() {
    const sortedArray = [...signalsInBound].sort((a, b) => {
      return b.comments.length - a.comments.length
    })
    setSortedSignals(sortedArray)
  }

  useEffect(() => {
    if (orderByField === 'publishedDate' && order === 'asc') {
      sortByPublishedDateAsc()
    }
    if (orderByField === 'publishedDate' && order === 'desc') {
      sortByPublishedDateDesc()
    }
    if (orderByField === 'encounterDate' && order === 'asc') {
      sortByEncounterDateAsc()
    }
    if (orderByField === 'encounterDate' && order === 'desc') {
      sortByEncounterDateDesc()
    }
    if (orderByField === 'mostCommented' && order === 'asc') {
      sortByMostCommentedAsc()
    }
    if (orderByField === 'mostCommented' && order === 'desc') {
      sortByMostCommentedDesc()
    }
  }, [order, orderByField, signalsInBound])

  return (
    <div className="p-4 flex flex-col lg:overflow-y-auto">
      <div className="py-4 flex items-center gap-4 justify-between flex-wrap">
        <div className="flex gap-2 items-center">
          <SubwayPopoverLinks />
          {selectedSubwayLine && (
            <div className="ml-auto px-2 flex items-center gap-3">
              <SubwayLineLogo subwayLine={selectedSubwayLine} />
              <Link href={'/signals?viewAll=true'} className="text-sm">
                Clear
              </Link>
            </div>
          )}
        </div>
        {hasUsername && (
          <Link href={'/signals/my-signals'}>
            <Button variant={'outline'}>
              {hasSignalsWithNewComments && (
                <div className="w-2 h-2 mr-2 self-center rounded-full bg-primary" />
              )}
              <div>My Signals</div>
            </Button>
          </Link>
        )}
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'}>{orderButtonTag}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setOrderByField('publishedDate')
                  setOrderButtonTag('Published Date')
                }}
              >
                Published Date
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOrderByField('encounterDate')
                  setOrderButtonTag('Encounter Date')
                }}
              >
                Encounter Date
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOrderByField('mostCommented')
                  setOrderButtonTag('Most Commented')
                }}
              >
                Most Commented
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {order === 'desc' ? (
            <Button variant={'outline'} onClick={() => setOrder('asc')}>
              <CgSortAz />
            </Button>
          ) : (
            <Button variant={'outline'} onClick={() => setOrder('desc')}>
              <CgSortZa />
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-auto-fit gap-3 flex-wrap">
        {sortedSignals.map((signal) => {
          return (
            <Link
              className="flex"
              key={signal.id}
              href={`/signals/${signal.id}`}
            >
              <GridSignalCard
                signalCardProps={signal}
                hasUsername={hasUsername}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
