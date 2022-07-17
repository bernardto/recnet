
require('./bootstrap');

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Vue from 'vue'


import vuetify from './vuetify'


//import App from  './components/cisinfo.vue'

import App from  './AppMain'

import VueRouter from 'vue-router'
import VCCM from "vue-custom-context-menu"
Vue.use(VueRouter)
import Home from './views/Home.vue'
import VuePageTransition from 'vue-page-transition'
Vue.use(VuePageTransition)
Vue.use(VCCM)





function resolveAfter2Seconds() {
    return new Promise(resolve => {
         axios.post("/reg_is_auth").then(response =>{
             console.log("sd");
            resolve(response.data.success);

        }).catch(error =>{ resolve(false) });
    });
}

/*async function asyncCall() {

    const isAuthenticated =  await resolveAfter2Seconds();





}*/

const router = new VueRouter({
    mode: 'history',
    routes: [

        {
            path: '/',
            name: 'Accueil',
            component: resolve => require(['./components/Accueil'],resolve),
            meta: { transition: 'overlay-left' },
        },
        {
            path: '/parametre',
            name: 'parametre',
            component: resolve => require(['./components/Parametre'],resolve),
            meta: { transition: 'overlay-left' },
        }
        ,
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['./components/login/Login'],resolve),
            meta: { transition: 'overlay-left' },
        },


        {
            path: '/quiz',
            name: 'Quiz',
            component: resolve => require(['./components/Quiz'],resolve),
            meta: { transition: 'overlay-left' },
        },


        {
            path: '/contribuable',
            name: 'Contribuable',
            component: resolve => require(['./components/Contribuable/Contribuable'],resolve),
            meta: { transition: 'overlay-left' },
        },


        {
            path: '/aff_collecteur_zone',
            name: 'affecter_collecteur_zone',
            component: resolve => require(['./components/Collecteur/AffecterCollecteurZone'],resolve),
            meta: { transition: 'overlay-left' },
        },


        {
            path: '/aff_supervisur_quartier',
            name: 'affecter_superviseur_quartier',
            component: resolve => require(['./components/Collecteur/AffecterSuperviseurQuartier'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/aff_supervisur_zone',
            name: 'affecter_superviseur_zone',
            component: resolve => require(['./components/Collecteur/AffecterSuperviseurZone'],resolve),
            meta: { transition: 'overlay-left' },
        },



        {
            path: '/aff_collecteur_quartier',
            name: 'affecter_collecteur_quartier',
            component: resolve => require(['./components/Collecteur/AffecterCollecteurQuartier'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/collecteur',
            name: 'collecteur',
            component: resolve => require(['./components/Collecteur/Collecteurs'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/superviseur',
            name: 'superviseur',
            component: resolve => require(['./components/Collecteur/Superviseurs'],resolve),
            meta: { transition: 'overlay-left' },
        },


        {
            path: '/versement',
            name: 'versement',
            component: resolve => require(['./components/versement/Versement'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/recouvrement',
            name: 'recouvrement',
            component: resolve => require(['./components/Recouvrement'],resolve),
            meta: { transition: 'overlay-left' },
        },


        {
            path: '/quartier',
            name: 'quartier',
            component: resolve => require(['./components/Quartier'],resolve),
            meta: { transition: 'overlay-left' },
        },
        {
            path: '/zone',
            name: 'zone',
            component: resolve => require(['./components/Zone/Zone'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/zone_aff_qt',
            name: 'zone_aff',
            component: resolve => require(['./components/Zone/AffecterQuartierAuZone'],resolve),
            meta: { transition: 'overlay-left' },
        },




        {
            path: '/taxes',
            name: 'Taxes',
            component: resolve => require(['./components/Taxes'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/ticket',
            name: 'Ticket',
            component: resolve => require(['./components/Ticket'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/odre_recette',
            name: 'odre_recette',
            component: resolve => require(['./components/OdresEtDeclaration'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/compte_fonc',
            name: 'compte_fonc',
            component: resolve => require(['./components/CompteFonctionnel'],resolve),
            meta: { transition: 'overlay-left' },
        },
        {
            path: '/verser_recette',
            name: 'VerserRecette',
            component: resolve => require(['./components/versement/verserRecette'],resolve),
            meta: { transition: 'overlay-left' },
        },
        {
            path: '/verifier_recette',
            name: 'VerifierRecette',
            component: resolve => require(['./components/versement/verifierRecette'],resolve),
            meta: { transition: 'overlay-left' },
        },

        {
            path: '/historique_versement',
            name: 'historiqueVersement',
            component: resolve => require(['./components/versement/historiqueVersement'],resolve),
            meta: { transition: 'overlay-left' },
        },



        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( './views/Home.vue'),
            meta: { transition: 'overlay-left' },
        },





        {
            path :'*',
            redirect: '/'
        },

    ],
})


router.beforeEach((to, from, next) => {


    axios.post("/reg_is_auth").then(response =>{


        if(to.name !== 'Login' && !response.data.success) next({ name: 'Login' })

        next()

    }).catch(error =>{ resolve(false) });


})





const app = new Vue({
    vuetify,
    router,
    components: { App },
    el: '#app',
    icons: {
        iconfont: ['md', 'mdi', 'fa']
        // iconfont: [ 'mdi']
    },


});

