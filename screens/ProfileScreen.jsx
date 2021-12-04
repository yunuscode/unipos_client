import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { ProgressChart } from "react-native-chart-kit";

export default function ProfileScreen({ navigation }) {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.wrappersWrapper}>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>Umumiy ma'lumotlar:</Text>
					<Text>500 ta</Text>
				</View>
			</View>
			<ProgressChart
				data={[0.4, 0.6, 0.8]}
				chartConfig={{
					backgroundColor: "#00000022",
					backgroundGradientFrom: "#000000",
					backgroundGradientTo: "#00000066",

					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
				}}
				width={Dimensions.get("screen").width}
				height={220}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 16,
	},
	buttonText: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "500",
		fontSize: 17,
	},
	statsTitle: {
		fontSize: 14,
		fontWeight: "bold",
	},
	wrapper: {
		padding: 10,
		width: "49%",
		backgroundColor: "#00000022",
	},
	wrappersWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
