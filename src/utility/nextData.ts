/**
 * Extracts the JSON data embedded in the __NEXT_DATA__ script tag from HTML.
 * @param html The HTML string to extract from.
 * @returns The parsed JSON object.
 * @throws Error if the JSON data cannot be extracted or parsed.
 */
export function extractNextDataJson(html: string): any {
	const match = html.match(
		/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/
	);
	if (!match) {
		throw new Error("Couldn't extract champions JSON data from HTML.");
	}
	try {
		return JSON.parse(match[1]);
	} catch {
		throw new Error('Error parsing champions JSON data.');
	}
}
