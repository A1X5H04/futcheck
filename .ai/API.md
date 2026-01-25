# API Reference

## Backend API Integration

The FutCheck frontend communicates with a Django REST API backend. All API calls are centralized in `src/api/apiService.js`.

## Base Configuration

**File**: `src/api/axiosclient.js`

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., http://localhost:8000/
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
```

## API Service Functions

### Player Endpoints

#### `fetchPlayers(value, searchMode)`
Search for players by name or rating.

```javascript
// Search by name
const players = await fetchPlayers('Messi', 'name');

// Search by rating
const players = await fetchPlayers('90', 'rating');
```

**Backend**: `GET /search/?name={value}` or `GET /search/?rating={value}`

**Returns**: Array of player objects

---

#### `fetchPrice(id, futwiz_id)`
Get real-time price data for a player.

```javascript
const priceData = await fetchPrice(238794, 12345);
```

**Backend**: `GET /price/?id={id}&fid={futwiz_id}`

**Returns**: 
```json
{
  "futbin": 125000,
  "futwiz": 120000,
  "futgg": 122000,
  "average": 122333
}
```

---

#### `fetchVersions(base_id, id)`
Get all versions/cards of a player.

```javascript
const versions = await fetchVersions(158023, 238794);
```

**Backend**: `GET /versions/?id={base_id}&eId={id}`

**Returns**: Array of player card versions (e.g., gold, TOTW, special cards)

---

#### `fetchLatestPlayers()`
Get recently added players.

```javascript
const latestPlayers = await fetchLatestPlayers();
```

**Backend**: `GET /get_latest/`

**Returns**: Array of latest player cards

---

#### `fetchTopRatedPlayers()`
Get top rated players with trends.

```javascript
const topPlayers = await fetchTopRatedPlayers();
```

**Backend**: `GET /top_rated/`

**Returns**: Array of highest rated players

---

#### `fetchTopEvolvedPlayers()`
Get top evolved players.

```javascript
const evolvedPlayers = await fetchTopEvolvedPlayers();
```

**Backend**: `GET /get_top_evolved_players/`

---

#### `fetchAllPlayers(filters)`
Browse all players with filters.

```javascript
const players = await fetchAllPlayers({
  position: 'ST',
  min_rating: 85,
  max_price: 50000,
  league: 13, // Premier League
  nation: 54, // England
  page: 1,
  page_size: 20
});
```

**Backend**: `GET /players/` with query parameters

**Filters**:
- `position` - Player position (ST, CM, CB, etc.)
- `min_rating` / `max_rating` - Rating range
- `min_price` / `max_price` - Price range
- `league` - League ID
- `nation` - Nation ID
- `club` - Club ID
- `rarity` - Card rarity
- `exclude_extinct` - Exclude extinct players
- `page` - Page number
- `page_size` - Results per page

---

### Market Endpoints

#### `fetchPlayerPriceHistory(player_id)`
Get historical price data for charts.

```javascript
const history = await fetchPlayerPriceHistory(238794);
```

**Backend**: `GET /get_player_price_history/?player_id={id}`

**Returns**: 
```json
[
  { "date": "2024-01-01", "price": 125000 },
  { "date": "2024-01-02", "price": 122000 },
  ...
]
```

---

#### `fetchMarketTrends()`
Get market trend analysis.

```javascript
const trends = await fetchMarketTrends();
```

**Backend**: `GET /market_trends/`

---

#### `fetchTrendingPlayers()`
Get players with significant price changes.

```javascript
const trending = await fetchTrendingPlayers();
```

**Backend**: `GET /trending_players/`

---

#### `fetchInvestmentPlayers()`
Get investment recommendations.

```javascript
const investments = await fetchInvestmentPlayers();
```

**Backend**: `GET /investment_players/`

---

### SBC Endpoints

#### `fetchSBCData()`
Get list of active SBCs.

```javascript
const sbcs = await fetchSBCData();
```

**Backend**: `GET /fetch_sbc_data/`

**Returns**: Array of SBC objects

---

#### `fetchSBCDetails(sbcId)`
Get detailed information for a specific SBC.

```javascript
const sbcDetails = await fetchSBCDetails('marquee-matchups');
```

**Backend**: `GET /fetch_sbc_details/?sbc_id={sbcId}`

---

#### `fetchChallengeDetails(challengeId)`
Get details for a specific challenge within an SBC.

```javascript
const challenge = await fetchChallengeDetails(12345);
```

**Backend**: `GET /fetch_challenge_details/?challenge_id={challengeId}`

---

#### `fetchChallengeSolutions(challengeId)`
Get community solutions for a challenge.

```javascript
const solutions = await fetchChallengeSolutions(12345);
```

**Backend**: `GET /fetch_challenge_solutions/?challenge_id={challengeId}`

---

### Evolution Endpoints

#### `fetchEvoData()`
Get list of available evolutions.

```javascript
const evolutions = await fetchEvoData();
```

**Backend**: `GET /fetch_evo_data/`

---

#### `fetchEvoDetail(evolutionId)`
Get detailed evolution information.

```javascript
const evoDetail = await fetchEvoDetail(123);
```

**Backend**: `GET /fetch_evo_detail/?evolution_id={evolutionId}`

---

#### `fetchEvolvedPlayers()`
Get players with evolution chains.

```javascript
const evolvedPlayers = await fetchEvolvedPlayers();
```

**Backend**: `GET /get_evolved_players/`

---

#### `fetchEvoChains(playerId)`
Get evolution progression for a player.

```javascript
const chains = await fetchEvoChains(238794);
```

**Backend**: `GET /get_evo_chains/?player_id={playerId}`

---

### Squad Building Endpoints

#### `getBestSquad(requirements)`
Get AI-optimized squad based on requirements.

```javascript
const squad = await getBestSquad({
  rating: 85,
  chemistry: 30,
  budget: 100000,
  formation: "4-3-3"
});
```

**Backend**: `POST /get_best_squad/`

**Body**:
```json
{
  "rating": 85,
  "chemistry": 30,
  "budget": 100000,
  "formation": "4-3-3",
  "league": null,
  "nation": null
}
```

---

#### `getBestClubSquad(clubPlayers, requirements)`
Get optimized squad using user's club players.

```javascript
const squad = await getBestClubSquad(myClubPlayers, {
  rating: 83,
  chemistry: 25,
  formation: "4-4-2"
});
```

**Backend**: `POST /get_best_club_squad/`

---

#### `getPlayerSuggestions(position, budget, filters)`
Get player suggestions for a specific position.

```javascript
const suggestions = await getPlayerSuggestions('ST', 50000, {
  league: 13,
  min_rating: 85
});
```

**Backend**: `POST /get_player_suggestions/`

---

### Reference Data Endpoints

#### `fetchNations()`
Get all nations/countries.

```javascript
const nations = await fetchNations();
```

**Backend**: `GET /get_nations/`

---

#### `fetchLeagues()`
Get all leagues.

```javascript
const leagues = await fetchLeagues();
```

**Backend**: `GET /get_leagues/`

---

#### `fetchTeams()`
Get all teams/clubs.

```javascript
const teams = await fetchTeams();
```

**Backend**: `GET /get_teams/`

---

#### `fetchAllRarities()`
Get card rarities and promos.

```javascript
const rarities = await fetchAllRarities();
```

**Backend**: `GET /get_promos/`

---

### Authentication Endpoints

**File**: `src/api/authService.js`

#### `login(email, password)`
Email/password authentication.

```javascript
const { access, refresh, user } = await login('user@example.com', 'password');
```

**Backend**: `POST /api/token/`

---

#### `googleLogin(googleToken)`
Google OAuth authentication.

```javascript
const { access, refresh, user } = await googleLogin(googleAuthToken);
```

**Backend**: `POST /api/token/google/`

---

#### `refreshToken(refreshToken)`
Refresh access token.

```javascript
const { access } = await refreshToken(storedRefreshToken);
```

**Backend**: `POST /api/token/refresh/`

---

#### `verifyToken(accessToken)`
Verify token and get user info.

```javascript
const userInfo = await verifyToken(accessToken);
```

**Backend**: `GET /api/token/info/`

---

## Error Handling

All API functions should be wrapped in try-catch:

```javascript
try {
  const players = await fetchPlayers(searchTerm);
  // Handle success
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
  toast.error('Failed to fetch players');
}
```

## Using React Query

For better caching and state management, use React Query:

```javascript
import { useQuery } from '@tanstack/react-query';
import { fetchTopRatedPlayers } from '../api/apiService';

function TopPlayers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topPlayers'],
    queryFn: fetchTopRatedPlayers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return <PlayerList players={data} />;
}
```

## Common API Response Format

Most endpoints return data in this format:

```json
{
  "data": [...],
  "count": 100,
  "next": "/api/endpoint/?page=2",
  "previous": null
}
```

Access the actual data with `response.data.data`.

## Authentication Flow

1. User logs in → Get access + refresh tokens
2. Store tokens in localStorage
3. Include access token in all API requests (via interceptor)
4. On 401 error → Refresh token
5. Retry failed request with new token

## Rate Limiting

Backend may implement rate limiting. Handle 429 responses:

```javascript
if (error.response.status === 429) {
  toast.error('Too many requests. Please wait a moment.');
}
```

## Best Practices

1. **Centralize API calls** - Keep all API functions in `apiService.js`
2. **Use React Query** - For automatic caching and refetching
3. **Error handling** - Always catch errors and show user feedback
4. **Loading states** - Show loading UI during API calls
5. **Debouncing** - Debounce search inputs to reduce API calls
6. **Caching** - Cache reference data (nations, leagues, formations)
7. **Analytics** - Track important API calls with Google Analytics
