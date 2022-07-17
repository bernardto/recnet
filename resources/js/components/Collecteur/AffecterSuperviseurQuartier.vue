<template>


    <v-container fluid>
        <v-row>
            <v-col cols="6">


                <v-card>

                    <v-toolbar
                        :color="aff_reaf_des === 3 ? 'error' : 'primary'"
                        dark

                    ><span class="headline" style="color: white">{{titre_data_table}}</span>

                        <v-spacer></v-spacer>
                        <v-menu offset-y transition="scale-transition">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="white"
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    Gérer
                                    <!--                                           <v-icon>mdi-menu</v-icon>-->
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item class="hover_blue" v-if="aff_reaf_des !== 1" @click="onclikGererAffDesRea(1)">
                                    <v-list-item-title  class="hover_text_white" ><v-icon>mdi-send</v-icon> AFFECTATION</v-list-item-title>
                                </v-list-item>

                                <v-list-item class="hover_blue" v-if="aff_reaf_des !== 2" @click=" data_user = []; onclikGererAffDesRea(2)">
                                    <v-list-item-title class="hover_text_white"  ><v-icon>fa-share</v-icon> RÉAFFECTATION</v-list-item-title>
                                </v-list-item>

                                <!--                                <v-list-item class="hover_blue" v-if="aff_reaf_des  !== 3" @click="onclikGererAffDesRea(3)">
                                                                    <v-list-item-title  class="hover_text_white"  ><v-icon>mdi-close</v-icon> DÉSAFFECTATION</v-list-item-title>
                                                                </v-list-item>-->

                            </v-list>
                        </v-menu>

                    </v-toolbar>

                    <v-text-field
                        v-model="search"
                        :loading="isLoadingRech"
                        clearable
                        v-if="aff_reaf_des === 1"
                        append-icon="mdi-magnify"

                        solo

                        :disabled="isLoadingRech"
                        label="Rechercher un superviseur"

                    >

                    </v-text-field>


                    <!--                    <v-list
                                            subheader
                                            two-line
                                        >



                                            <v-list-item
                                                class="hover_blue"
                                                v-for="item in data_user"
                                                :key="item.id"

                                            >

                                                <div>

                                                    <div v-if="item.photo === 'Aucune' ">
                                                        <v-avatar
                                                            size="48px"
                                                            :color="item.couleur"
                                                        >

                                                            <span  class="white&#45;&#45;text headline">{{item.nom[0]+''+item.nom[1]}}</span>
                                                        </v-avatar>
                                                    </div>


                                                    <div v-else>
                                                        <v-avatar
                                                            size="48px"

                                                        >

                                                            <img
                                                                alt="Avatar"
                                                                :src="'/storage/photo/superviseur/'+item.photo"
                                                            >

                                                        </v-avatar>
                                                    </div>

                                                </div>



                                                <v-list-item-content  class="ml-6">
                                                    <v-list-item-title  v-text="item.nom"></v-list-item-title>

                                                    <v-list-item-subtitle v-text="item.sex"></v-list-item-subtitle>
                                                </v-list-item-content>

                                                <v-list-item-action>
                                                    <v-btn icon>
                                                        <v-icon color="grey lighten-1">mdi-send</v-icon>
                                                    </v-btn>
                                                </v-list-item-action>
                                            </v-list-item>


                                        </v-list>-->


                    <v-skeleton-loader
                        class="mx-auto"
                        v-if="loading_data"
                        type="card"
                    ></v-skeleton-loader>


                    <v-data-table
                        :headers="headers"
                        v-if="!loading_data && this.data_user.length > 0"
                        :items="data_user"
                        @click:row="clickRow"
                        :items-per-page="config.pagignate"
                        :search="search"
                        sort-by="nom"
                        hide-default-footer
                        class="elevation-1"
                    >




                        <template v-slot:item.photo="{ item }">


                            <div v-if="item.photo === 'Aucune' ">
                                <v-avatar
                                    size="36px"
                                    :color="item.couleur"
                                >

                                    <span class="white--text headline">{{ item.nom[0] + '' + item.nom[1] }}</span>
                                </v-avatar>
                            </div>


                            <div v-else>
                                <v-avatar
                                    size="36px"

                                >

                                    <img
                                        alt="Avatar"
                                        :src="'storage/photo/superviseur/'+item.photo"
                                    >

                                </v-avatar>
                            </div>


                        </template>


                        <template v-slot:no-data>
                            <p class="subtitle-1">Aucun superviseur dans la base de données</p>
                        </template>

                    </v-data-table>
                </v-card>

                <v-row justify="center" v-if="dernier_page > 1  ">
                    <v-col cols="8">
                        <v-container class="max-width">
                            <v-pagination
                                v-model="page"
                                class="my-4"
                                :total-visible="7"
                                @input="getInfoUser"
                                :length="dernier_page"
                            ></v-pagination>
                        </v-container>
                    </v-col>
                </v-row>


                <div   v-if="aff_reaf_des > 1 && data_user.length <= 0">


                    <p class="headline mt-6">Liste vide! Choisissez les superviseur à {{aff_reaf_des === 2? 'réaffecter': 'désafecter'}}.</p>

                    <div class="d-flex justify-center ">
                        <img  src="assets/empty_liste.png">
                    </div>
                </div>


            </v-col>

            <v-col cols="6">


                <v-card>


                    <v-toolbar
                        color="orange acent-4"
                        dark

                    ><span class="headline">Quartiers</span></v-toolbar>



                    <p class="headline">Choisir le(s) quartier(s)</p>

                    <v-select

                        v-model="value_quartier"
                        :items="data_quartier"
                        return-object
                        :disabled="load_send || load_data_quartier"
                        :loading="load_data_quartier "
                        :error="errorBollean.quartier"
                        :error-messages="errorText.quartier"
                        item-text="lib"
                        @click="onclickQuartier()"
                        @change="onchangeQuartier()"
                        chips
                        label="Liste des quartiers"
                        multiple
                    ></v-select>


                </v-card>


                <div   v-if="aff_reaf_des === 1 && data_affectation.length <= 0">


                    <p class="text-h6 mt-6">Liste vide! Choisissez les superviseur à affecter au(x) quartier(s) sélectionné(s)</p>

                    <div class="d-flex justify-center ">
                        <img  src="assets/empty_liste.png">
                    </div>
                </div>


                <v-data-table
                    :headers="headers"
                    v-show="data_affectation.length > 0"
                    :items="data_affectation"
                    @click:row="clickRowAff"
                    :aria-disabled="load_send"
                    sort-by="id"
                    hide-default-footer
                    class="elevation-1"
                >


                    <template v-if="aff_reaf_des !== 1" v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Liste des superviseur {{ value_quartier.length > 1  ? ' des quartiers' : 'du quartier' }} sélectionné{{ value_quartier.length > 1  ? 's' : '' }}. </v-toolbar-title>

                        </v-toolbar>
                    </template>


                    <template v-slot:item.photo="{ item }">


                        <div v-if="item.photo === 'Aucune' ">
                            <v-avatar
                                size="36px"
                                :color="item.couleur"
                            >

                                <span class="white--text headline">{{ item.nom[0] + '' + item.nom[1] }}</span>
                            </v-avatar>
                        </div>


                        <div v-else>
                            <v-avatar
                                size="36px"

                            >

                                <img
                                    alt="Avatar"
                                    :src="'storage/photo/superviseur/'+item.photo"
                                >

                            </v-avatar>
                        </div>


                    </template>


                    <template v-slot:no-data>
                        <p class="subtitle-1">Ce quartier n'a aucun superviseur</p>
                    </template>

                </v-data-table>

            </v-col>

            <v-btn
                color="success"
                dark
                fixed
                bottom
                v-if="data_affectation.length > 0 && aff_reaf_des === 1 "
                right
                :loading="load_send"
                @click="validerAffection"
                class="mb-2"
            >
                <v-icon>mdi-check</v-icon>
                Valider l'affectation
            </v-btn>


            <v-btn
                color="purple"
                dark
                fixed
                bottom
                v-if="data_r_affectation.length > 0 && aff_reaf_des === 2  "
                right
                :loading="load_send"
                @click="dialog_options = true"
                class="mb-2"
            >
                <v-icon>mdi-check</v-icon>
                Valider réaffectation
            </v-btn>


            <v-btn
                color="error"
                dark
                v-if="data_d_affectation.length > 0 && aff_reaf_des === 3  "
                fixed
                bottom
                style="margin-left: 0px;"
                :loading="load_send"
                @click="dialog_confirm = true"
                class="mb-2"
            >
                <v-icon>mdi-check</v-icon>
                Valider la désafectation
            </v-btn>

            <v-snackbar
                :timeout="5000"
                v-model="afficher_snackbar"
                absolute
                right
                top
                :color="color_snack"

            >
                {{message_snackbar}}
            </v-snackbar>

        </v-row>

        <v-row justify="center">
            <v-dialog
                v-model="dialog_options"
                persistent
                max-width="350"
            >
                <v-card>
                    <v-card-title class="headline">
                        Options de réacfectation
                    </v-card-title>
                    <v-card-text>



                        <div>
                            <v-btn
                                class="ma-2"
                                color="primary"
                                dark
                                @click="validerReAffection(1)"
                            >
                                Ajouter
                                <v-icon
                                    dark
                                    right
                                >
                                    mdi-plus
                                </v-icon>
                            </v-btn>

                            <v-btn
                                class="ma-2"
                                color="red"
                                dark
                                @click="afficherDialogAttention()"
                            >
                                Ecraser
                                <v-icon
                                    dark
                                    right
                                >
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                        </div>

                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>


                        <v-btn
                            outlined
                            @click="dialog_options = false"
                        >
                            Sortir

                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog
                v-model="dialog_attention"
                persistent
                max-width="6é00"
            >
                <v-card>
                    <v-card-title class="text-justify">
                        {{data_r_affectation.length> 1 ? 'Attention les superviseur ne seront plus rattachés à un quartier ' :
                        'Attention le superviseur ne sera plus rattaché à un quartier ' }}
                    </v-card-title>
                    <v-card-text>



                        <div>
                            <v-btn
                                class="ma-2"
                                color="primary"
                                dark
                                @click="dialog_attention = false"
                            >
                                Annuler

                            </v-btn>

                            <v-btn
                                class="ma-2"
                                color="red"
                                dark
                                @click="validerReAffection(2)"
                            >
                                Je confirme
                                <v-icon
                                    dark
                                    right
                                >
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                        </div>

                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>


                        <v-btn
                            outlined
                            @click="dialog_options = false"
                        >
                            Sortir

                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-row>

        <v-row justify="center">
            <v-dialog
                v-model="dialog_confirm"
                persistent
                max-width="400"
            >
                <v-card>
                    <v-card-title class="text-h6">
                        {{ data_d_affectation.length > 1  ? 'Les superviseur' : 'Le superviseur' }} sélectionné{{ data_d_affectation.length > 1  ? 's' : '' }}
                        {{ data_d_affectation.length > 1  ? 'ne seront' : 'ne sera' }} plus affecté{{ data_d_affectation.length > 1  ? 's' : '' }}
                        à un quartier.
                    </v-card-title>
                    <v-card-text>



                        <div>


                            <v-btn
                                class="ma-2"
                                :disabled="load_send"
                                color="primary"
                                @click="dialog_confirm = false"
                                dark

                            >
                                Non anulé
                                <v-icon
                                    dark
                                    right

                                >
                                    mdi-check
                                </v-icon>
                            </v-btn>

                            <v-btn
                                class="ma-2"
                                color="error"
                                @click="validerDesafectation"
                                :loading="load_send"

                                dark

                            >
                                Oui validé
                                <v-icon
                                    dark
                                    right

                                >
                                    mdi-close
                                </v-icon>
                            </v-btn>
                        </div>

                    </v-card-text>



                </v-card>
            </v-dialog>
        </v-row>


    </v-container>

