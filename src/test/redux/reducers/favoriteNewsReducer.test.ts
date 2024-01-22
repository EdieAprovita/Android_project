import favoriteNewsReducer, {
	initialState,
	FavoriteNewsAction,
} from "../../../redux/reducer/favoriteNewsReducer";
import {
	FETCH_FAVORITE_NEWS,
	FETCH_FAVORITE_NEWS_SUCCESS,
	FETCH_FAVORITE_NEWS_FAILURE,
	ADD_FAVORITE_NEWS,
} from "../../../redux/constants";
import { NewsArticle } from "../../../models/Interfaces";

describe("favoriteNewsReducer", () => {
	it("should handle FETCH_FAVORITE_NEWS", () => {
		const action: FavoriteNewsAction = { type: FETCH_FAVORITE_NEWS };
		const newState = favoriteNewsReducer(initialState, action);
		expect(newState.loading).toEqual(true);
	});

	it("should handle FETCH_FAVORITE_NEWS_SUCCESS", () => {
		const favoriteNewsData: NewsArticle[] = [];
		const action: FavoriteNewsAction = {
			type: FETCH_FAVORITE_NEWS_SUCCESS,
			payload: favoriteNewsData,
		};
		const newState = favoriteNewsReducer(initialState, action);
		expect(newState.loading).toEqual(false);
		expect(newState.favoriteNews).toEqual(favoriteNewsData);
		expect(newState.error).toEqual(null);
	});

	it("should handle FETCH_FAVORITE_NEWS_FAILURE", () => {
		const errorMessage = "Error message";
		const action: FavoriteNewsAction = {
			type: FETCH_FAVORITE_NEWS_FAILURE,
			payload: errorMessage,
		};
		const newState = favoriteNewsReducer(initialState, action);
		expect(newState.loading).toEqual(false);
		expect(newState.favoriteNews).toEqual(null);
		expect(newState.error).toEqual(errorMessage);
	});

	it("should handle ADD_FAVORITE_NEWS", () => {
		const newFavoriteNewsItem: NewsArticle = {
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
		};
		const action: FavoriteNewsAction = {
			type: ADD_FAVORITE_NEWS,
			payload: newFavoriteNewsItem,
		};
		const newState = favoriteNewsReducer(initialState, action);
		expect(newState.favoriteNews).toEqual([newFavoriteNewsItem]);
	});
});
