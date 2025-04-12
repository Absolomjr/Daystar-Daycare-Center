# Complete Project Structure

daystar-daycare/
├── daystar/                       # Frontend directory
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── components/            # Reusable UI components
│       │   ├── auth/
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   └── ForgotPassword.jsx
│       │   ├── babysitter/
│       │   │   ├── BabysitterList.jsx
│       │   │   ├── BabysitterForm.jsx
│       │   │   └── BabysitterSchedule.jsx
│       │   ├── children/
│       │   │   ├── ChildList.jsx
│       │   │   ├── ChildForm.jsx
│       │   │   └── AttendanceTracker.jsx
│       │   ├── financial/
│       │   │   ├── PaymentForm.jsx
│       │   │   ├── ExpenseTracker.jsx
│       │   │   └── FinancialReports.jsx
│       │   └── common/
│       │       ├── Navbar.jsx
│       │       ├── Sidebar.jsx
│       │       └── Dashboard.jsx
│       ├── pages/                 # Page components
│       │   ├── Home.jsx
│       │   ├── BabysitterManagement.jsx
│       │   ├── ChildManagement.jsx
│       │   └── FinancialManagement.jsx
│       ├── redux/                 # State management
│       │   ├── store.js
│       │   └── slices/
│       │       ├── authSlice.js
│       │       ├── babysitterSlice.js
│       │       └── childrenSlice.js
│       ├── services/             # API service calls
│       │   ├── api.js
│       │   ├── authService.js
│       │   └── financeService.js
│       ├── utils/                # Utility functions
│       │   ├── validation.js
│       │   └── helpers.js
│       ├── hooks/               # Custom React hooks
│       │   ├── useAuth.js
│       │   └── useNotification.js
│       ├── styles/              # Styling files
│       │   ├── global.css
│       │   └── theme.js
│       ├── App.jsx
│       └── index.js
│
├── server/                      # Backend directory
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── babysitterController.js
│   │   │   ├── childController.js
│   │   │   └── financeController.js
│   │   ├── models/            # Database models
│   │   │   ├── User.js
│   │   │   ├── Babysitter.js
│   │   │   ├── Child.js
│   │   │   └── Payment.js
│   │   ├── routes/            # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── babysitter.routes.js
│   │   │   ├── child.routes.js
│   │   │   └── finance.routes.js
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   ├── services/          # Business logic
│   │   │   ├── emailService.js
│   │   │   ├── paymentService.js
│   │   │   └── notificationService.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── database.js
│   │   │   └── logger.js
│   │   └── config/           # Configuration files
│   │       ├── database.js
│   │       └── constants.js
│   ├── tests/                # Test files
│   │   ├── unit/
│   │   └── integration/
│   └── server.js            # Entry point
│
├── shared/                  # Shared resources
│   ├── types/              # TypeScript types/interfaces
│   └── constants/          # Shared constants
│
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── package-lock.json
└── README.md