import t from "moment";

var e = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {},
    n = {
        props: {localization: {type: Object}}, methods: {
            titleCase: function (t) {
                return t.split("-").map(function (t) {
                    return t.charAt(0).toUpperCase() + t.slice(1)
                }).join(" ")
            }, frontendTimeFormat: function (e) {
                return t(e, "HHmm").format(this.hourFormat24 ? "HH:mm" : "hh:mm A")
            }, backendTimeFormat: function (e) {
                return t(e, "hh:mm A").format("HHmm")
            }, isValidFrontendTime: function (e) {
                return t(e, this.hourFormat24 ? "HH:mm" : "hh:mm A", !0).isValid()
            }, isValidBackendTime: function (e) {
                return t(e, "HHmm", !0).isValid()
            }, frontendInputFormat: function (t) {
                return "24hrs" === t ? t = this.localization.t24hours : "2400" === t ? t = this.localization.midnight : this.isValidBackendTime(t) ? t = this.frontendTimeFormat(t) : "" === t && (t = ""), t
            }, backendInputFormat: function (t) {
                return t === this.localization.midnight || t === this.localization.midnight.toLowerCase() ? "2400" : t.toLowerCase() === this.localization.t24hours.toLowerCase() ? "24hrs" : this.isValidFrontendTime(t) ? this.backendTimeFormat(t) : t
            }, isEven: function (t) {
                return t % 2 == 0
            }, isFirstInput: function (t) {
                return 1 === t
            }, isLastInput: function (t, e) {
                return t === e
            }, isFirstRow: function (t) {
                return 0 === t
            }, isLastRow: function (t, e) {
                return t === e.length - 1
            }, isMiddleRow: function (t, e) {
                return !this.isFirstRow(t) && !this.isLastRow(t, e)
            }, onlyOneRow: function (t) {
                return 1 === t.length
            }, getPrevious: function (t, e, n) {
                if (1 !== n) return this.isEven(n) ? t[e].open : t[e - 1].close
            }, getNext: function (t, e, n, i) {
                if (n !== i) return this.isEven(n) ? t[e + 1].open : t[e].close
            }
        }
    }, i = {
        data: function () {
            return {selected: this.selectedTime, times: []}
        },
        props: {
            name: {type: String, required: !0},
            day: {type: String, required: !0},
            hours: {type: Array, required: !0},
            index: {type: Number, required: !0},
            inputNum: {type: Number, required: !0},
            totalInputs: {type: Number, required: !0},
            selectedTime: {type: String, required: !0},
            timeIncrement: {type: Number, required: !0},
            localization: {type: Object},
            hourFormat24: {type: Boolean}
        },
        created: function () {
            this.times = this.generateTimes(this.timeIncrement)
        },
        watch: {
            selectedTime: function () {
                this.selected = this.selectedTime
            }
        },
        computed: {
            whichTime: function () {
                return this.isEven(this.inputNum) ? "close" : "open"
            }, defaultText: function () {
                return "open" === this.whichTime ? this.localization.placeholderOpens : this.localization.placeholderCloses
            }, optionName: function () {
                return this.name + "[" + this.day + "][" + this.index + "][" + this.whichTime + "]"
            }, filteredTimes: function () {
                var t = this.getPrevious(this.hours, this.index, this.inputNum),
                    e = this.getNext(this.hours, this.index, this.inputNum, this.totalInputs), n = this.times;
                return this.isFirstRow(this.index) || "" !== t || (t = this.getPrevious(this.hours, this.index, this.inputNum - 1)), this.isFirstInput(this.inputNum) ? n = this.getFiltered("before", e, n) : this.isLastInput(this.inputNum, this.totalInputs) ? n = this.getFiltered("after", t, n) : (n = this.getFiltered("before", e, n), n = this.getFiltered("after", t, n)), n
            }, showMidnightOption: function () {
                return this.isLastRow(this.index, this.hours) && "close" === this.whichTime && "24hrs" !== this.hours[this.index].close
            }
        },
        filters: {
            formatTime: function (e, n) {
                return t(e, "HHmm").format(n ? "HH:mm" : "hh:mm A")
            }
        },
        methods: {
            inputEventHandler: function (t) {
                this.$emit("input-change", t.target.value)
            }, generateTimes: function (e) {
                var n = "0000", i = [];
                while (!i.includes(n)) {
                    i.push(n), n = t(n, "HHmm").add(e, "minutes").format("HHmm")
                }
                ;

                console.log(times);

                return i
            }, getFiltered: function (t, e, n) {
                return this.isLastInput(this.inputNum, this.totalInputs) && "" === this.hours[this.index].open ? ((n = n.filter(function (t) {
                    return t > e
                })).shift(), n) : "" === e ? n : ("before" === t ? n = n.filter(function (t) {
                    return t < e
                }) : "after" === t && (n = n.filter(function (t) {
                    return t > e
                })), n)
            }
        }
    };
var r = function (t, e, n, i, r, o, a, s, l, c) {
    "boolean" != typeof a && (l = s, s = a, a = !1);
    var u, f = "function" == typeof n ? n.options : n;
    if (t && t.render && (f.render = t.render, f.staticRenderFns = t.staticRenderFns, f._compiled = !0, r && (f.functional = !0)), i && (f._scopeId = i), o ? (u = function (t) {
        (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), e && e.call(this, l(t)), t && t._registeredComponents && t._registeredComponents.add(o)
    }, f._ssrRegister = u) : e && (u = a ? function () {
        e.call(this, c(this.$root.$options.shadowRoot))
    } : function (t) {
        e.call(this, s(t))
    }), u) if (f.functional) {
        var d = f.render;
        f.render = function (t, e) {
            return u.call(e), d(t, e)
        }
    } else {
        var h = f.beforeCreate;
        f.beforeCreate = h ? [].concat(h, u) : [u]
    }
    return n
}, o = r({
    render: function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("select", {
            directives: [{
                name: "model",
                rawName: "v-model",
                value: t.selected,
                expression: "selected"
            }], attrs: {name: t.optionName}, on: {
                change: [function (e) {
                    var n = Array.prototype.filter.call(e.target.options, function (t) {
                        return t.selected
                    }).map(function (t) {
                        return "_value" in t ? t._value : t.value
                    });
                    t.selected = e.target.multiple ? n : n[0]
                }, t.inputEventHandler]
            }
        }, [n("option", {
            directives: [{
                name: "show",
                rawName: "v-show",
                value: t.isFirstRow(t.index) && t.onlyOneRow(t.hours),
                expression: "isFirstRow(index) && onlyOneRow(hours)"
            }], attrs: {value: ""}
        }, [t._v(t._s(t.defaultText))]), t._v(" "), n("option", {
            directives: [{
                name: "show",
                rawName: "v-show",
                value: t.isFirstRow(t.index),
                expression: "isFirstRow(index)"
            }], attrs: {value: "24hrs"}
        }, [t._v(t._s(t.localization.t24hours))]), t._v(" "), t._l(t.filteredTimes, function (e) {
            return n("option", {
                key: e,
                domProps: {value: e, selected: e == t.selected}
            }, [t._v(t._s(t._f("formatTime")(e, t.hourFormat24)))])
        }), t._v(" "), n("option", {
            directives: [{
                name: "show",
                rawName: "v-show",
                value: t.showMidnightOption,
                expression: "showMidnightOption"
            }], attrs: {value: "2400"}
        }, [t._v(t._s(t.localization.midnight))])], 2)
    }, staticRenderFns: []
}, void 0, {name: "BusinessHoursSelect", mixins: [n, i]}, void 0, !1, void 0, void 0, void 0), a = {
    name: "BusinessHoursDatalist",
    mixins: [n, i],
    props: {anyError: {type: Boolean, required: !0}},
    computed: {
        formattedTime: function () {
            return this.frontendInputFormat(this.selected)
        }, datalistID: function () {
            return this.name.replace("_", "-") + "-" + this.day + "-" + this.index + "-" + this.whichTime
        }
    }
}, s = "undefined" != typeof navigator && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
var l = document.head || document.getElementsByTagName("head")[0], c = {};
var u = function (t) {
    return function (t, e) {
        return function (t, e) {
            var n = s ? e.media || "default" : t, i = c[n] || (c[n] = {ids: new Set, styles: []});
            if (!i.ids.has(t)) {
                i.ids.add(t);
                var r = e.source;
                if (e.map && (r += "\n/*# sourceURL=" + e.map.sources[0] + " */", r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(e.map)))) + " */"), i.element || (i.element = document.createElement("style"), i.element.type = "text/css", e.media && i.element.setAttribute("media", e.media), l.appendChild(i.element)), "styleSheet" in i.element) i.styles.push(r), i.element.styleSheet.cssText = i.styles.filter(Boolean).join("\n"); else {
                    var o = i.ids.size - 1, a = document.createTextNode(r), u = i.element.childNodes;
                    u[o] && i.element.removeChild(u[o]), u.length ? i.element.insertBefore(a, u[o]) : i.element.appendChild(a)
                }
            }
        }(t, e)
    }
}, f = r({
    render: function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", [n("input", {
            staticClass: "time-input",
            class: [t.anyError ? "has-error" : ""],
            attrs: {type: "text", list: t.datalistID, placeholder: t.defaultText},
            domProps: {value: t.formattedTime},
            on: {change: t.inputEventHandler}
        }), t._v(" "), n("datalist", {attrs: {id: t.datalistID}}, [t.isFirstRow(t.index) ? n("option", [t._v(t._s(t.localization.t24hours))]) : t._e(), t._v(" "), t._l(t.filteredTimes, function (e) {
            return n("option", {key: e}, [t._v(t._s(t._f("formatTime")(e, t.hourFormat24)))])
        }), t._v(" "), t.showMidnightOption ? n("option", [t._v(t._s(t.localization.midnight))]) : t._e()], 2), t._v(" "), n("input", {
            attrs: {
                name: t.optionName,
                type: "hidden"
            }, domProps: {value: t.selected}
        })])
    }, staticRenderFns: []
}, function (t) {
    t && t("data-v-3f062112_0", {
        source: ".time-input.has-error[data-v-3f062112]{border:solid #e3342f 1px}",
        map: void 0,
        media: void 0
    })
}, a, "data-v-3f062112", !1, void 0, u, void 0);
"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;

