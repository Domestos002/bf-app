import Vue from 'vue'
import VueRouter from 'vue-router'
import Detail from "../views/Detail/Detail.vue";
import List from "../views/List/List.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/request/:id',
        name: 'Detail',
        component: Detail,
        props: true
    },
    {
        path: '/',
        name: 'List',
        component: List
    },
];

const router = new VueRouter({
    routes
});

export default router
