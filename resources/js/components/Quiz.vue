<template>
    <div>
        <v-card
            :loading="loading"

            class="mx-auto"
        >
            <v-card-title style="">
                <pre>{{ data_quiz.question }}</pre>
            </v-card-title>

            <v-card-text>

                <!--        VRAI OU FAUX    -->
                <div v-if="data_quiz.type  === 1">

                    <v-radio-group
                        v-model="true_fasle"

                    >
                        <v-radio
                            v-for="item in data_propo"
                            :key="item.id"
                            :label="'['+ item.lettre +']. '+ item.proposition "
                            :value="item.id"
                            :color="item.color"
                        ></v-radio>

                    </v-radio-group>

                </div>


                <!--        UN SEUL CHOIX    -->
                <div v-if="data_quiz.type  === 2">

                    <v-radio-group
                        v-model="single_choice"

                    >


                        <v-radio
                            v-for="item in data_propo"
                            :key="item.id"
                            :color="item.color"
                            :label="'['+ item.lettre +']. '+ item.proposition "
                            :value="item.id"
                        >


                        </v-radio>

                    </v-radio-group>

                </div>


                <!--        QCM    -->
                <div v-if="data_quiz.type  === 3">

                    <v-checkbox
                        v-for="item in data_propo"
                        :key="item.id"
                        v-model="item.checked"
                        :color="item.color"
                        :label="'['+ item.lettre +']. '+ item.proposition "
                        color="primary"
                        hide-details
                    ></v-checkbox>


                </div>


            </v-card-text>

            <v-row>
                <v-col cols="5">
                    <v-alert
                        dense
                        v-if="juste === 1"
                        text
                        type="success"
                    >
                        {{text_correction}}
                    </v-alert>

                    <v-alert
                        dense
                        outlined
                        v-if="juste === 0"
                        type="error"
                    >

                        {{text_correction}}
                    </v-alert>
                </v-col>
            </v-row>


            <v-row>

                <v-col cols="1">

                </v-col>

                <v-col style="margin-bottom: 50px" cols="4">
                    <v-btn
                        large
                        outlined
                        color="success"
                        @click="index_rev--"
                        dark
                    >
                        Précedent
                        <v-icon>mdi-done</v-icon>
                    </v-btn>
                    <v-divider vertical></v-divider>
                    <v-btn
                        large
                        outlined
                        color="red"
                        dark
                        @click="valider"
                    >
                        Valider
                        <v-icon>mdi-done</v-icon>
                    </v-btn>
                    <v-divider vertical></v-divider>

                    <v-btn
                        large
                        outlined
                        color="primary"
                        dark
                        @click="index_rev++"
                    >
                        Suivant
                        <v-icon>mdi-forward</v-icon>
                    </v-btn>

                </v-col>
                <v-col cols="1">
                    <v-text-field
                        v-model="index_rev"
                        label="Regular"
                        color="primary"
                        type="number"
                        solo
                    ></v-text-field>
                </v-col>

            </v-row>

        </v-card>

    </div>
</template>
<script>
export default {
    mounted() {

        this.getQuiz();
    },
    data: () => ({
        show: false,
        loading: false,
        true_fasle: null,
        text_correction : "",
        single_choice: null,
        juste : -1,
        id_quiz: 1,
        data_quiz: {},
        data_propo: [],

        index_rev :0,
        data_rev : [471,473,474,478,480,484,486,487,3,17,22,34,68,73,84,89,91,93,97,105,106,109,110,251,253,255,257,264,265,266,267,268,269,270,272,274,275,289,290,291,292,293,295,307,313,315,353,
            355,357,358,359,360,361,362,366,367,368,369,370,371,372,374,377,380,381,385,386,387,389,392,395,397,401,403,409,410,413,414,415,420,421],
        color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],

    }),
    watch: {
        index_rev(before, after) {

            if (after <= 128 && after >= 0) {
                this.getQuiz();
            }
        },
    },
    methods: {
        getRandomInt(max) {

            return Math.floor(Math.random() * Math.floor(max));


        },
        valider() {
            let bon_resp = this.data_quiz.reponse;
            if (this.data_quiz.type === 1) {
                let ma_preponse = this.true_fasle;

                if (ma_preponse === 0 && bon_resp === "T") {

                    this.juste = 1;
                    this.text_correction = "Bonne réponse: => "+bon_resp
                    return;

                }

                if (ma_preponse === 1 && bon_resp === "F") {

                    this.juste = 1;
                    this.text_correction = "Bonne réponse: => "+bon_resp
                    return;
                }

                this.juste = 0;
                this.text_correction = "Mauvaise  réponse (--) La Bonne réponse est   => "+bon_resp

            } else if(this.data_quiz.type === 2) {
                let ma_preponse = this.getLettreSelection(this.single_choice);

                if (ma_preponse  === bon_resp) {

                    this.juste = 1;
                    this.text_correction = "Bonne réponse: => "+bon_resp


                }else{
                    this.juste = 0;
                    this.text_correction = "Mauvaise  réponse (--) La Bonne réponse est   => "+bon_resp

                }


            }
            else if(this.data_quiz.type === 3) {

                let ma_preponse = "";

                this.data_propo.forEach((item, index) => {

                    if(item.checked){
                        ma_preponse = ma_preponse + this.getLettreSelection(index);
                    }

                });

                if (ma_preponse  === bon_resp) {

                    this.juste = 1;
                    this.text_correction = "Bonne réponse: => "+bon_resp


                }else{
                    this.juste = 0;
                    this.text_correction = "Mauvaise  réponse (--) La Bonne réponse est   => "+bon_resp

                }


            }else{

            }
        },

        getLettreSelection(val){

            switch (val){
                case 0:
                    return "A";
                    break;
                case 1:
                    return "B";
                    break;
                case 2:
                    return "C";
                    break;
                case 3:
                    return "D";
                    break;
                case 4:
                    return "E";
                    break;

            }
        },
        getQuiz() {

            if(this.index_rev === this.data_rev.length)
                this.index_rev = 0;

            this.single_choice = null;
            this.true_fasle = null;
            this.juste = null;
            this.loading = true;
            axios.post('/get_quiz', {id_quiz: this.data_rev[this.index_rev]}).then(response => {


                this.data_quiz = response.data.data_quiz;
                let propo = response.data.data_propo;

                if (this.data_quiz.type !== 1) {


                    let lettre = ["A", "B", "C", "D", "E",]
                    propo.forEach((item, index) => {
                        if (this.data_quiz.type !== 1) {
                            item.lettre = lettre[index];
                            item.id = index;
                            item.checked = false;
                            item.color = "primary"

                        }


                    });

                } else {
                    propo = [
                        {id: 0, proposition: "True", lettre: "A", color: "primary"},
                        {id: 1, proposition: "False", lettre: "B"},
                    ]
                }
                this.data_propo = propo;

                this.loading = false;

            }).catch(error => {


            });
        },
    },
}
</script>

<style scoped>

</style>
