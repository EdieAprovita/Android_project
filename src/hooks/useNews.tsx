import { useState, useEffect } from "react";
import axios from "axios";
import { NewsItem } from "../models/News";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const useNews = () => {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await axios.get(
					`${BASE_URL}/everything?q=bitcoin&apiKey=${API_KEY}`
				);
				setNews(response.data.articles);
				console.log(response.data.articles);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};
		fetchNews();
	}, []);

	return { news, loading, error };
};

export default useNews;
