import { combineReducers } from "redux";

const appReducers = combineReducers({
	user: require("./user"),
	settings: require("./settings")
});

export default appReducers;
