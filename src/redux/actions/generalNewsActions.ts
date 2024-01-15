import axios from "axios";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
	FETCH_NEWS,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE,
	BASE_URL,
	API_KEY,
} from "../constants";
import { NewsApiRequestParams, NewsApiResponse } from "../../models/Interfaces";

type NewsType = "all" | "top";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, GeneralNewsActions>;

interface FetchNewsAction {
	type: typeof FETCH_NEWS;
}

interface FetchNewsSuccessAction {
	type: typeof FETCH_NEWS_SUCCESS;
	payload: NewsApiResponse;
}

interface FetchNewsFailureAction {
	type: typeof FETCH_NEWS_FAILURE;
	payload: string;
}

type GeneralNewsActions =
	| FetchNewsAction
	| FetchNewsSuccessAction
	| FetchNewsFailureAction;

export const fetchNews = (
	newsType: NewsType
): ThunkAction<void, RootState, unknown, GeneralNewsActions> => {
	return dispatch => {
		dispatch({ type: FETCH_NEWS });
		const params: NewsApiRequestParams = {
			apiKey: API_KEY,
			q: newsType === "all" ? "bitcoin" : "",
		};

		axios
			.get<NewsApiResponse>(`${BASE_URL}/everything`, { params })
			.then(response => {
				dispatch({
					type: FETCH_NEWS_SUCCESS,
					payload: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: FETCH_NEWS_FAILURE,
					payload: error,
				});
			});
	};
};
