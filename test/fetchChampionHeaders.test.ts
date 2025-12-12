import { describe, it, expect, beforeAll } from 'vitest';
import type { ChampionHeader } from '../src/types';
import { fetchChampionHeaders } from '../src/fetchChampionHeaders';
import { fetchChampion } from '../src/fetchChampion';

let headers: ChampionHeader[] = [];

beforeAll(async () => {
	headers = await fetchChampionHeaders();
});

describe('Wild Rift Champions API', () => {
	it('fetchChampionHeaders returns a non-empty array of valid ChampionHeader objects', () => {
		expect(Array.isArray(headers)).toBe(true);
		expect(headers.length).toBeGreaterThan(0);
		const champ = headers[0];
		expect(champ).toHaveProperty('id');
		expect(champ).toHaveProperty('name');
		expect(champ).toHaveProperty('image_url');
		expect(typeof champ.id).toBe('string');
		expect(typeof champ.name).toBe('string');
		expect(typeof champ.image_url).toBe('string');
		expect(champ.name.trim().length).toBeGreaterThan(0);
	});

	it('fetchChampion throws an error for invalid input', async () => {
		await expect(fetchChampion({ id: '', name: '', image_url: '' })).rejects.toThrow();
	});
});
