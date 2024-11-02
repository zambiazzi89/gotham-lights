'use client'

import { IoIosArrowBack } from 'react-icons/io'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function GoBackButton({
  route,
  styles,
  variant = 'default',
}: {
  route: string
  styles?: string
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
}) {
  const router = useRouter()
  return (
    <Button
      className={`${styles}`}
      onClick={() => router.push(route)}
      variant={variant}
    >
      <IoIosArrowBack />
    </Button>
  )
}
