import { FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILURE } from "../constants";

import { NewsApiResponse } from "../../models/Interfaces";

interface NewsState {
	loading: boolean;
	news: NewsApiResponse[] | null;
	error: string | null;
}

const initialState: NewsState = {
	loading: false,
	news: null,
	error: null,
};

type NewsAction =
	| { type: typeof FETCH_NEWS }
	| { type: typeof FETCH_NEWS_SUCCESS; payload: NewsApiResponse }
	| { type: typeof FETCH_NEWS_FAILURE; payload: string };

const newsReducer = (state = initialState, action: NewsAction): NewsState => {
	switch (action.type) {
		case FETCH_NEWS:
			return {
				...state,
				loading: true,
			};
		case FETCH_NEWS_SUCCESS:
			return {
				...state,
				loading: false,
				news: [action.payload],
				error: null,
			};
		case FETCH_NEWS_FAILURE:
			return {
				...state,
				loading: false,
				news: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default newsReducer;
