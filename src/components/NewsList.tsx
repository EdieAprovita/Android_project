import React, { useState } from "react";
import useNews from "../hooks/useNews";
import NewsCard from "./NewsCard";
import { Grid, Stack, Pagination } from "@mui/material";

const NewsList: React.FC = () => {
	const [page, setPage] = useState<number>(1);
	const { news, loading, error, totalPages } = useNews(page);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <p>Error loading news: {error}</p>;
	}

	return (
		<>
			<Grid container spacing={5}>
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
			<Stack spacing={2} sx={{ marginTop: 2 }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color="primary"
					shape="rounded"
					sx={{
						display: "flex",
						justifyContent: "center",
						marginY: 2,
					}}
				/>
			</Stack>
		</>
	);
};

export default NewsList;
