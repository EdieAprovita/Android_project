import { combineReducers } from "redux";
import favoriteNewsReducer from "./slices/favoriteNewsSlice";
import generalNewsReducer from "./slices/generalNewsSlice";
import { GeneralNewsState, FavoriteNewsState } from "../models/Interfaces";

const rootReducer = combineReducers({
	favoriteNews: favoriteNewsReducer,
	generalNews: generalNewsReducer,
});

export interface RootState {
	generalNews: GeneralNewsState;
	favoriteNews: FavoriteNewsState;
}

export default rootReducer;
