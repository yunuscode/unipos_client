import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../components/Input/Input";

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Input placeholder="Telefon raqamingiz" />
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
