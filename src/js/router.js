import Router from 'vue-router';

const BaseLayout = () => import( /* webpackChunkName: "layout/base" */ '@js/layouts/base.vue');

export const AppRouter = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: BaseLayout,
        children: [
          {
            name: 'home',
            path: '',
            component: () => import(/* webpackChunkName: "route/main" */ './routes/main.vue'),
          },
        ],
      },
    ],
  });