import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input(props) {
	return <TextInput {...props} style={styles.input} />;
}

const styles = StyleSheet.create({
	input: {
		padding: 16,
		fontSize: 17,
		backgroundColor: "white",
		width: "100%",
		borderColor: "#BFBBBB",
		borderWidth: 1,
	},
});
