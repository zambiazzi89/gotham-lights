type TermsAndConditions = {
  lastUpdated: string // ISO date format
  sections: Section[]
}

type Section = {
  title: string
  content?: string
  subsections?: Subsection[]
}

type Subsection = {
  subtitle: string
  content: string
}

export const termsAndConditions: TermsAndConditions = {
  lastUpdated: 'Nov 19, 2024',
  sections: [
    {
      title: 'Acceptance of Terms',
      content:
        'By accessing and using Gotham Lights, you accept and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please refrain from using our Services.',
    },
    {
      title: 'Description of Services',
      content:
        'Gotham Lights is a platform designed to help users reconnect with individuals they found attractive in New York City but missed the opportunity to engage with. Users can describe their encounters, share details about the time and place, and use the platform to find and connect with those individuals.',
    },
    {
      title: 'User Accounts',
      subsections: [
        {
          subtitle: 'Registration',
          content:
            'To access certain features of Gotham Lights, you may need to create an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.',
        },
        {
          subtitle: 'Account Security',
          content:
            'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.',
        },
      ],
    },
    {
      title: 'User Responsibilities',
      subsections: [
        {
          subtitle: 'Eligibility',
          content:
            'You must be at least 18 years old to use Gotham Lights. By using our Services, you represent and warrant that you meet this age requirement.',
        },
        {
          subtitle: 'Accurate Information',
          content:
            'You agree to provide truthful and accurate information when using Gotham Lights and to update your information as necessary.',
        },
      ],
    },
    {
      title: 'Prohibited Activities',
      subsections: [
        {
          subtitle: 'Misuse of Services',
          content:
            'Using the platform for any unlawful purposes or in a manner that violates these Terms.',
        },
        {
          subtitle: 'Harassment and Abuse',
          content: 'Harassing, threatening, or abusing other users.',
        },
        {
          subtitle: 'Impersonation',
          content:
            'Creating accounts or posting content that impersonates any person or entity.',
        },
        {
          subtitle: 'Spam',
          content: 'Sending unsolicited messages or advertisements.',
        },
        {
          subtitle: 'Content Restrictions',
          content:
            'Uploading or sharing content that is illegal, offensive, defamatory, or infringes on the rights of others.',
        },
      ],
    },
    {
      title: 'Content Ownership and Rights',
      subsections: [
        {
          subtitle: 'User Content',
          content:
            'You retain ownership of the content you post on Gotham Lights. By posting content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content in connection with providing our Services.',
        },
        {
          subtitle: 'Intellectual Property',
          content:
            'All trademarks, logos, and service marks displayed on Gotham Lights are the property of their respective owners. You are not permitted to use them without prior written consent.',
        },
      ],
    },
    {
      title: 'Privacy',
      content:
        'Your use of Gotham Lights is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.',
    },
    {
      title: 'Termination',
      content:
        'We reserve the right to suspend or terminate your account and access to Gotham Lights, without prior notice or liability, for any reason, including if you breach these Terms.',
    },
    {
      title: 'Disclaimers',
      subsections: [
        {
          subtitle: 'As-Is Basis',
          content: `Gotham Lights is provided on an 'AS IS' and 'AS AVAILABLE' basis. We make no warranties, express or implied, regarding the operation of the platform or the information, content, or materials included.`,
        },
        {
          subtitle: 'No Guarantee of Success',
          content:
            'We do not guarantee that the Services will help you reconnect with specific individuals or that any interactions will be successful.',
        },
      ],
    },
    {
      title: 'Limitation of Liability',
      content:
        'To the fullest extent permitted by law, Gotham Lights and its affiliates, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Services.',
    },
    {
      title: 'Indemnification',
      content:
        'You agree to defend, indemnify, and hold harmless Gotham Lights and its affiliates from any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Services, your violation of these Terms, or your infringement of any rights of a third party.',
    },
    {
      title: 'Governing Law',
      content:
        'These Terms shall be governed and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.',
    },
    {
      title: 'Changes to Terms',
      content:
        'We may modify these Terms at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the Services after any changes constitutes your acceptance of the new Terms.',
    },
  ],
}
