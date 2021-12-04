import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button/Button";

export default function CategoriesScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.buttonText}>Tasdiqlash</Text>
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
});
