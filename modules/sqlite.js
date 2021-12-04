import uuid from "react-native-uuid";

export class SQLiteService {
	static async createTableBranches(db) {
		const query = `CREATE TABLE IF NOT EXISTS branches (
            branch_id SERIAL NOT NULL primary key,
            branch_name VARCHAR NOT NULL,
            branch_lat FLOAT NOT NULL,
            branch_long FLOAT NOT NULL
        );`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[],
				(e, { rows: { _array } }) => console.log(_array),
				(error) => console.log("Error", error)
			);
		});
	}

	static async insertBranch(db, branch_name, branch_lat, branch_long) {
		const query = `INSERT INTO branches(branch_id, branch_name, branch_lat, branch_long) VALUES (?, ?, ?, ?)`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[uuid.v4(), branch_name, branch_lat, branch_long],
				(e, { rows: { _array } }) => console.log(_array),
				(_, error) => console.log("Error", error)
			);
		});
	}

	static async getAllBranches(db) {
		const query = `SELECT * FROM branches`;
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					query,
					[],
					(e, { rows: { _array } }) => resolve(_array),
					(_, error) => reject(error)
				);
			});
		});
	}
}
