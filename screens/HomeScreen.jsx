import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Pressable,
	TextInput,
	Dimensions,
	Alert,
} from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useDB } from "../contexts/DatabaseContext";
import { SQLiteService } from "../modules/sqlite";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import MapView, {
	PROVIDER_GOOGLE,
	Marker,
	MarkerAnimated,
} from "react-native-maps";

export default function HomeScreen({ navigation }) {
	const [db] = useDB();
	const [data, setData] = React.useState([]);
	const bottomSheetRef = React.useRef(null);
	const snapPoints = React.useMemo(() => ["1%", "100%"], []);
	const [region, setRegion] = React.useState({
		latitude: 41.299496,
		longitude: 69.240074,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});
	const [branchName, setBranchName] = React.useState("");
	const [readyMap, setReadyMap] = React.useState(true);

	const getDatas = () => {
		getAllBranches();
	};

	React.useEffect(() => {
		getDatas();
	}, []);

	const renderItem = ({ item }) => {
		const openCategory = (e) => {
			navigation.navigate("CategoriesScreen", {
				name: item.branch_name,
				id: item.branch_id,
			});
		};

		return (
			<Pressable onPress={openCategory} style={styles.button}>
				<Text style={styles.buttonText}>{item.branch_name}</Text>
			</Pressable>
		);
	};

	const openBottomSheet = (e) => {
		console.log(bottomSheetRef.current.expand());
	};

	const submitBranch = (e) => {
		if (!branchName) {
			Alert.alert("Xatolik", "Formani to'liq to'ldiring.");
			return;
		}

		SQLiteService.insertBranch(
			db,
			branchName,
			region.latitude,
			region.longitude
		);

		getAllBranches();

		bottomSheetRef.current.close();
	};

	const getAllBranches = async () => {
		let datas = await SQLiteService.getAllBranches(db);
		setData(datas);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				style={styles.flatList}
				keyExtractor={(e) => e.branch_id}
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
						Filial qo'shish ma'lumotlarini kiriting
					</Text>
					<Input
						onChangeText={(e) => setBranchName(e)}
						placeholder="Filial nomi"
					/>
					{readyMap && (
						<MapView
							onMapReady={(e) => {
								setReadyMap(true);
							}}
							initialRegion={region}
							loadingEnabled
							provider={PROVIDER_GOOGLE}
							style={styles.map}
							onRegionChangeComplete={(e) => setRegion(e)}
						>
							<MarkerAnimated
								coordinate={region}
								title={"Siz"}
								style={styles.marker}
							/>
						</MapView>
					)}

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
