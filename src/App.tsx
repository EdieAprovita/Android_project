import "./App.css";
import { Container } from "@mui/material";
import MainPage from "./views/MainPage";

function App() {
	return (
		<Container maxWidth="xl">
			<h1>News Blog</h1>
			<MainPage />
		</Container>
	);
}

export default App;
