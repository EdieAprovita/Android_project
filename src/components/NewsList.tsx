import React from "react";
import useNews from "../hooks/useNews";
import NewsCard from "./NewsCard";
import { Grid } from "@mui/material";

const NewsList: React.FC = () => {
	const { news, loading, error } = useNews();

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <p>Error loading news: {error}</p>;
	}

	return (
		<Grid container spacing={2}>
			{news.map(item => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					lg={3}
					key={
						item.source.id ? `${item.source.id}-${item.publishedAt}` : item.publishedAt
					}>
					<NewsCard newsItem={item} />
				</Grid>
			))}
		</Grid>
	);
};

export default NewsList;
