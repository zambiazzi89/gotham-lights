import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { termsAndConditions } from './data'

export default function TermsAndConditions() {
  return (
    <Card className="w-[90svw] my-8 p-8">
      <CardHeader>
        <CardTitle>Terms and Conditions</CardTitle>
        <CardDescription>
          Last Updated: {termsAndConditions.lastUpdated}
        </CardDescription>
        <CardDescription>
          Welcome to Gotham Lights! These Terms and Conditions ("Terms") govern
          your use of our website and services ("Services"). By accessing or
          using Gotham Lights, you agree to comply with and be bound by these
          Terms. If you do not agree with any part of these Terms, please do not
          use our Services.
        </CardDescription>
        <CardContent className="py-4 flex flex-col gap-4 text-sm">
          {termsAndConditions.sections.map((section, i) => {
            return (
              <div key={i}>
                <div className="flex gap-2 font-bold">
                  <div>{i + 1}.</div>
                  <div>{section.title}</div>
                </div>
                {section.content && <div>{section.content}</div>}
                {section.subsections &&
                  section.subsections.map((subsection, i) => {
                    return (
                      <li key={i} className="pl-4">
                        <span className="font-semibold">
                          {subsection.subtitle}:{' '}
                        </span>
                        <span>{subsection.content}</span>
                      </li>
                    )
                  })}
              </div>
            )
          })}
        </CardContent>
      </CardHeader>
    </Card>
  )
}
