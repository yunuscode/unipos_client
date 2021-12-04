import React from "react";
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	ScrollView,
	Pressable,
	Alert,
} from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { BarChart } from "react-native-chart-kit";
import { SQLiteService } from "../modules/sqlite";
import { useDB } from "../contexts/DatabaseContext";
import FetchService from "../services/FetchService";

export default function ProfileScreen({ navigation }) {
	const [db] = useDB();

	const [allDataCount, setAllDataCount] = React.useState({
		TOTAL_COUNT: 0,
		SYNCED_COUNT: 0,
	});
	const [branchesCount, setBranchesCount] = React.useState({
		TOTAL_COUNT: 0,
		SYNCED_COUNT: 0,
	});
	const [categoriesCount, setCategoriesCount] = React.useState({
		TOTAL_COUNT: 0,
		SYNCED_COUNT: 0,
	});
	const [productsCount, setProductsCount] = React.useState({
		TOTAL_COUNT: 0,
		SYNCED_COUNT: 0,
	});

	const getAll = async () => {
		let [products] = await SQLiteService.getProductsCount(db);
		let [branches] = await SQLiteService.getBranchesCount(db);
		let [categories] = await SQLiteService.getCategoriesCount(db);

		setProductsCount(products);
		setBranchesCount(branches);
		setCategoriesCount(categories);

		setAllDataCount({
			SYNCED_COUNT:
				products.SYNCED_COUNT +
				categories.SYNCED_COUNT +
				branches.SYNCED_COUNT,
			TOTAL_COUNT:
				products.TOTAL_COUNT +
				categories.TOTAL_COUNT +
				branches.TOTAL_COUNT,
		});
	};

	const syncBranches = async () => {
		try {
			const branches = await SQLiteService.getAllBranches(db, true);

			const upload = await FetchService.syncBranches(branches);

			await SQLiteService.setSynced(db, "branches", "branch_sync");
		} catch (error) {
			console.log(error);
		}
	};

	const syncCategories = async () => {
		try {
			const categories =
				await SQLiteService.getAllCategoriesWithoutBranch(db);

			const upload = await FetchService.syncCategories(categories);

			await SQLiteService.setSynced(db, "categories", "category_sync");
		} catch (error) {
			console.log(error);
		}
	};

	const syncProducts = async () => {
		try {
			const products = await SQLiteService.getAllProductsWithoutBranch(
				db
			);

			const upload = await FetchService.syncProducts(products);

			await SQLiteService.setSynced(db, "products", "product_sync");
		} catch (error) {
			console.log(error);
		}
	};

	const sync = async () => {
		try {
			await syncBranches();
			await syncCategories();
			await syncProducts();
		} finally {
			Alert.alert(
				"So'rov tugadi",
				"Barcha ma'lumotlar bazaga muvaffaqiyatli yuklandi"
			);
		}
	};

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			getAll();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Pressable onPress={sync} style={styles.syncButton}>
				<Text style={styles.syncText}>Sinxronizatsiya qilish</Text>
			</Pressable>
			<View style={styles.wrappersWrapper}>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>Umumiy ma'lumotlar:</Text>
					<Text style={styles.statsText}>
						{allDataCount?.TOTAL_COUNT}
					</Text>
				</View>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>
						Sinxronizatsiya qilinmagan ma'lumotlar:
					</Text>
					<Text style={styles.statsText}>
						{allDataCount?.SYNCED_COUNT}
					</Text>
				</View>
			</View>
			<View style={styles.wrappersWrapper}>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>Filiallar:</Text>
					<Text style={styles.statsText}>
						{branchesCount?.TOTAL_COUNT}/
						{branchesCount?.SYNCED_COUNT}
					</Text>
				</View>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>Kategoriyalar:</Text>
					<Text style={styles.statsText}>
						{categoriesCount?.TOTAL_COUNT}/
						{categoriesCount?.SYNCED_COUNT}
					</Text>
				</View>
			</View>
			<View style={styles.wrappersWrapper}>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>Mahsulotlar:</Text>
					<Text style={styles.statsText}>
						{productsCount?.TOTAL_COUNT}/
						{productsCount?.SYNCED_COUNT}
					</Text>
				</View>
				<View style={styles.wrapper}>
					<Text style={styles.statsTitle}>Savdolar:</Text>
					<Text style={styles.statsText}>Yaqinda qo'shiladi</Text>
				</View>
			</View>
			<BarChart
				data={{
					labels: ["Filiallar", "Kategoriyalar", "Mahsulotlar"],
					datasets: [
						{
							data: [
								branchesCount.SYNCED_COUNT,

								categoriesCount.SYNCED_COUNT,
								productsCount.SYNCED_COUNT,
							],
						},
					],
				}}
				chartConfig={{
					backgroundColor: "#000",
					backgroundGradientFrom: "#444444",
					backgroundGradientTo: "#444444",

					decimalPlaces: 2, // optional, defaults to 2dp
					color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
					style: {
						borderRadius: 16,
					},
				}}
				width={Dimensions.get("screen").width}
				height={220}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 16,
		paddingTop: 10,
	},
	buttonText: {
		color: "#ffffff",
		textAlign: "center",
		fontWeight: "500",
		fontSize: 17,
	},
	statsTitle: {
		fontSize: 17,
		fontWeight: "bold",
	},
	statsText: {
		fontSize: 17,
		fontWeight: "500",
	},
	wrapper: {
		padding: 10,
		width: "48%",
		backgroundColor: "#00000022",
		justifyContent: "center",
	},
	wrappersWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		width: "100%",
	},
	syncButton: {
		width: "100%",
		padding: 16,
		backgroundColor: "#000",
		marginBottom: 10,
	},
	syncText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#fff",
		textAlign: "center",
	},
});
