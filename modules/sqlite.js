export class SQLiteService {
	static async createTableBranches(db) {
		const query = `CREATE TABLE IF NOT EXISTS branches (
            branch_id SERIAL NOT NULL,
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
}
