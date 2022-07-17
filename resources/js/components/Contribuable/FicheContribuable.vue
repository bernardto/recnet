<template>

    <v-container fluid>

        <v-overlay v-model="loading_data">
            <v-progress-circular

                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>

        <v-card elevation="3" outlined style="padding: 10px; margin-top: 20px">
            <!--            <v-card-title>
                            <v-row>
                                <v-col cols="11">

                                </v-col>
                                <v-col cols="1">
                                    <v-btn small color="primary"  fab>
                                    <v-icon
                                        right
                                    >
                                        mdi-close
                                    </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-title>-->
            <v-row>
                <v-col cols="2">


                    <div>

                        <div v-if="item.photo === 'Aucune' ">
                            <v-avatar
                                size="128px"
                                :color="item.couleur"
                            >

                                <span class="white--text headline">{{ item.nom[0] + '' + item.nom[1] }}</span>
                            </v-avatar>
                        </div>


                        <div v-else>
                            <v-avatar
                                size="128px"
                                tile

                            >

                                <img
                                    alt="Avatar"
                                    :src="'/image/contribuable/'+item.photo"
                                >

                            </v-avatar>
                        </div>

                    </div>


                </v-col>

                <v-col cols="6">

                    <template>
                        <v-card
                            class="mx-auto"
                            max-width="400"

                            elevation="3"
                        >
                            <v-row class="card-text ml-2">


                                <v-col cols="6">
                                    <span class="moyen_label">Identifiant :</span>
                                </v-col>

                                <v-col cols="6">
                                    <span class="moyen_label">{{ item.identifiant }}</span>
                                </v-col>

                                <v-col cols="6">
                                    <span class="moyen_label">N° de compte : </span>
                                </v-col>

                                <v-col cols="6">
                                    <span class="moyen_label">{{ item.compteContribuable.n_compte }}</span>
                                </v-col>


                                <v-col cols="6">
                                    <span class="moyen_label">Solde </span>
                                </v-col>

                                <v-col cols="6">
                                    <span class="moyen_label" style="color: red;">{{ item.compteContribuable.solde }} FCFA</span>
                                </v-col>

                            </v-row>


                        </v-card>
                    </template>

                </v-col>

            </v-row>


            <v-row>


                <v-col
                    cols="6"
                >
                    <v-text-field
                        readonly

                        v-model="item.nom"
                        required
                    >
                        <template v-slot:label>
                            <span class="large_label">Nom</span>
                        </template>
                    </v-text-field>
                </v-col>

                <v-col
                    cols="6"
                >
                    <v-text-field
                        readonly
                        v-model="item.prenom"
                        required
                    >
                        <template v-slot:label>
                            <span class="large_label">Prenom</span>
                        </template>

                    </v-text-field>
                </v-col>

                <v-col cols="6">


                    <v-radio-group
                        v-model="item.genre" readonly row>
                        <v-radio color="orange accent-4" label="Homme" value="H"></v-radio>
                        <v-radio color="orange accent-4" label="Femme" value="F"></v-radio>
                    </v-radio-group>

                </v-col>


                <v-col cols="6">
                    <v-menu
                        ref="menu"

                        v-model="menu2"
                        :close-on-content-click="false"
                        :return-value.sync="item.date_naissance"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                readonly
                                v-model="item.date_naissance"

                                prepend-icon="mdi-calendar"
                                readonly

                                v-bind="attrs"
                                v-on="on"
                            >
                                <template v-slot:label>
                                    <span class="large_label">Date de Naissance</span>
                                </template>
                            </v-text-field>
                        </template>
                        <v-date-picker
                            v-model="item.date_naissance"
                            no-title


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

                                color="primary"
                                @click="$refs.menu.save(item.date_naissance)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>


                <v-col cols="6">
                    <v-text-field
                        readonly


                        v-model="item.email"
                        required
                    >
                        <template v-slot:label>
                            <span class="large_label">Email</span>
                        </template>
                    </v-text-field>
                </v-col>


                <v-col cols="6">
                    <v-text-field
                        readonly

                        v-model="item.numero"

                        required
                    >
                        <template v-slot:label>
                            <span class="large_label">Numéro</span>
                        </template>
                    </v-text-field>


                </v-col>


                <v-col
                    cols="6"
                >
                    <v-text-field
                        readonly

                        v-model="item.identifiant"
                        required
                    >
                        <template v-slot:label>
                            <span class="large_label">Identifiant/Matricule</span>
                        </template>
                    </v-text-field>
                </v-col>

                <v-col cols="6">
                    <v-text-field
                        readonly

                        v-model="item.num_cni"

                        required
                    >
                        <template v-slot:label>
                            <span class="large_label">Numéro de la carte d'identité </span>
                        </template>
                    </v-text-field>
                </v-col>


            </v-row>

            <v-card-actions>
                <v-row>
                    <v-col cols="5"></v-col>
                    <v-col cols="7">
                        <v-btn
                            color="red lighten-4"
                            @click="clickBr(null)"
                        >
                            <v-icon>mdi-close</v-icon>
                            Fermer
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>

        </v-card>

        <v-row>
            <v-col cols="6"></v-col>
            <v-col cols="4"></v-col>
            <v-toolbar
                elevation="4"
                flat
                rounded
            >
                <v-toolbar-title style="color:  black;">{{
                        item.activite.length === 1 ? 'ACTIVITE DU CONTRIBUABLE' : 'LISTE DES ACTIVITES DU CONTRIBUABLES'
                    }}
                </v-toolbar-title>
            </v-toolbar>

        </v-row>
        <v-card elevation="3" style="margin-top: 20px;">
            <v-tabs
                v-model="tab"
                grow
                background-color="primary"
                dark
            >
                <v-tab
                    v-for="(val, i) in item.activite"
                    :key="i"
                >
                    {{ val.lib }}

                    <v-chip
                        class="ma-2"
                        color="red"
                        label
                        text-color="white"
                    >
                        <v-icon left>
                            mdi-label
                        </v-icon>
                        {{ val.info_act.lib_prd.lib }}
                    </v-chip>


                </v-tab>

                <v-tabs-items v-model="tab">

                    <v-tab-item v-for="(val, i) in item.activite"
                                :key="i">
                        <v-container fluid>

                            <v-row>

                                <v-col
                                    cols="6"
                                >
                                    <v-text-field
                                        readonly
                                        outlined
                                        color="primary"
                                        v-model="val.nb_assiete"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span class="large_label"
                                                  style="color: green;">Nombre : {{ val.info_act.taxe.assiete }} </span>
                                        </template>
                                    </v-text-field>
                                </v-col>


                                <v-col
                                    cols="6"
                                >
                                    <v-text-field
                                        outlined
                                        color="primary"
                                        readonly
                                        :value="`${val.montant_cal} FCFA`"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span class="large_label" style="color: red">Montant à payer</span>
                                        </template>
                                    </v-text-field>

                                </v-col>
                            </v-row>
                            <v-row class="mt-6">

                                <v-textarea
                                    readonly
                                    outlined
                                    hint="Description de l'activité"

                                    v-model="val.descr_act"
                                    required
                                >
                                    <template v-slot:label>
                                        <span class="large_label">Description de l'activité</span>
                                    </template>

                                </v-textarea>


                            </v-row>
                            <v-row>
                                <v-col
                                    cols="6"
                                >
                                    <v-text-field
                                        readonly


                                        v-model="val.adresse"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span class="large_label">Adresse de l'activité</span>
                                        </template>
                                    </v-text-field>
                                </v-col>


                                <v-col
                                    cols="6"
                                >
                                    <v-text-field

                                        readonly
                                        v-model="val.info_act.lib_qt"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span class="large_label">Quartier de l'activité</span>
                                        </template>
                                    </v-text-field>

                                </v-col>

                                <v-col
                                    cols="6"
                                >
                                    <v-text-field
                                        readonly
                                        v-model="val.info_act.lib_compte"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span class="large_label">Compte Budgétaire</span>
                                        </template>
                                    </v-text-field>
                                </v-col>


                                <v-col
                                    cols="6"
                                >
                                    <v-text-field
                                        readonly
                                        v-model="val.info_act.taxe.lib"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span class="large_label">Nature de la taxe</span>
                                        </template>

                                    </v-text-field>
                                </v-col>


                                <v-col
                                    cols="12"
                                >
                                    <v-text-field
                                        readonly
                                        :value="getDatePay(val.date_pay_jr, val.date_pay)"
                                        required
                                    >
                                        <template v-slot:label>
                                            <span   :class="getClassDatePay(val.date_pay_jr)" >Date de paiement</span>
                                        </template>

                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">

                                        <v-btn
                                            color="error"
                                            outlined
                                            @click="payerTaxeGet(val, i)"
                                        >
                                            <v-icon>payment</v-icon>
                                            Procéder au paiemnent  de la Taxe
                                        </v-btn>

                                </v-col>
                                <v-col cols="7">
                                    <v-btn
                                        color="primary"
                                        outlined
                                        @click="historiquePayement(val.id_act)"
                                    >
                                        <v-icon>payment</v-icon>
                                        Voir l'historique des versements
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-tab-item>
                </v-tabs-items>


            </v-tabs>

            <v-card-text class="text-center">

            </v-card-text>


            <v-card-actions>


            </v-card-actions>

        </v-card>

        <v-row class="mt-4">
            <v-col cols="5"></v-col>
            <v-col cols="7">
                <v-btn
                    color="red lighten-4"
                    @click="clickBr(null)"
                >
                    <v-icon>mdi-close</v-icon>
                    Fermer
                </v-btn>
            </v-col>
        </v-row>

        <v-dialog persistent v-model="dialog_payer_taxe" max-width="800">
            <v-card>
                <v-card-title   > <pre> {{getMessagePaiement()}}</pre> </v-card-title>
                <v-card-text>
                    <v-row>

                        <v-col cols="6">
                            <span class="moyen_label">Montant à payer :  </span>
                        </v-col>

                        <v-col cols="6">
                            <span class="moyen_label" style="color: red">{{taxe_a_payer.montant_cal}} FCFA</span>
                        </v-col>

                    </v-row>
                </v-card-text>
                <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn color="error" rounded :loading="loading_data" @click="payerTaxePost">Oui</v-btn>
                    <v-btn color="blue darken-1" :disabled="loading_data" outlined rounded  @click="dialog_payer_taxe = false">Annuler</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog_historique"
                    scrollable
                    persistent
                    max-width="400px"
                >

                    <v-card>
                        <v-card-title><v-icon>payment</v-icon> HISTORIQUE VERSEMENT</v-card-title>
                        <v-divider></v-divider>

                        <span class="moyen_label ml-3" style="color: #1d68a7">Montant total : <span style="color: red">{{montant_total}} FCFA</span> </span>
                        <v-card-text style="height: 400px;">

                            <v-list>

                                <v-container
                                    color="primary"
                                    v-if="data_historique.length > 0"
                                >
                                    <v-card
                                        v-for="(item, i) in data_historique"
                                        :key="i"
                                        class="mt-2 pl-2"
                                        elevation="2"
                                    >

                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.date }}
                                                <v-spacer></v-spacer>
                                                <span class="moyen_label">{{ item.montant }} FCFA</span>

                                            </v-list-item-title>

                                        </v-list-item-content>

                                    </v-card>

                                </v-container>
                                <v-row v-else>

                                    <div style="margin-top: 150px">

                                        <v-row>
                                            <v-col cols="12"> <span class="large_label" style="margin-left: 100px;">LISTE VIDE</span></v-col>
                                           <v-col cols="4"></v-col>
                                            <v-col cols="6">

                                                    <img
                                                        src="/assets/vide.png"
                                                        alt="vide"
                                                        size="92"
                                                    >

                                            </v-col>
                                        </v-row>
                                        <
                                    </div>

                                </v-row>
                            </v-list>


                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog_historique = false"
                            >
                                Fermer
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <!--        DIALOG SUCCESS-->

        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog_taxe_payer"
                    persistent
                    transition="dialog-bottom-transition"
                    max-width="450"
                >

                    <v-card>
                        <v-card-title class="text-h5">

                        </v-card-title>
                        <v-card-text>

                            <p class="text-sm-body-1">La collecte a été effectuée.</p>


                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog_taxe_payer = false;"
                            >
                                Terminer
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

    </v-container>

