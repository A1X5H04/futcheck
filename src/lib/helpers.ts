type IdType = string | number;

const BASE_URL = import.meta.env.VITE_CDN_BASE_URL;
const EA_BASE_URL = import.meta.env.VITE_EA_BASE_URL;

export const urlBuilder = {
    dynamic: (type: string, id: IdType, mode?: string) => {
        return mode ? `${BASE_URL}/${type}/${mode}/${id}.png` : `${BASE_URL}/${type}/${id}.png`;
    },

    player: (eaId: IdType) => {
        return `${BASE_URL}/player/${eaId}.webp`;
        // return `${BASE_URL}/player//${guId}/p${eaId}.png`;
    },

    challengeImage: (challengeImageId: string) => {
        return `${EA_BASE_URL}/sbc/companion/challenges/images/sbc_challenge_image_${challengeImageId}.png`;
    },

    rarityUrl: (level: number, rating: number, rarityId: IdType) => {
        const level_no = level > 0
            ? (rating >= 75 ? 3 : rating >= 65 ? 2 : 1)
            : level;
        return `${BASE_URL}/card/l_${level_no}_r_${rarityId}.png`;
    }
}

export const slugify = (str: string) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "-");
}

export const fillHexCode = (hex: string, char: string = "0") => {
    const hexCode = hex.replace("#", "").padStart(6, char);
    return `#${hexCode}`;
}