# Component Directory Reference

## Component Organization

Components are organized by feature/domain. This document provides a quick reference for understanding what each component directory contains.

## Directory Structure

### `/src/components/common/`
**Shared components used throughout the application**

- **Header.jsx** - Top navigation bar with search, auth, and navigation links
- **Footer.jsx** - Footer with links and copyright info
- **SearchBar.jsx** - Player search component
- **PlayerCard.jsx** - Reusable player card display
- **Button.jsx** - Standard button component
- **Modal.jsx** - Modal/dialog wrapper
- **Loading.jsx** - Loading spinners/skeletons
- **Pagination.jsx** - Pagination controls

**When to use**: For any UI elements that are shared across multiple pages/features.

---

### `/src/components/club/`
**User's personal club management**

Features:
- View user's owned players
- Add/remove players from club
- Squad management from club players
- Filter and search within club

Key components:
- **ClubWrapper.jsx** - Main club page container
- **ClubPlayerList.jsx** - List of club players
- **AddPlayerDialog.jsx** - Add player to club modal

**Related API**: `/api/user/club/` endpoints

---

### `/src/components/evos/` (Evolutions)
**Player evolution system**

Features:
- Browse available evolutions
- View evolution requirements
- Track player evolution progress
- Evolution chains

Key components:
- **EvolutionsWrapper.jsx** - Evolution list page
- **EvolutionDetailWrapper.jsx** - Single evolution details
- **EvolutionCard.jsx** - Evolution display card
- **EvolutionRequirements.jsx** - Evolution requirements list

**Related API**: `/fetch_evo_data/`, `/fetch_evo_detail/`, `/get_evolved_players/`

---

### `/src/components/games/`
**Mini-games and interactive features**

Features:
- StatClash - Player stat comparison game
- Other future mini-games

Key components:
- **GamesWrapper.jsx** - Games listing page
- **StatClash.jsx** - StatClash game component
- **GameCard.jsx** - Game preview card

---

### `/src/components/market/`
**Market analysis and price tracking**

Features:
- Price history charts
- Market trends
- Investment recommendations
- Player price comparisons

Key components:
- **MarketWrapper.jsx** - Market analysis page
- **PriceChart.jsx** - Price history chart (Recharts)
- **TrendingPlayers.jsx** - Players with price changes
- **InvestmentPlayers.jsx** - Investment recommendations

**Related API**: `/price/`, `/get_player_price_history/`, `/market_trends/`

---

### `/src/components/sbc/`
**Squad Building Challenges**

Features:
- Browse active SBCs
- View SBC requirements
- Community solutions
- Cost calculation

Key components:
- **SbcWrapper.jsx** - SBC list page
- **SbcViewWrapper.jsx** - Single SBC details
- **SbcCard.jsx** - SBC display card
- **ChallengeSolution.jsx** - SBC solution viewer
- **ChallengeRequirements.jsx** - Requirements display

**Related API**: `/fetch_sbc_data/`, `/fetch_sbc_details/`, `/fetch_challenge_solutions/`

---

### `/src/components/squadBuilder/`
**Interactive squad building tool**

Features:
- Drag-and-drop squad building
- Formation selection (35+ formations)
- Chemistry calculation
- Player position management
- Squad saving/loading

Key components:
- **SquadBuilderWrapper.jsx** - Squad builder page container
- **Formation.jsx** - Formation display and player slots
- **PlayerSlot.jsx** - Individual player position slot (drag target)
- **DraggablePlayer.jsx** - Draggable player card
- **ChemistryDisplay.jsx** - Chemistry indicators
- **FormationSelector.jsx** - Formation picker
- **SaveSquadDialog.jsx** - Save squad modal

**Related Libraries**: 
- React DnD for drag-and-drop
- WASM for chemistry calculations

**Related API**: Squad saving endpoints

---

### `/src/components/squadWizard/`
**AI-powered squad recommendations**

Features:
- Input squad requirements (rating, chemistry, budget, formation)
- Get optimized squad suggestions
- Multiple squad options
- Premium feature

Key components:
- **SquadWizardWrapper.jsx** - Squad wizard page
- **WizardForm.jsx** - Input form for requirements
- **SquadSuggestions.jsx** - Display suggested squads
- **PlayerSuggestions.jsx** - Individual position suggestions

**Related API**: `/get_best_squad/`, `/get_best_club_squad/`, `/get_player_suggestions/`

**State**: Redux `squadWizardSlice`

---

### `/src/components/PlayerDashboard/`
**Player detail page**

Features:
- Complete player statistics
- Player versions (cards)
- Price information and history
- Similar players
- Evolution data

Key components:
- **PlayerDashboardWrapper.jsx** - Player page container
- **PlayerStats.jsx** - Player attributes and stats
- **PlayerPriceSection.jsx** - Price display and chart
- **PlayerVersions.jsx** - All versions of the player
- **SimilarPlayers.jsx** - Related player suggestions

