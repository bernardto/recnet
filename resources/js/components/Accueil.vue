<template>

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
                    sm="12"



                >

                    <v-card
                        class="mx-auto"
                        :max-width="size_card"
                        outlined

                        style="padding: 20px ;"
                        elevation="1"

                    >
                        <v-row>
                            <v-col :cols="cols" :md="cols"   v-for="item in data_card"
                                   :key="item.id">
                                <v-hover  v-slot="{ hover }">
                                    <v-card
                                        color="grey darken-1"
                                        @click="router(item)" max-width="200" :color="hover ?  'primary' :  'grey darken-1' "  class="ma-2"
                                            height="225">
                                        <v-container>
                                            <v-row>

                                                <v-col cols="auto">
                                                    <v-img
                                                        height="100"
                                                        width="100"
                                                        :src="'./assets/'+item.image+'.png'"
                                                    ></v-img>
                                                    <p class="headline mt-3">{{item.nom}}</p>


                                                </v-col>


                                            </v-row>
                                        </v-container>


                                    </v-card>
                                </v-hover>
                            </v-col>

                        </v-row>

                    </v-card>

                </v-col>

            </v-row>
        </v-container>




</template>

<script>
export default {
    mounted() {

        this.size_card = window.innerWidth;

        this.$root.$emit('TITRE', "ACCUEIL");
    },
    data: () => ({

        isMobile: false,
        size_card: 900,
        data_card :   [
            {nom : 'Contribuables', id: 1 , lien :  'contribuable', image :  'market'},
            {nom : 'Collecteurs', id: 3 , lien :  'collecteur',image :  'user'},
            {nom : 'Superviseurs', id: 2 , lien :  'superviseur',image :  'superviseur'},

            {nom : 'Versement Recette', id: 4 , lien :  'versement', image :  'versement'},
            {nom : 'Recouvrement', id: 5 , lien :  'recouvrement', image :  'recouvrement'},
            {nom : 'Quartiers', id: 6 , lien :  'quartier', image :  'maps'},

            {nom : 'Taxes', id: 7 , lien :  'taxes', image :  'taxes'},
            // {nom : 'Tickets', id: 8 , lien :  'ticket', image :  'ticket'},
            //{nom : 'Odres /Déclaratin de Recette', id: 9 , lien :  'odre_recette', image :  'declarer_recette'},
            {nom: 'Comptes Budgétaire', id: 10, lien: 'compte_fonc', image: 'compte_fonc'},
            {nom: 'Paramètres', id: 11, lien: 'parametre', image: 'para'},


        ],
        cols : 4,
        lien_site: location.protocol + '//' + location.host,

    }),
    methods: {
        router(id) {



            this.$router.push({ path :  id.lien});

        },
    }
}
</script>


