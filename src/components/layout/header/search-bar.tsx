import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { SearchIcon, LoaderIcon } from 'lucide-react'

import { useDebounce } from '@/hooks/use-debounce'
import { useSearchPlayersQuery } from '@/redux/apis/home.api'
import {
    Combobox,
    ComboboxInput,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxEmpty,
} from '@/components/ui/combobox'
import { slugify, urlBuilder } from '@/lib/helpers'
import type { RootState } from '@/components/player-card'


interface PlayerResult {
    id: number;
    base_id: number;
    c_name: string;
    name: string;
    rating: number;
    leagueid: number;
    position: string[];
    nation: number;
    nation_name: string;
    rarity_name: string;
    rarity: number;
    colors: string[];
}

function SearchBar() {
    const [query, setQuery] = useState('')
    const rarities = useSelector((state: RootState) => state.app.rarities);
    const navigate = useNavigate()
    const debouncedQuery = useDebounce(query, 400)

    const { data: results, isLoading, isFetching } = useSearchPlayersQuery(debouncedQuery, {
        skip: debouncedQuery.length < 2,
    })

    const players = debouncedQuery.length >= 2 ? (results?.data as PlayerResult[] | undefined) || [] : []
    const isSearching = (isLoading || isFetching) && debouncedQuery.length >= 2


    const handleSelect = (value: string | null) => {
        if (!value) return
        navigate(value)
        setQuery('')
    }

    return (
        <Combobox
            value=""
            onValueChange={handleSelect}
            inputValue={query}
            onInputValueChange={setQuery}
        >
            <div className="relative w-lg">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 z-10 pointer-events-none" />
                <ComboboxInput
                    placeholder="Search players..."
                    showTrigger={false}
                    showClear={query.length > 0}
                    className="w-full [&_input]:pl-9 [&_input]:h-9"
                />
                {isSearching && (
                    <LoaderIcon className="absolute right-9 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 animate-spin z-10" />
                )}
            </div>

            <ComboboxContent className="w-full bg-card border-border/50 shadow-xl shadow-black/20">
                <ComboboxList>
                    {players.slice(0, 10).map((player) => {
                        const rarityObject = rarities.find((r) => r.id === player.rarity);

                        const cardUrl = urlBuilder.rarityUrl(rarityObject?.levels || 0, player.rating, player.rarity) || ""

                        return (
                            <ComboboxItem
                                key={player.id}
                                value={`player/${slugify(player.c_name)}-${player.id}`}
                                className="flex items-center gap-3 px-2 py-2.5 cursor-pointer data-highlighted:bg-white/5"
                            >
                                <div className='inline-flex gap-1 bg-muted rounded'>
                                    <div className='inline-flex flex-col gap-0.5'>
                                        <img
                                            src={urlBuilder.dynamic("league", player.leagueid, "dark")}
                                            className="h-6 p-1 rounded"
                                        />
                                        <img
                                            src={urlBuilder.dynamic("nation", player.nation, "dark")}
                                            className="h-5 p-1 "
                                        />
                                    </div>
                                    <div
                                        className="relative w-12 h-12 rounded-md rounded-l-sm overflow-hidden shrink-0 bg-secondary bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url(${cardUrl})`, backgroundSize: "120%", }}
                                    >
                                        <img
                                            src={urlBuilder.player(player.base_id)}
                                            alt={player.c_name}
                                            className="w-full h-full object-cover object-top translate-y-1"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-base text-foreground truncate">
                                            {player.c_name ? player.c_name : player.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground/70 uppercase tracking-wide shrink-0">
                                            {player.position[0]}
                                        </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground/60 truncate block">
                                        {player.rarity_name}
                                    </span>
                                </div>

                                <div
                                    className="shrink-0 w-8 aspect-video rounded-md flex items-center justify-center text-xs font-bold"
                                    style={{
                                        backgroundColor: player.colors?.[0] || '#1a1a2e',
                                        color: player.colors?.[1] || '#fff'
                                    }}
                                >
                                    {player.rating}
                                </div>
                            </ComboboxItem>

                        )
                    })}
                </ComboboxList>

                {players.length === 0 && (
                    <ComboboxEmpty className="py-6 grid place-items-center">
                        {!isSearching && debouncedQuery.length >= 2 && (
                            <div className="inline-flex items-center gap-2">
                                <SearchIcon className="w-4 h-4 opacity-30" />
                                <span>No players found for <span className="font-medium">"{debouncedQuery}"</span></span>
                            </div>
                        )}

                        {!isSearching && debouncedQuery.length < 2 && (
                            <div className="inline-flex items-center gap-2">
                                <SearchIcon className="w-4 h-4 opacity-30" />
                                <span className="text-muted-foreground/60">Type at least 2 characters to search players...</span>
                            </div>
                        )}
                    </ComboboxEmpty>
                )}

                {players.length > 10 && (
                    <div className="px-3 py-2 border-t border-border/20 bg-black/20">
                        <span className="text-[11px] text-muted-foreground/60">
                            Showing 10 of {players.length} results
                        </span>
                    </div>
                )}
            </ComboboxContent>
        </Combobox>
    )
}

export default SearchBar