function d(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
}

function h(t, e) {
    return t(e = {exports: {}}, e.exports), e.exports
}

var p = h(function (t, e) {
    var n;
    n = function () {
        return function (t) {
            var e = {};

            function n(i) {
                if (e[i]) return e[i].exports;
                var r = e[i] = {i, l: !1, exports: {}};
                return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
            }

            return n.m = t, n.c = e, n.i = function (t) {
                return t
            }, n.d = function (t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, {configurable: !1, enumerable: !0, get: i})
            }, n.n = function (t) {
                var e = t && t.__esModule ? function () {
                    return t.default
                } : function () {
                    return t
                };
                return n.d(e, "a", e), e
            }, n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }, n.p = "/dist/", n(n.s = 2)
        }([function (t, e, n) {
            n(8);
            var i = n(6)(n(1), n(7), "data-v-25adc6c0", null);
            t.exports = i.exports
        }, function (t, e, n) {
            Object.defineProperty(e, "__esModule", {value: !0});
            var i = n(3), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            };
            e.default = {
                name: "ToggleButton",
                props: {
                    value: {type: Boolean, default: !1},
                    name: {type: String},
                    disabled: {type: Boolean, default: !1},
                    tag: {type: String},
                    sync: {type: Boolean, default: !1},
                    speed: {type: Number, default: 300},
                    color: {
                        type: [String, Object], validator: function (t) {
                            return n.i(i.a)(t) || n.i(i.b)(t, "checked") || n.i(i.b)(t, "unchecked") || n.i(i.b)(t, "disabled")
                        }
                    },
                    switchColor: {
                        type: [String, Object], validator: function (t) {
                            return n.i(i.a)(t) || n.i(i.b)(t, "checked") || n.i(i.b)(t, "unchecked")
                        }
                    },
                    cssColors: {type: Boolean, default: !1},
                    labels: {
                        type: [Boolean, Object], default: !1, validator: function (t) {
                            return "object" === (void 0 === t ? "undefined" : r(t)) ? t.checked || t.unchecked : "boolean" == typeof t
                        }
                    },
                    height: {type: Number, default: 22},
                    width: {type: Number, default: 50},
                    margin: {type: Number, default: 3},
                    fontSize: {type: Number}
                },
                computed: {
                    className: function () {
                        return ["vue-js-switch", {toggled: this.toggled, disabled: this.disabled}]
                    }, coreStyle: function () {
                        return {
                            width: n.i(i.c)(this.width),
                            height: n.i(i.c)(this.height),
                            backgroundColor: this.cssColors ? null : this.disabled ? this.colorDisabled : this.colorCurrent,
                            borderRadius: n.i(i.c)(Math.round(this.height / 2))
                        }
                    }, buttonRadius: function () {
                        return this.height - 2 * this.margin
                    }, distance: function () {
                        return n.i(i.c)(this.width - this.height + this.margin)
                    }, buttonStyle: function () {
                        var t = "transform " + this.speed + "ms", e = n.i(i.c)(this.margin),
                            r = this.toggled ? n.i(i.d)(this.distance, e) : n.i(i.d)(e, e),
                            o = this.switchColor ? this.switchColorCurrent : null;
                        return {
                            width: n.i(i.c)(this.buttonRadius),
                            height: n.i(i.c)(this.buttonRadius),
                            transition: t,
                            transform: r,
                            background: o
                        }
                    }, labelStyle: function () {
                        return {
                            lineHeight: n.i(i.c)(this.height),
                            fontSize: this.fontSize ? n.i(i.c)(this.fontSize) : null
                        }
                    }, colorChecked: function () {
                        var t = this.color;
                        return n.i(i.e)(t) ? n.i(i.f)(t, "checked", "#75c791") : t || "#75c791"
                    }, colorUnchecked: function () {
                        return n.i(i.f)(this.color, "unchecked", "#bfcbd9")
                    }, colorDisabled: function () {
                        return n.i(i.f)(this.color, "disabled", this.colorCurrent)
                    }, colorCurrent: function () {
                        return this.toggled ? this.colorChecked : this.colorUnchecked
                    }, labelChecked: function () {
                        return n.i(i.f)(this.labels, "checked", "on")
                    }, labelUnchecked: function () {
                        return n.i(i.f)(this.labels, "unchecked", "off")
                    }, switchColorChecked: function () {
                        return n.i(i.f)(this.switchColor, "checked", "#fff")
                    }, switchColorUnchecked: function () {
                        return n.i(i.f)(this.switchColor, "unchecked", "#fff")
                    }, switchColorCurrent: function () {
                        this.switchColor;
                        return n.i(i.e)(this.switchColor) ? this.toggled ? this.switchColorChecked : this.switchColorUnchecked : this.switchColor || "#fff"
                    }
                },
                watch: {
                    value: function (t) {
                        this.sync && (this.toggled = !!t)
                    }
                },
                data: function () {
                    return {toggled: !!this.value}
                },
                methods: {
                    toggle: function (t) {
                        var e = !this.toggled;
                        this.sync || (this.toggled = e), this.$emit("input", e), this.$emit("change", {
                            value: e,
                            tag: this.tag,
                            srcEvent: t
                        })
                    }
                }
            }
        }, function (t, e, n) {
            Object.defineProperty(e, "__esModule", {value: !0});
            var i = n(0), r = n.n(i);
            n.d(e, "ToggleButton", function () {
                return r.a
            });
            var o = !1;
            e.default = {
                install: function (t) {
                    o || (t.component("ToggleButton", r.a), o = !0)
                }
            }
        }, function (t, e, n) {
            n.d(e, "a", function () {
                return r
            }), n.d(e, "e", function () {
                return o
            }), n.d(e, "b", function () {
                return a
            }), n.d(e, "f", function () {
                return s
            }), n.d(e, "c", function () {
                return l
            }), n.d(e, "d", function () {
                return c
            });
            var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, r = function (t) {
                return "string" == typeof t
            }, o = function (t) {
                return "object" === (void 0 === t ? "undefined" : i(t))
            }, a = function (t, e) {
                return o(t) && t.hasOwnProperty(e)
            }, s = function (t, e, n) {
                return a(t, e) ? t[e] : n
            }, l = function (t) {
                return t + "px"
            }, c = function (t, e) {
                return "translate3d(" + t + ", " + e + ", " + (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "0px") + ")"
            }
        }, function (t, e, n) {
            (t.exports = n(5)()).push([t.i, ".vue-js-switch[data-v-25adc6c0]{display:inline-block;position:relative;vertical-align:middle;user-select:none;font-size:10px;cursor:pointer}.vue-js-switch .v-switch-input[data-v-25adc6c0]{opacity:0;position:absolute;width:1px;height:1px}.vue-js-switch .v-switch-label[data-v-25adc6c0]{position:absolute;top:0;font-weight:600;color:#fff;z-index:1}.vue-js-switch .v-switch-label.v-left[data-v-25adc6c0]{left:10px}.vue-js-switch .v-switch-label.v-right[data-v-25adc6c0]{right:10px}.vue-js-switch .v-switch-core[data-v-25adc6c0]{display:block;position:relative;box-sizing:border-box;outline:0;margin:0;transition:border-color .3s,background-color .3s;user-select:none}.vue-js-switch .v-switch-core .v-switch-button[data-v-25adc6c0]{display:block;position:absolute;overflow:hidden;top:0;left:0;border-radius:100%;background-color:#fff;z-index:2}.vue-js-switch.disabled[data-v-25adc6c0]{pointer-events:none;opacity:.6}", ""])
        }, function (t, e) {
            t.exports = function () {
                var t = [];
                return t.toString = function () {
                    for (var t = [], e = 0; e < this.length; e++) {
                        var n = this[e];
                        n[2] ? t.push("@media " + n[2] + "{" + n[1] + "}") : t.push(n[1])
                    }
                    return t.join("")
                }, t.i = function (e, n) {
                    "string" == typeof e && (e = [[null, e, ""]]);
                    for (var i = {}, r = 0; r < this.length; r++) {
                        var o = this[r][0];
                        "number" == typeof o && (i[o] = !0)
                    }
                    for (r = 0; r < e.length; r++) {
                        var a = e[r];
                        "number" == typeof a[0] && i[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a))
                    }
                }, t
            }
        }, function (t, e) {
            t.exports = function (t, e, n, i) {
                var r, o = t = t || {}, a = typeof t.default;
                "object" !== a && "function" !== a || (r = t, o = t.default);
                var s = "function" == typeof o ? o.options : o;
                if (e && (s.render = e.render, s.staticRenderFns = e.staticRenderFns), n && (s._scopeId = n), i) {
                    var l = Object.create(s.computed || null);
                    Object.keys(i).forEach(function (t) {
                        var e = i[t];
                        l[t] = function () {
                            return e
                        }
                    }), s.computed = l
                }
                return {esModule: r, exports: o, options: s}
            }
        }, function (t, e) {
            t.exports = {
                render: function () {
                    var t = this, e = t.$createElement, n = t._self._c || e;
                    return n("label", {class: t.className}, [n("input", {
                        staticClass: "v-switch-input",
                        attrs: {type: "checkbox", name: t.name, disabled: t.disabled},
                        domProps: {checked: t.value},
                        on: {
                            change: function (e) {
                                return e.stopPropagation(), t.toggle(e)
                            }
                        }
                    }), t._v(" "), n("div", {
                        staticClass: "v-switch-core",
                        style: t.coreStyle
                    }, [n("div", {
                        staticClass: "v-switch-button",
                        style: t.buttonStyle
                    })]), t._v(" "), t.labels ? [t.toggled ? n("span", {
                        staticClass: "v-switch-label v-left",
                        style: t.labelStyle
                    }, [t._t("checked", [[t._v(t._s(t.labelChecked))]])], 2) : n("span", {
                        staticClass: "v-switch-label v-right",
                        style: t.labelStyle
                    }, [t._t("unchecked", [[t._v(t._s(t.labelUnchecked))]])], 2)] : t._e()], 2)
                }, staticRenderFns: []
            }
        }, function (t, e, n) {
            var i = n(4);
            "string" == typeof i && (i = [[t.i, i, ""]]), i.locals && (t.exports = i.locals);
            n(9)("2283861f", i, !0)
        }, function (t, e, n) {
            var i = "undefined" != typeof document;
            if ("undefined" != typeof DEBUG && DEBUG && !i) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
            var r = n(10), o = {}, a = i && (document.head || document.getElementsByTagName("head")[0]), s = null,
                l = 0, c = !1, u = function () {
                }, f = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

            function d(t) {
                for (var e = 0; e < t.length; e++) {
                    var n = t[e], i = o[n.id];
                    if (i) {
                        i.refs++;
                        for (var r = 0; r < i.parts.length; r++) i.parts[r](n.parts[r]);
                        for (; r < n.parts.length; r++) i.parts.push(p(n.parts[r]));
                        i.parts.length > n.parts.length && (i.parts.length = n.parts.length)
                    } else {
                        var a = [];
                        for (r = 0; r < n.parts.length; r++) a.push(p(n.parts[r]));
                        o[n.id] = {id: n.id, refs: 1, parts: a}
                    }
                }
            }

            function h() {
                var t = document.createElement("style");
                return t.type = "text/css", a.appendChild(t), t
            }

            function p(t) {
                var e, n, i = document.querySelector('style[data-vue-ssr-id~="' + t.id + '"]');
                if (i) {
                    if (c) return u;
                    i.parentNode.removeChild(i)
                }
                if (f) {
                    var r = l++;
                    i = s || (s = h()), e = g.bind(null, i, r, !1), n = g.bind(null, i, r, !0)
                } else i = h(), e = function (t, e) {
                    var n = e.css, i = e.media, r = e.sourceMap;
                    i && t.setAttribute("media", i);
                    r && (n += "\n/*# sourceURL=" + r.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
                    if (t.styleSheet) t.styleSheet.cssText = n; else {
                        for (; t.firstChild;) t.removeChild(t.firstChild);
                        t.appendChild(document.createTextNode(n))
                    }
                }.bind(null, i), n = function () {
                    i.parentNode.removeChild(i)
                };
                return e(t), function (i) {
                    if (i) {
                        if (i.css === t.css && i.media === t.media && i.sourceMap === t.sourceMap) return;
                        e(t = i)
                    } else n()
                }
            }

            t.exports = function (t, e, n) {
                c = n;
                var i = r(t, e);
                return d(i), function (e) {
                    for (var n = [], a = 0; a < i.length; a++) {
                        var s = i[a];
                        (l = o[s.id]).refs--, n.push(l)
                    }
                    e ? d(i = r(t, e)) : i = [];
                    for (a = 0; a < n.length; a++) {
                        var l;
                        if (0 === (l = n[a]).refs) {
                            for (var c = 0; c < l.parts.length; c++) l.parts[c]();
                            delete o[l.id]
                        }
                    }
                }
            };
            var m, v = (m = [], function (t, e) {
                return m[t] = e, m.filter(Boolean).join("\n")
            });

            function g(t, e, n, i) {
                var r = n ? "" : i.css;
                if (t.styleSheet) t.styleSheet.cssText = v(e, r); else {
                    var o = document.createTextNode(r), a = t.childNodes;
                    a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(o, a[e]) : t.appendChild(o)
                }
            }
        }, function (t, e) {
            t.exports = function (t, e) {
                for (var n = [], i = {}, r = 0; r < e.length; r++) {
                    var o = e[r], a = o[0], s = {id: t + ":" + r, css: o[1], media: o[2], sourceMap: o[3]};
                    i[a] ? i[a].parts.push(s) : n.push(i[a] = {id: a, parts: [s]})
                }
                return n
            }
        }])
    }, t.exports = n()
});
d(p);
var m = p.ToggleButton;

