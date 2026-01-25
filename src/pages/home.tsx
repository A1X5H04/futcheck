import { useLoaderData } from 'react-router'

import HeroCarousel from '../components/home/hero-carousel'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setLeagues, setNations, setRarities, setTeams } from '@/redux/appSlice';
import PlayerList from '@/components/home/player-list';
import { useGetRecentPlayersQuery } from '@/redux/apis/home.api';
import OverlayLoader from '@/components/common/overlay-loader';
import SectionHeader from '@/components/common/section-header';
import SBCCard from '@/components/sbc-card';
import SBCList from '@/components/home/sbc-list';

function HomePage() {
    const { isStale, nations, leagues, rarities, teams } = useLoaderData();
    const { data: recentPlayers, isLoading } = useGetRecentPlayersQuery("");
    const dispatch = useDispatch();

    console.log(recentPlayers)

    useEffect(() => {
        if (isStale) return;
        dispatch(setNations(nations.data));
        dispatch(setLeagues(leagues.data));
        dispatch(setRarities(rarities.data));
        dispatch(setTeams(teams.data));
    }, [nations, leagues, rarities, teams]);


    if (isLoading) {
        return (
            <OverlayLoader />
        )
    }


    return (
        <div className='min-h-screen'>
            <div className='relative bg-[url("/src/assets/images/website_bg.png")] bg-cover bg-center bg-no-repeat bg-fixed'>
                <div
                    className='absolute inset-0 pointer-events-none z-0'
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, var(--base-100) 70%)'
                    }}
                />
                <div className='h-180 flex items-center justify-center'>
                    <HeroCarousel playerData={recentPlayers.data} />
                </div>
            </div>
            <PlayerList />
            <SBCList />
        </div>
    )
}

export default HomePage