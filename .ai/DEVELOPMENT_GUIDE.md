# Development Guide & Best Practices

## Coding Standards

### JavaScript/TypeScript Style

#### File Naming
- **Components**: PascalCase - `PlayerCard.jsx`, `SquadBuilder.tsx`
- **Utilities**: camelCase - `utils.js`, `apiService.js`
- **Constants**: UPPER_SNAKE_CASE or camelCase - `constants.js`

#### Component Structure
```jsx
// 1. Imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayers } from '../api/apiService';

// 2. Types/Interfaces (if TypeScript)
interface PlayerCardProps {
  player: Player;
  onClick?: (player: Player) => void;
}

// 3. Component
function PlayerCard({ player, onClick }: PlayerCardProps) {
  // 3a. Hooks (in order: useState, useEffect, useSelector, useDispatch, custom hooks)
  const [isHovered, setIsHovered] = useState(false);
  const theme = useSelector(state => state.app.theme);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Side effects
  }, []);
  
  // 3b. Event handlers
  const handleClick = () => {
    onClick?.(player);
  };
  
  // 3c. Render
  return (
    <div 
      className="player-card" 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* JSX */}
    </div>
  );
}

// 4. Export
export default PlayerCard;
```

#### Hooks Order
1. `useState`
2. `useReducer`
3. `useEffect`
4. `useContext`
5. `useSelector`
6. `useDispatch`
7. Custom hooks
8. `useCallback`
9. `useMemo`
10. `useRef`

### CSS/Styling

#### Tailwind CSS Best Practices

**DO:**
```jsx
// Use Tailwind utility classes
<div className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
  <h3 className="text-xl font-bold text-white">Title</h3>
</div>
```

**DON'T:**
```jsx
// Avoid inline styles when Tailwind can do it
<div style={{ display: 'flex', padding: '16px' }}>
```

#### Responsive Design
```jsx
// Mobile-first approach
<div className="
  text-sm        {/* mobile */}
  md:text-base   {/* tablet */}
  lg:text-lg     {/* desktop */}
">
```

#### Class Organization
```jsx
// Group related classes
<div className="
  flex items-center justify-between    {/* layout */}
  p-4 gap-4                            {/* spacing */}
  bg-gray-900 rounded-lg               {/* background */}
  hover:bg-gray-800 transition-colors  {/* interaction */}
">
```

### State Management

#### When to Use Redux vs Local State

**Use Redux when:**
- State is needed by multiple components
- State needs to persist across route changes
- State is complex and has many updaters

**Use Local State when:**
- State is only used by one component
- UI state (modals, toggles)
- Form inputs (before submission)

**Use React Query when:**
- Fetching server data
- Need automatic caching
- Need background refetching

#### Redux Slice Pattern

```javascript
// playerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    setPlayer: (state, action) => {
      state.current = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPlayer, setLoading } = playerSlice.actions;
export default playerSlice.reducer;
```

Usage:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { setPlayer } from '../redux/playerSlice';

function Component() {
  const dispatch = useDispatch();
  const player = useSelector(state => state.player.current);
  
  const handlePlayerClick = (player) => {
    dispatch(setPlayer(player));
  };
}
```

### Data Fetching

#### React Query Pattern

```javascript
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchPlayers, saveSquad } from '../api/apiService';

// Query (GET)
function PlayerList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['players', filters],
    queryFn: () => fetchPlayers(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return <div>{data.map(player => ...)}</div>;
}

// Mutation (POST/PUT/DELETE)
function SaveSquad() {
  const mutation = useMutation({
    mutationFn: saveSquad,
    onSuccess: () => {
      toast.success('Squad saved!');
      queryClient.invalidateQueries(['squads']);
    },
    onError: (error) => {
      toast.error('Failed to save squad');
    },
  });
  
  const handleSave = () => {
    mutation.mutate(squadData);
  };
  
  return (
    <button onClick={handleSave} disabled={mutation.isPending}>
      {mutation.isPending ? 'Saving...' : 'Save Squad'}
    </button>
  );
}
```

### Performance Optimization

#### React.memo
```javascript
// Only re-render when props change
const PlayerCard = React.memo(({ player, onClick }) => {
  return <div onClick={() => onClick(player)}>{player.name}</div>;
});
```

#### useMemo
```javascript
// Expensive calculations
const sortedPlayers = useMemo(() => {
  return players.sort((a, b) => b.rating - a.rating);
}, [players]);
```

#### useCallback
```javascript
// Stable function references
const handleClick = useCallback((player) => {
  dispatch(setPlayer(player));
}, [dispatch]);

// Pass to child components
<PlayerCard onClick={handleClick} />
```

#### Code Splitting
```javascript
// Lazy load heavy components
const SquadBuilder = React.lazy(() => import('./components/squadBuilder'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SquadBuilder />
    </Suspense>
  );
}
```

### Error Handling

#### API Errors
```javascript
async function fetchData() {
  try {
    const data = await apiService.fetchPlayers(query);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      toast.error('Player not found');
    } else if (error.response?.status === 500) {
      toast.error('Server error. Please try again.');
    } else {
      toast.error('Something went wrong');
    }
    console.error('API Error:', error);
  }
}
```

#### Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
```

