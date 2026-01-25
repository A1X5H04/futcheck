import axiosInstance from '@/lib/axios';
import store from '@/lib/store';

export async function homeLoader() {
    const globalState = store.getState();
    const { nations, leagues, rarities, teams } = globalState.app;

    if (nations.length > 0 && leagues.length > 0 && rarities.length > 0 && teams.length > 0) {
        return {
            // Just a flag to check if the data is stale or not
            isStale: true,
            nations,
            leagues,
            rarities,
            teams,
        }
    }

    const data = await Promise.all([
        axiosInstance.get("/get_nations"),
        axiosInstance.get("/get_leagues"),
        axiosInstance.get("/get_promos"),
        axiosInstance.get("/get_teams"),
    ])

    return {
        isStale: false,
        nations: data[0].data,
        leagues: data[1].data,
        rarities: data[2].data,
        teams: data[3].data,
    }
}
