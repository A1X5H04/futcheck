# Common Tasks & Examples

## Task Templates

### 1. Add a New Feature Component

**Example: Add a "Player Comparison" Feature**

```bash
# Step 1: Create component file
# src/components/PlayerComparison.jsx
```

```jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayers } from '../api/apiService';
import PlayerCard from './common/PlayerCard';

function PlayerComparison() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Compare Players</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Player 1 */}
        <div>
          <h2 className="text-xl mb-4">Player 1</h2>
          <PlayerSelector onSelect={setPlayer1} />
          {player1 && <PlayerStats player={player1} />}
        </div>
        
        {/* Player 2 */}
        <div>
          <h2 className="text-xl mb-4">Player 2</h2>
          <PlayerSelector onSelect={setPlayer2} />
          {player2 && <PlayerStats player={player2} />}
        </div>
      </div>
      
      {player1 && player2 && (
        <ComparisonChart player1={player1} player2={player2} />
      )}
    </div>
  );
}

export default PlayerComparison;
```

```bash
# Step 2: Create wrapper component
# src/components/PlayerComparisonWrapper.jsx
```

```jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import PlayerComparison from './PlayerComparison';

function PlayerComparisonWrapper() {
  return (
    <>
      <Helmet>
        <title>Player Comparison - FutCheck</title>
        <meta name="description" content="Compare EA FC 25 players side by side" />
      </Helmet>
      <PlayerComparison />
    </>
  );
}

export default PlayerComparisonWrapper;
```

```bash
# Step 3: Add route in src/routes.tsx
```

```typescript
import PlayerComparisonWrapper from './components/PlayerComparisonWrapper';

// Add to routes array
{
  path: "compare",
  Component: PlayerComparisonWrapper,
}
```

---

### 2. Add a New API Endpoint

**Example: Add endpoint to fetch player stats**

```bash
# src/api/apiService.js
```

```javascript
/**
 * Fetch detailed player statistics
 * @param {number} playerId - Player ID
 * @returns {Promise<Object>} Player statistics
 */
export const fetchPlayerStats = async (playerId) => {
  if (!playerId) {
    throw new Error('Player ID is required');
  }
  
  try {
    const response = await instance.get(`/player_stats/?id=${playerId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};
```

**Usage in component:**

```jsx
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats } from '../api/apiService';

function PlayerStats({ playerId }) {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['playerStats', playerId],
    queryFn: () => fetchPlayerStats(playerId),
    enabled: !!playerId, // Only run if playerId exists
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
  
  if (isLoading) return <div>Loading stats...</div>;
  if (error) return <div>Failed to load stats</div>;
  
  return (
    <div className="stats-container">
      <div>PAC: {stats.pace}</div>
      <div>SHO: {stats.shooting}</div>
      <div>PAS: {stats.passing}</div>
      {/* ... more stats */}
    </div>
  );
}
```

---

### 3. Add Redux State Management

**Example: Add favorites feature**

```bash
# Step 1: Create slice - src/redux/favoritesSlice.js
```

```javascript
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    players: [],
    squads: [],
  },
  reducers: {
    addFavoritePlayer: (state, action) => {
      const player = action.payload;
      if (!state.players.find(p => p.id === player.id)) {
        state.players.push(player);
      }
    },
    removeFavoritePlayer: (state, action) => {
      const playerId = action.payload;
      state.players = state.players.filter(p => p.id !== playerId);
    },
    addFavoriteSquad: (state, action) => {
      state.squads.push(action.payload);
    },
    clearFavorites: (state) => {
      state.players = [];
      state.squads = [];
    },
  },
});

