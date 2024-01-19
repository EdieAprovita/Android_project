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
import { useTheme } from "@mui/material/styles";

interface NewsCardProps {
	readonly newsItem: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const favoriteNews = useSelector((state: RootState) => state.favoriteNews.favoriteNews);

	const [isHovered, setIsHovered] = React.useState<boolean>(false);
	const isFavorite = favoriteNews?.some(item => item.url === newsItem.url);

	const handleAddToFavorites = () => {
		if (!isFavorite) {
			dispatch(addFavoriteNews(newsItem));
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
		<Card
			sx={{
				maxWidth: 550,
				maxHeight: 400,
				transition: "box-shadow 0.3s",
				boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
				backgroundColor: isHovered ? "white" : theme.palette.primary.main,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
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
				<Button size="small" onClick={handleAddToFavorites} disabled={isFavorite}>
					Add to Favorites
				</Button>
			</CardActions>
		</Card>
	);
};

export default NewsCard;
