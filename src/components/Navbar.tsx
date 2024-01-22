import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar: React.FC = () => {
	const theme = useTheme();
	return (
		<AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					My News App
				</Typography>
				<Button color="inherit" component={Link} to="/">
					Home
				</Button>
				<Button color="inherit" component={Link} to="/top-news">
					Top News
				</Button>
				<Button color="inherit" component={Link} to="/favorites-news">
					Favorite News
				</Button>
				<Button color="inherit" component={Link} to="/about">
					About
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