</template>

<script>
export default {
    data: () => ({
        menu2: false,
        dialog_historique: false,
        dialog_taxe_payer : false,
        loading_data: false,
        dialog_payer_taxe : false,
        text_periode: '',
        taxe_a_payer : {},
        montant_total : 0,
        length: 3,
        choix_activite : 0,
        readonly: false,
        tab: null,

        data_historique: [],
    }),
    props: ['item'],

    mounted() {

        this.$root.$emit('TITRE', "FICHE DU CONTRIBUABLE");


        //this.readonly = false;
    },
    methods: {


        getMessagePaiement(){
            let  s = Math.abs(this.taxe_a_payer.date_pay_jr) > 1  ?  's' : '';
           return this.taxe_a_payer.date_pay_jr > 0 ? 'La  date de paiement est dans : ('+this.taxe_a_payer.date_pay_jr+') jour'+ s+'\n Voulez-vous quand même effectuer la collecte de cette taxe ?' : ' Voulez-vous effectuer la collecte de cette taxe ?';
        },

        payerTaxeGet(item, index){

            this.choix_activite = index;
            this.taxe_a_payer = item;
            this.dialog_payer_taxe = true;


        },

        payerTaxePost(){

            this.loading_data = true;
            this.dialog_payer_taxe = false;
            axios.post('payer_taxe', {id_act: this.taxe_a_payer.id_act}).then(response => {


                if(response.data.success){

                    this.item.activite[this.choix_activite] = response.data.activite;

                    this.$root.$emit('update_activite', {data :response.data.activite, index : this.choix_activite } );
                    this.loading_data = false;
                    this.dialog_taxe_payer  = true;

                }


            }).catch(error => {

            });


        },
        getDatePay(nb_jour, date_pay){

          let  s = Math.abs(nb_jour) > 1  ?  's' : '';
            if(nb_jour === 0)
                return  "Ajourd'hui";

            if(nb_jour < 0)
               return "Le "+date_pay +". Il y a  : "+ Math.abs (nb_jour)+" jour"+s ;

            if(nb_jour > 0)
                return "Le "+date_pay+". Dans  : "+nb_jour + " jour"+s;


        },

        getClassDatePay(nb_jour){
           if(nb_jour === 0)
               return "large_label_vert";

            if(nb_jour < 0)
                return "large_label_rouge";

            if(nb_jour > 0)
                return "large_label";

            return "sds";

        },
        historiquePayement(id_taxe) {
            this.loading_data = true;

            axios.post('historique_versement', {id_act: id_taxe}).then(response => {

                this.data_historique = response.data.data;
                this.loading_data = false;
                this.dialog_historique = true;
                this.montant_total = response.data.montant_total.montant;


            }).catch(error => {

            });

        },
        clickBr(val) {


            this.$root.$emit('close_fiche');
            this.$root.$emit('TITRE', "GESTION DES CONTRIBUABLES");

        },
    },
    name: "FicheContribuable"
}
</script>

<style scoped>
.large_label {
    font-size: x-large;
    font-weight: bold;
    color: black;

}

.moyen_label {
    font-size: large;
    font-weight: bold;
    color: black;

}

.large_label_rouge {
    font-size: x-large;
    font-weight: bold;
    color: red;

}

.large_label_vert {
    font-size: x-large;
    font-weight: bold;
    color: green;

}
</style>
