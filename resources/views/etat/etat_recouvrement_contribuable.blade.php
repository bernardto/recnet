<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link href="css_js/font/css/material-icons.css" rel="stylesheet">
    <link
        href="css_js/animate.min.css"
        rel="stylesheet"
    />
    <title>@{{$message}}</title>
    <link href="css_js/vuetify.min.css" rel="stylesheet">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" name="viewport">
    <style>
        .font-class-name input, textarea {
            font-size: 28px;
        }

        .v-progress-circular {
            margin: 1rem;
        }
    </style>
</head>
<body>
<div id="app">
    <v-app>
        <div>

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
                                        Calories
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="item in desserts"
                                    :key="item.name"
                                >
                                    <td>@{{ item.name }}</td>
                                    <td>@{{ item.calories }}</td>
                                    <td>@{{ item.name }}</td>
                                    <td>@{{ item.calories }}</td>
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
                <v-col cols="2"><span class="text-md-h5" style="font-weight: bold">Le régisseur <br/> <span >TOTO LAGBEU BERNARD</span> </span></v-col>

            </v-row>



        </div>
    </v-app>
</div>

<script src="css_js/vue.js"></script>

<script src="css_js/vuetify.js"></script>
<script>


    new Vue({
        el: '#app',
        vuetify: new Vuetify(),

        mounted() {


        },

        methods: {


        },
        data: function () {
            return {
                desserts: [
                    {
                        name: 'Frozen Yogurt',
                        calories: 159,
                    },
                    {
                        name: 'Ice cream sandwich',
                        calories: 237,
                    },
                    {
                        name: 'Eclair',
                        calories: 262,
                    },
                    {
                        name: 'Cupcake',
                        calories: 305,
                    },
                    {
                        name: 'Gingerbread',
                        calories: 356,
                    },
                    {
                        name: 'Jelly bean',
                        calories: 375,
                    },
                    {
                        name: 'Lollipop',
                        calories: 392,
                    },
                    {
                        name: 'Honeycomb',
                        calories: 408,
                    },
                    {
                        name: 'Donut',
                        calories: 452,
                    },
                    {
                        name: 'KitKat',
                        calories: 518,
                    },
                ],
            }
        },

        watch : {

        }

    })
</script>


</body>
</html>

</script>

<style>
    .v-chip__content {
        font-size: 24px;
    }

    .v-select__slot .v-label {
        font-size: 24px;

    }

    #main_container {
        background-color: #FAFAFA;
    }

    .select-blanc .v-select__slot .v-label {
        font-size: 24px;

    }

    .hover_card:hover {
        background-color: #B3E5FC;
    }

    .large_label {
        font-size: x-large;
        font-weight: bold;
        color: black;

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
    .e1_classe{
        color: #0f9d58;
    }
    .e2_classe{
        color: #0f5de3;
    }
    .large_label_vert {
        font-size: x-large;
        font-weight: bold;
        color: green;

    }
    table {
        border:1px outset #b3adad;
        border-collapse:collapse;
        padding:5px;
    }
    table th {
        border:1px outset #b3adad;
        padding:5px;
        background: #f7f7f8;
        color: #313030;
    }
    table td {
        border:1px outset #b3adad;
        text-align:center;
        padding:5px;
        background: #ffffff;
        color: #313030;
    }
</style>
