// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import QuestionsList from '../views/QuestionList.vue';
import QuestionCreate from '../views/QuestionCreate.vue';
import QuestionDetail from '../views/QuestionDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'QuestionsList',
    component: QuestionsList,
  },
  {
    path: '/create',
    name: 'QuestionCreate',
    component: QuestionCreate,
  },
  {
    path: '/questions/:id?',
    name: 'QuestionDetail',
    component: QuestionDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
