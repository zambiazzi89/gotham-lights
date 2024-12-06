type ReportFormEmailProps = {
  reported_username: string
  reported_by_username: string
  reason: string
}

export default function ReportFormEmail({
  reported_username,
  reported_by_username,
  reason,
}: ReportFormEmailProps) {
  return (
    <div>
      <h2>Report form submission</h2>
      <p>
        User <strong>{reported_username}</strong> was reported by{' '}
        {reported_by_username}
      </p>
      <h3>Reason: </h3>
      <p>{reason}</p>
    </div>
  )
}
