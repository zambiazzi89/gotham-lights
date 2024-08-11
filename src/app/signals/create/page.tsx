import { CancelButtonWithDialog } from '@/components/AlertDialog'
import Footer from '@/components/Footer'
import GoogleAutocompleteInput from '@/components/googleAutocomplete'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useGoogleAPIContext } from '@/context/GoogleAPIContext'

export default function CreateSignal() {
  return (
    <div className="min-h-svh">
      <div className="grid grid-rows-layout min-h-svh">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          <form>
            <div className="w-[32rem] max-w-[80dvw] bg-secondary p-4 rounded shadow-md">
              <Input
                placeholder="Name your signal"
                type="text"
                id="title"
                name="title"
                required
              />
              <DatePicker />
              {/* <GoogleAutocompleteInput /> */}
              <Textarea placeholder="What do you want to share?" />
              <div className="flex justify-between w-full mt-4">
                <CancelButtonWithDialog href="/signals" />
                <Button>Submit</Button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  )
}
