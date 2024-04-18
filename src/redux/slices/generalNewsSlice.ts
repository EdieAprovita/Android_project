import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewsApiResponse, ApiError, NewsArticle } from "../../models/Interfaces";
import { BASE_URL, API_KEY } from "../constants";

interface NewsState {
	loading: boolean;
	news: NewsArticle[] | null;
	error: string | null;
	totalPages: number;
	totalResults: number;
}

const initialState: NewsState = {
	loading: false,
	news: null,
	error: null,
	totalPages: 0,
	totalResults: 0,
};

export const fetchNews = createAsyncThunk<
	NewsApiResponse,
	{ page: number; newsType: string },
	{ rejectValue: ApiError }
>("news/fetchNews", async ({ page, newsType }, { rejectWithValue }) => {
	try {
		const response = await axios.get<NewsApiResponse>(`${BASE_URL}/everything`, {
			params: {
				apiKey: API_KEY,
				q: newsType === "all" ? "bitcoin" : undefined,
				page,
			},
		});
		return response.data;
	} catch (error) {
		let errorMsg = "An unexpected error occurred";
		if (axios.isAxiosError(error)) {
			errorMsg = error.response?.data.message || errorMsg;
		}
		return rejectWithValue({ code: "NETWORK_ERROR", message: errorMsg });
	}
});

const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchNews.pending, state => {
				state.loading = true;
			})
			.addCase(fetchNews.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload.articles;
				state.totalPages = Math.ceil(action.payload.totalResults / 20);
				state.totalResults = action.payload.totalResults;
				state.error = null;
			})
			.addCase(fetchNews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "An error occurred";
				state.news = null;
			});
	},
});

export default newsSlice.reducer;
