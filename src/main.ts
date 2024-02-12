import MyApp from "@/MyApp.vue";
import { createApp } from "vue";
// Plugins
import { registerPlugins } from "@/plugins";
import { configureApi } from "@/api";
import { JSONStorage } from "@/services/JSONStorage/JSONService";
import { mocks } from "@/api/client/mock";
import { cloneDeep } from "lodash";
import { MOCK_DB_INITIALIZED, MOCK_DB_TASKS } from "@/constants/mockDB";

// TODO: убрать, если вдруг появится бд, или будем делать сервис + сервак
const ls = new JSONStorage(localStorage);

const mockTasksExistsInDB = ls.get(MOCK_DB_INITIALIZED);

if(!mockTasksExistsInDB) {
	const tasks = cloneDeep(mocks.firstInitTasks);
	ls.set(MOCK_DB_TASKS, tasks);
	ls.set(MOCK_DB_INITIALIZED, true);
}

const app = createApp(MyApp);

await registerPlugins(app);

configureApi();

app.mount("#app");
