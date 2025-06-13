export const en = {
  common: {
    appName: 'Nipe ID',
    search: 'Search',
    submit: 'Submit',
    cancel: 'Cancel',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  home: {
    title: 'Lost Your Documents?',
    subtitle: "We'll Help You Find Them",
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
  },
  about: {
    title: 'About',
    subtitle: 'Learn more about our document recovery service and how we\'re helping Kenyans',
    description: 'We help Kenyans find and recover their lost documents through our nationwide network of kiosks and verification system. Our platform provides a secure and efficient way to locate and claim your missing documents.',
    features: {
      title: 'Our Features',
      quickSearch: {
        title: 'Quick Search',
        description: 'Find your lost documents using name, document number, or type',
      },
      secureVerification: {
        title: 'Secure Verification',
        description: 'Multi-step verification process to ensure legitimate claims',
      },
      realTimeUpdates: {
        title: 'Real-time Updates',
        description: 'Get instant notifications about your document status',
      },
      nationwideNetwork: {
        title: 'Nationwide Network',
        description: 'Access to kiosks and collection points across the country',
      },
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
}; 