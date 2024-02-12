<template>
	<v-app id="inspire">
		<v-app-bar class="px-5">
			<v-app-bar-nav-icon color="secondary" @click.stop="drawer = !drawer" class="ml-0">
			</v-app-bar-nav-icon>
			
			<router-link :to="{ name: RouteNames.ROOT }" class="my-logo-link d-flex align-center ml-15">
				<v-icon color="secondary" size="42" class="mr-8">mdi mdi-controller</v-icon>
				<v-app-bar-title class="text-secondary font-weight-bold text-xxl-subtitle-1">
					CRUD TO DO Приложение
				</v-app-bar-title>
			</router-link>
			
		</v-app-bar>
		
		<v-navigation-drawer v-model="drawer"
							 class="my-navigation-drawer text-secondary-darken-1"
							 :clipped="lgAndUp"
							 :mini-variant-width="88"
							 :width="200"
							 app>
			<v-list class="my-list-menu pa-0">
				<v-list-item v-for="(item, j) in menuItems"
							 :value="j"
							 :active="getIsActiveNavItem(item) as boolean"
							 :to="item.routeConfig"
							 class="px-6"
							 :link="true"
							 :key="item.text">
					<v-list-item-title
						:class="getIsActiveNavItem(item) ? '' : 'text-secondary'"
						class="font-weight-bold"
						v-text="item.text">
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		
		<v-main class="my-main">
			<v-container :fluid="true" style="height: 100%;">
				<template v-if="pageMode === PageModeType.OK">
					<router-view :key="$route.meta.key || $route.name"/>
					<my-alerts></my-alerts>
				</template>
				<template v-else-if="pageMode === PageModeType.PAGE_NOT_FOUND">
					<my-page-not-found-error></my-page-not-found-error>
				</template>
				<template v-else-if="pageMode === PageModeType.ACCESS_DENIED">
					<my-access-denied-error></my-access-denied-error>
				</template>
			</v-container>
		</v-main>
	</v-app>
</template>

<script setup lang="ts">
import { useRootStore } from "@/stores/root";
import { storeToRefs } from "pinia";
import { PageModeType } from "@/stores/root/types/pageModeType";
import MyPageNotFoundError from "@/views/errors/MyPageNotFoundError.vue";
import MyAccessDeniedError from "@/views/errors/MyAccessDeniedError.vue";
import MyAlerts from "@/components/alerts/MyAlerts.vue";
import { findAllByAncestor, RouteNames } from "@/router/routeNames";
import { computed, ref } from "vue";
import { useDisplay } from "vuetify";
import { useI18n } from "vue-i18n";
import Route from "@/router/types/route";
import { useRoute, useRouter } from "vue-router";

const { lgAndUp, mdAndDown } = useDisplay();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();

interface MenuItem {
	text: string,
	routeConfig: Route,
	childrenRoutes: string[]
}

const mainStore = useRootStore();
const { pageMode } = storeToRefs(mainStore);

const drawer = ref<boolean | null>(null);

const menuItems = [
	{
		text: t("navigation.tasks"),
		routeConfig: { name: RouteNames.TASKS },
		childrenRoutes: findAllByAncestor(RouteNames.TASKS)
		.map(x => x.model.name)
	}
] as MenuItem[];

const getIsActiveNavItem = (item: MenuItem) => {
	return item?.routeConfig?.name === route.name || item?.childrenRoutes && item?.childrenRoutes.includes(route.name as string);
};

router.beforeEach(async (to, from, next) => {
	if(to.name !== from?.name) {
		mainStore.resetPageMode();
	}
	
	next();
});
</script>

<style lang="scss">
.my-main {
  background-color: #252831;
  background-image: url('/img/images/main-background.gif');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 102%;
}

.my-logo-link {
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 2px 10px;
  
  &:hover {
	background: rgba(72, 169, 166, 0.2);
  }
  
  &:active {
	background: rgba(72, 169, 166, 0.5);
  }
}
</style>
