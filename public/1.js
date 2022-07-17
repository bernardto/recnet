(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      menu2: false,
      items: [{
        text: 'Gestion des collecteurs',
        id: 1,
        disabled: false
      }, {
        text: 'Fiche du collecteur',
        id: 2,
        disabled: true
      }]
    };
  },
  props: ['item'],
  mounted: function mounted() {
    this.$root.$emit('TITRE', "FICHE DU COLLECTEUR");
  },
  methods: {
    clickBr: function clickBr(val) {
      this.$root.$emit('close_fiche');
      this.$root.$emit('TITRE', "GESTION DES COLLECTEURS");
    }
  },
  name: "FicheCollecteur"
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true& ***!
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
      _c("v-breadcrumbs", {
        attrs: { items: _vm.items },
        scopedSlots: _vm._u([
          {
            key: "item",
            fn: function(ref) {
              var item = ref.item
              return [
                _c(
                  "v-breadcrumbs-item",
                  {
                    attrs: { disabled: item.disabled },
                    on: {
                      click: function($event) {
                        return _vm.clickBr(item)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(item.text) +
                        "\n                "
                    )
                  ]
                )
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "v-card",
        {
          staticStyle: { padding: "10px", "margin-top": "20px" },
          attrs: { elevation: "3", outlined: "" }
        },
        [
          _c(
            "v-row",
            [
              _c("v-col", { attrs: { cols: "4" } }, [
                _c("div", [
                  _vm.item.photo === "Aucune"
                    ? _c(
                        "div",
                        [
                          _c(
                            "v-avatar",
                            {
                              attrs: { size: "128px", color: _vm.item.couleur }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "white--text headline" },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.item.nom[0] + "" + _vm.item.nom[1]
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
                            { attrs: { size: "128px", tile: "" } },
                            [
                              _c("img", {
                                attrs: {
                                  alt: "Avatar",
                                  src:
                                    "/storage/photo/collecteur/" +
                                    _vm.item.photo
                                }
                              })
                            ]
                          )
                        ],
                        1
                      )
                ])
              ])
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
                  _c("v-text-field", {
                    attrs: { readonly: "", label: "Nom", required: "" },
                    model: {
                      value: _vm.item.nom,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "nom", $$v)
                      },
                      expression: "item.nom"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c("v-text-field", {
                    attrs: { readonly: "", label: "Prenom", required: "" },
                    model: {
                      value: _vm.item.prenom,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "prenom", $$v)
                      },
                      expression: "item.prenom"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c(
                    "v-radio-group",
                    {
                      attrs: { readonly: "", row: "" },
                      model: {
                        value: _vm.item.genre,
                        callback: function($$v) {
                          _vm.$set(_vm.item, "genre", $$v)
                        },
                        expression: "item.genre"
                      }
                    },
                    [
                      _c("v-radio", {
                        attrs: {
                          color: "orange accent-4",
                          label: "Homme",
                          value: "H"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-radio", {
                        attrs: {
                          color: "orange accent-4",
                          label: "Femme",
                          value: "F"
                        }
                      })
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
                  _c(
                    "v-menu",
                    {
                      ref: "menu",
                      attrs: {
                        "close-on-content-click": false,
                        "return-value": _vm.item.date_naissance,
                        transition: "scale-transition",
                        "offset-y": "",
                        "min-width": "290px"
                      },
                      on: {
                        "update:returnValue": function($event) {
                          return _vm.$set(_vm.item, "date_naissance", $event)
                        },
                        "update:return-value": function($event) {
                          return _vm.$set(_vm.item, "date_naissance", $event)
                        }
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "activator",
                          fn: function(ref) {
                            var on = ref.on
                            var attrs = ref.attrs
                            return [
                              _c(
                                "v-text-field",
                                _vm._g(
                                  _vm._b(
                                    {
                                      attrs: {
                                        readonly: "",
                                        label: "Date de naissance",
                                        "prepend-icon": "mdi-calendar",
                                        readonly: ""
                                      },
                                      model: {
                                        value: _vm.item.date_naissance,
                                        callback: function($$v) {
                                          _vm.$set(
                                            _vm.item,
                                            "date_naissance",
                                            $$v
                                          )
                                        },
                                        expression: "item.date_naissance"
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
                      ]),
                      model: {
                        value: _vm.menu2,
                        callback: function($$v) {
                          _vm.menu2 = $$v
                        },
                        expression: "menu2"
                      }
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "v-date-picker",
                        {
                          attrs: {
                            "no-title": "",
                            max: new Date().toISOString().substr(0, 10),
                            locale: "fr-fr",
                            scrollable: ""
                          },
                          model: {
                            value: _vm.item.date_naissance,
                            callback: function($$v) {
                              _vm.$set(_vm.item, "date_naissance", $$v)
                            },
                            expression: "item.date_naissance"
                          }
                        },
                        [
                          _c("v-spacer"),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "primary" },
                              on: {
                                click: function($event) {
                                  _vm.menu2 = false
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                    Sortir\n                                "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              attrs: { text: "", color: "primary" },
                              on: {
                                click: function($event) {
                                  return _vm.$refs.menu.save(
                                    _vm.item.date_naissance
                                  )
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                                    OK\n                                "
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
                { attrs: { cols: "6" } },
                [
                  _c("v-text-field", {
                    attrs: { readonly: "", label: "Email", required: "" },
                    model: {
                      value: _vm.item.email,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "email", $$v)
                      },
                      expression: "item.email"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c("v-text-field", {
                    attrs: { readonly: "", label: "Numéro", required: "" },
                    model: {
                      value: _vm.item.numero,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "numero", $$v)
                      },
                      expression: "item.numero"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      readonly: "",
                      label: "Identifiant/Matricule",
                      required: ""
                    },
                    model: {
                      value: _vm.item.identifiant,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "identifiant", $$v)
                      },
                      expression: "item.identifiant"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "6" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      readonly: "",
                      label: "Numéro de la carte d'identité ",
                      required: ""
                    },
                    model: {
                      value: _vm.item.num_cni,
                      callback: function($$v) {
                        _vm.$set(_vm.item, "num_cni", $$v)
                      },
                      expression: "item.num_cni"
                    }
                  })
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
              _c(
                "v-row",
                [
                  _c("v-col", { attrs: { cols: "5" } }),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "7" } },
                    [
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "red lighten-4" },
                          on: {
                            click: function($event) {
                              return _vm.clickBr(null)
                            }
                          }
                        },
                        [
                          _c("v-icon", [_vm._v("mdi-close")]),
                          _vm._v(" Fermer\n                            ")
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
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Collecteur/FicheCollecteur.vue":
/*!****************************************************************!*\
  !*** ./resources/js/components/Collecteur/FicheCollecteur.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FicheCollecteur_vue_vue_type_template_id_4bd32dee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true& */ "./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true&");
/* harmony import */ var _FicheCollecteur_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FicheCollecteur.vue?vue&type=script&lang=js& */ "./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FicheCollecteur_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FicheCollecteur_vue_vue_type_template_id_4bd32dee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FicheCollecteur_vue_vue_type_template_id_4bd32dee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4bd32dee",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Collecteur/FicheCollecteur.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FicheCollecteur_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./FicheCollecteur.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FicheCollecteur_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FicheCollecteur_vue_vue_type_template_id_4bd32dee_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Collecteur/FicheCollecteur.vue?vue&type=template&id=4bd32dee&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FicheCollecteur_vue_vue_type_template_id_4bd32dee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FicheCollecteur_vue_vue_type_template_id_4bd32dee_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);