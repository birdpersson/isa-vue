import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
// import Report from "../views/Report.vue";
import Review from "../views/Review.vue";
import Cabins from "../views/Cabins.vue";
import CabinCreate from "../views/CabinCreate.vue";
import CabinUpdate from "../views/CabinUpdate.vue";
import CabinDetail from "../views/CabinDetail.vue";
import Reservation from "../views/Reservation.vue";
import Promotion from "../views/Promotion.vue";
// import Reports from "../views/Reports.vue";
import Reviews from "../views/Reviews.vue";


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
    component: Signin
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
    name: "CabinCreate",
    component: CabinCreate
  },
  {
    path: "/cabin/:id",
    name: "CabinDetail",
    component: CabinDetail
  },
  {
    path: "/cabin/:id/edit",
    name: "CabinUpdate",
    component: CabinUpdate
  },
  {
    path: "/cabin/:id/reservation",
    name: "Reservation",
    component: Reservation
  },
  {
    path: "/cabin/:id/promotion",
    name: "Promotion",
    component: Promotion
  },
  {
    path: "/cabin/:id/review",
    name: "Review",
    component: Review
  },
  {
    path: "/review/",
    name: "Reviews",
    component: Reviews
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
