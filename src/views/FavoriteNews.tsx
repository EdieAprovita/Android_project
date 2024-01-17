import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { NewsArticle } from "../models/Interfaces";
import NewsCard from "../components/NewsCard";
import { Grid, Typography, Box } from "@mui/material";

const FavoriteNewsPage: React.FC = () => {
	const favoriteNews = useSelector((state: RootState) => state.favoriteNews.favoriteNews);

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{
					textAlign: "center",
					marginTop: "20px",
					marginBottom: "20px",
				}}>
				Favorite News
			</Typography>
			<Grid container spacing={3}>
				{favoriteNews?.map((item: NewsArticle) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={uuidv4()}>
						<NewsCard newsItem={item} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default FavoriteNewsPage;