**Related API**: `/get_player/`, `/price/`, `/versions/`

---

### `/src/components/PlayerViewCards/`
**Player card visual components**

Features:
- Different card designs
- Rarity styling
- Chemistry styles
- Card animations

Key components:
- **PlayerCard.jsx** - Main player card
- **MiniCard.jsx** - Compact player card
- **CardFront.jsx** - Front of card
- **CardBack.jsx** - Back of card (stats)

---

### `/src/components/filterPopups/`
**Filter UI components**

Features:
- Player filtering (rating, position, league, nation, etc.)
- Desktop and mobile versions
- Multi-select filters
- Range sliders

Key components:
- **FilterPopup.jsx** - Desktop filter sidebar
- **MobileFilterPopup.jsx** - Mobile filter modal
- **RatingFilter.jsx** - Rating range filter
- **PositionFilter.jsx** - Position selector
- **LeagueFilter.jsx** - League selector
- **NationFilter.jsx** - Nation selector

Subdirectory: `/mobileFilterPopups/` - Mobile-specific versions

---

### `/src/components/dialogs/`
**Modal dialogs and popups**

Key components:
- **PremiumDialog.jsx** - Premium subscription modal
- **LoginDialog.jsx** - Login/signup modal
- **ConfirmDialog.jsx** - Confirmation dialogs
- **ShareDialog.jsx** - Share functionality

---

### `/src/components/utils/`
**Utility functions and constants**

Key files:
- **utils.js** - Helper functions for player data, rarities, colors
- **constants.js** - App-wide constants
- **formations.js** - Formation definitions
- **chemistryCalculator.js** - Chemistry calculation logic

Common utility functions:
- `getBgColor(rarity)` - Get background color for rarity
- `getTextColor(rarity)` - Get text color for rarity
- `buildRarityUrl(player)` - Build player card image URL
- `formatPrice(price)` - Format price display
- `calculateChemistry(squad)` - Calculate squad chemistry

---

### `/src/components/getCombinationComponents/`
**Rating combination calculator**

Features:
- Calculate player combinations for specific ratings
- SBC rating requirements helper

---

### `/src/components/hometabs/`
**Homepage tab components**

Features:
- Latest players tab
- Top rated players tab
- Trending players tab
- Evolutions tab

---

## Wrapper Components Pattern

Components ending in `*Wrapper.jsx` are typically:
1. Route-level components
2. Handle data fetching
3. Connect to Redux
4. Pass data to presentational components

Example:
```jsx
// AllPlayersWrapper.jsx
function AllPlayersWrapper() {
  const dispatch = useDispatch();
  const players = useSelector(state => state.allPlayers.players);
  
  useEffect(() => {
    // Fetch players
    dispatch(fetchAllPlayers());
  }, []);
  
  return <AllPlayersPage players={players} />;
}
```

## Component Communication Patterns

### 1. Parent → Child (Props)
```jsx
<PlayerCard player={playerData} onClick={handleClick} />
```

### 2. Child → Parent (Callbacks)
```jsx
// Parent
<SearchBar onSearch={handleSearch} />

// Child
<input onChange={(e) => props.onSearch(e.target.value)} />
```

### 3. Global State (Redux)
```jsx
// Component A sets state
dispatch(setPlayer(playerData));

// Component B reads state
const player = useSelector(state => state.player.current);
```

### 4. Context (React Context)
Used for theme, auth, etc.

## Common Component Props

### Player Component Props
```typescript
interface PlayerProps {
  player: {
    id: number;
    name: string;
    rating: number;
    position: string;
    nation: string;
    league: string;
    club: string;
    rarity: string;
    // ... more fields
  };
  onClick?: (player: Player) => void;
  showPrice?: boolean;
  size?: 'small' | 'medium' | 'large';
  draggable?: boolean;
}
```

## Finding the Right Component

**I need to...**

- **Show a player card** → `components/PlayerViewCards/PlayerCard.jsx`
- **Build a squad** → `components/squadBuilder/`
- **Show SBC details** → `components/sbc/SbcViewWrapper.jsx`
- **Display prices** → `components/market/` or `components/PlayerDashboard/PlayerPriceSection.jsx`
- **User authentication** → `components/common/Header.jsx` (login button)
- **Filter players** → `components/filterPopups/`
- **Show player stats** → `components/PlayerDashboard/PlayerStats.jsx`
- **Display evolutions** → `components/evos/`
- **Search players** → `components/common/SearchBar.jsx`

## Component File Naming

- **PascalCase** for component files: `PlayerCard.jsx`
- **camelCase** for utility files: `utils.js`, `constants.js`
- **Suffix conventions**:
  - `*Wrapper` - Route/page container
  - `*Dialog` - Modal/popup
  - `*Card` - Card-style display
  - `*List` - List/table
  - `*Form` - Form component
