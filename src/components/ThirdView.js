// @flow
import React, {Component} from "react";
import {
	StyleSheet,
	View,
	Button
} from "react-native";

const {
	Constants: {
		colors
	}
} = require("../../ProjectData.json");

export default class ThirdView extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Button
					onPress={() => navigation.goBack(null)}
					title="Go back"
					color={colors.evilGreen}
					accessibilityLabel="Navigate Back"
				/>
			</View>
		);
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: colors.white
	}
});
