import React from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SQLiteService } from "../modules/sqlite";
import { useDB } from "../contexts/DatabaseContext";

export default function CashScreen({ navigation }) {
	const [scanned, setScanned] = React.useState(false);
	const [hasPermission, setHasPermission] = React.useState(null);
	const [data, setData] = React.useState([]);
	const [db] = useDB();

	React.useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const handleBarCodeScanned = async ({ type, data: d }) => {
		try {
			setScanned(true);
			console.log(d);
			const [product] = await SQLiteService.getOneProducts(db, d);

			if (
				!product ||
				data.find((e) => e.product_id == product.product_id)
			)
				return;

			product.product_total = 1;

			setData([...data, product]);
		} finally {
			setTimeout(() => {
				setScanned(false);
				console.log(scanned);
			}, 1500);
		}
	};

	const renderItem = ({ item }) => {
		const handlePress = (e) => {
			const index = data.findIndex(
				(i) => i.product_id == item.product_id
			);

			console.log(index);

			data[index].product_total += 1;

			setData([...data]);
		};

		return (
			<Pressable onPress={handlePress} style={styles.button}>
				<Text style={styles.buttonText}>
					{item.product_name} ({item.product_price} so'm)
				</Text>
				<Text style={styles.countText}>
					{item.product_total} {item.product_type} (
					{item.product_price * item.product_total} so'm)
				</Text>
			</Pressable>
		);
	};

	const calculatedPrice = () => {
		return (
			data.reduce(
				(e, i) =>
					e.product_price * e.product_total +
					i.product_price * i.product_total
			) || 0
		);
	};

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={styles.absoluteFillObject}
			/>
			<FlatList
				data={data}
				style={styles.flatList}
				keyExtractor={(e) => e.product_id}
				renderItem={renderItem}
			/>
			<Pressable style={styles.floatButton}>
				<Text style={styles.totalSum}>
					{(() => {
						let e = 0;
						for (let i of data) {
							e = +(i.product_price * i.product_total);
						}

						return e;
					})()}{" "}
					so'm
				</Text>

				<MaterialCommunityIcons
					size={34}
					color="white"
					name="cash-marker"
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 16,
	},
	totalSum: {
		color: "#ffffff",
		fontSize: 18,
		marginRight: 10,
	},
	button: {
		padding: 16,
		borderWidth: 1,
		borderColor: "#00000077",
		marginBottom: 20,
	},
	buttonText: {
		fontSize: 15,
	},
	countText: {
		fontSize: 15,
		marginTop: 10,
	},
	absoluteFillObject: {
		width: "100%",
		height: 100,
		marginBottom: 10,
		borderWidth: 2,
		borderColor: "red",
	},
	flatList: {
		width: "100%",
		flexGrow: 1,
	},
	floatButton: {
		position: "absolute",
		flexDirection: "row",
		alignItems: "center",
		bottom: "5%",
		right: "6%",
		backgroundColor: "#222",
		padding: 10,
		borderRadius: 50,
	},
});
