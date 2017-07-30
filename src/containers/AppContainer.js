// @flow
const connect = require("react-redux").connect;
const App = require("../components/App");
const bindActionCreators = require("redux").bindActionCreators;
const settingsActions = require("../actions/settings");
const userActions = require("../actions/user");

const mapStateToProps = ({ ...state }, props) => ({
	...state
});

const mapDispatchToProps = (dispatch) => {
	const actions = {
		...settingsActions,
		...userActions
	};
	return bindActionCreators({
		...actions
	}, dispatch);
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
