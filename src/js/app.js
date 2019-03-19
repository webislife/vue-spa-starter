import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import AppVue from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

import { AppRouter } from './router.js';
import AppStore from './store/store.js';


//Импортируем глобальные компоненты
//..
//Импортируем глобальные фильтры
//..
//Импортируем глобальные директивы
//..
class App {
  constructor () {
    /**
     * @property {Vuex} Store - main application storage
    */
    this.Store = new AppStore();

    /**
     * @property {VueRouter} Router - main client application router
    */
    this.Router = AppRouter;
    /**
     * @property {Vue} Vue - main vue application
    */
    this.Vue = new Vue({
      router: this.Router,
      store: this.Store,
      render: h => h(AppVue),
    });
    // this.API = {
    //   BGLN: new BiglionApi,
    // };
  }
}
global.app = new App

app.Vue.$mount('#app');