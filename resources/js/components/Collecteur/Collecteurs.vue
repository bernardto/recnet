<template>
    <div>
        <v-overlay v-model="loading_data">
            <v-progress-circular

                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
        <div v-if="!fiche">
            <v-skeleton-loader
                class="mx-auto"
                v-if="loading_data"
                type="card"
            ></v-skeleton-loader>


            <v-data-table
                :headers="headers"
                v-if="!loading_data"
                :items="data_collecteur"
                @click:row="clickRow"
                sort-by="identifiant"
                hide-default-footer
                :items-per-page="config.pagignate"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-btn
                            color="primary accent-4"
                            dark
                            outlined
                            :disabled="data_collecteur.length <= 0"

                            @click="imprimerListe"


                        >
                            <v-icon>mdi-printer-settings</v-icon>
                            Imprimer
                        </v-btn>

                        <v-divider
                            class="mx-4"
                            inset

                            vertical
                        ></v-divider>
    <!--                    <span v-if="data_collecteur.length > 0"> {{total}} FCFA </span>-->


                        <v-btn
                            color="orange accent-4"
                            dark
                            class="mb-2"
                            @click="newItem"


                        >
                            <v-icon>mdi-plus</v-icon> Ajouter
                        </v-btn>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                            <!--     v-on:change="changerEtat"
                           -->

                                <v-text-field
                                    dense
                                    hide-details
                                    solo
                                    v-model="search"
                                    clearable
                                    prepend-inner-icon="mdi-magnify"
                                    label="Rechercher un collecteur"

                                />

                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-select


                            item-text="lib"
                            v-model="value_main_tri"
                            :items="data_main_tri"
                            return-object
                            @change="updateTri"
                            dense
                            class="mt-3"
                            outlined
                            label="Trier par"
                        ></v-select>

                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>

                        <v-select
                            :items="data_option_tri"
                            v-model="value_option_tri"
                            outlined
                            return-object
                            @change="remplirTableCollecteur()"
                            dense
                            item-text="lib"
                            v-if="value_main_tri.id !== 1"
                            label="Options de tri"
                        ></v-select>





                        <v-btn
                            color="orange accent-4"
                            dark
                            fab
                            v-if="false"
                            fixed
                            right
                            @click="newItem"
                            small
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>

                        <v-dialog
                            v-model="dialog"
                            persistent


                        >

                            <v-card :loading="loadform">
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>

                                    <v-spacer></v-spacer>

                                    <v-btn
                                        class="ma-2"
                                        outlined
                                        fab
                                        small
                                        @click="dialog =false"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>


                                        <v-row>
                                            <v-col  cols="4">


                                                <v-avatar
                                                    color="primary"
                                                    rounded
                                                    v-if="editedIndex === -1"
                                                    class="mb-3"

                                                    size="128"
                                                ></v-avatar>


                                                <div v-else>

                                                    <div v-if="editedItem.photo === 'user' ">
                                                        <v-avatar
                                                            size="128px"
                                                            :color="editedItem.couleur"
                                                        >

                                                            <span  class="white--text headline">{{editedItem.nom[0]+''+editedItem.nom[1]}}</span>
                                                        </v-avatar>
                                                    </div>


                                                    <div v-else>
                                                        <v-avatar
                                                            size="128px"

                                                        >

                                                            <img
                                                                alt="Avatar"
                                                                :src="'/storage/photo/collecteur/'+editedItem.photo"
                                                            >

                                                        </v-avatar>
                                                    </div>

                                                </div>

                                                <!--  Vérifier si ce n'est pas null         -->
                                                <v-file-input
                                                    v-model="file"
                                                    show-size
                                                    truncate-length="15"
                                                    :disabled="loadform"
                                                    accept="image/png, image/jpeg, image/bmp"
                                                    :placeholder="editedIndex === -1 ?  'Ajouter' : 'Modifier'"
                                                    prepend-icon="mdi-camera"
                                                    :label="editedIndex === -1 ?  'Ajouter' : 'Modifier'"
                                                ></v-file-input>



    <!--
                                                <v-btn
                                                    color="grey darken-4"
                                                    text
                                                    outlined
                                                    class="mt-2"
                                                    @click=""
                                                >
                                                   <v-icon>mdi-pencil</v-icon> {{editedIndex === -1 ?  'Ajouter' : 'Modifier' }}

                                                </v-btn>
    -->

                                            </v-col>


                                            <v-col  cols="8">

                                            <v-row>
                                                <v-col
                                                    cols="12"
                                                >
                                                    <v-text-field
                                                        label="Identifiant/Matricule"
                                                        :disabled="loadform"
                                                        v-model="editedItem.identifiant"
                                                        :error-messages="editedItemTextError.identifiant"
                                                        :error="editedItemBooleanError.identifiant"
                                                        required
                                                    ></v-text-field>
                                                </v-col>


                                                <v-col
                                                    cols="12"
                                                >
                                                    <v-text-field
                                                        label="Nom"
                                                        :disabled="loadform"
                                                        v-model="editedItem.nom"
                                                        :error-messages="editedItemTextError.nom"
                                                        :error="editedItemBooleanError.nom"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
