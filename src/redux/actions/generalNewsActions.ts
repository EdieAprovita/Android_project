import axios from "axios";
import { Dispatch } from "redux";
import {
	FETCH_NEWS,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE,
	BASE_URL,
	API_KEY,
} from "../constants";
import { NewsApiRequestParams, NewsApiResponse } from "../../models/Interfaces";

type NewsType = "all" | "top";

export const fetchNews = (newsType: NewsType) => {
	return (dispatch: Dispatch) => {
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
					payload: response.data.articles,
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
