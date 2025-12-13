# Wild Rift Champions API

A lightweight **TypeScript** library for fetching **League of Legends: Wild Rift** champion data directly from Riot’s public web endpoints — **no API key required**.

---

## 🚀 Features

- **Fetch all champion headers**
  - ID, name, image URL
- **Fetch a single champion's full details**
  - Role, difficulty
  - Full abilities (name, description, icon, video)
  - Skins (name, image)
  - Intro video
- Strongly-typed responses via [`types.d.ts`](./src/types.d.ts)
- Zero dependencies
- Works in **Node.js** and browsers

---

## 📦 Installation

```bash
npm install @wildrift/champions-api
```

or

```bash
yarn add @wildrift/champions-api
```

---

## 🛠️ Usage

### Fetch all champion headers

```typescript
import { fetchChampionHeaders } from "wildrift-champions-api";

const headers = await fetchChampionHeaders();
console.log(headers);
```

---

### Fetch full champion details

```typescript
import { fetchChampionHeaders, fetchChampion } from "wildrift-champions-api";

const headers = await fetchChampionHeaders();
const garen_header = headers.find((champ) => champ.name === "garen");
if (garen_header) {
	const garen = await fetchChampion(garen_header);
	console.log(garen);
}
```

---

## 🧩 Types

See [`wildrift_api_reference.md`](./wildrift_api_reference.md) or [`src/types.d.ts`](./src/types.d.ts) for all types.

---

## 🛠 API

### `fetchChampionHeaders(): Promise<ChampionHeader[]>`

Fetch all champion headers (basic info).

### `fetchChampion(champion: ChampionHeader): Promise<Champion>`

Fetch full champion details from a given header.

> All fetch functions throw an `Error` if a network or parsing error occurs. Use `try/catch` to handle errors gracefully.

---

## 🧪 Example

```typescript
import { fetchChampionHeaders, fetchChampion } from "wildrift-champions-api";

async function printFirstChampion() {
	const headers = await fetchChampionHeaders();
	if (headers.length > 0) {
		const champ = await fetchChampion(headers[0]);
		console.log(champ.name, champ.role, champ.abilities);
	}
}

printFirstChampion();
```

---

## 🧩 TypeScript Types

```typescript
interface ChampionHeader {
	id: string;
	name: string;
	image_url: string;
}

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

interface Champion extends ChampionHeader {
	role: string;
	skins: Skin[];
	intro_video_url: string;
	difficulty: number;
	abilities: Record<AbilityType, Ability>;
}
```

---

## 🍷 Build

```bash
npm run build
```

Outputs ESM & CJS bundles.

---

## 📜 License

MIT © Arman
