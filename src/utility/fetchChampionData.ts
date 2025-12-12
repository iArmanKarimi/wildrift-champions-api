import ky from "ky";
import { ChampionHeader } from "../types";
import { constructChampionUrl } from "./endpoints";

export async function fetchChampionData(champion: ChampionHeader) {
	try {
		const response = await ky.get(constructChampionUrl(champion.id), {
			timeout: 10000, // 10 seconds timeout
			retry: {
				limit: 3,
				methods: ['get'],
				statusCodes: [408, 413, 429, 500, 502, 503, 504],
			},
		});
		return await response.text();
	} catch (error: any) {
		if (error.name === 'HTTPError') {
			const status = error.response?.status;
			throw new Error(`Failed to fetch champion data: HTTP error with status ${status}`);
		} else if (error.name === 'TimeoutError') {
			throw new Error('Failed to fetch champion data: Request timed out');
		} else if (error.name === 'NetworkError') {
			throw new Error('Failed to fetch champion data: Network error occurred');
		} else {
			throw new Error(`Failed to fetch champion data: ${error.message || 'Unknown error'}`);
		}
	}
}
