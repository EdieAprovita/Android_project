import axios, { AxiosError } from "axios";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
	FETCH_FAVORITE_NEWS,
	FETCH_FAVORITE_NEWS_SUCCESS,
	FETCH_FAVORITE_NEWS_FAILURE,
	ADD_FAVORITE_NEWS,
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

interface FetchFavoriteNewsAction {
	type: typeof FETCH_FAVORITE_NEWS;
}

interface FetchFavoriteNewsSuccessAction {
	type: typeof FETCH_FAVORITE_NEWS_SUCCESS;
	payload: NewsApiResponse;
}

interface FetchFavoriteNewsFailureAction {
	type: typeof FETCH_FAVORITE_NEWS_FAILURE;
	payload: string;
}

interface AddFavoriteNewsAction {
	type: typeof ADD_FAVORITE_NEWS;
	payload: NewsArticle;
}

type FavoriteNewsActions =
	| FetchFavoriteNewsAction
	| FetchFavoriteNewsSuccessAction
	| FetchFavoriteNewsFailureAction
	| AddFavoriteNewsAction;

export const fetchFavoriteNews = (
	newsType: NewsType
): ThunkAction<void, RootState, unknown, FavoriteNewsActions> => {
	return dispatch => {
		dispatch({ type: FETCH_FAVORITE_NEWS });
		const params: NewsApiRequestParams = {
			apiKey: API_KEY,
			q: newsType === "all" ? "bitcoin" : "",
		};

		axios
			.get<NewsApiResponse>(`${BASE_URL}/everything`, { params })
			.then(response => {
				dispatch({
					type: FETCH_FAVORITE_NEWS_SUCCESS,
					payload: {
						status: response.data.status,
						totalResults: response.data.totalResults,
						articles: response.data.articles,
					},
				});
			})
			.catch(error => {
				dispatch({
					type: FETCH_FAVORITE_NEWS_FAILURE,
					payload: error,
				});
				if (axios.isAxiosError(error)) {
					handleApiError(error as AxiosError<ApiError>);
				}
			});
	};
};

export const addFavoriteNews = (
	news: NewsArticle
): ThunkAction<void, RootState, unknown, FavoriteNewsActions> => {
	return dispatch => {
		dispatch({ type: ADD_FAVORITE_NEWS, payload: news });
	};
};
