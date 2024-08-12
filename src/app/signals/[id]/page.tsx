export default function Signal({ params: id }: { params: { id: string } }) {
  const { id: signalId } = id
  return (
    <div>
      <h1>Signal: {signalId}</h1>
    </div>
  )
}
