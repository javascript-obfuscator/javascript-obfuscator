!function (t) {
    function e(e) {
        for (var n, a, l = e[0], u = e[1], h = e[2], c = 0, A = []; c < l.length; c++) a = l[c], Object.prototype.hasOwnProperty.call(r, a) && r[a] && A.push(r[a][0]), r[a] = 0;
        for (n in u) Object.prototype.hasOwnProperty.call(u, n) && (t[n] = u[n]);
        for (o && o(e); A.length;) A.shift()();
        return i.push.apply(i, h || []), s()
    }

    function s() {
        for (var t, e = 0; e < i.length; e++) {
            for (var s = i[e], n = !0, l = 1; l < s.length; l++) {
                var u = s[l];
                0 !== r[u] && (n = !1)
            }
            n && (i.splice(e--, 1), t = a(a.s = s[0]))
        }
        return t
    }

    var n = {}, r = {22: 0}, i = [];

    function a(e) {
        if (n[e]) return n[e].exports;
        var s = n[e] = {i: e, l: !1, exports: {}};
        return t[e].call(s.exports, s, s.exports, a), s.l = !0, s.exports
    }

    a.m = t, a.c = n, a.d = function (t, e, s) {
        a.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: s})
    }, a.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, a.t = function (t, e) {
        if (1 & e && (t = a(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (a.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var n in t) a.d(s, n, function (e) {
            return t[e]
        }.bind(null, n));
        return s
    }, a.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return a.d(e, "a", e), e
    }, a.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, a.p = "";
    var l = window.webpackJsonp = window.webpackJsonp || [], u = l.push.bind(l);
    l.push = e, l = l.slice();
    for (var h = 0; h < l.length; h++) e(l[h]);
    var o = u;
    i.push([153, 0]), s()
}({
    153: function (t, e, s) {
        "use strict";
        s.r(e);
        var n = s(25), r = s.n(n), i = s(3), a = s(21);

        class l {
            constructor() {
                var t, e, s;
                s = {
                    A: 0,
                    B: 1,
                    C: 2,
                    D: 3,
                    E: 4
                }, (e = "ANSWERS_LETTERS_TO_INDEX") in (t = this) ? Object.defineProperty(t, e, {
                    value: s,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = s
            }

            update(t) {
                this.answers = t
            }

            getAnswers(t) {
                return this.answers[t - 1]
            }

            aggregateAnswers() {
                const t = {};
                return this.ANSWERS_LETTERS.forEach(e => t[e] = 0), this.answers.forEach(e => {
                    e && (t[e] || (t[e] = 0), t[e]++)
                }), t
            }

            mapAnswerToValue(t, e) {
                return e[this.ANSWERS_LETTERS_TO_INDEX[t]]
            }

            consecutives() {
                const t = [], e = this.answers;
                for (var s = 0; s < e.length - 1; s++) t.push(!(e[s] !== e[s + 1] || !e[s]));
                return t
            }
        }

        function u(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function h(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function o(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function c(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function A(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function d(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function w(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function g(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function v(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function f(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function Q(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function p(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        function T(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        const m = {
            "basic-1": class extends l {
                constructor() {
                    super(), u(this, "ANSWERS_LETTERS", "ABCD".split("")), u(this, "TOTAL_ANSWERS", 4), u(this, "TOTAL_QUESTIONS", 3)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    return t ? t === this.getAnswers(2) : null
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    return t ? this.aggregateAnswers().B == this.mapAnswerToValue(t, [0, 1, 2, 3]) : null
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    return t ? this.aggregateAnswers().A == this.mapAnswerToValue(t, [0, 1, 2, 3]) : null
                }
            }, "basic-2": class extends l {
                constructor() {
                    super(), h(this, "ANSWERS_LETTERS", "ABCDE".split("")), h(this, "TOTAL_ANSWERS", 5), h(this, "TOTAL_QUESTIONS", 4)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    return t ? this.aggregateAnswers().A == this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) : null
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, -1]);
                    if ("E" === t) {
                        return 0 == this.aggregateAnswers().A
                    }
                    return this.answers.indexOf("A") === e - 1
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    return t ? this.mapAnswerToValue(t, ["C", "D", "E", "A", "B"]) === this.getAnswers(2) : null
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, ["C", "B", "A", "E", "D"]),
                        n = 1 === Object(i.filter)(e, t => t >= 2).length;
                    return e[s] >= 2 && n
                }
            }, "the-incredible-eight": class extends l {
                constructor() {
                    super(), o(this, "ANSWERS_LETTERS", "ABCD".split("")), o(this, "TOTAL_ANSWERS", 4), o(this, "TOTAL_QUESTIONS", 8)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    const e = this.aggregateAnswers().C;
                    return this.mapAnswerToValue(t, [1, 2, 3, 4]) === e
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, ["D", "B", "C", "A"]), s = this.aggregateAnswers(), n = s[e];
                    return 3 == Object(i.filter)(s, (t, e) => t > n).length
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, ["D", "C", "B", "A"]), s = this.aggregateAnswers(), n = s[e];
                    return 3 == Object(i.filter)(s, (t, e) => t < n).length
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.aggregateAnswers();
                    switch (t) {
                        case"A":
                            return 4 === e.A;
                        case"B":
                            return 1 === e.A;
                        case"C":
                            return 0 === e.B;
                        case"D":
                            return e.A === e.C
                    }
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [5, 6, 7, 1]);
                    return this.answers.indexOf("A") === e - 1
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = this.aggregateAnswers();
                    return Object(i.map)(e, (t, e) => t).sort().reverse()[0] === this.mapAnswerToValue(t, [3, 4, 5, 6])
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    if (!t) return null;
                    const e = [], s = this.answers;
                    for (var n = 0; n < s.length - 1; n++) e.push(!(s[n] !== s[n + 1] || !s[n]));
                    const r = 1 === Object(i.filter)(e, t => t).length, a = this.mapAnswerToValue(t, [1, 6, 0, 3]);
                    return r && e[a]
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, [4, 2, 3, 7]);
                    return t === this.getAnswers(s) && 2 === e[t]
                }
            }, "srq-1": class extends l {
                constructor() {
                    super(), c(this, "ANSWERS_LETTERS", "ABCDE".split("")), c(this, "TOTAL_ANSWERS", 5), c(this, "TOTAL_QUESTIONS", 10)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return this.answers.indexOf("E") === e - 1
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    this.aggregateAnswers();
                    const e = this.mapAnswerToValue(t, [9, 7, 5, 3, 1]), s = this.getAnswers(e),
                        n = Object(i.filter)([9, 7, 5, 3, 1], t => "B" === this.getAnswers(t));
                    return "B" === s && 1 === n.length
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    if (!t) return null;
                    const e = this.consecutives(), s = 1 === Object(i.filter)(e, t => t).length,
                        n = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return s && e[n]
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    this.aggregateAnswers();
                    const e = this.mapAnswerToValue(t, [2, 4, 6, 8, 10]), s = this.getAnswers(e),
                        n = Object(i.filter)([2, 4, 6, 8, 10], t => "A" === this.getAnswers(t));
                    return "A" === s && 1 === n.length
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    return t ? this.aggregateAnswers().B === this.mapAnswerToValue(t, [5, 4, 3, 2, 1]) : null
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = Object(i.range)(1, 10, 2).map(t => this.getAnswers(t)),
                        s = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), n = e.lastIndexOf(t);
                    return -1 !== n && n === s
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return t === this.getAnswers(e)
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), s = this.getAnswers(9);
                    if (!s) return !1;
                    const n = this.mapAnswerToValue(s, [0, 1, 2, 3, 4]), r = this.mapAnswerToValue(t, [4, 3, 2, 1, 0]);
                    return Math.abs(n - e) === r
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = e.B + e.C + e.D;
                    switch (t) {
                        case"A":
                            return -1 !== [1, 2, 3, 5, 7].indexOf(s);
                        case"B":
                            return -1 !== [1, 4, 9].indexOf(s);
                        case"C":
                            return -1 !== [1, 8].indexOf(s);
                        case"D":
                            return -1 !== [5, 10].indexOf(s);
                        case"E":
                            return -1 !== [1, 2, 6].indexOf(s)
                    }
                }

                validateQ10() {
                    return !!this.getAnswers(10) || null
                }
            }, "srq-2": class extends l {
                constructor() {
                    super(), A(this, "ANSWERS_LETTERS", "ABCDE".split("")), A(this, "TOTAL_ANSWERS", 5), A(this, "TOTAL_QUESTIONS", 10)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [8, 7, 6, 5, 4]);
                    return this.answers.indexOf("D") === e - 1
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    return t ? this.consecutives()[this.mapAnswerToValue(t, [2, 3, 4, 5, 6])] : null
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    return t ? this.aggregateAnswers().E === this.mapAnswerToValue(t, [1, 2, 3, 4, 5]) : null
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    return t ? this.aggregateAnswers().A === this.mapAnswerToValue(t, [1, 2, 3, 4, 5]) : null
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, ["A", "B", "C", "D", "E"]);
                    return e.A === e[s]
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = Object(i.range)(5, 10, 1).map(t => this.getAnswers(t)),
                        s = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), n = e.lastIndexOf("B");
                    return -1 !== n && n === s
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), s = this.getAnswers(8);
                    if (!s) return !1;
                    const n = this.mapAnswerToValue(s, [0, 1, 2, 3, 4]), r = this.mapAnswerToValue(t, [4, 3, 2, 1, 0]);
                    return Math.abs(n - e) === r
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return t === this.getAnswers(e)
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    const e = this.aggregateAnswers();
                    return this.mapAnswerToValue(t, [3, 4, 5, 6, 7]) === e.B + e.C + e.D
                }

                validateQ10() {
                    return !!this.getAnswers(10) || null
                }
            }, "srq-3": class extends l {
                constructor() {
                    super(), d(this, "ANSWERS_LETTERS", "ABCD".split("")), d(this, "TOTAL_ANSWERS", 4), d(this, "TOTAL_QUESTIONS", 10)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10()]
                }

                validateQ1() {
                    return !!this.getAnswers(1) || null
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.getAnswers(1), s = this.getAnswers(3);
                    if (!e || !s) return !1;
                    switch (t) {
                        case"A":
                            return t === s && t !== e;
                        case"B":
                            return t === e && t !== s;
                        case"C":
                            return t === e && t === s;
                        case"D":
                            return t !== e && t !== s
                    }
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    return t ? this.mapAnswerToValue(t, [0, 1, 2, 3]) === this.aggregateAnswers().A : null
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3]), s = this.consecutives();
                    return e === Object(i.filter)(s, t => t).length
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.getAnswers(4);
                    return !!e && this.mapAnswerToValue(t, ["C", "B", "A", "D"]) === e
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    return t ? 0 === this.aggregateAnswers()[this.mapAnswerToValue(t, ["A", "C", "D", "B"])] : null
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    return t ? "B" === t : null
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 2, 4]);
                    return this.aggregateAnswers()[t] - 1 === e
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    switch (t) {
                        case"A":
                            return !0;
                        case"B":
                            return !1;
                        case"C":
                            return !0;
                        case"D":
                            return !1
                    }
                }

                validateQ10() {
                    const t = this.getAnswers(10);
                    return t ? "D" !== t : null
                }
            }, "simple-srq-1": class extends l {
                constructor() {
                    super(), w(this, "ANSWERS_LETTERS", "ABCD".split("")), w(this, "TOTAL_ANSWERS", 4), w(this, "TOTAL_QUESTIONS", 5)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    return t ? 1 === this.aggregateAnswers()[t] : null
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, [3, 1, 5, 4]);
                    return t === this.getAnswers(s) && 2 === e[t]
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    return t ? this.mapAnswerToValue(t, ["B", "D", "A", "C"]) === this.getAnswers(5) : null
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [2, 3, 4, 5]);
                    return this.answers.indexOf("A") === e - 1
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    return t ? this.mapAnswerToValue(t, ["C", "B", "D", "A"]) === this.getAnswers(3) : null
                }
            }, "simple-srq-2": class extends l {
                constructor() {
                    super(), g(this, "ANSWERS_LETTERS", "ABCDE".split("")), g(this, "TOTAL_ANSWERS", 5), g(this, "TOTAL_QUESTIONS", 10)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10()]
                }

                validateQ1() {
                    return !!this.getAnswers(1) || null
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, ["B", "C", "D", "E", "A"]);
                    return "E" === t ? e.A === e.B && e.A === e.C && e.A === e.D && e.A === e.E : e.A === e[s]
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    return t ? this.mapAnswerToValue(t, ["E", "D", "C", "B", "A"]) === this.getAnswers(10) : null
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    return t ? this.mapAnswerToValue(t, ["A", "B", "C", "D", "E"]) === this.getAnswers(6) : null
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [3, 4, 5, 6, 7]);
                    return t === this.getAnswers(e)
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [3, 4, 5, 6, 7]);
                    return this.answers.indexOf("B") === e - 1
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    return t ? this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) === this.aggregateAnswers().C : null
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), s = this.getAnswers(9);
                    if (!s) return !1;
                    const n = this.mapAnswerToValue(s, [0, 1, 2, 3, 4]), r = this.mapAnswerToValue(t, [4, 3, 2, 1, 0]);
                    return Math.abs(n - e) === r
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = e.A + e.E;
                    switch (t) {
                        case"A":
                            return -1 !== [0, 2, 4, 6, 8, 10].indexOf(s);
                        case"B":
                            return -1 !== [1, 3, 5, 7, 9].indexOf(s);
                        case"C":
                            return -1 !== [1, 2, 3, 5, 7].indexOf(s);
                        case"D":
                            return -1 !== [1, 4, 9].indexOf(s);
                        case"E":
                            return -1 !== [5, 10].indexOf(s)
                    }
                }

                validateQ10() {
                    const t = this.getAnswers(10);
                    return t ? this.mapAnswerToValue(t, ["C", "D", "A", "B", "E"]) === this.getAnswers(3) : null
                }
            }, "simple-srq-3": class extends l {
                constructor() {
                    super(), v(this, "ANSWERS_LETTERS", "ABCDE".split("")), v(this, "TOTAL_ANSWERS", 5), v(this, "TOTAL_QUESTIONS", 5)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    if ("E" === t) {
                        return 0 == this.aggregateAnswers().A
                    }
                    {
                        const e = Object(i.range)(2, 6, 1).map(t => this.getAnswers(t)).indexOf("A");
                        return this.mapAnswerToValue(t, [0, 1, 2, 3]) === e
                    }
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]), s = this.aggregateAnswers();
                    return e === s.A + s.E
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [[2, 5], [2, 4], [1, 3], [1, 4], [3, 5]]),
                        s = this.aggregateAnswers(), n = this.getAnswers(e[0]), r = this.getAnswers(e[1]);
                    return "C" === n && "C" === r && 2 === s.C
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    return t ? this.mapAnswerToValue(t, ["A", "C", "B", "D", "E"]) === this.getAnswers(5) : null
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    return t ? this.mapAnswerToValue(t, ["A", "C", "D", "B", "E"]) === this.getAnswers(4) : null
                }
            }, "simple-srq-4": class extends l {
                constructor() {
                    super(), f(this, "ANSWERS_LETTERS", "ABCDE".split("")), f(this, "TOTAL_ANSWERS", 5), f(this, "TOTAL_QUESTIONS", 6)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    return t ? this.mapAnswerToValue(t, ["E", "D", "C", "B", "A"]) === this.getAnswers(2) : null
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]), s = this.getAnswers(e),
                        n = Object(i.filter)([1, 2, 3, 4, 5], t => "C" === this.getAnswers(t));
                    return "C" === s && 1 === n.length
                }

                validateQ3() {
                    return !!this.getAnswers(3) || null
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return this.aggregateAnswers().B === e
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.consecutives();
                    return e[this.mapAnswerToValue(t, [0, 1, 2, 3, 4])] && 1 === e.filter(t => t).length
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return t === this.getAnswers(e)
                }
            }, srat: class extends l {
                constructor() {
                    super(), Q(this, "ANSWERS_LETTERS", "ABCDE".split("")), Q(this, "TOTAL_ANSWERS", 5), Q(this, "TOTAL_QUESTIONS", 20)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10(), this.validateQ11(), this.validateQ12(), this.validateQ13(), this.validateQ14(), this.validateQ15(), this.validateQ16(), this.validateQ17(), this.validateQ18(), this.validateQ19(), this.validateQ20()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return this.answers.indexOf("B") === e - 1
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.consecutives(), s = 1 === Object(i.filter)(e, t => t).length,
                        n = this.mapAnswerToValue(t, [5, 6, 7, 8, 9]);
                    return s && e[n]
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    if (!t) return null;
                    const e = this.aggregateAnswers().E;
                    return this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) === e
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.aggregateAnswers().A;
                    return this.mapAnswerToValue(t, [4, 5, 6, 7, 8]) === e
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return t === this.getAnswers(e)
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = this.getAnswers(17);
                    switch (t) {
                        case"D":
                            if ("C" !== e && "D" !== e && "E" !== e) return !0;
                        case"E":
                            return !1;
                        default:
                            return this.mapAnswerToValue(t, ["C", "D", "E", "A", "B"]) === e
                    }
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), s = this.getAnswers(8);
                    if (!s) return !1;
                    const n = this.mapAnswerToValue(s, [0, 1, 2, 3, 4]), r = this.mapAnswerToValue(t, [4, 3, 2, 1, 0]);
                    return Math.abs(n - e) === r
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [4, 5, 6, 7, 8]), s = this.aggregateAnswers();
                    return e === s.A + s.E
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    const e = Object(i.range)(10, 15, 1).map(t => this.getAnswers(t)).indexOf(t);
                    return this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) === e
                }

                validateQ10() {
                    const t = this.getAnswers(10);
                    return t ? this.mapAnswerToValue(t, ["D", "A", "E", "B", "C"]) === this.getAnswers(16) : null
                }

                validateQ11() {
                    const t = this.getAnswers(11);
                    if (!t) return null;
                    const e = Object(i.range)(1, 11, 1).map(t => this.getAnswers(t));
                    return this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) === Object(i.filter)(e, t => "B" === t).length
                }

                validateQ12() {
                    const t = this.getAnswers(12);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = e.B + e.C + e.D;
                    switch (t) {
                        case"A":
                            return -1 !== [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].indexOf(s);
                        case"B":
                            return -1 !== [1, 3, 5, 7, 9, 11, 13, 15, 17, 19].indexOf(s);
                        case"C":
                            return -1 !== [1, 4, 9, 16].indexOf(s);
                        case"D":
                            return -1 !== [1, 2, 3, 5, 7, 11, 13, 17].indexOf(s);
                        case"E":
                            return -1 !== [5, 10, 15, 20].indexOf(s)
                    }
                }

                validateQ13() {
                    const t = this.getAnswers(13);
                    if (!t) return null;
                    this.aggregateAnswers();
                    const e = this.mapAnswerToValue(t, [9, 11, 13, 15, 17]), s = this.getAnswers(e),
                        n = Object(i.filter)([19, 17, 15, 13, 11, 9, 7, 5, 3, 1], t => "A" === this.getAnswers(t));
                    return "A" === s && 1 === n.length
                }

                validateQ14() {
                    const t = this.getAnswers(14);
                    if (!t) return null;
                    const e = this.aggregateAnswers().D;
                    return this.mapAnswerToValue(t, [6, 7, 8, 9, 10]) === e
                }

                validateQ15() {
                    const t = this.getAnswers(15);
                    return t ? this.mapAnswerToValue(t, ["A", "B", "C", "D", "E"]) === this.getAnswers(12) : null
                }

                validateQ16() {
                    const t = this.getAnswers(16);
                    return t ? this.mapAnswerToValue(t, ["D", "C", "B", "A", "E"]) === this.getAnswers(10) : null
                }

                validateQ17() {
                    const t = this.getAnswers(17);
                    if (!t) return null;
                    const e = this.getAnswers(6);
                    switch (t) {
                        case"D":
                            if ("C" !== e && "D" !== e && "E" !== e) return !0;
                        case"E":
                            return !1;
                        default:
                            return this.mapAnswerToValue(t, ["C", "D", "E", "A", "B"]) === e
                    }
                }

                validateQ18() {
                    const t = this.getAnswers(18);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, ["B", "C", "D", "E", "A"]);
                    return "E" === t ? e.A !== e.B && e.A !== e.C && e.A !== e.D && e.A !== e.E : e.A === e[s]
                }

                validateQ19() {
                    return !!this.getAnswers(19) || null
                }

                validateQ20() {
                    const t = this.getAnswers(20);
                    return t ? "E" === t : null
                }
            }, "dont-be-puzzled": class extends l {
                constructor() {
                    super(), p(this, "ANSWERS_LETTERS", "ABCDE".split("")), p(this, "TOTAL_ANSWERS", 5), p(this, "TOTAL_QUESTIONS", 10)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [4, 3, 2, 1, 1]), s = this.answers.indexOf("A");
                    return "E" === t ? s > 3 || -1 === s : s === e - 1
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    return t ? this.consecutives()[this.mapAnswerToValue(t, [2, 3, 4, 5, 6])] : null
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    if (!t) return null;
                    const e = Object(i.range)(4, 9, 1).map(t => this.getAnswers(t)).indexOf("A");
                    return this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) === e
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    [2, 4, 6, 8, 10].map(t => this.getAnswers(t));
                    const e = this.mapAnswerToValue(t, [2, 4, 6, 8, 10]);
                    return this.answers.indexOf("B") === e - 1
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    this.aggregateAnswers();
                    const e = this.mapAnswerToValue(t, [1, 3, 5, 7, 9]), s = this.getAnswers(e),
                        n = Object(i.filter)([1, 3, 5, 7, 9], t => "C" === this.getAnswers(t));
                    return "C" === s && 1 === n.length
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = Object(i.filter)([1, 2, 3, 4, 5], t => "D" === this.getAnswers(t)),
                        s = Object(i.filter)([7, 8, 9, 10], t => "D" === this.getAnswers(t)), n = e.length >= 1,
                        r = s.length >= 1;
                    switch (t) {
                        case"A":
                            return n && !r;
                        case"B":
                            return !n && r;
                        case"C":
                            return n && r;
                        case"D":
                        case"E":
                            return !1
                    }
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    if (!t) return null;
                    const e = Object(i.range)(5, 10, 1).map(t => this.getAnswers(t)),
                        s = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), n = e.lastIndexOf("E");
                    return -1 !== n && n === s
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.aggregateAnswers();
                    return this.mapAnswerToValue(t, [7, 6, 5, 4, 3]) === e.B + e.C + e.D
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), s = this.aggregateAnswers();
                    return e === s.A + s.E
                }

                validateQ10() {
                    return !!this.getAnswers(10) || null
                }
            }, "small-srat": class extends l {
                constructor() {
                    super(), T(this, "ANSWERS_LETTERS", "ABCDE".split("")), T(this, "TOTAL_ANSWERS", 5), T(this, "TOTAL_QUESTIONS", 10)
                }

                validade() {
                    return [this.validateQ1(), this.validateQ2(), this.validateQ3(), this.validateQ4(), this.validateQ5(), this.validateQ6(), this.validateQ7(), this.validateQ8(), this.validateQ9(), this.validateQ10()]
                }

                validateQ1() {
                    const t = this.getAnswers(1);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [2, 3, 4, 5, 6]);
                    return this.answers.indexOf("B") === e - 1
                }

                validateQ2() {
                    const t = this.getAnswers(2);
                    if (!t) return null;
                    const e = this.consecutives(), s = 1 === Object(i.filter)(e, t => t).length,
                        n = this.mapAnswerToValue(t, [1, 2, 3, 4, 5]);
                    return s && e[n]
                }

                validateQ3() {
                    const t = this.getAnswers(3);
                    if (!t) return null;
                    const e = Object(i.range)(6, 11, 1).map(t => this.getAnswers(t)),
                        s = this.mapAnswerToValue(t, [4, 3, 2, 1, 0]), n = e.lastIndexOf(t);
                    return -1 !== n && n === s
                }

                validateQ4() {
                    const t = this.getAnswers(4);
                    if (!t) return null;
                    const e = this.aggregateAnswers().A;
                    return this.mapAnswerToValue(t, [0, 1, 2, 3, 4]) === e
                }

                validateQ5() {
                    const t = this.getAnswers(5);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [10, 9, 8, 7, 6]);
                    return t === this.getAnswers(e)
                }

                validateQ6() {
                    const t = this.getAnswers(6);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = this.mapAnswerToValue(t, ["B", "C", "D", "E", "A"]);
                    return "E" === t ? e.A !== e.B && e.A !== e.C && e.A !== e.D && e.A !== e.E : e.A === e[s]
                }

                validateQ7() {
                    const t = this.getAnswers(7);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [0, 1, 2, 3, 4]), s = this.getAnswers(8);
                    if (!s) return !1;
                    const n = this.mapAnswerToValue(s, [0, 1, 2, 3, 4]), r = this.mapAnswerToValue(t, [4, 3, 2, 1, 0]);
                    return Math.abs(n - e) === r
                }

                validateQ8() {
                    const t = this.getAnswers(8);
                    if (!t) return null;
                    const e = this.mapAnswerToValue(t, [2, 3, 4, 5, 6]), s = this.aggregateAnswers();
                    return e === s.A + s.E
                }

                validateQ9() {
                    const t = this.getAnswers(9);
                    if (!t) return null;
                    const e = this.aggregateAnswers(), s = e.B + e.C + e.D;
                    switch (t) {
                        case"A":
                            return -1 !== [1, 2, 3, 5, 7].indexOf(s);
                        case"B":
                            return -1 !== [1, 2, 6].indexOf(s);
                        case"C":
                            return -1 !== [1, 4, 9].indexOf(s);
                        case"D":
                            return -1 !== [1, 8].indexOf(s);
                        case"E":
                            return -1 !== [5, 10].indexOf(s)
                    }
                }

                validateQ10() {
                    return !!this.getAnswers(10) || null
                }
            }
        };

        class E {
            constructor(t) {
                this.won = !1, this.puzzle = t, this.$questions = r()("div[data-question]"), this.setupListeners();
                const e = new m[this.puzzle.slug];
                this.quiz = e, this.answers_state = Object(i.range)(e.TOTAL_QUESTIONS).map(() => Object(i.range)(e.TOTAL_ANSWERS).map(() => null))
            }

            canToggle(t, e) {
                const {answers_state: s} = this;
                return !0 === s[t][e] || !Object(i.some)(s[t])
            }

            toggle(t, e) {
                if (!this.canToggle(t, e)) return;
                const {answers_state: s} = this;
                s[t][e] = {null: !1, true: null, false: !0}[s[t][e]]
            }

            onClick(t, e) {
                this.toggle(t, e), this.update()
            }

            update() {
                const t = this.getAnswers();
                this.quiz.update(t);
                const e = this.quiz.validade();
                this.updateUI(e), Object(i.every)(e) && !this.won && (this.won = !0, a.a.modalEndGame(), amplitude.getInstance().logEvent("srq-win", {slug: puzzle.slug}))
            }

            updateUI(t) {
                Object(i.forEach)(this.$questions, (e, s) => {
                    const n = r()(e);
                    n.removeClass("correct wrong");
                    const i = t[s];
                    null !== i && n.addClass(i ? "correct" : "wrong")
                }), Object(i.forEach)(this.$questions, (t, e) => {
                    const s = r()(t).find("ul > li"), n = Object(i.some)(this.answers_state[e]);
                    Object(i.forEach)(s, (t, s) => {
                        const i = r()(t);
                        i.removeClass();
                        const a = this.answers_state[e][s];
                        !0 === a ? i.addClass("correct") : ((!1 === a || n) && i.addClass("wrong"), n && i.addClass("inactive"))
                    })
                })
            }

            setupListeners() {
                this.$questions.on("click", "ul > li", t => {
                    const e = r()(t.currentTarget);
                    this.onClick(e.data("question"), e.data("alternative"))
                })
            }

            getAnswers() {
                return this.answers_state.map(t => {
                    const e = t.indexOf(!0);
                    return -1 != e ? this.quiz.ANSWERS_LETTERS[e] : null
                })
            }
        }

        let O = null;
        window.loadSRQ = t => {
            O = new E(t)
        }
    }, 16: function (t, e) {
        var s;
        s = function () {
            return this
        }();
        try {
            s = s || new Function("return this")()
        } catch (t) {
            "object" == typeof window && (s = window)
        }
        t.exports = s
    }, 21: function (t, e, s) {
        "use strict";
        s.d(e, "b", (function () {
            return i
        })), s.d(e, "a", (function () {
            return a
        }));
        var n = s(3);

        function r(t, e, s) {
            return e in t ? Object.defineProperty(t, e, {
                value: s,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = s, t
        }

        class i {
            constructor(t) {
                r(this, "$div", void 0), r(this, "$overlay", void 0), this.$div = t, this.$overlay = $('\n      <div class="overlay-endgame">\n        <div class="brand-wrapper">\n          <div class="brand"></div>\n        </div>\n      </div>')
            }

            show() {
                return this.$div.append(this.$overlay)
            }

            hide() {
                return this.$overlay.remove()
            }
        }

        class a {
            static modalBase(t, e) {
                const s = $("#modal-".concat(t));
                if (s.data("has-template")) {
                    const r = s.find(".modal-body"), i = $("#templateBody-".concat(t)),
                        a = Object(n.template)(i[0].innerHTML);
                    r.html(a(e))
                }
                return s.modal("show")
            }

            static modalEndGame(t) {
                const e = this.modalBase("end-game", t);
                return new Promise(t => {
                    e.on("hidden.bs.modal", () => t())
                })
            }
        }
    }, 24: function (t, e) {
        t.exports = function (t) {
            return t.webpackPolyfill || (t.deprecate = function () {
            }, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function () {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0, get: function () {
                    return t.i
                }
            }), t.webpackPolyfill = 1), t
        }
    }
});

console.log(1);