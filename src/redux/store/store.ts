import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../slices/generalNewsSlice";
import favoriteNewsReducer from "../slices/favoriteNewsSlice";

const store = configureStore({
	reducer: {
		news: newsReducer,
		favoriteNews: favoriteNewsReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