function v(t, e) {
    for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
    }
}

function g(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t
}

function y(t) {
    for (var e = arguments, n = 1; n < arguments.length; n++) {
        var i = null != e[n] ? e[n] : {}, r = Object.keys(i);
        "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(i).filter(function (t) {
            return Object.getOwnPropertyDescriptor(i, t).enumerable
        }))), r.forEach(function (e) {
            g(t, e, i[e])
        })
    }
    return t
}

function b(t, e) {
    return function (t) {
        if (Array.isArray(t)) return t
    }(t) || function (t, e) {
        var n = [], i = !0, r = !1, o = void 0;
        try {
            for (var a, s = t[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); i = !0) ;
        } catch (t) {
            r = !0, o = t
        } finally {
            try {
                i || null == s.return || s.return()
            } finally {
                if (r) throw o
            }
        }
        return n
    }(t, e) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }()
}

var w = function () {
}, x = {}, _ = {}, k = {mark: w, measure: w};
try {
    "undefined" != typeof window && (x = window), "undefined" != typeof document && (_ = document), "undefined" != typeof MutationObserver && MutationObserver, "undefined" != typeof performance && (k = performance)
} catch (t) {
}
var O = (x.navigator || {}).userAgent, T = void 0 === O ? "" : O, C = x, N = _, z = k,
    E = (C.document, !!N.documentElement && !!N.head && "function" == typeof N.addEventListener && "function" == typeof N.createElement),
    S = (~T.indexOf("MSIE") || T.indexOf("Trident/"), "fa"), I = "svg-inline--fa", M = "data-fa-i2svg",
    A = (function () {
        try {
        } catch (t) {
            return !1
        }
    }(), {GROUP: "group", SWAP_OPACITY: "swap-opacity", PRIMARY: "primary", SECONDARY: "secondary"}),
    j = C.FontAwesomeConfig || {};
