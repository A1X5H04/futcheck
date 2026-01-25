import React, { useState } from 'react'
import SectionHeader from '../common/section-header';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import PlayerCard from '../player-card';
import { CircleDollarSign, Clock, FlameIcon } from 'lucide-react';
import { useGetInvestmentPlayersQuery, useGetRecentPlayersQuery, useGetTrendingPlayersQuery } from '@/redux/apis/home.api';
import { AsyncBoundary } from '../common/async-boundary';

const tabsToHeadingMap = {
    trending: {
        title: 'Trending Players',
        description: 'Players that are currently trending'
    },
    investment: {
        title: 'Investment Players',
        description: 'Players that are currently in investment'
    },
    recent: {
        title: 'Recently Added Players',
        description: 'Just added players to the platform'
    }
}

function PlayerList() {
    const [selectedTab, setSelectedTab] = useState<keyof typeof tabsToHeadingMap>("recent");

    const { data: recentPlayers, isFetching: recentFetching } = useGetRecentPlayersQuery("", {
        skip: selectedTab !== "recent"
    });
    const { data: investmentPlayers, isFetching: investmentFetching } = useGetInvestmentPlayersQuery(1, {
        skip: selectedTab !== "investment"
    });
    const { data: trendingPlayers, isFetching: trendingFetching } = useGetTrendingPlayersQuery("", {
        skip: selectedTab !== "trending"
    });

    const getDataBasedOnTab = (tabKey: keyof typeof tabsToHeadingMap) => {
        switch (tabKey) {
            case "recent":
                return recentPlayers?.data;
            case "investment":
                return investmentPlayers?.data;
            case "trending":
                return trendingPlayers?.data;
        }
    }

    const isCurrentTabLoading = () => {
        switch (selectedTab) {
            case "recent":
                return recentFetching;
            case "investment":
                return investmentFetching;
            case "trending":
                return trendingFetching;
        }
    }

    console.log("Selected Tab:", selectedTab, "Data:", getDataBasedOnTab(selectedTab), "isFetching:", isCurrentTabLoading())


    return (
        <div>
            <Tabs onValueChange={(value) => setSelectedTab(value as keyof typeof tabsToHeadingMap)} value={selectedTab}>
                <SectionHeader
                    title={tabsToHeadingMap[selectedTab].title}
                    description={tabsToHeadingMap[selectedTab].description}
                    action={
                        <TabsList>
                            <TabsTrigger value="recent">
                                <Clock />
                                Recent</TabsTrigger>
                            <TabsTrigger value="trending">
                                <FlameIcon />
                                Trending</TabsTrigger>
                            <TabsTrigger value="investment">
                                <CircleDollarSign />
                                Investment</TabsTrigger>
                        </TabsList>
                    }
                />
                <AsyncBoundary className="py-4" data={getDataBasedOnTab(selectedTab)} isLoading={isCurrentTabLoading()}>
                    {(data) => {
                        if (!data || data.length === 0) {
                            return <div className="text-center">No players found</div>
                        }

                        return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4">
                            {data?.map((player: any) => (
                                <PlayerCard className='hover:scale-105' key={player.id} playerData={player} />
                            ))}
                        </div>)
                    }}
                </AsyncBoundary>
            </Tabs>
        </div>
    )
}

export default PlayerList