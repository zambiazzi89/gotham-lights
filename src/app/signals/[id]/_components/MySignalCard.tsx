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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Signal } from '@/lib/types'
import { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { deleteSignal } from '@/app/profile/my-activity/_actions/deleteActions'

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
              <DropdownMenuLabel>My Signal</DropdownMenuLabel>
              <DropdownMenuSeparator />
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
        <CardDescription>
          {signalCardProps.location_name}
          {' on '}
          {signalCardProps.date_encounter.toLocaleDateString('en-US')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{signalCardProps.content}</p>
      </CardContent>
      <CardFooter className="self-end">
        <p className="text-right text-muted-foreground mt-4">
          Signal sent on {signalCardProps.created_at.toLocaleString('en-US')} by{' '}
          {signalCardProps.created_by_username}
        </p>
      </CardFooter>
    </Card>
  )
}
