# FutCheck Project Overview

## What is FutCheck?

FutCheck is a comprehensive web application for EA FC 25 (FIFA) Ultimate Team players. It provides player statistics, real-time prices, squad building tools, SBC (Squad Building Challenge) solutions, and market analysis.

## Tech Stack

### Frontend
- **React 19** with functional components and hooks
- **Vite** for build tooling (not Create React App)
- **TypeScript** for type safety
- **Redux Toolkit** for global state management
- **React Router v7** for routing
- **Tailwind CSS 4** for styling
- **React Query (TanStack Query)** for server state and data fetching
- **React DnD** for drag-and-drop squad building
- **Recharts** for data visualization
- **WebAssembly (WASM)** for squad optimization algorithms

### Backend Integration
- Django REST API backend (separate repository: `futcheck_backend`)
- Axios for HTTP requests
- JWT authentication

### Key Services
- Google OAuth for authentication
- PayPal SDK for premium subscriptions
- Google Analytics for tracking

## Project Architecture

```
futcheck/
├── src/
│   ├── api/                    # API services
│   │   ├── apiService.js       # All API endpoint calls
│   │   ├── authService.js      # Authentication logic
│   │   └── axiosclient.js      # Axios instance configuration
│   │
│   ├── redux/                  # Redux state management
│   │   ├── store.js            # Store configuration
│   │   ├── playerSlice.js      # Player state
│   │   ├── appSlice.js         # App-wide state
│   │   ├── allPlayerSlice.js   # All players list state
│   │   ├── sbcSlice.js         # SBC state
│   │   ├── squadWizardSlice.js # Squad wizard state
│   │   └── evolutionSlice.js   # Evolution state
│   │
│   ├── components/             # React components
│   │   ├── common/            # Shared components (Header, Footer, etc.)
│   │   ├── club/              # User club management
│   │   ├── evos/              # Evolution system
│   │   ├── games/             # Mini-games (StatClash)
│   │   ├── market/            # Market analysis
│   │   ├── sbc/               # SBC tools
│   │   ├── squadBuilder/      # Squad building interface
│   │   ├── squadWizard/       # AI squad recommendations
│   │   ├── PlayerDashboard/   # Player detail pages
│   │   ├── PlayerViewCards/   # Player card displays
│   │   ├── filterPopups/      # Filter UI components
│   │   ├── dialogs/           # Modal dialogs
│   │   └── utils/             # Utility functions and constants
│   │
│   ├── pages/                 # Route page components
│   ├── wasm/                  # WebAssembly squad optimization
│   ├── assets/                # Static assets
│   ├── App.tsx                # Main app component
│   ├── routes.tsx             # Route definitions
│   └── main.tsx               # Entry point
│
├── public/                    # Public static files
├── .env                       # Environment variables
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── vite.config.ts             # Vite configuration
└── tailwind.config.js         # Tailwind CSS config

```

## Core Features

### 1. Player Database
- Browse 15,000+ EA FC 25 players
- Search by name or rating
- View detailed player stats and attributes
- Real-time price tracking
- Player version comparison

### 2. Squad Builder
- Drag-and-drop interface
- Chemistry calculation
- 35+ FIFA formations
- Custom tactics and player roles
- Save/load squads

### 3. SBC (Squad Building Challenges)
- Complete SBC database
- Community solutions
- Cost calculation
- Challenge requirements tracking

### 4. Market Analysis
- Price history charts
- Investment recommendations
- Market trends
- Player value predictions

### 5. Evolution System
- Player evolution tracking
- Evolution chains
- Stat improvements

### 6. User Features
- Google OAuth login
- Personal club management
- Saved squads
- Premium subscriptions (PayPal)

## Environment Variables

```bash
# API Configuration
VITE_API_URL=http://localhost:8000/

# Analytics
VITE_GOOGLE_ANALYTICS_ID=your-ga-id

# Authentication
VITE_GOOGLE_OAUTH_CLIENT_ID=your-oauth-client-id

# CDN & Assets
VITE_CDN_BASE_URL=https://cdn.futcheck.com/assets/img/fc26
VITE_EA_BASE_URL=https://www.ea.com/ea-sports-fc/ultimate-team/web-app/content/...

# Payment
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id

# Ads
VITE_GOOGLE_ADSENSE_ACCOUNT=your-adsense-account
```

## Key Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | NewHomePage | Homepage with trending players |
| `/players` | AllPlayersWrapper | Browse all players |
| `/player/:id/:name` | PlayerDashboardWrapper | Player details |
| `/squad-builder` | SquadBuilderWrapper | Squad builder tool |
| `/squad_wizard` | SquadWizardWrapper | AI squad builder (premium) |
| `/sbc` | SbcWrapper | SBC list |
| `/sbc/:id` | SbcViewWrapper | SBC details |
| `/my-club` | ClubWrapper | User's club |
| `/market` | MarketWrapper | Market analysis |
| `/evolutions` | EvolutionsWrapper | Evolution list |
| `/evolution/:id` | EvolutionDetailWrapper | Evolution details |
| `/games` | GamesWrapper | Mini-games |
| `/stat_clash` | StatClash | StatClash game |
| `/fc_combinations` | Combinations | Rating combinations |

## Development Commands

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Related Repositories

1. **futcheck_backend** - Django REST API backend
2. **futcheck_enhancer** - Browser extension for EA web app integration

## Important Notes

- Uses **Vite** (not Create React App)
- Environment variables use `VITE_` prefix (not `REACT_APP_`)
- Uses `import.meta.env` for env vars (not `process.env`)
- React 19 requires `--legacy-peer-deps` for some packages
- Backend API must be running for full functionality