"
                                                <v-col
                                                    cols="12"
                                                >
                                                    <v-text-field
                                                        label="Prenom"
                                                        v-model="editedItem.prenom"
                                                        :disabled="loadform"
                                                        :error-messages="editedItemTextError.prenom"
                                                        :error="editedItemBooleanError.prenom"
                                                        required
                                                    ></v-text-field>
                                                </v-col>


<!--                                                <v-col  cols="12">

                                                    <v-select

                                                        v-model="value_comf"
                                                        :items="data_comf"
                                                        return-object
                                                        :disabled="loadform"
                                                        :error-messages="editedItemTextError.compf"
                                                        :error="editedItemBooleanError.compf"
                                                        item-text="lib"
                                                        solo
                                                        label="Choisir un compte fonctionnel"

                                                    ></v-select>

                                                </v-col>-->
                                                <v-col cols="12">



                                                    <v-radio-group
                                                        :disabled="loadform"  v-model="editedItem.genre"   row>
                                                        <v-radio color="orange accent-4"   label="Homme" value="H"></v-radio>
                                                        <v-radio color="orange accent-4"   label="Femme" value="F"></v-radio>
                                                    </v-radio-group>

                                                </v-col>


                                                <v-col cols="12">
                                                    <v-menu
                                                        ref="menu"
                                                        v-model="menu2"
                                                        :close-on-content-click="false"
                                                        :disabled="loadform"
                                                        :return-value.sync="editedItem.date_naissance"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="290px"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                v-model="editedItem.date_naissance"
                                                                label="Date de naissance"
                                                                prepend-icon="mdi-calendar"
                                                                readonly

                                                                v-bind="attrs"
                                                                v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="editedItem.date_naissance"
                                                            no-title

                                                            :disabled="loadform"
                                                            :max="new Date().toISOString().substr(0, 10)"
                                                            locale="fr-fr"
                                                            scrollable
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn
                                                                text
                                                                color="primary"

                                                                @click="menu2 = false"
                                                            >
                                                                Sortir
                                                            </v-btn>
                                                            <v-btn
                                                                text
                                                                :disabled="loadform"
                                                                color="primary"
                                                                @click="$refs.menu.save(editedItem.date_naissance)"
                                                            >
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>


                                                <v-col cols="12">
                                                    <v-text-field
                                                        label="Email"

                                                        :disabled="loadform"
                                                        v-model="editedItem.email"
                                                        :error-messages="editedItemTextError.email"
                                                        :error="editedItemBooleanError.email"
                                                        required
                                                    ></v-text-field>
                                                </v-col>


                                                <v-col cols="12">
                                                    <v-text-field
                                                        label="Numéro"
                                                        v-model="editedItem.numero"

                                                        :disabled="loadform"
                                                        :error-messages="editedItemTextError.numero"
                                                        :error="editedItemBooleanError.numero"
                                                        required
                                                    ></v-text-field>


                                                </v-col>




                                                <v-col cols="12">
                                                    <v-text-field
                                                        label="Numéro de la carte d'identité "
                                                        v-model="editedItem.num_cni"

                                                        :disabled="loadform"
                                                        :error-messages="editedItemTextError.num_cni"
                                                        :error="editedItemBooleanError.num_cni"
                                                        required
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col  v-if="error" cols="12"  >
                                                    <div class="red darken-2 text-center">
                                                        <span class="white--text">{{text_error}}</span>
                                                    </div>
                                                </v-col>


                                                <v-col cols="12" v-if="editedIndex < 0">


                                                    <v-switch
                                                        v-model="editedItem.est_superviseur"
                                                        inset
                                                        label="Définir comme superviseur"
                                                    ></v-switch>

                                                </v-col>

                                            </v-row>

                                            </v-col>


                                        </v-row>


                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="grey accent-1"
                                        text
                                        outlined
                                        :disabled="loadform"
                                        @click="close"
                                    >
                                        <v-icon>mdi-cancel</v-icon> Annuler
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        outlined
                                        :loading="loadform"
                                        @click="envoyerDonnee"
                                    >
                                        <v-icon>mdi-send</v-icon>  {{editedIndex === -1 ?  'Ajouter' : 'Modifier'}}
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Voulez-vous vraiment supprimer?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Sortir</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-toolbar>
                </template>


                <template v-slot:item.select="{ item }">

                        <v-simple-checkbox
                            v-model="item.select"
                            v-context-menu="'cm-for-list-item'"
                            @click="selectItem(item)"

                        ></v-simple-checkbox>

                </template>


                <template v-slot:item.photo="{ item }">


                    <div v-if="item.photo === 'user' ">
                        <v-avatar
                            size="36px"
                            :color="item.couleur"
                        >

                            <span  class="white--text headline">{{item.nom[0]+''+item.nom[1]}}</span>
                        </v-avatar>
                    </div>


                    <div v-else>
                        <v-avatar
                            size="36px"

                        >

                            <img
                                alt="Avatar"
                                :src="'storage/photo/collecteur/'+item.photo"
                            >

                        </v-avatar>
                    </div>


                </template>


                <template v-slot:no-data>
                    <p class="subtitle-1">Aucune donnée disponible</p>
                </template>

            </v-data-table>

            <v-row justify="center" v-if="dernier_page > 1 || loading_data">
                <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                            v-model="page"
                            class="my-4"
                            :total-visible="8"
                            @input="remplirTableCollecteur()"
                            :length="dernier_page"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-dialog
                    v-model="dialog_options"
                    persistent
                    max-width="550"
                >
                    <v-card>
                        <v-card-title class="headline">
                            Que voulez-vous faire
                        </v-card-title>
                        <v-card-text>



                                <div>
                                    <v-btn
                                        class="ma-2"
                                        color="primary"
                                        dark
                                        @click="editItem"
                                    >
                                        Modifier
                                        <v-icon
                                            dark
                                            right
                                        >
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>

                                    <v-btn
                                        class="ma-2"
                                        color="red"
                                        v-show="false"
                                        dark
                                        @click="deleteItem"
                                    >
                                        Supprimer
                                        <v-icon
                                            dark
                                            right
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>

                                    <v-btn
                                        class="ma-2"
                                        color="orange accent-4"
                                        dark
                                        @click="fiche = !fiche"
                                    >
                                        <v-icon
                                            dark
                                            left
                                        >
                                            fa-th
                                        </v-icon>Voir la Fiche
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




            <v-btn
                bottom
                color="orange accent-4"
                dark
                fab
                fixed
                right
                @click="newItem"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>

    <!--        <v-btn
                bottom
                dark
                fab
                v-if="data_collecteur.length > 0"
                fixed
                left
                @click="dialog_cause =  !dialog_cause "
            >
                <v-icon>mdi-send</v-icon>

            </v-btn>-->
            <v-row justify="center">

                <v-dialog
                    v-model="dialog_termine"
                    persistent
                    max-width="420"
                >
                    <v-card>




                    </v-card>
                </v-dialog>
            </v-row>
        </div>
        <div v-if="fiche">
            <FicheCollecteur :item="editedItem"/>
        </div>

        <context-menu ref="cm-for-list-item"  v-show="enable_cm"  @opened="cmIsOpened" @closed="cmIsClosed">


                <v-btn
                        v-for="(item, i) in itemsContext"
                        :key="i"

                        color="orange accent-4"
                        dark
                        @click="clickContextMenu(item)"

                        class="mb-2 mt-2"
                    >


                            <v-icon>{{item.icon}}</v-icon> {{item.text}}


                    </v-btn>


        </context-menu>
    </div>
