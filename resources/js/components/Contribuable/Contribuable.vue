<template>
    <div>

        <v-overlay v-model="loading_data">
            <v-progress-circular

                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>


        <div v-if="!fiche">
            <v-skeleton-loader
                class="mx-auto"
                v-if="loading_data"
                type="card"
            ></v-skeleton-loader>


            <v-data-table
                :headers="headers"

                v-if="!loading_data"

                :search="search"
                :items="data_contribuable"
                v-on:click:row="doubleclickRow"
                :items-per-page="config.pagignate"
                sort-by="identifiant"
                hide-default-footer
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >


                        <v-btn
                            color="primary accent-4"
                            dark
                            outlined

                            :disabled="data_contribuable.length <= 0"
                            @click="imprimerListe"


                        >
                            <v-icon>mdi-printer-settings</v-icon>
                            Imprimer
                        </v-btn>

                        <v-divider
                            class="mx-4"
                            inset

                            vertical
                        ></v-divider>
                        <!--                    <span v-if="data_contribuable.length > 0"> {{total}} FCFA </span>-->


                        <v-btn
                            color="orange accent-4"
                            dark
                            width="100px"

                            @click="newItem"


                        >
                            <v-icon>mdi-plus</v-icon>
                            Ajouter
                        </v-btn>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <!--     v-on:change="changerEtat"
                       -->


                        <v-text-field
                            dense
                            hide-details
                            outlined
                            v-model="search"
                            class="mx-4"
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            label="Rechercher un contribuable"

                        />
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-select


                            item-text="lib"
                            v-model="value_main_tri"
                            :items="data_main_tri"
                            return-object
                            @change="updateTri"
                            dense
                            class="mt-3"
                            outlined
                            label="Trier par"
                        ></v-select>

                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>

                        <v-select
                            :items="data_option_tri"
                            v-model="value_option_tri"
                            outlined
                            return-object
                            @change="remplirTableContribuable"
                            dense
                            item-text="lib"
                            v-if="value_main_tri.id !== 1"
                            label="Options de tri"
                        ></v-select>


                        <v-btn
                            color="orange accent-4"
                            dark
                            fab
                            v-if="false"
                            fixed
                            right
                            @click="newItem"
                            small
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>

                        <v-dialog
                            v-model="dialog"
                            fullscreen


                        >

                            <v-card :loading="loadform">
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>

                                    <v-spacer></v-spacer>

                                    <v-btn
                                        class="ma-2"
                                        outlined
                                        fab
                                        small
                                        @click="dialog = false"
                                    >
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>


                                        <v-row>
                                            <v-col cols="4">


                                                <v-avatar
                                                    color="primary"
                                                    rounded
                                                    v-if="editedIndex === -1 && !ajout_activite"
                                                    class="mb-3"

                                                    size="128"
                                                ></v-avatar>


                                                <div v-else>

                                                    <div v-if="editedItem.photo === 'user' ">
                                                        <v-avatar
                                                            size="128px"
                                                            :color="editedItem.couleur"
                                                        >

                                                            <span
                                                                class="white--text headline">{{
                                                                    editedItem.nom[0] + '' + editedItem.nom[1]
                                                                }}</span>
                                                        </v-avatar>
                                                    </div>


                                                    <div v-else>
                                                        <v-avatar
                                                            size="128px"

                                                        >

                                                            <img
                                                                alt="Avatar"
                                                                :src="'/image/contribuable/'+editedItem.photo"
                                                            >

                                                        </v-avatar>
                                                    </div>

                                                </div>

                                                <!--  Vérifier si ce n'est pas null         -->
                                                <v-file-input
                                                    v-model="file"
                                                    show-size
                                                    truncate-length="15"
                                                    :disabled="loadform"
                                                    accept="image/png, image/jpeg, image/bmp"
                                                    :placeholder="editedIndex === -1 ?  'Ajouter' : 'Modifier'"
                                                    prepend-icon="mdi-camera"
                                                    :label="editedIndex === -1 ?  'Ajouter' : 'Modifier'"
                                                ></v-file-input>


                                                <!--
                                                                                            <v-btn
                                                                                                color="grey darken-4"
                                                                                                text
                                                                                                outlined
                                                                                                class="mt-2"
                                                                                                @click=""
                                                                                            >
                                                                                               <v-icon>mdi-pencil</v-icon> {{editedIndex === -1 ?  'Ajouter' : 'Modifier' }}

                                                                                            </v-btn>
                                                -->

                                            </v-col>


                                            <v-col cols="8">

                                                <v-expansion-panels
                                                    multiple
                                                    v-model="panel"
                                                >
                                                    <v-expansion-panel>
                                                        <v-expansion-panel-header>

                                                            <v-toolbar color="blue" dense>
                                                                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                                                                <v-toolbar-title>IDENTIFICATION</v-toolbar-title>

                                                            </v-toolbar>

                                                        </v-expansion-panel-header>
                                                        <v-expansion-panel-content>
                                                            <v-card :disabled="ajout_activite">
                                                                <v-col
                                                                    cols="12"
                                                                >
                                                                    <v-text-field
                                                                        label="Identifiant/Matricule"
                                                                        :disabled="loadform"

                                                                        v-model="editedItem.identifiant"
                                                                        :error-messages="editedItemTextError.identifiant"
                                                                        :error="editedItemBooleanError.identifiant"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>

                                                                <v-col
                                                                    cols="12"
                                                                >
                                                                    <v-text-field
                                                                        label="Nom"
                                                                        :disabled="loadform"
                                                                        v-model="editedItem.nom"
                                                                        :error-messages="editedItemTextError.nom"
                                                                        :error="editedItemBooleanError.nom"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>

                                                                <v-col
                                                                    cols="12"
                                                                >
                                                                    <v-text-field
                                                                        label="Prenom"
                                                                        v-model="editedItem.prenom"
                                                                        :disabled="loadform"
                                                                        :error-messages="editedItemTextError.prenom"
                                                                        :error="editedItemBooleanError.prenom"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>


                                                                <!--                                                <v-col  cols="12">

                                                                                                                    <v-select

                                                                                                                        v-model="value_comf"
                                                                                                                        :items="data_comf"
                                                                                                                        return-object
                                                                                                                        :disabled="loadform"
                                                                                                                        :error-messages="editedItemTextError.compf"
                                                                                                                        :error="editedItemBooleanError.compf"
                                                                                                                        item-text="lib"
                                                                                                                        solo
                                                                                                                        label="Choisir un compte fonctionnel"

                                                                                                                    ></v-select>

                                                                                                                </v-col>-->
                                                                <v-col cols="12">


                                                                    <v-radio-group
                                                                        :disabled="loadform" v-model="editedItem.genre"
                                                                        row>
                                                                        <v-radio color="orange accent-4" label="Homme"
                                                                                 value="H"></v-radio>
                                                                        <v-radio color="orange accent-4" label="Femme"
                                                                                 value="F"></v-radio>
                                                                    </v-radio-group>

                                                                </v-col>


                                                                <v-col cols="12">
                                                                    <v-menu
                                                                        ref="menu"
                                                                        v-model="menu2"
                                                                        :close-on-content-click="false"
                                                                        :disabled="loadform"
                                                                        :return-value.sync="editedItem.date_naissance"
                                                                        transition="scale-transition"
                                                                        offset-y
                                                                        min-width="290px"
                                                                    >
                                                                        <template v-slot:activator="{ on, attrs }">
                                                                            <v-text-field
                                                                                v-model="editedItem.date_naissance"
                                                                                label="Date de naissance"
                                                                                prepend-icon="mdi-calendar"
                                                                                readonly

                                                                                v-bind="attrs"
                                                                                v-on="on"
                                                                            ></v-text-field>
                                                                        </template>
                                                                        <v-date-picker
                                                                            v-model="editedItem.date_naissance"
                                                                            no-title

                                                                            :disabled="loadform"
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
                                                                                :disabled="loadform"
                                                                                color="primary"
                                                                                @click="$refs.menu.save(editedItem.date_naissance)"
                                                                            >
                                                                                OK
                                                                            </v-btn>
                                                                        </v-date-picker>
                                                                    </v-menu>
                                                                </v-col>


                                                                <v-col cols="12">
                                                                    <v-text-field
                                                                        label="Email"

                                                                        :disabled="loadform"
                                                                        v-model="editedItem.email"
                                                                        :error-messages="editedItemTextError.email"
                                                                        :error="editedItemBooleanError.email"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-text-field
                                                                        label="Nationalité"

                                                                        :disabled="loadform"
                                                                        v-model="editedItem.nationalite"
                                                                        :error-messages="editedItemTextError.nationalite"
                                                                        :error="editedItemBooleanError.nationalite"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>


                                                                <v-col cols="12">
                                                                    <v-text-field
                                                                        label="Numéro"
                                                                        v-model="editedItem.numero"

                                                                        :disabled="loadform"
                                                                        :error-messages="editedItemTextError.numero"
                                                                        :error="editedItemBooleanError.numero"
                                                                        required
                                                                    ></v-text-field>


                                                                </v-col>

                                                                <v-col cols="12">
                                                                    <v-text-field
                                                                        label="Numéro de la carte d'identité "
                                                                        v-model="editedItem.num_cni"

                                                                        :disabled="loadform"
                                                                        :error-messages="editedItemTextError.num_cni"
                                                                        :error="editedItemBooleanError.num_cni"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>


                                                                <v-col cols="12" v-if="editedIndex < 0">

                                                                </v-col>

                                                            </v-card>
                                                        </v-expansion-panel-content>
                                                    </v-expansion-panel>

                                                    <v-expansion-panel>
                                                        <v-expansion-panel-header>
                                                            <v-toolbar color="orange" dense>
                                                                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                                                                <v-toolbar-title>ACTIVITE</v-toolbar-title>

                                                            </v-toolbar>

                                                        </v-expansion-panel-header>
                                                        <v-expansion-panel-content>
                                                            <v-row>


                                                                <v-col
                                                                    cols="12"
                                                                >
                                                                    <v-text-field
                                                                        label="Nom de l'activité"
                                                                        :disabled="loadform"
                                                                        v-model="editedItem.nom_act"
                                                                        :error-messages="editedItemTextError.nom_act"
                                                                        :error="editedItemBooleanError.nom_act"


                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>


                                                                <v-col
                                                                    cols="12"
                                                                >
                                                                    <v-textarea
                                                                        label="Description de l'activité"
                                                                        hint="Description de l'activité"
                                                                        :disabled="loadform"
                                                                        solo
                                                                        counter

                                                                        v-model="editedItem.desc_act"
                                                                        :error-messages="editedItemTextError.desc_act"
                                                                        :error="editedItemBooleanError.desc_act"
                                                                        required
                                                                    ></v-textarea>
                                                                </v-col>


                                                                <v-col
                                                                    cols="12"
                                                                >
                                                                    <v-text-field
                                                                        label="Adresse de l'activité"
                                                                        :disabled="loadform"
                                                                        v-model="editedItem.adress_act"
                                                                        :error-messages="editedItemTextError.adress_act"
                                                                        :error="editedItemBooleanError.adress_act"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>

                                                                <v-select

                                                                    v-model="value_quartier"
                                                                    :items="data_quartier"
                                                                    return-object
                                                                    color="primary"
                                                                    :disabled="loadform"
                                                                    :error="editedItemBooleanError.quartier"
                                                                    :error-messages="editedItemTextError.quartier"
                                                                    item-text="lib"
                                                                    @change="onChangeQuartier"

                                                                    item-color="primary"
                                                                    label="Quartier de l'activité"

                                                                ></v-select>


                                                            </v-row>
                                                        </v-expansion-panel-content>
                                                    </v-expansion-panel>


                                                    <v-expansion-panel>
                                                        <v-expansion-panel-header>
                                                            <v-toolbar color="red" dense>
                                                                <v-app-bar-nav-icon></v-app-bar-nav-icon>

                                                                <v-toolbar-title>TAXE</v-toolbar-title>

                                                            </v-toolbar>

                                                        </v-expansion-panel-header>
                                                        <v-expansion-panel-content>

                                                            <v-col cols="12">
                                                                <v-select

                                                                    v-model="value_compteB"
                                                                    :items="data_compteB"
                                                                    :readonly="editedIndex > -1"
                                                                    return-object
                                                                    color="primary"
                                                                    :disabled="loadform || load_taxe"
                                                                    :error="editedItemBooleanError.compteB"
                                                                    :error-messages="editedItemTextError.compteB"
                                                                    item-text="lib"
                                                                    @change="onChangeCompteBud"
                                                                    hint="N° Compte de la taxe"
                                                                    item-color="primary"
                                                                    label="N° Compte de la taxe"

                                                                ></v-select>
                                                            </v-col>
                                                            <v-col cols="12" v-if="value_compteB.id && !load_taxe">
                                                                <v-select

                                                                    v-model="value_NtTaxe"
                                                                    :items="data_NtTaxe"
                                                                    return-object
                                                                    color="primary"
                                                                    :readonly="editedIndex > -1"
                                                                    :disabled="loadform"
                                                                    :error="editedItemBooleanError.NtTaxe"
                                                                    :error-messages="editedItemTextError.NtTaxe"
                                                                    item-text="lib"
                                                                    @change="onChangeNatureTaxe"
                                                                    hint="Nature de la taxe"
                                                                    item-color="primary"
                                                                    label="Nature de la taxe"

                                                                ></v-select>

                                                            </v-col>


                                                            <v-row>
                                                                <v-col
                                                                    v-if="value_NtTaxe.id_cp_bd"
                                                                    cols="6"
                                                                >
                                                                    <v-text-field
                                                                        :label="`Nombre : ${value_NtTaxe.assiete}`"
                                                                        :disabled="loadform"
                                                                        type="number"
                                                                        v-model="editedItem.nb_ass"
                                                                        :error-messages="editedItemTextError.nb_ass"
                                                                        :error="editedItemBooleanError.nb_ass"
                                                                        required
                                                                    ></v-text-field>
                                                                </v-col>


                                                                <v-col
                                                                    v-if="value_NtTaxe.id_cp_bd && !editedItemBooleanError.nb_ass"
                                                                    cols="6"
                                                                >
                                                                    <v-text-field
                                                                        readonly
                                                                        type="number"
                                                                        label="Montant à payer (calculé) FCFA"
                                                                        v-model="editedItem.montant_cal"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>

                                                            <v-row>
                                                                <v-col cols="6" v-if="value_NtTaxe.id_cp_bd">

                                                                    <h2 class="text-decoration-underline">
                                                                        Périodicité
                                                                    </h2>

                                                                </v-col>


                                                                <v-col cols="6" v-if="value_NtTaxe.id_cp_bd">

                                                                    <v-chip
                                                                        class="ma-2"
                                                                        color="red"
                                                                        label
                                                                        text-color="white"
                                                                    >
                                                                        <v-icon left>
                                                                            mdi-label
                                                                        </v-icon>
                                                                        {{ editedItem.periodicite }}
                                                                    </v-chip>

                                                                </v-col>
                                                                <v-col v-if="error" cols="12">
                                                                    <div class="red darken-2 text-center">
                                                                        <span
                                                                            class="white--text">{{ text_error }}</span>
                                                                    </div>
                                                                </v-col>
                                                            </v-row>


                                                        </v-expansion-panel-content>

                                                    </v-expansion-panel>

                                                </v-expansion-panels>
                                                <v-row class="mt-6" v-if="editedIndex > -1">

                                                    <v-btn
                                                        color="orange accent-4"
                                                        dark
                                                        outlined
                                                        @click="ajouterActiviteGet"
                                                        v-if="!ajout_activite"
                                                        class="mb-2"


                                                    >
                                                        <v-icon>mdi-plus</v-icon>
                                                        Ajouter une activité
                                                    </v-btn>

                                                </v-row>

                                            </v-col>


                                        </v-row>


                                    </v-container>

                                </v-card-text>


                                <v-card-actions>
                                    <v-row class="mb-5">
                                        <v-col cols="6"></v-col>


                                        <v-col cols="5" v-if="!ajout_activite">
                                            <v-btn
                                                color="grey accent-1"

                                                :disabled="loadform"
                                                @click="close"
                                            >
                                                <v-icon>mdi-cancel</v-icon>
                                                Annuler
                                            </v-btn>
                                            <v-btn
                                                color="blue"
                                                v-if="value_NtTaxe.id_cp_bd && editedItem.nb_ass > 0"

                                                :loading="loadform"
                                                @click="envoyerDonnee"
                                            >
                                                <v-icon>mdi-send</v-icon>
                                                {{ editedIndex > -1 ? 'Modifier' : 'Ajouter' }}
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="5" v-if="ajout_activite">
                                            <v-btn
                                                color="grey accent-1"

                                                :disabled="loadform"
                                                @click="close"
                                            >
                                                <v-icon>mdi-cancel</v-icon>
                                                Annuler
                                            </v-btn>
                                            <v-btn
                                                color="primary"
                                                v-if="value_NtTaxe.id_cp_bd && editedItem.nb_ass > 0"
                                                :loading="loadform"
                                                @click="envoyerDonnee"
                                            >
                                                <v-icon>mdi-send</v-icon>
                                                AJOUTER l'ACTIVITE
                                            </v-btn>

                                        </v-col>


                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline">Voulez-vous vraiment supprimer?</v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="closeDelete">Sortir</v-btn>
                                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                    </v-toolbar>
                </template>


                <!--
                                <template v-slot:item.select="{ item }">

                                    <v-simple-checkbox
                                        v-model="item.select"
                                        v-context-menu="'cm-for-list-item'"
                                        @click="selectItem(item)"

                                    ></v-simple-checkbox>

                                </template>
                -->


                <template v-slot:item.photo="{ item }">


                    <div v-if="item.photo === 'user' ">
                        <v-avatar
                            size="36px"
                            :color="item.couleur"
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
                                :src="'/image/contribuable/'+item.photo"
                            >

                        </v-avatar>
                    </div>


                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="clickRow(item)"
                    >
                        mdi-pencil
                    </v-icon>
                </template>


                <template v-slot:no-data>
                    <p class="subtitle-1">Aucune donnée disponible</p>
                </template>

            </v-data-table>

            <v-row justify="center" v-if="dernier_page > 1">
                <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                            v-model="page"
                            class="my-4"
                            :total-visible="8"
                            @input="remplirTableContribuable()"
                            :length="dernier_page"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-dialog
                    v-model="dialog_options"
                    persistent
                    max-width="450"
                >
                    <v-card>
                        <v-card-title class="headline">
                            Que voulez-vous faire
                        </v-card-title>
                        <v-card-text>


                            <v-row>
                                <v-col cols="4">
                                    <v-btn

                                        color="primary"
                                        dark
                                        @click="editItem"
                                    >
                                        Modifier
                                        <v-icon
                                            dark
                                            right
                                        >
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                                <!--                                <v-btn
                                                                    class="ma-2"
                                                                    color="red"
                                                                    v-show="false"
                                                                    dark
                                                                    @click="deleteItem"
                                                                >
                                                                    Supprimer
                                                                    <v-icon
                                                                        dark
                                                                        right
                                                                    >
                                                                        mdi-delete
                                                                    </v-icon>
                                                                </v-btn>-->
                                <v-col cols="4">
                                    <v-btn

                                        color="orange accent-4"
                                        dark
                                        @click="fiche = !fiche"
                                    >
                                        <v-icon
                                            dark
                                            left
                                        >
                                            fa-th
                                        </v-icon>
                                        Voir la Fiche
                                    </v-btn>
                                </v-col>


                            </v-row>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>


                            <v-btn
                                outlined
                                @click="dialog_options = false"
                            >
                                Sortir

                            </v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-row>


            <v-btn
                bottom
                color="orange accent-4"
                dark
                fab
                fixed
                right
                @click="newItem"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <!--        <v-btn
                        bottom
                        dark
                        fab
                        v-if="data_contribuable.length > 0"
                        fixed
                        left
                        @click="dialog_cause =  !dialog_cause "
                    >
                        <v-icon>mdi-send</v-icon>

                    </v-btn>-->

        </div>


        <!--        DIALOG SUCCESS-->

        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog_success"
                    persistent
                    transition="dialog-bottom-transition"
                    max-width="450"
                >

                    <v-card>
                        <v-card-title class="text-h5">

                        </v-card-title>
                        <v-card-text>

                            <p class="text-sm-body-1">
                                {{
                                    editedIndex < 0 ? 'Le contribuable a été ajouté.' : 'le contribuable a été modifié.'
                                }}</p>
                            <v-row v-if="editedIndex < 0">
                                <v-col cols="4">

                                    <div v-if="editedItem.photo === 'user' ">
                                        <v-avatar size="128px" :color="editedItem.couleur">

                                                            <span
                                                                class="white--text headline">{{
                                                                    editedItem.nom[0] + '' + editedItem.nom[1]
                                                                }}</span>
                                        </v-avatar>
                                    </div>
                                    <div v-else>

                                        <v-avatar
                                            size="128px"
                                            tile

                                        >

                                            <img
                                                alt="Avatar"
                                                :src="'/image/contribuable/'+editedItem.photo"
                                            >

                                        </v-avatar>
                                    </div>
                                </v-col>

                                <v-col cols="8">
                                    <v-row style="margin-left: 5px">
                                        <v-col cols="6">
                                            <p class="h3 text-decoration-underline">
                                                N° de compte :
                                            </p>
                                        </v-col>

                                        <v-col cols="4">
                                            <span
                                                class="font-weight-bold">{{
                                                    editedItem.compteContribuable.n_compte
                                                }}</span>
                                        </v-col>


                                    </v-row>


                                    <v-row style="margin-left: 5px">
                                        <v-col cols="6">
                                            <p class="h3 text-decoration-underline">
                                                Identifiant :
                                            </p>
                                        </v-col>

                                        <v-col cols="4">
                                            <span class="font-weight-bold">{{ editedItem.identifiant }}</span>
                                        </v-col>


                                    </v-row>

                                </v-col>

                            </v-row>

                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="green darken-1"
                                text
                                @click="register(editedIndex < 0 ?  0 : 1)"
                            >
                                Terminer
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>


        <v-dialog persistent v-model="dailog_activite_ajoute" max-width="400px">
            <v-card>
                <v-card-title class="text-h5">L'activité a été ajoutée.</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="blue darken-1" text @click="register(1)">OK</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <!--        DIALOG CHOISIR ACTIVITE-->


        <template>
            <v-row justify="center">
                <v-dialog
                    v-model="dialog_choisir_activite"
                    scrollable
                    max-width="300px"
                >

                    <v-card>
                        <v-card-title>Choisir l'activité</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 300px;">
                            <v-radio-group
                                v-model="choix_activite"
                                mandatory
                                column
                            >
                                <v-radio
                                    v-for="(item, i) in editedItem.activite"
                                    :key="i"
                                    :label="item.lib"
                                    :value="i"
                                ></v-radio>
                            </v-radio-group>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="dialog_choisir_activite = false"
                            >
                                Sortir
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                text
                                @click="modifierContribuable"
                            >
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>

        <div v-if="fiche">
            <FicheContribuable v-bind:item="editedItem"/>
        </div>

        <context-menu ref="cm-for-list-item" v-show="enable_cm" @opened="cmIsOpened" @closed="cmIsClosed">


            <v-btn
                v-for="(item, i) in itemsContext"
                :key="i"

                color="orange accent-4"
                dark
                @click="clickContextMenu(item)"

                class="mb-2 mt-2"
            >


                <v-icon>{{ item.icon }}</v-icon>
                {{ item.text }}


            </v-btn>


        </context-menu>
    </div>
