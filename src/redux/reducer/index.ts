import { combineReducers } from "redux";
import favoriteNewsReducer from "../reducer/favoriteNewsReducer";
import topNewsReducer from "../reducer/topNewsReducer";
import generalNewsReducer from "../reducer/generalNewsReducer";
import {
	GeneralNewsState,
	TopNewsState,
	FavoriteNewsState,
} from "../../models/Interfaces";

const rootReducer = combineReducers({
	favoriteNews: favoriteNewsReducer,
	topNews: topNewsReducer,
	generalNews: generalNewsReducer,
});

export interface RootState {
	generalNews: GeneralNewsState;
	topNews: TopNewsState;
	favoriteNews: FavoriteNewsState;
}

export default rootReducer;
