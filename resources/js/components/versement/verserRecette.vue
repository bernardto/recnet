<template>
    <div>

        <v-overlay v-model="load_data">
            <v-progress-circular

                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>

        <template >
            <v-stepper  v-model="e1">
                <v-stepper-header>
                    <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                    >
                        Choissisez un collecteur
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                    >
                        Date de la recette
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                        Montant de la recette
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">

                            <v-data-table
                                hide-default-footer
                                class="elevation-1"
                            >
                                <template v-slot:top>
                                    <v-toolbar
                                        flat
                                    >
                                        <v-toolbar-title>Selectionner le collecteur</v-toolbar-title>
                                        <v-divider
                                            class="mx-4"
                                            inset
                                            vertical
                                        ></v-divider>

                                        <v-autocomplete
                                            v-model="value_collecteur"
                                            :items="data_collecteur"
                                            :loading="load_data"
                                            clearable
                                            rounded
                                            return-object
                                            :disabled="load_data"
                                            auto-select-first
                                            item-text="lib"
                                            label="Rechercher un collecteur"
                                            solo
                                        >
                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                       Aucun collecteur trouvé.
<!--                                                        <strong> <a href="./zone">Ici</a> </strong>-->
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </template>
                                        </v-autocomplete>


                                    </v-toolbar>
                                </template>
                            </v-data-table>

                        <v-btn
                           style="margin-top: 10px;"
                            :disabled="!value_collecteur.id"
                            color="primary"
                            @click="e1 = 2"
                        >
                            Suivant
                        </v-btn>


                    </v-stepper-content>

                    <v-stepper-content step="2">

                            <v-date-picker
                                v-model="date_versement"
                                year-icon="mdi-calendar-blank"
                                :color="couleur_principale"
                                full-width
                                :max="new Date().toISOString().substr(0, 10)"
                                prev-icon="mdi-skip-previous"
                                next-icon="mdi-skip-next"
                            ></v-date-picker>



                        <v-btn
                            color="primary"
                            @click="e1 = 3"
                        >
                            Suivant
                        </v-btn>

                        <v-btn @click="e1 = 1" text>
                            Précédent
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card
                            class="mb-12"


                        >
                            <v-row>

                                <v-col cols="6">
                                    <v-text-field
                                        readonly

                                        v-model="value_collecteur.lib"

                                    >
                                        <template v-slot:label>
                                            <span class="large_label">Nom du Collecteur</span>
                                        </template>
                                    </v-text-field>


                                </v-col>


                                <v-col cols="6">
                                    <v-text-field
                                        readonly

                                        :value="getDateVersement()"

                                    >
                                        <template v-slot:label>
                                            <span class="large_label">Versement du </span>
                                        </template>
                                    </v-text-field>


                                </v-col>


                                <v-col cols="6">
                                    <v-text-field
                                        readonly
                                        outlined
                                        :value="montant_calcule + ' FCFA'"

                                    >
                                        <template v-slot:label>
                                            <span class="large_label" style="color: red">Montant caculé automatiquement FCFA</span>
                                        </template>
                                    </v-text-field>


                                </v-col>



                                <v-col cols="6">
                                    <v-text-field

                                        type="number"
                                        v-model="montant_verse"
                                        outlined
                                    >
                                        <template v-slot:label>
                                            <span style="color: #2a9055" class="large_label">Montant versé FCFA</span>
                                        </template>
                                    </v-text-field>


                                </v-col>


                            </v-row>


                        </v-card>

                        <v-btn
                            color="primary"
                            :disabled="!montant_verse || montant_verse <= 0"
                            @click="dialog_confirmation = true"
                        >
                            Valider le versement
                        </v-btn>

                        <v-btn text @click="e1 = 2">

                            précedent
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </template>

        <v-dialog persistent v-model="dialog_confirmation" max-width="800">
            <v-card>
                <v-card-title   > Voulez-vous effectuer ce versement  ? .</v-card-title>
                <v-card-text>
                    <v-row>

                        <v-col cols="6">
                            <span class="moyen_label">Montant verser :  </span>
                        </v-col>

                        <v-col cols="6">
                            <span class="moyen_label" style="color: red">{{montant_verse}} FCFA</span>
                        </v-col>

                        <v-divider></v-divider>
                        <v-col cols="6">
                            <span class="moyen_label">Collecteur  </span>
                        </v-col>

                        <v-col cols="6">
                            <span class="moyen_label" >{{value_collecteur.lib}}</span>
                        </v-col>
                        <v-divider></v-divider>

                        <v-col cols="6">
                            <span class="moyen_label">Date de paiement  :  </span>
                        </v-col>

                        <v-col cols="6">
                            <span class="moyen_label" >{{getDateVersement()}}</span>
                        </v-col>


                    </v-row>
                </v-card-text>
                <v-card-actions >
                    <v-spacer></v-spacer>
                    <v-btn color="error" rounded :loading="load_data" @click="validerVerserRecette">Oui</v-btn>
                    <v-btn color="blue darken-1" :disabled="load_data" outlined rounded  @click="dialog_confirmation = false">Annuler</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!--        DIALOG SUCCESS-->

        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog_success"
                    persistent
                    transition="dialog-bottom-transition"
                    max-width="450"
                >

                    <v-card>
                        <v-card-title class="text-h5">

                        </v-card-title>
                        <v-card-text>

                            <p class="text-sm-body-1">Le versement a été effectué.</p>


                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="AccueilVersment()"
                            >
                                Terminer
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

    </div>


</template>

<script>
export default {
    name: "verserRecette",
    mounted() {
        this.getListeCollecteur();
    },
   data:()=>({
       couleur_principale:  "#2C3A47",
       montant_calcule:  0,
       dialog_success : false,
       dialog_confirmation : false,
       e1 : 1,
       dialog_verser_recette : false,
       montant_verse : 0,
       date_versement : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),


       load_data : false,
       data_collecteur : [],

       value_collecteur: {},
   }),
    methods : {



        validerVerserRecette(){

            this.load_data = true;

            axios.post('valider_versement_recette', {montant : this.montant_verse, id_coll :  this.value_collecteur.id}).then(response => {

                if(response.data.success){
                    this.load_data = false;
                    this.dialog_success = true;
                }



            }).catch(error => {

            });

        },

        getDateVersement(){
            let tab = this.date_versement.split("-");

            return tab[2] + "/"+tab[1]+"/" +tab[0];

        },
        getMontantCalcule(){

            this.load_data = true;
            axios.post('get_montant_calcule_date', {date : this.date_versement, id_coll :  this.value_collecteur.id}).then(response => {







                    this.montant_calcule = response.data.montant ;
                this.load_data = false;


            }).catch(error => {

            });

        },
        AccueilVersment(){
            this.$router.push({path: '/versement'});
        },
        getListeCollecteur(
        ){
            this.load_data = true;
            axios.post('liste_collecteur_nom_mat_id', {}).then(response => {


                response.data.data.forEach((item,index) => {

                    this.data_collecteur.push({id : item.id_col, lib : item.nom + " "+item.prenom + " ( "+item.identifiant +" ) "});

                });
                this.load_data = false;




            }).catch(error => {

            });

        },
    },
    watch : {
        e1(val){
            if(val === 3){
                this.getMontantCalcule();
            }
        },
    },
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
</style>
