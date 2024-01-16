import React from "react";
import { useDispatch } from "react-redux";
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
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleAddToFavorites = () => {
		dispatch(addFavoriteNews(newsItem));
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
				<Button size="small" onClick={handleAddToFavorites}>
					Add to Favorites
				</Button>
			</CardActions>
		</Card>
	);
};

export default NewsCard;
