import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../redux/slices/generalNewsSlice";
import { AppDispatch, RootState } from "../redux/store/store";
import NewsCard from "./NewsCard";
import Spinner from "./Spinner";
import ErrorDisplay from "./ErrorDisplay";
import { Grid, Stack, Pagination } from "@mui/material";

const NewsList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [page, setPage] = useState(1);
	const { news, loading, error, totalPages } = useSelector(
		(state: RootState) => state.news
	);

	useEffect(() => {
		const storedNewsJSON = localStorage.getItem("news");
		const storedNews = storedNewsJSON ? JSON.parse(storedNewsJSON) : null;

		if (!storedNews || storedNews.page !== page) {
			dispatch(fetchNews({ page, newsType: "all" }));
		}
	}, [dispatch, page]);

	useEffect(() => {
		if (news && news.length > 0) {
			localStorage.setItem("news", JSON.stringify({ news, page }));
		}
	}, [news, page]);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	if (loading) return <Spinner />;
	if (error)
		return (
			<ErrorDisplay
				message={error}
				retry={() => dispatch(fetchNews({ page, newsType: "all" }))}
			/>
		);

	return (
		<>
			<Grid container spacing={3}>
				{news?.map(article => (
					<Grid item xs={12} sm={6} md={4} key={article.url}>
						<NewsCard newsItem={article} />
					</Grid>
				))}
			</Grid>
			<Stack
				spacing={2}
				sx={{ marginTop: 2, justifyContent: "center", alignItems: "center" }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
				/>
			</Stack>
		</>
	);
};

export default NewsList;
