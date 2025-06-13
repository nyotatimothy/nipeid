export const en = {
  common: {
    appName: 'Nipe ID',
    search: 'Search',
    submit: 'Submit',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    buttons: {
      back: 'Back',
      next: 'Next'
    }
  },
  home: {
    title: 'Find Your Lost Documents',
    subtitle: 'Quick and secure document recovery',
    description: 'Our nationwide network of secure kiosks helps connect lost documents with their rightful owners. Quick, secure, and reliable recovery service across Kenya.',
    searchForm: {
      title: 'Search for Your Document',
      documentNumber: 'Document Number',
      documentType: 'Document Type',
      searchButton: 'Search Documents',
      searching: 'Searching...',
    },
    noResults: {
      title: 'No Documents Found',
      description: "We couldn't find any documents matching your search criteria. If you've lost or misplaced your document, you can report it here.",
      reportButton: 'Report Lost Document',
    },
    reportSuccess: {
      title: 'Report Received Successfully',
      description: 'Thank you for reporting your lost document. We have recorded your information and will actively search for your document.',
      emailUpdate: 'We will send updates to',
      searchAgain: 'Search Again',
      contactSupport: 'Contact Support',
    },
    search: {
      title: 'Search for your document',
      documentNumber: 'Document Number',
      documentType: 'Document Type',
      types: [
        { value: 'national-id', label: 'National ID' },
        { value: 'passport', label: 'Passport' },
        { value: 'driving-license', label: 'Driving License' },
        { value: 'birth-certificate', label: 'Birth Certificate' },
        { value: 'other', label: 'Other' }
      ],
      button: 'Search',
      searching: 'Searching...'
    },
    notFound: {
      title: 'Document Not Found',
      description: "We couldn't find your document in our system. Would you like to report it as lost?",
      button: 'Report Lost Document'
    }
  },
  about: {
    title: 'About NipeID',
    subtitle: 'Revolutionizing lost document recovery in Kenya through technology and innovation',
    description: "NipeID is Kenya's premier digital platform for lost document management and recovery. Our mission is to simplify the process of finding and retrieving lost identification documents through a secure, efficient, and user-friendly system.",
    features: {
      title: 'Key Features & Benefits',
      items: {
        security: {
          title: 'Secure Document Management',
          description: 'Advanced encryption and secure storage for all your identification documents.'
        },
        recovery: {
          title: 'Quick Recovery',
          description: 'Fast and efficient document recovery process through our network of kiosks.'
        },
        coverage: {
          title: 'Nationwide Coverage',
          description: 'Extensive network of kiosks across Kenya for convenient document pickup.'
        },
        notifications: {
          title: 'Real-time Notifications',
          description: 'Instant alerts when your documents are found and ready for collection.'
        }
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'How do I search for my lost document?',
          answer: 'Simply enter your document number or name in the search bar on our homepage. Our system will check if your document has been found and is available for collection.'
        },
        {
          question: 'What types of documents can I find through NipeID?',
          answer: 'We handle various identification documents including National IDs, Passports, Driving Licenses, and Student IDs.'
        },
        {
          question: 'How long does it take to recover a document?',
          answer: 'Once your document is found in our system, you can collect it immediately from your nearest kiosk. The entire process typically takes less than 24 hours.'
        },
        {
          question: 'What do I need to bring when collecting my document?',
          answer: "You'll need to bring a valid form of identification and the reference number provided during your search."
        },
        {
          question: 'Is there a fee for using NipeID services?',
          answer: 'Basic document search is free. A small administrative fee may apply for document collection and verification.'
        },
        {
          question: 'How secure is my information?',
          answer: 'We employ bank-grade encryption and security measures to protect all personal information and documents in our system.'
        },
        {
          question: 'How do I report a lost document?',
          answer: 'You can report a lost document through our search page. If your document is not found in our system, you will be given the option to file a report.'
        },
        {
          question: 'Can I get notifications when my document is found?',
          answer: 'Yes, we will notify you via email and SMS when your document is found and ready for collection.'
        },
        {
          question: 'What happens if someone claims my document?',
          answer: 'We have a strict verification process to ensure documents are only released to their rightful owners. Multiple forms of identification are required.'
        },
        {
          question: 'How can I contact support?',
          answer: 'You can reach our support team through the contact form, email, phone, or WhatsApp. We aim to respond within 24 hours.'
        }
      ]
    },
    mission: {
      title: 'Our Mission',
      description: 'To provide a seamless and secure platform for Kenyans to recover their lost identification documents, reducing the stress and time associated with traditional recovery methods. We aim to leverage technology to create a more efficient and accessible document management system for all.'
    },
    impact: {
      title: 'Our Impact',
      stats: {
        documentsFound: {
          label: 'Documents Found',
          value: '10,000+',
        },
        documentsReturned: {
          label: 'Documents Returned',
          value: '8,500+',
        },
        activeUsers: {
          label: 'Active Users',
          value: '15,000+',
        },
        partnerKiosks: {
          label: 'Partner Kiosks',
          value: '100+',
        },
      },
    },
  },
  login: {
    title: 'Welcome Back',
    subtitle: 'Sign in to access your Nipe ID account',
    form: {
      email: 'Email',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign in',
      or: 'OR',
      googleButton: 'Google',
      facebookButton: 'Facebook',
      noAccount: 'Don\'t have an account?',
      signUp: 'Sign up',
    },
    terms: {
      text: 'By signing in, you agree to our',
      termsLink: 'Terms of Service',
      and: 'and',
      privacyLink: 'Privacy Policy',
    },
  },
  reportForm: {
    title: 'Report Lost Document',
    description: 'Please provide your contact information and any details you remember about your document. The more information you provide, the easier it will be for us to help you.',
    sections: {
      contact: {
        title: 'Contact Information',
        fullName: 'Full Name',
        phone: 'Phone Number',
        email: 'Email Address',
        emailHelper: "We'll use this to notify you when we find your document",
      },
      document: {
        title: 'Document Information',
        infoAlert: 'Please provide either the document number or the names as they appear on the document. Including both will help us locate your document faster.',
        type: 'Document Type',
        otherType: 'Specify Document Type',
        number: 'Document Number (if known)',
        numberHelper: 'Enter the document number if you remember it',
        names: 'Names on the Document',
        namesHelper: 'Enter the names as they appear on the document, if you remember them',
      },
    },
  },
  documentTypes: [
    { value: 'national-id', label: 'National ID' },
    { value: 'passport', label: 'Passport' },
    { value: 'driving-license', label: 'Driving License' },
    { value: 'birth-certificate', label: 'Birth Certificate' },
    { value: 'academic-certificate', label: 'Academic Certificate' },
    { value: 'other', label: 'Other' },
  ],
  contact: {
    title: 'Contact Support',
    subtitle: 'Do you need help with finding your document, reporting a lost document, or have questions about our services? Our support team is here to assist you every step of the way.',
    form: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Your message has been sent successfully. We\'ll get back to you soon.',
      error: 'Failed to send message. Please try again.',
      tooManyAttempts: 'Too many attempts. Please try again later.'
    },
    info: {
      title: 'Contact Information',
      email: 'support@nipeid.com',
      phone: '+254 700 000000',
      whatsapp: '+254 700 000000',
      location: 'Nairobi, Kenya',
      hours: 'Mon - Fri, 8:00 AM - 5:00 PM'
    }
  }
}; 