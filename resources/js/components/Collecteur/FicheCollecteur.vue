<template>

    <v-container fluid>


        <v-breadcrumbs  :items="items">
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                    @click="clickBr(item)"
                    :disabled="item.disabled"
                >
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>

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
                <v-col  cols="4">




                    <div>

                        <div v-if="item.photo === 'Aucune' ">
                            <v-avatar
                                size="128px"
                                :color="item.couleur"
                            >

                                <span  class="white--text headline">{{item.nom[0]+''+item.nom[1]}}</span>
                            </v-avatar>
                        </div>


                        <div v-else>
                            <v-avatar
                                size="128px"
                                tile

                            >

                                <img
                                    alt="Avatar"
                                    :src="'/storage/photo/collecteur/'+item.photo"
                                >

                            </v-avatar>
                        </div>

                    </div>


                </v-col>

            </v-row>


            <v-row>


                    <v-col
                        cols="6"
                    >
                         <v-text-field
                            readonly

                            label="Nom"

                            v-model="item.nom"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col
                        cols="6"
                    >
                         <v-text-field
                            readonly
                            label="Prenom"
                            v-model="item.prenom"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">



                        <v-radio-group
                             v-model="item.genre" readonly   row>
                            <v-radio color="orange accent-4"   label="Homme" value="H"></v-radio>
                            <v-radio color="orange accent-4"   label="Femme" value="F"></v-radio>
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
                                    label="Date de naissance"
                                    prepend-icon="mdi-calendar"
                                    readonly

                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
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
                            label="Email"


                            v-model="item.email"
                            required
                        ></v-text-field>
                    </v-col>


                    <v-col cols="6">
                         <v-text-field
                            readonly
                            label="Numéro"
                            v-model="item.numero"

                            required
                        ></v-text-field>


                    </v-col>



                    <v-col
                        cols="6"
                    >
                         <v-text-field
                            readonly
                            label="Identifiant/Matricule"
                            v-model="item.identifiant"
                            required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="6">
                         <v-text-field
                            readonly
                            label="Numéro de la carte d'identité "
                            v-model="item.num_cni"

                            required
                        ></v-text-field>
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
                                <v-icon>mdi-close</v-icon> Fermer
                            </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>

        </v-card>

    </v-container>

</template>

<script>
export default {
    data: () => ({
        menu2: false,
        items: [
            {
                text: 'Gestion des collecteurs',
                id : 1,
                disabled: false,
            },
            {
                text: 'Fiche du collecteur',
                id : 2,
                disabled: true,
            },
        ],
    }),
    props: ['item'],

    mounted() {
        this.$root.$emit('TITRE', "FICHE DU COLLECTEUR");
    },
    methods:{
        clickBr(val){


                this.$root.$emit('close_fiche');
                this.$root.$emit('TITRE', "GESTION DES COLLECTEURS");

        },
    },
    name: "FicheCollecteur"
}
</script>

<style scoped>

</style>
