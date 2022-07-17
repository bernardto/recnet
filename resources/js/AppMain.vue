<template>
    <v-app >
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant.sync="mini"
            permanent
            v-if="isAuthenticated"
            :color="couleur_principale"
            dark
            app
        >
            <v-list-item class="px-2 pt-1">
                <v-list-item-avatar>
                    <v-img src="./assets/logo.png" alt="admin" class="mx-auto"/>
                </v-list-item-avatar>
                <v-list-item-title class="ml-4 text-capitalize">RECNET</v-list-item-title>
            </v-list-item>
            <v-list shaped class="clickable">
                <template v-for="item in items">
                    <v-list-group
                        v-if="item.children"
                        :key="item.text"
                        v-model="item.model"
                        :prepend-icon="item['icon-ctr']"
                        :append-icon="item.model ? item.icon : item['icon-alt']"
                        active-class="blue--text"
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="(child, i) in item.children"
                            :key="i"
                            route :to="child.route"
                            active-class="orange--text"
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                        v-else
                        :key="item.text"
                        active-class="orange accent-4"
                        route :to="item.route"
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>




                                <v-tooltip right>
                                    <template v-slot:activator="{ on, attrs }">

                                        <v-list-item-title v-bind="attrs"
                                                           v-on="on" >

                                            {{ item.text }}

                                        </v-list-item-title>
                                    </template>
                                    <span>{{item.text}}</span>
                                </v-tooltip>





                        </v-list-item-content>
                    </v-list-item>
                </template>

            </v-list>

        </v-navigation-drawer>
        <v-app-bar

            v-if="isAuthenticated"
            app
            :color="couleur_principale"
            dark
        >
            <v-app-bar-nav-icon @click.stop="mini = !mini" class="clickable"/>
            <v-toolbar-title
                style="width: 500px"
                class="ml-0 pl-4"
            >
                <span >{{ titre }}</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            large
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <v-list>

                        <v-hover v-slot="{ hover }">
                            <v-card   @click="goToParametre()" :color="hover ? 'primary' : '' ">
                                <v-list-item

                                >


                                    <v-list-item-avatar>
                                        <v-icon
                                            class="primary"
                                            dark
                                        >
                                            mdi-table-edit
                                        </v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-title :class="hover ? 'white_text':  'black_text'" >Paramètres</v-list-item-title>

                                </v-list-item>
                            </v-card>
                        </v-hover>

                        <v-hover v-slot="{ hover }">
                        <!--                        <v-hover v-slot="{ hover }">-->
                        <v-card v-if="false" :color="hover ? 'primary' : '' ">
                            <v-list-item

                            >


                                <v-list-item-avatar>
                                    <v-icon
                                        class="success"
                                        dark
                                    >
                                        mdi-trending-up
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-title :class="hover ? 'white_text':  'black_text'">Statistique</v-list-item-title>

                            </v-list-item>
                        </v-card>
                        </v-hover>
                        <!--                        </v-hover>-->
                        <!--                        <v-hover v-slot="{ hover }">-->
                        <v-hover v-slot="{ hover }">
                        <v-card  @click="dialog_deco = true"  :color="hover ? 'primary' : '' ">
                            <v-list-item

                            >


                                <v-list-item-avatar>
                                    <v-icon
                                        class="error"
                                        dark
                                    >
                                        mdi-account-off
                                    </v-icon>
                                </v-list-item-avatar>

                                <v-list-item-title :class="hover ? 'white_text':  'black_text'">Se déconnecter</v-list-item-title>

                            </v-list-item>
                        </v-card>
                        </v-hover>
                        <!--                        </v-hover>-->


                    </v-list>
                </v-menu>

        </v-app-bar>

            <v-main>
                <v-container
                    class="scroll-y"
                    fluid
                >


                        <vue-page-transition>
                            <router-view :config="config"></router-view>
                        </vue-page-transition>


                </v-container>
            </v-main>


        <v-btn
            v-scroll="onScroll"
            bottom
            v-if="false"
            color="pink"
            dark
            fab
            fixed
            right
            @click="toTop"
            class="clickable"
        >
            <v-icon>mdi-chevron-up</v-icon>
        </v-btn>

        <v-dialog persistent v-model="dialog_deco" max-width="550px">
            <v-card>
                <v-card-title class="headline" style="word-break: break-word"> Voulez-vous vraiment vous déconnecter ?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" :disabled="loading_data" outlined @click="dialog_deco = false"><v-icon>mdi-keyboard-return</v-icon> Sortir</v-btn> <v-spacer></v-spacer>
                    <v-btn color="error" :loading="loading_data" outlined @click="logout"> <v-icon>mdi-delete-circle</v-icon> Oui  </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
