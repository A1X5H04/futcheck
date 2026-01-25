# Quick Start Guide for AI Agents

## Getting Started

### 1. Read This First
Start with these documents in order:
1. `PROJECT_OVERVIEW.md` - Understand what FutCheck is
2. `ARCHITECTURE.md` - Learn the system architecture
3. `COMPONENTS.md` - Component directory reference
4. `API.md` - Backend API integration
5. `DEVELOPMENT_GUIDE.md` - Coding standards

### 2. Run the Development Server

```bash
# Navigate to project
cd /Users/saadshaikh/Desktop/futcheck/futcheck

# Install dependencies (if not already done)
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Access at: http://localhost:5173/
```

### 3. Common Tasks Quick Reference

#### Adding a New Component

```bash
# 1. Determine the right location
# - Common component? → src/components/common/
# - Feature-specific? → src/components/{feature}/
# - Page component? → src/components/ with *Wrapper suffix

# 2. Create component file
# src/components/common/NewComponent.jsx
```

```jsx
import React from 'react';

function NewComponent({ prop1, prop2 }) {
  return (
    <div className="flex items-center gap-4">
      {/* Component content */}
    </div>
  );
}

export default NewComponent;
```

#### Adding a New Page/Route

```javascript
// 1. Create page component wrapper
// src/components/NewFeatureWrapper.jsx

function NewFeatureWrapper() {
  // Data fetching, state management
  return <NewFeaturePage />;
}

// 2. Add route in src/routes.tsx
{
  path: "new-feature",
  Component: NewFeatureWrapper,
}
```

#### Adding a New API Endpoint

```javascript
// 1. Add to src/api/apiService.js

export const fetchNewData = async (params) => {
  try {
    const response = await instance.get(`/new-endpoint/?param=${params}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching new data:', error);
    throw error;
  }
};

// 2. Use in component with React Query
import { useQuery } from '@tanstack/react-query';
import { fetchNewData } from '../api/apiService';

function Component() {
  const { data, isLoading } = useQuery({
    queryKey: ['newData'],
    queryFn: fetchNewData,
  });
}
```

#### Adding Redux State

```javascript
// 1. Create new slice: src/redux/newFeatureSlice.js

import { createSlice } from '@reduxjs/toolkit';

const newFeatureSlice = createSlice({
  name: 'newFeature',
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = newFeatureSlice.actions;
export default newFeatureSlice.reducer;

// 2. Add to store: src/redux/store.js
import newFeatureSlice from './newFeatureSlice';

const store = configureStore({
  reducer: {
    // ... existing
    newFeature: newFeatureSlice,
  },
});
```

### 4. File Locations Cheat Sheet

**Need to find...**
- **API calls**: `src/api/apiService.js`
- **Auth logic**: `src/api/authService.js`
- **Redux store**: `src/redux/store.js`
- **Routes**: `src/routes.tsx` or `src/App.tsx`
- **Environment variables**: `.env` (root)
- **Tailwind config**: `tailwind.config.js`
- **TypeScript config**: `tsconfig.json`
- **Vite config**: `vite.config.ts`
- **Player components**: `src/components/PlayerViewCards/`
- **Squad builder**: `src/components/squadBuilder/`
- **SBC components**: `src/components/sbc/`
- **Utility functions**: `src/components/utils/utils.js`

### 5. Important Environment Variables

```bash
# Required
VITE_API_URL=http://localhost:8000/

# Optional (for full functionality)
VITE_GOOGLE_OAUTH_CLIENT_ID=your-client-id
VITE_PAYPAL_CLIENT_ID=your-paypal-id
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
VITE_CDN_BASE_URL=https://cdn.futcheck.com/assets/img/fc26
```

Access in code: `import.meta.env.VITE_API_URL`

### 6. Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Package Management
npm install --legacy-peer-deps  # Install dependencies
npm install <package> --legacy-peer-deps  # Add new package
```

### 7. Debugging Tips

**Check these when something breaks:**

1. **API not working?**
   - Check if backend is running
   - Verify `VITE_API_URL` in `.env`
   - Check browser console for CORS errors
   - Check Network tab for failed requests

2. **Component not rendering?**
   - Check for TypeScript/JavaScript errors in console
   - Verify component is exported/imported correctly
   - Check if data is actually loaded (not undefined)

3. **Styles not applying?**
   - Check Tailwind class names are correct
   - Verify no conflicting inline styles
   - Check if parent has conflicting flex/grid layout

4. **State not updating?**
   - Check if you're mutating state directly (use spread operator)
   - Verify Redux actions are dispatched
   - Check useEffect dependencies

### 8. Testing Changes

```bash
# 1. Make your changes

# 2. Check for errors
npm run lint

# 3. Test in browser
npm run dev
# Open http://localhost:5173/ and test functionality

# 4. Build to ensure no production errors
npm run build
```

### 9. Before Submitting Changes

- [ ] Code follows the style guide in `DEVELOPMENT_GUIDE.md`
- [ ] No console.log statements
- [ ] No TypeScript/ESLint errors
- [ ] Component renders correctly
- [ ] API calls work as expected
- [ ] Responsive design checked
- [ ] No broken functionality

### 10. Getting Help

**Documentation:**
- Project docs in `.ai/` directory
- Backend API docs in `futcheck_backend/README.md`

**Code Examples:**
- Look at existing components for patterns
- Check `src/components/common/` for reusable components
- See `src/api/apiService.js` for API call examples

### 11. Project Context

**What is FutCheck?**
A web app for EA FC 25 (FIFA) Ultimate Team that helps players:
- Search and compare players
- Build optimized squads
- Track market prices
- Find SBC solutions
- Manage their club

**Tech Stack:**
- React 19 + TypeScript
- Vite (build tool)
- Redux Toolkit (state)
- React Query (data fetching)
- Tailwind CSS (styling)
- React Router v7 (routing)

**Backend:**
- Django REST API (separate repository)
- PostgreSQL database
- Redis cache

### 12. Common Gotchas

1. **Use `import.meta.env` NOT `process.env`** - This is Vite, not CRA
2. **Use `--legacy-peer-deps`** - React 19 has peer dep conflicts
3. **Env vars must start with `VITE_`** - Or they won't be exposed
4. **Routes use new Router v7 syntax** - Check `routes.tsx` for examples
5. **Images from CDN** - Player images come from external CDN
6. **Backend must be running** - For API calls to work

### 13. Quick Component Template

```jsx
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../api/apiService';

/**
 * Component description
 */
function MyComponent({ prop1, prop2 }) {
  // Hooks
  const [localState, setLocalState] = useState(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['queryKey'],
    queryFn: apiService.fetchData,
  });
  
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Handle event
  };
  
  // Loading state
  if (isLoading) return <div>Loading...</div>;
  
  // Error state
  if (error) return <div>Error: {error.message}</div>;
  
  // Render
  return (
    <div className="flex items-center gap-4 p-4">
      {/* Content */}
    </div>
  );
}

export default MyComponent;
```

### 14. Need to Debug?

```javascript
// Use React DevTools
// Install: https://react.dev/learn/react-developer-tools

// Redux DevTools
// Install: https://github.com/reduxjs/redux-devtools

// React Query DevTools (already included)
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Add to App.tsx
<ReactQueryDevtools initialIsOpen={false} />
```

---

## Quick Links

- **Main App**: `src/App.tsx`
- **Routes**: `src/routes.tsx`
- **API Service**: `src/api/apiService.js`
- **Redux Store**: `src/redux/store.js`
- **Env Variables**: `.env`
- **Package Info**: `package.json`

**Happy Coding! 🚀**
