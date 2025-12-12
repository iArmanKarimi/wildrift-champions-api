const LANG = "en_us" as const;
const BASE_URL = `https://wildrift.leagueoflegends.com` as const;
const CHAMPIONS_PATH = "champions" as const;
export const CHAMPIONS_LIST_URL = `${BASE_URL}/${CHAMPIONS_PATH}` as const;
/**
 * Construct a champion page URL from a slug
 * @param slug - champion slug (e.g., "yasuo", "master-yi")
 */
export const constructChampionUrl = (slug: string): string =>
	`${CHAMPIONS_LIST_URL}/${slug}`;
