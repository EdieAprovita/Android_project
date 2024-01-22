# News Application with React, TypeScript, and Vite

![App Screenshot](/screenshot.png)

## Description

This project is a News Application built with React and TypeScript, powered by Vite, a fast build tool. It retrieves data from a public news API and displays a list of news articles. The application offers various features, including error handling, caching, pagination, favorites, and animations, following Material Design principles.

## Features

- List of news articles with titles, descriptions, and publication dates.
- Clicking on an article opens a detailed view.
- Robust error handling for internet connection issues and data retrieval failures.
- Caching mechanism to minimize API requests and enhance loading speed.
- Pagination to load more articles as users scroll down.
- Favorites functionality to mark and view favorite news articles.
- Incorporation of smooth transitions and animations following Material Design principles.
- Proper state management for loading, success, and error states.

## Technologies Used

- React with TypeScript for type-safe development.
- Material UI for applying Material Design principles to the user interface.
- Redux for state management and data flow within the application.
- Axios for making API requests to retrieve news data.
- Jest and React Testing Library for unit testing components and functions.
- Vite, a fast build tool, to set up the project quickly.

## Project Structure

- `src/components`: Contains all React components.
- `src/redux`: Manages the Redux store, actions, and reducers.
- `src/api`: Handles API requests and caching.
- `src/utils`: Utility functions used throughout the application.
- `src/tests`: Unit tests for components and functions.
- `src/assets`: Static assets like images and icons.

## Installation

Clone the repository and install the dependencies:

npm install

## Usage

create a .env file in the root directory and add your API key:

REACT_APP_API_KEY=your_api_key

Start the development server:

npm run dev

## Testing

Run unit tests:

npm run test

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

- [Edgar Chavero]