<template>

    <v-container fluid>

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
                        Intervalle de la recette
                    </v-stepper-step>

                    <v-divider></v-divider>

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

                        <v-row>
                            <v-col cols="6">
                                <v-card>
                                    <v-card-title>Date de début</v-card-title>
                                    <v-date-picker
                                        v-model="date_debut"
                                        year-icon="mdi-calendar-blank"
                                        :color="couleur_principale"
                                        full-width
                                        :max="new Date().toISOString().substr(0, 10)"
                                        prev-icon="mdi-skip-previous"
                                        next-icon="mdi-skip-next"
                                    ></v-date-picker>

                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-card>
                                    <v-card-title>Date de fin</v-card-title>
                                    <v-date-picker
                                        v-model="date_fin"
                                        year-icon="mdi-calendar-blank"
                                        :color="couleur_principale"
                                        full-width
                                        :min="date_debut"
                                        prev-icon="mdi-skip-previous"
                                        next-icon="mdi-skip-next"
                                    ></v-date-picker>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-divider class="mt-5" dark></v-divider>
                        <v-row>

                            <v-col cols="2"></v-col>
                            <v-col cols="8">

                                <p class="text-h4">Collecte de {{value_collecteur.lib}} du  <span
                                    class="large_label text-h4"> {{
                                        " " + date_debut.split("-")[2] + "/" + date_debut.split("-")[1] + "/" + date_debut.split("-")[0] + " "
                                    }} </span>
                                    au <span
                                        class="large_label text-h4"> {{
                                            date_fin.split("-")[2] + "/" + date_fin.split("-")[1] + "/" + date_fin.split("-")[0]
                                        }}</span>
                                </p>

                            </v-col>

                        </v-row>

                        <v-container
                            class="fill-height"
                            fluid
                        >
                            <v-row
                                align="center"
                                justify="center"

                            >
                                <v-col
                                    cols="12"
                                    sm="8"
                                    md="4"
                                >
                                    <v-card>
                                        <span class="text-h2" style="color: grey">Montant :</span> <span class="text-h2"
                                                                                                         style="color: orangered">{{montant}} FCFA</span>
                                    </v-card>
                                </v-col>
                            </v-row>


                        </v-container>


                        <v-btn color="primary"  @click="e1 = 1" >
                            Précédent
                        </v-btn>
                    </v-stepper-content>


                </v-stepper-items>
            </v-stepper>
        </template>


    </v-container>
</template>

<script>
export default {

    mounted() {
        this.getListeCollecteur();
    },
    data: () => ({
        date_debut: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        date_fin: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        couleur_principale: "#2C3A47",
        load_data : false,
        montant : 0,
        e1: 1,
        data_collecteur : [],

        value_collecteur: {},
    }),
    methods : {

        getMontantInterval(){
            this.load_data = true;
            axios.post('get_montant_recette_intervalle', {id_coll : this.value_collecteur.id,date_d : this.date_debut, date_f : this.date_fin}).then(response => {



                this.montant = response.data.montant;
                this.load_data = false;




            }).catch(error => {

            });
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
    watch: {
        e1(val){
            if(val === 2){
                this.getMontantInterval();
            }
        },
        date_fin(val){
            this.getMontantInterval();
        },
        date_debut(val){
            this.getMontantInterval();
        },
    },
    name: "verifierRecette"
}
</script>

<style scoped>
.large_label {
    font-size: x-large;
    font-weight: bold;
    color: black;

}

</style>
