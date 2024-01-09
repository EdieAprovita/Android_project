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
