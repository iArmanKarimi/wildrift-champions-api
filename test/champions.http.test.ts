import { WildRiftAPIImpl } from '../src/index';
import { expect, describe, it } from 'vitest';

const api = new WildRiftAPIImpl();
const headers = await api.loadChampionHeaders();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Champion HTTP Request', () => {
	headers.forEach((header) => {
		it.concurrent(`fetches champion data for ${header.name}`, async () => {
			const champ = await api.fetchChampion(header);
			expect(champ).toHaveProperty('id', champ.id);
			expect(champ).toHaveProperty('name', champ.name);
			expect(champ).toHaveProperty('image_url', champ.image_url);
			expect(champ).toHaveProperty('role');
			expect(champ).toHaveProperty('difficulty');
			expect(champ).toHaveProperty('intro_video_url');
			expect(champ).toHaveProperty('abilities');
			expect(champ).toHaveProperty('skins');
			const sec = 1000;
			await sleep(sec / headers.length);
		}, 50e3);
	});
}, 2 * 60e3);
