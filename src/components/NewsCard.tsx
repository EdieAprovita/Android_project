import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNews } from "../redux/actions/generalNewsActions";
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
import { AppDispatch } from "../redux/store/store";

interface NewsCardProps {
	readonly newsItem: NewsArticle;
	addToFavorites: (newsItem: NewsArticle) => void;
	favoriteNews: NewsArticle[];
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem, favoriteNews }) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchNews("all"));
	}, [dispatch]);

	const handleAddToFavorites = (newsItem: NewsArticle) => {
		dispatch(addFavoriteNews(newsItem));
	};

	const formatDate = (dataString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dataString).toLocaleDateString("en-US", options);
	};

	const isFavorite = favoriteNews.some(item => item.url === newsItem.url);

	return (
		<Card sx={{ maxWidth: 550, maxHeight: 400 }}>
			<CardMedia
				sx={{ height: 100, objectFit: "cover" }}
				image={newsItem.urlToImage || "/static/images/default-news.jpg"}
				title={newsItem.title}
			/>
			<CardContent sx={{ paddingBottom: "16px" }}>
				<Typography gutterBottom variant="h6" component="div">
					{newsItem.title.slice(0, 50)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{newsItem.description.slice(0, 60)}
				</Typography>
				<Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
					Published on: {formatDate(newsItem.publishedAt)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size="small"
					href={newsItem.url}
					target="_blank"
					rel="noopener noreferrer">
					Read More
				</Button>
				<Button
					size="small"
					onClick={() => handleAddToFavorites(newsItem)}
					disabled={isFavorite}>
					{isFavorite ? "Favorito" : "Añadir a Favoritos"}
				</Button>
			</CardActions>
		</Card>
	);
};

export default NewsCard;
