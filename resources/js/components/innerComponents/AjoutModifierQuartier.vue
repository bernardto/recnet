<template>

  <div>


    <v-card elevation="3" :disabled="loadform" outlined style="padding: 10px; " id="ajout_modifier_quartier">

      <!--            <v-card-title class="display-1 text&#45;&#45;primary">

                  </v-card-title>-->

      <v-toolbar
          color="orange grey"
          dark

      ><span class="headline"> Ajout d'un quartier</span></v-toolbar>

      <v-row class="mt-4">


        <v-col cols="12">
          <p>Vous pouvez rattachez le quartier à une zone.</p>


          <v-autocomplete
              v-model="value_zone"
              :items="data_zone"
              :loading="isLoading"
              clearable
              rounded
              return-object
              :disabled="loadform"
              :error="editedItemBooleanError.zone"
              :error-messages="editedItemTextError.zone"
              auto-select-first
              item-text="lib"
              label="Rechercher une zone"
              solo
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Aucune zone trouvée. Vous pouvez créer cette zone
                  <strong> <a href="./zone">Ici</a> </strong>
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-autocomplete>
          <!--                    <v-select

                                  v-model="value_zone"
                                  :items="data_zone"
                                  return-object
                                  item-text="lib"
                                  solo
                                  label="Liste des zones"

                              ></v-select>-->


        </v-col>

        <v-col
            cols="6"
        >
          <v-text-field


              label="Nom du quartier"
              v-model="item.lib"
              :error="editedItemBooleanError.lib"
              :error-messages="editedItemTextError.lib"
              :disabled="loadform"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="6"
        >
          <v-text-field

              label="Identifiant ou Code du Quartier"
              v-model="item.identifiant"
              :error="editedItemBooleanError.identifiant"
              :error-messages="editedItemTextError.identifiant"
              :disabled="loadform"
              required
          ></v-text-field>
        </v-col>


        <v-col v-show="false" cols="12">

          <v-toolbar
              color="orange grey"
              dark

          ><span class="headline"> Desiner le périmète du quartier sur la Carte </span></v-toolbar>

        </v-col>

      </v-row>


      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-divider></v-divider>
      <v-card-actions>
        <v-row>
          <v-col cols="5"></v-col>
          <v-col cols="7">


            <v-btn
                color="grey accent-1"
                text
                outlined
                :disabled="loadform"
                @click="annuler"
            >
              <v-icon>mdi-cancel</v-icon>
              Annuler
            </v-btn>
            <v-btn
                color="orange orange-4"

                elevation="2"
                @click="ajouterQuartier"
                :loading="loadform"

            >
              <v-icon>mdi-send</v-icon>
              {{ ajout ? 'Ajouter le quartier' : 'Modifier' }}
            </v-btn>


          </v-col>
        </v-row>
      </v-card-actions>

    </v-card>

  </div>

</template>

<script>
import Contribuable from "../Contribuable/Contribuable";
import HelloWorld from "../HelloWorld";

export default {

  components: {},
  data: () => ({
    menu2: false,
    isLoading: false,


    editedItemTextError: {

      identifiant: '',
      lib: '',
      zone: '',
      gps: '',
      couleur: '',


    },
    editedItemBooleanError: {

      identifiant: false,
      zone: false,
      lib: false,
      gps: '',
      couleur: false,


    },
    item2: {},
    loadform: false,
    data_zone: [],
    value_zone: null,


    data_quartier: ['foo', 'bar', 'fizz', 'buzz'],
    value_quartier: [],
  }),
  props: ['item', 'ajout', "up_zone", "update_matricule"],


  mounted() {
    // this.$emit('ajout_quartier', {identifiant: this.item.identifiant,lib : this.item.lib, zone:  this.value_quartier.length > 0  ?this.value_zone.lib : 'Aucune'});


    this.remplirDataZone();
  },
  methods: {


    ajouterQuartier() {

      let url = this.ajout ? "/ajout_quartier" : "/modifier_quartier";

      let zone = null

      if (this.value_zone)
        zone = this.value_zone.id_zn

      this.loadform = true;

      axios.post(url, {
        up_zone: this.value_zone.id_zn !== this.item.old_id_zone,
        id_qt: this.item.id_qt,
        zone: zone,
        identifiant: this.item.identifiant,
        lib: this.item.lib,
        change_id: this.item.identifiant !== this.item.old_identifiant
      }).then(response => {

        this.loadform = false;


        if (response.data.success) {



          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });

          this.$root.$emit('update_dat_quartier',"");
          this.traitementAffichageErreur(null);

        } else {


          window.scrollTo({
            top: (window.innerWidth / 2) - 100,
            left: 0,
            behavior: 'smooth'
          })
          let er = response.data.errors;
          this.traitementAffichageErreur(er);


        }


      }).catch(error => {


      });
    },

    remplirDataZone() {

      axios.post('/get_tout_zone').then(response => {


        this.data_zone = response.data.data;


      }).catch(error => {


      });

    },

    annuler() {

      this.item.lib = "";


      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

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

  },


  watch: {

    update_matricule() {


      this.value_zone = {
        lib: "",
        id_zn: 0,
      };

    },
    up_zone() {

      this.value_zone = {

        id_zn: this.item.id_zone,
        lib: this.item.zone,
      }

    },
  },
  name: "AjoutQuartier",

}
</script>

<style scoped>

</style>
