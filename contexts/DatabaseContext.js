import React from "react";
import * as SQLite from "expo-sqlite";
import { SQLiteService } from "../modules/sqlite";

export const DatabaseContext = React.createContext();

export function DatabaseProvider({ children }) {
	const [db, setDb] = React.useState(openDatabase());

	function openDatabase() {
		if (Platform.OS === "web") {
			return {
				transaction: () => {
					return {
						executeSql: () => {},
					};
				},
			};
		}

		const db = SQLite.openDatabase("db.db");

		// db.exec([{ sql: "DROP TABLE branches;", args: [] }], false, (...args) =>
		// 	console.log(args)
		// );

		// db.exec(
		// 	[{ sql: "DROP TABLE categories;", args: [] }],
		// 	false,
		// 	(...args) => console.log(args)
		// );

		// db.exec([{ sql: "DROP TABLE products;", args: [] }], false, (...args) =>
		// 	console.log(args)
		// );

		SQLiteService.createTableBranches(db);
		SQLiteService.createTableCategories(db);
		SQLiteService.createTableProducts(db);

		return db;
	}

	// React.useEffect(() => {
	// 	const db = ;
	// 	if (db) setDb(db);

	// 	return () => {};
	// }, []);

	return (
		<DatabaseContext.Provider value={{ db }}>
			<DatabaseContext.Consumer>
				{() => children}
			</DatabaseContext.Consumer>
		</DatabaseContext.Provider>
	);
}

export function useDB() {
	const { db } = React.useContext(DatabaseContext);

	return [db];
}
