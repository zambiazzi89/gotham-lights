'use client'

import { IoIosArrowBack } from 'react-icons/io'
import { Button } from '@/components/ui/button'
import { usePreviousURLContext } from '@/context/PreviousURLContext'
import redirectFormAction from '../_actions/redirectFormAction'

export default function GoBackButton({
  styles,
  variant = 'default',
}: {
  styles?: string
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
}) {
  const previousURL = usePreviousURLContext()
  return (
    <form action={redirectFormAction}>
      <input type="hidden" name="formURL" value={previousURL || '/'} />
      <Button className={`${styles}`} variant={variant}>
        <IoIosArrowBack />
      </Button>
    </form>
  )
}
