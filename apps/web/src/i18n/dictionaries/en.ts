import type { Dictionary } from './es';

// Typed as `Dictionary`, so a key added to Spanish and forgotten here is a compile error
// rather than a blank space on the page.
//
// These are working translations of the Spanish source. The marketing voice — particularly
// the hero line, the value statements and the service copy — is worth a native review before
// launch; everything structural is done.
export const en: Dictionary = {
  about: {
    banner: { lead: 'At Nextel we deliver solutions that are', words: ['efficient', 'innovative', 'tailored', 'sustainable'] },
    challenges: {
      closing: 'We act as the bridge between companies and clients, delivering agile, efficient and results-driven consultancy.',
      eyebrow: 'Why we exist',
      items: [
        'Difficulty reaching new clients effectively.',
        'The need to streamline commercial processes without losing quality.',
        'A lack of resources to put sustainable acquisition strategies in place.',
        'Scarce specialist, impartial advice.'
      ],
      projectAlt: 'The team working on a project',
      title: 'In an increasingly competitive market under constant technological change, companies face a range of challenges.'
    },
    description:
      'Nextel is a company experienced in consultancy, brokerage and commercial development, united by a shared vision: efficient, innovative, tailored and sustainable solutions.',
    heroAlt: 'The Nextel Advisors team',
    introTitle: 'United by a shared vision',
    mission: {
      cards: [
        {
          body: 'To build relationships founded on trust through serious work, committed to quality and offering personal attention throughout.',
          title: 'Our mission'
        },
        { body: 'We combine deep expertise with drive and strategic vision to accelerate our clients’ growth.', title: 'Our foundation' }
      ],
      eyebrow: 'Why us?',
      meetingAlt: 'The team meeting in the office',
      title: 'Drive and strategic vision'
    },
    notes: [
      'Nextel is a company experienced in consultancy, brokerage and commercial development services.',
      'We deliver efficient, innovative, tailored and sustainable solutions.'
    ],
    stats: [
      { caption: 'Of sector specialists', value: 'A team' },
      { caption: 'Years of experience', value: '5+' }
    ],
    team: { eyebrow: 'Members', heading: 'Our team' },
    title: 'About Us'
  },

  common: {
    brandHome: 'Nextel Advisors — home',
    contactAdvisor: 'Talk to an advisor',
    language: 'Language',
    mainNav: 'Main navigation',
    menuTitle: 'Menu',
    openMenu: 'Open menu',
    skipToContent: 'Skip to content',
    writeUs: 'Write to us'
  },

  contact: {
    description: 'Get in touch with Nextel Advisors. Tell us about your new site acquisition or Site Management project.',
    eyebrow: 'Nextel Advisors',
    form: {
      email: 'Email address',
      genericError: 'We could not send your message. Please try again in a few minutes, or email us directly at {email}.',
      message: 'Message',
      name: 'Name',
      phone: 'Phone',
      privacyNotice: 'By sending this form you accept our',
      sending: 'Sending…',
      submit: 'Send message',
      success: 'Message sent. We will get back to you as soon as possible.'
    },
    heading: 'Contact',
    title: 'Contact'
  },

  footer: { links: 'Links', other: 'Other', rights: 'All rights reserved', taglinePrimary: 'Connecting today', taglineSecondary: 'Driving tomorrow' },

  home: {
    clients: { label: 'Trusted by' },
    description:
      'Nextel Advisors — consultancy, brokerage and commercial development for the telecommunications sector. New site acquisition and Site Management.',
    intro: { lead: 'Specialist consultancy in brokerage and commercial development services for the telecommunications sector.' },
    ogDescription: 'Specialist consultancy in brokerage and commercial development for the telecommunications sector.',
    positioning: {
      eyebrow: 'Nextel Advisors',
      note: 'We bring solid experience managing projects across the telecommunications sector.',
      title: 'Agile, efficient, results-driven consultancy.'
    },
    services: { eyebrow: 'Our services', heading: 'We get actively involved at every stage of the project' },
    statements: [
      'We act as the bridge between companies and clients, delivering agile, efficient and results-driven consultancy.',
      'We offer realistic solutions, aligned with what the market needs today.',
      'We guarantee direct, flexible and personal attention.',
      'We work to produce concrete results — measurable, and sustainable over time.'
    ],
    tagline: { first: 'Connecting', fourth: 'tomorrow', second: 'today,', third: 'driving' },
    title: 'Nextel Advisors — Connecting today, driving tomorrow'
  },

  languageNames: { en: 'English', es: 'Español' },

  legalLinks: { privacy: 'Privacy policy' },

  nav: { about: 'About Us', contact: 'Contact', home: 'Home', services: 'Services', why: 'Why Nextel?' },

  notFound: {
    back: 'Back to home',
    eyebrow: 'Error 404',
    heading: 'We could not find this page',
    lead: 'The page you are looking for does not exist, or its address has changed.',
    title: 'Page not found'
  },

  privacy: {
    eyebrow: 'Legal',
    heading: 'Privacy policy',
    intro:
      'This policy explains what personal data we process on this site, why, and what rights you have over it. It covers only what actually applies here: a contact form and a language cookie.',
    sections: [
      {
        body: [
          'Nextel Advisors — company tax ID [to be completed], registered at [to be completed], Spain.',
          'You can write to us at any time at {email}.'
        ],
        title: 'Data controller'
      },
      {
        body: [
          'Only what you give us voluntarily through the contact form: name, email address, phone number (optional) and the content of your message.',
          'We use no analytics, no advertising and no profiling, and we collect no browsing data beyond the technical logs our hosting provider generates for security and operation.'
        ],
        title: 'What we collect'
      },
      {
        body: [
          'The sole purpose is to answer your enquiry and, where applicable, to continue the business conversation that follows from it.',
          'The legal basis is your consent, given when you submit the form (GDPR art. 6.1.a), together with our legitimate interest in responding to the requests we receive (GDPR art. 6.1.f).'
        ],
        title: 'Purpose and legal basis'
      },
      {
        body: [
          'We keep your message for as long as it takes to deal with your enquiry, and afterwards for the period during which legal liabilities could arise. After that it is deleted.'
        ],
        title: 'How long we keep it'
      },
      {
        body: [
          'We do not share your data with third parties except where legally required. The site relies on two providers acting as data processors: Vercel Inc. (site hosting) and Resend (delivery of the form email).',
          'Both may process data outside the European Economic Area. Those transfers are covered by the Standard Contractual Clauses approved by the European Commission.'
        ],
        title: 'Recipients and international transfers'
      },
      {
        body: [
          'The site is served entirely over HTTPS. Form messages are not stored in any database: they are delivered straight to our inbox by email.'
        ],
        title: 'Security'
      },
      {
        body: ['You may exercise the following rights over your data at any time:'],
        footer:
          'To exercise them, write to us at {email}. If you believe we have not handled your request properly, you may lodge a complaint with the Spanish Data Protection Agency (aepd.es).',
        items: [
          'Access: find out what data of yours we process.',
          'Rectification: correct anything inaccurate.',
          'Erasure: ask us to delete it.',
          'Objection and restriction: ask us to stop processing it, or to limit how it is used.',
          'Portability: receive your data in a structured format.',
          'Withdraw consent at any time, without affecting processing carried out beforehand.'
        ],
        title: 'Your rights'
      },
      {
        body: [
          'This site uses no analytics or advertising cookies. We store only one technical cookie (NEXT_LOCALE) to remember the language you choose. Because it is strictly necessary to provide the service you asked for, it requires no prior consent.'
        ],
        title: 'Cookies'
      },
      {
        body: [
          'We may update this policy if the services on the site or the applicable rules change. The date of the last update is shown at the top.'
        ],
        title: 'Changes to this policy'
      }
    ],
    title: 'Privacy policy',
    updated: 'Last updated: July 2026'
  },

  serviceMenu: { all: 'See all services', newPlant: 'New site acquisition', siteManagement: 'Site Management' },

  services: {
    description:
      'New site acquisition and Site Management: site identification, terms negotiation, cost efficiency, lease renewal renegotiation and dispute management.',
    eyebrow: 'Nextel Advisors',
    heading: 'Our expertise',
    heroAlt: 'Telecommunications antennas backlit against the sky',
    newPlant: {
      items: [
        '**Identifying** and **securing** technically viable sites',
        'Compliance with **construction, planning and legal** requirements',
        'Selection of **strategic locations** to improve coverage',
        'Negotiation of **optimal commercial and legal terms**',
        'Formalising **stable** agreements, sustainable over the **long term**'
      ],
      titleAccent: 'acquisition',
      titleLead: 'New site'
    },
    pillars: [
      {
        body: 'We bring solid experience managing projects across the telecommunications sector.',
        items: ['New site acquisition projects', 'Site Management projects'],
        title: 'Experience'
      },
      {
        body: 'We get actively involved at every stage of the project, committed to the satisfaction of every landlord.',
        items: ['A transparent relationship', 'Professional conduct', 'A long-term outlook'],
        title: 'Satisfaction'
      }
    ],
    siteManagement: {
      items: [
        { details: ['Rent reductions or capitalisations that generate savings'], label: '**Cost efficiency projects**' },
        { details: ['Contract extensions on optimal terms'], label: '**Renegotiation of lease expiries**' },
        { details: ['Site access', 'Unpaid rent', 'Power supply and other operational problems'], label: '**Dispute management with landlords**' },
        { details: ['Further co-locations', 'Technology upgrades and 5G equipment installation'], label: '**Negotiation of additional space**' },
        {
          details: ['Processing and formalising assignments or changes of owner on existing contracts'],
          label: '**Changes of contractual ownership**'
        }
      ],
      titleAccent: 'management',
      titleLead: 'Site'
    },
    title: 'Services'
  },

  validation: {
    'email.invalid': 'Please enter a valid email address.',
    'message.max': 'That message is too long (2000 characters maximum).',
    'message.min': 'Please tell us a little more (at least 10 characters).',
    'name.max': 'That name is too long (120 characters maximum).',
    'name.min': 'Please tell us your name (at least 2 characters).',
    'phone.max': 'That phone number is too long (40 characters maximum).'
  },

  why: {
    commitment: {
      eyebrow: 'Our commitment',
      heading: 'We get involved at every stage of the project',
      stats: [
        { caption: 'Relationship with the landlord', value: 'Transparent' },
        { caption: 'In every interaction', value: 'Professional' },
        { caption: 'Outlook of the relationship', value: 'Long term' }
      ]
    },
    cta: { title: 'Shall we talk about your next project?' },
    description:
      'Specialist focus, closeness and commitment, measurable results and combined experience: the four reasons to work with Nextel Advisors.',
    eyebrow: 'Why us?',
    heading: 'A strategic partner, not just another supplier',
    lead: 'Four reasons landlords and operators trust Nextel Advisors.',
    reasons: [
      {
        body: 'We have deep knowledge of the telecommunications sector, which lets us offer realistic solutions aligned with what the market needs today.',
        title: 'Specialist focus'
      },
      {
        body: 'Being a compact team, we guarantee direct, flexible and personal attention, adapting to each client as a strategic partner.',
        title: 'Closeness and commitment'
      },
      {
        body: 'We do not just propose ideas: we work to produce concrete results, measurable and sustainable over time.',
        title: 'Measurable results'
      },
      {
        body: 'We bring together varied careers in sales, consultancy and commercial management, giving us a complete perspective to approach every project with confidence.',
        title: 'Combined experience'
      }
    ],
    title: 'Why Nextel?'
  }
};
