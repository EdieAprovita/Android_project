import {
	FETCH_FAVORITE_NEWS,
	FETCH_FAVORITE_NEWS_SUCCESS,
	FETCH_FAVORITE_NEWS_FAILURE,
} from "../constants";

import { NewsApiResponse } from "../../models/Interfaces";

interface FavoriteNewsState {
	loading: boolean;
	favoriteNews: NewsApiResponse[] | null;
	error: string | null;
}

const initialState: FavoriteNewsState = {
	loading: false,
	favoriteNews: null,
	error: null,
};

type FavoriteNewsAction =
	| { type: typeof FETCH_FAVORITE_NEWS }
	| { type: typeof FETCH_FAVORITE_NEWS_SUCCESS; payload: NewsApiResponse }
	| { type: typeof FETCH_FAVORITE_NEWS_FAILURE; payload: string };

const favoriteNewsReducer = (
	state = initialState,
	action: FavoriteNewsAction
): FavoriteNewsState => {
	switch (action.type) {
		case FETCH_FAVORITE_NEWS:
			return {
				...state,
				loading: true,
			};
		case FETCH_FAVORITE_NEWS_SUCCESS:
			return {
				...state,
				loading: false,
				favoriteNews: [action.payload],
				error: null,
			};
		case FETCH_FAVORITE_NEWS_FAILURE:
			return {
				...state,
				loading: false,
				favoriteNews: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default favoriteNewsReducer;
