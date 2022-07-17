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
                :items="data_Compte"
                @click:row="clickRow"
                sort-by="val"
                hide-default-footer
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >
                        <v-toolbar-title>Liste des Comptes </v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <!--                    <span v-if="data_Compte.length > 0"> {{total}} FCFA </span>-->


                        <v-btn
                            color="orange accent-4"
                            dark
                            class="mb-2"
                            @click="newItem()"

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
                            v-model="searchData"

                            clearable
                            prepend-inner-icon="mdi-magnify"
                            label="Rechercher un compte budgétaire"

                        />





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
                    <v-icon
                        small
                        class="mr-2"
                        @click="clickRow(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="clickRow(item)"
                    >
                        mdi-delete
                    </v-icon>

                    <v-icon
                        small

                        @click="clickRow(item)"
                    >
                        fa-th
                    </v-icon>
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
                            @input="remplirTableCompte()"
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
                    max-width="500"
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
                                    </v-icon>Autre

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
                fab
                fixed
                right
                @click="newItem"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>


            <v-row justify="center">
                <v-dialog
                    v-model="dialog_ajout_mod"
                    persistent
                    :disabled="loadform"
                    max-width="800"
                >

                    <v-card>

                        <v-card-title class="headline">
                            {{editedIndex  === -1 ? "Ajouter" : "Modifier"}}
                        </v-card-title>
                        <v-card-text>

                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Entrez le nom du compte budgétaire"
                                        solo
                                        :disabled="loadform"
                                        :error="editedItemBooleanError.lib"
                                        :error-messages="editedItemTextError.lib"
                                        v-model="editedItem.lib"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Entrez le numéro du compte."
                                        solo
                                        :disabled="loadform"
                                        :error="editedItemBooleanError.val"
                                        :error-messages="editedItemTextError.val"
                                        v-model="editedItem.val"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="grey accent-1"
                                text
                                outlined
                                :disabled="loadform"
                                @click="dialog_ajout_mod = !dialog_ajout_mod  ; traitementAffichageErreur([])"
                            >
                                <v-icon>mdi-cancel</v-icon> Annuler
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                outlined
                                @click="ajoutModifierCompte"
                                :loading="loadform"
                            >
                                <v-icon>mdi-send</v-icon>  {{editedIndex === -1 ?  'Ajouter' : 'Modifier'}}
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>

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
            <FicheCompte :item="editedItem"/>
        </div>



    </div>
</template>
<script>
export default {

    mounted() {

        this.$root.$emit('TITRE', "GESTION DES COMPTES BUDGETAIRES");


        this.remplirTableCompte();
        this.getval();
    },
    data: () => ({
        dialog: false,
        loading_data : true,
        dialog_options: false,
        dialog_ajout_mod : false,

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
                text: 'Compte',
                align: 'start',
                sortable: true,
                value: 'val',
            },

            { text: 'Nom  du Compte', value: 'lib' },

            /*{ text: 'Compte/Compte', value: 'affectation' },*/
            { text: 'Modifier/Supprimer', value: 'actions', sortable: false },
        ],
        data_Compte: [],
        editedIndex: -1,
        editedItem: {

            val: '1',
            lib : 'ASSABOU',


        },
        editedItemTextError: {

            val: '',
            lib : '',


        },
        editedItemBooleanError: {

            val: false,
            lib : false,

        },



        error: true,
        val_gen: '',
        text_error: '',
        searchData : '',
        fiche : false,

    }),


    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Ajouter une Compte' : 'Modifier une Compte'
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
            this.rechercherCompte();
        }

    },


    created () {
        this.initialize()
    },

    methods: {

        rechercherCompte(){

        },
        newItem(){


            this.editedItem.lib = "";

            this.editedIndex = -1;
            this.editedItem.val = this.val_gen;

            this.dialog_ajout_mod = true;


        },
        ajoutModifierCompte(){

            let url = this.editedIndex === -1 ?"/ajout_compte" : "/modifier_compte";

            if(this.editedIndex > -1 ){

                this.editedItem.up_val = this.data_Compte[this.editedIndex].val !== this.editedItem.val;

            }

            this.loadform = true;
            axios.post(url, this.editedItem).then(  response => {


                this.loadform = false;



                if (response.data.success) {


                    if(this.editedIndex > -1){



                        Object.assign(this.data_Compte[this.editedIndex], this.editedItem)
                        this.dialog_ajout_mod = false;

                    }else {


                        this.editedItem.id = response.data.id;

                        this.data_Compte.push(this.editedItem);
                        this.dialog_ajout_mod = false;


                        this.getval();

                        this.traitementAffichageErreur([]);


                    }


                } else {



                    let er = response.data.errors;
                    this.traitementAffichageErreur(er);



                }



            }).catch(error => {


            });

        },
        getval(){

            axios.post('/get_val_compte').then(  response => {

                this.editedItem.val = response.data.val;
                this.val_gen = response.data.val;

            }).catch(error => {


            });
        },
        remplirTableCompte() {

            this.loading_data = true;
            axios.post('/get_page_compte?page='+this.page).then(  response => {


                this.data_Compte = [];
                this.data_Compte =  response.data.data.data;
                this.dernier_page = response.data.data.last_page;
                this.loading_data = false;

            }).catch(error => {


            });

        },
        initialize () {
            this.data_Compte = [


            ]
        },
        clickRow(item){
            this.editedIndex = this.data_Compte.indexOf(item)



            //this.editedItem = Object.assign({}, item)
            this.dialog_options = true;
        },
        editItem () {

            this.editedItem.lib = this.data_Compte[this.editedIndex].lib;
            this.editedItem.id= this.data_Compte[this.editedIndex].id;
            this.editedItem.val = this.data_Compte[this.editedIndex].val;



            this.dialog_options = false;
            this.dialog_ajout_mod = true
        },
        deleteItem () {
            this.dialog_options = false;
            this.dialogDelete = true
        },
        deleteItemConfirm () {
            // console.log(this.data_Compte[this.editedIndex].total);
            this.total -= this.data_Compte[this.editedIndex].total;
            this.data_Compte.splice(this.editedIndex, 1)
            this.closeDelete()
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
             for(let i = 0; i < this.data_Compte.length; i++ ){
                 tol +=  this.data_Compte[i].total;

             }*!/*/
            return  true;

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
                Object.assign(this.data_Compte[this.editedIndex], this.editedItem)
                //Object.assign(this.reponse.data[this.editedIndex], this.editedItem)

            } else {
                //this.reponse.data.push(this.editedItem);
                this.data_Compte.push(this.editedItem);
            }
            this.dialog = false;
            this.close()

        },
    },
}
</script>

