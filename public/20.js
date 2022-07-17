(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accueil.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Accueil.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.size_card = window.innerWidth;
    this.$root.$emit('TITRE', "ACCUEIL");
  },
  data: function data() {
    return {
      isMobile: false,
      size_card: 900,
      data_card: [{
        nom: 'Contribuables',
        id: 1,
        lien: 'contribuable',
        image: 'market'
      }, {
        nom: 'Collecteurs',
        id: 3,
        lien: 'collecteur',
        image: 'user'
      }, {
        nom: 'Superviseurs',
        id: 2,
        lien: 'superviseur',
        image: 'superviseur'
      }, {
        nom: 'Versement Recette',
        id: 4,
        lien: 'versement',
        image: 'versement'
      }, {
        nom: 'Recouvrement',
        id: 5,
        lien: 'recouvrement',
        image: 'recouvrement'
      }, {
        nom: 'Quartiers',
        id: 6,
        lien: 'quartier',
        image: 'maps'
      }, {
        nom: 'Taxes',
        id: 7,
        lien: 'taxes',
        image: 'taxes'
      }, // {nom : 'Tickets', id: 8 , lien :  'ticket', image :  'ticket'},
      //{nom : 'Odres /Déclaratin de Recette', id: 9 , lien :  'odre_recette', image :  'declarer_recette'},
      {
        nom: 'Comptes Budgétaire',
        id: 10,
        lien: 'compte_fonc',
        image: 'compte_fonc'
      }, {
        nom: 'Paramètres',
        id: 11,
        lien: 'parametre',
        image: 'para'
      }],
      cols: 4,
      lien_site: location.protocol + '//' + location.host
    };
  },
  methods: {
    router: function router(id) {
      this.$router.push({
        path: id.lien
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accueil.vue?vue&type=template&id=23083719&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Accueil.vue?vue&type=template&id=23083719& ***!
  \**********************************************************************************************************************************************************************************************************/
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
    { staticClass: "fill-height", attrs: { fluid: "" } },
    [
      _c(
        "v-row",
        { attrs: { align: "center", justify: "center" } },
        [
          _c(
            "v-col",
            { attrs: { cols: "12", sm: "12" } },
            [
              _c(
                "v-card",
                {
                  staticClass: "mx-auto",
                  staticStyle: { padding: "20px" },
                  attrs: {
                    "max-width": _vm.size_card,
                    outlined: "",
                    elevation: "1"
                  }
                },
                [
                  _c(
                    "v-row",
                    _vm._l(_vm.data_card, function(item) {
                      return _c(
                        "v-col",
                        {
                          key: item.id,
                          attrs: { cols: _vm.cols, md: _vm.cols }
                        },
                        [
                          _c("v-hover", {
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(ref) {
                                    var hover = ref.hover
                                    return [
                                      _c(
                                        "v-card",
                                        {
                                          staticClass: "ma-2",
                                          attrs: {
                                            color: "grey darken-1",
                                            "max-width": "200",
                                            color: hover
                                              ? "primary"
                                              : "grey darken-1",
                                            height: "225"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.router(item)
                                            }
                                          }
                                        },
                                        [
                                          _c(
                                            "v-container",
                                            [
                                              _c(
                                                "v-row",
                                                [
                                                  _c(
                                                    "v-col",
                                                    { attrs: { cols: "auto" } },
                                                    [
                                                      _c("v-img", {
                                                        attrs: {
                                                          height: "100",
                                                          width: "100",
                                                          src:
                                                            "./assets/" +
                                                            item.image +
                                                            ".png"
                                                        }
                                                      }),
                                                      _vm._v(" "),
                                                      _c(
                                                        "p",
                                                        {
                                                          staticClass:
                                                            "headline mt-3"
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(item.nom)
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
                                  }
                                }
                              ],
                              null,
                              true
                            )
                          })
                        ],
                        1
                      )
                    }),
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

/***/ "./resources/js/components/Accueil.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Accueil.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Accueil_vue_vue_type_template_id_23083719___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Accueil.vue?vue&type=template&id=23083719& */ "./resources/js/components/Accueil.vue?vue&type=template&id=23083719&");
/* harmony import */ var _Accueil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Accueil.vue?vue&type=script&lang=js& */ "./resources/js/components/Accueil.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Accueil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Accueil_vue_vue_type_template_id_23083719___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Accueil_vue_vue_type_template_id_23083719___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Accueil.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Accueil.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Accueil.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Accueil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Accueil.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accueil.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Accueil_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Accueil.vue?vue&type=template&id=23083719&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Accueil.vue?vue&type=template&id=23083719& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Accueil_vue_vue_type_template_id_23083719___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Accueil.vue?vue&type=template&id=23083719& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Accueil.vue?vue&type=template&id=23083719&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Accueil_vue_vue_type_template_id_23083719___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Accueil_vue_vue_type_template_id_23083719___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);