</template>
<script>
import FicheCollecteur from "./FicheCollecteur";
export default {
    components: {FicheCollecteur},

    mounted() {

        this.$root.$emit('TITRE', "GESTION DES COLLECTEURS");
        this.$root.$on('close_fiche', data => {
            this.fiche = !this.fiche;
            this.dialog_options = false;
        });

     //   this.getCompteFonctionnel();
        if(window.innerWidth > 600){
            this.max_width_dialog =  590;
        }
        this.isMobile = window.innerWidth <= 600;

        this.getDataQuartier();
        this.getDataZone();

        this.remplirTableCollecteur();
    },
    data: () => ({
        dialog: false,
        loading_data : true,
        dialog_options: false,

        page : 1,
        dernier_page : 1,

        itemsContext: [
            { text: 'Affecter', icon: 'mdi-send', id : 1, },
            { text: 'Autre', icon: 'mdi-menu'  ,id:   2,},
        ],
        search :  "",
        offset: true,
        id_demande : 0,
        dialogDelete: false,
        isMobile : false,
        lien_site : location.protocol + '//' + location.host,
        loadform : false,
        dialog_termine: false,
        max_width_dialog: 390,
        total: 0,
        headers: [


            {
                text: 'Photo',
                align: 'start',
                sortable: false,
                value: 'photo',
            },
            {
                text: 'Identifiant',
                align: 'start',
                value: 'identifiant',
            },
            { text: 'Nom', value: 'nom' },
            { text: 'Genre', value: 'genre' },
            { text: 'Numéro', value: 'numero', sortable: false },
            /*{ text: 'Quartier/Zone', value: 'affectation' },*/
            /*{ text: 'Selection', value: 'select',  },*/
        ],
        data_main_tri: [
            {
                id: 1,
                lib: "Tous les résultats"
            },
            {
                id: 2,
                lib: "Quartier"
            },
            {
                id: 3,
                lib: "Zone"
            }

        ],
        value_main_tri: {
            id: 1,
            lib: "Tout"
        },


        data_option_tri: [],
        value_option_tri: {},

        data_quartier_tri: [],
        data_zone: [],

        data_collecteur: [],
        editedIndex: -1,
        color_array : ['blue', 'cyan','green','orange','grey'],
        editedItem: {

            nom : 'TOTO',
            prenom: 'BERNARD',
            photo : '',
            genre: 'F',
            date_naissance :  new Date().toISOString().substr(0, 10),
            email : 'totobernard09@gmail.com',
            numero : '+2257803638',
            identifiant : '747488',
            num_cni : '123456788888',
            est_superviseur: false,


        },
        editedItemTextError: {

            nom : '',
            prenom: '',
            genre: '',
            compf: '',
            photo : '',
            date_naissance : '',
            email : '',
            numero : '',

            file_photo: '',
            num_cni : '',
            identifiant : '',


        },
        editedItemBooleanError: {

            nom : false,
            prenom: false,
            genre: false,
            compf: false,
            date_naissance :  false,
            email : false,
            photo : false,
            numero : false,
            num_cni : false,
            file_photo: false,
            identifiant: false,


        },



        file : null,
        menu2: false,
        niveau_load : 0,
        error: true,
        text_error: '',
        enable_cm : false,
        searchData : '',
        fiche : false,
        value_comf:[],
        data_comf:[],
        context_menu_open : false,
        itemSelect :{
            nb : 0,
            id :[],
        },
        date_naissance: new Date().toISOString().substr(0, 10),
    }),

    props : {
        config: {},
        item : {},
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Ajouter un collecteur' : 'Modifier un collecteur'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        searchData(val){
            this.rechercherCollecteur();
        }

    },


    created () {
        this.initialize()
    },


    methods: {


        imprimerListe() {

            this.loading_data = true;


            //window.open("/contribuable_liste?id="+JSON.stringify(this.data_contribuable.map(a => a.id)), "_blank");

            let valeur_tri = 0;
            let titre_impression = "LISTE DES COLLECTEURS DE LA MAIRIE DE YAMOUSSOUKRO";
            if (this.value_main_tri.id === 2) {
                valeur_tri = this.value_option_tri.id_qt;
                titre_impression = "LISTE DES COLLECTEURS DE LA MAIRIE DE YAMOUSSOUKRO DU QUARTIER : "+this.value_option_tri.lib.toUpperCase();
            } else if (this.value_main_tri.id === 3) {
                valeur_tri = this.value_option_tri.id_zn;
                titre_impression = "LISTE DES COLLECTEURS DE LA MAIRIE DE YAMOUSSOUKRO DE LA ZONE : " + this.value_option_tri.lib.toUpperCase();
            }


            axios
                .post("/collecteur_liste", {
                    responseType: 'blob',
                    Accept: 'application/pdf',
                    est_superviseur : false,
                    titre_impr : titre_impression,
                    trier_par: this.value_main_tri.id, val_tri: valeur_tri
                })
                .then((response) => {


                    const url = window.URL.createObjectURL(new Blob([response.data.data], {type: 'application/pdf'}));
                    const link = document.createElement('a');
                    console.log(link);
                    link.href = url;
                    link.setAttribute('download', 'staffs.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading_data = false;
                });


        },

        getDataZone() {

            axios.post('/get_tout_zone').then(response => {


                this.data_zone = response.data.data;


            }).catch(error => {


            });

        },
        getDataQuartier() {

            axios.post('/get_tout_quartier_aff').then(response => {


                this.data_quartier_tri = response.data.data;


            }).catch(error => {


            });

        },

        updateTri() {
            this.value_option_tri = {};
            this.data_option_tri = [];
            this.data_collecteur = [];
            this.dernier_page = 1;


            switch (this.value_main_tri.id) {

                case 1: //TOUS RESULTATS
                    this.data_option_tri = [];
                    this.value_option_tri = {id: 0};
                    this.remplirTableContribuable();
                    break;
                case 2: //QUARTIER
                    this.data_option_tri = this.data_quartier_tri;
                    break;
                case 3://ZONE
                    this.data_option_tri = this.data_zone;
                    break;


            }
        },
        rechercherCollecteur(){


        },
        newItem(){


            this.editedItem.nom = "";
            this.editedItem.prenom = "";
            this.editedItem.genre = "H";

            this.editedItem.date_naissance = "";
            this.editedItem.numero = "";
            this.editedItem.num_cni = "";
            this.editedItem.email = "";
            this.editedItem.identifiant = "";
            this.editedItem.est_superviseur =false;

            this.editedIndex = -1;
            this.getMatricule();
            this.dialog = true;


        },


        getCompteFonctionnel(){

            axios.post('get_tout_compte').then(response => {

                this.data_comf = [];
                this.data_comf = response.data.data;


            }).catch(error => {

            });
        },
        remplirTableCollecteur() {


            this.loading_data = true;


            let valeur_tri = 0;
            if (this.value_main_tri.id === 2)
                valeur_tri = this.value_option_tri.id_qt;
            else if (this.value_main_tri.id === 3)
                valeur_tri = this.value_option_tri.id_zn;


            axios.post('/get_tout_collecteur?page='+this.page, {
                trier_par: this.value_main_tri.id,
                est_superviseur : false,
                val_tri: valeur_tri,

            }).then(  response => {


                this.data_collecteur = [];
                let data =  response.data.data.data;
                this.dernier_page = response.data.data.last_page;
                data.forEach((item,index) => {

                    //Couleur photo

                    item.nom = item.nom +' '+item.prenom

                    item.select = false;
                    if(item.photo === 'user'){

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    this.data_collecteur.push(item);

                    //Sexe
                    if(item.genre  === 'H' ){
                        this.data_collecteur[index].genre = 'HOMME'
                    }
                    else {

                        this.data_collecteur[index].genre = 'FEMME';

                    }

                });


                this.loading_data = false;

            }).catch(error => {


            });

        },
        initialize () {
            this.data_collecteur = [


            ]
        },
        clickRow(item){
            if(this.context_menu_open)
                return

            this.editedIndex = this.data_collecteur.indexOf(item)

            this.editedItem.nom = item.nom.split(" ")[0];
            this.editedItem.photo = item.photo;
            this.editedItem.couleur = item.couleur;

            this.editedItem.prenom = item.prenom;
            this.editedItem.genre = item.genre[0];

            this.editedItem.date_naissance = item.date_nai;
            this.editedItem.numero = item.numero;
            this.editedItem.num_cni = item.num_cni;

            this.editedItem.email = item.email;
            this.editedItem.identifiant = item.identifiant;


            //this.editedItem = Object.assign({}, item)
            this.dialog_options = true;
        },
        editItem () {

            this.dialog_options = false;
            this.dialog = true
        },

        deleteItem () {
            this.dialog_options = false;
             this.dialogDelete = true
        },


        envoyerDonnee(){



            let formData = new FormData();
            this.loadform = true;
            let o = 0;

            if(this.file) {

               /// for (let file of this.file) {

                    if(this.file.size < 2000000) {
                        formData.append("fichier" , this.file, this.file.name);
                        o++;
                    }else{
                        this.text_error =  "La taille de la photo est supérieure à 2MB";
                        this.loadform = false;
                        this.error = true;
                        return;
                    }

                //}
            }
            //console.log(o);

            formData.append("nb_photo", o);


            var configg = {

                onUploadProgress: progressEvent => {
                    let percen = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    this.niveau_load = percen;
                }
            };

            let url = '';
            if(this.editedIndex === -1)
                url = "/ajout_collecteur";
            else
                url = "/modifier_collecteur";


            if(this.editedIndex > -1 ){
                this.editedItem.up_email =  this.data_collecteur[this.editedIndex].email !== this.editedItem.email;
                this.editedItem.up_identifiant = this.data_collecteur[this.editedIndex].identifiant !== this.editedItem.identifiant;
                this.editedItem.id = this.data_collecteur[this.editedIndex].id;
            }

             formData.append("data", JSON.stringify(this.editedItem));

            axios.post(url,formData, configg)
                .then(response => {

                    this.loadform = false;

                    if (response.data.success) {


                            this.editedItem.id = response.data.id;
                            this.editedItem.photo = response.data.photo;
                            this.editedItem.select = false;
                        this.error = false;
                        this.traitementAffichageErreur([]);


                        if(this.editedItem.photo === 'user' && this.editedIndex === -1){

                            this.editedItem.couleur = this.color_array[this.getRandomInt(5)]
                        }



                        //Sexe
                        if(this.editedItem.genre  === 'H' ){

                            this.editedItem.genre = 'HOMME'
                        }
                        else {
                            this.editedItem.genre = 'FEMME';
                        }

                        this.file = null;



                        this.save();


                    } else {

                        let er = response.data.errors;

                       // console.log(er);
                        this.text_error =  "(*) Veuillez corriger les erreurs.";

                        this.error = true;

                        this.traitementAffichageErreur(er);



                    }

                })
                .catch(error  => {

                    // handle error

                })
                .then(function () {
                    // always executed
                })
        },

        getMatricule(){

            axios.post('/get_matricule').then(  response => {


                this.editedItem.identifiant = response.data.matricule;

            }).catch(error => {


            });
        },
        selectItem(item){
            if(item.select){
                this.itemSelect.nb ++;
                this.itemSelect.id.push(item.id);

            }else{
                    this.itemSelect.nb --;
                    const index =    this.itemSelect.id.indexOf(item.id);
                    if (index > -1) {
                        this.itemSelect.id.splice(index, 1);
                    }

            }
            this.enable_cm = this.itemSelect.nb > 0;

        },
        clickContextMenu(item){

            if(item.id === 1){

                this.$router.push({  path: '/aff_collecteur', query:{ user: JSON.stringify(this.itemSelect)}  });

            }else{

                this.dialog_options = true;
            }
        },
        deleteItemConfirm () {
            // console.log(this.data_collecteur[this.editedIndex].total);
            this.total -= this.data_collecteur[this.editedIndex].total;
            this.data_collecteur.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        traitementAffichageErreur(er){


            let j = 0;
            Object.keys(this.editedItemTextError).forEach(cle_O => {
                j = 0;
                Object.keys(er).forEach(cle_E => {
                    if (cle_O === cle_E) {
                        this.editedItemBooleanError[cle_O] = true;
                        this.editedItemTextError[cle_O] = er[cle_E];
                        j++;
                        return;
                    }


                });

                if (j === 0) {
                    this.editedItemBooleanError[cle_O] = false;
                    this.editedItemTextError[cle_O] = '';
                }


            });
        },

        getRandomInt(max) {

            return Math.floor(Math.random() * Math.floor(max));


        },

        cmIsOpened(cm) {
            this.context_menu_open = true;
        },

        cmIsClosed(cm) {

            this.context_menu_open = false;
        },
        close () {
            this.dialog = false;
            this.editedIndex = -1;
            this.traitementAffichageErreur([]);

        },

        termine(){
            //Ajouter Dans la data_table
            //Dialog Information


        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        validationChamp(){
           /* if(this.editedItem.name.length < 3){
                this.editedItemTextError.name = "Le champ Désignation doit contenir 3 caractères au minimum";
                this.editedItemBooleanError.name = true;
                return false;
            }
            this.editedItemBooleanError.name = false;


            if(this.editedItem.prix_unit.length < 3){
                this.editedItemTextError.prix_unit = "Le prix n'est pas valide ( prx > 100F ) ";
                this.editedItemBooleanError.prix_unit = true;
                return false;
            }
            this.editedItemBooleanError.prix_unit = false;


            if(this.editedItem.quantite === 0){
                this.editedItemTextError.quantite = "La quantité n'est pas valide (  >= 1 ) ";
                this.editedItemBooleanError.quantite = true;
                return false;
            }
            this.editedItemBooleanError.quantite = false;

            this.editedItem.total = this.editedItem.quantite * this.editedItem.prix_unit;


            this.total += this.editedItem.total;
            /!*let tol = 0;
            for(let i = 0; i < this.data_collecteur.length; i++ ){
                tol +=  this.data_collecteur[i].total;

            }*!/*/
            return  true;

        },  toFormData: function (obj) {
            let formData = new FormData();
            for (let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },
        testFunction(
        ){

            console.log("okkkkkkkkkkkk");
        },
        save () {



            //Modification
            if (this.editedIndex > -1) {
                Object.assign(this.data_collecteur[this.editedIndex], this.editedItem)
                //Object.assign(this.reponse.data[this.editedIndex], this.editedItem)

            } else {
                //this.reponse.data.push(this.editedItem);
                this.data_collecteur.push(this.editedItem);
            }
            this.dialog = false;
            this.close()

        },
    },
}
</script>

