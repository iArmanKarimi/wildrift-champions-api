/**
 * Utility function to get a value from a JSON object using a path array.
 * @param obj JSON object we want to read from.
 * @param path an array of keys (strings or numbers) that describes how to reach the value we want
 * @returns the value at the specified path, or undefined if any key is missing
 */
export const getAtPath = <T = any>(obj: any, path: readonly (string | number)[]): T | undefined =>
	path.reduce((o, key) => (o ? o[key] : undefined), obj);
