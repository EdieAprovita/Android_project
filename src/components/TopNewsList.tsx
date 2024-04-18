import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, NewsArticle } from "../redux/slices/generalNewsSlice"; // Importa fetchNews y NewsArticle del slice
import TopNewsCard from "./TopNewsCard";
import ErrorDisplay from "./ErrorDisplay";
import Spinner from "./Spinner";
import { Grid, Stack, Pagination, Typography } from "@mui/material";
import { RootState } from "../redux/store/store";

interface TopNewsListProps {
	// No necesitas recibir `storedNewsData` como prop, ya que obtendrás las noticias del estado de Redux
}

const TopNewsList: React.FC<TopNewsListProps> = () => {
	const [page, setPage] = useState<number>(1);
	const dispatch = useDispatch();
	const { news, loading, error, totalPages } = useSelector(
		(state: RootState) => state.news
	);

	useEffect(() => {
		dispatch(fetchNews({ page, newsType: "all" }));
	}, [dispatch, page]);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	let content;

	if (loading) {
		content = <Spinner />;
	} else if (error) {
		toast.error(error);
		content = <ErrorDisplay retry={() => setPage(1)} message={error} />;
	} else {
		content = (
			<>
				<Grid container spacing={5} justifyContent="center">
					{news &&
						news.map((item: NewsArticle) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={uuidv4()}>
								<TopNewsCard topNewsItem={item} />
							</Grid>
						))}
				</Grid>
				<Stack spacing={2} sx={{ marginTop: 2 }}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						color="primary"
						shape="rounded"
						sx={{ display: "flex", justifyContent: "center", marginY: 2 }}
					/>
				</Stack>
			</>
		);
	}

	return content;
};

export default TopNewsList;
