import { useState, useEffect } from "react";
import axios from "axios";
import { NewsArticle } from "../models/Interfaces";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

type NewsType = "all" | "top";

interface NewsHookReturn {
	news: NewsArticle[];
	loading: boolean;
	error: string | null;
	totalPages: number;
	favoriteNews: NewsArticle[];
	addToFavorites: (newsItem: NewsArticle) => void;
}

const useNews = (page: number, type: NewsType = "all"): NewsHookReturn => {
	const [news, setNews] = useState<NewsArticle[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [favoriteNews, setFavoriteNews] = useState<NewsArticle[]>([]);

	const pageSize = 12;

	const addToFavorites = (newsItem: NewsArticle) => {
		setFavoriteNews(prevFavorites => [...prevFavorites, newsItem]);
		console.log(favoriteNews);
	};

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const endpoint = type === "all" ? "/everything" : "/top-headlines";
				const params = {
					...(type === "top" && { country: "us" }),
					q: type === "all" ? "bitcoin" : undefined,
					apiKey: API_KEY,
					page,
					pageSize,
				};
				const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
				setNews(response.data.articles);
				const totalResults = response.data.totalResults;
				setTotalPages(Math.ceil(totalResults / pageSize));
			} catch (error) {
				if (error instanceof axios.AxiosError) {
					setError(
						`Error al cargar las noticias: ${error.response?.statusText ?? error.message}`
					);
				} else {
					setError(`Error al cargar las noticias: ${(error as Error).message}`);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, [page, type]);

	return { news, loading, error, totalPages, favoriteNews, addToFavorites };
};

export default useNews;
