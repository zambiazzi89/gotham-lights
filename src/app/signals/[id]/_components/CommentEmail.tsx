type CommentEmailProps = {
  username: string
  content: string
}

export default function CommentEmail({ username, content }: CommentEmailProps) {
  return (
    <div>
      <h2>Comment created!</h2>
      <p>
        Created by <strong>{username}</strong>
      </p>
      <h4>Content: </h4>
      <p>{content}</p>
    </div>
  )
}
