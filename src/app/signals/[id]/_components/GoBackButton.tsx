'use client'

import { IoIosArrowBack } from 'react-icons/io'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function GoBackButton() {
  const router = useRouter()
  return (
    <Button onClick={() => router.push('/signals')}>
      <IoIosArrowBack />
    </Button>
  )
}
