import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Pressable,
	FlatList,
	ScrollView,
	Alert,
} from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useDB } from "../contexts/DatabaseContext";
import { SQLiteService } from "../modules/sqlite";
import BottomSheet from "@gorhom/bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";

// import { ScrollView } from "react-native-gesture-handler";

export default function ProductsScreen({ navigation, route }) {
	const { id } = route.params;

	const [db] = useDB();
	const [data, setData] = React.useState([]);
	const [productName, setProductName] = React.useState("");
	const [barCode, setBarCode] = React.useState("");
	const [count, setCount] = React.useState("");
	const [price, setPrice] = React.useState("");
	const [type, setType] = React.useState("");
	const [scanned, setScanned] = React.useState(false);
	const [hasPermission, setHasPermission] = React.useState(null);
	const bottomSheetRef = React.useRef(null);
	const snapPoints = React.useMemo(() => ["1%", "100%"], []);

	const getAllProducts = async () => {
		try {
			let products = await SQLiteService.getAllProducts(db, id);
			setData(products);
		} catch (error) {
			console.log("Pr", error);
		}
	};

	const openBottomSheet = (e) => {
		console.log(bottomSheetRef.current.expand());
	};

	const renderItem = ({ item }) => {
		return (
			<Pressable style={styles.button}>
				<Text style={styles.buttonText}>
					{item.product_name} ({item.product_price} so'm)
				</Text>
				<Text style={styles.countText}>
					{item.product_count} {item.product_type}
				</Text>
			</Pressable>
		);
	};

	const submitBranch = (e) => {
		bottomSheetRef.current.close();

		if (!(productName && count && barCode && price && type)) {
			Alert.alert("Xatolik", "Formani to'liq to'ldiring.");
			return;
		}

		SQLiteService.insertProduct(
			db,
			productName,
			count,
			type,
			price,
			barCode,
			id
		);

		getAllProducts();
	};

	React.useEffect(() => {
		getAllProducts();
	}, []);

	React.useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		setBarCode(data);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				style={styles.flatList}
				keyExtractor={(e) => e.product_id}
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
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Text style={styles.addBranch}>
						Mahsulot qo'shish ma'lumotlarini kiriting
					</Text>

					<BarCodeScanner
						onBarCodeScanned={
							scanned ? undefined : handleBarCodeScanned
						}
						style={styles.absoluteFillObject}
					/>

					<Input
						onChangeText={(e) => setProductName(e)}
						placeholder="Mahsulot nomi"
					/>

					<Input
						onChangeText={(e) => setBarCode(e)}
						placeholder="Barcode raqami"
						value={barCode}
						style={styles.input}
					/>

					<Input
						onChangeText={(e) => setPrice(e)}
						placeholder="Narxi"
						style={styles.input}
					/>

					<Input
						onChangeText={(e) => setCount(e)}
						placeholder="Soni"
						style={styles.input}
					/>

					<Input
						onChangeText={(e) => setType(e)}
						placeholder="O'lchov turi"
						style={styles.input}
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
				</ScrollView>
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
	absoluteFillObject: {
		width: "100%",
		height: 100,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: "red",
	},
	button: {
		padding: 16,
		borderWidth: 1,
		borderColor: "#00000077",
		marginBottom: 20,
		flexDirection: "row",
	},
	buttonText: {
		fontSize: 17,
	},
	countText: {
		fontSize: 17,
		marginLeft: "auto",
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
	},
	input: {
		marginTop: 10,
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
