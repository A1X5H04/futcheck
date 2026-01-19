# FutCheck Architecture Documentation

## System Architecture

### High-Level Architecture

```
┌─────────────────┐
│   Browser       │
│  (React App)    │
└────────┬────────┘
         │
         │ HTTP/HTTPS
         │
┌────────▼────────────────────────────────┐
│   Django REST API Backend               │
│   (futcheck_backend)                    │
│   - Player Data                         │
│   - Authentication                      │
│   - Market Prices                       │
│   - SBC Data                            │
│   - Squad Optimization (Genetic Algo)   │
└────────┬────────────────────────────────┘
         │
         │
    ┌────┴────┬──────────┐
    │         │          │
┌───▼───┐ ┌──▼───┐ ┌────▼─────┐
│ PostgreSQL Redis │  AWS S3    │
│ Database  Cache  │  (Assets)  │
└────────┘ └──────┘ └──────────┘
```

### Frontend Architecture (This Repository)

```
┌──────────────────────────────────────────────┐
│              React App (Vite)                 │
├──────────────────────────────────────────────┤
│                                               │
│  ┌─────────────┐    ┌──────────────┐        │
│  │   Routes    │───▶│   Pages      │        │
│  │ (Router v7) │    │  Components  │        │
│  └─────────────┘    └──────────────┘        │
│         │                   │                │
│         │                   │                │
│  ┌──────▼───────────────────▼────────┐      │
│  │      Component Tree                │      │
│  │  - Common Components               │      │
│  │  - Feature Components              │      │
│  │  - Smart/Container Components      │      │
│  └──────┬──────────────┬──────────────┘      │
│         │              │                     │
│  ┌──────▼──────┐  ┌───▼────────┐           │
│  │   Redux     │  │ React Query│           │
│  │   Store     │  │  (TanStack) │           │
│  │ (Global     │  │  (Server    │           │
│  │  State)     │  │   State)    │           │
│  └──────┬──────┘  └───┬────────┘           │
│         │             │                     │
│  ┌──────▼─────────────▼────────┐           │
│  │      API Layer               │           │
│  │   - apiService.js            │           │
│  │   - authService.js           │           │
│  │   - axiosclient.js           │           │
│  └──────────────┬───────────────┘           │
│                 │                            │
└─────────────────┼────────────────────────────┘
                  │
          ┌───────▼────────┐
          │  Backend API   │
          └────────────────┘
```

## State Management Strategy

### Redux (Global State)
Used for app-wide state that needs to be shared across components:

- **playerSlice**: Currently viewed player data
- **appSlice**: App-level state (modals, user info, etc.)
- **allPlayerSlice**: List of all players (browse page)
- **sbcSlice**: SBC data
- **squadWizardSlice**: Squad wizard configuration
- **evolutionSlice**: Evolution data

### React Query (Server State)
Used for data fetching, caching, and synchronization:
- Automatic caching
- Background refetching
- Optimistic updates
- Request deduplication

### Local Component State
Used for UI-specific state:
- Form inputs
- Toggle states
- Modal open/close
- Temporary UI state

## Data Flow

### 1. Player Search Flow
```
User Input (Search)
    ↓
Component State
    ↓
apiService.fetchPlayers()
    ↓
Axios Request → Backend API
    ↓
Response Data
    ↓
Update Redux Store (allPlayerSlice)
    ↓
Re-render Components
```

### 2. Authentication Flow
```
User clicks "Sign in with Google"
    ↓
GoogleOAuthProvider
    ↓
Get OAuth Token
    ↓
authService.googleLogin(token)
    ↓
Backend validates token
    ↓
Return JWT + User Data
    ↓
Store in Redux (appSlice)
    ↓
Store JWT in localStorage
    ↓
Include JWT in future API requests
```

