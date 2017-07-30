// @flow
import React, {Component} from "react";
import {
	StyleSheet,
	Button,
	View
} from "react-native";

const {
	Constants: {
		colors
	}
} = require("../../ProjectData.json");

export default class FirstView extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Button
					onPress={() => navigate("SecondTab", { testData: "Example of How To Pass Data To Next View" })}
					title="Navigate To Second View"
					color={colors.evilGreen}
					style={{ borderColor: colors.evilGreen, borderWidth: 1 }}
					accessibilityLabel="Navigate To Second View"
				/>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: colors.white
	}
});
