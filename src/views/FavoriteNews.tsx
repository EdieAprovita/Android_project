import { Box, Typography } from "@mui/material";

const FavoriteNews = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Favorite News
			</Typography>
		</Box>
	);
};

export default FavoriteNews;
