import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
