import { useState, useEffect } from "react";
import axios from "axios";
import { NewsItem } from "../models/News";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const useNews = (page: number) => {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(0);
	const pageSize = 12;

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`${BASE_URL}/everything?q=bitcoin&apiKey=${API_KEY}`,
					{
						params: {
							page,
							pageSize,
						},
					}
				);
				setNews(response.data.articles);
				const totalResults = response.data.totalResults;
				setTotalPages(Math.ceil(totalResults / pageSize));
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};
		fetchNews();
	}, [page]);

	return { news, loading, error, totalPages };
};

export default useNews;
