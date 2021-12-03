import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import MainStackNavigator from "./navigators/MainStackNavigator";

export default function App() {
	const [ready, setReady] = React.useState(true);

	const loadResources = async () => {
		return true;
	};

	if (ready) {
		return <Main />;
	}
}

function Main() {
	return (
		<NavigationContainer>
			<MainStackNavigator />
		</NavigationContainer>
	);
}
