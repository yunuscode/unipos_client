import React from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { BarChart } from "react-native-chart-kit";
import { SQLiteService } from "../modules/sqlite";
import { useDB } from "../contexts/DatabaseContext";

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

	React.useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			getAll();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<ScrollView contentContainerStyle={styles.container}>
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
});
