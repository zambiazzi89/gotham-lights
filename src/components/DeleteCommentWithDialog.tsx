'use client'

import { deleteComment } from '@/app/profile/my-activity/_actions/deleteActions'
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
import { useRouter } from 'next/navigation'

export default function DeleteCommentWithDialog({ id }: { id: string }) {
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
            Are you sure you want to delete this comment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            All information will be permanently lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={'destructive'}
            onClick={() =>
              startTransition(async () => {
                await deleteComment(id)
                router.refresh()
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
