import newsReducer, {
	initialState,
	NewsAction,
} from "../../../redux/reducer/generalNewsReducer";
import {
	FETCH_NEWS,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE,
	FETCH_NEWS_RESPONSE,
} from "../../../redux/constants";
import { NewsArticle, NewsApiResponse } from "../../../models/Interfaces";

describe("newsReducer", () => {
	it("should handle FETCH_NEWS", () => {
		const action: NewsAction = { type: FETCH_NEWS };
		const newState = newsReducer(initialState, action);
		expect(newState.loading).toEqual(true);
	});

	it("should handle FETCH_NEWS_SUCCESS", () => {
		const newsData: NewsArticle[] = [
			{
				source: {
					id: "the-guardian-au",
					name: "The Guardian",
				},
				author: "Helen Sullivan",
				title:
					"Coronavirus live news: US sees record one-day increase in cases; global deaths pass 550,000 - The Guardian",
				description:
					"India’s death toll passes 20,000; Mexico’s death toll becomes the world’s fourth highest; US sees record one-day increase in cases",
				url: "https://www.theguardian.com/world/live/2020/jul/03/coronavirus-live-news-us-sees-record-one-day-increase-in-cases-global-deaths-pass-550000",
				urlToImage:
					"https://i.guim.co.uk/img/media/3a9b9b2f3c8f2a5b7a0b7a6a3c2c9b0c3c3b8b5c/0_0_3500_2100/master/3500.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-ali",
				publishedAt: "2020-07-03T06:35:00Z",
				content:
					"India’s death toll passes 20,000; Mexico’s death toll becomes the world’s fourth highest; US sees record one-day increase in cases\r\n\r\n<p><strong>US sees record one-day increase in cases</strong></p>\r\n<p>The US recorded an all-time daily high of 52,000 new Covid-19 … [+10003 chars]",
			},
		];
		const action: NewsAction = { type: FETCH_NEWS_SUCCESS, payload: newsData };
		const newState = newsReducer(initialState, action);
		expect(newState.loading).toEqual(false);
		expect(newState.news).toEqual(newsData);
		expect(newState.error).toEqual(null);
	});

	it("should handle FETCH_NEWS_RESPONSE", () => {
		const response: NewsApiResponse = {
			status: "ok",
			articles: [],
			totalResults: 10,
		};
		const action: NewsAction = { type: FETCH_NEWS_RESPONSE, payload: response };
		const newState = newsReducer(initialState, action);
		expect(newState.totalResult).toEqual(response.totalResults);
		expect(newState.response).toEqual(response);
		expect(newState.totalPages).toEqual(Math.ceil(response.totalResults / 20));
	});

	it("should handle FETCH_NEWS_FAILURE", () => {
		const errorMessage = "Error message";
		const action: NewsAction = { type: FETCH_NEWS_FAILURE, payload: errorMessage };
		const newState = newsReducer(initialState, action);
		expect(newState.loading).toEqual(false);
		expect(newState.news).toEqual(null);
		expect(newState.error).toEqual(errorMessage);
		expect(newState.totalPages).toEqual(0);
		expect(newState.totalResult).toEqual(0);
	});
});
