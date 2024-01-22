import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

test("renders App component without crashing", () => {
	render(<App />);
	const titleElement = screen.getByText((content, element) => {
		return content === "My News App" && element?.tagName.toLowerCase() === "h1";
	});

	expect(titleElement).toBeInTheDocument();
});
