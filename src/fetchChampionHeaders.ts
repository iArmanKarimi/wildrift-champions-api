import ky from 'ky';
import { CHAMPIONS_LIST_URL } from './utility/endpoints';
import { extractNextDataJson } from './utility/nextData';
import { championHeadersJSONPath } from './utility/champion_headers_json_path';
import { getAtPath } from "./utility/getAtPath";
import type { ChampionHeader } from './types';

/**
 * Fetches champion headers from the remote champions list URL.
 * @returns Promise resolving to an array of ChampionHeader objects.
 */
export async function fetchChampionHeaders(): Promise<ChampionHeader[]> {
	try {
		const html = await ky.get(CHAMPIONS_LIST_URL).text();
		const nextDataJson = extractNextDataJson(html);
		const items = getAtPath(nextDataJson, championHeadersJSONPath.list);

		if (!Array.isArray(items)) {
			throw new Error('Champion items not an array.');
		}

		// Map each item to a ChampionHeader object
		return items
			.map((item: any) => {
				// Extract id from the last segment of action.payload.url
				let id = undefined;
				if (item.action && item.action.payload && typeof item.action.payload.url === 'string') {
					const match = item.action.payload.url.match(/\/champions\/([^\/]+)\//);
					if (match) id = match[1];
				}
				const name = item.title;
				const image_url = item.media && item.media.url;
				if (typeof id === 'string' && typeof name === 'string' && typeof image_url === 'string') {
					return { id, name, image_url };
				}
				return null;
			})
			.filter((c): c is ChampionHeader => c !== null);
	} catch (err) {
		throw new Error(
			'Error fetching champion headers: ' +
			(err instanceof Error ? err.message : String(err))
		);
	}
}

