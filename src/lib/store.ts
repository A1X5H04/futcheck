// Redux store

import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../redux/playerSlice";
import appSlice from "../redux/appSlice";
import allPlayerSlice from "../redux/allPlayerSlice";
import sbcSlice from "../redux/sbcSlice";
import squadWizardSlice from "../redux/squadWizardSlice";
import evolutionSlice from "../redux/evolutionSlice";

import homeDataApi from "../redux/apis/home.api";

const store = configureStore({
    reducer: {
        player: playerSlice,
        app: appSlice,
        allPlayers: allPlayerSlice,
        sbc: sbcSlice,
        squadWizard: squadWizardSlice,
        evolution: evolutionSlice,

        [homeDataApi.reducerPath]: homeDataApi.reducer,
    },

    middleware: (defMiddleware) => defMiddleware().concat(homeDataApi.middleware)
})


export default store;