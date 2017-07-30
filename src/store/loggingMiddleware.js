const doLogging = !!console.groupCollapsed;

module.exports = (store) => (next) => (action) => {
	if (!doLogging) {
		return next(action);
	}

	console.groupCollapsed(action.type);
	console.info("action", action);

	const result = next(action);

	const state = store.getState();

	Object.keys(state).forEach((key) => {
		let value = state[key];

		if (value.toJS) {
			value = value.toJS();
		}

		console.log("state", key, value);
	});

	console.groupEnd(action.type);

	return result;
};
