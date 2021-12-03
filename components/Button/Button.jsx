import React from "react";
import { Pressable, StyleSheet } from "react-native";

export default function Button(props) {
	return (
		<Pressable
			{...props}
			style={{
				...styles.input,
				...props.style,
			}}
		>
			{() => props.children}
		</Pressable>
	);
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
