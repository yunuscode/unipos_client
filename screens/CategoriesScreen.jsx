import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Pressable, FlatList } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useDB } from "../contexts/DatabaseContext";
import { SQLiteService } from "../modules/sqlite";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function CategoriesScreen({ navigation, route }) {
	const { id } = route.params;

	const [db] = useDB();
	const [data, setData] = React.useState([]);
	const [categoryName, setCategoryName] = React.useState("");
	const bottomSheetRef = React.useRef(null);
	const snapPoints = React.useMemo(() => ["1%", "100%"], []);

	const getAllCategories = async () => {
		try {
			let categories = await SQLiteService.getAllCategories(db, id);
			setData(categories);
		} catch (error) {
			console.log(error);
		}
	};

	const openBottomSheet = (e) => {
		console.log(bottomSheetRef.current.expand());
	};

	const renderItem = ({ item }) => {
		return (
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>{item.category_name}</Text>
			</Pressable>
		);
	};

	const submitBranch = (e) => {
		bottomSheetRef.current.close();

		if (!categoryName) {
			Alert.alert("Xatolik", "Formani to'liq to'ldiring.");
			return;
		}

		SQLiteService.insertCategory(db, categoryName, id);

		getAllCategories();
	};

	React.useEffect(() => {
		getAllCategories();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				style={styles.flatList}
				keyExtractor={(e) => e.category_id}
				renderItem={renderItem}
			/>
			<Pressable onPress={openBottomSheet} style={styles.floatButton}>
				<MaterialCommunityIcons size={34} color="white" name="plus" />
			</Pressable>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				enableOverDrag={false}
			>
				<BottomSheetScrollView
					contentContainerStyle={styles.contentContainer}
				>
					<Text style={styles.addBranch}>
						Kategoriya qo'shish ma'lumotlarini kiriting
					</Text>
					<Input
						onChangeText={(e) => setCategoryName(e)}
						placeholder="Kategoriya nomi"
					/>

					<Pressable onPress={submitBranch} style={styles.addButton}>
						<Text style={styles.addButtonText}>Qo'shish</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							bottomSheetRef.current.close();
						}}
						style={styles.addButton}
					>
						<Text style={styles.addButtonText}>Bekor qilish</Text>
					</Pressable>
				</BottomSheetScrollView>
			</BottomSheet>
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
		marginBottom: 20,
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
	addBranch: {
		textAlign: "center",
		fontSize: 17,
		marginBottom: 15,
		fontWeight: "600",
	},
	contentContainer: {
		padding: 16,
		flex: 1,
	},
	map: {
		minWidth: "100%",
		width: "100%",
		height: "50%",
		minHeight: 200,
		marginTop: 20,
	},
	addButton: {
		padding: 20,
		width: "100%",
		backgroundColor: "#000000",
		marginTop: 10,
	},
	addButtonText: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "600",
		fontSize: 17,
	},
});
