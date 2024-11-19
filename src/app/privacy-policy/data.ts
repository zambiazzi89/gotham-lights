type PrivacyPolicy = {
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

export const privacyPolicy: PrivacyPolicy = {
  lastUpdated: 'Nov 19, 2024',
  sections: [
    {
      title: 'Information We Collect',
      subsections: [
        {
          subtitle: 'Information You Provide',
          content:
            'We collect information such as account details, encounter descriptions, and communications you share through the platform.',
        },
        {
          subtitle: 'Automatically Collected Information',
          content:
            'We collect usage data, device data, and cookies to enhance your experience.',
        },
        {
          subtitle: 'Third-Party Information',
          content:
            'We may receive additional information about you from linked accounts or third-party platforms.',
        },
      ],
    },
    {
      title: 'How We Use Your Information',
      subsections: [
        {
          subtitle: '',
          content: 'To provide, operate, and improve our Services.',
        },
        {
          subtitle: '',
          content:
            'To facilitate user connections based on shared encounter details.',
        },
        {
          subtitle: '',
          content:
            'To communicate with you about updates, promotions, or support.',
        },
        {
          subtitle: '',
          content: 'To monitor and analyze trends to improve user experience.',
        },
        {
          subtitle: '',
          content: 'To comply with legal obligations and enforce our Terms.',
        },
      ],
    },
    {
      title: 'How We Share Your Information',
      subsections: [
        {
          subtitle: 'With Other Users',
          content:
            'Encounter descriptions and user-generated content may be visible to others on the platform.',
        },
        {
          subtitle: 'Service Providers',
          content:
            'We share information with third-party vendors that help operate the platform, such as hosting and analytics services.',
        },
        {
          subtitle: 'Legal Compliance',
          content:
            'Information may be disclosed to comply with legal obligations, enforce our Terms, or protect rights and safety.',
        },
        {
          subtitle: 'Business Transfers',
          content:
            'Your data may be transferred in the event of a merger, acquisition, or sale of assets.',
        },
      ],
    },
    {
      title: 'Your Choices and Controls',
      subsections: [
        {
          subtitle: 'Account Settings',
          content:
            'You can update your profile and privacy preferences in your account settings.',
        },
        {
          subtitle: 'Access and Deletion',
          content:
            'Request access to or deletion of your data by contacting us at privacy@gothamlights.com.',
        },
        {
          subtitle: 'Cookies',
          content:
            'You can manage cookie preferences through your browser settings.',
        },
      ],
    },
    {
      title: 'Security of Your Information',
      content:
        'We use industry-standard measures to protect your information but cannot guarantee absolute security.',
    },
    {
      title: 'Children’s Privacy',
      content:
        'The platform is not intended for individuals under 18. If we discover we have collected information from a minor, it will be deleted.',
    },
    {
      title: 'International Users',
      content:
        'Your information will be processed in the United States, and privacy laws may differ from your home jurisdiction.',
    },
    {
      title: 'Changes to This Privacy Policy',
      content:
        'We may update this Privacy Policy periodically. Changes will be posted on this page, and continued use of the platform indicates acceptance.',
    },
  ],
}
