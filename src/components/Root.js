// @flow

import React from "react";
import {
	Platform
} from "react-native";
import codePush from "react-native-code-push";
import AppContainer from "../containers/AppContainer";
import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";

const ReactNative = require("react-native");
const Provider = require("react-redux").Provider;
const { persistStore, autoRehydrate } = require("redux-persist");
const loggingMiddleware = require("../store/loggingMiddleware");
const promiseMiddleware = require("../store/promiseMiddleware");
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, thunk, loggingMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers, autoRehydrate());

persistStore(store, {
	storage: ReactNative.AsyncStorage,
	blacklist: []
});

const {
	Constants: {
		codePushKeys
	}
} = require("../../ProjectData.json");

const codePushOptions = { deploymentKey: Platform.OS === "ios" ? codePushKeys.iosStaging : codePushKeys.androidStaging };

function Root() {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
}

module.exports = codePush(codePushOptions)(Root);
