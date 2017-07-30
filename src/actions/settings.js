// @flow

const {
	Constants: {
		actions
	}
} = require("../../ProjectData.json");

export const updateSettings= (payload) => ({
	type: actions.UPDATE_SETTINGS,
	payload
});