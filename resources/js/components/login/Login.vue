<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="8">
                        <v-card :disabled="load_form" :loading="load_form" min-height="500" class="elevation-12">
                            <v-window v-model="step">

                                <v-window-item :value="1">
                                    <v-row >
                                        <v-col cols="12" md="8">
                                            <v-card-text   class="mt-12">
                                                <h1
                                                    class="text-center display-2 primary--text text--accent-3"
                                                >BIENVENUE SUR RECNET</h1>
                                                <div class="text-center mt-4">
                                                    <v-btn v-show="false" class="mx-2" fab color="black" outlined>
                                                        <v-icon>fab fa-facebook-f</v-icon>
                                                    </v-btn>

                                                    <v-btn v-show="false" class="mx-2" fab color="black" outlined>
                                                        <v-icon>fab fa-google-plus-g</v-icon>
                                                    </v-btn>
                                                    <v-btn v-show="false" class="mx-2" fab color="black" outlined>
                                                        <v-icon>fab fa-linkedin-in</v-icon>
                                                    </v-btn>
                                                </div>
                                                <h4 v-show="false" class="text-center mt-4">Vous devez d'abord vous connecté.</h4>
                                                <v-form>
                                                    <v-text-field

                                                        name="Email"
                                                        prepend-icon="email"
                                                        type="text"
                                                        outlined

                                                        :error="loginError.email"
                                                        v-model="login.email"
                                                        :error-messages="message_error"
                                                        rounded
                                                        color="primary accent-3"
                                                    >

                                                        <template v-slot:label>
                                                            <span class="large_label">Email</span>
                                                        </template>
                                                    </v-text-field>

                                                    <v-text-field
                                                        id="password"
                                                       outlined
                                                        rounded
                                                        :type="voirpass ? 'text' : 'password'"
                                                        :append-icon="voirpass ? 'mdi-eye' : 'mdi-eye-off'"
                                                        @click:append="voirpass = !voirpass"
                                                        v-model="login.password"
                                                        :error="loginError.password"
                                                        error-messages=""
                                                        name="password"
                                                        prepend-icon="lock"
                                                        v-on:keyup.enter="seConnecter"
                                                        color="primary accent-3"
                                                    >
                                                        <template v-slot:label>
                                                            <span class="large_label">Mot de passe</span>
                                                        </template>
                                                    </v-text-field>
                                                </v-form>
                                                <h4 class="text-center mt-4 "  @click="step++" style="color: #5a7cb5"><a href="#">Mot de passe oublié ?</a> </h4>
                                                <div class="text-center mt-3">

                                                    <v-hover v-slot="{ hover }">
                                                    <v-btn :outlined="!!hover" :loading="load_form"  @click="seConnecter" rounded color="primary accent-3"   :disabled="login.email.length < 5 || login.password.length < 5"> <v-icon>mdi-check</v-icon> SE CONNECTER</v-btn>
                                                    </v-hover>
                                                </div>
                                            </v-card-text>

                                        </v-col>


                                        <v-col   style="height: 540px; background-color: #e2e2e2" cols="12" md="4"  class=" accent-3">

                                            <v-card-text class="white--text mt-12">
                                                <h1 class="text-center display-1"></h1>
                                                <h5
                                                    class="text-center"
                                                ></h5>
                                            </v-card-text>
                                            <div class="text-center">
                                                <v-img src="./assets/logo.png" alt="admin" class="mx-auto"/>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-window-item>

                                <v-window-item :value="2">
                                    <v-row >
                                        <v-col cols="12" md="8">
                                            <v-card-text   class="mt-12">
                                                <h1
                                                    class="text-center display-2 primary--text text--accent-3"
                                                >BIENVENUE SUR RECNET</h1>
                                                <div class="text-center mt-4">
                                                    <v-btn v-show="false" class="mx-2" fab color="black" outlined>
                                                        <v-icon>fab fa-facebook-f</v-icon>
                                                    </v-btn>

                                                    <v-btn v-show="false" class="mx-2" fab color="black" outlined>
                                                        <v-icon>fab fa-google-plus-g</v-icon>
                                                    </v-btn>
                                                    <v-btn v-show="false" class="mx-2" fab color="black" outlined>
                                                        <v-icon>fab fa-linkedin-in</v-icon>
                                                    </v-btn>
                                                </div>
                                                <h3  class="text-center mt-4 mb-4">Entrez votre adresse email</h3>
                                                <v-form>
                                                    <v-text-field

                                                        name="Email"
                                                        prepend-icon="email"
                                                        type="text"
                                                        filled

                                                        rounded
                                                        color="primary accent-3"
                                                    >
                                                        <template v-slot:label>
                                                            <span class="large_label">Email</span>
                                                        </template>
                                                    </v-text-field>


                                                </v-form>

                                                <div class="text-center mt-3">

                                                    <v-hover v-slot="{ hover }">
                                                        <v-btn :outlined="!!hover" rounded color="primary accent-3" dark> <v-icon>mdi-check</v-icon>réinitialiser </v-btn>
                                                    </v-hover>
                                                </div>
                                                <h4 class="text-center mt-4 " @click="step++" style="color: #5a7cb5"><a href="#">Se connecter</a> </h4>
                                            </v-card-text>

                                        </v-col>


                                        <v-col   style="height: 540px; background-color: #e2e2e2" cols="12" md="4"  class=" accent-3">

                                            <v-card-text class="white--text mt-12">
                                                <h1 class="text-center display-1"></h1>
                                                <h5
                                                    class="text-center"
                                                ></h5>
                                            </v-card-text>
                                            <div class="text-center">
                                                <v-img src="./assets/logo.png" alt="admin" class="mx-auto"/>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </v-window-item>

                            </v-window>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {

    mounted() {

        this.$root.$emit('login', "true");
    },
    data: () => ({
        load_form: false,
        step: 1,
        message_error :  "",
        voirpass : false,
        login : {
            email : "",
            password : "",
        },
        loginError : {
            email : false,
            password : false,
        },
    }),
    methods : {
        seConnecter(){


            this.load_form = true

            axios.post("reg_connexion", this.login).then( response =>{

                this.load_form = false;
                if(response.data.success){

                    window.location.reload();


                }else{
                    this.loginError.password = true;
                    this.loginError.email = true;
                    this.message_error = "L'email ou le mot de passe n'est pas valide."
                }

            }).catch(error =>{})
        },
    },
    props: {
        source: String
    }
};
</script>

<style scoped>
.large_label {
    font-size: x-large;
    font-weight: bold;
    color: grey;

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
