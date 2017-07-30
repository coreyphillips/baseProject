// @flow weak
const {
	Constants: {
		actions
	}
} = require("../../ProjectData.json");

module.exports = (state = {
	environment: "",
	loading: false,
	error: false,
	errorMsg: ""
}, action) => {
	switch (action.type) {

		case actions.UPDATE_ENVIRONMENT:
			return {
				...state,
				...action.payload
			};

		case actions.RESET || actions.SETTINGS_RESET:
			return {
				environment: "",
				loading: false,
				error: false,
				errorMsg: ""
			};

		default:
			return state;
	}
};
