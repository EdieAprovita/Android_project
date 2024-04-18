import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
	NewsApiResponse,
	NewsArticle,
	NewsApiRequestParams,
} from "../../models/Interfaces";
import { BASE_URL, API_KEY } from "../constants";

interface FavoriteNewsState {
	loading: boolean;
	favoriteNews: NewsArticle[] | null;
	error: string | null;
}

const initialState: FavoriteNewsState = {
	loading: false,
	favoriteNews: null,
	error: null,
};
export const fetchFavoriteNews = createAsyncThunk(
	"favoriteNews/fetchFavoriteNews",
	async (newsType: "all" | "top") => {
		try {
			const params: NewsApiRequestParams = {
				apiKey: API_KEY,
				q: newsType === "all" ? "bitcoin" : "",
			};
			const response = await axios.get<NewsApiResponse>(`${BASE_URL}/everything`, {
				params,
			});
			return response.data.articles;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const errorMessage = error.response?.data.message || "An error occurred";
				throw new Error(errorMessage);
			} else {
				throw error;
			}
		}
	}
);

const favoriteNewsSlice = createSlice({
	name: "favoriteNews",
	initialState,
	reducers: {
		addFavoriteNews: (state, action: PayloadAction<NewsArticle>) => {
			if (state.favoriteNews) {
				state.favoriteNews.push(action.payload);
			}
		},
		removeFavoriteNews: (state, action: PayloadAction<{ title: string }>) => {
			state.favoriteNews = (state.favoriteNews ?? []).filter(
				news => news.title !== action.payload.title
			);
		},
		clearFavoriteNews: state => {
			state.favoriteNews = [];
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchFavoriteNews.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFavoriteNews.fulfilled, (state, action) => {
				state.loading = false;
				state.favoriteNews = action.payload;
			})
			.addCase(fetchFavoriteNews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? null;
			});
	},
});

export const { addFavoriteNews, removeFavoriteNews, clearFavoriteNews } =
	favoriteNewsSlice.actions;

export default favoriteNewsSlice.reducer;
