<template>
    <v-div>
        <v-row>

            <v-col cols="12">
                <v-card>

                    <v-data-table
                        :headers="headers"
                        v-if="false"
                        :items="data_parrains_defaut"

                        class="elevation-1"
                    >

                        <template v-slot:item.photo_p="{ item }">


                            <div v-if="item.photo_p === 'auncun' ">
                                <v-avatar
                                    size="36px"
                                    color="primary"
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
                                        :src="`/parrains/`+item.photo_p"
                                    >

                                </v-avatar>
                            </div>


                        </template>


                        <template v-slot:no-data>
                            <p class="subtitle-1">Aucune donnée disponible</p>
                        </template>
                    </v-data-table>

                </v-card>

                <table  class="styled-table">
                    <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Nom</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, i) in data_parrains_defaut"
                        :key="i">

                        <td>
                            <div v-if="item.photo_p === 'auncun' ">
                                <v-avatar
                                    size="36px"
                                    color="primary"
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
                                        :src="`/parrains/`+item.photo_p"
                                    >

                                </v-avatar>
                            </div>
                        </td>
                        <td>{{item.nom_p}}</td>
                    </tr>

                    <!-- and so on... -->
                    </tbody>
                    <tfoot id="pageFooter"><tr><td></td></tr></tfoot>
                </table>


            </v-col>
        </v-row>

    </v-div>
</template>

