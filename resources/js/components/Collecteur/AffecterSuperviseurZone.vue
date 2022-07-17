<template>



    <v-card fluid :disabled="load_send || loading_data || load_data_zone">
        <v-row fluid>



            <v-col cols="6">


                <v-btn
                    depressed

                    :outlined="aff_reaf_des === 1"
                    color="primary"
                    large
                    @click="onclikGererAffDesRea(1)"
                >
                    <v-icon>mdi-send</v-icon>  AFFECTATION
                </v-btn>


                <v-btn
                    depressed
                    large
                    :outlined="aff_reaf_des === 2"


                    @click="onclikGererAffDesRea(2)"
                    color="orange"
                >
                    <v-icon>fa-share</v-icon>   REAFFECTATION
                </v-btn>



                <v-btn
                    depressed

                    large

                    :outlined="aff_reaf_des === 3"
                    @click="onclikGererAffDesRea(3)"
                    color="error"
                >
                    <v-icon>mdi-close</v-icon>   désaffectation
                </v-btn>


            </v-col>

            <v-col cols="6">
                <v-checkbox
                    v-if="aff_reaf_des === 1"
                    v-model="checkboxnAss"

                    label="superviseurs qui n'ont pas de zone"
                    color="primary"
                    value="red"
                    @change=" "
                    class="perso_ch"
                ></v-checkbox>
            </v-col>


        </v-row>

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

                                <v-list-item class="hover_blue" v-if="aff_reaf_des !== 2" @click=" data_superviseur = []; onclikGererAffDesRea(2)">
                                    <v-list-item-title class="hover_text_white"  ><v-icon>fa-share</v-icon> RÉAFFECTATION</v-list-item-title>
                                </v-list-item>

                                <v-list-item class="hover_blue" v-if="aff_reaf_des  !== 3" @click="onclikGererAffDesRea(3)">
                                    <v-list-item-title  class="hover_text_white"  ><v-icon>mdi-close</v-icon> DÉSAFFECTATION</v-list-item-title>
                                </v-list-item>

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
                                                v-for="item in data_superviseur"
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
                        v-if="!loading_data && this.data_superviseur.length > 0"
                        :items="data_superviseur"
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


                <div   v-if="aff_reaf_des > 1 && data_superviseur.length <= 0">


                    <p class="headline mt-6">Liste vide! Choisissez les superviseurs à {{aff_reaf_des === 2? 'réaffecter': 'désaffecter'}}.</p>

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

                    ><span class="headline">Zones</span></v-toolbar>



                    <p class="headline">Choisir le(s) zone(s)</p>
                    <v-select

                        v-model="value_zone"
                        multiple
                        :items="data_zone"
                        return-object
                        :disabled="load_send || load_data_zone"
                        :loading="load_data_zone "
                        :error="errorBollean.zone"
                        :error-messages="errorText.zone"
                        item-text="lib"

                        @change="onchangeZone()"
                        chips
                        label="Liste des zones"
                    ></v-select>


                </v-card>


                <div   v-if="aff_reaf_des === 1 && data_affectation.length <= 0">


                    <p class="text-h6 mt-6">Liste vide! Choisissez les superviseurs à affecter au(x) zone(s) sélectionnée(s)</p>

                    <div class="d-flex justify-center ">
                        <img  src="assets/empty_liste.png">
                    </div>
                </div>


                <v-data-table
                    :headers="headers2"
                    v-show="data_affectation.length > 0 && !load_data_zone"
                    :items="data_affectation"
                    @click:row="clickRowAff"
                    :aria-disabled="load_send || load_data_zone"
                    sort-by="id"
                    hide-default-footer
                    class="elevation-1"
                >


                    <template v-if="aff_reaf_des !== 1" v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title class="font-weight-black">Liste des superviseurs {{ value_zone.length > 1  ? ' affectés aux  zones' : 'affecté à la zone' }} sélectionnée{{ value_zone.length > 1  ? 's' : '' }}. </v-toolbar-title>

                        </v-toolbar>
                    </template>
                    <template  v-slot:item.new="{ item }">
                        <v-chip

                            :color="item.new"
                            v-show="item.new"

                            dark
                        >
                            nouvelle affectation
                        </v-chip>
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




                </v-data-table>
                <div v-show="value_zone.length > 0 && aff_reaf_des > 1 && data_affectation.length <= 0">
                    <p  class="headline font-weight-black">Aucun superviseur est affecté à {{value_zone.length > 1 ? "ces ("+ value_zone.length+"  zones )" : "cette zone"}}</p>

                    <div  class="d-flex justify-center ">
                        <img  src="assets/pas_trouve.png">
                    </div>
                </div>
            </v-col>

            <v-btn
                color="success"
                dark
                fixed
                bottom
                v-if="data_affectation.length >  0 && aff_reaf_des === 1 && value_zone.length > 0"
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
                v-if="data_r_affectation.length > 0 && aff_reaf_des === 2  && value_zone.length > 0"
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
                Valider la désaffectation
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
                max-width="500"
            >
                <v-card>
                    <v-card-title class="headline">
                        Options de reaffectation
                    </v-card-title>
                    <v-card-text>



                        <div>
                            <v-btn
                                class="ma-2"
                                color="primary"
                                dark
                                @click="afficherDialogAttentionReaffectation(1)"
                            >
                                Ajouter aux zone(s) existante(s)
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
                                @click="afficherDialogAttentionReaffectation(2)"
                            >
                                Ecraser les ancienne(s)  zone(s)
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
                max-width="600"
            >
                <v-card>
                    <v-card-title class="headline">
                        {{data_r_affectation.length> 1 ? 'Attention les superviseurs ne seront plus rattachés à une zone ' :
                        'Attention le superviseur ne sera plus rattaché à une zone ' }}
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
                        {{ data_d_affectation.length > 1  ? 'Les superviseurs' : 'Le superviseur' }} sélectionné{{ data_d_affectation.length > 1  ? 's' : '' }}
                        {{ data_d_affectation.length > 1  ? 'ne seront' : 'ne sera' }} plus affecté{{ data_d_affectation.length > 1  ? 's' : '' }}
                        {{value_zone.length <= 1?'à  la zone selectionnée' : 'aux zones selectionnées'}}.
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
                                @click="validerDesaffectation"
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


        <v-row justify="center">
            <template>
                <v-row justify="center">
                    <v-dialog
                        v-model="dialog_attention_reacffec"
                        persistent
                        max-width="490"
                    >

                        <v-card>
                            <v-card-title class="text-h3">
                                Attention
                            </v-card-title>
                            <v-card-text class="text-md-h4">{{message_dialog_attention}}</v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog_attention_reacffec = false"
                                >
                                    NON SORTIR
                                </v-btn>
                                <v-btn
                                    color="red darken-1"
                                    text
                                    @click="validerReAffection(value_add_ecraser)"
                                >
                                    OUI CONFIRMER
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </template>
        </v-row>



    </v-card>

