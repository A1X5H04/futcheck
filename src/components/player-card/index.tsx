import { useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { slugify, urlBuilder, fillHexCode } from "@/lib/helpers";
import { PlayStyleBadge, StatBadge } from "./badge";
import cardPlaceholder from "../../assets/card-placeholder.png"
import type { ColorMapping, PlayerData, RarityData } from "../../types/player";

import { Link } from "react-router";

// Constants
const OUTFIELD_ATTRIBUTE_LABELS = ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"] as const;
const GK_ATTRIBUTE_LABELS = ["DIV", "HAN", "KIC", "REF", "SPD", "POS"] as const;

const CDN_BASE_URL = import.meta.env.VITE_CDN_BASE_URL;
const DEFAULT_COLORS: ColorMapping = {
    attributeValues: "#ffffff",
    background: "#ffffff",
    dividers: "#ffffff",
    footer: "#ffffff",
    header: "#ffffff",
    name: "#ffffff",
    playStyleIcon: "#ffffff",
    playStyleText: "#ffffff",
    useLightCrest: 0,
};



// ============================================================================
// Helper Functions
// ============================================================================
const getColorMapping = (rarityObject: RarityData | undefined, rating: number): ColorMapping => {
    if (
        !rarityObject ||
        !rarityObject.colors ||
        !Array.isArray(rarityObject.colors) ||
        rarityObject.colors.length === 0
    ) {
        return DEFAULT_COLORS;
    }

    const { colors, lg_color_indices, levels } = rarityObject;
    let level_no = levels || 0;

    if (level_no > 0) {
        if (rating >= 75) {
            level_no = 3;
        } else if (rating >= 65) {
            level_no = 2;
        } else {
            level_no = 1;
        }
    }


    let availableColors = colors;

    if (levels > 0) {
        // If there are levels, slice the colors array based on the current level
        // Assuming each level gets 3 colors from a 9-color array
        const colorsPerLevel = Math.floor(colors.length / levels);
        const startIndex = (level_no - 1) * colorsPerLevel;
        const endIndex = Math.min(startIndex + colorsPerLevel, colors.length);
        availableColors = colors.slice(startIndex, endIndex);
    }

    // Create 8-slot array of hex colors using lg_color_indices
    let colorSlots: string[] = [];
    if (
        lg_color_indices &&
        Array.isArray(lg_color_indices) &&
        lg_color_indices.length >= 8
    ) {
        // Map the first 8 indices to actual colors from availableColors
        colorSlots = lg_color_indices.slice(0, 8).map((index) => {
            // lg_color_indices is 1-based, so subtract 1 for 0-based array access
            const colorIndex = index - 1;
            if (colorIndex >= 0 && colorIndex < availableColors.length) {
                return fillHexCode(availableColors[colorIndex]);
            }
            // If index is out of bounds for availableColors, cycle through them
            const cyclicIndex = colorIndex % availableColors.length;
            return fillHexCode(availableColors[cyclicIndex]);
        });
    }

    const at = (index: number): string => colorSlots[index] || "#ffffff";

    return {
        header: at(0),
        name: at(1),
        attributeValues: at(2),
        footer: at(3),
        playStyleIcon: at(4),
        playStyleText: at(5),
        background: at(6),
        dividers: at(7),
        useLightCrest: lg_color_indices[8] ?? 0,
    };
};


const getDisplayName = (playerData: PlayerData): string => {
    const displayName = playerData.name;
    if (playerData.c_name) return playerData.c_name;
    else if (displayName) return displayName;
    return "Unknown";
};


const getCrestTheme = (useLightCrest: number): "light" | "dark" => {
    return useLightCrest === 1 ? "light" : "dark";
};

const handleImageLoad = (e: React.SyntheticEvent<SVGImageElement>) => {
    e.currentTarget.classList.add("loaded");
};

export interface RootState {
    app: {
        rarities: RarityData[];
    };
}

interface PlayerCardProps {
    size?: "xs" | "sm" | "md";
    className?: string;
    playerData?: PlayerData;
}


function PlayerCard({ playerData, className }: PlayerCardProps) {
    const rarities = useSelector((state: RootState) => state.app.rarities);

    if (!playerData) {
        return (
            <div className="relative">
                <img
                    className="w-full h-auto p-5"
                    src={cardPlaceholder}
                    alt="Loading player card..."
                />
            </div>
        );
    }

    const rarityObject = rarities.find((r) => r.id === playerData.rarity);
    const colorMapping = getColorMapping(rarityObject, playerData.rating);

    const displayName = getDisplayName(playerData);
    const isGK = playerData.position[0] === "GK";
    const attributeLabels = isGK ? GK_ATTRIBUTE_LABELS : OUTFIELD_ATTRIBUTE_LABELS;
    const crestTheme = getCrestTheme(colorMapping.useLightCrest);


    const cardUrl = urlBuilder.rarityUrl(rarityObject?.levels || 0, playerData.rating, playerData.rarity);
    const portraitUrl = [urlBuilder.player(playerData.id), urlBuilder.player(playerData.base_id)]
    const nationUrl = urlBuilder.dynamic("nation", playerData.nation, crestTheme);
    const leagueUrl = urlBuilder.dynamic("league", playerData.leagueid, crestTheme);
    const clubUrl = urlBuilder.dynamic("club", playerData.teamid, crestTheme);

    const playstyleUrls = playerData.playstyle_plus.map(
        (id) => `${CDN_BASE_URL}/traits/${id}.png`
    );

    return (
        <Link to={`/player/${slugify(displayName)}-${playerData.id}`}>

            <div className={cn("group/card relative user-select-none cursor-pointer transition-transform duration-300", className)}>
                <img
                    className="absolute inset-0 w-full h-auto z-10 pointer-events-none p-5
                           animate-out fade-out ease-out fill-mode-forwards duration-300 
                           group-all-loaded/card:opacity-0"
                    src={cardPlaceholder}
                    alt=""
                    aria-hidden="true"
                />

                <svg
                    viewBox="0 0 300 450"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-auto"
                >
                    <defs>
                        {/* Took a lot time to debug, apparently we need to add unique id so it does not leak in other player card. */}
                        <filter id={`playstyle-badge-filter-${playerData.id}`}>
                            <feFlood floodColor={colorMapping.playStyleIcon} />
                            <feComposite in2="SourceAlpha" operator="in" />
                        </filter>

                        <symbol id={`stat-badge-shape-${playerData.id}`} viewBox="0 0 200 100">
                            <rect
                                width="90"
                                height="55"
                                rx={10}
                                ry={10}
                                fill={colorMapping.background}
                                stroke={colorMapping.attributeValues}
                                strokeWidth="2"
                            />
                        </symbol>

                        <symbol id={`playstyle-badge-shape-${playerData.id}`} viewBox="0 0 100 100">
                            <polygon
                                points="25,6 75,6 95,35 50,90 5,35"
                                fill={colorMapping.background}
                                stroke={colorMapping.dividers}
                                strokeWidth="2"
                            />
                        </symbol>
                    </defs>

                    {/* Card Background */}
                    <image
                        className="player-card-image"
                        width="300"
                        height="450"
                        href={cardUrl}
                        onLoad={handleImageLoad}
                    />

                    {/* Player Portrait */}
                    <image
                        className="player-card-image"
                        x="18"
                        y="75"
                        width="270"
                        height="300"
                        href={portraitUrl[0]}
                        preserveAspectRatio="xMidYMid slice"
                        onLoad={handleImageLoad}
                        onError={evt => {
                            evt.currentTarget.onerror = null; // Prevent infinite loop
                            evt.currentTarget.setAttribute("href", portraitUrl[1]);
                        }}
                    />

                    {/* Rating & Position */}
                    <text
                        x="52"
                        y="150"
                        fontSize="2.25em"
                        fontWeight="bold"
                        fill={colorMapping.header}
                    >
                        {playerData.rating}
                    </text>
                    <text
                        x="60"
                        y="170"
                        fontSize="0.95em"
                        fill={colorMapping.header}
                    >
                        {playerData.position[0]}
                    </text>

                    {/* Playstyle+ Badges */}
                    <g transform="translate(8, -30)">
                        {playstyleUrls.map((url, idx) => (
                            <g key={idx} transform={`translate(0, ${45 * idx})`}>
                                <PlayStyleBadge
                                    shapeId={`playstyle-badge-shape-${playerData.id}`}
                                    filterId={`playstyle-badge-filter-${playerData.id}`}
                                    iconUrl={url}
                                />
                            </g>
                        ))}
                    </g>

                    {/* Stat Badges (Right Side) */}
                    <g transform="translate(235, -80)">
                        <g>
                            <StatBadge shapeId={`stat-badge-shape-${playerData.id}`} text={`${playerData.skill_moves} SM`} color={colorMapping.attributeValues} />
                        </g>
                        <g transform="translate(0, 30)">
                            <StatBadge shapeId={`stat-badge-shape-${playerData.id}`} text={`${playerData.weak_foot} WF`} color={colorMapping.attributeValues} />
                        </g>
                        {/* Alternate Positions */}
                        {playerData.position.slice(1).map((pos, idx) => (
                            <g key={pos} transform={`translate(0, ${60 + 30 * idx})`}>
                                <StatBadge shapeId={`stat-badge-shape-${playerData.id}`} text={pos} color={colorMapping.attributeValues} />
                            </g>
                        ))}
                    </g>

                    {/* Player Info Section */}
                    <g>
                        {/* Player Name */}
                        <text
                            x="150"
                            y="300"
                            fontSize="1.65em"
                            fontWeight="bold"
                            fill={colorMapping.name}
                            textAnchor="middle"
                        >
                            {displayName}
                        </text>

                        {/* Attributes */}
                        {playerData.attributes.map((value, idx) => (
                            <g key={idx}>
                                <text
                                    x={`${36 * idx + 60}`}
                                    y="320"
                                    fontSize="0.75em"
                                    fill={colorMapping.attributeValues}
                                    textAnchor="middle"
                                >
                                    {attributeLabels[idx]}
                                </text>
                                <text
                                    x={`${36 * idx + 60}`}
                                    y="348"
                                    fontSize="1.5em"
                                    fontWeight="bold"
                                    fill={colorMapping.attributeValues}
                                    textAnchor="middle"
                                >
                                    {value}
                                </text>
                            </g>
                        ))}

                        {/* Nation, League, Club Icons */}
                        <g transform="translate(116, 365)">
                            <image
                                className="player-card-image"
                                width="1.25em"
                                x="0"
                                href={nationUrl}
                                onLoad={handleImageLoad}
                            />
                            <image
                                className="player-card-image"
                                width="1.25em"
                                x="25"
                                href={leagueUrl}
                                onLoad={handleImageLoad}
                            />
                            <image
                                className="player-card-image"
                                width="1.25em"
                                x="50"
                                href={clubUrl}
                                onLoad={handleImageLoad}
                            />
                        </g>
                    </g>
                </svg>
            </div>
        </Link>
    );
}

export default PlayerCard;