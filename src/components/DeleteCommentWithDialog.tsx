'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

export default function DeleteCommentWithDialog({
  id,
  deleteAction,
  objectToDelete,
}: {
  id: string
  deleteAction: Function
  objectToDelete: string
}) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isPending}
          variant={'ghost'}
          className="text-destructive w-full justify-start hover:text-destructive pl-2"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this {objectToDelete}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            All information will be permanently lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <DropdownMenuItem asChild>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </DropdownMenuItem>
          <AlertDialogAction
            variant={'destructive'}
            onClick={() =>
              startTransition(async () => {
                await deleteAction(id)
                {
                  objectToDelete == 'comment'
                    ? router.refresh()
                    : redirect('/signals')
                }
              })
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
