<template>
    <v-container id="main_container" fluid>
        <v-overlay :value="load_data">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>

        <v-row>
            <v-col class="card" :cols="value_main_tri.id > 0 ? 4 : 5">


                <v-select

                    v-model="value_main_tri"
                    :items="data_main_tri"
                    return-object
                    color="primary"
                    :disabled="load_data"


                    :error="errorBollean.main_tri"
                    :error-messages="errorText.main_tri"
                    item-text="lib"
                    @click=""
                    @change="onChangeMainTri"
                    chips
                    outlined
                    item-color="primary"

                    label="Trié les données selon :"

                ></v-select>

            </v-col>


            <v-divider vertical></v-divider>
            <v-col v-if="value_main_tri.id > 0" cols="4">


                <v-select
                    class="select-blanc"
                    v-model="value_option_tri"
                    :items="data_option_tri"
                    return-object
                    :error="errorBollean.option_tri"
                    :error-messages="errorText.option_tri"
                    item-text="lib"
                    @click=""
                    @change="onChangeOptionTri"
                    outlined
                    chips
                    label="Option de tri"

                ></v-select>


            </v-col>
            <v-divider vertical></v-divider>
            <v-col :cols="value_main_tri.id > 0 ? 3 : 5">


                <v-select

                    v-model="value_date_tri"
                    :items="data_date_tri"
                    return-object
                    :disabled="disable_select_date"
                    :error="errorBollean.date_tri"
                    :error-messages="errorText.date_tri"
                    item-text="lib"
                    @click=""
                    @change="onChangeDate"
                    chips
                    outlined
                    label="Choisir une date"

                ></v-select>

            </v-col>


        </v-row>

        <v-divider class="mt-8"></v-divider>
        <div v-if="!load_data && value_date_tri.lib">
            <v-row class="mt-6" style="padding: 10px">

                <v-col cols="3">
                    <v-card class="hover_card" min-height="100" max-width="300" elevation="5">

                        <v-row class="justify-center">

                            <v-col style="margin-left: 10px" cols="8">
                                <h3 class="headline primary--text text--accent-2">{{montant_total}} FCFA</h3>

                            </v-col>

                            <v-col cols="4">
                                <img src="assets/fonds.png" height="50" width="50">
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>

                <v-col cols="3">
                    <v-card @click="getDetailRecouvrementCollecteur(1)" class="hover_card" min-height="100" max-width="300" elevation="5">

                        <v-row class="justify-center">

                            <v-col style="margin-left: 10px" cols="8">
                                <h3  class="headline orange--text text--accent-2">{{nb_collecteur}} Collecteur{{nb_collecteur > 1 ? 's': ''}}</h3>

                            </v-col>

                            <v-col cols="4">
                                <img src="assets/superviseur.png" height="50" width="50">
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>

                <v-col cols="3">
                    <v-card @click="getDetailRecouvrementCollecteur(2)" class="hover_card" min-height="100" max-width="300" elevation="5">

                        <v-row class="justify-center">

                            <v-col style="margin-left: 10px" cols="8">
                                <h3 class="headline primary--text text--accent-2">{{nb_contribuable}} Contribuable{{nb_contribuable > 1 ? 's': ''}}</h3>

                            </v-col>

                            <v-col cols="4">
                                <img src="assets/people.png" height="50" width="50">
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>

                <v-col cols="3">
                    <v-card class="hover_card" min-height="100" max-width="300" elevation="5">

                        <v-row class="justify-center">

                            <v-col style="margin-left: 10px" cols="8">
                                <h3 class="headline primary--text text--accent-2">{{nb_activite}} Activité{{nb_activite > 1 ? 's': ''}}</h3>

                            </v-col>

                            <v-col cols="4">
                                <img src="assets/market.png" height="50" width="50">
                            </v-col>
                        </v-row>

                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-row>
                    <v-col cols="4"></v-col>
                    <v-col cols="5">
                        <v-radio-group
                            v-model="radio"
                            row
                        >
                            <v-radio
                                label="Histogramme"
                                @click="histo_courbe = 1"
                                value="1"
                            ></v-radio>
                            <v-radio
                                label="Courbe"
                                @click="histo_courbe = 2"
                                value="2"
                            ></v-radio>
                            <v-radio
                                label="Circulaire"
                                @click="histo_courbe = 3"
                                value="3"
                            ></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-col v-if="histo_courbe === 1 " cols="12">
                    <v-card elevation="3">
                        <bar-chart v-if="load_courbe_termine" :data_histogramme="data_histogramme"></bar-chart>
                    </v-card>
                </v-col>

                <v-col v-if="histo_courbe === 2" cols="12">
                    <v-card elevation="3">
                        <line-chart v-if="load_courbe_termine" :data_histogramme="data_histogramme"></line-chart>
                    </v-card>
                </v-col>
                <v-col v-if="histo_courbe === 3" cols="12">
                    <v-card elevation="3">
                        <doughnut-chart v-if="load_courbe_termine" :data_histogramme="data_histogramme"></doughnut-chart>
                    </v-card>
                </v-col>


