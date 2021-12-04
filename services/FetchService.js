const SERVER_URL = "http://192.168.100.8:4040/api";
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoiNjY2NTczZTktNDQ3NC00MWExLTgyNjYtNjVjYWZlZDlmNDc4IiwiaWF0IjoxNjM4NjIxMzI1fQ.nvQ59zXZQL4kvP5UhGqE6RlAiIDlCurlSl4Fb8erOzs";

export default class FetchService {
	static async syncBranches(branches) {
		branches = branches.map((b) => {
			return {
				...b,
				branch_longitude: b.branch_long,
				branch_latitude: b.branch_lat,
			};
		});

		let response = await fetch(SERVER_URL + "/branches/add", {
			headers: {
				Authorization: TOKEN,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				branches,
			}),
		});
		response = await response.json();
		return response;
	}

	static async syncCategories(categories) {
		let response = await fetch(SERVER_URL + "/categories/branch/add", {
			headers: {
				Authorization: TOKEN,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				categories,
			}),
		});
		response = await response.json();
		return response;
	}

	static async syncProducts(products) {
		products = products.map((e) => {
			delete e.product_sync;
			return {
				...e,
			};
		});

		let response = await fetch(SERVER_URL + "/products/add", {
			headers: {
				Authorization: TOKEN,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({
				products,
			}),
		});
		response = await response.json();
		return response;
	}
}
