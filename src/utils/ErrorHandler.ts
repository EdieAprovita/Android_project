import { AxiosError } from "axios";

interface ApiError {
	code: string;
	message: string;
}

const handleApiError = (error: AxiosError<ApiError>): void => {
	if (error.response) {
		const { status, data } = error.response;

		switch (status) {
			case 400:
				console.error(`Bad Request: ${data.message}`);
				break;
			case 401:
				console.error(`Unauthorized: ${data.message}`);
				break;
			case 429:
				console.error(`Too Many Requests: ${data.message}`);
				break;
			case 500:
				console.error(`Server Error: ${data.message}`);
				break;
			default:
				console.error(`HTTP Error: ${status} - ${data.message}`);
				break;
		}
	} else if (error.request) {
		console.error("Network Error: No response received from the server.");
	} else {
		console.error("Request Error: Unable to send the request.");
	}
};

export default handleApiError;