export const {
  addFavoritePlayer,
  removeFavoritePlayer,
  addFavoriteSquad,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
```

```bash
# Step 2: Add to store - src/redux/store.js
```

```javascript
import favoritesSlice from './favoritesSlice';

const store = configureStore({
  reducer: {
    player: playerSlice,
    app: appSlice,
    favorites: favoritesSlice, // Add this
    // ... other reducers
  },
});
```

```bash
# Step 3: Use in component
```

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { addFavoritePlayer, removeFavoritePlayer } from '../redux/favoritesSlice';

function PlayerCard({ player }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.players);
  const isFavorite = favorites.some(p => p.id === player.id);
  
  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoritePlayer(player.id));
    } else {
      dispatch(addFavoritePlayer(player));
    }
  };
  
  return (
    <div className="player-card">
      <button onClick={toggleFavorite}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
      {/* Rest of card */}
    </div>
  );
}
```

---

### 4. Add a Form with Validation

**Example: Squad Builder Settings Form**

```jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function SquadSettingsForm({ onSave }) {
  const [formData, setFormData] = useState({
    squadName: '',
    formation: '4-3-3',
    targetRating: 85,
    maxBudget: 100000,
  });
  
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.squadName.trim()) {
      newErrors.squadName = 'Squad name is required';
    }
    
    if (formData.targetRating < 0 || formData.targetRating > 99) {
      newErrors.targetRating = 'Rating must be between 0 and 99';
    }
    
    if (formData.maxBudget < 0) {
      newErrors.maxBudget = 'Budget cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix form errors');
      return;
    }
    
    onSave(formData);
    toast.success('Settings saved!');
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Squad Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Squad Name
        </label>
        <input
          type="text"
          value={formData.squadName}
          onChange={(e) => handleChange('squadName', e.target.value)}
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter squad name"
        />
        {errors.squadName && (
          <p className="text-red-500 text-sm mt-1">{errors.squadName}</p>
        )}
      </div>
      
      {/* Formation */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Formation
        </label>
        <select
          value={formData.formation}
          onChange={(e) => handleChange('formation', e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="4-3-3">4-3-3</option>
          <option value="4-4-2">4-4-2</option>
          <option value="4-2-3-1">4-2-3-1</option>
          {/* More formations */}
        </select>
      </div>
      
      {/* Target Rating */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Target Rating
        </label>
        <input
          type="number"
          value={formData.targetRating}
          onChange={(e) => handleChange('targetRating', parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded"
          min="0"
          max="99"
        />
        {errors.targetRating && (
          <p className="text-red-500 text-sm mt-1">{errors.targetRating}</p>
        )}
      </div>
      
      {/* Max Budget */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Max Budget
        </label>
        <input
          type="number"
          value={formData.maxBudget}
          onChange={(e) => handleChange('maxBudget', parseInt(e.target.value))}
          className="w-full px-4 py-2 border rounded"
          min="0"
        />
        {errors.maxBudget && (
          <p className="text-red-500 text-sm mt-1">{errors.maxBudget}</p>
        )}
      </div>
      
      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </form>
  );
}

export default SquadSettingsForm;
```

---

### 5. Add Drag and Drop

**Example: Draggable Player Cards**

```bash
# Install react-dnd (already installed in this project)
npm install react-dnd react-dnd-html5-backend --legacy-peer-deps
```

```jsx
import React from 'react';
import { useDrag } from 'react-dnd';

// Draggable component
function DraggablePlayerCard({ player }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PLAYER',
    item: { player },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  
  return (
    <div
      ref={drag}
      className={`player-card ${isDragging ? 'opacity-50' : ''}`}
      style={{ cursor: 'move' }}
    >
      <img src={player.image} alt={player.name} />
      <p>{player.name}</p>
      <p>{player.rating}</p>
    </div>
  );
}

// Drop target component
import { useDrop } from 'react-dnd';

function SquadSlot({ position, onPlayerDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PLAYER',
    drop: (item) => onPlayerDrop(position, item.player),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  
  return (
    <div
      ref={drop}
      className={`squad-slot ${isOver ? 'bg-green-200' : 'bg-gray-100'}`}
    >
      <p>{position}</p>
      {/* Show dropped player if any */}
    </div>
  );
}
```

---

### 6. Add Data Visualization

**Example: Price History Chart**

```jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerPriceHistory } from '../api/apiService';

function PriceHistoryChart({ playerId }) {
  const { data, isLoading } = useQuery({
    queryKey: ['priceHistory', playerId],
    queryFn: () => fetchPlayerPriceHistory(playerId),
  });
  
  if (isLoading) return <div>Loading chart...</div>;
  
  // Transform data for Recharts
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    price: item.price,
  }));
  
  return (
    <div className="w-full h-96">
      <h3 className="text-xl font-bold mb-4">Price History</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value) => `${value.toLocaleString()} coins`}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceHistoryChart;
```

---

### 7. Add Modal/Dialog

**Example: Player Details Modal**

```jsx
import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

function PlayerDetailsModal({ player, isOpen, onClose }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold mb-4">
                  {player.name}
                </Dialog.Title>
                
                <div className="mt-4">
                  <img src={player.image} alt={player.name} className="w-32 h-32 mx-auto" />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>Rating: {player.rating}</div>
                    <div>Position: {player.position}</div>
                    <div>Nation: {player.nation}</div>
                    <div>League: {player.league}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// Usage
function PlayerList() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };
  
  return (
    <>
      {players.map(player => (
        <div key={player.id} onClick={() => handlePlayerClick(player)}>
          {player.name}
        </div>
      ))}
      
      {selectedPlayer && (
        <PlayerDetailsModal
          player={selectedPlayer}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
```

---

## More Examples in Codebase

Look at existing code for more patterns:
- **Search with debounce**: `src/components/common/SearchBar.jsx`
- **Filters**: `src/components/filterPopups/`
- **Drag & Drop**: `src/components/squadBuilder/`
- **Charts**: `src/components/market/`
- **Forms**: `src/components/squadWizard/`
- **Modals**: `src/components/dialogs/`
