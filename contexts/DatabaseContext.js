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

		// db.exec(
		// 	[{ sql: "PRAGMA table_info('categories');", args: [] }],
		// 	false,
		// 	(...args) => console.log(args)
		// );

		// SQLiteService.createTableBranches(db);
		// SQLiteService.createTableCategories(db);

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
