(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "AffecterLesSuperviseu",
  props: {
    config: {},
    item: {}
  },
  mounted: function mounted() {
    this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES superviseur");
    if (this.$route.query.user) this.user = JSON.parse(this.$route.query.user);
    this.onclikGererAffDesRea(1);
    this.remplirDataQuartier();
  },
  data: function data() {
    return {
      headers: [{
        text: 'Photo',
        align: 'start',
        sortable: false,
        value: 'photo'
      }, {
        text: 'Identifiant',
        value: 'identifiant'
      }, {
        text: 'Genre',
        value: 'sex'
      }, {
        text: 'Nom',
        value: 'nom'
      }
      /*{ text: 'Quartier/Zone', value: 'affectation' },*/
      ],
      user: null,
      dialog_confirm: false,
      dialog_options: false,
      load_data_quartier: false,
      dialog_attention: false,
      loading_data: false,
      page: 1,
      dernier_page: 1,
      color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
      data_user: [],
      data_affectation: [],
      data_n_affectation: [],
      data_r_affectation: [],
      data_d_affectation: [],
      value_rech_collecteur: [],
      data_rech_collecteur: [],
      isLoadingRech: false,
      search: null,
      aff_reaf_des: 3,
      titre_data_table: '',
      data_quartier: [],
      value_quartier: [],

      /**/
      data_zone: [],
      value_zone: [],
      load_send: false,
      color_snack: 'primary',
      errorText: {
        zone: '',
        '': false
      },
      message_snackbar: '',
      afficher_snackbar: false,
      errorBollean: {
        zone: false,
        quartier: false
      }
    };
  },
  watch: {
    search: function search(val) {
      if (!val) {
        this.getInfoUser();
      }
    }
  },
  methods: {
    afficherDialogAttention: function afficherDialogAttention() {
      if (this.value_quartier.length === 0) {
        this.dialog_options = false;
        this.dialog_attention = true;
      } else this.validerReAffection(2);
    },
    onclikGererAffDesRea: function onclikGererAffDesRea(val) {
      switch (val) {
        case 1:
          this.data_affectation = [];
          this.getInfoUser();
          this.titre_data_table = "Liste des superviseur non affectés";
          this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES superviseur");
          break;

        case 2:
          this.data_user = [];
          this.titre_data_table = "Liste des superviseur  à réaffecter";
          this.dernier_page = 0;
          this.$root.$emit('TITRE', "GESTION DE  LA REAFFECTATION DES superviseur");

          if (this.value_quartier.length <= 0) {
            this.errorText.quartier = "Vous devez choisir un quartier!";
            this.errorBollean.quartier = true;
          } else {
            this.getListeDesCollecteursDuQuartier();
          }

          break;

        case 3:
          this.titre_data_table = "Liste des superviseur  à  désaffecter";
          this.$root.$emit('TITRE', "GESTION DE DESAFFECTATION DES superviseur");
          this.data_user = [];
          this.dernier_page = 0;

          if (this.value_quartier.length <= 0) {
            this.errorText.quartier = "Vous devez choisir un quartier!";
            this.errorBollean.quartier = true;
          } else {
            this.getListeDesCollecteursDuQuartier();
          }

          break;
      }

      this.aff_reaf_des = val;
    },
    remplirDataQuartier: function remplirDataQuartier() {
      var _this = this;

      axios.post('/get_tout_quartier_aff').then(function (response) {
        _this.data_quartier = response.data.data;
      })["catch"](function (error) {});
    },
    effacerDoublonReaffectation: function effacerDoublonReaffectation() {
      this.data_r_affectation.forEach(function (item, index) {
        item.id_qt.forEach(function (anc_qt, index1) {
          item.nv_qt.forEach(function (nv_qt, index2) {
            if (anc_qt === nv_qt) {
              item.nv_qt.splice(index2, 1);
              return;
            }
          });
        });
      });
    },

    /**
     * AJOUTER OU ECRASER LES DONNEES EXITANTS
     * @param add_ecra
     */
    validerReAffection: function validerReAffection(add_ecra) {
      var _this2 = this;

      this.dialog_options = false;
      this.dialog_attention = false;
      this.effacerDoublonReaffectation();
      this.afficher_snackbar = false;
      this.load_send = true;
      var data_a_envoyer = [];
      this.data_r_affectation.forEach(function (item, index1) {
        data_a_envoyer[index1] = {
          id: item.id,
          id_qt: item.nv_qt
        };
      });
      axios.post('/valider_reaffection_collecteur_quartier', {
        data_coll: data_a_envoyer,
        add_ecra: add_ecra
      }).then(function (response) {
        if (response.data.success) {
          _this2.load_send = false;
          _this2.data_affectation = [];
          _this2.data_r_affectation = [];
          _this2.data_affectation = [];
          _this2.color_snack = 'deep-purple accent-4';
          _this2.message_snackbar = "La réaffectation a été effectuée.";
          _this2.afficher_snackbar = true;

          _this2.getListeDesCollecteursDuQuartier();
        }
      })["catch"](function (error) {});
    },
    validerDesafectation: function validerDesafectation() {
      var _this3 = this;

      this.load_send = true;
      axios.post('/valider_desaffection_collecteur', {
        data_coll: this.data_d_affectation.map(function (a) {
          return a.id;
        })
      }).then(function (response) {
        _this3.dialog_confirm = false;

        if (response.data.success) {
          _this3.load_send = false;
          _this3.data_d_affectation = [];
          _this3.data_affectation = [];
          _this3.data_user = [];
          _this3.color_snack = 'grey darken-4';
          _this3.message_snackbar = "La désaffectation a été effectuée.";
          _this3.afficher_snackbar = true;
        }
      })["catch"](function (error) {});
    },
    validerAffection: function validerAffection() {
      var _this4 = this;

      this.load_send = true;
      axios.post('/valider_affection_collecteur_quartier', {
        id_coll: this.data_affectation.map(function (a) {
          return a.id;
        }),
        id_qt: this.value_quartier.map(function (a) {
          return a.id_qt;
        })
      }).then(function (response) {
        if (response.data.success) {
          _this4.load_send = false;
          _this4.data_affectation = [];

          _this4.getInfoUser();

          _this4.color_snack = 'primary';
          _this4.message_snackbar = "L'affectation a été effectuée.";
          _this4.afficher_snackbar = true;
        }
      })["catch"](function (error) {});
    },
    onchangeQuartier: function onchangeQuartier() {
      if (this.value_quartier.length <= 0) {
        this.errorText.quartier = "Vous devez choisir un quartier!";
        this.errorBollean.quartier = true;
        this.data_affectation = [];
        this.data_r_affectation = [];
      } else {
        this.errorText.quartier = "";
        this.errorBollean.quartier = false; //AVOIR LA LISTE DES superviseur DEJA AFFECTES A CES QUARTIER A CES REAFFECTATION AFFECTATION

        if (this.aff_reaf_des !== 1) this.onclikGererAffDesRea(this.aff_reaf_des); // this.getListeDesCollecteursDuQuartier();
      }
    },
    onclickQuartier: function onclickQuartier() {},
    getListeDesCollecteursDuQuartier: function getListeDesCollecteursDuQuartier() {
      var _this5 = this;

      if (this.value_quartier.length <= 0) return;
      axios.post('/get_collecteur_du_quartier', {
        id_qt: this.value_quartier.map(function (a) {
          return a.id_qt;
        })
      }).then(function (response) {
        _this5.data_affectation = [];
        _this5.data_r_affectation = []; //Remplir la table avec les nouvelles affectation
        //Table des nouvelles affectation
        //Table de suspression des affectation

        response.data.data.forEach(function (item, index) {
          var existe = false; //this.data_user = [];

          _this5.data_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          });

          var existe_user = false;

          _this5.data_user.forEach(function (item_user, index) {
            if (item_user.id === item.id) {
              existe_user = true;
              return;
            }
          });

          if (item.photo === 'Aucune') {
            item.couleur = _this5.color_array[_this5.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          item.id_qt = item.id_qt.map(function (a) {
            return a.id_qt;
          }); //On vérifie qu'il n'existe pas dans la table des superviseur à affecter ou réaffecter

          if (!existe && !existe_user) _this5.data_affectation.push(item);
        });
      })["catch"](function (error) {});
    },
    onclickZone: function onclickZone() {
      this.data_quartier = [];
      this.value_quartier = [];
    },
    onchangeZone: function onchangeZone() {
      if (this.value_zone.length <= 0) {
        this.errorText.zone = "Vous devez choisir une zone!";
        this.errorBollean.zone = true;
      } else {
        this.errorText.zone = "";
        this.errorBollean.zone = false;
        this.getQuartierDesZones();
      }
    },
    getRandomInt: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    getInfoUser: function getInfoUser() {
      var _this6 = this;

      this.loading_data = true;
      axios.post('/get_info_super', {
        data: JSON.stringify(this.user),
        page: this.page
      }).then(function (response) {
        _this6.loading_data = false;
        var data = null;
        if (!_this6.user) data = response.data.data.data;else data = response.data.data;
        _this6.data_user = [];
        data.forEach(function (item, index) {
          var existe = false;

          _this6.data_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          });

          if (item.photo === 'Aucune') {
            item.couleur = _this6.color_array[_this6.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          item.select = false;
          if (!existe) _this6.data_user.push(item);
        });

        if (!_this6.user) {
          _this6.dernier_page = response.data.data.last_page;
          _this6.page = response.data.data.current_page;
        }
      })["catch"](function (error) {});
    },
    getInfoQuartier: function getInfoQuartier() {
      var _this7 = this;

      axios.post('/get_info_quartier', {
        data: JSON.stringify(this.user)
      }).then(function (response) {
        var data = response.data.data;
        _this7.data_user = [];
        data.forEach(function (item, index) {
          if (item.photo === 'Aucune') {
            item.couleur = _this7.color_array[_this7.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          _this7.data_user.push(item);
        });
      })["catch"](function (error) {});
    },
    onselectAutoComplete: function onselectAutoComplete() {
      console.log("sds");
    },
    searchCollecteur: function searchCollecteur() {
      var _this8 = this;

      this.loading_data = true;
      this.data_rech_collecteur = [];
      axios.post('/rechercher_collecteur', {
        search: this.search
      }).then(function (response) {
        /*response.data.data.forEach((item, index) => {
              item.fic = item.nom + "("+ item.identifiant+ ")";
            this.data_rech_collecteur.push(item)
         });*/
        _this8.loading_data = false;
        var data = null;
        data = response.data.data;
        _this8.data_user = [];
        data.forEach(function (item, index) {
          var existe = false;

          _this8.data_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          });

          if (item.photo === 'Aucune') {
            item.couleur = _this8.color_array[_this8.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          item.select = false;
          if (!existe && item.id_qt === 0) _this8.data_user.push(item);
        });
        _this8.dernier_page = 1;
      })["catch"](function (error) {});
    },
    clickRow: function clickRow(item) {
      var _this9 = this;

      if (this.value_quartier.length <= 0 && this.aff_reaf_des === 1) {
        this.errorText.quartier = "Vous devez choisir un quartier!";
        this.errorBollean.quartier = true;
      } else {
        this.errorText.quartier = "";
        this.errorBollean.quartier = false; //  this.data_n_affectation.push(item);

        this.data_affectation.push(item);
        var existe = false;

        switch (this.aff_reaf_des) {
          case 2:
            this.data_r_affectation.forEach(function (item_aff, index) {
              if (item_aff.id === item.id) {
                existe = true;
                return;
              }
            });
            item.nv_qt = this.value_quartier.map(function (a) {
              return a.id_qt;
            });
            if (!existe) this.data_r_affectation.push(item);
            break;

          case 3:
            this.data_d_affectation.forEach(function (item_aff, index) {
              if (item_aff.id === item.id) {
                _this9.data_d_affectation.splice(index, 1);
              }
            });
            break;
        }

        this.data_user.splice(this.data_user.indexOf(item), 1);
      }
    },
    clickRowAff: function clickRowAff(item) {
      var _this10 = this;

      this.data_user.push(item);

      switch (this.aff_reaf_des) {
        case 2:
          this.data_r_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              _this10.data_r_affectation.splice(index, 1);
            }
          });
          break;

        case 3:
          var existe = false;
          this.data_d_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          });
          if (!existe) this.data_d_affectation.push(item);
          break;
      }

      this.data_affectation.splice(this.data_affectation.indexOf(item), 1);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.hover_blue:hover {\n    background-color: #1867c0;\n}\n.hover_text_white:hover {\n    color: #fff;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    "v-container",
    { attrs: { fluid: "" } },
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { attrs: { cols: "6" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-toolbar",
                    {
                      attrs: {
                        color: _vm.aff_reaf_des === 3 ? "error" : "primary",
                        dark: ""
                      }
                    },
                    [
                      _c(
                        "span",
                        {
                          staticClass: "headline",
                          staticStyle: { color: "white" }
                        },
                        [_vm._v(_vm._s(_vm.titre_data_table))]
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-menu",
                        {
                          attrs: {
                            "offset-y": "",
                            transition: "scale-transition"
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "activator",
                              fn: function(ref) {
                                var on = ref.on
                                var attrs = ref.attrs
                                return [
                                  _c(
                                    "v-btn",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          attrs: {
                                            color: "white",
                                            outlined: ""
                                          }
                                        },
                                        "v-btn",
                                        attrs,
                                        false
                                      ),
                                      on
                                    ),
                                    [
                                      _vm._v(
                                        "\n                                Gérer\n                                "
                                      )
                                    ]
                                  )
                                ]
                              }
                            }
                          ])
                        },
                        [
                          _vm._v(" "),
                          _c(
                            "v-list",
                            [
                              _vm.aff_reaf_des !== 1
                                ? _c(
                                    "v-list-item",
                                    {
                                      staticClass: "hover_blue",
                                      on: {
                                        click: function($event) {
                                          return _vm.onclikGererAffDesRea(1)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "v-list-item-title",
                                        { staticClass: "hover_text_white" },
                                        [
                                          _c("v-icon", [_vm._v("mdi-send")]),
                                          _vm._v(" AFFECTATION")
                                        ],
                                        1
                                      )
                                    ],
                                    1
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.aff_reaf_des !== 2
                                ? _c(
                                    "v-list-item",
                                    {
                                      staticClass: "hover_blue",
                                      on: {
                                        click: function($event) {
                                          _vm.data_user = []
                                          _vm.onclikGererAffDesRea(2)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "v-list-item-title",
                                        { staticClass: "hover_text_white" },
                                        [
                                          _c("v-icon", [_vm._v("fa-share")]),
                                          _vm._v(" RÉAFFECTATION")
                                        ],
                                        1
                                      )
                                    ],
                                    1
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
                  ),
                  _vm._v(" "),
                  _vm.aff_reaf_des === 1
                    ? _c("v-text-field", {
                        attrs: {
                          loading: _vm.isLoadingRech,
                          clearable: "",
                          "append-icon": "mdi-magnify",
                          solo: "",
                          disabled: _vm.isLoadingRech,
                          label: "Rechercher un superviseur"
                        },
                        model: {
                          value: _vm.search,
                          callback: function($$v) {
                            _vm.search = $$v
                          },
                          expression: "search"
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.loading_data
                    ? _c("v-skeleton-loader", {
                        staticClass: "mx-auto",
                        attrs: { type: "card" }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  !_vm.loading_data && this.data_user.length > 0
                    ? _c("v-data-table", {
                        staticClass: "elevation-1",
                        attrs: {
                          headers: _vm.headers,
                          items: _vm.data_user,
                          "items-per-page": _vm.config.pagignate,
                          search: _vm.search,
                          "sort-by": "nom",
                          "hide-default-footer": ""
                        },
                        on: { "click:row": _vm.clickRow },
                        scopedSlots: _vm._u(
                          [
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
                                                      item.nom[0] +
                                                        "" +
                                                        item.nom[1]
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
                                                    "storage/photo/superviseur/" +
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
                                    _vm._v(
                                      "Aucun superviseur dans la base de données"
                                    )
                                  ])
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          false,
                          3240211032
                        )
                      })
                    : _vm._e()
                ],
                1
              ),
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
                                  "total-visible": 7,
                                  length: _vm.dernier_page
                                },
                                on: { input: _vm.getInfoUser },
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
              _vm.aff_reaf_des > 1 && _vm.data_user.length <= 0
                ? _c("div", [
                    _c("p", { staticClass: "headline mt-6" }, [
                      _vm._v(
                        "Liste vide! Choisissez les superviseur à " +
                          _vm._s(
                            _vm.aff_reaf_des === 2 ? "réaffecter" : "désafecter"
                          ) +
                          "."
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex justify-center " }, [
                      _c("img", { attrs: { src: "assets/empty_liste.png" } })
                    ])
                  ])
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "6" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-toolbar",
                    { attrs: { color: "orange acent-4", dark: "" } },
                    [
                      _c("span", { staticClass: "headline" }, [
                        _vm._v("Quartiers")
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("p", { staticClass: "headline" }, [
                    _vm._v("Choisir le(s) quartier(s)")
                  ]),
                  _vm._v(" "),
                  _c("v-select", {
                    attrs: {
                      items: _vm.data_quartier,
                      "return-object": "",
                      disabled: _vm.load_send || _vm.load_data_quartier,
                      loading: _vm.load_data_quartier,
                      error: _vm.errorBollean.quartier,
                      "error-messages": _vm.errorText.quartier,
                      "item-text": "lib",
                      chips: "",
                      label: "Liste des quartiers",
                      multiple: ""
                    },
                    on: {
                      click: function($event) {
                        return _vm.onclickQuartier()
                      },
                      change: function($event) {
                        return _vm.onchangeQuartier()
                      }
                    },
                    model: {
                      value: _vm.value_quartier,
                      callback: function($$v) {
                        _vm.value_quartier = $$v
                      },
                      expression: "value_quartier"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _vm.aff_reaf_des === 1 && _vm.data_affectation.length <= 0
                ? _c("div", [
                    _c("p", { staticClass: "text-h6 mt-6" }, [
                      _vm._v(
                        "Liste vide! Choisissez les superviseur à affecter au(x) quartier(s) sélectionné(s)"
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex justify-center " }, [
                      _c("img", { attrs: { src: "assets/empty_liste.png" } })
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("v-data-table", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.data_affectation.length > 0,
                    expression: "data_affectation.length > 0"
                  }
                ],
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headers,
                  items: _vm.data_affectation,
                  "aria-disabled": _vm.load_send,
                  "sort-by": "id",
                  "hide-default-footer": ""
                },
                on: { "click:row": _vm.clickRowAff },
                scopedSlots: _vm._u(
                  [
                    _vm.aff_reaf_des !== 1
                      ? {
                          key: "top",
                          fn: function() {
                            return [
                              _c(
                                "v-toolbar",
                                { attrs: { flat: "" } },
                                [
                                  _c("v-toolbar-title", [
                                    _vm._v(
                                      "Liste des superviseur " +
                                        _vm._s(
                                          _vm.value_quartier.length > 1
                                            ? " des quartiers"
                                            : "du quartier"
                                        ) +
                                        " sélectionné" +
                                        _vm._s(
                                          _vm.value_quartier.length > 1
                                            ? "s"
                                            : ""
                                        ) +
                                        ". "
                                    )
                                  ])
                                ],
                                1
                              )
                            ]
                          },
                          proxy: true
                        }
                      : null,
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
                                        { staticClass: "white--text headline" },
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
                                  _c("v-avatar", { attrs: { size: "36px" } }, [
                                    _c("img", {
                                      attrs: {
                                        alt: "Avatar",
                                        src:
                                          "storage/photo/superviseur/" +
                                          item.photo
                                      }
                                    })
                                  ])
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
                            _vm._v("Ce quartier n'a aucun superviseur")
                          ])
                        ]
                      },
                      proxy: true
                    }
                  ],
                  null,
                  true
                )
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm.data_affectation.length > 0 && _vm.aff_reaf_des === 1
            ? _c(
                "v-btn",
                {
                  staticClass: "mb-2",
                  attrs: {
                    color: "success",
                    dark: "",
                    fixed: "",
                    bottom: "",
                    right: "",
                    loading: _vm.load_send
                  },
                  on: { click: _vm.validerAffection }
                },
                [
                  _c("v-icon", [_vm._v("mdi-check")]),
                  _vm._v("\n            Valider l'affectation\n        ")
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.data_r_affectation.length > 0 && _vm.aff_reaf_des === 2
            ? _c(
                "v-btn",
                {
                  staticClass: "mb-2",
                  attrs: {
                    color: "purple",
                    dark: "",
                    fixed: "",
                    bottom: "",
                    right: "",
                    loading: _vm.load_send
                  },
                  on: {
                    click: function($event) {
                      _vm.dialog_options = true
                    }
                  }
                },
                [
                  _c("v-icon", [_vm._v("mdi-check")]),
                  _vm._v("\n            Valider réaffectation\n        ")
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.data_d_affectation.length > 0 && _vm.aff_reaf_des === 3
            ? _c(
                "v-btn",
                {
                  staticClass: "mb-2",
                  staticStyle: { "margin-left": "0px" },
                  attrs: {
                    color: "error",
                    dark: "",
                    fixed: "",
                    bottom: "",
                    loading: _vm.load_send
                  },
                  on: {
                    click: function($event) {
                      _vm.dialog_confirm = true
                    }
                  }
                },
                [
                  _c("v-icon", [_vm._v("mdi-check")]),
                  _vm._v("\n            Valider la désafectation\n        ")
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-snackbar",
            {
              attrs: {
                timeout: 5000,
                absolute: "",
                right: "",
                top: "",
                color: _vm.color_snack
              },
              model: {
                value: _vm.afficher_snackbar,
                callback: function($$v) {
                  _vm.afficher_snackbar = $$v
                },
                expression: "afficher_snackbar"
              }
            },
            [
              _vm._v(
                "\n            " + _vm._s(_vm.message_snackbar) + "\n        "
              )
            ]
          )
        ],
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
              attrs: { persistent: "", "max-width": "350" },
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
                      "\n                    Options de réacfectation\n                "
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
                            on: {
                              click: function($event) {
                                return _vm.validerReAffection(1)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Ajouter\n                            "
                            ),
                            _c("v-icon", { attrs: { dark: "", right: "" } }, [
                              _vm._v(
                                "\n                                mdi-plus\n                            "
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            staticClass: "ma-2",
                            attrs: { color: "red", dark: "" },
                            on: {
                              click: function($event) {
                                return _vm.afficherDialogAttention()
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Ecraser\n                            "
                            ),
                            _c("v-icon", { attrs: { dark: "", right: "" } }, [
                              _vm._v(
                                "\n                                mdi-pencil\n                            "
                              )
                            ])
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
                            "\n                        Sortir\n\n                    "
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
        "v-row",
        { attrs: { justify: "center" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "6é00" },
              model: {
                value: _vm.dialog_attention,
                callback: function($$v) {
                  _vm.dialog_attention = $$v
                },
                expression: "dialog_attention"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "text-justify" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.data_r_affectation.length > 1
                            ? "Attention les superviseur ne seront plus rattachés à un quartier "
                            : "Attention le superviseur ne sera plus rattaché à un quartier "
                        ) +
                        "\n                "
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
                            on: {
                              click: function($event) {
                                _vm.dialog_attention = false
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Annuler\n\n                        "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            staticClass: "ma-2",
                            attrs: { color: "red", dark: "" },
                            on: {
                              click: function($event) {
                                return _vm.validerReAffection(2)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Je confirme\n                            "
                            ),
                            _c("v-icon", { attrs: { dark: "", right: "" } }, [
                              _vm._v(
                                "\n                                mdi-pencil\n                            "
                              )
                            ])
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
                            "\n                        Sortir\n\n                    "
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
        "v-row",
        { attrs: { justify: "center" } },
        [
          _c(
            "v-dialog",
            {
              attrs: { persistent: "", "max-width": "400" },
              model: {
                value: _vm.dialog_confirm,
                callback: function($$v) {
                  _vm.dialog_confirm = $$v
                },
                expression: "dialog_confirm"
              }
            },
            [
              _c(
                "v-card",
                [
                  _c("v-card-title", { staticClass: "text-h6" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.data_d_affectation.length > 1
                            ? "Les superviseur"
                            : "Le superviseur"
                        ) +
                        " sélectionné" +
                        _vm._s(_vm.data_d_affectation.length > 1 ? "s" : "") +
                        "\n                    " +
                        _vm._s(
                          _vm.data_d_affectation.length > 1
                            ? "ne seront"
                            : "ne sera"
                        ) +
                        " plus affecté" +
                        _vm._s(_vm.data_d_affectation.length > 1 ? "s" : "") +
                        "\n                    à un quartier.\n                "
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
                            attrs: {
                              disabled: _vm.load_send,
                              color: "primary",
                              dark: ""
                            },
                            on: {
                              click: function($event) {
                                _vm.dialog_confirm = false
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Non anulé\n                            "
                            ),
                            _c("v-icon", { attrs: { dark: "", right: "" } }, [
                              _vm._v(
                                "\n                                mdi-check\n                            "
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "v-btn",
                          {
                            staticClass: "ma-2",
                            attrs: {
                              color: "error",
                              loading: _vm.load_send,
                              dark: ""
                            },
                            on: { click: _vm.validerDesafectation }
                          },
                          [
                            _vm._v(
                              "\n                            Oui validé\n                            "
                            ),
                            _c("v-icon", { attrs: { dark: "", right: "" } }, [
                              _vm._v(
                                "\n                                mdi-close\n                            "
                              )
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ])
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AffecterSuperviseurQuartier_vue_vue_type_template_id_f7e78bb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4& */ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4&");
/* harmony import */ var _AffecterSuperviseurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AffecterSuperviseurQuartier.vue?vue&type=script&lang=js& */ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AffecterSuperviseurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AffecterSuperviseurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AffecterSuperviseurQuartier_vue_vue_type_template_id_f7e78bb4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AffecterSuperviseurQuartier_vue_vue_type_template_id_f7e78bb4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterSuperviseurQuartier.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_template_id_f7e78bb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterSuperviseurQuartier.vue?vue&type=template&id=f7e78bb4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_template_id_f7e78bb4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterSuperviseurQuartier_vue_vue_type_template_id_f7e78bb4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);