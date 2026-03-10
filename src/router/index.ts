import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/report/tables',
      name: 'report-tables',
      component: () => import('../views/ReportTablesView.vue'),
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: () => import('../views/DocumentationView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

export default router