</template>

<script>
export default {
    name: "AffecterLesSuperviseu",
    props : {
        config: {},
        item : {},
    },
    mounted() {


        this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES superviseur");

        if (this.$route.query.user)
            this.user = JSON.parse(this.$route.query.user);

        this.onclikGererAffDesRea(1);
        this.remplirDataQuartier();

    },
    data: () => ({

        headers: [


            {
                text: 'Photo',
                align: 'start',
                sortable: false,
                value: 'photo',
            },
            {
                text: 'Identifiant',

                value: 'identifiant',
            },
            {
                text: 'Genre',

                value: 'sex',
            },
            {text: 'Nom', value: 'nom'},
            /*{ text: 'Quartier/Zone', value: 'affectation' },*/

        ],
        user: null,
        dialog_confirm : false,
        dialog_options: false,
        load_data_quartier: false,
        dialog_attention:  false,
        loading_data: false,
        page: 1,
        dernier_page: 1,
        color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
        data_user: [],

        data_affectation: [],
        data_n_affectation: [],
        data_r_affectation: [],
        data_d_affectation: [],


        value_rech_collecteur: [],
        data_rech_collecteur: [],
        isLoadingRech: false,
        search: null,



        aff_reaf_des : 3,
        titre_data_table :'',

        data_quartier: [],
        value_quartier: [],
        /**/
        data_zone: [],
        value_zone: [],
        load_send: false,
        color_snack: 'primary',

        errorText: {zone: '', '': false},
        message_snackbar: '',
        afficher_snackbar:  false,
        errorBollean: {zone: false, quartier: false},
    }),

    watch: {

        search(val) {
            if (!val) {
                this.getInfoUser();
            }
        }
    },
    methods: {

        afficherDialogAttention(){


            if(this.value_quartier.length === 0) {
                this.dialog_options = false;
                this.dialog_attention = true;

            }else
                this.validerReAffection(2);

        },

        onclikGererAffDesRea(val){


            switch (val){
                case 1:
                    this.data_affectation = [];
                    this.getInfoUser();
                    this.titre_data_table = "Liste des superviseur non affectés";
                    this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES superviseur");
                    break;
                case 2:

                    this.data_user = [];

                    this.titre_data_table = "Liste des superviseur  à réaffecter";
                    this.dernier_page = 0;
                    this.$root.$emit('TITRE', "GESTION DE  LA REAFFECTATION DES superviseur");
                    if (this.value_quartier.length <= 0) {
                        this.errorText.quartier = "Vous devez choisir un quartier!";
                        this.errorBollean.quartier = true;

                    }else{


                        this.getListeDesCollecteursDuQuartier();


                    }




                    break;
                case 3:
                    this.titre_data_table = "Liste des superviseur  à  désaffecter";
                    this.$root.$emit('TITRE', "GESTION DE DESAFFECTATION DES superviseur");
                    this.data_user = [];
                    this.dernier_page = 0;

                    if (this.value_quartier.length <= 0) {
                        this.errorText.quartier = "Vous devez choisir un quartier!";
                        this.errorBollean.quartier = true;

                    }else{


                        this.getListeDesCollecteursDuQuartier();



                    }


                    break;
            }
            this.aff_reaf_des = val;

        },
        remplirDataQuartier() {

            axios.post('/get_tout_quartier_aff').then(response => {


                this.data_quartier = response.data.data;


            }).catch(error => {


            });

        },

        effacerDoublonReaffectation(){


            this.data_r_affectation.forEach((item, index) => {


                item.id_qt.forEach((anc_qt, index1) => {


                    item.nv_qt.forEach((nv_qt, index2) => {




                        if(anc_qt === nv_qt){

                            item.nv_qt.splice(index2, 1);
                            return;
                        }


                    });

                });






            });

        },

        /**
         * AJOUTER OU ECRASER LES DONNEES EXITANTS
         * @param add_ecra
         */
        validerReAffection(add_ecra){

            this.dialog_options = false;
            this.dialog_attention = false;


            this.effacerDoublonReaffectation();



            this.afficher_snackbar = false;


            this.load_send = true;

            let data_a_envoyer = [];

            this.data_r_affectation.forEach((item, index1) => {

                data_a_envoyer[index1] = {id : item.id,  id_qt : item.nv_qt};


            });


            axios.post('/valider_reaffection_collecteur_quartier', {

                data_coll : data_a_envoyer,

                add_ecra : add_ecra,
            })
                .then(response => {

                    if (response.data.success) {

                        this.load_send = false;
                        this.data_affectation = [];

                        this.data_r_affectation = [];
                        this.data_affectation = [];

                        this.color_snack = 'deep-purple accent-4';
                        this.message_snackbar = "La réaffectation a été effectuée."
                        this.afficher_snackbar = true;
                        this.getListeDesCollecteursDuQuartier();

                    }
                }).catch(error => {

            })
        },


        validerDesafectation(){





            this.load_send = true;


            axios.post('/valider_desaffection_collecteur', {

                data_coll : this.data_d_affectation.map(a => a.id),

            })
                .then(response => {

                    this.dialog_confirm = false;

                    if (response.data.success) {

                        this.load_send = false;


                        this.data_d_affectation = [];
                        this.data_affectation = [];
                        this.data_user = [];

                        this.color_snack = 'grey darken-4';
                        this.message_snackbar = "La désaffectation a été effectuée."
                        this.afficher_snackbar = true;

                    }
                }).catch(error => {

            })

        },

        validerAffection() {


            this.load_send = true;
            axios.post('/valider_affection_collecteur_quartier', {
                id_coll: this.data_affectation.map(a => a.id),
                id_qt: this.value_quartier.map(a => a.id_qt)
            })
                .then(response => {

                    if (response.data.success) {

                        this.load_send = false;
                        this.data_affectation = [];

                        this.getInfoUser();

                        this.color_snack = 'primary';
                        this.message_snackbar = "L'affectation a été effectuée."
                        this.afficher_snackbar = true;

                    }

                }).catch(error => {

            })


        },
        onchangeQuartier() {
            if (this.value_quartier.length <= 0) {
                this.errorText.quartier = "Vous devez choisir un quartier!";
                this.errorBollean.quartier = true;
                this.data_affectation = [];
                this.data_r_affectation = [];

            } else {
                this.errorText.quartier = "";
                this.errorBollean.quartier = false;


                //AVOIR LA LISTE DES superviseur DEJA AFFECTES A CES QUARTIER A CES REAFFECTATION AFFECTATION
                if(this.aff_reaf_des !== 1)
                    this.onclikGererAffDesRea(this.aff_reaf_des);

                // this.getListeDesCollecteursDuQuartier();

            }


        },

        onclickQuartier() {



        },

        getListeDesCollecteursDuQuartier() {

            if (this.value_quartier.length <= 0)
                return


            axios.post('/get_collecteur_du_quartier', {id_qt: this.value_quartier.map(a => a.id_qt)}).then(response => {

                this.data_affectation = [];
                this.data_r_affectation = [];


                //Remplir la table avec les nouvelles affectation
                //Table des nouvelles affectation
                //Table de suspression des affectation

                response.data.data.forEach((item, index) => {


                    let existe = false;


                    //this.data_user = [];
                    this.data_affectation.forEach((item_aff, index) => {



                        if (item_aff.id === item.id) {
                            existe = true;
                            return;
                        }


                    });

                    let existe_user = false;

                    this.data_user.forEach((item_user, index) => {



                        if (item_user.id === item.id) {
                            existe_user = true;
                            return;
                        }


                    });

                    if (item.photo === 'Aucune') {

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    if (item.sex === 'H') {
                        item.sex = 'HOMME'
                    } else {
                        item.sex = 'FEMME';
                    }

                    item.id_qt =  item.id_qt.map(a => a.id_qt);


                    //On vérifie qu'il n'existe pas dans la table des superviseur à affecter ou réaffecter
                    if (!existe && !existe_user)
                        this.data_affectation.push(item)

                });


            }).catch(error => {

            });
        },

        onclickZone() {
            this.data_quartier = [];
            this.value_quartier = [];
        }
        ,
        onchangeZone() {




            if (this.value_zone.length <= 0) {
                this.errorText.zone = "Vous devez choisir une zone!";
                this.errorBollean.zone = true;

            } else {

                this.errorText.zone = "";
                this.errorBollean.zone = false;
                this.getQuartierDesZones();

            }

        },
        getRandomInt(max) {

            return Math.floor(Math.random() * Math.floor(max));


        },
        getInfoUser() {

            this.loading_data = true;
            axios.post('/get_info_super', {data: JSON.stringify(this.user), page: this.page}).then(response => {


                this.loading_data = false;
                let data = null;

                if (!this.user)
                    data = response.data.data.data;
                else
                    data = response.data.data;


                this.data_user = [];

                data.forEach((item, index) => {


                    let existe = false;

                    this.data_affectation.forEach((item_aff, index) => {


                        if (item_aff.id === item.id) {
                            existe = true;
                            return;
                        }


                    });

                    if (item.photo === 'Aucune') {

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    if (item.sex === 'H') {
                        item.sex = 'HOMME'
                    } else {
                        item.sex = 'FEMME';
                    }

                    item.select = false;

                    if (!existe)
                        this.data_user.push(item)

                });

                if (!this.user) {
                    this.dernier_page = response.data.data.last_page;
                    this.page = response.data.data.current_page;
                }


            }).catch(error => {


            });


        },
        getInfoQuartier() {

            axios.post('/get_info_quartier', {data: JSON.stringify(this.user)}).then(response => {

                let data = response.data.data;


                this.data_user = [];
                data.forEach((item, index) => {


                    if (item.photo === 'Aucune') {

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    if (item.sex === 'H') {
                        item.sex = 'HOMME'
                    } else {
                        item.sex = 'FEMME';
                    }


                    this.data_user.push(item)

                });

            }).catch(error => {


            });
        },

        onselectAutoComplete() {
            console.log("sds");
        },
        searchCollecteur() {


            this.loading_data = true;
            this.data_rech_collecteur = [];

            axios.post('/rechercher_collecteur', {search: this.search}).then(response => {

                /*response.data.data.forEach((item, index) => {


                    item.fic = item.nom + "("+ item.identifiant+ ")";
                    this.data_rech_collecteur.push(item)

                });*/


                this.loading_data = false;
                let data = null;
                data = response.data.data;


                this.data_user = [];

                data.forEach((item, index) => {


                    let existe = false;

                    this.data_affectation.forEach((item_aff, index) => {


                        if (item_aff.id === item.id) {
                            existe = true;
                            return;
                        }


                    });

                    if (item.photo === 'Aucune') {

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    if (item.sex === 'H') {
                        item.sex = 'HOMME'
                    } else {
                        item.sex = 'FEMME';
                    }

                    item.select = false;

                    if (!existe && item.id_qt === 0)
                        this.data_user.push(item)

                });


                this.dernier_page = 1;

            }).catch(error => {

            });


        },
        clickRow(item) {

            if (this.value_quartier.length <= 0 && this.aff_reaf_des === 1) {
                this.errorText.quartier = "Vous devez choisir un quartier!";
                this.errorBollean.quartier = true;
            } else {
                this.errorText.quartier = "";
                this.errorBollean.quartier = false;

                //  this.data_n_affectation.push(item);

                this.data_affectation.push(item);

                let existe = false;
                switch (this.aff_reaf_des){
                    case 2:

                        this.data_r_affectation.forEach((item_aff, index) => {



                            if (item_aff.id === item.id) {
                                existe = true;
                                return;
                            }


                        });





                        item.nv_qt = this.value_quartier.map(a => a.id_qt);

                        if(!existe)
                            this.data_r_affectation.push(item)

                        break;
                    case 3:



                        this.data_d_affectation.forEach((item_aff, index) => {



                            if (item_aff.id === item.id) {
                                this.data_d_affectation.splice(index, 1)
                            }


                        });

                        break;

                }

                this.data_user.splice(this.data_user.indexOf(item), 1);
            }


        },
        clickRowAff(item) {
            this.data_user.push(item)

            switch (this.aff_reaf_des){
                case 2:

                    this.data_r_affectation.forEach((item_aff, index) => {



                        if (item_aff.id === item.id) {
                            this.data_r_affectation.splice(index, 1)
                        }


                    });


                    break;
                case 3:



                    let existe = false;
                    this.data_d_affectation.forEach((item_aff, index) => {



                        if (item_aff.id === item.id) {
                            existe = true;
                            return;
                        }


                    });


                    if(!existe)
                        this.data_d_affectation.push(item)

                    break;
            }

            this.data_affectation.splice(this.data_affectation.indexOf(item), 1)
        },
    }
}
</script>

<style>


.hover_blue:hover {
    background-color: #1867c0;

}
.hover_text_white:hover {
    color: #fff;

}
</style>
