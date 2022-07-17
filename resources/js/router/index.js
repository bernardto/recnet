
window.Vue = require('vue');

import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '/vi'
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)





const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '/views/About.vue')
        },


        /*{
            path: '/historique',
            name: 'historique',
            component: resolve => require(['./components/user/historique'],resolve),
            meta: { transition: 'overlay-left' },

        },*/



        {
            path :'*',
            redirect: '/'
        },

    ],
})

router.beforeEach((to, from, next) => {
    //  js.Verifier_Route(to);
    // ...
    next()
})


export default index
