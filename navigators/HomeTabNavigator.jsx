import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CashScreen from "../screens/CashScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				options={{
					title: "Filiallar || Ombor",
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							name="category"
							size={size}
							color="black"
						/>
					),
				}}
				name="HomeScreen"
				component={HomeScreen}
			/>

			<Tab.Screen
				options={{
					title: "Kassa",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="camera" size={size} color="black" />
					),
				}}
				name="CashMachineScreen"
				component={CashScreen}
			/>

			<Tab.Screen
				options={{
					title: "Tarix",
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							name="history"
							size={size}
							color="black"
						/>
					),
				}}
				name="HistoryScreen"
				component={HistoryScreen}
			/>

			<Tab.Screen
				options={{
					title: "Profil",
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							name="account-circle"
							size={size}
							color="black"
						/>
					),
				}}
				name="ProfileScreen"
				component={ProfileScreen}
			/>
		</Tab.Navigator>
	);
}
