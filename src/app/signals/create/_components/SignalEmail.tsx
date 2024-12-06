type SignalEmailProps = {
  username: string
  title: string
  content: string
}

export default function SignalEmail({
  username,
  title,
  content,
}: SignalEmailProps) {
  return (
    <div>
      <h2>Signal created!</h2>
      <p>
        Created by <strong>{username}</strong>
      </p>
      <h3>Title: </h3>
      <p>{title}</p>
      <h4>Content: </h4>
      <p>{content}</p>
    </div>
  )
}
