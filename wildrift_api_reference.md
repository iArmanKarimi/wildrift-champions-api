# Wild Rift Champions API Reference

This document describes the main API for the Wild Rift Champions API library.

---

## Types

### ChampionHeader

```typescript
interface ChampionHeader {
	id: string;
	name: string;
	image_url: string;
}
```

Basic champion info.

---

### Ability

```typescript
interface Ability {
	name: string;
	icon_url: string;
	video_url: string;
	description: string;
	ability_type: AbilityType;
}
```

Represents a champion's ability.

---

### Skin

```typescript
interface Skin {
	name: string;
	image_url: string;
}
```

Represents a champion skin.

---

### Champion

```typescript
interface Champion extends ChampionHeader {
	role: string;
	skins: Skin[];
	intro_video_url: string;
	difficulty: number;
	abilities: Record<AbilityType, Ability>;
}
```

Full champion details.

---

## Functions

### fetchChampionHeaders

```typescript
fetchChampionHeaders(): Promise<ChampionHeader[]>
```

Fetches all champion headers (basic info).

---

### fetchChampion

```typescript
fetchChampion(champion: ChampionHeader): Promise<Champion>
```

Fetches full champion details from a given header.

**Throws:**

- `Error` if a network or parsing error occurs.

---

## Example Usage

```typescript
import { fetchChampionHeaders, fetchChampion } from "wildrift-champions-api";

async function example() {
	const headers = await fetchChampionHeaders();
	const ahriHeader = headers.find((c) => c.id === "ahri");
	if (ahriHeader) {
		const ahri = await fetchChampion(ahriHeader);
		console.log(ahri.name, ahri.role, ahri.abilities);
	}
}
```

---

## Error Handling

- All fetch functions throw an `Error` if a network or parsing error occurs.
- Use `try/catch` to handle errors gracefully.

---

## See Also

- [`src/types.d.ts`](./src/types.d.ts)
- [`src/fetchChampion.ts`](./src/fetchChampion.ts)
- [`src/fetchChampionHeaders.ts`](./src/fetchChampionHeaders.ts)
