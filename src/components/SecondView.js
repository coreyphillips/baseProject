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

export default class SecondView extends Component {
	render() {
		const { navigation } = this.props;
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Button
					onPress={() => navigate("ThirdView", { testData: "Example of How To Pass Data To Next View" })}
					title="Navigate To Third View"
					color={colors.evilGreen}
					accessibilityLabel="Navigate To Third View"
				/>
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
