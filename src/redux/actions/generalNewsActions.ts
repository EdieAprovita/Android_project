import axios, { AxiosError } from "axios";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
	FETCH_NEWS,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE,
	FETCH_NEWS_RESPONSE,
	BASE_URL,
	API_KEY,
} from "../constants";
import {
	NewsApiRequestParams,
	NewsApiResponse,
	NewsArticle,
	ApiError,
} from "../../models/Interfaces";
import handleApiError from "../../utils/ErrorHandler";

type NewsType = "all" | "top";

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, GeneralNewsActions>;

interface FetchNewsAction {
	type: typeof FETCH_NEWS;
}

interface FetchNewsSuccessAction {
	type: typeof FETCH_NEWS_SUCCESS;
	articles: NewsArticle[];
}

interface FetchNewsFailureAction {
	type: typeof FETCH_NEWS_FAILURE;
	payload: string;
}

interface FetchNewsResponseAction {
	type: typeof FETCH_NEWS_RESPONSE;
	payload: NewsApiResponse;
}

type GeneralNewsActions =
	| FetchNewsAction
	| FetchNewsSuccessAction
	| FetchNewsFailureAction
	| FetchNewsResponseAction;

export const fetchNews = (
	newsType: NewsType,
	articles: NewsArticle[],
	page: number
): ThunkAction<void, RootState, unknown, GeneralNewsActions> => {
	return dispatch => {
		dispatch({ type: FETCH_NEWS });
		const params: NewsApiRequestParams = {
			apiKey: API_KEY,
			q: newsType === "all" ? "bitcoin" : "",
			page,
		};

		axios
			.get<NewsApiResponse>(`${BASE_URL}/everything`, { params })
			.then(response => {
				if (response.data.status === "ok") {
					dispatch({
						type: FETCH_NEWS_RESPONSE,
						payload: response.data,
					});
					dispatch({
						type: FETCH_NEWS_SUCCESS,
						articles: articles,
					});
				} else {
					dispatch({
						type: FETCH_NEWS_FAILURE,
						payload: "Error al obtener noticias.",
					});
				}
			})
			.catch(error => {
				dispatch({
					type: FETCH_NEWS_FAILURE,
					payload: error.message || "Error desconocido",
				});
				if (axios.isAxiosError(error)) {
					handleApiError(error as AxiosError<ApiError>);
				}
			});
	};
};
