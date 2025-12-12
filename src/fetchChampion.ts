import type { Champion, ChampionHeader, Ability, AbilityType, Skin } from './types';
import { getAtPath } from './utility/getAtPath';
import { extractNextDataJson } from './utility/nextData';
import { championJSONPath } from './utility/champion_json_path';
import { fetchChampionData } from './utility/fetchChampionData';



/**
 * Fetch a full champion object from its ChampionHeader.
 */
export async function fetchChampion(champion: ChampionHeader): Promise<Champion> {
	const html: string = await fetchChampionData(champion);
	const nextData = extractNextDataJson(html);

	// -------------------
	// ROLE
	// -------------------
	const role = getAtPath<string>(nextData, championJSONPath.header.role) ?? 'Unknown';

	// -------------------
	// DIFFICULTY
	// -------------------
	let difficultyValue = getAtPath<number>(nextData, championJSONPath.header.difficultyValue);
	const difficultyName = getAtPath<string>(nextData, championJSONPath.header.difficultyName);

	if (!difficultyValue && difficultyName) {
		const map: Record<string, number> = { Easy: 1, Medium: 2, Hard: 3 };
		difficultyValue = map[difficultyName] ?? 1;
	}
	const difficulty = difficultyValue ?? 1;

	// -------------------
	// INTRO VIDEO
	// -------------------
	const intro_video_url = getAtPath<string>(nextData, championJSONPath.header.introVideoUrl) ?? '';

	// -------------------
	// ABILITIES
	// -------------------
	const abilityOrder: AbilityType[] = ['passive', 'first', 'second', 'third', 'ultimate'];
	const abilityPaths: Record<AbilityType, { name: readonly (string | number)[], description: readonly (string | number)[], icon: readonly (string | number)[], video: readonly (string | number)[] }> = {
		passive: {
			name: championJSONPath.abilities.passiveName,
			description: championJSONPath.abilities.passiveDescription,
			icon: championJSONPath.abilities.passiveIconUrl,
			video: championJSONPath.abilities.passiveVideoUrl
		},
		first: {
			name: championJSONPath.abilities.qName,
			description: championJSONPath.abilities.qDescription,
			icon: championJSONPath.abilities.qIconUrl,
			video: championJSONPath.abilities.qVideoUrl
		},
		second: {
			name: championJSONPath.abilities.wName,
			description: championJSONPath.abilities.wDescription,
			icon: championJSONPath.abilities.wIconUrl,
			video: championJSONPath.abilities.wVideoUrl
		},
		third: {
			name: championJSONPath.abilities.eName,
			description: championJSONPath.abilities.eDescription,
			icon: championJSONPath.abilities.eIconUrl,
			video: championJSONPath.abilities.eVideoUrl
		},
		ultimate: {
			name: championJSONPath.abilities.rName,
			description: championJSONPath.abilities.rDescription,
			icon: championJSONPath.abilities.rIconUrl,
			video: championJSONPath.abilities.rVideoUrl
		}
	};

	const abilities: Record<AbilityType, Ability> = {} as any;
	abilityOrder.forEach(type => {
		const paths = abilityPaths[type];
		abilities[type] = {
			name: getAtPath<string>(nextData, paths.name) ?? 'Unknown',
			description: getAtPath<string>(nextData, paths.description) ?? '',
			icon_url: getAtPath<string>(nextData, paths.icon) ?? '',
			video_url: getAtPath<string>(nextData, paths.video) ?? '',
			ability_type: type
		};
	});

	// -------------------
	// SKINS
	// -------------------
	const skinGroups = getAtPath<any[]>(nextData, championJSONPath.skins.list) ?? [];
	const skins: Skin[] = skinGroups.map((_, i) => ({
		name: getAtPath<string>(nextData, championJSONPath.skins.single(i).name) ?? `Skin ${i + 1}`,
		image_url: getAtPath<string>(nextData, championJSONPath.skins.single(i).image) ?? ''
	}));

	// -------------------
	// FINAL OBJECT
	// -------------------
	return {
		id: champion.id,
		name: champion.name,
		image_url: champion.image_url,
		role,
		difficulty,
		intro_video_url,
		abilities,
		skins
	};
}
