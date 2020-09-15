import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);

export const Bus = new Vue({
  methods: {
    recpieDetails(recipe) {
      this.$emit('showRec', recipe)
    }
  }
});

const router = new VueRouter({
  routes,
  mode: 'history'
});

export function guardMyroute(to, from, next) {
  var isAuthenticated = false;

  if (localStorage.getItem('user'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next();
  }
  else {
    next('/login');
  }
}

// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem('user')) {  
//     console.log(1111)
//     next();
//   } else {
//     console.log(222)
//     next('/login')
//   }
// });


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

