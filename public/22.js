(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/Superviseurs.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/Superviseurs.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FicheCollecteur__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FicheCollecteur */ "./resources/js/components/Collecteur/FicheCollecteur.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    FicheCollecteur: _FicheCollecteur__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  name: 'Superviseur',
  mounted: function mounted() {
    var _this = this;

    this.$root.$emit('TITRE', "GESTION DES SUPERVISEURS");
    this.$root.$on('close_fiche', function (data) {
      _this.fiche = !_this.fiche;
      _this.dialog_options = false;
    }); // this.getCompteFonctionnel();

    if (window.innerWidth > 600) {
      this.max_width_dialog = 590;
    }

    this.isMobile = window.innerWidth <= 600;
    this.getDataZone();
    this.remplirTableCollecteur();
  },
  data: function data() {
    return {
      dialog: false,
      loading_data: true,
      dialog_options: false,
      page: 1,
      dernier_page: 1,
      itemsContext: [{
        text: 'Affecter',
        icon: 'mdi-send',
        id: 1
      }, {
        text: 'Autre',
        icon: 'mdi-menu',
        id: 2
      }],
      offset: true,
      id_demande: 0,
      dialogDelete: false,
      isMobile: false,
      lien_site: location.protocol + '//' + location.host,
      loadform: false,
      dialog_termine: false,
      max_width_dialog: 390,
      total: 0,
      headers: [{
        text: 'Photo',
        align: 'start',
        sortable: false,
        value: 'photo'
      }, {
        text: 'Identifiant',
        align: 'start',
        value: 'identifiant'
      }, {
        text: 'Nom',
        value: 'nom'
      }, {
        text: 'Genre',
        value: 'genre'
      }, {
        text: 'Numéro',
        value: 'numero',
        sortable: false
      }
      /*{ text: 'Quartier/Zone', value: 'affectation' },*/

      /*{ text: 'Selection', value: 'select',  },*/
      ],
      data_collecteur: [],
      editedIndex: -1,
      color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
      editedItem: {
        nom: 'TOTO',
        prenom: 'BERNARD',
        photo: '',
        genre: 'F',
        date_naissance: new Date().toISOString().substr(0, 10),
        email: 'totobernard09@gmail.com',
        numero: '+2257803638',
        identifiant: '747488',
        num_cni: '123456788888',
        est_superviseur: true
      },
      editedItemTextError: {
        nom: '',
        prenom: '',
        genre: '',
        compf: '',
        photo: '',
        date_naissance: '',
        email: '',
        numero: '',
        file_photo: '',
        num_cni: '',
        identifiant: ''
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
        identifiant: false
      },
      data_main_tri: [{
        id: 1,
        lib: "Tous les résultats"
      }, {
        id: 3,
        lib: "Zone"
      }],
      value_main_tri: {
        id: 1,
        lib: "Tout"
      },
      data_option_tri: [],
      value_option_tri: {},
      file: null,
      menu2: false,
      niveau_load: 0,
      error: true,
      text_error: '',
      enable_cm: false,
      searchData: '',
      fiche: false,
      value_comf: [],
      data_comf: [],
      context_menu_open: false,
      itemSelect: {
        nb: 0,
        id: []
      },
      date_naissance: new Date().toISOString().substr(0, 10)
    };
  },
  props: ['item'],
  computed: {
    formTitle: function formTitle() {
      return this.editedIndex === -1 ? 'Ajouter un superviseur' : 'Modifier un superviseur';
    }
  },
  watch: {
    dialog: function dialog(val) {
      val || this.close();
    },
    dialogDelete: function dialogDelete(val) {
      val || this.closeDelete();
    },
    searchData: function searchData(val) {
      this.rechercherCollecteur();
    }
  },
  created: function created() {
    this.initialize();
  },
  methods: {
    imprimerListe: function imprimerListe() {
      var _this2 = this;

      this.loading_data = true; //window.open("/contribuable_liste?id="+JSON.stringify(this.data_contribuable.map(a => a.id)), "_blank");

      var valeur_tri = 0;
      var titre_impression = "LISTE DES SUPERVISSEURS DE LA MAIRIE DE YAMOUSSOUKRO";

      if (this.value_main_tri.id === 3) {
        valeur_tri = this.value_option_tri.id_zn;
        titre_impression = "LISTE DES SUPERVISSEURS DE LA MAIRIE DE YAMOUSSOUKRO DE LA ZONE : " + this.value_option_tri.lib.toUpperCase();
      }

      axios.post("/collecteur_liste", {
        responseType: 'blob',
        Accept: 'application/pdf',
        est_superviseur: true,
        titre_impr: titre_impression,
        trier_par: this.value_main_tri.id,
        val_tri: valeur_tri
      }).then(function (response) {
        var url = window.URL.createObjectURL(new Blob([response.data.data], {
          type: 'application/pdf'
        }));
        var link = document.createElement('a');
        console.log(link);
        link.href = url;
        link.setAttribute('download', 'staffs.pdf'); //or any other extension

        document.body.appendChild(link);
        link.click();
      })["catch"](function (error) {
        console.log(error);
      })["finally"](function () {
        _this2.loading_data = false;
      });
    },
    updateTri: function updateTri() {
      this.value_option_tri = {};
      this.data_option_tri = [];
      this.data_collecteur = [];
      this.dernier_page = 1;

      switch (this.value_main_tri.id) {
        case 1:
          //TOUS RESULTATS
          this.data_option_tri = [];
          this.value_option_tri = {
            id: 0
          };
          this.remplirTableContribuable();
          break;

        case 3:
          //ZONE
          this.data_option_tri = this.data_zone;
          break;
      }
    },
    getDataZone: function getDataZone() {
      var _this3 = this;

      axios.post('/get_tout_zone').then(function (response) {
        _this3.data_zone = response.data.data;
      })["catch"](function (error) {});
    },
    rechercherCollecteur: function rechercherCollecteur() {},
    newItem: function newItem() {
      this.editedItem.nom = "";
      this.editedItem.prenom = "";
      this.editedItem.genre = "H";
      this.editedItem.date_naissance = "";
      this.editedItem.numero = "";
      this.editedItem.num_cni = "";
      this.editedItem.email = "";
      this.editedItem.identifiant = "";
      this.editedItem.est_superviseur = false;
      this.editedIndex = -1;
      this.dialog = true;
      this.getMatricule();
    },
    getCompteFonctionnel: function getCompteFonctionnel() {
      var _this4 = this;

      axios.post('get_tout_compte').then(function (response) {
        _this4.data_comf = [];
        _this4.data_comf = response.data.data;
      })["catch"](function (error) {});
    },
    remplirTableCollecteur: function remplirTableCollecteur() {
      var _this5 = this;

      var valeur_tri = 0;
      if (this.value_main_tri.id === 3) valeur_tri = this.value_option_tri.id_zn;
      this.loading_data = true;
      axios.post('/get_tout_collecteur?page=' + this.page, {
        trier_par: this.value_main_tri.id,
        est_superviseur: true,
        val_tri: valeur_tri
      }).then(function (response) {
        _this5.data_collecteur = [];
        var data = response.data.data.data;
        _this5.dernier_page = response.data.data.last_page;
        data.forEach(function (item, index) {
          //Couleur photo
          item.nom = item.nom + ' ' + item.prenom;
          item.select = false;

          if (item.photo === 'Aucune') {
            item.couleur = _this5.color_array[_this5.getRandomInt(5)];
          }

          _this5.data_collecteur.push(item); //Sexe


          if (item.genre === 'H') {
            _this5.data_collecteur[index].genre = 'HOMME';
          } else {
            _this5.data_collecteur[index].genre = 'FEMME';
          }
        });
        _this5.loading_data = false;
      })["catch"](function (error) {});
    },
    initialize: function initialize() {
      this.data_collecteur = [];
    },
    clickRow: function clickRow(item) {
      if (this.context_menu_open) return;
      this.editedIndex = this.data_collecteur.indexOf(item);
      this.editedItem.nom = item.nom.split(" ")[0];
      this.editedItem.photo = item.photo;
      this.editedItem.couleur = item.couleur;
      this.editedItem.prenom = item.prenom;
      this.editedItem.genre = item.genre[0];
      this.editedItem.date_naissance = item.date_nai;
      this.editedItem.numero = item.numero;
      this.editedItem.num_cni = item.num_cni;
      this.editedItem.email = item.email;
      this.editedItem.identifiant = item.identifiant; //this.editedItem = Object.assign({}, item)

      this.dialog_options = true;
    },
    editItem: function editItem() {
      this.dialog_options = false;
      this.dialog = true;
    },
    deleteItem: function deleteItem() {
      this.dialog_options = false;
      this.dialogDelete = true;
    },
    envoyerDonnee: function envoyerDonnee() {
      var _this6 = this;

      var formData = new FormData();
      this.loadform = true;
      var o = 0;

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
        } //}

      } //console.log(o);


      formData.append("nb_photo", o);
      var config = {
        onUploadProgress: function onUploadProgress(progressEvent) {
          var percen = Math.round(progressEvent.loaded * 100 / progressEvent.total);
          _this6.niveau_load = percen;
        }
      };
      var url = '';
      if (this.editedIndex === -1) url = "/ajout_collecteur";else url = "/modifier_collecteur";

      if (this.editedIndex > -1) {
        this.editedItem.up_email = this.data_collecteur[this.editedIndex].email !== this.editedItem.email;
        this.editedItem.up_identifiant = this.data_collecteur[this.editedIndex].identifiant !== this.editedItem.identifiant;
        this.editedItem.id = this.data_collecteur[this.editedIndex].id;
      }

      this.editedItem.est_superviseur = true;
      formData.append("data", JSON.stringify(this.editedItem));
      axios.post(url, formData, config).then(function (response) {
        _this6.loadform = false;

        if (response.data.success) {
          _this6.editedItem.id = response.data.id;
          _this6.editedItem.photo = response.data.photo;
          _this6.editedItem.select = false;
          _this6.error = false;

          _this6.traitementAffichageErreur([]);

          if (_this6.editedItem.photo === 'Aucune' && _this6.editedIndex === -1) {
            _this6.editedItem.couleur = _this6.color_array[_this6.getRandomInt(5)];
          } //Sexe


          if (_this6.editedItem.genre === 'H') {
            _this6.editedItem.genre = 'HOMME';
          } else {
            _this6.editedItem.genre = 'FEMME';
          }

          _this6.file = null;

          _this6.save();
        } else {
          var er = response.data.errors; // console.log(er);

          _this6.text_error = "(*) Veuillez corriger les erreurs.";
          _this6.error = true;

          _this6.traitementAffichageErreur(er);
        }
      })["catch"](function (error) {// handle error
      }).then(function () {// always executed
      });
    },
    getMatricule: function getMatricule() {
      var _this7 = this;

      axios.post('/get_matricule_superviseur').then(function (response) {
        _this7.editedItem.identifiant = response.data.matricule;
      })["catch"](function (error) {});
    },
    selectItem: function selectItem(item) {
      if (item.select) {
        this.itemSelect.nb++;
        this.itemSelect.id.push(item.id);
      } else {
        this.itemSelect.nb--;
        var index = this.itemSelect.id.indexOf(item.id);

        if (index > -1) {
          this.itemSelect.id.splice(index, 1);
        }
      }

      this.enable_cm = this.itemSelect.nb > 0;
    },
    clickContextMenu: function clickContextMenu(item) {
      if (item.id === 1) {
        this.$router.push({
          path: '/aff_collecteur',
          query: {
            user: JSON.stringify(this.itemSelect)
          }
        });
      } else {
        this.dialog_options = true;
      }
    },
    deleteItemConfirm: function deleteItemConfirm() {
      // console.log(this.data_collecteur[this.editedIndex].total);
      this.total -= this.data_collecteur[this.editedIndex].total;
      this.data_collecteur.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    traitementAffichageErreur: function traitementAffichageErreur(er) {
      var _this8 = this;

      var j = 0;
      Object.keys(this.editedItemTextError).forEach(function (cle_O) {
        j = 0;
        Object.keys(er).forEach(function (cle_E) {
          if (cle_O === cle_E) {
            _this8.editedItemBooleanError[cle_O] = true;
            _this8.editedItemTextError[cle_O] = er[cle_E];
            j++;
            return;
          }
        });

        if (j === 0) {
          _this8.editedItemBooleanError[cle_O] = false;
          _this8.editedItemTextError[cle_O] = '';
        }
      });
    },
    getRandomInt: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    cmIsOpened: function cmIsOpened(cm) {
      this.context_menu_open = true;
    },
    cmIsClosed: function cmIsClosed(cm) {
      this.context_menu_open = false;
    },
    close: function close() {
      var _this9 = this;

      this.dialog = false;
      this.traitementAffichageErreur([]);
      this.$nextTick(function () {
        _this9.editedItem = Object.assign({}, _this9.defaultItem);
        _this9.editedIndex = -1;
      });
    },
    termine: function termine() {
      //Ajouter Dans la data_table
      //Dialog Information
      console.log("Opération effectuée");
    },
    closeDelete: function closeDelete() {
      var _this10 = this;

      this.dialogDelete = false;
      this.$nextTick(function () {
        _this10.editedItem = Object.assign({}, _this10.defaultItem);
        _this10.editedIndex = -1;
      });
    },
    validationChamp: function validationChamp() {
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
       for(let i = 0; i < this.data_collecteur.length; i++ ){
           tol +=  this.data_collecteur[i].total;
         }*!/*/
      return true;
    },
    toFormData: function toFormData(obj) {
      var formData = new FormData();

      for (var key in obj) {
        formData.append(key, obj[key]);
      }

      return formData;
    },
    testFunction: function testFunction() {
      console.log("okkkkkkkkkkkk");
    },
    save: function save() {
      //Modification
      if (this.editedIndex > -1) {
        Object.assign(this.data_collecteur[this.editedIndex], this.editedItem); //Object.assign(this.reponse.data[this.editedIndex], this.editedItem)
      } else {
        //this.reponse.data.push(this.editedItem);
        this.data_collecteur.push(this.editedItem);
      }

      this.dialog = false;
      this.close();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/Superviseurs.vue?vue&type=template&id=da9fa6dc&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/Superviseurs.vue?vue&type=template&id=da9fa6dc& ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "v-overlay",
        {
          model: {
            value: _vm.loading_data,
            callback: function($$v) {
              _vm.loading_data = $$v
            },
            expression: "loading_data"
          }
        },
        [
          _c("v-progress-circular", {
            attrs: { indeterminate: "", size: "64" }
          })
        ],
        1
      ),
      _vm._v(" "),
      !_vm.fiche
        ? _c(
            "div",
            [
              _vm.loading_data
                ? _c("v-skeleton-loader", {
                    staticClass: "mx-auto",
                    attrs: { type: "card" }
                  })
                : _vm._e(),
              _vm._v(" "),
              !_vm.loading_data
                ? _c("v-data-table", {
                    staticClass: "elevation-1",
                    attrs: {
                      headers: _vm.headers,
                      items: _vm.data_collecteur,
                      "sort-by": "identifiant",
                      "hide-default-footer": ""
                    },
                    on: { "click:row": _vm.clickRow },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "top",
                          fn: function() {
                            return [
                              _c(
                                "v-toolbar",
                                { attrs: { flat: "" } },
                                [
                                  _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        color: "primary accent-4",
                                        dark: "",
                                        outlined: "",
                                        vi: _vm.data_collecteur.length <= 0
                                      },
                                      on: { click: _vm.imprimerListe }
                                    },
                                    [
                                      _c("v-icon", [
                                        _vm._v("mdi-printer-settings")
                                      ]),
                                      _vm._v(
                                        "\n                            Imprimer\n                        "
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-divider", {
                                    staticClass: "mx-4",
                                    attrs: { inset: "", vertical: "" }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass: "mb-2",
                                      attrs: {
                                        color: "orange accent-4",
                                        dark: ""
                                      },
                                      on: { click: _vm.newItem }
                                    },
                                    [
                                      _c("v-icon", [_vm._v("mdi-plus")]),
                                      _vm._v(
                                        " Ajouter\n                        "
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-divider", {
                                    staticClass: "mx-4",
                                    attrs: { inset: "", vertical: "" }
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    attrs: {
                                      dense: "",
                                      "hide-details": "",
                                      solo: "",
                                      clearable: "",
                                      "prepend-inner-icon": "mdi-magnify",
                                      label: "Rechercher un superviseur"
                                    },
                                    model: {
                                      value: _vm.searchData,
                                      callback: function($$v) {
                                        _vm.searchData = $$v
                                      },
                                      expression: "searchData"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("v-divider", {
                                    staticClass: "mx-4",
                                    attrs: { inset: "", vertical: "" }
                                  }),
                                  _vm._v(" "),
                                  _c("v-select", {
                                    staticClass: "mt-3",
                                    attrs: {
                                      "item-text": "lib",
                                      items: _vm.data_main_tri,
                                      "return-object": "",
                                      dense: "",
                                      outlined: "",
                                      label: "Trier par"
                                    },
                                    on: { change: _vm.updateTri },
                                    model: {
                                      value: _vm.value_main_tri,
                                      callback: function($$v) {
                                        _vm.value_main_tri = $$v
                                      },
                                      expression: "value_main_tri"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("v-divider", {
                                    staticClass: "mx-4",
                                    attrs: { inset: "", vertical: "" }
                                  }),
                                  _vm._v(" "),
                                  _vm.value_main_tri.id !== 1
                                    ? _c("v-select", {
                                        attrs: {
                                          items: _vm.data_option_tri,
                                          outlined: "",
                                          "return-object": "",
                                          dense: "",
                                          "item-text": "lib",
                                          label: "Options de tri"
                                        },
                                        on: {
                                          change: function($event) {
                                            return _vm.remplirTableCollecteur()
                                          }
                                        },
                                        model: {
                                          value: _vm.value_option_tri,
                                          callback: function($$v) {
                                            _vm.value_option_tri = $$v
                                          },
                                          expression: "value_option_tri"
                                        }
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  false
                                    ? undefined
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "v-dialog",
                                    {
                                      attrs: {
                                        persistent: "",
                                        "max-width": "600px"
                                      },
                                      model: {
                                        value: _vm.dialog,
                                        callback: function($$v) {
                                          _vm.dialog = $$v
                                        },
                                        expression: "dialog"
                                      }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        { attrs: { loading: _vm.loadform } },
                                        [
                                          _c(
                                            "v-card-title",
                                            [
                                              _c(
                                                "span",
                                                { staticClass: "headline" },
                                                [_vm._v(_vm._s(_vm.formTitle))]
                                              ),
                                              _vm._v(" "),
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  staticClass: "ma-2",
                                                  attrs: {
                                                    outlined: "",
                                                    fab: "",
                                                    small: ""
                                                  },
                                                  on: {
                                                    click: function($event) {
                                                      _vm.dialog = false
                                                    }
                                                  }
                                                },
                                                [
                                                  _c("v-icon", [
                                                    _vm._v("mdi-close")
                                                  ])
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-card-text",
                                            [
                                              _c(
                                                "v-container",
                                                [
                                                  _c(
                                                    "v-row",
                                                    [
                                                      _c(
                                                        "v-col",
                                                        {
                                                          attrs: { cols: "4" }
                                                        },
                                                        [
                                                          _vm.editedIndex === -1
                                                            ? _c("v-avatar", {
                                                                staticClass:
                                                                  "mb-3",
                                                                attrs: {
                                                                  color:
                                                                    "primary",
                                                                  rounded: "",
                                                                  size: "128"
                                                                }
                                                              })
                                                            : _c("div", [
                                                                _vm.editedItem
                                                                  .photo ===
                                                                "Aucune"
                                                                  ? _c(
                                                                      "div",
                                                                      [
                                                                        _c(
                                                                          "v-avatar",
                                                                          {
                                                                            attrs: {
                                                                              size:
                                                                                "128px",
                                                                              color:
                                                                                _vm
                                                                                  .editedItem
                                                                                  .couleur
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "span",
                                                                              {
                                                                                staticClass:
                                                                                  "white--text headline"
                                                                              },
                                                                              [
                                                                                _vm._v(
                                                                                  _vm._s(
                                                                                    _vm
                                                                                      .editedItem
                                                                                      .nom[0] +
                                                                                      "" +
                                                                                      _vm
                                                                                        .editedItem
                                                                                        .nom[1]
                                                                                  )
                                                                                )
                                                                              ]
                                                                            )
                                                                          ]
                                                                        )
                                                                      ],
                                                                      1
                                                                    )
                                                                  : _c(
                                                                      "div",
                                                                      [
                                                                        _c(
                                                                          "v-avatar",
                                                                          {
                                                                            attrs: {
                                                                              size:
                                                                                "128px"
                                                                            }
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "img",
                                                                              {
                                                                                attrs: {
                                                                                  alt:
                                                                                    "Avatar",
                                                                                  src:
                                                                                    "/storage/photo/collecteur/" +
                                                                                    _vm
                                                                                      .editedItem
                                                                                      .photo
                                                                                }
                                                                              }
                                                                            )
                                                                          ]
                                                                        )
                                                                      ],
                                                                      1
                                                                    )
                                                              ]),
                                                          _vm._v(" "),
                                                          _c("v-file-input", {
                                                            attrs: {
                                                              "show-size": "",
                                                              "truncate-length":
                                                                "15",
                                                              disabled:
                                                                _vm.loadform,
                                                              accept:
                                                                "image/png, image/jpeg, image/bmp",
                                                              placeholder:
                                                                _vm.editedIndex ===
                                                                -1
                                                                  ? "Ajouter"
                                                                  : "Modifier",
                                                              "prepend-icon":
                                                                "mdi-camera",
                                                              label:
                                                                _vm.editedIndex ===
                                                                -1
                                                                  ? "Ajouter"
                                                                  : "Modifier"
                                                            },
                                                            model: {
                                                              value: _vm.file,
                                                              callback: function(
                                                                $$v
                                                              ) {
                                                                _vm.file = $$v
                                                              },
                                                              expression: "file"
                                                            }
                                                          })
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "v-col",
                                                        {
                                                          attrs: { cols: "8" }
                                                        },
                                                        [
                                                          _c(
                                                            "v-row",
                                                            [
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-text-field",
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Identifiant/Matricule",
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "error-messages":
                                                                          _vm
                                                                            .editedItemTextError
                                                                            .identifiant,
                                                                        error:
                                                                          _vm
                                                                            .editedItemBooleanError
                                                                            .identifiant,
                                                                        required:
                                                                          ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .identifiant,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "identifiant",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.identifiant"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-text-field",
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Nom",
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "error-messages":
                                                                          _vm
                                                                            .editedItemTextError
                                                                            .nom,
                                                                        error:
                                                                          _vm
                                                                            .editedItemBooleanError
                                                                            .nom,
                                                                        required:
                                                                          ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .nom,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "nom",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.nom"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-text-field",
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Prenom",
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "error-messages":
                                                                          _vm
                                                                            .editedItemTextError
                                                                            .prenom,
                                                                        error:
                                                                          _vm
                                                                            .editedItemBooleanError
                                                                            .prenom,
                                                                        required:
                                                                          ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .prenom,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "prenom",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.prenom"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-radio-group",
                                                                    {
                                                                      attrs: {
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        row: ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .genre,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "genre",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.genre"
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "v-radio",
                                                                        {
                                                                          attrs: {
                                                                            color:
                                                                              "orange accent-4",
                                                                            label:
                                                                              "Homme",
                                                                            value:
                                                                              "H"
                                                                          }
                                                                        }
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-radio",
                                                                        {
                                                                          attrs: {
                                                                            color:
                                                                              "orange accent-4",
                                                                            label:
                                                                              "Femme",
                                                                            value:
                                                                              "F"
                                                                          }
                                                                        }
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-menu",
                                                                    {
                                                                      ref:
                                                                        "menu",
                                                                      attrs: {
                                                                        "close-on-content-click": false,
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "return-value":
                                                                          _vm
                                                                            .editedItem
                                                                            .date_naissance,
                                                                        transition:
                                                                          "scale-transition",
                                                                        "offset-y":
                                                                          "",
                                                                        "min-width":
                                                                          "290px"
                                                                      },
                                                                      on: {
                                                                        "update:returnValue": function(
                                                                          $event
                                                                        ) {
                                                                          return _vm.$set(
                                                                            _vm.editedItem,
                                                                            "date_naissance",
                                                                            $event
                                                                          )
                                                                        },
                                                                        "update:return-value": function(
                                                                          $event
                                                                        ) {
                                                                          return _vm.$set(
                                                                            _vm.editedItem,
                                                                            "date_naissance",
                                                                            $event
                                                                          )
                                                                        }
                                                                      },
                                                                      scopedSlots: _vm._u(
                                                                        [
                                                                          {
                                                                            key:
                                                                              "activator",
                                                                            fn: function(
                                                                              ref
                                                                            ) {
                                                                              var on =
                                                                                ref.on
                                                                              var attrs =
                                                                                ref.attrs
                                                                              return [
                                                                                _c(
                                                                                  "v-text-field",
                                                                                  _vm._g(
                                                                                    _vm._b(
                                                                                      {
                                                                                        attrs: {
                                                                                          label:
                                                                                            "Date de naissance",
                                                                                          "prepend-icon":
                                                                                            "mdi-calendar",
                                                                                          readonly:
                                                                                            ""
                                                                                        },
                                                                                        model: {
                                                                                          value:
                                                                                            _vm
                                                                                              .editedItem
                                                                                              .date_naissance,
                                                                                          callback: function(
                                                                                            $$v
                                                                                          ) {
                                                                                            _vm.$set(
                                                                                              _vm.editedItem,
                                                                                              "date_naissance",
                                                                                              $$v
                                                                                            )
                                                                                          },
                                                                                          expression:
                                                                                            "editedItem.date_naissance"
                                                                                        }
                                                                                      },
                                                                                      "v-text-field",
                                                                                      attrs,
                                                                                      false
                                                                                    ),
                                                                                    on
                                                                                  )
                                                                                )
                                                                              ]
                                                                            }
                                                                          }
                                                                        ],
                                                                        null,
                                                                        false,
                                                                        4281894362
                                                                      ),
                                                                      model: {
                                                                        value:
                                                                          _vm.menu2,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.menu2 = $$v
                                                                        },
                                                                        expression:
                                                                          "menu2"
                                                                      }
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "v-date-picker",
                                                                        {
                                                                          attrs: {
                                                                            "no-title":
                                                                              "",
                                                                            disabled:
                                                                              _vm.loadform,
                                                                            max: new Date()
                                                                              .toISOString()
                                                                              .substr(
                                                                                0,
                                                                                10
                                                                              ),
                                                                            locale:
                                                                              "fr-fr",
                                                                            scrollable:
                                                                              ""
                                                                          },
                                                                          model: {
                                                                            value:
                                                                              _vm
                                                                                .editedItem
                                                                                .date_naissance,
                                                                            callback: function(
                                                                              $$v
                                                                            ) {
                                                                              _vm.$set(
                                                                                _vm.editedItem,
                                                                                "date_naissance",
                                                                                $$v
                                                                              )
                                                                            },
                                                                            expression:
                                                                              "editedItem.date_naissance"
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "v-spacer"
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "v-btn",
                                                                            {
                                                                              attrs: {
                                                                                text:
                                                                                  "",
                                                                                color:
                                                                                  "primary"
                                                                              },
                                                                              on: {
                                                                                click: function(
                                                                                  $event
                                                                                ) {
                                                                                  _vm.menu2 = false
                                                                                }
                                                                              }
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                "\n                                                                    Sortir\n                                                                "
                                                                              )
                                                                            ]
                                                                          ),
                                                                          _vm._v(
                                                                            " "
                                                                          ),
                                                                          _c(
                                                                            "v-btn",
                                                                            {
                                                                              attrs: {
                                                                                text:
                                                                                  "",
                                                                                disabled:
                                                                                  _vm.loadform,
                                                                                color:
                                                                                  "primary"
                                                                              },
                                                                              on: {
                                                                                click: function(
                                                                                  $event
                                                                                ) {
                                                                                  return _vm.$refs.menu.save(
                                                                                    _vm
                                                                                      .editedItem
                                                                                      .date_naissance
                                                                                  )
                                                                                }
                                                                              }
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                "\n                                                                    OK\n                                                                "
                                                                              )
                                                                            ]
                                                                          )
                                                                        ],
                                                                        1
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-text-field",
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Email",
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "error-messages":
                                                                          _vm
                                                                            .editedItemTextError
                                                                            .email,
                                                                        error:
                                                                          _vm
                                                                            .editedItemBooleanError
                                                                            .email,
                                                                        required:
                                                                          ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .email,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "email",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.email"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-text-field",
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Numéro",
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "error-messages":
                                                                          _vm
                                                                            .editedItemTextError
                                                                            .numero,
                                                                        error:
                                                                          _vm
                                                                            .editedItemBooleanError
                                                                            .numero,
                                                                        required:
                                                                          ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .numero,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "numero",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.numero"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-col",
                                                                {
                                                                  attrs: {
                                                                    cols: "12"
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "v-text-field",
                                                                    {
                                                                      attrs: {
                                                                        label:
                                                                          "Numéro de la carte d'identité ",
                                                                        disabled:
                                                                          _vm.loadform,
                                                                        "error-messages":
                                                                          _vm
                                                                            .editedItemTextError
                                                                            .num_cni,
                                                                        error:
                                                                          _vm
                                                                            .editedItemBooleanError
                                                                            .num_cni,
                                                                        required:
                                                                          ""
                                                                      },
                                                                      model: {
                                                                        value:
                                                                          _vm
                                                                            .editedItem
                                                                            .num_cni,
                                                                        callback: function(
                                                                          $$v
                                                                        ) {
                                                                          _vm.$set(
                                                                            _vm.editedItem,
                                                                            "num_cni",
                                                                            $$v
                                                                          )
                                                                        },
                                                                        expression:
                                                                          "editedItem.num_cni"
                                                                      }
                                                                    }
                                                                  )
                                                                ],
                                                                1
                                                              ),
                                                              _vm._v(" "),
                                                              _vm.error
                                                                ? _c(
                                                                    "v-col",
                                                                    {
                                                                      attrs: {
                                                                        cols:
                                                                          "12"
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "div",
                                                                        {
                                                                          staticClass:
                                                                            "red darken-2 text-center"
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "span",
                                                                            {
                                                                              staticClass:
                                                                                "white--text"
                                                                            },
                                                                            [
                                                                              _vm._v(
                                                                                _vm._s(
                                                                                  _vm.text_error
                                                                                )
                                                                              )
                                                                            ]
                                                                          )
                                                                        ]
                                                                      )
                                                                    ]
                                                                  )
                                                                : _vm._e()
                                                            ],
                                                            1
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    ],
                                                    1
                                                  )
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-card-actions",
                                            [
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "grey accent-1",
                                                    text: "",
                                                    outlined: "",
                                                    disabled: _vm.loadform
                                                  },
                                                  on: { click: _vm.close }
                                                },
                                                [
                                                  _c("v-icon", [
                                                    _vm._v("mdi-cancel")
                                                  ]),
                                                  _vm._v(
                                                    " Annuler\n                                    "
                                                  )
                                                ],
                                                1
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "blue darken-1",
                                                    text: "",
                                                    outlined: "",
                                                    loading: _vm.loadform
                                                  },
                                                  on: {
                                                    click: _vm.envoyerDonnee
                                                  }
                                                },
                                                [
                                                  _c("v-icon", [
                                                    _vm._v("mdi-send")
                                                  ]),
                                                  _vm._v(
                                                    "  " +
                                                      _vm._s(
                                                        _vm.editedIndex === -1
                                                          ? "Ajouter"
                                                          : "Modifier"
                                                      ) +
                                                      "\n                                    "
                                                  )
                                                ],
                                                1
                                              )
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-dialog",
                                    {
                                      attrs: { "max-width": "500px" },
                                      model: {
                                        value: _vm.dialogDelete,
                                        callback: function($$v) {
                                          _vm.dialogDelete = $$v
                                        },
                                        expression: "dialogDelete"
                                      }
                                    },
                                    [
                                      _c(
                                        "v-card",
                                        [
                                          _c(
                                            "v-card-title",
                                            { staticClass: "headline" },
                                            [
                                              _vm._v(
                                                "Voulez-vous vraiment supprimer?"
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-card-actions",
                                            [
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "blue darken-1",
                                                    text: ""
                                                  },
                                                  on: { click: _vm.closeDelete }
                                                },
                                                [_vm._v("Sortir")]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "v-btn",
                                                {
                                                  attrs: {
                                                    color: "blue darken-1",
                                                    text: ""
                                                  },
                                                  on: {
                                                    click: _vm.deleteItemConfirm
                                                  }
                                                },
                                                [_vm._v("OK")]
                                              ),
                                              _vm._v(" "),
                                              _c("v-spacer")
                                            ],
                                            1
                                          )
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "item.select",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              _c("v-simple-checkbox", {
                                directives: [
                                  {
                                    name: "context-menu",
                                    rawName: "v-context-menu",
                                    value: "cm-for-list-item",
                                    expression: "'cm-for-list-item'"
                                  }
                                ],
                                on: {
                                  click: function($event) {
                                    return _vm.selectItem(item)
                                  }
                                },
                                model: {
                                  value: item.select,
                                  callback: function($$v) {
                                    _vm.$set(item, "select", $$v)
                                  },
                                  expression: "item.select"
                                }
                              })
                            ]
                          }
                        },
                        {
                          key: "item.photo",
                          fn: function(ref) {
                            var item = ref.item
                            return [
                              item.photo === "Aucune"
                                ? _c(
                                    "div",
                                    [
                                      _c(
                                        "v-avatar",
                                        {
                                          attrs: {
                                            size: "36px",
                                            color: item.couleur
                                          }
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text headline"
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  item.nom[0] + "" + item.nom[1]
                                                )
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                : _c(
                                    "div",
                                    [
                                      _c(
                                        "v-avatar",
                                        { attrs: { size: "36px" } },
                                        [
                                          _c("img", {
                                            attrs: {
                                              alt: "Avatar",
                                              src:
                                                "storage/photo/collecteur/" +
                                                item.photo
                                            }
                                          })
                                        ]
                                      )
                                    ],
                                    1
                                  )
                            ]
                          }
                        },
                        {
                          key: "no-data",
                          fn: function() {
                            return [
                              _c("p", { staticClass: "subtitle-1" }, [
                                _vm._v("Aucune donnée disponible")
                              ])
                            ]
                          },
                          proxy: true
                        }
                      ],
                      null,
                      false,
                      1982109688
                    )
                  })
                : _vm._e(),
              _vm._v(" "),
              _vm.dernier_page > 1
                ? _c(
                    "v-row",
                    { attrs: { justify: "center" } },
                    [
                      _c(
                        "v-col",
                        { attrs: { cols: "8" } },
                        [
                          _c(
                            "v-container",
                            { staticClass: "max-width" },
                            [
                              _c("v-pagination", {
                                staticClass: "my-4",
                                attrs: {
                                  "total-visible": 8,
                                  length: _vm.dernier_page
                                },
                                on: {
                                  input: function($event) {
                                    return _vm.remplirTableCollecteur()
                                  }
                                },
                                model: {
                                  value: _vm.page,
                                  callback: function($$v) {
                                    _vm.page = $$v
                                  },
                                  expression: "page"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "v-row",
                { attrs: { justify: "center" } },
                [
                  _c(
                    "v-dialog",
                    {
                      attrs: { persistent: "", "max-width": "550" },
                      model: {
                        value: _vm.dialog_options,
                        callback: function($$v) {
                          _vm.dialog_options = $$v
                        },
                        expression: "dialog_options"
                      }
                    },
                    [
                      _c(
                        "v-card",
                        [
                          _c("v-card-title", { staticClass: "headline" }, [
                            _vm._v(
                              "\n                            Que voulez-vous faire\n                        "
                            )
                          ]),
                          _vm._v(" "),
                          _c("v-card-text", [
                            _c(
                              "div",
                              [
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "ma-2",
                                    attrs: { color: "primary", dark: "" },
                                    on: { click: _vm.editItem }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    Modifier\n                                    "
                                    ),
                                    _c(
                                      "v-icon",
                                      { attrs: { dark: "", right: "" } },
                                      [
                                        _vm._v(
                                          "\n                                        mdi-pencil\n                                    "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "ma-2",
                                    attrs: { color: "red", dark: "" },
                                    on: { click: _vm.deleteItem }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    Supprimer\n                                    "
                                    ),
                                    _c(
                                      "v-icon",
                                      { attrs: { dark: "", right: "" } },
                                      [
                                        _vm._v(
                                          "\n                                        mdi-delete\n                                    "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "v-btn",
                                  {
                                    staticClass: "ma-2",
                                    attrs: {
                                      color: "orange accent-4",
                                      dark: ""
                                    },
                                    on: {
                                      click: function($event) {
                                        _vm.fiche = !_vm.fiche
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "v-icon",
                                      { attrs: { dark: "", left: "" } },
                                      [
                                        _vm._v(
                                          "\n                                        fa-th\n                                    "
                                        )
                                      ]
                                    ),
                                    _vm._v(
                                      "Voir la Fiche\n                                "
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-card-actions",
                            [
                              _c("v-spacer"),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: { outlined: "" },
                                  on: {
                                    click: function($event) {
                                      _vm.dialog_options = false
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                Sortir\n\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    bottom: "",
                    color: "primary",
                    dark: "",
                    fab: "",
                    fixed: "",
                    right: ""
                  },
                  on: { click: _vm.newItem }
                },
                [_c("v-icon", [_vm._v("mdi-plus")])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { attrs: { justify: "center" } },
                [
                  _c(
                    "v-dialog",
                    {
                      attrs: { persistent: "", "max-width": "420" },
                      model: {
                        value: _vm.dialog_termine,
                        callback: function($$v) {
                          _vm.dialog_termine = $$v
                        },
                        expression: "dialog_termine"
                      }
                    },
                    [_c("v-card")],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.fiche
        ? _c(
            "div",
            [_c("FicheCollecteur", { attrs: { item: _vm.editedItem } })],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "context-menu",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.enable_cm,
              expression: "enable_cm"
            }
          ],
          ref: "cm-for-list-item",
          on: { opened: _vm.cmIsOpened, closed: _vm.cmIsClosed }
        },
        _vm._l(_vm.itemsContext, function(item, i) {
          return _c(
            "v-btn",
            {
              key: i,
              staticClass: "mb-2 mt-2",
              attrs: { color: "orange accent-4", dark: "" },
              on: {
                click: function($event) {
                  return _vm.clickContextMenu(item)
                }
              }
            },
            [
              _c("v-icon", [_vm._v(_vm._s(item.icon))]),
              _vm._v(" " + _vm._s(item.text) + "\n\n\n            ")
            ],
            1
          )
        }),
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Collecteur/Superviseurs.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/Collecteur/Superviseurs.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Superviseurs_vue_vue_type_template_id_da9fa6dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Superviseurs.vue?vue&type=template&id=da9fa6dc& */ "./resources/js/components/Collecteur/Superviseurs.vue?vue&type=template&id=da9fa6dc&");
/* harmony import */ var _Superviseurs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Superviseurs.vue?vue&type=script&lang=js& */ "./resources/js/components/Collecteur/Superviseurs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Superviseurs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Superviseurs_vue_vue_type_template_id_da9fa6dc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Superviseurs_vue_vue_type_template_id_da9fa6dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Collecteur/Superviseurs.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Collecteur/Superviseurs.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/Superviseurs.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Superviseurs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Superviseurs.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/Superviseurs.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Superviseurs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Collecteur/Superviseurs.vue?vue&type=template&id=da9fa6dc&":
/*!********************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/Superviseurs.vue?vue&type=template&id=da9fa6dc& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Superviseurs_vue_vue_type_template_id_da9fa6dc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Superviseurs.vue?vue&type=template&id=da9fa6dc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/Superviseurs.vue?vue&type=template&id=da9fa6dc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Superviseurs_vue_vue_type_template_id_da9fa6dc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Superviseurs_vue_vue_type_template_id_da9fa6dc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);