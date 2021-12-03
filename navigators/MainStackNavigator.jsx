import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

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
		</MainStack.Navigator>
	);
}
