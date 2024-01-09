import { combineReducers } from "redux";
import favoriteNewsReducer from "../reducer/favoriteNewsReducer";
import topNewsReducer from "../reducer/topNewsReducer";
import generalNewsReducer from "../reducer/generalNewsReducer";

const rootReducer = combineReducers({
	favoriteNews: favoriteNewsReducer,
	topNews: topNewsReducer,
	generalNews: generalNewsReducer,
});

export default rootReducer;