<!--                <v-col cols="4">
                    <v-card elevation="3">
                        <doughnut-chart></doughnut-chart>
                    </v-card>
                </v-col>-->

            </v-row>
        </div>

        <v-dialog   style="background-color: white" v-model="dialog_detail" width="1200" >
            <div style="background-color: white">

                <v-row>

                    <v-col cols="6">
                        <span class="text-md-h5" >MAIRIE DE YAMOUSSOUKRO </span>
                    </v-col>

                    <v-col cols="6">
                        <span class="text-md-h5" style="float: right">Samedi 09/01/2022 </span>
                    </v-col>
                </v-row>

                <v-row class="mt-6">

                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                        <v-card  style="border-color: black;" outlined >
                            <v-card-title style="text-align: center; word-break: keep-all; font-weight: bold">ETAT DE RECOUVREMENT DES COLLECTEURS DE LA MAIRIE DU 10/11/22</v-card-title>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>

                    <v-col cols="1"></v-col>

                    <v-col cols="10">
                        <template>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-left">
                                            Identifiant
                                        </th>
                                        <th class="text-left">
                                            Nom
                                        </th>
                                        <th class="text-left">
                                            Genre
                                        </th>
                                        <th class="text-left">
                                            Montant
                                        </th>
                                        <th class="text-center justify-center">
                                            Contribuable collecté.
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr
                                        v-for="(item, index) in data_detail"
                                        :key="index"
                                    >
                                        <td>{{ item.identifiant }}</td>
                                        <td>{{ item.nom }}</td>
                                        <td>{{ item.sexe === 'H' ? "HOMME" : "FEMME" }}</td>
                                        <td>{{ item.montant }}</td>
                                        <td>{{ item.nb_cont }}</td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>


                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                    <v-col cols="9"></v-col>
                    <v-col cols="2"><span class="text-md-h5" style="font-weight: bold">Le régisseur <br/> <span ></span> </span></v-col>

                </v-row>



            </div>
        </v-dialog>
    </v-container>
</template>


<script>
import DoughnutChart from './Charts/DoughnutChart';
import BarChart from './Charts/BarChart';
import LineChart from './Charts/LineChart';

