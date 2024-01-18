import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteNews } from "../redux/actions/favoriteNewsActions";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@mui/material";
import { NewsArticle } from "../models/Interfaces";
import { AppDispatch, RootState } from "../redux/store/store";
import { useNavigate } from "react-router-dom";

interface TopNewsCardProps {
	readonly topNewsItem: NewsArticle;
}

const TopNewsCard: React.FC<TopNewsCardProps> = ({ topNewsItem }) => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const favoriteNews = useSelector((state: RootState) => state.favoriteNews.favoriteNews);

	const isFavorite = favoriteNews?.some(item => item.url === topNewsItem.url);

	const handleAddToFavorites = () => {
		if (!isFavorite) {
			dispatch(addFavoriteNews(topNewsItem));
		}
		navigate("/favorites-news");
	};

	const formatDate = (dataString: string) => {
		return new Date(dataString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<Card sx={{ maxWidth: 550, maxHeight: 400 }}>
			<CardMedia
				sx={{ height: 100, objectFit: "cover" }}
				image={topNewsItem.urlToImage || "/static/images/default-news.jpg"}
				title={topNewsItem.title}
			/>
			<CardContent sx={{ paddingBottom: "16px" }}>
				<Typography gutterBottom variant="h6" component="div">
					{topNewsItem.title.slice(0, 50)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{topNewsItem.description}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
					Published on: {formatDate(topNewsItem.publishedAt)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					href={topNewsItem.url}
					target="_blank"
					rel="noopener noreferrer">
					Read More
				</Button>
				<Button size="small" onClick={handleAddToFavorites} disabled={isFavorite}>
					Add to Favorites
				</Button>
			</CardActions>
		</Card>
	);
};

export default TopNewsCard;
