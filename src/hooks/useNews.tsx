import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { fetchNews as fetchNewsAction } from "../redux/actions/generalNewsActions";
import { NewsApiResponse } from "../models/Interfaces";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const useNews = (page: number, type: string = "all") => {
	const dispatch = useDispatch<AppDispatch>();
	const newsResponse = useSelector((state: RootState) => state.generalNews);
	const favoriteNews = useSelector((state: RootState) => state.favoriteNews);
	const totalPages = useSelector((state: RootState) => state.generalNews.totalPages);

	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const pageSize = 12;

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setLoading(true);
				setError(null);
				const endpoint = type === "all" ? "/everything" : "/top-headlines";
				const params = {
					apiKey: API_KEY,
					q: type === "all" ? "bitcoin" : undefined,
					page,
					pageSize,
					...(type === "top" && { country: "us" }),
				};
				const response = await axios.get<NewsApiResponse>(`${BASE_URL}${endpoint}`, {
					params,
				});
				dispatch(fetchNewsAction("all", response.data.articles, page));
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

		fetchNews();
	}, [dispatch, page, type]);

	return { news: newsResponse, loading, error, totalPages, favoriteNews };
};

export default useNews;
