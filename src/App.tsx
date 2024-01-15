import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store/store";
import Navbar from "./components/Navbar";
import TopsNews from "./views/TopsNews";
import FavoriteNews from "./views/FavoriteNews";
import About from "./views/About";
import MainPage from "./views/MainPage";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Container maxWidth="xl">
					<Navbar />
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/top-news" element={<TopsNews />} />
						<Route path="/favorites-news" element={<FavoriteNews />} />
						<Route path="/about" element={<About />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
