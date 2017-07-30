let counter = 0;

module.exports = (store) => (next) => (action) => {
	if (!action.promise) {
		return next(action);
	}

	const id = counter++;

	next({
		...action,
		sequence: {
			type: "start",
			id
		}
	});

	action.promise.then((resp) => {
		let payload = action.payload;

		if (typeof resp === "object") {
			payload = {
				...payload,
				...resp
			};
		}

		next({
			...action,
			payload,
			sequence: {
				type: "done",
				id
			}
		});
	}).catch((error) => {
		console.warn(error.message || error);
		console.trace(error);

		next({
			...action,
			payload: error.message || error,
			error: true,
			sequence: {
				type: "done",
				id
			}
		});
	});
};
