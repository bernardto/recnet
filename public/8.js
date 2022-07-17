(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "AffecterCollecteurQuartier",
  props: {
    config: {},
    item: {}
  },
  mounted: function mounted() {
    this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES COLLECTEURS");
    if (this.$route.query.user) this.user = JSON.parse(this.$route.query.user);
    this.aff_reaf_des = 1;
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
      /*{ text: 'Quartier/Quartier', value: 'affectation' },*/
      ],
      headers2: [{
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
      }, {
        text: '',
        value: 'new'
      }
      /*{ text: 'Quartier/Quartier', value: 'affectation' },*/
      ],
      user: null,
      dialog_confirm: false,
      dialog_options: false,
      dialog_attention_reacffec: false,
      dialog_attention: false,
      load_data_quartier: false,
      checkboxnAss: false,
      loading_data: false,
      page: 1,
      dernier_page: 1,
      color_array: ['blue', 'cyan', 'green', 'orange', 'grey'],
      data_collecteur: [],
      data_affectation: [],
      data_n_affectation: [],
      data_r_affectation: [],
      data_d_affectation: [],
      value_rech_collecteur: [],
      data_rech_collecteur: [],
      isLoadingRech: false,
      search: "",
      aff_reaf_des: 3,
      value_add_ecraser: 0,
      //ajouter ou ecraser lors de l'affectation
      titre_data_table: '',
      data_quartier: [],
      value_quartier: [],

      /**/
      load_send: false,
      color_snack: 'primary',
      errorText: {
        quartier: '',
        '': false
      },
      message_snackbar: '',
      message_dialog_attention: "",
      afficher_snackbar: false,
      errorBollean: {
        quartier: false,
        zone: false
      }
    };
  },
  watch: {
    checkboxnAss: function checkboxnAss(val) {
      if (this.checkboxnAss) {
        this.getInfoCollNonAss();
      } else {
        this.getInfoUser();
      }
    },
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
    afficherDialogAttentionReaffectation: function afficherDialogAttentionReaffectation(val) {
      this.dialog_options = false;
      this.value_add_ecraser = val;

      if (val === 1) {
        if (this.data_affectation > 1) {
          this.message_dialog_attention = "Vous allez ajouter les quartier(s) sélectionné(s) aux affections des collecteurs";
        } else {
          this.message_dialog_attention = "Vous allez ajouter les quartier(s) sélectionné(s) aux affections du collecteur";
        }
      } else {
        if (this.data_affectation > 1) {
          this.message_dialog_attention = "Les collecteurs seront désormais affectés aux quartier(s) sélectionné(s)";
        } else {
          this.message_dialog_attention = "Le collecteur sera désormais affecté aux quartier(s) sélectionné(s)";
        }
      }

      this.dialog_attention_reacffec = true;
    },
    onclikGererAffDesRea: function onclikGererAffDesRea(val) {
      this.aff_reaf_des = val;

      switch (val) {
        case 1:
          this.data_affectation = [];
          this.getInfoUser();
          this.titre_data_table = "Liste des collecteurs.";
          this.$root.$emit('TITRE', "GESTION DE l'AFFECTATION DES COLLECTEURS");
          break;

        case 2:
          this.data_collecteur = [];
          this.data_r_affectation = [];
          this.data_affectation = [];
          this.titre_data_table = "Liste des collecteurs  à réaffecter";
          this.dernier_page = 0;
          this.$root.$emit('TITRE', "GESTION DE  LA REAFFECTATION DES COLLECTEURS");

          if (this.value_quartier.length <= 0) {
            this.errorText.quartier = "Vous devez choisir une quartier!";
            this.errorBollean.quartier = true;
          } else {
            this.getListeDesCollecteursQuartier();
          }

          break;

        case 3:
          this.titre_data_table = "Liste des collecteurs  à  désaffecter";
          this.$root.$emit('TITRE', "GESTION DE DESAFFECTATION DES COLLECTEURS");
          this.data_collecteur = [];
          this.data_d_affectation = [];
          this.data_affectation = [];
          this.dernier_page = 0;

          if (this.value_quartier.length <= 0) {
            this.errorText.quartier = "Vous devez choisir une quartier!";
            this.errorBollean.quartier = true;
          } else {
            this.getListeDesCollecteursQuartier();
          }

          break;
      }
    },
    remplirDataQuartier: function remplirDataQuartier() {
      var _this = this;

      axios.post('/get_tout_quartier_aff').then(function (response) {
        _this.data_quartier = response.data.data;
      })["catch"](function (error) {});
    },
    effacerDoublonReaffectation: function effacerDoublonReaffectation() {
      var _this2 = this;

      this.data_r_affectation.forEach(function (item, index) {
        item.nv_qt = _this2.value_quartier.map(function (a) {
          return a.id_qt;
        });
      });
      this.data_r_affectation.forEach(function (item, index) {
        item.id_qt.forEach(function (anc_qt, index1) {
          item.nv_qt.forEach(function (nv_qt, index2) {
            if (anc_qt === nv_qt) {
              item.nv_qt.splice(index2, 1);
              return;
            }
          });
        });

        if (item.nv_qt.length <= 0) {
          _this2.data_r_affectation.splice(index, 1);
        }
      });
    },

    /**
     * AJOUTER OU ECRASER LES DONNEES EXITANTS
     * @param add_ecra
     */
    validerReAffection: function validerReAffection(add_ecra) {
      var _this3 = this;

      this.dialog_options = false;
      this.dialog_attention = false;
      this.effacerDoublonReaffectation();
      this.afficher_snackbar = false;
      var data_a_envoyer = [];
      this.data_r_affectation.forEach(function (item, index1) {
        data_a_envoyer[index1] = {
          id: item.id,
          id_qt: item.nv_qt
        };
      });

      if (data_a_envoyer.length <= 0) {
        this.color_snack = 'red accent-4';
        this.message_snackbar = "Duplication de la quartier.";
        this.afficher_snackbar = true;
        this.load_send = false;
        return;
      }

      this.dialog_attention_reacffec = false;
      this.load_send = true;
      axios.post('/valider_reaffection_collecteur_quartier', {
        data_coll: data_a_envoyer,
        add_ecra: add_ecra
      }).then(function (response) {
        if (response.data.success) {
          _this3.load_send = false;
          _this3.data_affectation = [];
          _this3.data_r_affectation = [];
          _this3.data_affectation = [];
          _this3.color_snack = 'deep-purple accent-4';
          _this3.message_snackbar = "La réaffectation a été effectué.";
          _this3.afficher_snackbar = true;

          _this3.getListeDesCollecteursQuartier();
        }
      })["catch"](function (error) {});
    },
    validerDesaffectation: function validerDesaffectation() {
      var _this4 = this;

      this.load_send = true;
      axios.post('/valider_desaffection_collecteur_quartier', {
        data_coll: this.data_d_affectation.map(function (a) {
          return a.id;
        }),
        id_qt: this.value_quartier.map(function (a) {
          return a.id_qt;
        })
      }).then(function (response) {
        _this4.dialog_confirm = false;

        if (response.data.success) {
          _this4.load_send = false;
          _this4.data_d_affectation = [];
          _this4.data_affectation = [];
          _this4.data_collecteur = [];
          _this4.color_snack = 'grey darken-4';
          _this4.message_snackbar = "La désaffectation a été effectué.";
          _this4.afficher_snackbar = true;
        }
      })["catch"](function (error) {});
    },
    validerAffection: function validerAffection() {
      var _this5 = this;

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
          _this5.load_send = false;
          _this5.data_affectation = [];

          _this5.getInfoUser();

          _this5.color_snack = 'primary';
          _this5.message_snackbar = "L'affectation a été effectué.";
          _this5.afficher_snackbar = true;
        }
      })["catch"](function (error) {});
    },
    onchangeQuartier: function onchangeQuartier() {
      var _this6 = this;

      if (this.value_quartier.length <= 0) {
        this.errorText.quartier = "Vous devez choisir une quartier!";
        this.errorBollean.quartier = true;

        if (this.aff_reaf_des > 1) {
          this.data_affectation = [];
        }
      } else {
        this.errorText.quartier = "";
        this.errorBollean.quartier = false;
        if (this.aff_reaf_des > 1) this.getListeDesCollecteursQuartier();else {
          this.data_affectation.forEach(function (item_aff, index) {
            if (_this6.verifierEstDejaAttribueCollecteur(item_aff)) {
              _this6.data_affectation.splice(_this6.data_affectation.indexOf(item_aff), 1);

              _this6.data_collecteur.push(item_aff);
            }
          });
        }
      }
    },
    onclickQuartier: function onclickQuartier() {},
    getListeDesCollecteursQuartier: function getListeDesCollecteursQuartier() {
      var _this7 = this;

      if (this.value_quartier.length <= 0) return;
      this.load_data_quartier = true;
      axios.post('/get_collecteur_du_quartier', {
        id_qt: this.value_quartier.map(function (a) {
          return a.id_qt;
        })
      }).then(function (response) {
        _this7.data_affectation = [];
        _this7.data_r_affectation = [];
        response.data.data.forEach(function (item, index) {
          //existe dans la table liste des collecteurs de la quartier
          var existe = false;

          _this7.data_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          }); //existe dans la table liste des collecteurs à affecter


          var existe_user = false;

          _this7.data_collecteur.forEach(function (item_user, index) {
            if (item_user.id === item.id) {
              existe_user = true;
              return;
            }
          });

          if (item.photo === 'Aucune') {
            item.couleur = _this7.color_array[_this7.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          item.id_qt = item.id_qt.map(function (a) {
            return a.id_qt;
          }); //On vérifie qu'il n'existe pas dans la table des collecteurs à affecter ou réaffecter

          if (!existe && !existe_user) _this7.data_affectation.push(item);
        });
        _this7.load_data_quartier = false;
      })["catch"](function (error) {});
    },
    getRandomInt: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    getInfoUser: function getInfoUser() {
      var _this8 = this;

      this.loading_data = true;
      axios.post('/get_info_coll', {
        data: JSON.stringify(this.user),
        page: this.page
      }).then(function (response) {
        _this8.loading_data = false;
        var data = null;
        if (!_this8.user) data = response.data.data.data;else data = response.data.data;
        _this8.data_collecteur = [];
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
          item.id_qt = item.id_qt.map(function (a) {
            return a.id_qt;
          });
          item.id_zn = null;

          if (!existe) {
            _this8.data_collecteur.push(item);
          }
        });

        if (!_this8.user) {
          _this8.dernier_page = response.data.data.last_page;
          _this8.page = response.data.data.current_page;
        }
      })["catch"](function (error) {});
    },
    getInfoCollNonAss: function getInfoCollNonAss() {
      var _this9 = this;

      this.loading_data = true;
      axios.post('/get_coll_non_ass_quartier').then(function (response) {
        _this9.loading_data = false;
        var data = null;
        if (!_this9.user) data = response.data.data.data;else data = response.data.data;
        _this9.data_collecteur = [];
        data.forEach(function (item, index) {
          var existe = false;

          _this9.data_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          });

          if (item.photo === 'Aucune') {
            item.couleur = _this9.color_array[_this9.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          item.select = false;
          if (!existe) _this9.data_collecteur.push(item);
        });

        if (!_this9.user) {
          _this9.dernier_page = response.data.data.last_page;
          _this9.page = response.data.data.current_page;
        }
      })["catch"](function (error) {});
    },
    getInfoQuartier: function getInfoQuartier() {
      var _this10 = this;

      axios.post('/get_info_quartier', {
        data: JSON.stringify(this.user)
      }).then(function (response) {
        var data = response.data.data;
        _this10.data_collecteur = [];
        data.forEach(function (item, index) {
          if (item.photo === 'Aucune') {
            item.couleur = _this10.color_array[_this10.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          _this10.data_collecteur.push(item);
        });
      })["catch"](function (error) {});
    },
    onselectAutoComplete: function onselectAutoComplete() {
      console.log("sds");
    },
    searchCollecteur: function searchCollecteur() {
      var _this11 = this;

      if (this.search.length < 3) {
        this.color_snack = 'red accent-4';
        this.message_snackbar = "Le champ de recherche est trop court";
        this.afficher_snackbar = true;
        return;
      }

      this.loading_data = true;
      this.data_rech_collecteur = [];
      axios.post('/rechercher_collecteur', {
        search: this.search
      }).then(function (response) {
        /*response.data.data.forEach((item, index) => {
              item.fic = item.nom + "("+ item.identifiant+ ")";
            this.data_rech_collecteur.push(item)
         });*/
        _this11.loading_data = false;
        var data = null;
        data = response.data.data;
        _this11.data_collecteur = [];
        data.forEach(function (item, index) {
          var existe = false;

          _this11.data_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              existe = true;
              return;
            }
          });

          if (item.photo === 'Aucune') {
            item.couleur = _this11.color_array[_this11.getRandomInt(5)];
          }

          if (item.sex === 'H') {
            item.sex = 'HOMME';
          } else {
            item.sex = 'FEMME';
          }

          item.select = false;
          if (!existe) _this11.data_collecteur.push(item);
        });
        _this11.dernier_page = 1;
      })["catch"](function (error) {});
    },
    verifierEstDejaAttribueCollecteur: function verifierEstDejaAttribueCollecteur(item) {
      var nv_qt = this.value_quartier.map(function (a) {
        return a.id_qt;
      });
      var a_deja_quartier = 0;
      item.id_qt.forEach(function (anc_qt, index1) {
        nv_qt.forEach(function (nv_qt, index2) {
          if (anc_qt === nv_qt) {
            a_deja_quartier++;
          }
        });
      });
      console.log(a_deja_quartier + "===" + this.value_quartier.length);
      return a_deja_quartier === this.value_quartier.length;
    },
    clickRow: function clickRow(item) {
      var _this12 = this;

      if (this.value_quartier.length <= 0 && this.aff_reaf_des <= 2) {
        this.errorText.quartier = "Vous devez choisir une quartier!";
        this.errorBollean.quartier = true;
      } else {
        this.errorText.quartier = "";
        this.errorBollean.quartier = false; //  this.data_n_affectation.push(item);

        var existe = false;

        switch (this.aff_reaf_des) {
          case 1:
            if (this.verifierEstDejaAttribueCollecteur(item)) {
              this.erreurAlert();
            } else this.affecterCollecteur(item);

            break;

          case 2:
            if (this.verifierEstDejaAttribueCollecteur(item)) {
              item["new"] = null;
            } else item["new"] = "red";

            this.data_r_affectation.forEach(function (item_aff, index) {
              if (item_aff.id === item.id) {
                existe = true;
                return;
              }
            });

            if (!existe && item["new"]) {
              item.nv_qt = this.value_quartier.map(function (a) {
                return a.id_qt;
              });
              this.data_r_affectation.push(item);
              this.affecterCollecteur(item);
            } else this.erreurAlert();

            break;

          case 3:
            this.data_d_affectation.forEach(function (item_aff, index) {
              if (item_aff.id === item.id) {
                _this12.data_d_affectation.splice(index, 1);

                _this12.affecterCollecteur(item);
              }
            });
            break;
        }
      }
    },
    affecterCollecteur: function affecterCollecteur(item) {
      this.data_affectation.push(item);
      this.data_collecteur.splice(this.data_collecteur.indexOf(item), 1);
    },
    erreurAlert: function erreurAlert() {
      var message = "";
      if (this.value_quartier.length > 1) message = "Ce collecteur est déjà attribué aux quartiers sélectionnés";else message = "Ce collecteur est déjà attribué à ce quartier sélectionné";
      this.color_snack = 'red darken-4';
      this.message_snackbar = message;
      this.afficher_snackbar = true;
    },
    clickRowAff: function clickRowAff(item) {
      var _this13 = this;

      this.data_collecteur.push(item);

      switch (this.aff_reaf_des) {
        case 2:
          this.data_r_affectation.forEach(function (item_aff, index) {
            if (item_aff.id === item.id) {
              _this13.data_r_affectation.splice(index, 1);
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.perso_ch label{\n    font-size: 25px;\n}\n.hover_blue:hover {\n    background-color: #1867c0;\n}\n.hover_text_white:hover {\n    color: #fff;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    "v-card",
    {
      attrs: {
        fluid: "",
        disabled: _vm.load_send || _vm.loading_data || _vm.load_data_quartier
      }
    },
    [
      _c(
        "v-row",
        { attrs: { fluid: "" } },
        [
          _c(
            "v-col",
            { attrs: { cols: "6" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    depressed: "",
                    outlined: _vm.aff_reaf_des === 1,
                    color: "primary",
                    large: ""
                  },
                  on: {
                    click: function($event) {
                      return _vm.onclikGererAffDesRea(1)
                    }
                  }
                },
                [
                  _c("v-icon", [_vm._v("mdi-send")]),
                  _vm._v("  AFFECTATION\n            ")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    depressed: "",
                    large: "",
                    outlined: _vm.aff_reaf_des === 2,
                    color: "orange"
                  },
                  on: {
                    click: function($event) {
                      return _vm.onclikGererAffDesRea(2)
                    }
                  }
                },
                [
                  _c("v-icon", [_vm._v("fa-share")]),
                  _vm._v("   REAFFECTATION\n            ")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    depressed: "",
                    large: "",
                    outlined: _vm.aff_reaf_des === 3,
                    color: "error"
                  },
                  on: {
                    click: function($event) {
                      return _vm.onclikGererAffDesRea(3)
                    }
                  }
                },
                [
                  _c("v-icon", [_vm._v("mdi-close")]),
                  _vm._v("   désaffectation\n            ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "6" } },
            [
              _vm.aff_reaf_des === 1
                ? _c("v-checkbox", {
                    staticClass: "perso_ch",
                    attrs: {
                      label: "Collecteurs qui n'ont pas de quartier",
                      color: "primary",
                      value: "red"
                    },
                    on: { change: function($event) {} },
                    model: {
                      value: _vm.checkboxnAss,
                      callback: function($$v) {
                        _vm.checkboxnAss = $$v
                      },
                      expression: "checkboxnAss"
                    }
                  })
                : _vm._e()
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
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
                                          _vm.data_collecteur = []
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
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.aff_reaf_des !== 3
                                ? _c(
                                    "v-list-item",
                                    {
                                      staticClass: "hover_blue",
                                      on: {
                                        click: function($event) {
                                          return _vm.onclikGererAffDesRea(3)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "v-list-item-title",
                                        { staticClass: "hover_text_white" },
                                        [
                                          _c("v-icon", [_vm._v("mdi-close")]),
                                          _vm._v(" DÉSAFFECTATION")
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
                          label: "Rechercher un collecteur"
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
                  !_vm.loading_data && this.data_collecteur.length > 0
                    ? _c("v-data-table", {
                        staticClass: "elevation-1",
                        attrs: {
                          headers: _vm.headers,
                          items: _vm.data_collecteur,
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
                                    _vm._v(
                                      "Aucun collecteur dans la base de donnés"
                                    )
                                  ])
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          false,
                          3819478045
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
              _vm.aff_reaf_des > 1 && _vm.data_collecteur.length <= 0
                ? _c("div", [
                    _c("p", { staticClass: "headline mt-6" }, [
                      _vm._v(
                        "Liste vide! Choisissez les collecteurs à " +
                          _vm._s(
                            _vm.aff_reaf_des === 2
                              ? "réaffecter"
                              : "désaffecter"
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
                      multiple: "",
                      items: _vm.data_quartier,
                      "return-object": "",
                      disabled: _vm.load_send || _vm.load_data_quartier,
                      loading: _vm.load_data_quartier,
                      error: _vm.errorBollean.quartier,
                      "error-messages": _vm.errorText.quartier,
                      "item-text": "lib",
                      chips: "",
                      label: "Liste des quartiers"
                    },
                    on: {
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
                        "Liste vide! Choisissez les collecteurs à affecter au(x) quartier(s) sélectionné(s)"
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
                    value:
                      _vm.data_affectation.length > 0 &&
                      !_vm.load_data_quartier,
                    expression:
                      "data_affectation.length > 0 && !load_data_quartier"
                  }
                ],
                staticClass: "elevation-1",
                attrs: {
                  headers: _vm.headers2,
                  items: _vm.data_affectation,
                  "aria-disabled": _vm.load_send || _vm.load_data_quartier,
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
                                  _c(
                                    "v-toolbar-title",
                                    { staticClass: "font-weight-black" },
                                    [
                                      _vm._v(
                                        "Liste des collecteurs " +
                                          _vm._s(
                                            _vm.value_quartier.length > 1
                                              ? " affectés aux  quartiers"
                                              : "affecté à la quartier"
                                          ) +
                                          " sélectionné" +
                                          _vm._s(
                                            _vm.value_quartier.length > 1
                                              ? "s"
                                              : ""
                                          ) +
                                          ". "
                                      )
                                    ]
                                  )
                                ],
                                1
                              )
                            ]
                          },
                          proxy: true
                        }
                      : null,
                    {
                      key: "item.new",
                      fn: function(ref) {
                        var item = ref.item
                        return [
                          _c(
                            "v-chip",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: item.new,
                                  expression: "item.new"
                                }
                              ],
                              attrs: { color: item.new, dark: "" }
                            },
                            [
                              _vm._v(
                                "\n                        nouvelle affectation\n                    "
                              )
                            ]
                          )
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
                                          "storage/photo/collecteur/" +
                                          item.photo
                                      }
                                    })
                                  ])
                                ],
                                1
                              )
                        ]
                      }
                    }
                  ],
                  null,
                  true
                )
              }),
              _vm._v(" "),
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value:
                        _vm.value_quartier.length > 0 &&
                        _vm.aff_reaf_des > 1 &&
                        _vm.data_affectation.length <= 0,
                      expression:
                        "value_quartier.length > 0 && aff_reaf_des > 1 && data_affectation.length <= 0"
                    }
                  ]
                },
                [
                  _c("p", { staticClass: "headline font-weight-black" }, [
                    _vm._v(
                      "Aucun collecteur est affecté à " +
                        _vm._s(
                          _vm.value_quartier.length > 1
                            ? "ces (" +
                                _vm.value_quartier.length +
                                "  quartier )"
                            : "ce quartier "
                        )
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex justify-center " }, [
                    _c("img", { attrs: { src: "assets/pas_trouve.png" } })
                  ])
                ]
              )
            ],
            1
          ),
          _vm._v(" "),
          _vm.data_affectation.length > 0 &&
          _vm.aff_reaf_des === 1 &&
          _vm.value_quartier.length > 0
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
          _vm.data_r_affectation.length > 0 &&
          _vm.aff_reaf_des === 2 &&
          _vm.value_quartier.length > 0
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
                  _vm._v("\n            Valider la désaffectation\n        ")
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
              attrs: { persistent: "", "max-width": "500" },
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
                      "\n                    Options de reaffectation\n                "
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
                                return _vm.afficherDialogAttentionReaffectation(
                                  1
                                )
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Ajouter aux quartier(s) existante(s)\n                            "
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
                                return _vm.afficherDialogAttentionReaffectation(
                                  2
                                )
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Ecraser les ancienne(s)  quartier(s)\n                            "
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
              attrs: { persistent: "", "max-width": "600" },
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
                  _c("v-card-title", { staticClass: "headline" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.data_r_affectation.length > 1
                            ? "Attention les collecteurs ne seront plus rattachés à une quartier "
                            : "Attention le collecteur ne sera plus rattaché à une quartier "
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
                            ? "Les collecteurs"
                            : "Le collecteur"
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
                        "\n                    " +
                        _vm._s(
                          _vm.value_quartier.length <= 1
                            ? "à  la quartier selectionné"
                            : "aux quartiers selectionnés"
                        ) +
                        ".\n                "
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
                            on: { click: _vm.validerDesaffectation }
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
      ),
      _vm._v(" "),
      _c(
        "v-row",
        { attrs: { justify: "center" } },
        [
          [
            _c(
              "v-row",
              { attrs: { justify: "center" } },
              [
                _c(
                  "v-dialog",
                  {
                    attrs: { persistent: "", "max-width": "490" },
                    model: {
                      value: _vm.dialog_attention_reacffec,
                      callback: function($$v) {
                        _vm.dialog_attention_reacffec = $$v
                      },
                      expression: "dialog_attention_reacffec"
                    }
                  },
                  [
                    _c(
                      "v-card",
                      [
                        _c("v-card-title", { staticClass: "text-h3" }, [
                          _vm._v(
                            "\n                            Attention\n                        "
                          )
                        ]),
                        _vm._v(" "),
                        _c("v-card-text", { staticClass: "text-md-h4" }, [
                          _vm._v(_vm._s(_vm.message_dialog_attention))
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
                                attrs: { color: "blue darken-1", text: "" },
                                on: {
                                  click: function($event) {
                                    _vm.dialog_attention_reacffec = false
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                NON SORTIR\n                            "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "v-btn",
                              {
                                attrs: { color: "red darken-1", text: "" },
                                on: {
                                  click: function($event) {
                                    return _vm.validerReAffection(
                                      _vm.value_add_ecraser
                                    )
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n                                OUI CONFIRMER\n                            "
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
            )
          ]
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AffecterCollecteurQuartier_vue_vue_type_template_id_13e34fa6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6& */ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6&");
/* harmony import */ var _AffecterCollecteurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AffecterCollecteurQuartier.vue?vue&type=script&lang=js& */ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AffecterCollecteurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AffecterCollecteurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AffecterCollecteurQuartier_vue_vue_type_template_id_13e34fa6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AffecterCollecteurQuartier_vue_vue_type_template_id_13e34fa6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Collecteur/AffecterCollecteurQuartier.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterCollecteurQuartier.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_template_id_13e34fa6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/AffecterCollecteurQuartier.vue?vue&type=template&id=13e34fa6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_template_id_13e34fa6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AffecterCollecteurQuartier_vue_vue_type_template_id_13e34fa6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);