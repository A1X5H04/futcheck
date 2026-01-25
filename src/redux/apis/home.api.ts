import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const homeDataApi = createApi({
    reducerPath: 'homeDataApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),
    tagTypes: ['recent', 'investment', 'trending', 'sbc', 'search'],
    endpoints: (builder) => ({
        getRecentPlayers: builder.query({
            query: () => '/get_latest',
            providesTags: ['recent'],
        }),

        getInvestmentPlayers: builder.query({
            query: (page: number) => `/investment_players/?page=${page}`,
            providesTags: ['investment']
        }),

        getTrendingPlayers: builder.query({
            query: () => '/top_rated/',
            providesTags: ['trending']
        }),


        getSBCs: builder.query({
            query: () => '/fetch_sbc_data/',
            providesTags: ['sbc']
        }),

        searchPlayers: builder.query({
            query: (name: string) => `/search/?name=${encodeURIComponent(name)}`,
            providesTags: ['search']
        }),
    }),
});


export const {
    useGetRecentPlayersQuery,
    useGetInvestmentPlayersQuery,
    useGetTrendingPlayersQuery,
    useGetSBCsQuery,
    useSearchPlayersQuery,
} = homeDataApi;

export default homeDataApi;


