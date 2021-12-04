import uuid from "react-native-uuid";

export class SQLiteService {
	static async createTableBranches(db) {
		const query = `CREATE TABLE branches (
            branch_id VARCHAR NOT NULL primary key,
            branch_name VARCHAR NOT NULL,
            branch_lat FLOAT NOT NULL,
            branch_long FLOAT NOT NULL
        );`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[],
				(e, { rows: { _array } }) => {},
				(_, error) => console.log("Error", error)
			);
		});
	}

	static async createTableProducts(db) {
		const query = `CREATE TABLE products (
            product_id VARCHAR NOT NULL primary key,
            product_name VARCHAR NOT NULL,
            product_count INT NOT NULL,
            product_type VARCHAR NOT NULL,
            product_price VARCHAR NOT NULL,
            product_barcode VARCHAR NOT NULL,
			category_id VARCHAR NOT NULL REFERENCES categories(category_id)
        );`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[],
				(e, { rows: { _array } }) => {},
				(_, error) => console.log("Error", error)
			);
		});
	}

	static async createTableCategories(db) {
		const query = `CREATE TABLE categories (
            category_id SERIAL NOT NULL primary key,
            category_name VARCHAR NOT NULL,
			branch_id VARCHAR NOT NULL REFERENCES branches(branch_id)
        );`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[],
				(e, { rows: { _array } }) => {},
				(_, error) => console.log("Error", error)
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

	static async getAllCategories(db, branch_id) {
		const query = `SELECT * FROM categories WHERE branch_id = ?`;
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					query,
					[branch_id],
					(e, { rows: { _array } }) => resolve(_array),
					(_, error) => reject(error)
				);
			});
		});
	}

	static async insertCategory(db, category_name, branch_id) {
		const query = `INSERT INTO categories(category_id, category_name, branch_id) VALUES (?, ?, ?)`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[uuid.v4(), category_name, branch_id],
				(e, { rows: { _array } }) => console.log(_array),
				(_, error) => console.log("Error", error)
			);
		});
	}

	static async insertProduct(
		db,
		product_name,
		product_count,
		product_type,
		product_price,
		product_barcode,
		category_id
	) {
		const query = `INSERT INTO products(product_id, product_name, product_count, product_type, product_price, product_barcode, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[
					uuid.v4(),
					product_name,
					product_count,
					product_type,
					product_price,
					product_barcode,
					category_id,
				],
				(e, { rows: { _array } }) => console.log(_array),
				(_, error) => console.log("Error", error)
			);
		});
	}

	static async getAllProducts(db, category_id) {
		const query = `SELECT * FROM products WHERE category_id = ?`;
		return new Promise((resolve, reject) => {
			db.transaction((tx) => {
				tx.executeSql(
					query,
					[category_id],
					(e, { rows: { _array } }) => resolve(_array),
					(_, error) => reject(error)
				);
			});
		});
	}
}
