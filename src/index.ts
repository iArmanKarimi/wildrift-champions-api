import type { Champion, ChampionHeader, WildRiftAPI } from './types';
import { fetchChampionHeaders } from './fetchChampionHeaders';
import { fetchChampion } from './fetchChampion';

export class WildRiftAPIImpl implements WildRiftAPI {
	championHeaders: ChampionHeader[] = [];
	championList: Champion[] = [];

	constructor(private baseUrl: string = 'https://api.wildrift.com') { }

	/** Fetch all champion headers (basic info); stored in championHeaders */
	async loadChampionHeaders(): Promise<ChampionHeader[]> {
		this.championHeaders = await fetchChampionHeaders();
		return this.championHeaders;
	}

	/** Returns a champion. Does not automatically store in class */
	async fetchChampion(champion: ChampionHeader): Promise<Champion> {
		return await fetchChampion(champion);
	}

	/** Fetch all champions; stored in championList */
	async loadChampions(): Promise<Champion[]> {
		// Ensure headers are loaded
		if (this.championHeaders.length === 0) {
			await this.loadChampionHeaders();
		}

		const champions: Champion[] = [];
		for (const header of this.championHeaders) {
			try {
				const champion = await this.fetchChampion(header);
				champions.push(champion);
			} catch (err) {
				console.warn(`Failed to fetch champion ${header.name}:`, err);
			}
		}

		this.championList = champions;
		return champions;
	}

	/** Fetch all champions concurrently; stored in championList */
	async loadChampionsAsync(): Promise<Champion[]> {
		// Ensure headers are loaded
		if (this.championHeaders.length === 0) {
			await this.loadChampionHeaders();
		}

		// Map headers to fetch promises
		const fetchPromises = this.championHeaders.map(async (header) => {
			try {
				return await this.fetchChampion(header);
			} catch (err) {
				console.warn(`Failed to fetch champion ${header.name}:`, err);
				return null; // fallback for failed fetch
			}
		});

		// Wait for all fetches
		const champions = (await Promise.all(fetchPromises)).filter(
			(champion): champion is Champion => champion !== null
		);

		this.championList = champions;
		return champions;
	}
}

export const wildRiftAPI = new WildRiftAPIImpl();
