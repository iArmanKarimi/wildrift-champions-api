/**
 * JSON paths for extracting champion header data from __NEXT_DATA__.
 * These paths match the structure of:
 * __NEXT_DATA__.props.pageProps.page.blades[2].items
 * fields will be iterated over to access data.
 */
export const championHeadersJSONPath = {
	/** Array of champion entries */
	list: ["props", "pageProps", "page", "blades", 2, "items"] as const,

	/** champion["title"] */
	title: ["title"] as const,

	/** champion["action"]["payload"] — contains the champion slug endpoint */
	slug: ["action", "payload"] as const,

	/** champion["media"]["url"] — champion splash tile image */
	image: ["media", "url"] as const
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
