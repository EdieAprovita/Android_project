import axios from "axios";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
	FETCH_TOP_NEWS,
	FETCH_TOP_NEWS_SUCCESS,
	FETCH_TOP_NEWS_FAILURE,
	FETCH_TOP_NEWS_RESPONSE,
	BASE_URL,
	API_KEY,
} from "../constants";
import {
	NewsApiRequestParams,
	NewsApiResponse,
	NewsArticle,
} from "../../models/Interfaces";

type NewsType = "all" | "top";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, TopNewsActions>;

interface FetchTopNewsAction {
	type: typeof FETCH_TOP_NEWS;
}

interface FetchTopNewsSuccessAction {
	type: typeof FETCH_TOP_NEWS_SUCCESS;
	articles: NewsArticle[];
}

interface FetchTopNewsFailureAction {
	type: typeof FETCH_TOP_NEWS_FAILURE;
	payload: string;
}

interface FetchTopNewsResponseAction {
	type: typeof FETCH_TOP_NEWS_RESPONSE;
	payload: NewsApiResponse;
}

type TopNewsActions =
	| FetchTopNewsAction
	| FetchTopNewsSuccessAction
	| FetchTopNewsFailureAction
	| FetchTopNewsResponseAction;

export const fetchTopNews = (
	newsType: NewsType,
	articles: NewsArticle[],
	page: number
): ThunkAction<void, RootState, unknown, TopNewsActions> => {
	return dispatch => {
		dispatch({ type: FETCH_TOP_NEWS });
		const params: NewsApiRequestParams = {
			apiKey: API_KEY,
			q: "top",
			page,
		};

		axios
			.get<NewsApiResponse>(`${BASE_URL}/top-headlines`, { params })
			.then(response => {
				if (response.data.status === "ok") {
					dispatch({
						type: FETCH_TOP_NEWS_RESPONSE,
						payload: response.data,
					});
					dispatch({
						type: FETCH_TOP_NEWS_SUCCESS,
						articles: articles,
					});
				} else {
					dispatch({
						type: FETCH_TOP_NEWS_FAILURE,
						payload: "Error al obtener noticias.",
					});
				}
			})
			.catch(error => {
				dispatch({
					type: FETCH_TOP_NEWS_FAILURE,
					payload: error.message || "Error desconocido",
				});
			});
	};
};
