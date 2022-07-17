<template>
    <div>


        <div v-if="!fiche">
            <v-skeleton-loader
                class="mx-auto"
                v-if="loading_data"
                type="card"
            ></v-skeleton-loader>

            <v-data-table
                :headers="headers"
                v-if="!loading_data"
                :items="data_quartier"

                sort-by="identifiant"
                hide-default-footer
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

                            :disabled="data_quartier.length <= 0"
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
                        <!--                    <span v-if="data_contribuable.length > 0"> {{total}} FCFA </span>-->


                        <v-btn
                            color="orange accent-4"
                            dark
                            width="100px"

                            @click="newItem"


                        >
                            <v-icon>mdi-plus</v-icon>
                            Ajouter
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
                            outlined
                            v-model="searchData"
                            class="mx-4"
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            label="Rechercher un quartier"

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
                            @change="remplirTableQuartier"
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


                <template v-slot:item.actions="{ item }">

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
                                <v-card :color="hover ? 'primary' : '' ">
                                    <v-list-item
                                        @click="modifierQuartier(item, data_quartier.indexOf(item))"
                                    >


                                        <v-list-item-avatar>
                                            <v-icon
                                                class="primary"
                                                dark
                                            >
                                                mdi-table-edit
                                            </v-icon>
                                        </v-list-item-avatar>

                                        <v-list-item-title :class="hover ? 'white_text':  'black_text'" >Modifier</v-list-item-title>

                                    </v-list-item>
                                </v-card>
                            </v-hover>


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
                            <!--                        </v-hover>-->
                            <!--                        <v-hover v-slot="{ hover }">-->
                            <v-card v-if="false" @click="supprimerTaxe(data_taxe.indexOf(item))" :color="hover ? 'primary' : '' ">
                                <v-list-item

                                >


                                    <v-list-item-avatar>
                                        <v-icon
                                            class="error"
                                            dark
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </v-list-item-avatar>

                                    <v-list-item-title :class="hover ? 'white_text':  'black_text'"> Supprimer</v-list-item-title>

                                </v-list-item>
                            </v-card>
                            <!--                        </v-hover>-->


                        </v-list>
                    </v-menu>


                </template>

                <template v-slot:item.couleur="{ item }">


                    <div >
                        <v-avatar
                            size="36px"
                            :color="item.couleur"
                        >

                            <span  class="white--text headline">{{item.lib[0]+''+item.lib[1]}}</span>
                        </v-avatar>
                    </div>



                </template>



                <template v-slot:no-data>
                    <p class="subtitle-1">Aucune donnée disponible</p>
                </template>

            </v-data-table>

            <!--   PAGIGNATION         -->
            <v-row justify="center" v-if="dernier_page > 1">
                <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                            v-model="page"
                            class="my-4"
                            :total-visible="8"
                            @input="remplirTableQuartier()"
                            :length="dernier_page"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>




            <!--   DIALOGUE ACTIONS         -->

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
                                    color="orange accent-4"
                                    dark
                                    @click="fiche = !fiche"
                                >
                                    <v-icon
                                        dark
                                        left
                                    >
                                        fa-th
                                    </v-icon>Affecter  des collecteurs
                                </v-btn>

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



                            </div>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>


                            <v-btn
                                color="grey darken-4"
                                text
                                @click="dialog_options = false"
                            >
                                Sortir

                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-row>

            <!--   FAB AJOUT         -->

            <v-btn
                bottom
                color="orange accent-4"
                dark
                v-if="false"
                fab
                fixed
                right
                @click="newItem"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>



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
            <FicheQuartier :item="editedItem"/>
        </div>

        <div style="margin-top: 50px;">
            <AjoutQuartier :update_matricule="update_matri" v-if="!loading_data" @ajout_quartier="ajoutQuartier"  :up_zone="this.up_zone" :item="editedItem" :ajout="editedIndex === -1"/>
        </div>


    </div>
</template>
<script>

