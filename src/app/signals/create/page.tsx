import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CreateSignalForm from './_components/CreateSignalForm'

export default function CreateSignal() {
  return (
    <div className="h-svh">
      <div className="grid grid-rows-layout h-full">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          {/* <form action={addSignal}>
            <div className="w-[32rem] max-w-[80dvw] bg-secondary p-4 rounded shadow-md">
              <Input
                placeholder="Name your signal"
                type="text"
                id="title"
                name="title"
                required
              />
              <DatePicker />
              <GoogleAutocompleteInput />
              <Textarea
                id="content"
                name="content"
                placeholder="What do you want to share?"
              />
              <div className="flex justify-between w-full mt-4">
                <CancelButtonWithDialog href="/signals" />
                <Button>Submit</Button>
              </div>
            </div>
          </form> */}
          <CreateSignalForm />
        </div>
        <Footer />
      </div>
    </div>
  )
}
