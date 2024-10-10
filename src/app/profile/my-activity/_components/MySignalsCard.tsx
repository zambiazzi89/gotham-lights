'use client'

import DeleteCommentWithDialog from '@/components/DeleteCommentWithDialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Signal } from '@/lib/types'
import { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { deleteSignal } from '../_actions/deleteActions'
import Link from 'next/link'
import EditSignalForm from '@/components/EditSignalForm'

export default function MySignalsCard({ signal }: { signal: Signal }) {
  const [edit, setEdit] = useState(false)
  return edit ? (
    <div className="h-fit p-3 shadow-md">
      <EditSignalForm signal={signal} setEdit={setEdit} />
    </div>
  ) : (
    <div className="h-fit p-3 shadow-md flex gap-4 justify-between items-center">
      <Link href={`/signals/${signal.id}`} className="grow border-r-2 pr-3">
        <div className="font-bold text-secondary-foreground">
          {signal.title}
        </div>
        <div className="py-1 font-semibold text-sm text-muted-foreground">
          {signal.location_name}
        </div>
        <div className="text-xs font-sans">
          {signal.created_at.toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </div>
      </Link>
      <div className="grid place-items-center py-3 px-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MdMoreVert className="text-xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEdit(!edit)}>
              Edit
            </DropdownMenuItem>
            <DeleteCommentWithDialog
              id={signal.id}
              deleteAction={deleteSignal}
              objectToDelete="signal"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