<script>
export default {
    name: 'HelloWorld',

    data : () =>({

        headers: [
            {
                text: 'Photo du Parrain',
                align: 'start',
                sortable: false,
                value: 'photo_p',
            },
            {text: 'Nom & Prenom du Parrain', value: 'nom_p', sortable: false,},

        ],

        data_parrains_defaut: [
            {nom_p: "ABAKA TANOH", photo_p: "ABAKA TANOH.jpg", id: 0},
            {nom_p: "ABDEL LATIF BARGO", photo_p: "ABDEL LATIF BARGO.jpeg", id: 1},
            {nom_p: "ACCOH ADJE JACO JUNIOR", photo_p: "ACCOH ADJE JACO JUNIOR.jpg", id: 2},
            {nom_p: "ADAMA DIABATE.JPG", photo_p: "ADAMA DIABATE.JPG", id: 3},
            {nom_p: "ADOU AGNISSAN RICHARD", photo_p: "ADOU AGNISSAN RICHARD.jpg", id: 4},
            {nom_p: "ADOU DAVID YANN MICHEL", photo_p: "ADOU DAVID YANN MICHEL.jpg", id: 5},
            {nom_p: "ALIMATA OUATTARA", photo_p: "ALIMATA OUATTARA.jpg", id: 6},
            {nom_p: "ANIBE EMMANUEL", photo_p: "ANIBE EMMANUEL.jpg", id: 7},
            {nom_p: "ARMEL NGOTTA", photo_p: "ARMEL NGOTTA.jpg", id: 8},
            {nom_p: "ASSOKPA KOFFI", photo_p: "ASSOKPA KOFFI.jpg", id: 9},
            {nom_p: "BALEMBO NKAZI MBESSE CELGA LUCIEN", photo_p: "BALEMBO NKAZI MBESSE CELGA LUCIEN.jpg", id: 10},
            {nom_p: "BAMAMY FOFANA", photo_p: "BAMAMY FOFANA.jpg", id: 11},
            {nom_p: "BAMBA ADAMA", photo_p: "BAMBA ADAMA.jpg", id: 12},
            {nom_p: "BARRY HASSANATOU", photo_p: "BARRY HASSANATOU.jpg", id: 13},
            {nom_p: "BEKOIN NGUETTA", photo_p: "BEKOIN NGUETTA.jpeg", id: 14},
            {nom_p: "BLIN GNALY MICKAEL", photo_p: "BLIN GNALY MICKAEL.jpg", id: 15},
            {nom_p: "BOTI LOU HUEMAN AUDREY", photo_p: "BOTI LOU HUEMAN AUDREY.jpg", id: 16},
            {nom_p: "BRAHIMA DIABATE", photo_p: "BRAHIMA DIABATE.jpg", id: 17},
            {nom_p: "BROU TANOH TOUSSAIN", photo_p: "BROU TANOH TOUSSAIN.jpg", id: 18},
            {nom_p: "CHRISTOPHE NGUESSAN", photo_p: "CHRISTOPHE NGUESSAN.jpg", id: 19},
            {nom_p: "DIALLO HADHA MARIAMA", photo_p: "DIALLO HADHA MARIAMA.jpg", id: 20},
            {nom_p: "DIOMANDE MEKOMELE", photo_p: "DIOMANDE MEKOMELE.jpg", id: 21},
            {nom_p: "GBAZARE EPHRAIM", photo_p: "GBAZARE EPHRAIM.jpg", id: 22},
            {nom_p: "KARNON KONE", photo_p: "KARNON KONE.jpg", id: 23},
            {nom_p: "KASSI ASSOI HYACINTHE", photo_p: "KASSI ASSOI HYACINTHE.jpg", id: 24},
            {nom_p: "KOFFI AKA", photo_p: "KOFFI AKA.jpeg", id: 25},
            {nom_p: "KOFFI AMENAN EDEN CLEOPATRE", photo_p: "KOFFI AMENAN EDEN CLEOPATRE.jpg", id: 26},
            {nom_p: "KONAN CHRIST-COLLIN", photo_p: "KONAN CHRIST-COLLIN.jpg", id: 27},
            {nom_p: "KONAN CLAUDE ESAÏ", photo_p: "KONAN CLAUDE ESAÏ.jpg", id: 28},
            {nom_p: "KONAN KOFFI", photo_p: "KONAN KOFFI.jpg", id: 29},
            {nom_p: "KONAN KOUAKOU FRANCK", photo_p: "KONAN KOUAKOU FRANCK.jpg", id: 30},
            {nom_p: "KOPOIN ARTHUR MOREL ORPHEE", photo_p: "KOPOIN ARTHUR MOREL ORPHEE.jpg", id: 31},
            {nom_p: "KOUAKOU BANIANKO KONAN MARC", photo_p: "KOUAKOU BANIANKO KONAN MARC.jpg", id: 32},
            {nom_p: "KOUAKOU YAO", photo_p: "KOUAKOU YAO.jpg", id: 33},
            {nom_p: "KOUAO EKRA JOSEPH KO", photo_p: "KOUAO EKRA JOSEPH KO.jpg", id: 34},
            {nom_p: "KOUASSI JEAN GHISLAIN KOUAKOU", photo_p: "KOUASSI JEAN GHISLAIN KOUAKOU.jpg", id: 35},
            {nom_p: "KRAH KOBENA", photo_p: "KRAH KOBENA.jpg", id: 36},
            {nom_p: "MAMADOU BAMBA", photo_p: "MAMADOU BAMBA.jpg", id: 37},
            {nom_p: "MANGOUA ARNOLD", photo_p: "MANGOUA ARNOLD.jpg", id: 38},
            {nom_p: "MAZEU IKA", photo_p: "MAZEU IKA.jpg", id: 39},
            {nom_p: "MOISE SAM", photo_p: "MOISE SAM.jpg", id: 40},
            {nom_p: "NIKIEMA FATOUMATA", photo_p: "NIKIEMA FATOUMATA.jpg", id: 41},
            {nom_p: "OUEDRAOGO CHEICK", photo_p: "OUEDRAOGO CHEICK.jpg", id: 42},
            {nom_p: "OUEDRAOGO IRAHIM", photo_p: "OUEDRAOGO IRAHIM.jpg", id: 43},
            {nom_p: "SAMASSI LOSSOUNGO", photo_p: "SAMASSI LOSSOUNGO.jpg", id: 44},
            {nom_p: "SILUE TENA SYLVAIN", photo_p: "SILUE TENA SYLVAIN.jpg", id: 45},
            {nom_p: "TRE EMERY.JPG", photo_p: "TRE EMERY.JPG", id: 46},
            {nom_p: "TUO FOUNIBINGUE", photo_p: "TUO FOUNIBINGUE.jpg", id: 47},
            {nom_p: "YAO KAN", photo_p: "YAO KAN.jpg", id: 48},
            {nom_p: "YAO KOUASSI", photo_p: "YAO KOUASSI.jpeg", id: 49},
            {nom_p: "OHOUO JEAN-FRANCIS DAMAS AKE", photo_p: "OHOUO JEAN-FRANCIS DAMAS AKE.jpg", id: 60},

            {nom_p: "YEO OUATANDJO AHMED", photo_p: "YEO OUATANDJO AHMED.jpg", id: 51},
            {nom_p: "YOBOUE YOBOUE", photo_p: "YOBOUE YOBOUE.JPG", id: 52}

        ]
        ,
    }),
}
</script>
<style>
.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    width: 100%;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
}
.styled-table th,
.styled-table td {
    padding: 12px 15px;
    text-align: center;
}.styled-table tbody tr {
     border-bottom: 1px solid #dddddd;
 }

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
.styled-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>
