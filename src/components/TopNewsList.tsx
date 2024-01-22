import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import useTopNews from "../hooks/useTopNews";
import TopNewsCard from "./TopNewsCard";
import ErrorDisplay from "./ErrorDisplay";
import Spinner from "./Spinner";
import { Grid, Stack, Pagination, Typography } from "@mui/material";
import { NewsApiResponse, NewsArticle } from "../models/Interfaces";

interface TopNewsListProps {
	news: NewsApiResponse | null;
}

const TopNewsList: React.FC<TopNewsListProps> = ({ news: storedNewsData }) => {
	const [page, setPage] = useState<number>(1);
	const { news, loading, error, totalPages } = useTopNews(page, "top");

	useEffect(() => {
		if (news && news !== storedNewsData) {
			localStorage.setItem("storedTopNews", JSON.stringify(news));
			toast.success("Noticias actualizadas");
		}
	}, [news, storedNewsData]);

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
		let articles: NewsArticle[] = [];

		if (news?.articles) {
			articles = news.articles;
		} else if (storedNewsData?.articles) {
			articles = storedNewsData.articles;
		}

		if (articles.length === 0 && !storedNewsData) {
			content = (
				<Typography variant="h4">No hay noticias disponibles en este momento.</Typography>
			);
		} else {
			content = (
				<>
					<Grid container spacing={5} justifyContent="center">
						{articles.map((item: NewsArticle) => (
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
	}

	return content;
};

export default TopNewsList;
