<template>
    <v-app id="inspire">
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >



                <v-row
                    align="center"
                    style="margin-bottom: 20%"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card min-width="800" class="elevation-12">
                            <v-toolbar
                                color="#2C3A47"
                                dark
                                flat
                            >


                            </v-toolbar>
                            <v-card-text>

                                <v-row>

                                    <v-col cols="4">
                                        <v-hover
                                            v-slot="{ hover }"
                                            open-delay="200"
                                        >
                                            <v-card @click="verserRecette" min-height="200" min-width="200" outlined
                                                    :elevation="hover ? 16 : 3">
                                                <v-card-title style="
                                                                    word-break: keep-all;">VERSEMENT DE RECETTE
                                                </v-card-title>
                                                <v-avatar class="fill-height" tile size="100">
                                                    <v-row align="center" justify="center">
                                                        <v-col class="ml-3" cols="12">
                                                            <img
                                                                src="assets/versement.png"
                                                                alt="Commencer le binomage"
                                                            >

                                                        </v-col>
                                                    </v-row>

                                                </v-avatar>
                                            </v-card>
                                        </v-hover>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-hover
                                            v-slot="{ hover }"
                                            open-delay="200"
                                        >
                                            <v-card @click="verifierRecette" min-height="200" min-width="200" outlined
                                                    :elevation="hover ? 16 : 3">
                                                <v-card-title style="
                                                                    word-break: keep-all;">VERIFIER RECETTE DU
                                                    COLLECTEUR
                                                </v-card-title>
                                                <v-avatar class="fill-height" tile size="100">
                                                    <v-row align="center" justify="center">
                                                        <v-col class="ml-3" cols="12">
                                                            <img
                                                                src="assets/autorisation.png"
                                                                alt="Commencer le binomage"
                                                            >

                                                        </v-col>
                                                    </v-row>

                                                </v-avatar>
                                            </v-card>
                                        </v-hover>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-hover
                                            v-slot="{ hover }"
                                            open-delay="200"
                                        >
                                            <v-card @click="historiqueVersemnt" min-height="200" min-width="200"
                                                    outlined
                                                    :elevation="hover ? 16 : 3">
                                                <v-card-title style="
                                                                    word-break: keep-all;">HISTORIQUE DES VERSEMENTS
                                                </v-card-title>
                                                <v-avatar class="fill-height" tile size="100">
                                                    <v-row align="center" justify="center">
                                                        <v-col class="ml-3" cols="12">
                                                            <img
                                                                src="assets/historique.png"
                                                                alt="Historique "
                                                            >

                                                        </v-col>
                                                    </v-row>

                                                </v-avatar>
                                            </v-card>
                                        </v-hover>
                                    </v-col>


                                </v-row>

                            </v-card-text>

                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    props: {
        source: String,
    },
    methods: {
        verserRecette() {
            this.$router.push({path: '/verser_recette'});
        },

        verifierRecette() {
            this.$router.push({path: '/verifier_recette'});
        },

        historiqueVersemnt() {
            this.$router.push({path: '/historique_versement'});
        },
    },

}
</script>
<style type="text/css">

.custom-title {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    text-align: justify;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: .0125em;
    line-height: 2rem;
    word-break: break-all;
}


</style>
