import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "@/views/TabsPage.vue";

import { getCurrentUser } from "vuefire";

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import("@/views/authentication/LoginPage.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () => import("@/views/authentication/RegisterPage.vue"),
  },
  {
    path: "/account",
    meta: { requiresAuth: true },
    component: () => import("@/views/AccountPage.vue"),
  },
  {
    path: "/settings",
    meta: { requiresAuth: true },
    component: () => import("@/views/SettingsPage.vue"),
  },
  {
    path: "/help",
    meta: { requiresAuth: true },
    component: () => import("@/views/HelpPage.vue"),
  },
  {
    path: "/cgu",
    meta: { requiresAuth: true },
    component: () => import("@/views/GeneralConditionsPage.vue"),
  },
  {
    path: "/admin",
    meta: { requiresAuth: true },
    component: () => import("@/views/AdminPage.vue"),
  },
  {
    path: "/add-spot",
    meta: { requiresAuth: true },
    component: () => import("@/views/AddSpotPage.vue"),
  },
  {
    path: "/spot-detail/:id",
    component: () => import("@/views/SpotDetailPage.vue"),
  },
  {
    path: "/shared-with/:id",
    component: () => import("@/views/SharedWithPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/author/:id",
    component: () => import("@/views/AuthorDetailPage.vue"),
  },
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "search",
        component: () => import("@/views/SearchPage.vue"),
      },
      {
        path: "bookmarks",
        component: () => import("@/views/BookmarksPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        component: () => import("@/views/UserProfilePage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();

    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: "/login",
        query: {
          // we keep the current path in the query so we can
          // redirect to it after login with
          // `router.push(route.query.redirect || '/')`
          redirect: to.fullPath,
        },
      };
    }
  }
});

export default router;
