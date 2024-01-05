import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NewsItem } from "../models/News"; // Asegúrate de tener este modelo definido

interface NewsCardProps {
	readonly newsItem: NewsItem;
}

export default function NewsCard({ newsItem }: NewsCardProps) {
	const formatDate = (dataString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		return new Date(dataString).toLocaleDateString("en-US", options);
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
				</Button>{" "}
			</CardActions>
		</Card>
	);
}
