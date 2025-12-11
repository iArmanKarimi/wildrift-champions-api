type AbilityType =
	| 'passive'
	| 'first'
	| 'second'
	| 'third'
	| 'ultimate';

interface Ability {
	name: string;
	icon_url: string;
	video_url: string;
	description: string;
	ability_type: AbilityType;
}
interface Skin {
	name: string;
	image_url: string;
}
declare enum ChampionDifficulty {
	Easy = 1,
	Medium,
	Hard
}

interface ChampionHeader {
	id: string;
	name: string;
	image_url: string;
}

interface Champion extends ChampionHeader {
	role: string;
	skins: Skin[];
	intro_video_url: string;
	difficulty: ChampionDifficulty;
	abilities: Record<AbilityType, Ability>;
}

export interface WildRiftAPI {
	readonly championList: Champion[];
	readonly championHeaders: ChampionHeader[];
	/** Fetch all champion headers (basic info); stored in championHeaders	*/
	loadChampionHeaders(): Promise<ChampionHeader[]>;
	/** Returns a champion. Does not automatically store in class */
	fetchChampion(champion: ChampionHeader): Promise<Champion>;
	/** Fetch all champions; stored in championList */
	loadChampions(): Promise<Champion[]>;
}
