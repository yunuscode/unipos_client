import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

export default function RegistrationScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Input
				style={styles.input}
				placeholder="Brendingiz nomi"
				keyboard="numpad"
			/>
			<Input
				style={styles.input}
				placeholder="Ismingiz"
				keyboard="numpad"
			/>

			<Button style={styles.button}>
				<Text style={styles.buttonText}>Ro'yxatdan o'tish</Text>
			</Button>
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
	button: {
		marginTop: 20,
		backgroundColor: "#000000",
	},
	input: {
		marginVertical: 10,
	},
	buttonText: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "500",
		fontSize: 17,
	},
});
