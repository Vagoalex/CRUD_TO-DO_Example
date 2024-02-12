const baseApiUrl = import.meta.env.VITE_BASE_API_URL;
const fakeApiUrl = import.meta.env.VITE_FAKE_API_URL;

export const urlTemplateParts = {
	id: "{id}",
	subId: "{subId}",
	thirdId: "{thirdId}"
};

const urls = {
	tasks: {
		getTasks: `${baseApiUrl}/tasks`,
		deleteTasks: `${baseApiUrl}/tasks`,
	},
	fakeApi: {
		products: {
			getAllProducts: `${fakeApiUrl}/producsts`,
			getSingleProductByNumber: `${fakeApiUrl}/products/${urlTemplateParts.id}`,
			updateSingleProductByNumber: `${fakeApiUrl}/products/${urlTemplateParts.id}`,
			deleteSingleProductByNumber: `${fakeApiUrl}/products/${urlTemplateParts.id}`
		}
	}
};

export default urls;
