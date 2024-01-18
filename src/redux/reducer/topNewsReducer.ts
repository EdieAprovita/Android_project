import {
	FETCH_TOP_NEWS,
	FETCH_TOP_NEWS_SUCCESS,
	FETCH_TOP_NEWS_FAILURE,
	FETCH_TOP_NEWS_RESPONSE,
} from "../constants";

import { NewsApiResponse, NewsArticle } from "../../models/Interfaces";

interface TopNewsState {
	topNews: NewsArticle[] | null;
	loading: boolean;
	error: string | null;
	totalPages: number;
	totalResult: number;
	response: NewsApiResponse | null;
}

const initialState: TopNewsState = {
	loading: false,
	topNews: null,
	error: null,
	totalPages: 0,
	totalResult: 0,
	response: null,
};

type TopNewsAction =
	| { type: typeof FETCH_TOP_NEWS }
	| { type: typeof FETCH_TOP_NEWS_SUCCESS; payload: NewsArticle[] }
	| { type: typeof FETCH_TOP_NEWS_FAILURE; payload: string }
	| { type: typeof FETCH_TOP_NEWS_RESPONSE; payload: NewsApiResponse };

const topNewsReducer = (state = initialState, action: TopNewsAction): TopNewsState => {
	switch (action.type) {
		case FETCH_TOP_NEWS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case FETCH_TOP_NEWS_SUCCESS:
			return {
				...state,
				topNews: action.payload,
				loading: false,
				error: null,
			};
		case FETCH_TOP_NEWS_RESPONSE:
			return {
				...state,
				totalResult: action.payload.totalResults,
				response: action.payload,
				totalPages: Math.ceil(action.payload.totalResults / 20),
			};
		case FETCH_TOP_NEWS_FAILURE:
			return {
				...state,
				topNews: null,
				loading: false,
				error: action.payload,
				totalPages: 0,
				totalResult: 0,
			};
		default:
			return state;
	}
};

export default topNewsReducer;
