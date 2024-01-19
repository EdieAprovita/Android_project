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

	const [isHovered, setIsHovered] = React.useState<boolean>(false);
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
		<Card
			sx={{
				maxWidth: 550,
				maxHeight: 400,
				transition: "box-shadow 0.3s",
				boxShadow: isHovered ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
				backgroundColor: isHovered ? "#f0f0f0" : "white",
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<CardMedia
				sx={{ height: 100, objectFit: "cover" }}
				image={topNewsItem.urlToImage ?? "../assets/dafault2.png"}
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
