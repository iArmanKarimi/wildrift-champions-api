import type { Champion, ChampionHeader, WildRiftAPI } from './types';
import { fetchChampionHeaders } from './fetchChampionHeaders';
import { fetchChampion } from './fetchChampion';

/**
 * Implementation of the WildRift API for fetching champion data from Riot's Wild Rift.
 *
 * Provides methods to load champion headers (basic info) and full champion details.
 *
 * @example
 * const api = new WildRiftAPIImpl();
 * await api.loadChampionHeaders(); // fetch champion names and images
 * const champion = await api.fetchChampion(api.championHeaders[0]); // fetch full champion details
 * await api.loadChampions(); // fetch all champions sequentially
 * await api.loadChampionsAsync(); // fetch all champions concurrently
 */
export class WildRiftAPIImpl implements WildRiftAPI {
	/** List of champion headers (basic info: id, name, image) */
	championHeaders: ChampionHeader[] = [];

	/** List of full champion objects */
	championList: Champion[] = [];

	/**
	 * Creates a new WildRiftAPI instance.
	 * @param baseUrl - Base URL of the Wild Rift API (default: 'https://api.wildrift.com')
	 */
	constructor(private baseUrl: string = 'https://api.wildrift.com') { }

	/**
	 * Fetch all champion headers (basic info) from the API.
	 * Stores the result in `championHeaders`.
	 * @returns Array of `ChampionHeader` objects
	 */
	async loadChampionHeaders(): Promise<ChampionHeader[]> {
		this.championHeaders = await fetchChampionHeaders();
		return this.championHeaders;
	}

	/**
	 * Fetch full champion details from a given champion header.
	 * Does not store the result in the class automatically.
	 * @param champion - ChampionHeader object representing the champion
	 * @returns `Champion` object with full details
	 */
	async fetchChampion(champion: ChampionHeader): Promise<Champion> {
		return await fetchChampion(champion);
	}

	/**
	 * Fetch all champions sequentially.
	 * Stores the result in `championList`.
	 * @returns Array of `Champion` objects
	 */
	async loadChampions(): Promise<Champion[]> {
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

	/**
	 * Fetch all champions concurrently for faster loading.
	 * Stores the result in `championList`.
	 * @returns Array of `Champion` objects
	 */
	async loadChampionsAsync(): Promise<Champion[]> {
		if (this.championHeaders.length === 0) {
			await this.loadChampionHeaders();
		}

		const fetchPromises = this.championHeaders.map(async (header) => {
			try {
				return await this.fetchChampion(header);
			} catch (err) {
				console.warn(`Failed to fetch champion ${header.name}:`, err);
				return null;
			}
		});

		const champions = (await Promise.all(fetchPromises)).filter(
			(champion): champion is Champion => champion !== null
		);

		this.championList = champions;
		return champions;
	}
}

/** Default singleton instance of `WildRiftAPIImpl` */
export const wildRiftAPI = new WildRiftAPIImpl();
