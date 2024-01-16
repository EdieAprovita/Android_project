import {
	FETCH_NEWS,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE,
	FETCH_NEWS_RESPONSE,
} from "../constants";

import { NewsArticle, NewsApiResponse } from "../../models/Interfaces";

interface NewsState {
	loading: boolean;
	news: NewsArticle[] | null;
	error: string | null;
	totalPages: number;
	totalResult: number;
	response: NewsApiResponse | null;
}

const initialState: NewsState = {
	loading: false,
	news: null,
	error: null,
	totalPages: 0,
	totalResult: 0,
	response: null,
};

type NewsAction =
	| { type: typeof FETCH_NEWS }
	| { type: typeof FETCH_NEWS_SUCCESS; payload: NewsArticle[] }
	| { type: typeof FETCH_NEWS_FAILURE; payload: string }
	| { type: typeof FETCH_NEWS_RESPONSE; payload: NewsApiResponse };

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
				news: action.payload,
				error: null,
			};
		case FETCH_NEWS_RESPONSE:
			return {
				...state,
				totalResult: action.payload.totalResults,
				response: action.payload,
			};
		case FETCH_NEWS_FAILURE:
			return {
				...state,
				loading: false,
				news: null,
				error: action.payload,
				totalPages: 0,
				totalResult: 0,
			};
		default:
			return state;
	}
};

export default newsReducer;
