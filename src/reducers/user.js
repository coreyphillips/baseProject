// @flow weak
const guid = require("../utils/guid");
const {
	Constants: {
		actions
	}
} = require("../../ProjectData.json");

module.exports = (state = {
	firstName: "",
	lastName: "",
	department: "",
	email: "",
	phone: "",
	loggedIn: false,
	loginTime: 0,
	sessionId: "",
	loading: false,
	error: false,
	errorMsg: ""
}, action) => {
	switch (action.type) {

		case actions.UPDATE_USER:
			return {
				...state,
				...action.payload
			};

		case actions.RESET || actions.USER_RESET:
			return {
				firstName: "",
				lastName: "",
				department: "",
				email: "",
				phone: "",
				loggedIn: false,
				loginTime: 0,
				sessionId: "",
				loading: false,
				error: false,
				errorMsg: ""
			};

		default:
			return state;
	}
};
