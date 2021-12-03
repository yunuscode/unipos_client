import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import CodeScreen from "../screens/CodeScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeTabNavigator from "./HomeTabNavigator";
import HomeScreen from "../screens/HomeScreen";

const MainStack = createNativeStackNavigator();

export default function MainStackNavigator() {
	return (
		<MainStack.Navigator initialRouteName="HomeTabNavigator">
			<MainStack.Screen
				options={{
					title: "Kirish",
				}}
				name="LoginScreen"
				component={LoginScreen}
			/>
			<MainStack.Screen
				options={{
					title: "Kod kiritish",
				}}
				name="CodeScreen"
				component={CodeScreen}
			/>
			<MainStack.Screen
				options={{
					title: "Ro'yxatdan o'tish",
				}}
				name="RegistrationScreen"
				component={RegistrationScreen}
			/>

			<MainStack.Screen
				options={{
					headerShown: false,
				}}
				name="HomeTabNavigator"
				component={HomeTabNavigator}
			/>
		</MainStack.Navigator>
	);
}
