import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Cabins from "../views/Cabins.vue";
import CabinView from "../views/Cabin.vue";
import CabinNew from "../views/CabinNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/cabin/",
    name: "Cabins",
    component: Cabins
  },
  {
    path: "/cabin/new",
    name: "CabinNew",
    component: CabinNew
  },
  {
    path: "/cabin/:id",
    name: "CabinView",
    component: CabinView
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
