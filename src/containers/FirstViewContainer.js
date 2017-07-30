// @flow
import { connect } from "react-redux";
import FirstView from "../components/FirstView";

const bindActionCreators = require("redux").bindActionCreators;
const userActions = require("../actions/user");
const settingsActions = require("../actions/settings");

const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => {
	const actions = {
		...userActions,
		...settingsActions
	};
	return bindActionCreators({
		...actions
	}, dispatch);
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FirstView);
