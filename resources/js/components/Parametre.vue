<template>

    <div>
        <template>
            <v-list rounded>
                <v-list-item-group
                    v-model="item_value"
                    color="primary"
                >
                    <v-divider></v-divider>
                    <v-row>


                        <v-col cols="4" v-for="(item, i) in items"
                               :key="i">
                            <v-list-item
                                :disabled="load_form"
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title style="color: #1d68a7" v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                                <v-divider vertical></v-divider>
                            </v-list-item>
                        </v-col>

                    </v-row>
                    <v-divider></v-divider>
                </v-list-item-group>

            </v-list>
        </template>
        <v-row>
            <v-col cols="12">

                <v-window v-model="item_value">

                    <!--     MON COMPTE       -->
                    <v-window-item :value="0">

                        <v-card :disabled="load_form" :loading="load_form">
                            <v-container>

                                <v-row>
                                    <v-col cols="4">
                                        <v-hover v-slot="{ hover }">
                                            <v-btn :outlined="!!hover" block
                                                   @click="edit_acc = true;changer_pass = false" color="orange accent-3"
                                                   dark>
                                                <v-icon>mdi-table-edit</v-icon>
                                                Modifier mon compte
                                            </v-btn>
                                        </v-hover>
                                    </v-col>
                                    <v-col cols="4"></v-col>
                                    <v-col cols="4">
                                        <v-hover v-slot="{ hover }">
                                            <v-btn :outlined="!!hover" block @click="changer_pass = true ; edit_acc = false;"
                                                   color="primary accent-3" dark>
                                                <v-icon>mdi-eye</v-icon>
                                                Modifier mon mot de passe
                                            </v-btn>
                                        </v-hover>

                                    </v-col>
                                </v-row>
                                <v-row v-if="!changer_pass">
                                    <v-col cols="12">


                                        <div>

                                            <div v-if="item.photo === 'Aucune' ">
                                                <v-avatar
                                                    size="128px"
                                                    color="orange"
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
                                                        :src="'/storage/photo/regisseur/'+item.photo"
                                                    >

                                                </v-avatar>
                                            </div>

                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-file-input
                                            v-if="edit_acc"
                                            show-size
                                            truncate-length="15"
                                            accept="image/png, image/jpeg, image/bmp"
                                            placeholder="Choisir une photo"
                                            prepend-icon="mdi-camera"
                                            label="Changer la photo"
                                        ></v-file-input>


                                    </v-col>
                                </v-row>
                                <v-form ref="form" lazy-validation v-model="valid_form">

                                    <v-card :disabled="!edit_acc">
                                        <v-card-text>
                                    <v-row v-if="!changer_pass">


                                        <v-col
                                            cols="12"
                                        >
                                            <v-text-field
                                                v-if="false"
                                                v-model="item.matricule"
                                                required

                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Matricule</span>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="6"
                                        >
                                            <v-text-field

                                                :rules="m_rules"
                                                v-model="item.nom"
                                                :disabled="!edit_acc"
                                                :error-messages="editedItemTextError.nom"
                                                :error="editedItemBooleanError.nom"
                                                required
                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Nom</span>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col
                                            cols="6"
                                        >
                                            <v-text-field
                                                :rules="m_rules"
                                                v-model="item.prenom"
                                                :error-messages="editedItemTextError.prenom"
                                                :error="editedItemBooleanError.prenom"
                                                :disabled="!edit_acc"
                                                required
                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Prenom</span>
                                                </template>

                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="6">


                                            <v-radio-group
                                                v-model="item.genre" row>
                                                <v-radio :disabled="!edit_acc" color="orange accent-4" label="Homme"
                                                         value="H"></v-radio>
                                                <v-radio :disabled="!edit_acc" color="orange accent-4" label="Femme"
                                                         value="F"></v-radio>
                                            </v-radio-group>

                                        </v-col>


                                        <v-col cols="6">
                                            <v-menu
                                                ref="menu"

                                                v-model
                                                    ="menu2"
                                                :close-on-content-click="false"
                                                :return-value.sync="item.date_naissance"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        :disabled="!edit_acc"
                                                        v-model="item.date_naissance"

                                                        prepend-icon="mdi-calendar"


                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        <template v-slot:label>
                                                            <span class="large_label">Date de Naissance</span>
                                                        </template>
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker
                                                    v-model="item.date_naissance"
                                                    no-title
                                                    :disabled="!edit_acc"

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

                                                :disabled="!edit_acc"
                                                v-model="item.lieu_nai"
                                                :error-messages="editedItemTextError.lieu_nai"
                                                :error="editedItemBooleanError.lieu_nai"

                                                required
                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Lieu de naissance</span>
                                                </template>
                                            </v-text-field>


                                        </v-col>

                                        <v-col cols="6">
                                            <v-text-field

                                                :disabled="!edit_acc"
                                                v-model="item.email"
                                                :error-messages="editedItemTextError.email"
                                                :error="editedItemBooleanError.email"
                                                :rules="m_rules"
                                                required
                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Email</span>
                                                </template>
                                            </v-text-field>
                                        </v-col>


                                        <v-col cols="6">
                                            <v-text-field

                                                :disabled="!edit_acc"
                                                v-model="item.numero"
                                                :error-messages="editedItemTextError.numero"
                                                :error="editedItemBooleanError.numero"
                                                :rules="m_rules"
                                                required
                                                type="number"
                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Numéro </span>
                                                </template>
                                            </v-text-field>
                                        </v-col>


                                        <v-col cols="6">
                                            <v-text-field

                                                :disabled="!edit_acc"
                                                v-model="item.numero_cni"
                                                :error-messages="editedItemTextError.numero_cni"
                                                :error="editedItemBooleanError.numero_cni"
                                                required
                                            >
                                                <template v-slot:label>
                                                    <span class="large_label">Numéro de  pièce</span>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                    </v-row>
                                            <v-row>
                                                <v-col cols="5"></v-col>
                                                <v-col cols="7">
                                                    <v-btn
                                                        @click="modifierMonCompte"
                                                        color="orange lighten-4"
                                                        :loading="load_form"
                                                        :disabled="!valid_form"
                                                        v-if="edit_acc && !changer_pass"


                                                    >
                                                        <v-icon>mdi-content-save-all</v-icon>
                                                        Enregistrer
                                                    </v-btn>
                                                </v-col>
                                            </v-row>

                                        </v-card-text>
                                    </v-card>
                                </v-form>


                                <v-form   class="mt-4" ref="form2" lazy-validation v-model="valid_form">
                                <v-row v-if="changer_pass">
                                    <v-col cols="12">
                                        <v-text-field
                                            id="password"
                                            filled
                                            rounded
                                            :rules="pass_rules"
                                            v-model="change_password_item.anc_mp"
                                            :error="change_password_item_b_error.anc_mp"
                                            :error-messages="change_password_error.anc_mp"
                                            name="password"
                                            prepend-icon="lock"
                                            type="password"
                                            color="primary accent-3"
                                        >
                                            <template v-slot:label>
                                                <span class="moyen_label">Ancien mot de  passe</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>


                                    <v-col cols="12">
                                        <v-text-field
                                            id="password"
                                            filled
                                            rounded
                                            name="password"

                                            :rules="pass_rules"
                                            v-model="change_password_item.new_mp"
                                            :error="change_password_item_b_error.new_mp"
                                            :error-messages="change_password_error.new_mp"
                                            prepend-icon="lock"
                                            type="password"
                                            color="primary accent-3"
                                        >
                                            <template v-slot:label>
                                                <span class="moyen_label">Nouveau mot de passe</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>


                                    <v-col cols="12">
                                        <v-text-field
                                            id="password"
                                            filled
                                            rounded
                                            name="password"
                                            :rules="pass_rules"
                                            v-model="change_password_item.confir_mp"
                                            :error="change_password_item_b_error.confir_mp"
                                            :error-messages="change_password_error.confir_mp"
                                            prepend-icon="lock"
                                            type="password"
                                            color="primary accent-3"
                                        >
                                            <template v-slot:label>
                                                <span class="moyen_label">Confirmation du mot de passe</span>
                                            </template>
                                        </v-text-field>
                                    </v-col>

                                    <v-col cols="3"></v-col>
                                    <v-col cols="6">

                                        <v-hover v-slot="{ hover }">
                                            <v-btn :outlined="!!hover" block @click="updatePassword()" rounded
                                                   color="primary accent-3" dark>
                                                <v-icon>mdi-table-edit</v-icon>
                                                Modifier le mot de passe
                                            </v-btn>
                                        </v-hover>

                                    </v-col>

                                </v-row>
                                </v-form>

                                <v-dialog persistent v-model="dialog_message" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5" style="word-break: keep-all;">


                                            <v-avatar size="32">
                                                <img
                                                    src="assets/info.png"
                                                    alt="John"
                                                >
                                            </v-avatar>

                                            {{ message_dialog }}
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn @click="dialog_message = false"
                                                   color="primary">OK
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>


                            </v-container>
                        </v-card>

                    </v-window-item>

                    <!--     AUTRE COMPTE       -->
                    <v-window-item :value="1"></v-window-item>

                    <!--     PARAMETRE       -->
                    <v-window-item :value="2"></v-window-item>
                </v-window>

            </v-col>
        </v-row>

        <v-snackbar
            :timeout="5000"
            v-model="afficher_snackbar"
            absolute
            right
            rounded
            top
            :color="color_snack"

        >
            <v-icon>mdi-content-save</v-icon> {{message_snackbar}}
        </v-snackbar>
    </div>


