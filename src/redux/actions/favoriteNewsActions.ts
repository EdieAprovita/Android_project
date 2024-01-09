import axios from "axios";
import { Dispatch } from "redux";

import {
	FETCH_FAVORITE_NEWS,
	FETCH_FAVORITE_NEWS_SUCCESS,
	FETCH_FAVORITE_NEWS_FAILURE,
	BASE_URL,
	API_KEY,
} from "../constants";
import { NewsApiRequestParams, NewsApiResponse } from "../../models/Interfaces";

type NewsType = "all" | "top";

export const fetchFavoriteNews = (newsType: NewsType) => {
	return (dispatch: Dispatch) => {
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
					payload: response.data.articles,
				});
			})
			.catch(error => {
				dispatch({
					type: FETCH_FAVORITE_NEWS_FAILURE,
					payload: error,
				});
			});
	};
};
