import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

export default function App() {
	const [ready, setReady] = React.useState(false);

	const loadResources = async () => {
		return await new Promise((r, e) => {
			setTimeout(() => {
				r();
			}, 4000);
		});
	};

	if (!ready) {
		return (
			<AppLoading
				startAsync={loadResources}
				onFinish={() => setReady(true)}
				onError={console.warn}
			/>
		);
	}

	if (ready) {
		return <Main />;
	}
}

function Main() {
	return (
		<NavigationContainer>
			<View style={styles.container}>
				<Text>Open up App.js to start working on your app!</Text>
				<StatusBar style="auto" />
			</View>
		</NavigationContainer>
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