import FicheQuartier from "./innerComponents/FicheQuartier";
import AjoutQuartier from "./innerComponents/AjoutModifierQuartier";
export default {

    components: {AjoutQuartier, FicheQuartier},

    mounted() {

        this.$root.$emit('TITRE', "GESTION DES QUARTIERS ");





        this.newItem();
        this.$root.$on('close_fiche', data => {
            this.fiche = !this.fiche;
            this.dialog_options = false;
        });
        this.$root.$on('update_dat_quartier', data => {

           this.remplirTableQuartier();
           this.newItem();
        });

        if(window.innerWidth > 600){
            this.max_width_dialog =  590;
        }
        this.isMobile = window.innerWidth <= 600;

        this.getDataZone();

        this.remplirTableQuartier();

    },
    data: () => ({
        dialog: false,
        up_zone :  false,
        loading_data : true,
        dialog_options: false,

        page : 1,
        dernier_page : 1,
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
                text: 'Avatar',
                align: 'start',
                sortable: false,
                value: 'couleur',
            },
            {
                text: 'Identifiant',
                align: 'start',
                sortable: true,
                value: 'identifiant',
            },

            { text: 'Nom du Quartier', value: 'lib' },
            { text: 'ZONE', value: 'zone' },

            /*{ text: 'Quartier/Zone', value: 'affectation' },*/
            { text: 'Modifier', value: 'actions', sortable: false },
        ],
        data_quartier: [],

        data_main_tri: [
            {
                id: 1,
                lib: "Tous les résultats"
            },
            {
                id: 3,
                lib: "Zone"
            },


        ],
        value_main_tri: {
            id: 1,
            lib: "Tout"
        },


        data_option_tri: [],
        value_option_tri: {},
        data_zone: [],

        editedIndex: -1,
        color_array : ['blue', 'cyan','green','orange','grey'],
        editedItem: {

            identifiant: '122',
            lib : 'ASSABOU',
            gps : '',
            couleur: '',
        },
        editedItemTextError: {

            identifiant: '',
            lib : '',
            gps : '',
            couleur: '',


        },
        editedItemBooleanError: {

            identifiant: false,
            lib : false,
            gps : '',
            couleur: false,


        },



        file : null,
        menu2: false,
        niveau_load : 0,
        error: true,
        text_error: '',
        searchData : '',
        fiche : false,
        update_matri:  false,
        date_naissance: new Date().toISOString().substr(0, 10),
    }),


    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Ajouter un Quartier' : 'Modifier un Quartier'
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
            this.rechercherQuartier();
        }

    },


    created () {
        this.initialize()
    },

    methods: {

        imprimerListe(){
            this.loading_data = true;


            //window.open("/contribuable_liste?id="+JSON.stringify(this.data_contribuable.map(a => a.id)), "_blank");

            let valeur_tri = 0;
            let titre_impression = "LISTE DES QUARTIER DE LA MAIRIE DE YAMOUSSOUKRO";
            if (this.value_main_tri.id === 3) {
                valeur_tri = this.value_option_tri.id_zn;
                titre_impression = "LISTE DES QUARTIERS DE LA ZONE :  " + this.value_option_tri.lib.toUpperCase();
            }

            axios
                .post("/liste_quartier", {
                    responseType: 'blob',
                    Accept: 'application/pdf',
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

        updateTri() {
            this.value_option_tri = {};
            this.data_option_tri = [];
            this.data_quartier = [];
            this.dernier_page = 1;


            switch (this.value_main_tri.id) {

                case 1: //TOUS RESULTATS
                    this.data_option_tri = [];
                    this.value_option_tri = {id: 0};
                    this.remplirTableQuartier()
                    break;

                case 3://ZONE
                    this.data_option_tri = this.data_zone;
                    break;
            }
        },

        ajoutQuartier(val){

            val.couleur = this.color_array[this.getRandomInt(4)];
            this.data_quartier.push({identifiant: val.identifiant,lib : val.lib, zone: val.zone, couleur : val.couleur});


        },
        rechercherQuartier(){
        },

        getMatricule(){

            axios.post('/get_identifiant_quartier').then(  response => {

                this.editedItem.identifiant = response.data.identifiant;


            }).catch(error => {


            });
        },
        newItem(){




            this.getMatricule();
            this.editedItem = {
                couleur:"",
                id_qt:0,
                id_zone:1,
                lib: "",
                identifiant : this.editedItem.identifiant,
                old_id_zone:1,
                old_identifiant:"",
                zone:"",
            }

            this.editedIndex = -1;

            this.update_matri = !this.update_matri;




            window.scrollTo({
                top: (window.innerWidth / 2) - 100,
                left: 0,
                behavior: 'smooth'
            });



        },


        remplirTableQuartier() {

            let valeur_tri = 0;
            if (this.value_main_tri.id === 3)
                valeur_tri = this.value_option_tri.id_zn;


            this.loading_data = true;
            axios.post('/get_tout_quartier?page='+this.page,{
                trier_par: this.value_main_tri.id,
                val_tri: valeur_tri
            }).then(  response => {


                this.data_quartier = [];
                let data =  response.data.data.data;
                this.dernier_page = response.data.data.last_page;
                data.forEach((item,index) => {

                    //Couleur photo

                    item.couleur = this.color_array[this.getRandomInt(5)]

                    this.data_quartier.push(item);



                });


                this.loading_data = false;

            }).catch(error => {


            });

        },
        initialize () {
            this.data_quartier = [


            ]
        },
        clickRow(item){
            this.editedIndex = this.data_quartier.indexOf(item)



            //this.editedItem = Object.assign({}, item)
            this.dialog_options = true;
        },
        editItem () {

            this.dialog_options = false;
            this.dialog = true
        },
        modifierQuartier(item, index){


            let item_c = JSON.parse(JSON.stringify(item));
            item_c.old_id_zone = item_c.id_zone;
            item_c.old_identifiant = item_c.identifiant;
            this.editedItem = item_c;

            this.up_zone = !this.up_zone;
            this.editedIndex = index;

            window.scrollTo({
                top: (window.innerWidth / 2) - 100,
                left: 0,
                behavior: 'smooth'
            });


        },

        deleteItem () {
            this.dialog_options = false;
            this.dialogDelete = true
        },





        deleteItemConfirm () {
            // console.log(this.data_quartier[this.editedIndex].total);
            this.total -= this.data_quartier[this.editedIndex].total;
            this.data_quartier.splice(this.editedIndex, 1)
            this.closeDelete()
        },



        getRandomInt(max) {

            return Math.floor(Math.random() * Math.floor(max));


        },


        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        termine(){
            //Ajouter Dans la data_table
            //Dialog Information

            console.log("Opération effectuée")
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
             for(let i = 0; i < this.data_quartier.length; i++ ){
                 tol +=  this.data_quartier[i].total;

             }*!/*/
            return  true;

        },
        toFormData: function (obj) {
            let formData = new FormData();
            for (let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },
        save () {



            //Modification
            if (this.editedIndex > -1) {
                Object.assign(this.data_quartier[this.editedIndex], this.editedItem)
                //Object.assign(this.reponse.data[this.editedIndex], this.editedItem)

            } else {
                //this.reponse.data.push(this.editedItem);
                this.data_quartier.push(this.editedItem);
            }
            this.dialog = false;
            this.close()

        },
    },
}
</script>

