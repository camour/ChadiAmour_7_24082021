import Vue from 'vue';
import VueRouter from 'vue-router';
import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import Home from '../views/website/Home.vue';
import Account from '../views/website/Account.vue';
import LogOut from '../views/auth/LogOut.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/signIn',
    name: 'SignIn',    
    component: SignIn
  },
  {
    path: '/signUp',  
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/',
    name: 'Home',   
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Account
  },
  {
    path: '/logOut',
    name: 'LogOut',
    component: LogOut
  }
]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  // when not authentificated, users can not access other routes
  if( ((to.name != 'SignIn') && (to.name != 'SignUp')) && (!JSON.parse(localStorage.getItem('token')))){
    next({name: 'SignIn'});
  }else if(((to.name == 'SignIn') || (to.name=='SignUp')) && (JSON.parse(localStorage.getItem('token')))){
    next({name: 'Home'}); // when authentificated, users can not access signin and signup tabs
  }else{
    next();
  }
})

export default router;
