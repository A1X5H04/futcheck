import { createBrowserRouter } from "react-router";
import RootLayout from "./pages/layout";
import MarketWrapper from "./components/MarketWrapper";
import Tos from "./components/tos";
import EvolutionsWrapper from "./components/EvolutionsWrapper";
import EvolutionDetailWrapper from "./components/EvolutionDetailWrapper";
import Policy from "./components/policy";
import Combinations from "./components/getCombinations";
import SquadBuilderWrapper from "./components/squadBuilderWrapper";
import ClubWrapper from "./components/clubWrapper";
import ChallengeSolutions from "./components/sbc/ChallengeSolution";
import SbcViewWrapper from "./components/sbcViewWrapper";
import SbcWrapper from "./components/SbcWrapper";
import SquadWizardWrapper from "./components/squadWizardWrapper";
import GamesWrapper from "./components/GamesWrapper";
import StatClash from "./components/games/StatClash";
import PlayerDashboardWrapper from "./components/playerDashboardWrapper";
import AllPlayersWrapper from "./components/allPlayersWrapper";
import { loggingMiddleware } from "./middlewares";
import RootErrorPage from "./pages/error";

import HomePage from "./pages/home";
import { homeLoader } from "./loaders/home.loader";
import PlayersPage from "./pages/players";

export default createBrowserRouter([
    {
        Component: RootLayout,
        middleware: [loggingMiddleware],
        errorElement: <RootErrorPage />,
        children: [
            {
                index: true,
                Component: HomePage,
                loader: homeLoader
            },
            {
                path: "market",
                Component: MarketWrapper,
            },
            {
                path: "tos",
                Component: Tos,
            },
            {
                path: "evolutions",
                Component: EvolutionsWrapper,
            },
            {
                path: "evolution/:evolutionId",
                Component: EvolutionDetailWrapper,
            },
            {
                path: "policy",
                Component: Policy,
            },
            {
                path: "fc_combinations",
                Component: Combinations,
            },
            {
                path: "squad-builder",
                Component: SquadBuilderWrapper,
            },
            {
                path: "my-club",
                Component: ClubWrapper,
            },
            {
                path: "challenge-solution/:challengeId/:solutionId",
                Component: ChallengeSolutions,
            },
            {
                path: "sbc/:sbcId",
                Component: SbcViewWrapper,
            },
            {
                path: "sbc",
                Component: SbcWrapper,
            },
            {
                path: "squad_wizard",
                Component: SquadWizardWrapper,
            },
            {
                path: "games",
                Component: GamesWrapper,
            },
            {
                path: "stat_clash",
                Component: StatClash,
            },
            {
                path: "player/:playerId/:playerName",
                Component: PlayerDashboardWrapper,
            },
            {
                path: "players",
                Component: PlayersPage,
            },
            {
                path: "players_old",
                Component: AllPlayersWrapper,
            },
        ]
    }
]);