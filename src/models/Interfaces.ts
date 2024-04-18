export interface State<T> {
	loading: boolean;
	data: T | null;
	error: string | null;
	totalPages?: number;
}

export type NewsState = State<NewsArticle[]>;
export type TopsNewsState = State<NewsArticle[]>;
export type FavoritesNewsState = State<NewsArticle[]>;

export interface NewsApiRequestParams {
	apiKey: string;
	q: string;
	searchIn?: string;
	sources?: string;
	domains?: string;
	excludeDomains?: string;
	from?: string;
	to?: string;
	language?: string;
	sortBy?: "relevancy" | "popularity" | "publishedAt";
	pageSize?: number;
	page?: number;
}

export interface NewsApiResponse {
	status: "ok" | "error";
	totalResults: number;
	articles: NewsArticle[];
}

export interface NewsArticle {
	source: {
		id: string;
		name: string;
	};
	author: string;
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
}

export interface TopHeadlinesApiRequestParams {
	apiKey: string;
	country?: string;
	category?:
		| "business"
		| "entertainment"
		| "general"
		| "health"
		| "science"
		| "sports"
		| "technology";
	sources?: string;
	q?: string;
	pageSize?: number;
	page?: number;
}

export interface GeneralNewsState {
	loading: boolean;
	news: NewsArticle[] | null;
	error: string | null;
}

export interface TopNewsState {
	loading: boolean;
	topNews: NewsArticle[] | null;
	error: string | null;
}

export interface FavoriteNewsState {
	favoriteNews: NewsArticle[];
}

export interface ApiError {
	code: string;
	message: string;
}
