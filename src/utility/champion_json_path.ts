/** 
 * JSON paths for extracting champion data from __NEXT_DATA__.
 */
export const championJSONPath = {

	// -----------------------
	// CHAMPION HEADER FIELDS
	// -----------------------
	header: {
		difficultyValue: ['props', 'pageProps', 'page', 'blades', 1, 'difficulty', 'value'],
		difficultyName: ['props', 'pageProps', 'page', 'blades', 1, 'difficulty', 'name'],
		subtitle: ['props', 'pageProps', 'page', 'blades', 1, 'subtitle'],
		role: ['props', 'pageProps', 'page', 'blades', 1, 'role', 'roles', 0],
		introVideoUrl: ['props', 'pageProps', 'page', 'blades', 1, 'backdrop', 'background', 'sources', 0, 'src'],
	},

	// -----------------------
	// ABILITIES
	// -----------------------
	abilities: {
		// passive
		passiveIconUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 0, 'thumbnail', 'url'],
		passiveVideoUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 0, 'content', 'media', 'sources', 0],
		passiveName: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 0, 'label'],
		passiveDescription: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 0, 'content', 'description', 'body'],

		// Q
		qIconUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 1, 'thumbnail', 'url'],
		qVideoUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 1, 'content', 'media', 'sources', 0],
		qName: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 1, 'label'],
		qDescription: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 1, 'content', 'description', 'body'],

		// W
		wIconUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 2, 'thumbnail', 'url'],
		wVideoUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 2, 'content', 'media', 'sources', 0],
		wName: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 2, 'label'],
		wDescription: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 2, 'content', 'description', 'body'],

		// E
		eIconUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 3, 'thumbnail', 'url'],
		eVideoUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 3, 'content', 'media', 'sources', 0],
		eName: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 3, 'label'],
		eDescription: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 3, 'content', 'description', 'body'],

		// R
		rIconUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 4, 'thumbnail', 'url'],
		rVideoUrl: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 4, 'content', 'media', 'sources', 0],
		rName: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 4, 'label'],
		rDescription: ['props', 'pageProps', 'page', 'blades', 2, 'groups', 4, 'content', 'description', 'body'],
	},

	// -----------------------
	// SKINS
	// -----------------------
	skins: {
		list: ['props', 'pageProps', 'page', 'blades', 4, 'groups'], // array of skins
		single: (i: number) => ({
			name: ['props', 'pageProps', 'page', 'blades', 4, 'groups', i, 'label'],
			image: ['props', 'pageProps', 'page', 'blades', 4, 'groups', i, 'thumbnail', 'url'],
		}),
	},
} as const;
