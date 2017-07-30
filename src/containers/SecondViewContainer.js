// @flow
import { connect } from "react-redux";
import SecondView from "../components/SecondView";

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
)(SecondView);
