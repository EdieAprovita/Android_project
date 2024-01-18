import React from "react";
import { Box, Typography } from "@mui/material";

import TopNewsList from "../components/TopNewsList";

const TopsNews: React.FC = () => {
	return (
		<div>
			<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Tops News
				</Typography>
			</Box>
			<TopNewsList news={null} />
		</div>
	);
};

export default TopsNews;
