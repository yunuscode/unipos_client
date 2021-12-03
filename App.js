import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import MainStackNavigator from "./navigators/MainStackNavigator";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
	return <Main />;
}

function Main() {
	return (
		<NavigationContainer>
			<MainStackNavigator />
		</NavigationContainer>
	);
}
