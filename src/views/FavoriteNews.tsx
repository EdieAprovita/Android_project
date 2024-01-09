import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import ErrorDisplay from "../components/ErrorDisplay";
import NewsCard from "../components/NewsCard";
import useNews from "../hooks/useNews";

const FavoriteNews: React.FC = () => {
	const { favoriteNews, error } = useNews(1);
	console.log(favoriteNews);

	if (error) {
		return <ErrorDisplay retry={() => {}} message={error} />;
	}

	if (favoriteNews.length === 0) {
		return (
			<Typography variant="h4">No tienes noticias favoritas en este momento.</Typography>
		);
	}
	return (
		<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Favorite News
			</Typography>
			<Grid container spacing={5} justifyContent="center">
				{favoriteNews.map(item => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={item.author}>
						<NewsCard
							newsItem={item}
							addToFavorites={() => {}}
							favoriteNews={favoriteNews}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default FavoriteNews;
