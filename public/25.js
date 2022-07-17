(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Quiz.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Quiz.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.getQuiz();
  },
  data: function data() {
    return {
      show: false,
      loading: false,
      true_fasle: null,
      text_correction: "",
      single_choice: null,
      juste: -1,
      id_quiz: 1,
      data_quiz: {},
      data_propo: [],
      index_rev: 0,
      data_rev: [471, 473, 474, 478, 480, 484, 486, 487, 3, 17, 22, 34, 68, 73, 84, 89, 91, 93, 97, 105, 106, 109, 110, 251, 253, 255, 257, 264, 265, 266, 267, 268, 269, 270, 272, 274, 275, 289, 290, 291, 292, 293, 295, 307, 313, 315, 353, 355, 357, 358, 359, 360, 361, 362, 366, 367, 368, 369, 370, 371, 372, 374, 377, 380, 381, 385, 386, 387, 389, 392, 395, 397, 401, 403, 409, 410, 413, 414, 415, 420, 421],
      color_array: ['blue', 'cyan', 'green', 'orange', 'grey']
    };
  },
  watch: {
    index_rev: function index_rev(before, after) {
      if (after <= 128 && after >= 0) {
        this.getQuiz();
      }
    }
  },
  methods: {
    getRandomInt: function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    valider: function valider() {
      var _this = this;

      var bon_resp = this.data_quiz.reponse;

      if (this.data_quiz.type === 1) {
        var ma_preponse = this.true_fasle;

        if (ma_preponse === 0 && bon_resp === "T") {
          this.juste = 1;
          this.text_correction = "Bonne réponse: => " + bon_resp;
          return;
        }

        if (ma_preponse === 1 && bon_resp === "F") {
          this.juste = 1;
          this.text_correction = "Bonne réponse: => " + bon_resp;
          return;
        }

        this.juste = 0;
        this.text_correction = "Mauvaise  réponse (--) La Bonne réponse est   => " + bon_resp;
      } else if (this.data_quiz.type === 2) {
        var _ma_preponse = this.getLettreSelection(this.single_choice);

        if (_ma_preponse === bon_resp) {
          this.juste = 1;
          this.text_correction = "Bonne réponse: => " + bon_resp;
        } else {
          this.juste = 0;
          this.text_correction = "Mauvaise  réponse (--) La Bonne réponse est   => " + bon_resp;
        }
      } else if (this.data_quiz.type === 3) {
        var _ma_preponse2 = "";
        this.data_propo.forEach(function (item, index) {
          if (item.checked) {
            _ma_preponse2 = _ma_preponse2 + _this.getLettreSelection(index);
          }
        });

        if (_ma_preponse2 === bon_resp) {
          this.juste = 1;
          this.text_correction = "Bonne réponse: => " + bon_resp;
        } else {
          this.juste = 0;
          this.text_correction = "Mauvaise  réponse (--) La Bonne réponse est   => " + bon_resp;
        }
      } else {}
    },
    getLettreSelection: function getLettreSelection(val) {
      switch (val) {
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
    getQuiz: function getQuiz() {
      var _this2 = this;

      if (this.index_rev === this.data_rev.length) this.index_rev = 0;
      this.single_choice = null;
      this.true_fasle = null;
      this.juste = null;
      this.loading = true;
      axios.post('/get_quiz', {
        id_quiz: this.data_rev[this.index_rev]
      }).then(function (response) {
        _this2.data_quiz = response.data.data_quiz;
        var propo = response.data.data_propo;

        if (_this2.data_quiz.type !== 1) {
          var lettre = ["A", "B", "C", "D", "E"];
          propo.forEach(function (item, index) {
            if (_this2.data_quiz.type !== 1) {
              item.lettre = lettre[index];
              item.id = index;
              item.checked = false;
              item.color = "primary";
            }
          });
        } else {
          propo = [{
            id: 0,
            proposition: "True",
            lettre: "A",
            color: "primary"
          }, {
            id: 1,
            proposition: "False",
            lettre: "B"
          }];
        }

        _this2.data_propo = propo;
        _this2.loading = false;
      })["catch"](function (error) {});
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Quiz.vue?vue&type=template&id=654966c0&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Quiz.vue?vue&type=template&id=654966c0&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
        "v-card",
        { staticClass: "mx-auto", attrs: { loading: _vm.loading } },
        [
          _c("v-card-title", {}, [
            _c("pre", [_vm._v(_vm._s(_vm.data_quiz.question))])
          ]),
          _vm._v(" "),
          _c("v-card-text", [
            _vm.data_quiz.type === 1
              ? _c(
                  "div",
                  [
                    _c(
                      "v-radio-group",
                      {
                        model: {
                          value: _vm.true_fasle,
                          callback: function($$v) {
                            _vm.true_fasle = $$v
                          },
                          expression: "true_fasle"
                        }
                      },
                      _vm._l(_vm.data_propo, function(item) {
                        return _c("v-radio", {
                          key: item.id,
                          attrs: {
                            label: "[" + item.lettre + "]. " + item.proposition,
                            value: item.id,
                            color: item.color
                          }
                        })
                      }),
                      1
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.data_quiz.type === 2
              ? _c(
                  "div",
                  [
                    _c(
                      "v-radio-group",
                      {
                        model: {
                          value: _vm.single_choice,
                          callback: function($$v) {
                            _vm.single_choice = $$v
                          },
                          expression: "single_choice"
                        }
                      },
                      _vm._l(_vm.data_propo, function(item) {
                        return _c("v-radio", {
                          key: item.id,
                          attrs: {
                            color: item.color,
                            label: "[" + item.lettre + "]. " + item.proposition,
                            value: item.id
                          }
                        })
                      }),
                      1
                    )
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.data_quiz.type === 3
              ? _c(
                  "div",
                  _vm._l(_vm.data_propo, function(item) {
                    return _c("v-checkbox", {
                      key: item.id,
                      attrs: {
                        color: item.color,
                        label: "[" + item.lettre + "]. " + item.proposition,
                        color: "primary",
                        "hide-details": ""
                      },
                      model: {
                        value: item.checked,
                        callback: function($$v) {
                          _vm.$set(item, "checked", $$v)
                        },
                        expression: "item.checked"
                      }
                    })
                  }),
                  1
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "5" } },
                [
                  _vm.juste === 1
                    ? _c(
                        "v-alert",
                        { attrs: { dense: "", text: "", type: "success" } },
                        [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.text_correction) +
                              "\n                "
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.juste === 0
                    ? _c(
                        "v-alert",
                        { attrs: { dense: "", outlined: "", type: "error" } },
                        [
                          _vm._v(
                            "\n\n                    " +
                              _vm._s(_vm.text_correction) +
                              "\n                "
                          )
                        ]
                      )
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
              _c("v-col", { attrs: { cols: "1" } }),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticStyle: { "margin-bottom": "50px" },
                  attrs: { cols: "4" }
                },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        large: "",
                        outlined: "",
                        color: "success",
                        dark: ""
                      },
                      on: {
                        click: function($event) {
                          _vm.index_rev--
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Précedent\n                    "
                      ),
                      _c("v-icon", [_vm._v("mdi-done")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider", { attrs: { vertical: "" } }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        large: "",
                        outlined: "",
                        color: "red",
                        dark: ""
                      },
                      on: { click: _vm.valider }
                    },
                    [
                      _vm._v(
                        "\n                    Valider\n                    "
                      ),
                      _c("v-icon", [_vm._v("mdi-done")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-divider", { attrs: { vertical: "" } }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        large: "",
                        outlined: "",
                        color: "primary",
                        dark: ""
                      },
                      on: {
                        click: function($event) {
                          _vm.index_rev++
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Suivant\n                    "
                      ),
                      _c("v-icon", [_vm._v("mdi-forward")])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "1" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      label: "Regular",
                      color: "primary",
                      type: "number",
                      solo: ""
                    },
                    model: {
                      value: _vm.index_rev,
                      callback: function($$v) {
                        _vm.index_rev = $$v
                      },
                      expression: "index_rev"
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Quiz.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Quiz.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Quiz_vue_vue_type_template_id_654966c0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Quiz.vue?vue&type=template&id=654966c0&scoped=true& */ "./resources/js/components/Quiz.vue?vue&type=template&id=654966c0&scoped=true&");
/* harmony import */ var _Quiz_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Quiz.vue?vue&type=script&lang=js& */ "./resources/js/components/Quiz.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Quiz_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Quiz_vue_vue_type_template_id_654966c0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Quiz_vue_vue_type_template_id_654966c0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "654966c0",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Quiz.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Quiz.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Quiz.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Quiz_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Quiz.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Quiz.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Quiz_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Quiz.vue?vue&type=template&id=654966c0&scoped=true&":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Quiz.vue?vue&type=template&id=654966c0&scoped=true& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Quiz_vue_vue_type_template_id_654966c0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Quiz.vue?vue&type=template&id=654966c0&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Quiz.vue?vue&type=template&id=654966c0&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Quiz_vue_vue_type_template_id_654966c0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Quiz_vue_vue_type_template_id_654966c0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);