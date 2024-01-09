import React, { useState } from "react";
import useNews from "../hooks/useNews";
import NewsCard from "./NewsCard";
import ErrorDisplay from "./ErrorDisplay";
import Spinner from "./Spinner";
import { Grid, Stack, Pagination, Typography } from "@mui/material";

const NewsList: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const { news, loading, error, totalPages, addToFavorites, favoriteNews } =
		useNews(page);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	let content;

	if (loading) {
		content = <Spinner />;
	} else if (error) {
		content = <ErrorDisplay retry={() => setPage(1)} message={error} />;
	} else if (news.length === 0) {
		content = (
			<Typography variant="h4">No hay noticias disponibles en este momento.</Typography>
		);
	} else {
		content = (
			<>
				<Grid container spacing={5} justifyContent="center">
					{news.map(item => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={item.url}>
							<NewsCard
								newsItem={item}
								addToFavorites={addToFavorites}
								favoriteNews={favoriteNews}
							/>
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
