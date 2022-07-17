<template>

    <div>

        <v-data-table
            :headers="headers"
            v-if="!loading_data"
            :items="data_taxe"
            item-key="id"
            @click:row="clicked_taxe"

            hide-default-footer
            :items-per-page="config.pagignate"

            sort-by="identifiant"

            class="elevation-1 data_taxe"
        >
            <template v-slot:top>
                <v-toolbar
                    flat
                >


                    <v-btn
                        color="primary accent-4"
                        dark
                        outlined

                        :disabled="data_taxe.length <= 0"
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

                        @click="ajouterTaxe"


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
                        v-if="false"
                        v-model="searchData"
                        class="mx-4"
                        clearable
                        prepend-inner-icon="mdi-magnify"
                        label="Rechercher une taxe"

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
                        @change="getTaxe"
                        dense
                        item-text="lib"
                        v-if="value_main_tri.id !== 1"
                        label="Options de tri"
                    ></v-select>


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
                                    @click="modifierTaxe(item, data_taxe.indexOf(item))"
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
            <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                    Reset
                </v-btn>
            </template>

            <template v-slot:no-data>
                <p class="subtitle-1">Aucune donnée disponible</p>
            </template>


        </v-data-table>


        <v-snackbar
            :timeout="5000"
            v-model="afficher_snackbar"
            absolute
            right
            rounded
            top
            :color="color_snack"

        >
           <v-icon>mdi-content-save</v-icon> {{message_snackbar}}
        </v-snackbar>

        <v-row justify="center" v-if="dernier_page > 1">
            <v-col cols="8" v-if="!loading_data">
                <v-container class="max-width">
                    <v-pagination
                        v-model="page"
                        class="my-4"
                        :total-visible="8"
                        @input="getTaxe"
                        :length="dernier_page"
                    ></v-pagination>
                </v-container>
            </v-col>
        </v-row>

        <v-btn
            bottom
            color="primary"
            dark
            fab
            fixed
            right
            @click="ajouterTaxe"

        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog
            v-model="dialog_aj_md"
            persistent
            fullscreen


        >

            <v-card outlined :loading="load_set_taxe" :disabled="load_set_taxe">
                <v-card-title class="justify-center">
                    <span style="margin-left: 40% ; color: #1d68a7; font-weight: bold" class=" headline">{{editedIndex >= 0 ? "Formulaire de mise à jour d'une taxe" : "Formulaire d'ajout  d'une taxe"}}</span>

                    <v-spacer></v-spacer>

                    <v-btn
                        class="ma-2"
                        outlined
                        fab
                        color="red"
                        small
                        @click="dialog_aj_md =false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-form ref="form" lazy-validation v-model="valid_form_add_mod" class="container">

                        <v-row>


                            <v-col cols="6">

                                <v-combobox
                                    v-model="editedItem.val_cf"
                                    :items="data_compt_budg"
                                    label="Choisir le compte budgetaire"
                                    clearable
                                    filled
                                    color="primary"
                                    item-text="lib"
                                    :disabled="editedIndex   >= 0"
                                    v-on:keypress="isNumberComptBudget($event)"
                                    :error="editedItemBooleanError.val_cf"
                                    :error-messages="editedItemTextError.val_cf"
                                    hint="Entrer ou choisir le compte budgetaire"
                                    persistent-hint
                                    outlined


                                ></v-combobox>

                            </v-col>

                            <v-col cols="6">


                                <v-text-field
                                    label="Nom de la taxe"
                                    v-model="editedItem.lib_taxe"
                                    :disabled="loadform"
                                    hint="Nom de la taxe"
                                    persistent-hint
                                    :rules="text_rule"
                                    clearable
                                    outlined
                                    :error-messages="editedItemTextError.lib_taxe"
                                    :error="editedItemBooleanError.lib_taxe"

                                    required
                                ></v-text-field>


                            </v-col>


                            <v-col cols="6">
                                <v-text-field
                                    v-model="editedItem.asst"
                                    label="Entrer l'assiette"
                                    clearable
                                    hint="Entrer l'assiette: Taxe sur les ...."
                                    persistent-hint

                                    :rules="text_rule"
                                    :error-messages="editedItemTextError.asst"
                                    :error="editedItemBooleanError.asst"

                                    outlined
                                ></v-text-field>

                            </v-col>


                            <v-col :cols="editedItem.periode.id === 7 ? 2 : 6">
                                <v-select

                                    v-model="editedItem.periode"
                                    :items="data_periode"
                                    return-object
                                    clearable
                                    :disabled="loadform"
                                    outlined
                                    :error-messages="editedItemTextError.periode"
                                    :error="editedItemBooleanError.prix"
                                    item-text="lib"

                                    label="Choisir une périodicité"

                                    hint="Choisir une périodicité"
                                    persistent-hint
                                ></v-select>

                            </v-col>

                            <v-col v-if="editedItem.periode.id === 9" cols="2">

                                <v-text-field


                                    outlined
                                    v-model="editedItem.nb_jour"

                                    hint="Entrer le nombre de Jour/Mois"
                                    type="number"
                                    label="Jour / Mois"
                                ></v-text-field>

                            </v-col>


                            <v-col cols="2" v-if="editedItem.periode.id === 9">

                                <v-select

                                    v-model="editedItem.value_jr_mois"
                                    :items="[{id : 1, lib : 'Jour'},{id : 2, lib : 'Mois'}]"
                                    return-object

                                    :disabled="loadform"
                                    outlined
                                    item-text="lib"

                                    label="Periode"

                                ></v-select>

                            </v-col>

                            <!--    PRIX TAXE  -->
                            <v-col  :cols="editedItem.taux_cfa_prt == '1' ? 4 : 2">
                                <v-text-field
                                    v-model="editedItem.prix"
                                    :label="editedItem.taux_cfa_prt == 1 ? 'Entrer le taux de la taxe (CFA) /'+editedItem.asst : 'Taux en (%) : '+editedItem.asst"

                                    clearable
                                    :rules="taux_rule"

                                    v-on:keypress="isNumber($event)"
                                    type="number"
                                    class="animate__animated animate__backInRight"
                                    :error-messages="editedItemTextError.prix"
                                    :error="editedItemBooleanError.prix"

                                    outlined
                                ></v-text-field>

                            </v-col>
                            <!--    RADIO  -->

                            <v-col
                                cols="8"

                            >

                                <h2>Comment le taux est déterminé ? </h2>
                                <v-radio-group
                                    v-model="editedItem.taux_cfa_prt"
                                    row
                                    :disabled="loadform"
                                >
                                    <v-radio label="le taux est en CFA" value="1"></v-radio>
                                    <v-radio label="Le taux est en  pourcentage (%)" value="2"></v-radio>

                                </v-radio-group>

                            </v-col>

                            <v-col
                                cols="8"
                                v-if="false"

                            >

                                <h2>Comment le taux est déterminé ? </h2>
                                <v-radio-group
                                    v-model="editedItem.methode_cal_prix"
                                    row
                                    :disabled="loadform"
                                >
                                    <v-radio label="Le taux est fixe" value="1"></v-radio>
                                    <v-radio label="le taux est caculé en fonction" value="2"></v-radio>

                                </v-radio-group>

                                <v-text-field
                                    v-model="editedItem.crit"
                                    label="Entrer le critère"
                                    :rules="text_rule"
                                    dense
                                    hint="Le taux est calculé en fonction..."
                                    persistent-hint
                                    clearable
                                    v-if="editedItem.methode_cal_prix === 2"

                                    :error-messages="editedItemTextError.crit"
                                    :error="editedItemBooleanError.crit"

                                    outlined
                                ></v-text-field>

                            </v-col>


                        </v-row>


                        <v-row v-if="false">


                            <v-row
                                v-for="crit in editedItem.sous_taxe"
                                :key="crit.id"


                            >
                                <v-col cols="12">
                                    <v-divider inset></v-divider>
                                </v-col>
                                <v-col cols="3">

                                    <v-text-field
                                        label="Entrer le critère"
                                        v-model="editedItem.crit"

                                        readonly
                                        disabled
                                        :error-messages="editedItemTextError.crit"
                                        :error="editedItemBooleanError.crit"

                                        outlined
                                    ></v-text-field>

                                </v-col>
                                <v-col cols="2">
                                    <v-select

                                        v-model="crit.signe_math"
                                        :items="data_signe"
                                        return-object
                                        :disabled="loadform"
                                        outlined
                                        item-text="lib"

                                        label="signe"

                                    ></v-select>
                                </v-col>

                                <v-col :cols="editedItem.taux_cfa_prt == 1 ? 3 : 2">

                                    <v-text-field
                                        v-if="crit.signe_math.id !== 6"
                                        v-model="crit.val_signe"
                                        :label="editedItem.taux_cfa_prt == 1 ? 'Valeur' : 'Valeur (%)'"
                                        clearable
                                        :rules="small_number_rule"

                                        v-on:keypress="isNumberSousTaxe($event, crit.val_signe)"
                                        class="animate__animated animate__backInRight"

                                        outlined
                                    ></v-text-field>

                                    <v-row v-else>

                                        <v-col cols="6">

                                            <v-text-field


                                                outlined
                                                type="number"
                                                :rules="small_number_rule"
                                                v-model="crit.val_in_de"
                                                label="debut"
                                            ></v-text-field>

                                        </v-col>


                                        <v-col cols="6">

                                            <v-text-field


                                                outlined
                                                :rules="small_number_rule"
                                                v-model="crit.val_in_fin"
                                                type="number"
                                                label="fin"
                                            ></v-text-field>


                                        </v-col>

                                    </v-row>


                                </v-col>

                                <v-col :cols="editedItem.taux_cfa_prt == 1 ? 3 : 2">

                                    <v-text-field
                                        v-model="crit.prix"
                                        :label="editedItem.taux_cfa_prt == 1 ? 'Entrer le taux (FCFA)' : 'Taux en (%) du '"
                                        clearable

                                        :rules="taux_rule"
                                        v-on:keypress="isNumberSousTaxe($event, crit.prix)"

                                        class="animate__animated animate__backInRight"
                                        type="number"
                                        outlined
                                    ></v-text-field>


                                </v-col>

                                <v-col cols="1">

                                    <v-btn
                                        color="error"
                                        dark
                                        x-large
                                        outlined
                                        @click="retirerSousTaxe(crit)"
                                        class="mb-2"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                        Retirer
                                    </v-btn>


                                </v-col>


                            </v-row>
                            <v-col :cols="editedItem.sous_taxe.length === 0 ? 0 : 6"></v-col>
                            <v-col :cols="editedItem.sous_taxe.length === 0 ? 12 : 6">
                                <v-btn
                                    color="primary accent-4"
                                    dark
                                    outlined
                                    @click="ajoutSousTaxe"
                                    class="mb-2"
                                >
                                    <v-icon>mdi-plus</v-icon>
                                    Ajouter un critère
                                </v-btn>
                            </v-col>


                        </v-row>

                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-row>

                        <v-col cols="8"></v-col>
                        <v-col cols="4">

                            <v-btn
                                color="red accent-1"
                                text
                                outlined
                                :disabled="loadform"
                                @click="dialog_aj_md = !dialog_aj_md "
                            >
                                <v-icon>mdi-cancel</v-icon>
                                Annuler
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                outlined
                                :disabled="!valid_form_add_mod"
                                @click="validerTaxe"
                                :loading="load_set_taxe"

                            >
                                <v-icon>mdi-send</v-icon>
                                {{ editedIndex < 0 ? 'Ajouter' : 'Modifier' }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog persistent v-model="dialogDelete" max-width="550px">
            <v-card>
                <v-card-title class="headline" style="word-break: break-word"> Voulez-vous vraiment supprimer cette taxe ?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" :disabled="loading_data" outlined @click="dialogDelet = false"><v-icon>mdi-keyboard-return</v-icon> Sortir</v-btn> <v-spacer></v-spacer>
                    <v-btn color="error" :loading="loading_data" outlined @click="deleteItemConfirm"> <v-icon>mdi-delete-circle</v-icon> Oui supprimer </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog_interval"
            width="100"
        >


            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    Entrer l'interval
                </v-card-title>


                <v-row>


                    <v-col cols="6">

                        <v-text-field
                            dense

                            label="Regular"
                        ></v-text-field>
                    </v-col>
                    <v-divider></v-divider>

                    <v-col cols="6">
                        <v-text-field
                            dense

                            label="Regular"
                        ></v-text-field>
                    </v-col>

                </v-row>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        text
                        @click="dialog_interval = false"
                    >
                        Fermer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>


</template>
<script>
import validator from 'validator';

export default {

    mounted() {
        this.$root.$emit('TITRE', "GESTION DES TAXES");



        this.getListePeriode();
        this.getCompteBudget();
        this.getTaxe();
        /*getListePeriode()
        getListeBudget()
        getTaxe()*/
    },
    props : {
        config: {},
    },
    data: () => ({


        dialogDelete : false,
        dialog_aj_md: false,
        load_set_taxe: false,
        afficher_snackbar :  false,

        loading_data: false,
        dialog_interval: false,
        dialog_options: false,
        expanded: [],
        valid_form_add_mod: false,
        page: 1,
        dernier_page: 1,
        lien_site: location.protocol + '//' + location.host,
        loadform: false,
        dialog_termine: false,
        color_snack : "primary",
        message_snackbar : "",
        data_periode:
            [],
        data_signe: [
            {
                id: 1,
                lib: "=",


            },

            {
                id: 2,
                lib: ">=",


            }
            ,

            {
                id: 3,
                lib: "<=",

            },
            {
                id: 4,
                lib: ">",

            },
            {
                id: 5,
                lib: "<",

            },
            {
                id: 6,
                lib: "interval",

            },


        ],
        headers: [

            {
                text: 'COMPTE FONCTIONNEL',
                align: 'start',
                sortable: true,
                value: 'val_cf',
            },
            {
                text: 'LIBELE',
                align: 'center',
                sortable: true,
                value: 'lib_cf',
            },


            {
                text: 'NOM DE LA TAXE',
                align: 'start',
                sortable: false,
                value: 'lib_taxe',
            },

            /*{
                text: 'CRITERE',
                align: 'start',
                sortable: false,
                value: 'crit',
            },*/

            {
                text: 'MONTANT (CFA)',
                align: 'start',
                sortable: false,
                value: 'prix',
            },

            {
                text: 'PERIODICITE',
                align: 'start',

                value: 'periode',
            },

            {text: 'Actions', value: 'actions', sortable: false},
        ],

        data_sous_taxe: [],
        data_compt_budg: [],
        data_taxe: [
            {

                id: 1,
                val_cf: "7023",
                lib_taxe: "Taxe sur la valeur locative· des locaux professionnels",
                crit: "Droit proportionnel à la patente",
                prix: "584",
                periode: "ANNEE",

            },

            {

                id: 2,
                val_cf: "7023",
                lib_taxe: "Taxe sur la valeur locative· des locaux professionnels",
                crit: "Droit proportionnel à la patente",
                prix: "584",
                periode: "ANNEE",

            }


        ],
        editedIndex: -1,

        color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
        editedItem: {

            val_cf: "",
            lib_taxe: "",
            crit: "",
            prix: "",
            periode: {id: 1, lib: "Aucune"},
            asst: "",
            taux_cfa_prt: "1",
            methode_cal_prix: "1",
            nb_jour: "",
            value_jr_mois: {id: 1, lib: "Jour"},
            sous_taxe: [],
        },
        editedItemTextError: {
            val_cf: "",
            lib_taxe: "",
            crit: "",
            asst: "",
            prix: "",
            periode: "",
            signe_math: "",
            pourcent: "",

        },
        editedItemBooleanError: {
            val_cf: false,
            lib_taxe: false,
            crit: false,
            asst: false,
            prix: false,
            periode: false,
            signe_math: false,
            pourcent: false,

        },

        small_number_rule: [

            v => !!v || 'Ce champ  est obligatoire',

            v => (v && v.length < 8) || 'Le champ est trop grand',
        ],
        taux_rule: [

            v => !!v || 'Le taux est obligatoire',
            v => (v && v.length < 8) || 'Le taux est trop grand',
        ],
        required_rule: [
            v => !!v || 'Ce champ  est obligatoire',
            v => (v && v.length > 3) || 'Le champ est trop court',
            v => (v && v.length < 6) || 'Le champ est trop grand',
        ],

        required_select: [
            v => !!v || 'Ce champ  est obligatoire',
            v => (v && v.length < 6) || 'Le champ est trop grand',
        ],
        text_rule: [
            v => !!v || 'Ce champ  est obligatoire',
            v => (v && v.length > 3) || 'Le champ est trop court',
            v => (v && v.length < 255) || 'Le champ est trop grand',
        ],

        /* p_rules: [
             v => !!v || 'Le champ p est obligatoire',
             v => (v && v < 999999999) || 'Le champ est trop grand',
             v => (v && v > 256) || 'Le champ est trop petit ( p> 256)',
             v => (v && this.estPremier(v, 1)) || 'Le nombre n\'est pas premier',


         ],*/


        data_main_tri: [
            {
                id: 1,
                lib: "Tous les résultats"
            },
            {
                id: 2,
                lib: "Compte Fonctionnel"
            },
            {
                id: 3,
                lib: "Periodicite"
            }
        ],
        value_main_tri: {
            id: 1,
            lib: "Tout les résultats"
        },

        del_taxe_id : -1,

        data_option_tri: [],
        value_option_tri: {},

        menu2: false,
        niveau_load: 0,
        error: true,
        searchData: '',
        fiche: false,
        context_menu_open: false,
    }),
    methods: {


        updateTri() {

            this.value_option_tri = {};
            this.data_option_tri = [];
            this.data_taxe = [];
            this.dernier_page = 1;


            switch (this.value_main_tri.id) {

                case 1: //TOUS RESULTATS
                    this.data_option_tri = [];
                    this.value_option_tri = {id: 0};
                    this.getTaxe();
                    break;
                case 2: //COMPTE FONCTIONNEL
                    this.data_option_tri = this.data_compt_budg;
                    break;
                case 3://PERIODICITE
                    this.data_option_tri = this.data_periode;
                    break;

            }
        },

        imprimerListe() {

        },

        getListePeriode() {

            axios.post('/get_periode_taxe').then(response => {

                this.data_periode = response.data.data;
                this.dernier_page = response.data.data.last_page;

            }).catch(error => {


            });

        },
        supprimerTaxe(item){
            this.del_taxe_id = item;
            this.dialogDelete = true;
        }
        ,
        deleteItemConfirm(){
            this.loading_data = true;
            axios.post('/delete_taxe',{id_taxe :  this.del_taxe_id}).then(response => {

                this.loading_data = false;


            }).catch(error => {


            });
        },
        isNumber(e) {


            if (this.editedItem.taux_cfa_prt == 2 && this.editedItem.prix.length >= 2)
                e.preventDefault();
            /* else {

                 let char = String.fromCharCode(e.keyCode); // Get the character
                 if(/^[0-9]+$/.test(char)) return true; // Match with regex
                 else e.preventDefault(); // If not match, don't add to input text
                 }*/
        },

        isNumberComptBudget(e) {

            let char = String.fromCharCode(e.keyCode); // Get the character
            if (/^[0-9]+$/.test(char)) return true; // Match with regex
            else e.preventDefault(); // If not match, don't add to input text

        },

        isNumberSousTaxe(e, v) {


            if (this.editedItem.taux_cfa_prt == 2 && v.length >= 2)
                e.preventDefault();

        }
        ,
        getCompteBudget() {

            axios.post('/get_compte_budget').then(response => {

                this.data_compt_budg = response.data.data;

            }).catch(error => {


            });

        },
        ajoutSousTaxe() {

            let new_taxe = {
                prix: "",
                signe_math: {id: 1, lib: "="},
                val_signe: "",
                val_in_de: "",
                val_in_fin: "",
                id: this.editedItem.sous_taxe.length + 1,

            };

            this.editedItem.sous_taxe.push(new_taxe);

        },
        clicked_taxe(value) {
            this.expanded.push(value);


        },
        retirerSousTaxe(crit) {


            this.editedItem.sous_taxe.splice(this.editedItem.sous_taxe.indexOf(crit), 1);

        },

        validerTaxe() {

            if (this.$refs.form.validate()) {

                this.ajouterModifierTaxe();

            }


        },

        ajouterModifierTaxe() {

            this.load_set_taxe = true;
            let url ;

            let mod = this.editedIndex === -1 ? 0  : 1;

            axios.post("/ajouter_taxe", {data: this.editedItem, modifier : mod }).then(response => {

                if (response.data.success) {

                    if(this.editedIndex < 0) {
                        //formater editiem

                        this.getTaxe();

                        this.load_set_taxe = false;


                        this.dialog_aj_md = false;
                        this.color_snack = 'primary';
                        this.message_snackbar = "La taxe a été ajoutée."
                        this.afficher_snackbar = true;

                        //snackbar
                    }else{
                        this.load_set_taxe = false;
                        this.dialog_aj_md = false;
                        this.color_snack = 'orange';
                        this.message_snackbar = "La modification a été effectuée."
                        this.afficher_snackbar = true;


                   }

                    this.traitementAffichageErreur([]);


                } else {

                    this.traitementAffichageErreur(response.data.errors);
                }

            }).catch(error => {});





        },
        modifierTaxe(item ,index){

            let taxe = JSON.parse(JSON.stringify(item));
            taxe.periode = {
                id : taxe.id_prd,
                lib :taxe.periode
            }
            this.editedIndex =  index ;
            taxe.taux_cfa_prt += '';
            taxe.methode_cal_prix = '1';
            this.editedItem = taxe;
            this.editedItem.value_jr_mois = {
                id : 1,
                lib: "Jour"
            }
            this.dialog_aj_md = true;

        },
        getTaxe() {
            this.loadform = true;


            axios.post('/get_taxe?page=' + this.page, {
                trier_par: this.value_main_tri.id,
                val_tri: this.value_option_tri.id
            }).then(response => {

                let data = response.data.data.data;
                this.dernier_page = response.data.data.last_page;

                this.data_taxe = [];
                this.data_taxe = data;


                this.loadform = false;

            }).catch(error => {


            });

        },

        ajouterTaxe() {

            let val = {

                val_cf: "",
                lib_taxe: "",
                crit: "",
                sous_taxe: [],
                prix: "",
                periode: {id: 1, lib: "Aucune"},
                asst: "",
                taux_cfa_prt: "1",
                methode_cal_prix: "1",
                nb_jour: "",
                value_jr_mois: {id: 1, lib: "Jour"},
            };
            this.editedItem = val;
            this.editedIndex = -1;
            this.dialog_aj_md = true;


        }
    },

    watch: {

        /*'editedItem.signe_math'(val) {


            if (val.id === 6) {

                this.dialog_interval = true;
            }

        },*/
    },

    traitementAffichageErreur(er) {


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

}
</script>
<style>
/*
.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {
    font-size: 20px;
}

.v-data-table>.v-data-table__wrapper>table>thead>tr>th>span {
    font-size: 15px;
}*/
.v-radio > label {
    font-size: 20px;
}


</style>

<style>
.white_text{
    color: white;
}
.back_text{
    color: black;
}
</style>
