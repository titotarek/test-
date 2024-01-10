module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/default",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
};
