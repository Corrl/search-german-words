import adapter from '@sveltejs/adapter-static';

// noinspection JSUnresolvedVariable
const production = process.env.NODE_ENV === 'production'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: production ? "/search-german-words" : ""
		}
	}
};

export default config;
