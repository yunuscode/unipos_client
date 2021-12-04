import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useDB } from "../contexts/DatabaseContext";
import { SQLiteService } from "../modules/sqlite";

export default function HomeScreen({ navigation }) {
	const [db] = useDB();
	const [data, setData] = React.useState([]);

	const getDatas = () => {
		SQLiteService.createTableBranches(db);
	};

	React.useEffect(() => {
		getDatas();
	}, []);

	const renderItem = ({ item }) => {
		return (
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>{item.branch_name}</Text>
			</Pressable>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				style={styles.flatList}
				keyExtractor={(e) => e.branch_id}
				renderItem={renderItem}
			/>
			<Pressable style={styles.floatButton}>
				<MaterialCommunityIcons size={34} color="white" name="plus" />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 16,
	},
	flatList: {
		height: "100%",
		width: "100%",
	},
	button: {
		padding: 16,
		borderWidth: 1,
		borderColor: "#00000077",
	},
	buttonText: {
		fontSize: 17,
	},
	floatButton: {
		position: "absolute",
		bottom: "5%",
		right: "6%",
		backgroundColor: "#222",
		padding: 10,
		borderRadius: 50,
	},
});
