import { IoIosArrowBack } from 'react-icons/io'
import { Button } from '@/components/ui/button'

export default function Signal({ params: id }: { params: { id: string } }) {
  const { id: signalId } = id
  return (
    <div>
      <h1>Signal: {signalId}</h1>

      <Button className="my-3">
        <IoIosArrowBack />
      </Button>
    </div>
  )
}
