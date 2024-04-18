import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewsApiResponse, NewsArticle } from '../../models/Interfaces';
import { API_KEY, BASE_URL } from '../constants';

interface NewsState {
  loading: boolean;
  news: NewsArticle[] | null;
  error: string | null;
  totalPages: number;
  totalResult: number;
}

const initialState: NewsState = {
  loading: false,
  news: null,
  error: null,
  totalPages: 0,
  totalResult: 0,
};

export const fetchNews = createAsyncThunk<NewsApiResponse, { page: number }, { rejectValue: string }>(
  'news/fetchNews',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get<NewsApiResponse>(`${BASE_URL}/everything`, {
        params: { apiKey: API_KEY, q: "bitcoin", page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload.articles;
        state.totalPages = Math.ceil(action.payload.totalResults / 20);
        state.totalResult = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export default newsSlice.reducer;
