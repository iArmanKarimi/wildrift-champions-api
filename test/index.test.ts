import { WildRiftAPIImpl } from '../src/index';
import { beforeAll, expect, describe, it } from 'vitest';
import { AbilityType } from '../src/types.d';
describe('WildRiftAPIImpl class', () => {
	let api: WildRiftAPIImpl;
	beforeAll(() => {
		api = new WildRiftAPIImpl();
	});

	it('loads champion headers', async () => {
		const headers = await api.loadChampionHeaders();
		expect(Array.isArray(headers)).toBe(true);
		expect(headers.length).toBeGreaterThan(0);
		expect(api.championHeaders.length).toBeGreaterThan(0);
		const champ = headers[0];
		expect(champ).toHaveProperty('id');
		expect(champ).toHaveProperty('name');
		expect(champ).toHaveProperty('image_url');
	});

	it('fetches a full champion object from a header', async () => {
		await api.loadChampionHeaders();
		const champHeader = api.championHeaders[0];
		const champ = await api.fetchChampion(champHeader);
		expect(champ).toHaveProperty('id', champHeader.id);
		expect(champ).toHaveProperty('name', champHeader.name);
		expect(champ).toHaveProperty('image_url', champHeader.image_url);
		expect(champ).toHaveProperty('role');
		expect(champ).toHaveProperty('difficulty');
		expect(champ).toHaveProperty('intro_video_url');
		expect(champ).toHaveProperty('abilities');
		expect(champ).toHaveProperty('skins');
		expect(Array.isArray(champ.skins)).toBe(true);
		expect(typeof champ.abilities).toBe('object');
	});


	it('loads all champions concurrently', async () => {
		await api.loadChampionHeaders();
		const champions = await api.loadChampionsAsync();
		expect(Array.isArray(champions)).toBe(true);
		expect(champions.length).toBeGreaterThan(0);
		expect(api.championList.length).toBeGreaterThan(0);

		for (const champ of champions) {
			expect(champ).toHaveProperty('id');
			expect(typeof champ.id).toBe('string');
			expect(champ).toHaveProperty('name');
			expect(typeof champ.name).toBe('string');
			expect(champ).toHaveProperty('image_url');
			expect(typeof champ.image_url).toBe('string');
			expect(champ).toHaveProperty('role');
			expect(typeof champ.role).toBe('string');
			expect(champ).toHaveProperty('difficulty');
			expect(typeof champ.difficulty).toBe('number');
			expect(champ).toHaveProperty('intro_video_url');
			expect(typeof champ.intro_video_url).toBe('string');
			expect(champ).toHaveProperty('abilities');
			expect(typeof champ.abilities).toBe('object');
			expect(champ).toHaveProperty('skins');
			expect(Array.isArray(champ.skins)).toBe(true);

			// Validate structure of each ability
			for (const key of ['passive', 'first', 'second', 'third', 'ultimate'] as AbilityType[]) {
				expect(champ.abilities).toHaveProperty(key);
				const ability = champ.abilities[key];
				expect(ability).toHaveProperty('name');
				expect(typeof ability.name).toBe('string');
				expect(ability).toHaveProperty('icon_url');
				expect(typeof ability.icon_url).toBe('string');
				expect(ability).toHaveProperty('video_url');
				expect(typeof ability.video_url).toBe('string');
				expect(ability).toHaveProperty('description');
				expect(typeof ability.description).toBe('string');
				expect(ability).toHaveProperty('ability_type');
				expect(typeof ability.ability_type).toBe('string');
			}

			// Validate structure of each skin
			for (const skin of champ.skins) {
				expect(skin).toHaveProperty('name');
				expect(typeof skin.name).toBe('string');
				expect(skin).toHaveProperty('image_url');
				expect(typeof skin.image_url).toBe('string');
			}
		}
	}, 20000); // 20 seconds timeout for slow networks
});
