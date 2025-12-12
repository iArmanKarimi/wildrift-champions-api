import { describe, it, expect, beforeAll } from 'vitest';
import { fetchChampion } from '../src/fetchChampion';
import { Champion, ChampionDifficulty } from '../src/types.d';

const id = 'zed';
const name = 'Zed';
const IMG_URL = 'img_url';
const championHeader = { id, name, image_url: IMG_URL };
const champion = Object.assign({
	role: 'ASSASSIN',
	skins_name: 'shockblade zed',
	difficulty: ChampionDifficulty.Hard,
	ultimate_ability: {
		name: 'death mark',
		description: 'zed becomes untargetable'
	},
}, championHeader);

describe('fetchChampion()', () => {
	let champ: Champion;

	beforeAll(async () => {
		champ = await fetchChampion(championHeader)
	});

	it('should fetch champion data', async () => {
		expect(champ).toBeDefined();
		expect(champ.name).toBe('Zed');
	});

	it('should fetch champion `role` correctly', async () => {
		expect(champ).toBeDefined();
		expect(typeof champ.role).toBe('string');
		expect(champ.role.length).toBeGreaterThan(0);
		expect(champ.role).toBe('ASSASSIN');
	});

	it('should fetch `difficulty` correctly', async () => {
		expect(champ).toBeDefined();
		expect(champ.difficulty).toBe(ChampionDifficulty.Hard);
	});

	it('should fetch `abilities` with correct structure', async () => {
		expect(champ).toBeDefined();
		expect(champ.abilities).toBeDefined();
		expect(champ.abilities).toHaveProperty('passive');
		expect(champ.abilities).toHaveProperty('first');
		expect(champ.abilities).toHaveProperty('second');
		expect(champ.abilities).toHaveProperty('third');
		expect(champ.abilities).toHaveProperty('ultimate');
		expect(champ.abilities.passive).toHaveProperty('name');
		expect(champ.abilities.passive).toHaveProperty('description');
		expect(champ.abilities.passive).toHaveProperty('icon_url');
		expect(champ.abilities.passive).toHaveProperty('video_url');
		expect(champ.abilities.ultimate.name.length).toBeGreaterThan(0);
		expect(champ.abilities.ultimate.name.toLocaleLowerCase()).toBe(champion.ultimate_ability.name);
		expect(champ.abilities.ultimate.description.toLocaleLowerCase()).includes(champion.ultimate_ability.description);
	});

	it('should fetch `skins` with correct structure', async () => {
		expect(champ).toBeDefined();
		expect(champ.skins).toBeInstanceOf(Array);
		expect(champ.skins[0]).toHaveProperty('name');
		expect(champ.skins[0]).toHaveProperty('image_url');
		const skin = champ.skins.find(skin =>
			skin.name.toLowerCase() === champion.skins_name
		);
		expect(skin).toBeDefined();
		expect(skin?.name).toBeDefined();
		expect(skin?.image_url).toBeDefined();
	});

	it('should fetch `intro video URL`', async () => {
		expect(champ).toBeDefined();
		expect(champ.intro_video_url).toBeDefined();
		expect(typeof champ.intro_video_url).toBe('string');
	});
});
