const championItemsJSONPath = `$["_NEXT_DATA_"]["props"]["pageProps"]["page"]["blades"][2]["items"]`;

export const championsJSONPath = {
	championList: championItemsJSONPath,
	titlePath: (index: number): string =>
		`${championItemsJSONPath}[${index}]["title"]`,
	endpointPath: (index: number): string =>
		`${championItemsJSONPath}[${index}]["action"]["payload"]`,
	imageUrlPath: (index: number): string =>
		`${championItemsJSONPath}[${index}]["media"]["url"]`,
} as const;

/** For internal dev reference: structure of [media] in champion JSON
 {
	"provider": "sanity",
	"type": "image",
	"dimensions": {
	"height": 323,
	"width": 285,
	"aspectRatio": 0.8823529411764706
	},
	"url": "<img url>",
	"mimeType": "image/jpeg"
}
 */