export default {

    mounted() {

       this.load_data = true;
        this.getMethodeDeTri();
        this.getDataQuartier();
        this.getDataZone();
        this.getCollecteurNomId();
        this.getDateDeRecouvrement();

    },
    components: {
      BarChart,
        LineChart,
        DoughnutChart
    },

    data: () => ({

        //
        montant_total : 0,
        nb_collecteur : 0,
        nb_activite : 0,
        nb_contribuable : 0,
        histo_courbe : 2,
        radio : "2",


        //Booléan
        load_data: false,
        dialog_detail : false,
        load_courbe_termine: false,
        disable_select_date: false,

        //integer

        //String

        //object
        errorText: {main_tri: "", option_tri: "", date_tri: ""},
        errorBollean: {main_tri: false, option_tri: false, date_tri: false},

        //Array

        data_zone: [],
        data_quartier: [],
        data_collecteur: [],
        data_histogramme : [0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0],


        data_detail : [],
        value_option_tri: [],
        data_option_tri: [{id: 1, lib: "TOTO LAGBEU BERARD"}],


        value_date_tri: [],
        data_date_tri: [],


        data_main_tri: [{id: 1, lib: "toto"}, {id: 1, lib: "toto bernard"}],
        value_main_tri: [],

    }),
    methods: {

        getMethodeDeTri() {


            axios.post('/get_methode_de_tri').then(response => {


                this.data_main_tri = response.data.data;

                this.value_main_tri = this.data_main_tri[0];

            }).catch(error => {


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


                this.data_quartier = response.data.data;


            }).catch(error => {


            });

        },
        getDetailRecouvrementCollecteur(rapport){

          /*  let url = window.location.href.replace("recouvrement","") +"get_detail_recouvrement?date_tri" +
            "="+this.value_date_tri.date+"&main_tri="+this.value_main_tri.id+"&id="+this.value_option_tri.id+"&rapport="+rapport;

            window.open(url);
*/

            axios.get('/get_detail_recouvrement', {
                date_tri: this.value_date_tri.date,
                main_tri: this.value_main_tri.id,
                option_tri: this.value_option_tri,
                rapport : rapport,
            }).then(response => {
                this.data_detail = response.data.data;
                this.dialog_detail = true;
            }).catch(error => {


            });


                },
        getCollecteurNomId() {
            axios.post('/get_collecteur_nom_id').then(response => {


                this.data_collecteur = response.data.data;


            }).catch(error => {


            });

        },
        getDateDeRecouvrement() {

            axios.post('/get_date_de_recouvrement').then(response => {

                this.data_date_tri = response.data.data;
                if(!response.data.today_disponible){
                    this.data_date_tri.unshift(response.data.today);
                }
                this.load_data = false;


            }).catch(error => {


            });
        },

        onChangeOptionTri(item) {
            this.disable_select_date = false;
            this.reinitialiserChamp();

        },
        reinitialiserChamp(){
            this.value_date_tri = [];
            this.montant_total = 0;
            this.nb_contribuable = 0;
            this.nb_collecteur = 0;
            this.data_histogramme = [0,0,0,0,0,0,0,0,0,0,0,0,0];
            this.load_courbe_termine = false;
        },
        onChangeMainTri(item) {

            this.value_option_tri = [];
            this.value_date_tri = [];
            this.disable_select_date = true;
            switch (item.id) {

                case 0: //TOUS RESULTATS
                    this.data_option_tri = [];
                    this.disable_select_date = false;
                    break;
                case 1: //QUARTIER
                    this.data_option_tri = this.data_quartier;
                    break;
                case 2://ZONE
                    this.data_option_tri = this.data_zone;
                    break;
                case 3://COLLECTEUR
                    this.data_option_tri = this.data_collecteur;
                    break;


            }
        },

        onChangeDate(item) {

            this.load_data = true;
            let option_tri_id = 0;

            if (this.value_option_tri) {
                option_tri_id = this.value_option_tri.id;
            }


            axios.post('/get_statistique_recouvrement', {
                date_tri: this.value_date_tri.date,
                main_tri: this.value_main_tri.id,
                option_tri: this.value_option_tri
            }).then(response => {



               this.nb_activite = response.data.nb_activite[0].nb;
                this.nb_collecteur = response.data.nb_collecteur[0].nb;
                this.nb_contribuable = response.data.nb_contribuable[0].nb;
                if(response.data.montant_total[0].montant)
                    this.montant_total = response.data.montant_total[0].montant;
                else
                    this.montant_total =0;


               // console.log(response.data.data_heure.length);

                this.data_histogramme = [0,0,0,0,0,0,0,0,0,0,0,0,0];
               response.data.data_heure.forEach((item, index) => {


                   /*
                   $HEURE = ["01","02","03","04","05",
                       "06","07","08","09","10",
                       "11","12","13","14","15",
                       "16","17","18","19","20","21","22",
                       "23","00"]; 0       1            2      3         4         5         6            7       8
                       labels: ["08-9H", "09-10H", "10-11H", "11-12H", "12-13H", "13-14H", "14-15H", "15-16H", "16-18H",
                    "18-20H", "20-22H", "22-06H", "06-08H"
                        9      10        11        12
                    */


                   switch(index){
                       //22H - 06H
                       case  index < 5 || index > 21:
                           this.data_histogramme[11] = this.data_histogramme[11] + item[0].montant;
                           break;
                       //6H -08H
                       case  index > 4 && index < 7:
                           this.data_histogramme[12] = this.data_histogramme[12] + item[0].montant;
                           break;
                           //20H -22H
                       case index > 18 && index < 21 :
                               this.data_histogramme[10] = this.data_histogramme[10] + item[0].montant;
                               break;
                       //18H -20H
                       case index > 16 && index < 19 :
                           this.data_histogramme[9] = this.data_histogramme[9] + item[0].montant;
                           break;
                       //16H -18H
                       case index > 14 && index < 17 :
                           this.data_histogramme[8] = this.data_histogramme[8] + item[0].montant;
                           break;
                       case 14://15
                           this.data_histogramme[7] = this.data_histogramme[7] + item[0].montant;
                           break;
                       case 13://14
                           this.data_histogramme[6] = this.data_histogramme[6] + item[0].montant;
                           break;

                       case 12:
                           this.data_histogramme[5] = this.data_histogramme[5] + item[0].montant;

                           break;
                       case 11:

                           this.data_histogramme[4] = this.data_histogramme[4] + item[0].montant;
                           break;
                       case 10:
                           this.data_histogramme[3] = this.data_histogramme[3] + item[0].montant;
                           break;
                       case 9:
                           this.data_histogramme[2] = this.data_histogramme[2] + item[0].montant;
                           break;
                       case 8://9h
                           this.data_histogramme[1] = this.data_histogramme[1] + item[0].montant;
                           break;
                           //8h
                       case 7:
                           this.data_histogramme[0] = this.data_histogramme[0] + item[0].montant;
                           break;




                   }

                   this.load_courbe_termine = true;
                   this.load_data = false;



                });



            }).catch(error => {


            });
        },


    },


}
</script>

<style>
.v-chip__content {
    font-size: 24px;
}

.v-select__slot .v-label {
    font-size: 24px;

}



.select-blanc .v-select__slot .v-label {
    font-size: 24px;

}

.hover_card:hover {
    background-color: #B3E5FC;
}
</style>

