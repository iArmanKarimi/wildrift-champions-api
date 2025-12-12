# WildRift API – Developer Reference

A TypeScript library to fetch **League of Legends: Wild Rift** champion data.

---

## **Table of Contents**

1. [Types & Enums](#types--enums)
2. [WildRiftAPI](#wildriftapi)
   - [loadChampionHeaders()](#loadchampionheaders)
   - [fetchChampion()](#fetchchampion)
   - [loadChampions()](#loadchampions)
3. [Example Usage](#example-usage)
4. [Sample Data Shapes](#sample-data-shapes)

---

## **Types & Enums**

```ts
/** Types of champion abilities */
export type AbilityType = "passive" | "first" | "second" | "third" | "ultimate";

/** Champion ability */
export interface Ability {
	name: string;
	icon_url: string; // ability icon image URL
	video_url: string; // ability video URL
	description: string;
	ability_type: AbilityType;
}

/** Champion skin */
export interface Skin {
	name: string;
	image_url: string;
}

/** Difficulty of a champion */
export enum ChampionDifficulty {
	Easy = 1,
	Medium,
	Hard,
}

/** Basic info of a champion */
export interface ChampionHeader {
	id: string; // unique champion ID
	name: string; // champion name
	image_url: string; // champion icon URL
}

/** Full champion details */
export interface Champion extends ChampionHeader {
	role: string; // champion role (e.g., "Fighter", "Mage")
	skins: Skin[]; // available skins
	intro_video_url: string; // champion introduction video
	difficulty: ChampionDifficulty; // champion difficulty
	abilities: Record<AbilityType, Ability>; // abilities mapped by type
}
```

---

## **WildRiftAPI Interface**

Defines the main API for fetching champions.

```ts
export interface WildRiftAPI {
	readonly championList: Champion[];
	readonly championHeaders: ChampionHeader[];

	/** Fetch all champion headers (basic info); stored in championHeaders */
	loadChampionHeaders(): Promise<ChampionHeader[]>;

	/** Returns a champion. Does not automatically store in class */
	fetchChampion(champion: ChampionHeader): Promise<Champion>;

	/** Fetch all champions; stored in championList */
	loadChampions(): Promise<Champion[]>;
}
```

---

## **WildRiftAPIImpl Class**

Implements the `WildRiftAPI` interface.

```ts
class WildRiftAPIImpl implements WildRiftAPI {
	championHeaders: ChampionHeader[] = [];
	championList: Champion[] = [];

	constructor(baseUrl?: string);

	loadChampionHeaders(): Promise<ChampionHeader[]>;
	fetchChampion(champion: ChampionHeader): Promise<Champion>;
	loadChampions(): Promise<Champion[]>;
}
```

### **loadChampionHeaders()**

Fetch all champion headers and store in `championHeaders`.

```ts
const headers = await wildRiftAPI.loadChampionHeaders();
console.log(headers);
/*
[
	{ id: 'zed', name: 'Zed', image_url: 'https://...' },
	...
]
*/
```

Returns: `Promise<ChampionHeader[]>`

---

### **fetchChampion(champion: ChampionHeader)**

Fetch full champion details. Does **not** store in `championList`.

```ts
const champion = await wildRiftAPI.fetchChampion(headers[0]);
console.log(champion);
/*
{
	id: 'zed',
	name: 'Zed',
	role: 'Assassin',
	skins: [...],
	intro_video_url: 'https://...',
	difficulty: 3,
	abilities: {
		passive: {...},
		first: {...},
		second: {...},
		third: {...},
		ultimate: {...}
	}
}
*/
```

Returns: `Promise<Champion>`

---

### **loadChampions()**

Fetch all champions sequentially. Stores result in `championList`.

```ts
await wildRiftAPI.loadChampions();
console.log(wildRiftAPI.championList.length); // total champions
```

Returns: `Promise<Champion[]>`

---

## **Example Usage**

```ts
import { wildRiftAPI } from "./WildRiftAPI";

(async () => {
	await wildRiftAPI.loadChampionHeaders();
	const zed = await wildRiftAPI.fetchChampion(wildRiftAPI.championHeaders[0]);
	await wildRiftAPI.loadChampions();
})();
```

---

## **Sample Data Shapes**

### **ChampionHeader**

```json
{
	"id": "zed",
	"name": "Zed",
	"image_url": "https://example.com/zed.png"
}
```

### **Champion**

```json
{
	"id": "zed",
	"name": "Zed",
	"role": "Assassin",
	"skins": [
		{ "name": "Shockblade Zed", "image_url": "https://..." }
	],
	"intro_video_url": "https://example.com/zed_intro.mp4",
	"difficulty": 3,
	"abilities": {
		"passive": { "name": "Contempt for the Weak", "icon_url": "...", "video_url": "...", "description": "...", "ability_type": "passive" },
		"first": { ... },
		"second": { ... },
		"third": { ... },
		"ultimate": { ... }
	},
	"image_url": "https://example.com/zed.png"
}
```