//import * as auth from '../services/auth_service'
export default {
    props: {
        source: String,
    },
    mounted() {

        this.$root.$on('TITRE', data => {
            this.titre = data;

        });

        this.$root.$on('login', data => {
           this.checkAuth();

        });



        this.checkAuth();

        this.getConfig();
        this.$root.$emit('config', this.config);
        this.$root.$emit('toto', "bernard");



    },
    watch:{
        dark(val){

        }
    },
    data: () => ({
        drawer: null,
        dialog_deco : false,
        loading_data : false,
        mini: false,
        isAuthenticated : false,
        config : {},
        dark:false,
        titre: 'Accueil',

        fab: false,
        couleur_principale: '#2C3A47',
        items: [
            {icon: 'mdi-home', text: 'Acceuil', route: '/'},

            {text: 'Contribuables', id: 1, route: '/contribuable', icon: 'fa-street-view'},
            {icon: 'mdi-chevron-up', text:  'Collecteur',

                model: false,
                'icon-alt': 'mdi-chevron-down',


                children: [
                    {text: 'Collecteurs', id: 32, route: '/collecteur',  icon: 'fa-portrait' },
                    { icon: 'style', id: 154, text: 'Affectation aux zones ', route:'/aff_collecteur_zone', },
                    { icon: 'style', id: 154, text: 'Affectation aux quartiers', route:'/aff_collecteur_quartier', },



                ],

            },
            {icon: 'mdi-chevron-up', text:  'Superviseurs',

                model: false,
                'icon-alt': 'mdi-chevron-down',


                children: [
                    {text: 'Superviseur', id: 73, route: '/superviseur',  icon: 'fa-user-tie' },
                    { icon: 'style', id: 125, text: 'Affectation', route:'/aff_supervisur_zone', },



                ],

            },
            //
            {text: 'Versement Recette', id: 4, route: '/versement', icon: 'fa-donate'},
            {text: 'Recouvrement', id: 5, route: '/recouvrement', icon: 'mdi-finance'},
            {icon: 'mdi-chevron-up', text:  'Zone',

                model: false,
                'icon-alt': 'mdi-chevron-down',


                children: [

                    {text: 'Zones', id: 6, route: '/zone', icon: 'fa-map-signs'},
                    {text: 'Affecter Quartiers', id: 6, route: '/zone_aff_qt', icon: 'mdi-send'},




                ],

            },

            {text: 'Quartiers', id: 60, route: '/quartier', icon: 'mdi-google-maps'},

            {text: 'Taxes', id: 7, route: '/taxes', icon: 'fa-wallet'},
          //  {text: 'Tickets', id: 8, route: '/ticket', icon: 'fa-money-check'},
            //{text: 'Odres /Déclaratin de Recette', id: 9, route: '/odre_recette', icon: 'fa-newspaper'},




            /*
                      {
                      icon: 'mdi-chevron-up',
                      'icon-alt': 'mdi-chevron-down',
                      'icon-ctr': 'mdi-cart-arrow-right',
                      text: 'Orders',
                      model: false,
                      children: [
                        { icon: 'style', text: 'Type', route:'/Type' },
                        { icon: 'atm', text: 'Mark', route:'/Mark' },
                          ],
                    },*/

        ],
    }),
    computed: {},
    methods: {
        goToParametre(){
            this.$router.push({ path :  "parametre"});
        },
        getConfig(){
            axios.post("/get_config").then(response =>{
                this.config = JSON.parse(response.data.config);
                this.$vuetify.theme.dark = this.config.theme.mode_nuit;
            }).catch(error =>{});
        },
        logout() {
            this.loading_data = true;
            axios.post("/logout").then(response =>{
                window.location.reload();
            }).catch(error =>{});


        },
        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop() {
            this.$vuetify.goTo(0)
        },
        checkAuth(){
            axios.post("/reg_is_auth").then(response =>{
                this.isAuthenticated = response.data.success;
            }).catch(error =>{});
        }
    },
    created () {


    },


}
</script>

<style>
.clickable {
    -webkit-app-region: no-drag;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.white_text{
    color: white;
}
.back_text{
    color: black;
}
</style>
