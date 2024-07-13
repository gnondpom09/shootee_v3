import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';

import { getCurrentUser } from 'vuefire';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/authentication/LoginPage.vue'),
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/authentication/RegisterPage.vue'),
  },
  {
    name: 'account',
    path: '/account',
    meta: { requiresAuth: true },
    component: () => import('@/views/AccountPage.vue'),
  },
  {
    name: 'settings',
    path: '/settings',
    meta: { requiresAuth: true },
    component: () => import('@/views/SettingsPage.vue'),
  },
  {
    path: '/add-spot',
    component: () => import('@/views/AddSpotPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/tabs/home',
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home',
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue'),
      },
      {
        path: 'search',
        component: () => import('@/views/SearchPage.vue'),
      },
      {
        path: 'bookmarks',
        component: () => import('@/views/BookmarksPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'profile',
        component: () => import('@/views/UserProfile.vue'),
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
        path: '/login',
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
