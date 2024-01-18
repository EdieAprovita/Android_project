import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { fetchTopNews as fetchTopNewsAction } from "../redux/actions/topNewsAction";
import { NewsApiResponse } from "../models/Interfaces";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const useTopNews = (page: number, type: string = "top") => {
	const dispatch = useDispatch<AppDispatch>();
	const favoriteNews = useSelector((state: RootState) => state.favoriteNews);
	const totalPages = useSelector((state: RootState) => state.generalNews.totalPages);
	console.log(totalPages);

	const pageSize = 12;

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [news, setNews] = useState<NewsApiResponse | null>(null);

	useEffect(() => {
		const fetchTopNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const endpoint = "/top-headlines";
				const params = {
					apiKey: API_KEY,
					country: "us",
					page,
					pageSize,
				};
				const response = await axios.get<NewsApiResponse>(`${BASE_URL}${endpoint}`, {
					params,
				});
				dispatch(fetchTopNewsAction("top", response.data.articles, page));
				setNews(response.data);
			} catch (err) {
				if (axios.isAxiosError(err)) {
					setError(
						`Error al cargar las noticias: ${err.response?.statusText ?? err.message}`
					);
				} else {
					setError(`Error al cargar las noticias: ${(err as AxiosError).message}`);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchTopNews();
	}, [dispatch, page, type]);

	return { totalPages, loading, error, news, favoriteNews };
};

export default useTopNews;
