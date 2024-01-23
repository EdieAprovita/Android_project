import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store";
import { fetchTopNews as fetchTopNewsAction } from "../redux/actions/topNewsAction";
import { NewsApiResponse, ApiError } from "../models/Interfaces";
import { API_KEY, BASE_URL } from "../redux/constants";
import handleApiError from "../utils/ErrorHandler";

const useTopNews = (page: number, type: string = "top") => {
	const dispatch = useDispatch<AppDispatch>();
	const favoriteNews = useSelector((state: RootState) => state.favoriteNews);
	const totalPages = useSelector((state: RootState) => state.topNews.totalPages);

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
				if (response.data.status === "ok") {
					const newArticles = response.data.articles;
					dispatch(fetchTopNewsAction("top", newArticles, page));
					setNews(response.data);
					console.log("Response data hook", response.data);
				} else {
					setError("Error al obtener noticias.");
				}
			} catch (err) {
				if (axios.isAxiosError(err)) {
					setError(
						`Error al cargar las noticias: ${err.response?.statusText ?? err.message}`
					);
					handleApiError(err as AxiosError<ApiError>);
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
