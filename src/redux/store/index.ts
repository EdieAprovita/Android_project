import { configureStore, combineReducers } from "@reduxjs/toolkit";

import favoriteNewsReducer from "../reducer/favoriteNewsReducer";
import topNewsReducer from "../reducer/topNewsReducer";
import generalNewsReducer from "../reducer/generalNewsReducer";

const rootReducer = combineReducers({
	favoriteNews: favoriteNewsReducer,
	topNews: topNewsReducer,
	generalNews: generalNewsReducer,
});
const store = configureStore({
	reducer: rootReducer,
});

export default store;