</template>

<script>
export default {
    name: "AffectersuperviseurZone",
    props : {
        config: {},
        item : {},
    },
    mounted() {


        this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES superviseurS");

        if (this.$route.query.user)
            this.user = JSON.parse(this.$route.query.user);

        this.aff_reaf_des = 1;
        this.onclikGererAffDesRea(1);
        this.remplirDataZone();

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
        headers2: [


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
            {text: '', value: 'new'}
            /*{ text: 'Quartier/Zone', value: 'affectation' },*/

        ],
        user: null,

        dialog_confirm : false,
        dialog_options: false,
        dialog_attention_reacffec : false,
        dialog_attention:  false,

        load_data_zone: false,
        checkboxnAss : false,

        loading_data: false,
        page: 1,
        dernier_page: 1,
        color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
        data_superviseur: [],


        data_affectation: [],
        data_n_affectation: [],
        data_r_affectation: [],
        data_d_affectation: [],


        value_rech_superviseur: [],
        data_rech_superviseur: [],
        isLoadingRech: false,
        search: "",



        aff_reaf_des : 3,
        value_add_ecraser: 0, //ajouter ou ecraser lors de l'affectation
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
        message_dialog_attention :"",
        afficher_snackbar:  false,
        errorBollean: {zone: false, quartier: false},
    }),

    watch: {

        checkboxnAss(val){

            if(this.checkboxnAss){

                this.getInfoCollNonAss();
            }else {

                this.getInfoUser();
            }

        },

        search(val) {
            if (!val) {
                this.getInfoUser();
            }

        }
    },
    methods: {

        afficherDialogAttention(){

            if(this.value_zone.length === 0) {
                this.dialog_options = false;
                this.dialog_attention = true;

            }else
                this.validerReAffection(2);

        },
        afficherDialogAttentionReaffectation(val){
            this.dialog_options = false;
            this.value_add_ecraser = val;
            if(val === 1){

                if(this.data_affectation > 1){
                    this.message_dialog_attention = "Vous allez ajouter les zone(s) sélectionnée(s) aux affections des superviseurs";
                }else{
                    this.message_dialog_attention = "Vous allez ajouter les zone(s) sélectionnée(s) aux affections du superviseur";
                }
            }else{
                if(this.data_affectation > 1){
                    this.message_dialog_attention =  "Les superviseurs seront désormais affectés aux zone(s) sélectionnée(s)";
                }else{
                    this.message_dialog_attention = "Le superviseur sera désormais affecté aux zone(s) sélectionnée(s)";
                }

            }
            this.dialog_attention_reacffec = true;


        },
        onclikGererAffDesRea(val){

            this.aff_reaf_des = val;
            switch (val){
                case 1:
                    this.data_affectation = [];
                    this.getInfoUser();
                    this.titre_data_table = "Liste des superviseurs.";
                    this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES superviseurS");
                    break;
                case 2:
                    this.data_superviseur = [];
                    this.data_r_affectation = [];
                    this.data_affectation = [];
                    this.titre_data_table = "Liste des superviseurs  à réaffecter";
                    this.dernier_page = 0;
                    this.$root.$emit('TITRE', "GESTION DE  LA REAFFECTATION DES superviseurS");
                    if (this.value_zone.length <= 0) {

                        this.errorText.quartier = "Vous devez choisir une zone!";
                        this.errorBollean.quartier = true;

                    }else{


                        this.getListeDessuperviseursZone();


                    }




                    break;
                case 3:
                    this.titre_data_table = "Liste des superviseurs  à  désaffecter";
                    this.$root.$emit('TITRE', "GESTION DE DESAFFECTATION DES superviseurS");
                    this.data_superviseur = [];

                    this.data_d_affectation = [];
                    this.data_affectation = [];
                    this.dernier_page = 0;

                    if (this.value_quartier.length <= 0) {

                        this.errorText.quartier = "Vous devez choisir une zone!";
                        this.errorBollean.quartier = true;

                    }else{


                        this.getListeDessuperviseursZone();



                    }


                    break;
            }


        },
        remplirDataZone() {

            axios.post('/get_tout_zone').then(response => {


                this.data_zone = response.data.data;


            }).catch(error => {


            });

        },

        effacerDoublonReaffectation(){



            this.data_r_affectation.forEach((item, index) => {

                item.nv_zn = this.value_zone.map(a => a.id_zn);


            });


            this.data_r_affectation.forEach((item, index) => {


                item.id_zn.forEach((anc_zn, index1) => {


                    item.nv_zn.forEach((nv_zn, index2) => {


                        if(anc_zn === nv_zn){

                            item.nv_zn.splice(index2, 1);
                            return;
                        }


                    });

                });



                if(item.nv_zn.length <= 0){
                    this.data_r_affectation.splice(index,1);
                }



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




            let data_a_envoyer = [];

            this.data_r_affectation.forEach((item, index1) => {

                data_a_envoyer[index1] = {id : item.id,  id_zn : item.nv_zn};


            });






            if(data_a_envoyer.length <= 0){

                this.color_snack = 'red accent-4';
                this.message_snackbar = "Duplication de la zone."
                this.afficher_snackbar = true;


                this.load_send = false;


                return;

            }

            this.dialog_attention_reacffec = false;
            this.load_send = true;

            axios.post('/valider_reaffection_collecteur_zone', {

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
                        this.getListeDessuperviseursZone();

                    }
                }).catch(error => {

            })
        },


        validerDesaffectation(){





            this.load_send = true;


            axios.post('/valider_desaffection_collecteur_zone', {

                data_coll : this.data_d_affectation.map(a => a.id),
                id_zn: this.value_zone.map(a => a.id_zn)

            })
                .then(response => {

                    this.dialog_confirm = false;

                    if (response.data.success) {

                        this.load_send = false;


                        this.data_d_affectation = [];
                        this.data_affectation = [];
                        this.data_superviseur = [];

                        this.color_snack = 'grey darken-4';
                        this.message_snackbar = "La désaffectation a été effectuée."
                        this.afficher_snackbar = true;

                    }
                }).catch(error => {

            })

        },

        validerAffection() {


            this.load_send = true;
            axios.post('/valider_affection_collecteur_zone', {
                id_coll: this.data_affectation.map(a => a.id),
                id_zn: this.value_zone.map(a => a.id_zn)
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
        onchangeZone() {



            if (this.value_zone.length <= 0) {

                this.errorText.zone = "Vous devez choisir une zone!";
                this.errorBollean.zone = true;

                if(this.aff_reaf_des > 1){
                    this.data_affectation = [];
                }


            } else {
                this.errorText.zone = "";
                this.errorBollean.zone = false;

                if(this.aff_reaf_des > 1)
                    this.getListeDessuperviseursZone();


                else{

                    this.data_affectation.forEach((item_aff, index) => {

                        if(this.verifierEstDejaAttribuesuperviseur(item_aff)){
                            this.data_affectation.splice(this.data_affectation.indexOf(item_aff), 1);
                            this.data_superviseur.push(item_aff);
                        }



                    });
                }

            }



        },

        onclickQuartier() {



        },

        getListeDessuperviseursZone() {

            if (this.value_zone.length <= 0)
                return


            this.load_data_zone = true;
            axios.post('/get_collecteur_zone', {est_superviseur : 1, id_zn: this.value_zone.map(a => a.id_zn)}).then(response => {

                this.data_affectation = [];
                this.data_r_affectation = [];


                response.data.data.forEach((item, index) => {


                    //existe dans la table liste des superviseurs de la zone
                    let existe = false;


                    this.data_affectation.forEach((item_aff, index) => {



                        if (item_aff.id === item.id) {
                            existe = true;
                            return;
                        }


                    });

                    //existe dans la table liste des superviseurs à affecter
                    let existe_user = false;

                    this.data_superviseur.forEach((item_user, index) => {



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

                    item.id_zn =  item.id_zn.map(a => a.id_zn);


                    //On vérifie qu'il n'existe pas dans la table des superviseurs à affecter ou réaffecter
                    if (!existe && !existe_user)
                        this.data_affectation.push(item)

                });


                this.load_data_zone = false;

            }).catch(error => {

            });
        },


        getRandomInt(max) {

            return Math.floor(Math.random() * Math.floor(max));


        },
        getInfoUser() {


            this.loading_data = true;
            axios.post('/get_info_sup', {data: JSON.stringify(this.user), page: this.page}).then(response => {


                this.loading_data = false;
                let data = null;

                if (!this.user)
                    data = response.data.data.data;
                else
                    data = response.data.data;


                this.data_superviseur = [];

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
                    item.id_zn =  item.id_zn.map(a => a.id_zn);
                    item.id_qt = null;

                    if (!existe) {
                        this.data_superviseur.push(item);

                    }
                });

                if (!this.user) {
                    this.dernier_page = response.data.data.last_page;
                    this.page = response.data.data.current_page;
                }


            }).catch(error => {


            });


        },


        getInfoCollNonAss() {

            this.loading_data = true;
            axios.post('/get_coll_non_ass_zone',{est_superviseur : 1}).then(response => {


                this.loading_data = false;
                let data = null;

                if (!this.user)
                    data = response.data.data.data;
                else
                    data = response.data.data;


                this.data_superviseur = [];

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
                        this.data_superviseur.push(item)

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


                this.data_superviseur = [];
                data.forEach((item, index) => {


                    if (item.photo === 'Aucune') {

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    if (item.sex === 'H') {
                        item.sex = 'HOMME'
                    } else {
                        item.sex = 'FEMME';
                    }


                    this.data_superviseur.push(item)

                });

            }).catch(error => {


            });
        },

        onselectAutoComplete() {
            console.log("sds");
        },
        searchsuperviseur() {



            if(this.search.length < 3){

                this.color_snack = 'red accent-4';
                this.message_snackbar = "Le champ de recherche est trop court"
                this.afficher_snackbar = true;
                return;
            }
            this.loading_data = true;
            this.data_rech_superviseur = [];

            axios.post('/rechercher_superviseur', {search: this.search}).then(response => {

                /*response.data.data.forEach((item, index) => {


                    item.fic = item.nom + "("+ item.identifiant+ ")";
                    this.data_rech_superviseur.push(item)

                });*/


                this.loading_data = false;
                let data = null;
                data = response.data.data;


                this.data_superviseur = [];

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

                    if (!existe )
                        this.data_superviseur.push(item)

                });


                this.dernier_page = 1;

            }).catch(error => {

            });


        },
        verifierEstDejaAttribuesuperviseur(item){

            let nv_zn = this.value_zone.map(a => a.id_zn);
            let a_deja_zone = 0;

            item.id_zn.forEach((anc_zn, index1) => {


                nv_zn.forEach((nv_zn, index2) => {


                    if(anc_zn === nv_zn){

                        a_deja_zone ++;

                    }


                });

            });
            console.log(a_deja_zone +"==="+ this.value_zone.length);
            return a_deja_zone ===  this.value_zone.length;



        },
        clickRow(item) {

            if (this.value_zone.length <= 0 && this.aff_reaf_des <= 2) {
                this.errorText.zone = "Vous devez choisir une zone!";
                this.errorBollean.quartier = true;
            } else {
                this.errorText.zone = "";
                this.errorBollean.zone = false;

                //  this.data_n_affectation.push(item);


                let existe = false;




                switch (this.aff_reaf_des){
                    case 1:

                        if(this.verifierEstDejaAttribuesuperviseur(item)) {
                            this.erreurAlert();
                        }else
                            this.affectersuperviseur(item);

                        break;

                    case 2:

                        if(this.verifierEstDejaAttribuesuperviseur(item)){
                            item.new = null;
                        }else
                            item.new = "red";

                        this.data_r_affectation.forEach((item_aff, index) => {
                            if (item_aff.id === item.id) {
                                existe = true;
                                return;
                            }


                        });


                        if(!existe && item.new){
                            item.nv_zn = this.value_zone.map(a => a.id_zn);
                            this.data_r_affectation.push(item);
                            this.affectersuperviseur(item);
                        }else
                            this.erreurAlert();


                        break;
                    case 3:



                        this.data_d_affectation.forEach((item_aff, index) => {



                            if (item_aff.id === item.id) {
                                this.data_d_affectation.splice(index, 1);
                                this.affectersuperviseur(item);
                            }


                        });

                        break;

                }


            }


        },

        affectersuperviseur(item){
            this.data_affectation.push(item);
            this.data_superviseur.splice(this.data_superviseur.indexOf(item), 1);
        },
        erreurAlert(){

            let message = "";
            if (this.value_zone.length > 1)
                message = "Ce superviseur est déjà attribué aux zones sélectionnées";
            else
                message = "Ce superviseur est déjà attribué à la zone sélectionnée";


            this.color_snack = 'red darken-4';
            this.message_snackbar = message
            this.afficher_snackbar = true;
        },
        clickRowAff(item) {
            this.data_superviseur.push(item)

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

.perso_ch label{
    font-size: 25px;
}
.hover_blue:hover {
    background-color: #1867c0;

}
.hover_text_white:hover {
    color: #fff;

}
</style>
