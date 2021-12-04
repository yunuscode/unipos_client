import "react-native-gesture-handler";

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import MainStackNavigator from "./navigators/MainStackNavigator";
import { enableScreens } from "react-native-screens";
import * as SQLite from "expo-sqlite";
import { DatabaseProvider } from "./contexts/DatabaseContext";

enableScreens();

export default function App() {
	React.useEffect(() => {});

	return <Main />;
}

function Main() {
	return (
		<NavigationContainer>
			<DatabaseProvider>
				<MainStackNavigator />
			</DatabaseProvider>
		</NavigationContainer>
	);
}
