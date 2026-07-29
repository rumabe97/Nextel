// Spanish is the source of truth: this file holds the copy exactly as it was written for the
// site, and `Dictionary` is derived from it, so any other language that misses a key fails
// the type-check rather than silently rendering nothing.
//
// `**text**` marks bold inside a sentence. It exists so copy stays plain strings that a
// translator can edit without touching JSX — see components/RichText.
export const es = {
  about: {
    banner: { lead: 'En Nextel ofrecemos soluciones', words: ['eficientes', 'innovadoras', 'personalizadas', 'sostenibles'] },
    challenges: {
      closing: 'Actuamos como puente entre empresas y clientes, ofreciendo un servicio de consultoría ágil, eficiente y orientado a resultados.',
      eyebrow: '¿Por qué existimos?',
      items: [
        'Dificultades para llegar eficazmente a nuevos clientes.',
        'Necesidad de optimizar procesos comerciales sin perder calidad.',
        'Falta de recursos para implementar estrategias de captación sostenibles.',
        'Escasez de asesoramiento especializado e imparcial.'
      ],
      projectAlt: 'Equipo trabajando en un proyecto',
      title: 'En un entorno cada vez más competitivo y en constante evolución tecnológica, muchas empresas se enfrentan a diferentes retos.'
    },
    description:
      'Nextel es una empresa con experiencia en servicios de consultoría, intermediación y captación comercial, unidos por una visión común: soluciones eficientes, innovadoras, personalizadas y sostenibles.',
    heroAlt: 'El equipo de Nextel Advisors',
    introTitle: 'Unidos por una visión común',
    mission: {
      cards: [
        {
          body: 'Construir relaciones de confianza a través de un trabajo serio, comprometidos con la calidad y ofreciendo una atención personalizada.',
          title: 'Nuestra misión'
        },
        {
          body: 'Contamos con solidez de conocimientos, combinando experiencia, pasión y visión estratégica para impulsar el crecimiento de nuestros clientes.',
          title: 'Nuestra base'
        }
      ],
      eyebrow: '¿Por qué nosotros?',
      meetingAlt: 'Reunión del equipo en la oficina',
      title: 'Pasión y visión estratégica'
    },
    notes: [
      'Nextel es una empresa con experiencia en servicios de consultoría, intermediación y captación comercial.',
      'Ofrecemos soluciones eficientes, innovadoras, personalizadas y sostenibles.'
    ],
    stats: [
      { caption: 'De expertos en el sector', value: 'Equipo' },
      { caption: 'Años de experiencia', value: '5+' }
    ],
    team: { eyebrow: 'Miembros', heading: 'Nuestro equipo' },
    title: 'Sobre Nosotros'
  },

  common: {
    brandHome: 'Nextel Advisors — inicio',
    contactAdvisor: 'Contacta con un asesor',
    language: 'Idioma',
    mainNav: 'Navegación principal',
    menuTitle: 'Menú',
    openMenu: 'Abrir menú',
    skipToContent: 'Saltar al contenido',
    writeUs: 'Escríbenos'
  },

  contact: {
    description: 'Ponte en contacto con Nextel Advisors. Cuéntanos tu proyecto de contratación de nueva planta o Site Management.',
    eyebrow: 'Nextel Advisors',
    form: {
      email: 'Correo electrónico',
      genericError: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos o escríbenos directamente a {email}.',
      message: 'Mensaje',
      name: 'Nombre',
      phone: 'Teléfono',
      privacyNotice: 'Al enviar este formulario aceptas nuestra',
      sending: 'Enviando…',
      submit: 'Enviar mensaje',
      success: 'Mensaje enviado. Te responderemos lo antes posible.'
    },
    heading: 'Contacto',
    title: 'Contacto'
  },

  footer: {
    links: 'Links',
    other: 'Otros',
    rights: 'Todos los derechos reservados',
    taglinePrimary: 'Conectamos hoy',
    taglineSecondary: 'Impulsamos el mañana'
  },

  home: {
    description:
      'Nextel Advisors — consultoría, intermediación y captación comercial para el sector de las telecomunicaciones. Contratación de nueva planta y Site Management.',
    intro: { lead: 'Consultoría especializada en servicios de intermediación y captación comercial para el sector de las telecomunicaciones.' },
    ogDescription: 'Consultoría especializada en servicios de intermediación y captación comercial para el sector de las telecomunicaciones.',
    positioning: {
      eyebrow: 'Nextel Advisors',
      note: 'Contamos con una sólida experiencia en la gestión de proyectos vinculados al sector de las telecomunicaciones.',
      title: 'Servicio de consultoría ágil, eficiente y orientado a resultados.'
    },
    services: { eyebrow: 'Nuestros servicios', heading: 'Nos involucramos activamente en cada etapa del proyecto' },
    statements: [
      'Actuamos como puente entre empresas y clientes, ofreciendo un servicio de consultoría ágil, eficiente y orientado a resultados.',
      'Ofrecemos soluciones realistas y alineadas con las necesidades actuales del mercado.',
      'Garantizamos una atención directa, flexible y personalizada.',
      'Trabajamos para generar resultados concretos, medibles y sostenibles en el tiempo.'
    ],
    tagline: { first: 'Conectamos', fourth: 'el mañana', second: 'hoy,', third: 'impulsamos' },
    title: 'Nextel Advisors — Conectamos hoy, impulsamos el mañana'
  },

  languageNames: { en: 'English', es: 'Español' },

  legalLinks: { privacy: 'Política de privacidad' },

  nav: { about: 'Sobre Nosotros', contact: 'Contacto', home: 'Inicio', services: 'Servicios', why: '¿Por qué Nextel?' },

  notFound: {
    back: 'Volver al inicio',
    eyebrow: 'Error 404',
    heading: 'No encontramos esta página',
    lead: 'La página que buscas no existe o ha cambiado de dirección.',
    title: 'Página no encontrada'
  },

  privacy: {
    eyebrow: 'Legal',
    heading: 'Política de privacidad',
    intro:
      'Esta política explica qué datos personales tratamos en este sitio, con qué finalidad y qué derechos tienes sobre ellos. Solo recoge lo que realmente se aplica a esta web: un formulario de contacto y una cookie de idioma.',
    sections: [
      {
        body: [
          'Nextel Advisors — CIF [pendiente de completar], con domicilio en [pendiente de completar], España.',
          'Puedes escribirnos en cualquier momento a {email}.'
        ],
        title: 'Responsable del tratamiento'
      },
      {
        body: [
          'Únicamente los que nos facilitas de forma voluntaria a través del formulario de contacto: nombre, correo electrónico, teléfono (opcional) y el contenido de tu mensaje.',
          'No utilizamos analítica, publicidad ni elaboración de perfiles, y no recopilamos datos de navegación más allá de los registros técnicos que genera nuestro proveedor de alojamiento por motivos de seguridad y funcionamiento.'
        ],
        title: 'Qué datos recopilamos'
      },
      {
        body: [
          'La única finalidad es atender tu consulta y, en su caso, mantener la comunicación comercial que se derive de ella.',
          'La base jurídica es tu consentimiento, que prestas al enviar el formulario (art. 6.1.a RGPD), junto con nuestro interés legítimo en responder a las solicitudes que recibimos (art. 6.1.f RGPD).'
        ],
        title: 'Finalidad y base jurídica'
      },
      {
        body: [
          'Conservamos tu mensaje el tiempo necesario para atender la consulta y, después, durante el plazo en que puedan derivarse responsabilidades legales. Transcurrido ese plazo, se elimina.'
        ],
        title: 'Durante cuánto tiempo los conservamos'
      },
      {
        body: [
          'No cedemos tus datos a terceros, salvo obligación legal. El sitio se apoya en dos proveedores que actúan como encargados del tratamiento: Vercel Inc. (alojamiento del sitio) y Resend (entrega del correo del formulario).',
          'Ambos pueden tratar datos fuera del Espacio Económico Europeo. Dichas transferencias se amparan en las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.'
        ],
        title: 'Destinatarios y transferencias internacionales'
      },
      {
        body: [
          'El sitio se sirve íntegramente sobre HTTPS. Los mensajes del formulario no se guardan en ninguna base de datos: se entregan directamente por correo electrónico a nuestro buzón.'
        ],
        title: 'Seguridad'
      },
      {
        body: ['Puedes ejercer en cualquier momento los siguientes derechos sobre tus datos:'],
        footer:
          'Para ejercerlos, escríbenos a {email}. Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
        items: [
          'Acceso: saber qué datos tuyos tratamos.',
          'Rectificación: corregir los que sean inexactos.',
          'Supresión: solicitar que los eliminemos.',
          'Oposición y limitación: pedir que dejemos de tratarlos o que restrinjamos su uso.',
          'Portabilidad: recibir tus datos en un formato estructurado.',
          'Retirar el consentimiento en cualquier momento, sin que ello afecte al tratamiento previo.'
        ],
        title: 'Tus derechos'
      },
      {
        body: [
          'Este sitio no utiliza cookies analíticas ni publicitarias. Únicamente guardamos una cookie técnica (NEXT_LOCALE) para recordar el idioma que eliges. Al ser estrictamente necesaria para prestar el servicio que solicitas, no requiere consentimiento previo.'
        ],
        title: 'Cookies'
      },
      {
        body: [
          'Podemos actualizar esta política si cambian los servicios del sitio o la normativa aplicable. La fecha de la última actualización figura al principio.'
        ],
        title: 'Cambios en esta política'
      }
    ],
    title: 'Política de privacidad',
    updated: 'Última actualización: julio de 2026'
  },

  serviceMenu: { all: 'Ver todos los servicios', newPlant: 'Contratación de nueva planta', siteManagement: 'Site Management' },

  services: {
    description:
      'Contratación de nueva planta y Site Management: identificación de emplazamientos, negociación de condiciones, eficiencia económica, renegociación de vencimientos y gestión de conflictos.',
    eyebrow: 'Nextel Advisors',
    heading: 'Nuestro expertise',
    heroAlt: 'Antenas de telecomunicaciones a contraluz',
    newPlant: {
      items: [
        '**Identificación** y **contratación** de emplazamientos técnicamente viables',
        'Cumplimiento de requisitos **constructivos, urbanísticos y legales**',
        'Selección de **ubicaciones estratégicas** para mejora de cobertura',
        'Negociación de condiciones **económicas y legales óptimas**',
        'Formalización de acuerdos **estables** y sostenibles a **largo plazo**'
      ],
      titleAccent: 'nueva planta',
      titleLead: 'Contratación de'
    },
    pillars: [
      {
        body: 'Contamos con una sólida experiencia en la gestión de proyectos vinculados al sector de las telecomunicaciones.',
        items: ['Proyectos de contratación de nueva planta', 'Proyectos de Site Management'],
        title: 'Experiencia'
      },
      {
        body: 'Nos involucramos activamente en cada etapa del proyecto, comprometiéndonos con la satisfacción de las propiedades.',
        items: ['Relación transparente', 'Trato profesional', 'Enfoque a largo plazo'],
        title: 'Satisfacción'
      }
    ],
    siteManagement: {
      items: [
        { details: ['Reducción de rentas o capitalizaciones para generar ahorro'], label: '**Proyectos de eficiencia económica**' },
        { details: ['Extensión de contratos en condiciones óptimas'], label: '**Renegociación de vencimientos contractuales**' },
        {
          details: ['Acceso a los emplazamientos', 'Impagos', 'Suministro eléctrico u otros problemas operativos'],
          label: '**Gestión de conflictos con propiedades**'
        },
        {
          details: ['Comparticiones adicionales', 'Actualizaciones tecnológicas / instalación de equipamiento 5G'],
          label: '**Negociación de ampliaciones de espacio**'
        },
        {
          details: ['Tramitación y formalización de cesiones o modificaciones de titular en los contratos vigentes'],
          label: '**Cambios de titularidad contractual**'
        }
      ],
      titleAccent: 'management',
      titleLead: 'Site'
    },
    title: 'Servicios'
  },

  // Keyed by the codes the entity schema emits, so validation text lives with the rest of
  // the copy instead of being hard-coded in Spanish inside packages/core.
  validation: {
    'email.invalid': 'Introduce un correo electrónico válido.',
    'message.max': 'El mensaje es demasiado largo (máximo 2000 caracteres).',
    'message.min': 'Cuéntanos algo más (mínimo 10 caracteres).',
    'name.max': 'El nombre es demasiado largo (máximo 120 caracteres).',
    'name.min': 'Indícanos tu nombre (mínimo 2 caracteres).',
    'phone.max': 'El teléfono es demasiado largo (máximo 40 caracteres).'
  },

  why: {
    commitment: {
      eyebrow: 'Nuestro compromiso',
      heading: 'Nos involucramos en cada etapa del proyecto',
      stats: [
        { caption: 'Relación con la propiedad', value: 'Transparente' },
        { caption: 'En cada interacción', value: 'Profesional' },
        { caption: 'Enfoque de la relación', value: 'Largo plazo' }
      ]
    },
    cta: { title: '¿Hablamos de tu próximo proyecto?' },
    description:
      'Enfoque especializado, cercanía y compromiso, resultados medibles y experiencia combinada: las cuatro razones por las que trabajar con Nextel Advisors.',
    eyebrow: '¿Por qué nosotros?',
    heading: 'Un socio estratégico, no un proveedor más',
    lead: 'Cuatro razones por las que las propiedades y los operadores confían en Nextel Advisors.',
    reasons: [
      {
        body: 'Contamos con conocimiento profundo en el sector de telecomunicaciones, lo que nos permite ofrecer soluciones realistas y alineadas con las necesidades actuales del mercado.',
        title: 'Enfoque especializado'
      },
      {
        body: 'Al ser un equipo compacto, garantizamos una atención directa, flexible y personalizada, adaptándonos a cada cliente como un socio estratégico.',
        title: 'Cercanía y compromiso'
      },
      {
        body: 'No solo proponemos ideas: trabajamos para generar resultados concretos, medibles y sostenibles en el tiempo.',
        title: 'Resultados medibles'
      },
      {
        body: 'Unimos trayectorias profesionales diversas en ventas, consultoría y gestión comercial, lo que nos da una perspectiva completa para abordar cada proyecto con solidez.',
        title: 'Experiencia combinada'
      }
    ],
    title: '¿Por qué Nextel?'
  }
};

export type Dictionary = typeof es;
