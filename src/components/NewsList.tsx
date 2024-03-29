import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import useNews from "../hooks/useNews";
import NewsCard from "./NewsCard";
import ErrorDisplay from "./ErrorDisplay";
import Spinner from "./Spinner";
import { Grid, Stack, Pagination, Typography } from "@mui/material";
import { NewsApiResponse, NewsArticle } from "../models/Interfaces";

interface NewsListProps {
	news: NewsApiResponse | null;
}

const NewsList: React.FC<NewsListProps> = () => {
	const [page, setPage] = useState<number>(1);
	const { news, loading, error, totalPages } = useNews(page, "all");
	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const storedNews = localStorage.getItem("storedNews");
	const storedNewsData: NewsApiResponse | null = storedNews
		? JSON.parse(storedNews)
		: null;

	if (news && news !== storedNewsData) {
		localStorage.setItem("storedNews", JSON.stringify(news));
		toast.success("Noticias actualizadas");
	}

	let content;

	if (loading) {
		content = <Spinner />;
	} else if (error) {
		content = <ErrorDisplay retry={() => setPage(1)} message={error.message} />;
	} else if (news?.articles?.length === 0 && !storedNewsData) {
		content = (
			<Typography variant="h4">No hay noticias disponibles en este momento.</Typography>
		);
	} else {
		const articles = news?.articles ?? storedNewsData?.articles ?? [];

		content = (
			<>
				<Grid container spacing={5} justifyContent="center">
					{articles.map((item: NewsArticle) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={uuidv4()}>
							<NewsCard newsItem={item} />
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

export default NewsList;
