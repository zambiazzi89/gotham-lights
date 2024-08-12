import GoogleAutocompleteInput from '@/components/googleAutocomplete'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Input } from '@/components/ui/input'

export default function Home() {
  return (
    <div className="min-h-svh bg-[url(/bg-img4.jpeg)] bg-center bg-cover">
      <div className="grid grid-rows-layout bg-opacity-50 min-h-svh bg-black">
        <Navbar fontColor="text-white" withToggle={false} />
        <div className="flex flex-col justify-center items-center text-white">
          <div className="max-w-[80vw] flex flex-col items-center bg-black bg-opacity-50  backdrop-blur-sm p-8 rounded border-white">
            <h2 className="text-center text-2xl">
              Crushed on a stranger in NYC?
            </h2>
            <h2 className="font-medium text-2xl text-primary">
              Send them a signal!
            </h2>
            <GoogleAutocompleteInput />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
