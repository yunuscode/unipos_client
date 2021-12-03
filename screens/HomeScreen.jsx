import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

export default function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<MaterialCommunityIcons
				size={25}
				color="black"
				name="ab-testing"
				style={{
					borderWidth: 1,
					borderColor: "red",
				}}
			/>
			<Text>test</Text>
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
