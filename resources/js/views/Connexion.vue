<template>
    <v-app>
        <v-container>
            <v-card class="elevation-12">
                <v-toolbar
                    color="primary"
                    dark
                    class="mt-5"
                    flat
                >
                    <v-toolbar-title>Connexion</v-toolbar-title>
                    <v-spacer />

                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            label="Email"
                            clearable
                            :error="ErrorB.username"
                            :error-messages="ErrorT.username"
                            v-model="Admin.username"
                            :disabled="loadform"
                            prepend-icon="person"
                            type="username"
                        />

                        <v-text-field
                            id="password"
                            label="Mot de passe"
                            :error="ErrorB.password"
                            :error-messages="ErrorT.password"
                            v-model="Admin.password"
                            :disabled="loadform"
                            prepend-icon="lock"
                            :type="voirpass ? 'text' : 'password'"
                            :append-icon="voirpass ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="voirpass = !voirpass"
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" :loading="loadform" @click="Connexion">Se connecter</v-btn>


                    <v-divider
                    class="mx-4"
                    inset
                    vertical
                    ></v-divider>

                    <v-btn  outlined :disabled="loadform"  @click="$router.push({ name: 'inscrription'})">Inscription</v-btn>

                </v-card-actions>

            </v-card>
        </v-container>
    </v-app>
</template>



<script>


export default{

    mounted() {
        /*console.log(location.protocol + '//' + location.host);*/
    },
    props: {
        source: String,
    },
    data: () => ({
        dialog: false,
        drawer: null,
        voirpass: false,
        loadform: false,
        //  Admin:{username: 'Admin', password: 'admin@2021'},
        Admin:{username: '', password: ''},
        ErrorT:{username: '', password: ''},
        ErrorB:{username: false, password: false},
        Users:[],


    }),


    methods :{

        Connexion(){
            var ce = this;
            ce.loadform =true;
            axios.post('/connexion', this.toFormData(this.Admin))
                .then(function (response) {
                    ce.loadform = false;
                    if(response.data.success){
                        //window.location.href = location.protocol + '//' + location.host + '/';
                        location.reload();
                        return false;
                    }else{
                        let er = response.data.errors;
                        let j = 0;
                        if(response.data.invalid){
                            ce.ErrorB.username  = true;
                            ce.ErrorB.password  = true;
                            ce.ErrorT.username = "L'Email ou le mot de passe n'est pas valide.";

                        }else{
                            Object.keys(ce.ErrorT).forEach( function(cle_O) {
                                j = 0;
                                Object.keys(er).forEach(function(cle_E) {
                                    if(cle_O === cle_E){
                                        ce.ErrorB[cle_O] = true;
                                        ce.ErrorT[cle_O] = er[cle_E];
                                        j++;
                                        return;


                                    }

                                });

                                if(j === 0){

                                    ce.ErrorB[cle_O] = false;
                                    ce.ErrorT[cle_O] = '';

                                }



                            });
                        }

                    }



                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });


        },

        toFormData: function(obj) {
            let formData = new FormData();
            for(let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },

        exit(){
            this.Admin.nom =  '',this.Admin.post =  '', this.Admin.username =  '', this.Admin.tel = '';
            this.dialog = false;
        },



    }
}
</script>