if (N && "function" == typeof N.querySelector) {
    [["data-family-prefix", "familyPrefix"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]].forEach(function (t) {
        var e = b(t, 2), n = e[0], i = e[1], r = function (t) {
            return "" === t || "false" !== t && ("true" === t || t)
        }(function (t) {
            var e = N.querySelector("script[" + t + "]");
            if (e) return e.getAttribute(t)
        }(n));
        null != r && (j[i] = r)
    })
}
var P = y({}, {
    familyPrefix: S,
    replacementClass: I,
    autoReplaceSvg: !0,
    autoAddCss: !0,
    autoA11y: !0,
    searchPseudoElements: !1,
    observeMutations: !0,
    mutateApproach: "async",
    keepOriginalSource: !0,
    measurePerformance: !1,
    showMissingIcons: !0
}, j);
P.autoReplaceSvg || (P.observeMutations = !1);
var L = y({}, P);
C.FontAwesomeConfig = L;
var B = C || {};
B.___FONT_AWESOME___ || (B.___FONT_AWESOME___ = {}), B.___FONT_AWESOME___.styles || (B.___FONT_AWESOME___.styles = {}), B.___FONT_AWESOME___.hooks || (B.___FONT_AWESOME___.hooks = {}), B.___FONT_AWESOME___.shims || (B.___FONT_AWESOME___.shims = []);
var F = B.___FONT_AWESOME___, R = [];
E && ((N.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(N.readyState) || N.addEventListener("DOMContentLoaded", function t() {
    N.removeEventListener("DOMContentLoaded", t), 1, R.map(function (t) {
        return t()
    })
}));
void 0 !== e && void 0 !== e.process && e.process.emit, "undefined" == typeof setImmediate ? setTimeout : setImmediate;
var H = {size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1};
var D = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function V() {
    for (var t = 12, e = ""; t-- > 0;) e += D[62 * Math.random() | 0];
    return e
}

function U(t) {
    return "".concat(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function W(t) {
    return Object.keys(t || {}).reduce(function (e, n) {
        return e + "".concat(n, ": ").concat(t[n], ";")
    }, "")
}

function q(t) {
    return t.size !== H.size || t.x !== H.x || t.y !== H.y || t.rotate !== H.rotate || t.flipX || t.flipY
}

function Y(t) {
    var e = t.transform, n = t.containerWidth, i = t.iconWidth, r = {transform: "translate(".concat(n / 2, " 256)")},
        o = "translate(".concat(32 * e.x, ", ").concat(32 * e.y, ") "),
        a = "scale(".concat(e.size / 16 * (e.flipX ? -1 : 1), ", ").concat(e.size / 16 * (e.flipY ? -1 : 1), ") "),
        s = "rotate(".concat(e.rotate, " 0 0)");
    return {
        outer: r,
        inner: {transform: "".concat(o, " ").concat(a, " ").concat(s)},
        path: {transform: "translate(".concat(i / 2 * -1, " -256)")}
    }
}

var X = {x: 0, y: 0, width: "100%", height: "100%"};

function $(t) {
    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    return t.attributes && (t.attributes.fill || e) && (t.attributes.fill = "black"), t
}

function K(t) {
    var e = t.icons, n = e.main, i = e.mask, r = t.prefix, o = t.iconName, a = t.transform, s = t.symbol, l = t.title,
        c = t.extra, u = t.watchable, f = void 0 !== u && u, d = i.found ? i : n, h = d.width, p = d.height,
        m = "fa-w-".concat(Math.ceil(h / p * 16)),
        v = [L.replacementClass, o ? "".concat(L.familyPrefix, "-").concat(o) : "", m].filter(function (t) {
            return -1 === c.classes.indexOf(t)
        }).concat(c.classes).join(" "), g = {
            children: [],
            attributes: y({}, c.attributes, {
                "data-prefix": r,
                "data-icon": o,
                class: v,
                role: c.attributes.role || "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(h, " ").concat(p)
            })
        };
    f && (g.attributes[M] = ""), l && g.children.push({
        tag: "title",
        attributes: {id: g.attributes["aria-labelledby"] || "title-".concat(V())},
        children: [l]
    });
    var b = y({}, g, {prefix: r, iconName: o, main: n, mask: i, transform: a, symbol: s, styles: c.styles}),
        w = i.found && n.found ? function (t) {
            var e, n = t.children, i = t.attributes, r = t.main, o = t.mask, a = t.transform, s = r.width, l = r.icon,
                c = o.width, u = o.icon, f = Y({transform: a, containerWidth: c, iconWidth: s}),
                d = {tag: "rect", attributes: y({}, X, {fill: "white"})},
                h = l.children ? {children: l.children.map($)} : {}, p = {
                    tag: "g",
                    attributes: y({}, f.inner),
                    children: [$(y({tag: l.tag, attributes: y({}, l.attributes, f.path)}, h))]
                }, m = {tag: "g", attributes: y({}, f.outer), children: [p]}, v = "mask-".concat(V()),
                g = "clip-".concat(V()), b = {
                    tag: "mask",
                    attributes: y({}, X, {id: v, maskUnits: "userSpaceOnUse", maskContentUnits: "userSpaceOnUse"}),
                    children: [d, m]
                }, w = {
                    tag: "defs",
                    children: [{
                        tag: "clipPath",
                        attributes: {id: g},
                        children: (e = u, "g" === e.tag ? e.children : [e])
                    }, b]
                };
            return n.push(w, {
                tag: "rect",
                attributes: y({
                    fill: "currentColor",
                    "clip-path": "url(#".concat(g, ")"),
                    mask: "url(#".concat(v, ")")
                }, X)
            }), {children: n, attributes: i}
        }(b) : function (t) {
            var e = t.children, n = t.attributes, i = t.main, r = t.transform, o = W(t.styles);
            if (o.length > 0 && (n.style = o), q(r)) {
                var a = Y({transform: r, containerWidth: i.width, iconWidth: i.width});
                e.push({
                    tag: "g",
                    attributes: y({}, a.outer),
                    children: [{
                        tag: "g",
                        attributes: y({}, a.inner),
                        children: [{
                            tag: i.icon.tag,
                            children: i.icon.children,
                            attributes: y({}, i.icon.attributes, a.path)
                        }]
                    }]
                })
            } else e.push(i.icon);
            return {children: e, attributes: n}
        }(b), x = w.children, _ = w.attributes;
    return b.children = x, b.attributes = _, s ? function (t) {
        var e = t.prefix, n = t.iconName, i = t.children, r = t.attributes, o = t.symbol;
        return [{
            tag: "svg",
            attributes: {style: "display: none;"},
            children: [{
                tag: "symbol",
                attributes: y({}, r, {id: !0 === o ? "".concat(e, "-").concat(L.familyPrefix, "-").concat(n) : o}),
                children: i
            }]
        }]
    }(b) : function (t) {
        var e = t.children, n = t.main, i = t.mask, r = t.attributes, o = t.styles, a = t.transform;
        if (q(a) && n.found && !i.found) {
            var s = {x: n.width / n.height / 2, y: .5};
            r.style = W(y({}, o, {"transform-origin": "".concat(s.x + a.x / 16, "em ").concat(s.y + a.y / 16, "em")}))
        }
        return [{tag: "svg", attributes: r, children: e}]
    }(b)
}

var J = function () {
}, G = (L.measurePerformance && z && z.mark && z.measure, function (t, e, n, i) {
    var r, o, a, s = Object.keys(t), l = s.length, c = void 0 !== i ? function (t, e) {
        return function (n, i, r, o) {
            return t.call(e, n, i, r, o)
        }
    }(e, i) : e;
    for (void 0 === n ? (r = 1, a = t[s[0]]) : (r = 0, a = n); r < l; r++) a = c(a, t[o = s[r]], o, t);
    return a
});
var Z = F.styles, Q = F.shims, tt = function () {
    var t = function (t) {
        return G(Z, function (e, n, i) {
            return e[i] = G(n, t, {}), e
        }, {})
    };
    t(function (t, e, n) {
        return e[3] && (t[e[3]] = n), t
    }), t(function (t, e, n) {
        var i = e[2];
        return t[n] = n, i.forEach(function (e) {
            t[e] = n
        }), t
    });
    var e = "far" in Z;
    G(Q, function (t, n) {
        var i = n[0], r = n[1], o = n[2];
        return "far" !== r || e || (r = "fas"), t[i] = {prefix: r, iconName: o}, t
    }, {})
};
tt();
F.styles;

function et(t, e, n) {
    if (t && t[e] && t[e][n]) return {prefix: e, iconName: n, icon: t[e][n]}
}

function nt(t) {
    var e = t.tag, n = t.attributes, i = void 0 === n ? {} : n, r = t.children, o = void 0 === r ? [] : r;
    return "string" == typeof t ? U(t) : "<".concat(e, " ").concat(function (t) {
        return Object.keys(t || {}).reduce(function (e, n) {
            return e + "".concat(n, '="').concat(U(t[n]), '" ')
        }, "").trim()
    }(i), ">").concat(o.map(nt).join(""), "</").concat(e, ">")
}

function it(t) {
    this.name = "MissingIcon", this.message = t || "Icon unavailable", this.stack = (new Error).stack
}

it.prototype = Object.create(Error.prototype), it.prototype.constructor = it;
var rt = {fill: "currentColor"}, ot = {attributeType: "XML", repeatCount: "indefinite", dur: "2s"},
    at = (y({}, rt, {d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}), y({}, ot, {attributeName: "opacity"}));
y({}, rt, {cx: "256", cy: "364", r: "28"}), y({}, ot, {
    attributeName: "r",
    values: "28;14;28;28;14;28;"
}), y({}, at, {values: "1;0;1;1;0;1;"}), y({}, rt, {
    opacity: "1",
    d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
}), y({}, at, {values: "1;0;0;0;0;1;"}), y({}, rt, {
    opacity: "0",
    d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
}), y({}, at, {values: "0;0;1;1;0;0;"}), F.styles;

function st(t) {
    var e = t[0], n = t[1], i = b(t.slice(4), 1)[0];
    return {
        found: !0,
        width: e,
        height: n,
        icon: Array.isArray(i) ? {
            tag: "g",
            attributes: {class: "".concat(L.familyPrefix, "-").concat(A.GROUP)},
            children: [{
                tag: "path",
                attributes: {class: "".concat(L.familyPrefix, "-").concat(A.SECONDARY), fill: "currentColor", d: i[0]}
            }, {
                tag: "path",
                attributes: {class: "".concat(L.familyPrefix, "-").concat(A.PRIMARY), fill: "currentColor", d: i[1]}
            }]
        } : {tag: "path", attributes: {fill: "currentColor", d: i}}
    }
}

F.styles;
var lt = 'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';

function ct() {
    L.autoAddCss && !ht && (!function (t) {
        if (t && E) {
            var e = N.createElement("style");
            e.setAttribute("type", "text/css"), e.innerHTML = t;
            for (var n = N.head.childNodes, i = null, r = n.length - 1; r > -1; r--) {
                var o = n[r], a = (o.tagName || "").toUpperCase();
                ["STYLE", "LINK"].indexOf(a) > -1 && (i = o)
            }
            N.head.insertBefore(e, i)
        }
    }(function () {
        var t = S, e = I, n = L.familyPrefix, i = L.replacementClass, r = lt;
        if (n !== t || i !== e) {
            var o = new RegExp("\\.".concat(t, "\\-"), "g"), a = new RegExp("\\--".concat(t, "\\-"), "g"),
                s = new RegExp("\\.".concat(e), "g");
            r = r.replace(o, ".".concat(n, "-")).replace(a, "--".concat(n, "-")).replace(s, ".".concat(i))
        }
        return r
    }()), ht = !0)
}

function ut(t) {
    var e = t.prefix, n = void 0 === e ? "fa" : e, i = t.iconName;
    if (i) return et(dt.definitions, n, i) || et(F.styles, n, i)
}

var ft, dt = new (function () {
    function t() {
        !function (t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, t), this.definitions = {}
    }

    var e, n, i;
    return e = t, (n = [{
        key: "add", value: function () {
            for (var t = arguments, e = this, n = arguments.length, i = new Array(n), r = 0; r < n; r++) i[r] = t[r];
            var o = i.reduce(this._pullDefinitions, {});
            Object.keys(o).forEach(function (t) {
                e.definitions[t] = y({}, e.definitions[t] || {}, o[t]), function t(e, n) {
                    var i = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).skipHooks,
                        r = void 0 !== i && i, o = Object.keys(n).reduce(function (t, e) {
                            var i = n[e];
                            return i.icon ? t[i.iconName] = i.icon : t[e] = i, t
                        }, {});
                    "function" != typeof F.hooks.addPack || r ? F.styles[e] = y({}, F.styles[e] || {}, o) : F.hooks.addPack(e, o), "fas" === e && t("fa", n)
                }(t, o[t]), tt()
            })
        }
    }, {
        key: "reset", value: function () {
            this.definitions = {}
        }
    }, {
        key: "_pullDefinitions", value: function (t, e) {
            var n = e.prefix && e.iconName && e.icon ? {0: e} : e;
            return Object.keys(n).map(function (e) {
                var i = n[e], r = i.prefix, o = i.iconName, a = i.icon;
                t[r] || (t[r] = {}), t[r][o] = a
            }), t
        }
    }]) && v(e.prototype, n), i && v(e, i), t
}()), ht = !1, pt = function (t) {
    return function (t) {
        var e = {size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0};
        return t ? t.toLowerCase().split(" ").reduce(function (t, e) {
            var n = e.toLowerCase().split("-"), i = n[0], r = n.slice(1).join("-");
            if (i && "h" === r) return t.flipX = !0, t;
            if (i && "v" === r) return t.flipY = !0, t;
            if (r = parseFloat(r), isNaN(r)) return t;
            switch (i) {
                case"grow":
                    t.size = t.size + r;
                    break;
                case"shrink":
                    t.size = t.size - r;
                    break;
                case"left":
                    t.x = t.x - r;
                    break;
                case"right":
                    t.x = t.x + r;
                    break;
                case"up":
                    t.y = t.y - r;
                    break;
                case"down":
                    t.y = t.y + r;
                    break;
                case"rotate":
                    t.rotate = t.rotate + r
            }
            return t
        }, e) : e
    }(t)
}, mt = (ft = function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = e.transform,
        i = void 0 === n ? H : n, r = e.symbol, o = void 0 !== r && r, a = e.mask, s = void 0 === a ? null : a,
        l = e.title, c = void 0 === l ? null : l, u = e.classes, f = void 0 === u ? [] : u, d = e.attributes,
        h = void 0 === d ? {} : d, p = e.styles, m = void 0 === p ? {} : p;
    if (t) {
        var v, g, b = t.prefix, w = t.iconName, x = t.icon;
        return v = y({type: "icon"}, t), g = function () {
            return ct(), L.autoA11y && (c ? h["aria-labelledby"] = "".concat(L.replacementClass, "-title-").concat(V()) : (h["aria-hidden"] = "true", h.focusable = "false")), K({
                icons: {
                    main: st(x),
                    mask: s ? st(s.icon) : {found: !1, width: null, height: null, icon: {}}
                },
                prefix: b,
                iconName: w,
                transform: y({}, H, i),
                symbol: o,
                title: c,
                extra: {attributes: h, styles: m, classes: f}
            })
        }, Object.defineProperty(v, "abstract", {get: g}), Object.defineProperty(v, "html", {
            get: function () {
                return v.abstract.map(function (t) {
                    return nt(t)
                })
            }
        }), Object.defineProperty(v, "node", {
            get: function () {
                if (E) {
                    var t = N.createElement("div");
                    return t.innerHTML = v.html, t.children
                }
            }
        }), v
    }
}, function (t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = (t || {}).icon ? t : ut(t || {}),
        i = e.mask;
    return i && (i = (i || {}).icon ? i : ut(i || {})), ft(n, y({}, e, {mask: i}))
}), vt = "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {};
var gt, yt = (function (t) {
        var e, n, i, r, o, a, s, l, c, u, f, d, h, p, m;
        e = vt, n = function (t, e, i) {
            if (!l(e) || u(e) || f(e) || d(e) || s(e)) return e;
            var r, o = 0, a = 0;
            if (c(e)) for (r = [], a = e.length; o < a; o++) r.push(n(t, e[o], i)); else for (var h in r = {}, e) Object.prototype.hasOwnProperty.call(e, h) && (r[t(h, i)] = n(t, e[h], i));
            return r
        }, i = function (t) {
            return h(t) ? t : (t = t.replace(/[\-_\s]+(.)?/g, function (t, e) {
                return e ? e.toUpperCase() : ""
            })).substr(0, 1).toLowerCase() + t.substr(1)
        }, r = function (t) {
            var e = i(t);
            return e.substr(0, 1).toUpperCase() + e.substr(1)
        }, o = function (t, e) {
            return function (t, e) {
                var n = (e = e || {}).separator || "_", i = e.split || /(?=[A-Z])/;
                return t.split(i).join(n)
            }(t, e).toLowerCase()
        }, a = Object.prototype.toString, s = function (t) {
            return "function" == typeof t
        }, l = function (t) {
            return t === Object(t)
        }, c = function (t) {
            return "[object Array]" == a.call(t)
        }, u = function (t) {
            return "[object Date]" == a.call(t)
        }, f = function (t) {
            return "[object RegExp]" == a.call(t)
        }, d = function (t) {
            return "[object Boolean]" == a.call(t)
        }, h = function (t) {
            return (t -= 0) == t
        }, p = function (t, e) {
            var n = e && "process" in e ? e.process : e;
            return "function" != typeof n ? t : function (e, i) {
                return n(e, t, i)
            }
        }, m = {
            camelize: i, decamelize: o, pascalize: r, depascalize: o, camelizeKeys: function (t, e) {
                return n(p(i, e), t)
            }, decamelizeKeys: function (t, e) {
                return n(p(o, e), t, e)
            }, pascalizeKeys: function (t, e) {
                return n(p(r, e), t)
            }, depascalizeKeys: function () {
                return this.decamelizeKeys.apply(this, arguments)
            }
        }, t.exports ? t.exports = m : e.humps = m
    }(gt = {exports: {}}, gt.exports), gt.exports),
    bt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, wt = function (t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }, xt = Object.assign || function (t) {
        for (var e = arguments, n = 1; n < arguments.length; n++) {
            var i = e[n];
            for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
        }
        return t
    }, _t = function (t, e) {
        var n = {};
        for (var i in t) e.indexOf(i) >= 0 || Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
        return n
    };

function kt() {
    for (var t = arguments, e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = t[i];
    return n.reduce(function (t, e) {
        return Array.isArray(e) ? t = t.concat(e) : t.push(e), t
    }, [])
}

function Ot(t, e) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        r = (e.children || []).map(Ot.bind(null, t)), o = Object.keys(e.attributes || {}).reduce(function (t, n) {
            var i = e.attributes[n];
            switch (n) {
                case"class":
                    t.class = i.split(/\s+/).reduce(function (t, e) {
                        return t[e] = !0, t
                    }, {});
                    break;
                case"style":
                    t.style = i.split(";").map(function (t) {
                        return t.trim()
                    }).filter(function (t) {
                        return t
                    }).reduce(function (t, e) {
                        var n = e.indexOf(":"), i = yt.camelize(e.slice(0, n)), r = e.slice(n + 1).trim();
                        return t[i] = r, t
                    }, {});
                    break;
                default:
                    t.attrs[n] = i
            }
            return t
        }, {class: {}, style: {}, attrs: {}}), a = i.class, s = void 0 === a ? {} : a, l = i.style,
        c = void 0 === l ? {} : l, u = i.attrs, f = void 0 === u ? {} : u, d = _t(i, ["class", "style", "attrs"]);
    return "string" == typeof e ? e : t(e.tag, xt({
        class: kt(o.class, s),
        style: xt({}, o.style, c),
        attrs: xt({}, o.attrs, f)
    }, d, {props: n}), r)
}

var Tt = !1;
try {
    Tt = !0
} catch (t) {
}

function Ct(t, e) {
    return Array.isArray(e) && e.length > 0 || !Array.isArray(e) && e ? wt({}, t, e) : {}
}

function Nt(t) {
    return null === t ? null : "object" === (void 0 === t ? "undefined" : bt(t)) && t.prefix && t.iconName ? t : Array.isArray(t) && 2 === t.length ? {
        prefix: t[0],
        iconName: t[1]
    } : "string" == typeof t ? {prefix: "fas", iconName: t} : void 0
}

var zt = {
    name: "FontAwesomeIcon",
    functional: !0,
    props: {
        border: {type: Boolean, default: !1},
        fixedWidth: {type: Boolean, default: !1},
        flip: {
            type: String, default: null, validator: function (t) {
                return ["horizontal", "vertical", "both"].indexOf(t) > -1
            }
        },
        icon: {type: [Object, Array, String], required: !0},
        mask: {type: [Object, Array, String], default: null},
        listItem: {type: Boolean, default: !1},
        pull: {
            type: String, default: null, validator: function (t) {
                return ["right", "left"].indexOf(t) > -1
            }
        },
        pulse: {type: Boolean, default: !1},
        rotation: {
            type: [String, Number], default: null, validator: function (t) {
                return [90, 180, 270].indexOf(parseInt(t, 10)) > -1
            }
        },
        swapOpacity: {type: Boolean, default: !1},
        size: {
            type: String, default: null, validator: function (t) {
                return ["lg", "xs", "sm", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1
            }
        },
        spin: {type: Boolean, default: !1},
        transform: {type: [String, Object], default: null},
        symbol: {type: [Boolean, String], default: !1},
        title: {type: String, default: null},
        inverse: {type: Boolean, default: !1}
    },
    render: function (t, e) {
        var n = e.props, i = n.icon, r = n.mask, o = n.symbol, a = n.title, s = Nt(i), l = Ct("classes", function (t) {
                var e, n = (e = {
                    "fa-spin": t.spin,
                    "fa-pulse": t.pulse,
                    "fa-fw": t.fixedWidth,
                    "fa-border": t.border,
                    "fa-li": t.listItem,
                    "fa-inverse": t.inverse,
                    "fa-flip-horizontal": "horizontal" === t.flip || "both" === t.flip,
                    "fa-flip-vertical": "vertical" === t.flip || "both" === t.flip
                }, wt(e, "fa-" + t.size, null !== t.size), wt(e, "fa-rotate-" + t.rotation, null !== t.rotation), wt(e, "fa-pull-" + t.pull, null !== t.pull), wt(e, "fa-swap-opacity", t.swapOpacity), e);
                return Object.keys(n).map(function (t) {
                    return n[t] ? t : null
                }).filter(function (t) {
                    return t
                })
            }(n)), c = Ct("transform", "string" == typeof n.transform ? pt(n.transform) : n.transform),
            u = Ct("mask", Nt(r)), f = mt(s, xt({}, l, c, u, {symbol: o, title: a}));
        if (!f) return function () {
            var t;
            !Tt && console && "function" == typeof console.error && (t = console).error.apply(t, arguments)
        }("Could not find one or more icon(s)", s, u);
        var d = f.abstract;
        return Ot.bind(null, t)(d[0], {}, e.data)
    }
}, Et = {
    data: function () {
        return {
            validations: [],
            errors: {
                open: {
                    invalidInput: this.localization.open.invalidInput,
                    greaterThanNext: this.localization.open.greaterThanNext,
                    lessThanPrevious: this.localization.open.lessThanPrevious,
                    midnightNotLast: this.localization.open.midnightNotLast
                },
                close: {
                    invalidInput: this.localization.close.invalidInput,
                    lessThanPrevious: this.localization.close.lessThanPrevious,
                    greaterThanNext: this.localization.close.greaterThanNext,
                    midnightNotLast: this.localization.close.midnightNotLast
                }
            }
        }
    }, created: function () {
        this.runValidations()
    }, computed: {}, methods: {
        defaultValidation: function () {
            return {invalidInput: !1, greaterThanNext: !1, lessThanPrevious: !1, midnightNotLast: !1}
        }, defaultValidations: function () {
            return {anyErrors: !1, open: this.defaultValidation(), close: this.defaultValidation()}
        }, isValidInput: function (t) {
            return this.isValidBackendTime(t) || "2400" === t || "24hrs" === t || "" === t
        }, resetValidations: function () {
            var t = this, e = [];
            this.hours.forEach(function (n, i) {
                e[i] = t.defaultValidations()
            }), this.validations = e
        }, runValidations: function () {
            var t = this, e = 1;
            this.resetValidations(), this.hours.forEach(function (n, i) {
                t.runValidation(n.open, i, e, "open"), e++, t.runValidation(n.close, i, e, "close"), e++
            }), this.updateAnyErrors()
        }, runValidation: function (t, e, n, i) {
            this.isValidBackendTime(t) && (this.validations[e][i] = this.runInputValidation(t, e, n, this.totalInputs)), this.validations[e][i].invalidInput = !this.isValidInput(t), this.updateAdjacentValidations(e, i, n)
        }, runInputValidation: function (t, e, n, i) {
            var r = this.getPrevious(this.hours, e, n), o = this.getNext(this.hours, e, n, i),
                a = this.defaultValidation();
            return a.midnightNotLast = "2400" === t && !this.isLastInput(n, i), void 0 === r ? a.greaterThanNext = t >= o && "" !== o : void 0 === o ? a.lessThanPrevious = t <= r && "" !== r : (a.lessThanPrevious = t <= r && "" !== r, a.greaterThanNext = t >= o && "" !== o), a
        }, updateAdjacentValidations: function (t, e, n) {
            var i = t - 1, r = t + 1, o = this.validations[t][e], a = this.getPrevious(this.validations, t, n),
                s = this.getNext(this.validations, t, n, this.totalInputs);
            void 0 !== a && (o.lessThanPrevious ? a.greaterThanNext = !0 : o.lessThanPrevious || (a.greaterThanNext = !1)), void 0 !== s && (o.greaterThanNext ? s.lessThanPrevious = !0 : o.greaterThanNext || (s.lessThanPrevious = !1)), this.isFirstInput(n) || "open" !== e ? "close" === e && (this.validations[t].open = a) : this.validations[i].close = a, this.isLastInput(n, this.totalInputs) || "close" !== e ? "open" === e && (this.validations[t].close = s) : this.validations[r].open = s
        }, updateAnyErrors: function () {
            var t = this;
            this.validations.forEach(function (e, n) {
                return t.validations[n].anyErrors = t.anyErrors(e)
            })
        }, anyErrors: function (t) {
            return !(!this.anyError(t.open) && !this.anyError(t.close))
        }, anyError: function (t) {
            return Object.keys(t).some(function (e) {
                return !0 === t[e]
            })
        }, activeErrors: function (t) {
            var e = this.validations[t], n = [];
            return Object.keys(e).forEach(function (t) {
                if ("object" == typeof e[t]) {
                    var i = e[t];
                    Object.keys(i).filter(function (t) {
                        return !0 === i[t]
                    }).forEach(function (e) {
                        n.push({whichTime: t, error: e})
                    })
                }
            }), n
        }, errorMessage: function (t, e) {
            return this.errors[t][e]
        }
    }
};

function St() {
    throw new Error("setTimeout has not been defined")
}

function It() {
    throw new Error("clearTimeout has not been defined")
}

var Mt = St, At = It;

function jt(t) {
    if (Mt === setTimeout) return setTimeout(t, 0);
    if ((Mt === St || !Mt) && setTimeout) return Mt = setTimeout, setTimeout(t, 0);
    try {
        return Mt(t, 0)
    } catch (e) {
        try {
            return Mt.call(null, t, 0)
        } catch (e) {
            return Mt.call(this, t, 0)
        }
    }
}

"function" == typeof e.setTimeout && (Mt = setTimeout), "function" == typeof e.clearTimeout && (At = clearTimeout);
var Pt, Lt = [], Bt = !1, Ft = -1;

function Rt() {
    Bt && Pt && (Bt = !1, Pt.length ? Lt = Pt.concat(Lt) : Ft = -1, Lt.length && Ht())
}

function Ht() {
    if (!Bt) {
        var t = jt(Rt);
        Bt = !0;
        for (var e = Lt.length; e;) {
            for (Pt = Lt, Lt = []; ++Ft < e;) Pt && Pt[Ft].run();
            Ft = -1, e = Lt.length
        }
        Pt = null, Bt = !1, function (t) {
            if (At === clearTimeout) return clearTimeout(t);
            if ((At === It || !At) && clearTimeout) return At = clearTimeout, clearTimeout(t);
            try {
                At(t)
            } catch (e) {
                try {
                    return At.call(null, t)
                } catch (e) {
                    return At.call(this, t)
                }
            }
        }(t)
    }
}

function Dt(t, e) {
    this.fun = t, this.array = e
}

Dt.prototype.run = function () {
    this.fun.apply(null, this.array)
};

function Vt() {
}

var Ut = Vt, Wt = Vt, qt = Vt, Yt = Vt, Xt = Vt, $t = Vt, Kt = Vt;
var Jt = e.performance || {}, Gt = Jt.now || Jt.mozNow || Jt.msNow || Jt.oNow || Jt.webkitNow || function () {
    return (new Date).getTime()
};
var Zt = new Date;
var Qt, te = {
    nextTick: function (t) {
        var e = arguments, n = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) n[i - 1] = e[i];
        Lt.push(new Dt(t, n)), 1 !== Lt.length || Bt || jt(Ht)
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: Ut,
    addListener: Wt,
    once: qt,
    off: Yt,
    removeListener: Xt,
    removeAllListeners: $t,
    emit: Kt,
    binding: function (t) {
        throw new Error("process.binding is not supported")
    },
    cwd: function () {
        return "/"
    },
    chdir: function (t) {
        throw new Error("process.chdir is not supported")
    },
    umask: function () {
        return 0
    },
    hrtime: function (t) {
        var e = .001 * Gt.call(Jt), n = Math.floor(e), i = Math.floor(e % 1 * 1e9);
        return t && (n -= t[0], (i -= t[1]) < 0 && (n--, i += 1e9)), [n, i]
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function () {
        return (new Date - Zt) / 1e3
    }
};

function ee() {
    return "/tmp"
}

var ne = {
    EOL: "\n", tmpdir: ee, tmpDir: ee, networkInterfaces: function () {
    }, getNetworkInterfaces: function () {
    }, release: function () {
        return void 0 !== e.navigator ? e.navigator.appVersion : ""
    }, type: function () {
        return "Browser"
    }, cpus: function () {
        return []
    }, totalmem: function () {
        return Number.MAX_VALUE
    }, freemem: function () {
        return Number.MAX_VALUE
    }, uptime: function () {
        return 0
    }, loadavg: function () {
        return []
    }, hostname: function () {
        return void 0 !== e.location ? e.location.hostname : ""
    }, endianness: function () {
        if (void 0 === Qt) {
            var t = new ArrayBuffer(2), e = new Uint8Array(t), n = new Uint16Array(t);
            if (e[0] = 1, e[1] = 2, 258 === n[0]) Qt = "BE"; else {
                if (513 !== n[0]) throw new Error("unable to figure out endianess");
                Qt = "LE"
            }
        }
        return Qt
    }
}, ie = h(function (t) {
    var e = te && te.pid ? te.pid.toString(36) : "", n = "";
    if ("function" != typeof __webpack_require__) {
        var i = "", r = ne.networkInterfaces();
        for (var o in r) for (var a = r[o], s = a.length, l = 0; l < s; l++) if (a[l].mac && "00:00:00:00:00:00" != a[l].mac) {
            i = a[l].mac;
            break
        }
        n = i ? parseInt(i.replace(/\:|\D+/gi, "")).toString(36) : ""
    }

    function c() {
        var t = Date.now(), e = c.last || t;
        return c.last = t > e ? t : e + 1
    }

    t.exports = t.exports.default = function (t, i) {
        return (t || "") + n + e + c().toString(36) + (i || "")
    }, t.exports.process = function (t, n) {
        return (t || "") + e + c().toString(36) + (n || "")
    }, t.exports.time = function (t, e) {
        return (t || "") + c().toString(36) + (e || "")
    }
}), re = (ie.time, r({
    render: function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("transition-group", {tag: "div", attrs: {name: "fade"}}, t._l(t.hours, function (e, i) {
            var r = e.open, o = e.close, a = e.id;
            return e.isOpen, n("div", {key: a}, [n("div", {
                staticClass: "flex-table row",
                attrs: {role: "rowgroup"}
            }, [n("div", {
                staticClass: "flex-row day",
                attrs: {role: "cell"}
            }, [t.showDay(i) ? n("div", [t._v(t._s(t.localization.days[t.day]))]) : t._e()]), t._v(" "), n("div", {
                staticClass: "flex-row toggle",
                attrs: {role: "cell"}
            }, [t.showDay(i) ? n("ToggleButton", {
                attrs: {
                    value: t.anyOpen,
                    sync: !0,
                    labels: {checked: t.localization.switchOpen, unchecked: t.localization.switchClosed},
                    color: t.color,
                    width: t.switchWidth,
                    height: 25,
                    "font-size": 12
                }, on: {
                    change: function (e) {
                        t.toggleOpen(), t.resetHours(), t.runValidations()
                    }
                }
            }) : t._e()], 1), t._v(" "), n("transition", {attrs: {name: "fade"}}, [n("div", {
                directives: [{
                    name: "visible",
                    rawName: "v-visible",
                    value: t.isOpenToday,
                    expression: "isOpenToday"
                }], staticClass: "flex-row hours open", attrs: {role: "cell"}
            }, ["select" === t.type ? n("BusinessHoursSelect", {
                attrs: {
                    name: t.name,
                    "input-num": t.inputNum("open", i),
                    "total-inputs": t.totalInputs,
                    day: t.day,
                    hours: t.hours,
                    "time-increment": t.timeIncrement,
                    index: i,
                    "selected-time": r,
                    localization: t.localization,
                    "hour-format24": t.hourFormat24
                }, on: {
                    "input-change": function (e) {
                        return t.onChangeEventHandler("open", i, e)
                    }
                }
            }) : t._e(), t._v(" "), "datalist" === t.type ? n("BusinessHoursDatalist", {
                attrs: {
                    name: t.name,
                    "input-num": t.inputNum("open", i),
                    "total-inputs": t.totalInputs,
                    day: t.day,
                    hours: t.hours,
                    "time-increment": t.timeIncrement,
                    index: i,
                    "selected-time": r,
                    "any-error": t.anyError(t.validations[i].open),
                    localization: t.localization,
                    "hour-format24": t.hourFormat24
                }, on: {
                    "input-change": function (e) {
                        return t.onChangeEventHandler("open", i, e)
                    }
                }
            }) : t._e()], 1)]), t._v(" "), n("transition", {attrs: {name: "fade"}}, [n("div", {
                directives: [{
                    name: "visible",
                    rawName: "v-visible",
                    value: t.isOpenToday,
                    expression: "isOpenToday"
                }], staticClass: "flex-row dash", attrs: {role: "cell"}
            }, [t._v("-")])]), t._v(" "), n("transition", {attrs: {name: "fade"}}, [n("div", {
                directives: [{
                    name: "visible",
                    rawName: "v-visible",
                    value: t.isOpenToday,
                    expression: "isOpenToday"
                }], staticClass: "flex-row hours close", attrs: {role: "cell"}
            }, ["select" === t.type ? n("BusinessHoursSelect", {
                attrs: {
                    name: t.name,
                    "input-num": t.inputNum("close", i),
                    "total-inputs": t.totalInputs,
                    day: t.day,
                    hours: t.hours,
                    "time-increment": t.timeIncrement,
                    index: i,
                    "selected-time": o,
                    localization: t.localization,
                    "hour-format24": t.hourFormat24
                }, on: {
                    "input-change": function (e) {
                        return t.onChangeEventHandler("close", i, e)
                    }
                }
            }) : t._e(), t._v(" "), "datalist" === t.type ? n("BusinessHoursDatalist", {
                attrs: {
                    name: t.name,
                    "input-num": t.inputNum("close", i),
                    "total-inputs": t.totalInputs,
                    day: t.day,
                    hours: t.hours,
                    "time-increment": t.timeIncrement,
                    index: i,
                    "any-error": t.anyError(t.validations[i].close),
                    "updated-validations": t.validations[i].close,
                    "selected-time": o,
                    "hour-format24": t.hourFormat24,
                    localization: t.localization
                }, on: {
                    "input-change": function (e) {
                        return t.onChangeEventHandler("close", i, e)
                    }
                }
            }) : t._e()], 1)]), t._v(" "), n("div", {
                directives: [{
                    name: "visible",
                    rawName: "v-visible",
                    value: t.isOpenToday,
                    expression: "isOpenToday"
                }], staticClass: "flex-row remove", attrs: {role: "cell"}
            }, [t.showRemoveButton() ? n("button", {
                staticClass: "font-awesome-button",
                attrs: {type: "button"},
                on: {
                    click: function (e) {
                        return t.removeRow(i)
                    }
                }
            }, [n("FontAwesomeIcon", {
                staticClass: "fa-sm",
                attrs: {icon: "times"}
            })], 1) : t._e()]), t._v(" "), n("div", {
                directives: [{
                    name: "visible",
                    rawName: "v-visible",
                    value: t.isOpenToday,
                    expression: "isOpenToday"
                }], staticClass: "flex-row add", attrs: {role: "cell"}
            }, [t.showAddButton(i) ? n("button", {
                staticClass: "add-hours",
                style: {color: t.color},
                attrs: {type: "button"},
                on: {
                    click: function (e) {
                        return t.addRow()
                    }
                }
            }, [t._v(t._s(t.localization.addHours))]) : t._e()])], 1), t._v(" "), t.validations[i].anyErrors ? n("ul", {staticClass: "time-errors"}, t._l(t.activeErrors(i), function (e) {
                var i = e.whichTime, r = e.error;
                return n("li", {key: i + "." + r}, [t._v(t._s(t.errorMessage(i, r)))])
            }), 0) : t._e()])
        }), 0)
    }, staticRenderFns: []
}, function (t) {
    t && t("data-v-1b38e714_0", {
        source: ".flex-table[data-v-1b38e714]{display:flex;flex-flow:row nowrap;align-items:center;margin:.75em 0;height:45px;width:100%}.flex-row[data-v-1b38e714]{width:20%}.flex-row[data-v-1b38e714] input,.flex-row[data-v-1b38e714] select{margin:1px;padding:3px 5px;width:110px;height:28px;font-size:14px;line-height:28px;vertical-align:middle;border:1px solid #d5d5d5;box-sizing:border-box}.flex-row.day[data-v-1b38e714]{width:130px}.flex-row.hours[data-v-1b38e714]{width:110px}.flex-row.dash[data-v-1b38e714]{margin:0 7px;width:4px}.row-container[data-v-1b38e714]{flex-direction:column}.row[data-v-1b38e714]{flex-direction:row}.remove[data-v-1b38e714]{display:flex;justify-content:center;width:50px}label.vue-js-switch[data-v-1b38e714]{margin-bottom:0}button.add-hours[data-v-1b38e714],button.font-awesome-button[data-v-1b38e714]{height:30px;background-color:transparent;border-color:transparent;border-style:none;border-width:0;padding:0;cursor:pointer}button.add-hours[data-v-1b38e714]:focus,button.font-awesome-button[data-v-1b38e714]:focus{outline:0}button.font-awesome-button[data-v-1b38e714]{width:30px;font-size:24px}button.add-hours[data-v-1b38e714]{font-size:14px;font-weight:700}.fa-times[data-v-1b38e714]{color:#3d4852}.fade-enter-active[data-v-1b38e714],.fade-leave-active[data-v-1b38e714]{transition:opacity .2s ease}.fade-enter[data-v-1b38e714],.fade-leave-to[data-v-1b38e714]{opacity:0}.time-errors[data-v-1b38e714]{margin:0;padding:0;font-size:12px;color:#e3342f;list-style:none}.time-errors li[data-v-1b38e714]{margin-bottom:6px}",
        map: void 0,
        media: void 0
    })
}, {
    name: "BusinessHoursDay",
    components: {BusinessHoursSelect: o, BusinessHoursDatalist: f, ToggleButton: m, FontAwesomeIcon: zt},
    mixins: [n, Et],
    props: {
        day: {type: String, required: !0},
        hours: {type: Array, required: !0},
        name: {type: String, required: !0},
        timeIncrement: {type: Number, required: !0},
        type: {type: String, required: !0},
        color: {type: String, required: !0},
        localization: {type: Object},
        switchWidth: {type: Number},
        hourFormat24: {type: Boolean}
    },
    computed: {
        totalInputs: function () {
            return 2 * this.hours.length
        }, isOpenToday: function () {
            return this.hours[0].isOpen
        }, anyOpen: function () {
            return this.hours.some(function (t) {
                return !0 === t.isOpen
            })
        }
    },
    directives: {
        visible: function (t, e) {
            t.style.visibility = e.value ? "visible" : "hidden"
        }
    },
    methods: {
        onChangeEventHandler: function (t, e, n) {
            return "24hrs" == (n = this.backendInputFormat(n)) ? (this.hours.splice(1), this.hours[0].open = this.hours[0].close = n, this.runValidations(), void this.updateHours()) : "24hrs" != this.hours[e].open && "24hrs" != this.hours[e].close || "" != n ? !this.onlyOneRow(this.hours) && "" === n && ("open" === t && "" === this.hours[e].close || "close" === t && "" === this.hours[e].open) ? (this.removeRow(e), this.runValidations(), void this.updateHours()) : (this.hours[e][t] = n, this.runValidations(), void this.updateHours()) : (this.hours[e].open = this.hours[e].close = n, this.runValidations(), void this.updateHours())
        }, inputNum: function (t, e) {
            return "open" === t ? 2 * e + 1 : "close" === t ? 2 * e + 2 : void 0
        }, toggleOpen: function () {
            this.hours[0].isOpen = !this.hours[0].isOpen
        }, resetHours: function () {
            this.hours.splice(1), this.hours[0].open = this.hours[0].close = "", this.updateHours()
        }, addRow: function () {
            this.hours.push({id: ie(), open: "", close: "", isOpen: !0}), this.runValidations(), this.updateHours()
        }, removeRow: function (t) {
            this.hours.splice(t, 1), this.runValidations(), this.updateHours()
        }, showDay: function (t) {
            return !(t > 0)
        }, showRemoveButton: function () {
            return this.hours.length > 1
        }, showAddButton: function (t) {
            return !(this.hours.length !== t + 1 || "" === this.hours[t].open || "" === this.hours[t].close || "24hrs" === this.hours[t].open || "24hrs" === this.hours[t].close || "select" === this.type && 15 === this.timeIncrement && "2345" === this.hours[t].close || "select" === this.type && 30 === this.timeIncrement && "2330" === this.hours[t].close || "select" === this.type && 60 === this.timeIncrement && "2300" === this.hours[t].close || "2400" === this.hours[t].close || !1 !== this.validations[t].anyErrors)
        }, updateHours: function () {
            var t = {};
            t[this.day] = this.hours, this.$emit("hours-change", t)
        }
    }
}, "data-v-1b38e714", !1, void 0, u, void 0)), oe = r({
    render: function () {
        var t = this, e = t.$createElement, n = t._self._c || e;
        return n("div", {staticClass: "business-hours-container"}, t._l(t.days, function (e, i) {
            return n("business-hours-day", {
                key: i,
                attrs: {
                    day: i,
                    hours: e,
                    name: t.name,
                    "time-increment": t.timeIncrement,
                    type: t.type,
                    color: t.color,
                    localization: t.localization,
                    "switch-width": t.switchWidth,
                    "hour-format24": t.hourFormat24
                },
                on: {"hours-change": t.hoursChange}
            })
        }), 1)
    }, staticRenderFns: []
}, function (t) {
    t && t("data-v-a3472bc8_0", {
        source: ".business-hours-container[data-v-a3472bc8]{display:block;width:100%;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;color:#3d4852}",
        map: void 0,
        media: void 0
    })
}, {
    name: "BusinessHours", components: {BusinessHoursDay: re}, props: {
        days: {type: Object, required: !0},
        name: {type: String, default: "businessHours"},
        type: {
            type: String, default: "datalist", validator: function (t) {
                return -1 !== ["datalist", "select"].indexOf(t)
            }
        },
        timeIncrement: {
            type: Number, default: 30, validator: function (t) {
                return -1 !== [15, 30, 60].indexOf(t)
            }
        },
        color: {
            type: String, default: "#2779bd", validator: function (t) {
                return "#" === t.charAt(0)
            }
        },
        localization: {
            type: Object, default: function () {
                return {
                    switchOpen: "Open",
                    switchClosed: "Closed",
                    placeholderOpens: "Opens",
                    placeholderCloses: "Closes",
                    addHours: "Add hours",
                    open: {
                        invalidInput: 'Please enter an opening time in the 12 hour format (ie. 08:00 AM). You may also enter "24 hours".',
                        greaterThanNext: "Please enter an opening time that is before the closing time.",
                        lessThanPrevious: "Please enter an opening time that is after the previous closing time.",
                        midnightNotLast: "Midnight can only be selected for the day's last closing time."
                    },
                    close: {
                        invalidInput: 'Please enter a closing time in the 12 hour format (ie. 05:00 PM). You may also enter "24 hours" or "Midnight".',
                        greaterThanNext: "Please enter a closing time that is after the opening time.",
                        lessThanPrevious: "Please enter a closing time that is before the next opening time.",
                        midnightNotLast: "Midnight can only be selected for the day's last closing time."
                    },
                    t24hours: "24 hours",
                    midnight: "Midnight",
                    days: {
                        monday: "Monday",
                        tuesday: "Tuesday",
                        wednesday: "Wednesday",
                        thursday: "Thursday",
                        friday: "Friday",
                        saturday: "Saturday",
                        sunday: "Sunday",
                        newYearsEve: "New Year's Eve",
                        newYearsDay: "New Year's Day",
                        martinLutherKingJrDay: "Martin Luther King, Jr. Day",
                        presidentsDay: "Presidents' Day",
                        easter: "Easter",
                        memorialDay: "Memorial Day",
                        independenceDay: "Independence Day",
                        fourthOfJuly: "4th of July",
                        laborDay: "Labor Day",
                        columbusDay: "Columbus Day",
                        veteransDay: "Veterans Day",
                        thanksgiving: "Thanksgiving",
                        christmasEve: "Christmas Eve",
                        christmas: "Christmas"
                    }
                }
            }
        },
        switchWidth: {type: Number, default: 90},
        hourFormat24: {type: Boolean, default: !1}
    }, methods: {
        hoursChange: function (t) {
            this.$emit("updated-hours", t)
        }
    }
}, "data-v-a3472bc8", !1, void 0, u, void 0), ae = h(function (t, e) {
    Object.defineProperty(e, "__esModule", {value: !0});
    var n = [],
        i = "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z";
    e.definition = {
        prefix: "fas",
        iconName: "times",
        icon: [352, 512, n, "f00d", i]
    }, e.faTimes = e.definition, e.prefix = "fas", e.iconName = "times", e.width = 352, e.height = 512, e.ligatures = n, e.unicode = "f00d", e.svgPathData = i
});
d(ae);
ae.definition;
var se = ae.faTimes;
ae.prefix, ae.iconName, ae.width, ae.height, ae.ligatures, ae.unicode, ae.svgPathData;

function le(t) {
    le.installed || (le.installed = !0, t.component("BusinessHours", oe))
}

dt.add(se);
var ce = {install: le}, ue = null;
"undefined" != typeof window ? ue = window.Vue : void 0 !== e && (ue = e.Vue), ue && ue.use(ce), oe.install = le;
export default oe;
