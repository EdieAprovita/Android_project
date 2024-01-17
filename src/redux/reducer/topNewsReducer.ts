import {
	FETCH_TOP_NEWS,
	FETCH_TOP_NEWS_SUCCESS,
	FETCH_TOP_NEWS_FAILURE,
} from "../constants";

import { NewsApiResponse } from "../../models/Interfaces";

interface TopNewsState {
	topNews: NewsApiResponse | null;
	loading: boolean;
	error: string | null;
}

const initialState: TopNewsState = {
	topNews: null,
	loading: false,
	error: null,
};

type TopNewsAction =
	| { type: typeof FETCH_TOP_NEWS }
	| { type: typeof FETCH_TOP_NEWS_SUCCESS; payload: NewsApiResponse }
	| { type: typeof FETCH_TOP_NEWS_FAILURE; payload: string };

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
		case FETCH_TOP_NEWS_FAILURE:
			return {
				...state,
				topNews: null,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default topNewsReducer;
