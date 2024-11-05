'use client'

import DeleteCommentWithDialog from '@/components/DeleteCommentWithDialog'
import EditSignalForm from '@/components/EditSignalForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Signal } from '@/lib/types'
import { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { deleteSignal } from '@/app/profile/my-activity/_actions/deleteActions'
import GoBackButton from './GoBackButton'
import { SubwayLineLogo } from '@/components/Subway/SubwayLineButton'
import { SUBWAY_LINES_JSON } from '@/data/SubwayLines'

export default function SignalCard({
  signalCardProps,
}: {
  signalCardProps: Signal
}) {
  const [edit, setEdit] = useState(false)

  return edit ? (
    <Card className="shadow-md p-4">
      <EditSignalForm signal={signalCardProps} setEdit={setEdit} />
    </Card>
  ) : (
    <Card className="shadow-md flex flex-col justify-between">
      <CardHeader>
        <div className="flex gap-2">
          <CardTitle className="flex-grow w-[90%] break-words">
            {signalCardProps.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MdMoreVert className="text-xl" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setEdit(!edit)}>
                Edit
              </DropdownMenuItem>
              <DeleteCommentWithDialog
                id={signalCardProps.id}
                deleteAction={deleteSignal}
                objectToDelete="signal"
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="flex py-1 items-center">
          {signalCardProps.subway_line && (
            <div className="pr-2">
              <SubwayLineLogo
                subwayLine={SUBWAY_LINES_JSON[signalCardProps.subway_line]}
              />
            </div>
          )}
          {signalCardProps.location_name}
          {' on '}
          {signalCardProps.date_encounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{signalCardProps.content}</p>
      </CardContent>
      <CardFooter className="self-end pt-4 flex justify-between w-full">
        <GoBackButton route={'/signals'} />
        <div className="flex flex-col items-end  text-muted-foreground">
          <div className="font-semibold">
            {signalCardProps.created_by_username}
          </div>
          <div className="font-sans text-sm">
            {signalCardProps.created_at.toLocaleString([], {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