</template>
<script>
export default {


    mounted() {
        this.$root.$emit('TITRE', "PARAMETRES");
         this.getInfoCompte();
    },
    data: () => ({
        item_value: -1,
        changer_pass: false,
        valid_form2: false,
        valid_form: false,
        menu2: false,
        load_form: false,
        dialog_message: false,

        color_snack : "primary",
        message_snackbar : "",
        afficher_snackbar :  false,
        file: null,
        edit_acc: false,
        change_password_item : {
            anc_mp : "12345",
            new_mp : "12345",
            confir_mp : "12345",
        },
        change_password_item_b_error : {
            anc_mp : false,
            new_mp : false,
            confir_mp : false,
        },
        change_password_error : {
            anc_mp : "",
            new_mp : "",
            confir_mp : "",
        },
        editedItemTextError: {
            nom: '',
            prenom: '',
            lieu_nai: "",
            genre: '',
            date_naissance: "",
            email: '',
            numero: '',
            matricule: '',
            numero_cni: '',
        },
        editedItemBooleanError: {
            nom: false,
            prenom: false,
            lieu_nai: false,
            genre: false,
            date_naissance: false,
            email: false,
            numero: false,
            matricule: false,
            numero_cni: false,
            fichier: false,
        },
        item: {
            nom: 'TOTO',
            prenom: 'BERNARD',

            lieu_nai: "ISSIA",
            genre: 'H',
            date_naissance: "06-02-1998",
            email: 'totobernard09@gmail.com',
            numero: '+2257803638',
            matricule: '17INP00747',
            numero_cni: 80000,
            fichier: "",
            photo: "",

        },
        itemOrignal: {
            nom: 'TOTO',
            prenom: 'BERNARD',

            lieu_nai: "ISSIA",
            genre: 'H',
            date_naissance: "06-02-1998",
            email: 'totobernard09@gmail.com',
            numero: '+2257803638',
            matricule: '17INP00747',
            numero_cni: 80000,
            fichier: "",
            photo: "",

        },

        message_dialog: "La modification a été effectuée.",
        pass_rules : [
            v => !!v || 'Ce champ  est obligatoire',

            v => (v && v.length > 4) || 'Le mot de passe doit avoir 5 caractères au minimum.',
        ],
        m_rules: [
            v => !!v || 'le champ est obligatoire',
        ],
        items: [
            {text: 'MON COMPTE', icon: 'mdi-account'},

            {text: 'COMPTES UTILISATEURS', icon: 'mdi-clock'},
            {text: 'AUTRES PARAMETRES', icon: 'mdi-tune'},

        ],
    }),
    methods: {
        updatePassword(){
            if (!this.$refs.form2.validate())
             return;

            if(this.change_password_item.confir_mp !== this.change_password_item.new_mp){
                this.change_password_error.confir_mp =  "La confirmation du mot de passe n'est pas valide";
                this.change_password_item_b_error = true;
                return;
            }
            this.change_password_error.confir_mp =  "";
            this.change_password_item_b_error.confir_mp = false;


            this.load_form = true;
            axios.post("/update_password", this.change_password_item).then(response =>{
                if(response.data.success){

                    this.change_password_error.anc_mp =  "";
                    this.change_password_item_b_error.anc_mp = false;

                    this.color_snack = 'primary';
                    this.message_snackbar = "Le mot de passe a été modifié."
                    this.afficher_snackbar = true;

                   this.change_password_item =  {
                        anc_mp : "",
                            new_mp : "",
                            confir_mp : "",
                    };

                   this.edit_acc = true;
                   this.changer_pass = false;

                }else{
                    this.change_password_error.anc_mp =  "Votre ancien mot de passe n'est pas valide";
                    this.change_password_item_b_error.anc_mp = true;
                }
                this.load_form = false;
            }).catch(error =>{});

        },
        modifierMonCompte() {

            if (!this.$refs.form.validate())
                return

            let formData = new FormData();
            this.loadform = true;
            let o = 0;

            if (this.file) {

                /// for (let file of this.file) {

                if (this.file.size < 2000000) {
                    formData.append("fichier", this.file, this.file.name);
                    this.editedItemBooleanError.fichier = false;
                    o++;
                } else {
                    this.editedItemBooleanError.fichier = true;
                    this.editedItemTextError.fichier = "La taille de la photo est supérieure à 2MB";
                    this.loadform = false;
                    this.error = true;
                    return;
                }

                //}
            }
            //console.log(o);

            formData.append("nb_photo", o);

            var config = {
                onUploadProgress: progressEvent => {
                    let percen = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.niveau_load = percen;
                }
            };


            this.item.up_email = this.itemOrignal.email !== this.item.email;
            // this.item.up_identifiant = this.itemOrignal.matricule !== this.item.matricule;
            formData.append("data", JSON.stringify(this.item));


            axios.post("reg_modification", formData, config)
                .then(response => {

                    this.loadform = false;
                    if (response.data.success) {

                        this.message_dialog = "La modification a été effectuée.";
                        this.dialog_message = true;
                    }


                }).catch(error => {

            });
        },
        getInfoCompte() {

            axios.post("/reg_get_info").then(response => {

                if (response.data.connected) {
                    this.item = {};
                    let data = response.data.data[0];

                    this.item = {
                        nom: data.nom,
                        prenom: data.prenom,
                        numero: data.numero,

                        genre: data.sex,
                        date_naissance: data.date_nai,
                        email: data.email,
                        //    matricule: data.numero,
                        numero_cni: data.numero_cni,
                        id: data.id,
                        photo:  data.photo,
                        lieu_nai:  data.lieu_nai

                    }

                    this.itemOrignal = {
                        nom: data.nom,
                        prenom: data.prenom,
                        numero: data.numero,
                        genre: data.sex,
                        date_naissance: data.date_nai,
                        email: data.email,
                        //    matricule: data.numero,
                        numero_cni: data.numero_cni,
                        id: data.id,
                        photo:  data.photo,

                        lieu_nai:  data.lieu_nai

                    }
                } else {
                    this.item = {
                        nom: "",
                        prenom: "",
                        phone: "",
                        genre: "",
                        date_naissance: "",
                        email: "",
                        matricule: "",
                        numero_cni: "",

                    }
                }

            }).catch(error => {

                if (error.response && 419 === error.response.status) {
                    window.location.reload()
                }

                return Promise.reject(error)

            });
        },
        updateCompte() {
        },

    },
}
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
