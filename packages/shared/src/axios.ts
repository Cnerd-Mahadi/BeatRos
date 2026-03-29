import axios from "axios";
import axiosRetry from "axios-retry";
import logger from "./logger";

export const api = axios.create({
	validateStatus: () => true,
});

axiosRetry(api, {
	retries: 3,
	retryDelay: axiosRetry.exponentialDelay,
	retryCondition: (error) =>
		axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error),
	onRetry: (retryCount, error) => {
		logger.warn("Retrying inter-service request", {
			attempt: retryCount,
			url: error.config?.url,
			reason: error.message,
		});
	},
});
