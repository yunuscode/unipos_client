import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import CodeScreen from "../screens/CodeScreen";

const MainStack = createNativeStackNavigator();

export default function MainStackNavigator() {
	return (
		<MainStack.Navigator>
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
		</MainStack.Navigator>
	);
}