</template>

<script>
import FicheContribuable from "./FicheContribuable";

export default {
    components: {FicheContribuable},

    mounted() {



        this.$root.$emit('TITRE', "GESTION DES CONTRIBUABLES");
        this.$root.$on('close_fiche', data => {
            this.fiche = !this.fiche;
            this.dialog_options = false;
        });

        this.$root.$on('update_activite', data => {
            this.data_contribuable[this.editedIndex].activite[data.index] = data.data;

        });
        this.getDataQuartier();
        this.getDataZone();


        this.remplirTableContribuable();
        this.getDataCreInit();
    },

    data: () => ({
        dialog: false,
        loading_data: true,
        click: undefined,
        dialog_options: false,
        page: 1,

        dernier_page: 1,
        memoire_index: 0,
        choix_contribuable: 0,
        itemsContext: [
            {text: 'Affecter', icon: 'mdi-send', id: 1,},
            {text: 'Autre', icon: 'mdi-menu', id: 2,},
        ],
        offset: true,
        dialogDelete: false,
        dialog_termine: false,
        dialog_success: false,
        dialog_choisir_activite: false,
        dailog_activite_ajoute: false,
        choix_activite: 0,

        lien_site: location.protocol + '//' + location.host,
        loadform: false,
        load_taxe: false,
        max_width_dialog: 390,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        data_main_tri: [
            {
                id: 1,
                lib: "Tous les résultats"
            },
            {
                id: 2,
                lib: "Quartier"
            },
            {
                id: 3,
                lib: "Zone"
            },
            {
                id: 4,
                lib: "Taxe"
            },

        ],
        value_main_tri: {
            id: 1,
            lib: "Tout"
        },


        data_option_tri: [],
        value_option_tri: {},

        data_quartier_tri: [],
        data_zone: [],


        total: 0,
        headers: [


            {
                text: 'Photo',
                align: 'start',
                sortable: false,
                value: 'photo',
            },
            {
                text: 'Identifiant',
                align: 'start',
                value: 'identifiant',
            },
            {text: 'Nom', value: 'nom'},
            {text: 'Genre', value: 'genre'},
            {text: 'Numéro', value: 'numero', sortable: false},
            {text: 'Actions', value: 'actions', sortable: false},
            /*{ text: 'Quartier/Zone', value: 'affectation' },*/
            /*{ text: 'Selection', value: 'select',  },*/
        ],
        data_contribuable: [],
        editedIndex: -1,
        color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
        editedItem: {
            activite: [],
            compteContribuable: {id: 24, solde: "0", n_compte: "1458147", id_ct: 31},
            date_pay: "05-12-2021",
            id_act: 12,
            id_ct: 31,
            photo: "31_CT_.jpg",
            nom: 'TOTO',
            prenom: 'BERNARD',
            nationalite: '',
            genre: 'F',
            date_naissance: new Date().toISOString().substr(0, 10),
            email: 'totobernard09@gmail.com',
            numero: '+2257803638',
            identifiant: '747488',
            num_cni: '123456788888',
            nom_act: "VENTE DE JOURNAUX",
            desc_act: "C'est un commerçant qui vend les journeaux au marché",
            adress_act: "ASSABOU 512",
            nb_ass: 1,
            montant_cal: "",
            periodicite: "Mensuelle",


        },
        defaultEditedItem: {
            compteContribuable: "",
            date_pay: "",
            id_act: 0,
            id_ct: 0,

            photo: "",
            nom: '',
            prenom: '',
            nationalite: '',
            genre: 'H',
            date_naissance: new Date().toISOString().substr(0, 10),
            email: '',
            numero: '',
            identifiant: '',
            num_cni: '',
            nom_act: "",
            desc_act: "",
            adress_act: "",
            nb_ass: 1,
            montant_cal: "",
            periodicite: "",

        },
        editedItemTextError: {

            nom: '',
            prenom: '',
            nationalite: "",
            genre: '',
            compf: '',
            photo: '',
            date_naissance: '',
            email: '',
            numero: '',

            file_photo: '',
            num_cni: '',
            identifiant: '',
            nom_act: "",
            desc_act: "",
            adress_act: "",
            quartier: "",
            compteB: "",
            NtTaxe: "",
            nb_ass: "",
        },
        editedItemBooleanError: {

            nom: false,
            prenom: false,
            genre: false,
            compf: false,
            date_naissance: false,
            email: false,
            photo: false,
            numero: false,
            num_cni: false,
            file_photo: false,
            identifiant: false,
            nom_act: false,
            desc_act: false,
            adress_act: false,
            quartier: false,
            NtTaxe: false,
            nb_ass: false,


        },


        file: null,
        ajout_activite: false,
        menu2: false,
        niveau_load: 0,
        error: true,
        text_error: '',
        search : "",
        enable_cm: false,
        searchData: '',
        fiche: false,
        context_menu_open: false,
        date_naissance: new Date().toISOString().substr(0, 10),


        send_data: false,
        time: false,
        label_assiete: "Nombre :",
        text_termine: "Le contribuable a été ajouté.",
        panel: [0, 1, 2],
        value_periode: [],
        data_NtTaxe: [],
        value_NtTaxe: {},

        data_compteB: [],
        value_compteB: {},


        data_quartier: [],
        value_quartier: {},
    }),

    props : {
        config: {},
        item : {},
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Ajouter un contribuable' : 'Modifier un contribuable'
        },
    },

    watch: {


        dialog(val) {

            if (!val) {
                if (this.editedIndex > -1) {

                    this.value_compteB = {};
                    this.value_NtTaxe = {};

                    this.data_compteB.shift();
                    this.data_quartier.shift();
                    this.data_NtTaxe.shift();
                    this.editedIndex = -1;
                    Object.assign(this.editedItem, this.defaultEditedItem);
                    this.close();
                } else {


                }
            }
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        searchData(val) {
            this.rechercherContribuable();
        },
        'editedItem.nb_ass': {
            handler: function (after, before) {


                if (after && after.length > 0)
                    this.calculerMontant(after);
                else {

                    this.editedItemBooleanError.nb_ass = true;
                    this.editedItemTextError.nb_ass = "Ce champ est obligatoire";
                }


            },
        }, deep: true,
    },


    created() {
        //   this.initialize()
    },

    methods: {

        getDataZone() {

            axios.post('/get_tout_zone').then(response => {


                this.data_zone = response.data.data;


            }).catch(error => {


            });

        },
        getDataQuartier() {

            axios.post('/get_tout_quartier_aff').then(response => {


                this.data_quartier_tri = response.data.data;


            }).catch(error => {


            });

        },
        updateTri() {
            this.value_option_tri = {};
            this.data_option_tri = [];
            this.data_contribuable = [];
            this.dernier_page = 1;


            switch (this.value_main_tri.id) {

                case 1: //TOUS RESULTATS
                    this.data_option_tri = [];
                    this.value_option_tri = {id: 0};
                    this.remplirTableContribuable();
                    break;
                case 2: //QUARTIER
                    this.data_option_tri = this.data_quartier_tri;
                    break;
                case 3://ZONE
                    this.data_option_tri = this.data_zone;
                    break;
                case 4://TAXE
                    this.data_option_tri = this.data_compteB;
                    break;

            }
        },
        imprimerListe() {

            this.loading_data = true;


            //window.open("/contribuable_liste?id="+JSON.stringify(this.data_contribuable.map(a => a.id)), "_blank");

            let valeur_tri = 0;
            let titre_impression = "LISTE DES CONTRIBUABLES DE LA MAIRIE DE YAMOUSSOUKRO";
            if (this.value_main_tri.id === 2) {
                valeur_tri = this.value_option_tri.id_qt;
                titre_impression = "LISTE DES CONTRIBUABLES DE LA MAIRIE DE YAMOUSSOUKRO DU QUARTIER : "+this.value_option_tri.lib.toUpperCase();
            } else if (this.value_main_tri.id === 3) {
                valeur_tri = this.value_option_tri.id_zn;
                titre_impression = "LISTE DES CONTRIBUABLES DE LA MAIRIE DE YAMOUSSOUKRO DE LA ZONE : "+this.value_option_tri.lib.toUpperCase();
            } else if(this.value_main_tri.id === 4) {

                valeur_tri = this.value_option_tri.id;
                titre_impression = "LISTE DES CONTRIBUABLES DE LA MAIRIE DE YAMOUSSOUKRO POUR LA TAXE : "+this.value_option_tri.lib.toUpperCase();

            }


            axios
                .post("/contribuable_liste", {
                    responseType: 'blob',
                    Accept: 'application/pdf',
                    titre_impr : titre_impression,
                    trier_par: this.value_main_tri.id, val_tri: valeur_tri
                })
                .then((response) => {


                    const url = window.URL.createObjectURL(new Blob([response.data.data], {type: 'application/pdf'}));
                    const link = document.createElement('a');
                    console.log(link);
                    link.href = url;
                    link.setAttribute('download', 'staffs.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading_data = false;
                });


        },
        ajouterActiviteGet() {

            clearTimeout(this.time);
            this.memoire_index = this.editedIndex;
            this.editedIndex = -1;
            this.panel = [1, 2];
            this.ajout_activite = true;
            this.editedItem.desc_act = "";
            this.editedItem.nom_act = "";
            this.editedItem.adress_act = "";
            this.value_quartier = {};
            this.value_quartier = this.data_quartier[0];
            this.value_compteB = {};
            this.value_NtTaxe = {};
            // this.editedItem.nb_ass = 1;
            this.editedItem.montant_cal = "";


        },
        getDataCreInit() {

            axios.post('get_data_creation_contribuable').then(response => {

                this.data_compteB = response.data.compteB;
                this.data_quartier = response.data.quartier;

                this.value_quartier = this.data_quartier[0];
                this.value_periode = response.data.periode;
                this.editedItem.identifiant = response.data.matricule;


            }).catch(error => {

            });
        },

        onChangeCompteBud() {

            this.load_taxe = true;
            this.value_NtTaxe = [];


            axios.post('get_data_du_compteb', {id_cb: this.value_compteB.id}).then(response => {

                this.data_NtTaxe = response.data.taxe;


                this.load_taxe = false;

            }).catch(error => {

            });

        },

        onChangeQuartier() {
        },

        onChangeNatureTaxe() {
            this.editedItem.nb_ass = "";
            this.editedItemBooleanError.nb_ass = false;
            this.editedItem.periodicite = this.value_periode[this.value_NtTaxe.id_prd].lib;
            this.calculerMontant("");

        },

        remplirTableContribuable() {

            let valeur_tri = 0;
            if (this.value_main_tri.id === 2)
                valeur_tri = this.value_option_tri.id_qt;
            else if (this.value_main_tri.id === 3)
                valeur_tri = this.value_option_tri.id_zn;
            else
                valeur_tri = this.value_option_tri.id;


            this.loading_data = true;
            axios.post('/get_liste_contribuable?page=' + this.page, {
                trier_par: this.value_main_tri.id,
                val_tri: valeur_tri
            }).then(response => {


                this.data_contribuable = [];
                let data = response.data.data.data;
                this.dernier_page = response.data.data.last_page;
                data.forEach((item, index) => {

                    //Couleur photo

                    item.nom = item.nom + ' ' + item.prenom

                    item.select = false;
                    if (item.photo === 'user') {

                        item.couleur = this.color_array[this.getRandomInt(5)]
                    }


                    this.data_contribuable.push(item);

                    //Sexe
                    if (item.genre === 'H') {
                        this.data_contribuable[index].genre = 'HOMME'
                    } else {
                        this.data_contribuable[index].genre = 'FEMME';
                    }

                });


                this.loading_data = false;

            }).catch(error => {


            });

        },

        calculerMontant(val) {


            if (val.length > 0 && !Number.isInteger(val)) {

                this.editedItemBooleanError.nb_ass = false;
                this.editedItemTextError.nb_ass = "";
                /**
                 * On Vérifie le type de taxe en % ou en FRCFA 0 = f & 1 =  %
                 *
                 * */

                //FRCFA
                if (this.value_NtTaxe.taux_cfa_prt === 1) {

                    let a = this.value_NtTaxe.prix * parseInt(val);
                    a = a + "";


                    this.editedItem.montant_cal = a;
                    /*
                    let montant = parseInt(this.value_NtTaxe.prix *  this.editedItem.nb_ass);

                    this.editedItem.montant_cal =  montant+"";*/
                }
                //en pourcentage
                else {

                    let a = this.value_NtTaxe.prix * parseInt(val) / 100;
                    a = a + "";


                    this.editedItem.montant_cal = a;
                }


            } else {

                this.editedItemBooleanError.nb_ass = true;
                this.editedItemTextError.nb_ass = "Ce champ est obligatoire";
                //this.activerErreur(this.editedItemBooleanError.nb_ass, this.editedItemTextError.nb_ass);
            }


        },

        verifierEntrer($val) {


            if (this.editedItem.nb_ass >= 2 && this.value_NtTaxe.taux_cfa_prt === 0)
                $val.preventDefault();

        },
        envoyerDonnee() {


            let formData = new FormData();
            this.loadform = true;
            let o = 0;

            if (this.file) {

                /// for (let file of this.file) {

                if (this.file.size < 2000000) {
                    formData.append("fichier", this.file, this.file.name);
                    o++;
                } else {
                    this.text_error = "La taille de la photo est supérieure à 2MB";
                    this.loadform = false;
                    this.error = true;
                    return;
                }

                //}
            }
            //console.log(o);

            formData.append("nb_photo", o);

            var configg = {
                onUploadProgress: progressEvent => {
                    let percen = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.niveau_load = percen;
                }
            };


            let url = "/ajout_contribuable";
            if (this.editedIndex > -1) {
                url = "/modifier_contribuable";


                this.editedItem.up_email = this.data_contribuable[this.editedIndex].email !== this.editedItem.email;
                this.editedItem.up_identifiant = this.data_contribuable[this.editedIndex].identifiant !== this.editedItem.identifiant;
                this.editedItem.id = this.data_contribuable[this.editedIndex].id;
                this.editedItem.id_act = this.editedItem.activite[0].id_act;

            }

            if (this.ajout_activite) {
                url = "ajout_activite";
            }

            this.editedItem.id_qt = this.value_quartier.id_qt;
            this.editedItem.id_taxe = this.value_NtTaxe.id_tax;
            this.editedItem.id_contribuable = this.editedItem.activite[this.choix_activite].id_ct;


            formData.append("data", JSON.stringify(this.editedItem));

            axios.post(url, formData, configg)
                .then(response => {

                    if (response.data.success) {

                        if (this.editedIndex < 0) {

                            if (this.ajout_activite) {

                                this.loadform = false;
                                this.editedItem.activite.push(response.data.activite);
                                this.dailog_activite_ajoute = true;

                            } else {

                                this.editedItem.compteContribuable = response.data.compteContribuable;
                                this.editedItem.identifiant = response.data.identifiant;
                                this.editedItem.photo = response.data.photo;
                                this.loadform = false;
                                this.dialog_success = true;

                            }


                        } else {

                            this.loadform = false;
                            if (this.file) {
                                this.editedItem.photo = response.data.photo;

                            }
                            this.dialog_success = true;


                        }
                    } else {
                        this.loadform = false;
                        let er = response.data.errors;

                        // console.log(er);
                        this.text_error = "(*) Veuillez corriger les erreurs.";

                        this.error = true;

                        this.traitementAffichageErreur(er);


                    }

                })
                .catch(error => {

                    // handle error

                })
                .then(function () {
                    // always executed
                })
        },
        register(val) {


            //Modification
            if (val === 1) {
                this.editedItem.genre = this.editedItem.genre === 'F' ? 'FEMME' : 'HOMME';

                this.editedItem.nom = this.editedItem.nom + ' ' + this.editedItem.prenom;

                if (!this.ajout_activite)
                    Object.assign(this.data_contribuable[this.editedIndex], this.editedItem)
                else
                    Object.assign(this.data_contribuable[this.memoire_index], this.editedItem)
                //Object.assign(this.reponse.data[this.editedIndex], this.editedItem)

                this.dailog_activite_ajoute = false;
            } else {
                //this.reponse.data.push(this.editedItem);
                this.data_contribuable.push(this.editedItem);
                Object.assign(this.editedItem, this.defaultEditedItem);
            }

            this.dialog_success = false;
            this.close()

        },
        ///------------------------------------------------------------------------------------------------------------------------------
        rechercherContribuable() {


        },
        newItem() {


            this.panel = [0, 1, 2];
            Object.assign(this.editedItem, this.defaultEditedItem);

            this.editedIndex = -1;
            this.value_quartier = {};
            this.value_compteB = {};
            this.value_NtTaxe = {};
            this.editedItem.nb_ass = "";
            this.editedItem.montant_cal = "";
            this.value_quartier = this.data_quartier[0];

            this.dialog = true;

            this.getMatricule();
        },


        initialize() {
            this.data_contribuable = []
        },
        clickRow(item) {

            this.editedIndex = this.data_contribuable.indexOf(item)

            this.editedItem.nom = item.nom.split(" ")[0];
            this.editedItem.photo = item.photo;
            this.editedItem.activite = item.activite;
            this.editedItem.couleur = item.couleur;

            this.editedItem.prenom = item.prenom;
            this.editedItem.genre = item.genre[0];

            this.editedItem.date_naissance = item.date_nai;
            this.editedItem.numero = item.numero;
            this.editedItem.num_cni = item.num_cni;

            this.editedItem.email = item.email;
            this.editedItem.identifiant = item.identifiant;
            this.editedItem.nationalite = item.nationalite;

            this.dialog_options = true;


        },

        doubleclickRow(item) {


            return new Promise((resolve, reject) => {
                if (this.click) {
                    clearTimeout(this.click)

                    this.editedIndex = this.data_contribuable.indexOf(item)

                    this.editedItem.nom = item.nom.split(" ")[0];
                    this.editedItem.photo = item.photo;
                    this.editedItem.activite = item.activite;
                    this.editedItem.couleur = item.couleur;

                    this.editedItem.prenom = item.prenom;
                    this.editedItem.genre = item.genre[0];

                    this.editedItem.date_naissance = item.date_nai;
                    this.editedItem.numero = item.numero;
                    this.editedItem.num_cni = item.num_cni;

                    this.editedItem.email = item.email;
                    this.editedItem.identifiant = item.identifiant;
                    this.editedItem.nationalite = item.nationalite;

                    this.dialog_options = true;

                }
                this.click = setTimeout(() => {
                    this.click = undefined

                }, 200)
            })


        },


        modifierContribuable() {

            this.panel = [];
            this.loading_data = true;
            this.dialog_choisir_activite = false;

            //Mise à jours de l'activité.

            this.editedItem.nom_act = this.data_contribuable[this.editedIndex].activite[this.choix_activite].lib;

            this.editedItem.desc_act = this.data_contribuable[this.editedIndex].activite[this.choix_activite].descr_act;


            this.editedItem.adress_act = this.data_contribuable[this.editedIndex].activite[this.choix_activite].adresse;

            this.getNomQuartierTaxeDeActivite(this.data_contribuable[this.editedIndex].activite[this.choix_activite].info_act);

            this.editedItem.nb_ass = this.data_contribuable[this.editedIndex].activite[this.choix_activite].nb_assiete;

            this.editedItem.montant_cal = this.data_contribuable[this.editedIndex].activite[this.choix_activite].montant_cal;


            this.loading_data = false;

            var update = () => {
                this.editedItemBooleanError.nb_ass = false;
                this.editedItemTextError.nb_ass = "";
                this.time = setTimeout(update, 1000);
            };
            update();


            this.dialog = true;


        },
        getNomQuartierTaxeDeActivite(data) {


            this.data_quartier.unshift({
                id_qt: this.data_contribuable[this.editedIndex].activite[this.choix_activite].id_qt,
                lib: data.lib_qt,
            });
            this.value_quartier = this.data_quartier[0];
            this.data_compteB.unshift({id: data.taxe.id_cp_bd, lib: data.lib_compte});
            this.value_compteB = this.data_compteB[0];
            this.data_NtTaxe.unshift(data.taxe);
            this.value_NtTaxe = this.data_NtTaxe[0];
            this.editedItem.periodicite = this.value_periode[data.taxe.id_prd].lib;

        },
        editItem() {


            this.dialog_options = false;
            if (this.editedItem.activite.length > 1)
                this.dialog_choisir_activite = true;
            else
                this.modifierContribuable();

        },

        deleteItem() {
            this.dialog_options = false;
            this.dialogDelete = true
        },


        getMatricule() {

            axios.post('/get_matricule').then(response => {

                this.editedItem.identifiant = response.data.matricule;

            }).catch(error => {


            });
        },

        clickContextMenu(item) {

            if (item.id === 1) {

                this.$router.push({path: '/aff_contribuable', query: {user: JSON.stringify(this.itemSelect)}});

            } else {

                this.dialog_options = true;
            }
        },
        deleteItemConfirm() {
            // console.log(this.data_contribuable[this.editedIndex].total);
            this.total -= this.data_contribuable[this.editedIndex].total;
            this.data_contribuable.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        traitementAffichageErreur(er) {


            let j = 0;
            Object.keys(this.editedItemTextError).forEach(cle_O => {
                j = 0;
                Object.keys(er).forEach(cle_E => {
                    if (cle_O === cle_E) {
                        this.editedItemBooleanError[cle_O] = true;
                        this.editedItemTextError[cle_O] = er[cle_E];
                        j++;
                        return;
                    }


                });

                if (j === 0) {
                    this.editedItemBooleanError[cle_O] = false;
                    this.editedItemTextError[cle_O] = '';
                }


            });
        },

        getRandomInt(max) {

            return Math.floor(Math.random() * Math.floor(max));


        },

        cmIsOpened(cm) {
            this.context_menu_open = true;
        },

        cmIsClosed(cm) {

            this.context_menu_open = false;
        },
        close() {
            this.dialog = false
            this.traitementAffichageErreur([]);
            this.ajout_activite = false;
            this.$nextTick(() => {

                this.ajout_activite = false;
                this.editedIndex = -1
            })
        },

        termine() {
            //Ajouter Dans la data_table
            //Dialog Information

            console.log("Opération effectuée")
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
        validationChamp() {
            /* if(this.editedItem.name.length < 3){
                 this.editedItemTextError.name = "Le champ Désignation doit contenir 3 caractères au minimum";
                 this.editedItemBooleanError.name = true;
                 return false;
             }
             this.editedItemBooleanError.name = false;


             if(this.editedItem.prix_unit.length < 3){
                 this.editedItemTextError.prix_unit = "Le prix n'est pas valide ( prx > 100F ) ";
                 this.editedItemBooleanError.prix_unit = true;
                 return false;
             }
             this.editedItemBooleanError.prix_unit = false;


             if(this.editedItem.quantite === 0){
                 this.editedItemTextError.quantite = "La quantité n'est pas valide (  >= 1 ) ";
                 this.editedItemBooleanError.quantite = true;
                 return false;
             }
             this.editedItemBooleanError.quantite = false;

             this.editedItem.total = this.editedItem.quantite * this.editedItem.prix_unit;


             this.total += this.editedItem.total;
             /!*let tol = 0;
             for(let i = 0; i < this.data_contribuable.length; i++ ){
                 tol +=  this.data_contribuable[i].total;

             }*!/*/
            return true;

        }, toFormData: function (obj) {
            let formData = new FormData();
            for (let key in obj) {
                formData.append(key, obj[key]);
            }
            return formData;
        },


    },
}
</script>

<style>
.v-toolbar__title {
    color: white;
    font-weight: bold;
}

.v-messages__message {
    font-weight: bold;
}
</style>