### 3. Squad Builder Flow
```
User drags player to formation
    ↓
React DnD handles drag/drop
    ↓
Update local squad state
    ↓
Calculate chemistry (client-side or WASM)
    ↓
Display updated squad + chemistry
    ↓
User clicks "Save Squad"
    ↓
API call to save squad
    ↓
Update user's saved squads
```

## Component Architecture

### Component Types

#### 1. Page Components (Wrappers)
- Top-level route components
- Handle data fetching
- Pass data to presentational components
- Examples: `AllPlayersWrapper`, `SquadBuilderWrapper`

#### 2. Container Components
- Connect to Redux
- Handle business logic
- Manage complex state
- Examples: Squad builder, SBC solver

#### 3. Presentational Components
- Receive data via props
- Focus on UI rendering
- Minimal logic
- Reusable
- Examples: PlayerCard, Button, Modal

#### 4. Common Components
- Shared across the app
- Examples: Header, Footer, SearchBar

### Component Naming Conventions

- **Wrapper**: Page-level component for routes
- **Dialog**: Modal/popup components
- **Card**: Card-style display components
- **List**: List/table components
- **Form**: Form components

## API Integration

### API Client Configuration

**File**: `src/api/axiosclient.js`

```javascript
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add auth token)
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Service Functions

**File**: `src/api/apiService.js`

All API calls are centralized here:
- `fetchPlayers(value, searchMode)` - Search players
- `fetchPrice(id, futwiz_id)` - Get player prices
- `fetchVersions(base_id, id)` - Get player versions
- `fetchLatestPlayers()` - Latest added players
- `fetchTopRatedPlayers()` - Top rated players
- `fetchSBCData()` - SBC list
- etc.

## Routing Architecture

Uses React Router v7 with new `createBrowserRouter` API.

**File**: `src/routes.tsx`

- Centralized route definitions
- Middleware support (logging)
- Error boundaries
- Nested layouts

## Styling Strategy

### Tailwind CSS
- Utility-first approach
- Custom theme configuration
- Responsive design with breakpoints
- Dark theme support

### Component Styling Pattern
```jsx
// Tailwind utility classes directly in JSX
<div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
  <img className="w-16 h-16 rounded-full" />
  <h3 className="text-xl font-bold text-white">Player Name</h3>
</div>
```

## Performance Optimizations

### 1. Code Splitting
- Route-based code splitting via React Router
- Lazy loading of components
- Dynamic imports for heavy features

### 2. Memoization
- `React.memo()` for expensive components
- `useMemo()` for expensive calculations
- `useCallback()` for stable function references

### 3. Data Fetching
- React Query caching
- Background refetching
- Stale-while-revalidate pattern

### 4. Image Optimization
- CDN for player images
- WebP format
- Lazy loading with Intersection Observer

### 5. Bundle Optimization
- Vite for fast builds
- Tree shaking
- Minification

## WebAssembly Integration

**Location**: `src/wasm/`

Used for computationally expensive squad optimization:
- Squad builder genetic algorithm
- Chemistry calculations
- Performance-critical operations

## Security Considerations

### Authentication
- JWT tokens for API authentication
- HttpOnly cookies (recommended)
- Token refresh mechanism

### Data Validation
- Input sanitization
- Type checking with TypeScript
- API response validation

### Environment Variables
- Sensitive data in `.env` (not committed)
- Public variables use `VITE_` prefix
- Never expose secret keys in client code

## Error Handling

### Error Boundary
Top-level error boundary catches React errors.

### API Error Handling
```javascript
try {
  const data = await apiService.fetchPlayers(query);
  return data;
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
  toast.error('Failed to fetch players');
}
```

### Network Error Handling
- Retry logic with React Query
- Fallback UI for failed requests
- Offline detection

## Build and Deployment

### Build Process
1. TypeScript compilation
2. Vite bundling
3. Asset optimization
4. Static file generation

### Output
- `dist/` folder with optimized static files
- Ready for CDN deployment
- Can be served by any static file server

### Deployment Targets
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting
