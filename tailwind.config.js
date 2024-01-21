// module.exports = {
// 	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/index.css"],
// 	darkMode: "media",
// 	theme: {
// 		extend: {},
// 	},
// 	variants: {
// 		extend: {},
// 	},
// 	plugins: [],
// };
// tailwind.config.js
module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", "./src/style.css"],
	darkMode: "media",
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	corePlugins: {
		// Include any core plugins you want to enable explicitly.
	},
	future: {
		// Default setting, omit if you don't want to enable future features.
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		// Adjust the content property based on your project structure and needs.
		content: [
			"./index.html",
			"./src/**/*.{vue,js,ts,jsx,tsx}",
			"./src/style.css",
		],
		options: {
			// Other purge options...
		},
	},
};
