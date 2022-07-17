<template>
    <v-container>
        <v-card>
            <v-card-title class="blue lighten-3">
                Inscription
            </v-card-title>

            <v-row class="mx-2">
                <v-col
                    class="align-center justify-space-between"
                    cols="12"
                >
                    <v-row
                        align="center"
                        class="mr-0"
                    >
                        <v-avatar
                            size="40px"
                            class="mx-3"
                        >
                            <img
                                :src="lien_site+'/img/user.png'"
                                alt=""
                            >
                        </v-avatar>
                        <v-text-field
                            clearable
                            v-model="FormAbs.nom"
                            :disabled="loadform"

                            placeholder="Nom et prenom"
                            :error="ErrorB.nom"
                            :error-messages="ErrorT.nom"

                        />
                    </v-row>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mdi-wallet-travel"
                        v-model="FormAbs.ville"
                        :disabled="loadform"
                        placeholder="Ville"
                        clearable
                        :error="ErrorB.ville"
                        :error-messages="ErrorT.ville"
                    />
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        prepend-icon="mail"
                        v-model="FormAbs.email"
                        :disabled="loadform"
                        placeholder="Email"
                        clearable
                        :error="ErrorB.email"
                        :error-messages="ErrorT.email"
                    />
                </v-col>
                <v-col cols="12">



                    <v-radio-group   :disabled="loadform"  v-model="FormAbs.sex" row>
                        <v-radio color="success"   label="Homme" value="H"></v-radio>
                        <v-radio color="success"   label="Femme" value="F"></v-radio>
                    </v-radio-group>

                </v-col>

                <v-col cols="12">
                    <v-text-field
                        type="number"
                        prepend-icon="phone"
                        v-model="FormAbs.tel"
                        :disabled="loadform"
                        placeholder="(+225) 00-00-00-00-00"
                        clearable
                        :error="ErrorB.tel"
                        :error-messages="ErrorT.tel"
                    />
                </v-col>





                <v-col lg="12"  >
                    <v-text-field
                        id="password2"
                        label="Nouveau mot de passe"
                        :error="ErrorB.password"

                        v-model="FormAbs.password"
                        :error-messages="ErrorT.password"
                        prepend-icon="lock"

                        :disabled="loadform"
                        :type="voirpass2 ? 'text' : 'password'"
                        :append-icon="voirpass2 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="voirpass2 = !voirpass2"
                    />

                    <v-text-field
                        id="password3"
                        label="Confirmation du mot de passe"
                        prepend-icon="lock"
                        :disabled="loadform"
                        :type="voirpass3 ? 'text' : 'password'"
                        :error="ErrorB.confirmation_password"
                        v-model="FormAbs.confirmation_password"
                        :error-messages="ErrorT.confirmation_password"
                        :append-icon="voirpass3 ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="voirpass3 = !voirpass3"
                    />



                </v-col>
                <v-col cols = "12">

                    <v-hover v-slot="{ hover }">
                        <v-btn depressed @click="envoyerDonnee" x-large :outlined = "!!hover" block rounded color="primary" :loading="loadform">
                            <v-icon>mdi-file-send</v-icon> Envoyer
                        </v-btn>

                    </v-hover>


                </v-col>

            </v-row>



        </v-card>


        <v-row justify="center">

            <v-dialog
                v-model="dialog_termine"
                persistent
                max-width="320"
            >
                <v-card>

                    <v-card-title >Inscription Effective <img height="24px" widht="24px" :src="lien_site+'/img/smile.png'"> </v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions >

                        <v-btn
                            depressed  rounded color="primary"
                            small

                            @click="Termine()"
                        >
                            Ok
                        </v-btn>

                    </v-card-actions>



                </v-card>
            </v-dialog>
        </v-row>
    </v-container>



</template>

<script>
export default {
    mounted() {
        window.addEventListener('resize', this.onResize, { passive: true });

    },
    data: () => ({
        dialog: false,
        date_debut: new Date().toISOString().substr(0, 10),
        date_fin: new Date().toISOString().substr(0, 10),
        menu1: false,
        loadform: false,
        isMobile: false,
        dialog_termine :false,
        lien_site : location.protocol + '//' + location.host,
        menu2: false,
        voirpass2: false,
        voirpass3: false,
        message : '',
        id_autorisation : 0,
        picker: new Date().toISOString().substr(0, 10),
        FormAbs: {nom: '', ville: '', email: '', tel: '', sex: 'H', password : '', confirmation_password : ''},
        ErrorT:  {nom: '', ville: '', email: '', tel: '', sex: 'H', password : '', confirmation_password : ''},
        ErrorB: {nom: false, ville: false, email: false, tel: false, password : false, confirmation_password : false},
        Users: [],
    }),
    beforeDestroy () {
        if (typeof window === 'undefined') return

        window.removeEventListener('resize', this.onResize, { passive: true })
    },
    methods: {
        Termine(){
            this.dialog_termine = false;
            location.reload();
        },
        accueil(){
            this.FormAbs =  {nom: '', ville: '', email: '', tel: '', sex: 'H', password : '', confirmation_password : ''};
            this.$router.push({ name: 'accueil'});
        },
        envoyerDonnee(){

            this.ErrorB.password = false;
            this.ErrorT.password = "";
            this.ErrorB.confirmation_password = false;
            this.ErrorT.confirmation_password = "";

            if(this.FormAbs.password.length <7 )
            {
                this.ErrorB.password = true;
                this.ErrorT.password = "La longeur du mot de passe doit être supérieure à 7";

                return false;
            }
            this.ErrorB.password = false;


            if(this.FormAbs.password !== this.FormAbs.confirmation_password){

                this.ErrorB.confirmation_password = true;
                this.ErrorT.confirmation_password = "Le mot de passe ne correspond pas.";
                return false;
            }

            this.ErrorB.confirmation_password = false;


            let ce = this;
            ce.loadform = true;

            axios.post('/inscription', this.toFormData(this.FormAbs))
                .then(function (response) {
                    ce.loadform = false;


                    if (response.data.success) {


                        ce.traitementAffichageErreur([]);
                        ce.dialog_termine = true;



                    } else {
                        let er = response.data.errors;
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        })
                        ce.traitementAffichageErreur(er);

                        //  console.log(response);


                    }

                })
                .catch(function (error) {
                    // handle error

                })
                .then(function () {
                    // always executed
                })
        },


        toFormData: function (obj) {
            let formData = new FormData();
            for (let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },
        traitementAffichageErreur(er){

            let ce = this;
            let j = 0;
            Object.keys(ce.ErrorT).forEach(function (cle_O) {
                j = 0;
                Object.keys(er).forEach(function (cle_E) {
                    if (cle_O === cle_E) {
                        ce.ErrorB[cle_O] = true;
                        ce.ErrorT[cle_O] = er[cle_E];
                        j++;
                        return;
                    }


                });

                if (j === 0) {
                    ce.ErrorB[cle_O] = false;
                    ce.ErrorT[cle_O] = '';
                }


            });
        },
        onResize () {
            this.isMobile = window.innerWidth < 600
        },

    }


}



</script>

<style scoped>

</style>
