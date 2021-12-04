import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

export default function HistoryScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.buttonText}>Kirish</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},
	buttonText: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "500",
		fontSize: 17,
	},
});
