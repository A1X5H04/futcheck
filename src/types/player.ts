
export type RarityData = {
    id: number;
    name: string;
    colors: string[];
    lg_color_indices: number[];
    levels: number;
};


export type PlayerData = {

    id: number;
    base_id: number;
    guid: string;
    guid_no: string;


    name: string;
    c_name: string;
    rating: number;
    position: string[];
    height: number;
    foot: number; // 1 = Right, 2 = Left ?


    nation: number;
    nation_name: string;
    teamid: number;
    team_name: string;
    leagueid: number;
    league_name: string;

    rarity: number;
    rarity_id: number;
    rarity_name: string;
    level: number;
    levels: number;
    colors: string[];

    attributes: [number, number, number, number, number, number];

    skill_moves: number;
    weak_foot: number;
    playstyles: number[];
    playstyle_plus: number[];

    plusroles: number[];
    plusplusroles: number[];

    latest_price: number | null;
    expected_price: number | null;
    investment_score: number | null;
    trend: string | null;
    last_reversal_price: number | null;
    last_updated: string | null;

    stats: number[] | null;

    slug: string;
    sbcsetid: number | null;
    is_old: boolean;
    date_created: string;
    futbin_id: number | null;
    futwiz_id: number | null;
};

export type ColorMapping = {
    header: string;
    name: string;
    attributeValues: string;
    footer: string;
    playStyleIcon: string;
    playStyleText: string;
    background: string;
    dividers: string;
    useLightCrest: number;
};