### TypeScript Best Practices

#### Type Definitions
```typescript
// Define interfaces for data structures
interface Player {
  id: number;
  name: string;
  rating: number;
  position: string;
  nation: string;
  league: string;
  club: string;
  price?: number;
}

// Use for component props
interface PlayerCardProps {
  player: Player;
  onClick?: (player: Player) => void;
  showPrice?: boolean;
}

// Use generics for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}
```

### Testing

#### Component Tests (Jest + React Testing Library)
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerCard from './PlayerCard';

describe('PlayerCard', () => {
  const mockPlayer = {
    id: 1,
    name: 'Messi',
    rating: 91,
  };
  
  it('renders player name', () => {
    render(<PlayerCard player={mockPlayer} />);
    expect(screen.getByText('Messi')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<PlayerCard player={mockPlayer} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Messi'));
    expect(handleClick).toHaveBeenCalledWith(mockPlayer);
  });
});
```

### Git Workflow

#### Commit Messages
```bash
# Format: type(scope): message

feat(squad-builder): add drag-and-drop for player positions
fix(api): handle 404 errors in player search
refactor(components): extract PlayerCard into separate file
docs(readme): update installation instructions
style(header): fix responsive layout on mobile
```

#### Branch Naming
```bash
feature/squad-builder-chemistry
bugfix/player-search-crash
refactor/api-service-cleanup
hotfix/login-error
```

### Code Review Checklist

Before submitting PR:
- [ ] Code follows style guide
- [ ] No console.log statements (use proper logging)
- [ ] No commented-out code
- [ ] Proper error handling
- [ ] Loading states for async operations
- [ ] Responsive design tested
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Components are properly memoized if needed
- [ ] API calls use React Query when appropriate

### Common Patterns

#### Conditional Rendering
```jsx
// Use short-circuit for simple conditionals
{isLoading && <Loading />}

// Use ternary for if-else
{isLoading ? <Loading /> : <Content />}

// Use early returns for complex logic
if (isLoading) return <Loading />;
if (error) return <Error />;
return <Content />;
```

#### List Rendering
```jsx
// Always use key prop
{players.map(player => (
  <PlayerCard key={player.id} player={player} />
))}

// For complex lists, extract to separate component
{players.map(player => (
  <PlayerListItem key={player.id} player={player} />
))}
```

#### Form Handling
```jsx
function SearchForm() {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search players..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

#### Debouncing Search
```javascript
import { useDebounce } from '@uidotdev/usehooks';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      fetchPlayers(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

### Environment Variables

```bash
# Access with import.meta.env (NOT process.env)
const apiUrl = import.meta.env.VITE_API_URL;
const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

# Check if defined
if (!import.meta.env.VITE_API_URL) {
  throw new Error('VITE_API_URL is not defined');
}
```

### Accessibility

```jsx
// Use semantic HTML
<button onClick={handleClick}>Click me</button> // Good
<div onClick={handleClick}>Click me</div>      // Bad

// Add ARIA labels
<button aria-label="Close modal" onClick={onClose}>
  <XIcon />
</button>

// Keyboard navigation
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyPress={(e) => e.key === 'Enter' && handleClick()}
>
```

### Documentation

```javascript
/**
 * Fetches players from the API based on search criteria
 * @param {string} value - Search term or rating
 * @param {string} searchMode - 'name' or 'rating'
 * @returns {Promise<Player[]>} Array of player objects
 */
export const fetchPlayers = async (value, searchMode) => {
  // Implementation
};
```

## Common Pitfalls to Avoid

1. **Don't mutate state directly**
   ```javascript
   // ❌ Bad
   player.rating = 90;
   
   // ✅ Good
   setPlayer({ ...player, rating: 90 });
   ```

2. **Don't forget dependencies in useEffect**
   ```javascript
   // ❌ Bad - missing dependency
   useEffect(() => {
     fetchPlayer(playerId);
   }, []);
   
   // ✅ Good
   useEffect(() => {
     fetchPlayer(playerId);
   }, [playerId]);
   ```

3. **Don't use index as key**
   ```javascript
   // ❌ Bad
   {players.map((player, index) => (
     <PlayerCard key={index} player={player} />
   ))}
   
   // ✅ Good
   {players.map(player => (
     <PlayerCard key={player.id} player={player} />
   ))}
   ```

4. **Don't make API calls in render**
   ```javascript
   // ❌ Bad
   function Component() {
     const data = fetchPlayers(); // This runs every render!
     return <div>{data}</div>;
   }
   
   // ✅ Good
   function Component() {
     const { data } = useQuery(['players'], fetchPlayers);
     return <div>{data}</div>;
   }
   ```
