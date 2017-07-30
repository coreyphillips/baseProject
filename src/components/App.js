/**
 * @flow
 */
import React, { Component } from "react";
import {
	Button,
	ScrollView,
	StyleSheet,
	AsyncStorage
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
	StackNavigator,
	TabNavigator,
} from "react-navigation";

import FirstViewContainer from "../containers/FirstViewContainer";
import SecondViewContainer from "../containers/SecondViewContainer";
import ThirdViewContainer from "../containers/ThirdViewContainer";

const {
	Constants: {
		colors
	}
} = require("../../ProjectData.json");

const FirstView = ({ navigation }) => (
	<FirstViewContainer
		navigation={navigation}
	/>
);
FirstView.navigationOptions = {
	title: "First View Title",
	headerBackTitle: null,
};

const SecondView = ({ navigation }) => (
	<SecondViewContainer
		navigation={navigation}
	/>
);
SecondView.navigationOptions = {
	title: "Second View Title",
	headerBackTitle: null,
	//The 2 options below remove the header
	headerMode: "none",
	header: null
};

const ThirdView = ({ navigation }) => (
	<ThirdViewContainer
		navigation={navigation}
	/>
);
ThirdView.navigationOptions = {
	title: "Third View Title",
	headerBackTitle: null,
	visible: false
};


const MainTab = StackNavigator({
	FirstView: {
		screen: FirstView,
		navigationOptions: {
			title: "First View",
		}
	},
	SecondView: {
		screen: SecondView,
		navigationOptions: {
			title: "Second View",
		},
	}
});

const SecondTab = StackNavigator({
	SecondView: {
		screen: SecondView,
		navigationOptions: {
			title: "Second View",
		},
	},
	ThirdView: {
		screen: ThirdView,
		navigationOptions: {
			title: "Third View",
		},
	}
});

const StacksInTabs = TabNavigator({
	MainTab: {
		screen: MainTab,
		path: "/",
		navigationOptions: {
			tabBarLabel: "First View",
			tabBarIcon: ({ tintColor, focused }) => (
				<Ionicons
					name={focused ? "ios-home" : "ios-home-outline"}
					size={26}
					style={{ color: tintColor }}
				/>
			),
		}
	},
	SecondTab: {
		screen: SecondTab,
		navigationOptions: {
			tabBarLabel: "Second View",
			tabBarIcon: ({ tintColor, focused }) => (
				<Ionicons
					name={focused ? "ios-settings" : "ios-settings-outline"}
					size={26}
					style={{ color: tintColor }}
				/>
			),
		}
	},
}, {
	tabBarPosition: "bottom",
	animationEnabled: true,
	swipeEnabled: true
});

module.exports = class App extends Component {

	_setItem(key, value) {
		try {
			AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log(error);
		}
	}

	_getSettings() {
		//Set app environment
	}

	componentDidMount() {
		this._getSettings();
	}

	render() {
		return(
			<StacksInTabs />
		)
	}

};