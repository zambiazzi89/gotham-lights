type ContactFormEmailProps = {
  name: string
  email: string
  content: string
}

export default function ContactFormEmail({
  name,
  email,
  content,
}: ContactFormEmailProps) {
  return (
    <div>
      <h2>Contact form submission</h2>
      <p>
        From <strong>{name}</strong> at {email}
      </p>
      <h3>Message: </h3>
      <p>{content}</p>
    </div>
  )
}
