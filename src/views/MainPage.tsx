import React from "react";
import { Box, Typography } from "@mui/material";
import NewsList from "../components/NewsList";

const MainPage: React.FC = () => {
	return (
		<div>
			<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					My News App
				</Typography>
			</Box>
			<NewsList news={null} />
		</div>
	);
};

export default MainPage;
