// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

// Place any jQuery/helper plugins in here.

// smoothscroll.js in here.

/*!
 * jQuery Smooth Scroll - v2.2.0 - 2017-05-05
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2017 Karl Swedberg
 * Licensed MIT
 */

!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof module && module.exports ? require("jquery") : jQuery
      );
})(function (a) {
  var b = {},
    c = {
      exclude: [],
      excludeWithin: [],
      offset: 0,
      direction: "top",
      delegateSelector: null,
      scrollElement: null,
      scrollTarget: null,
      autoFocus: !1,
      beforeScroll: function () {},
      afterScroll: function () {},
      easing: "swing",
      speed: 400,
      autoCoefficient: 2,
      preventDefault: !0,
    },
    d = function (b) {
      var c = [],
        d = !1,
        e = b.dir && "left" === b.dir ? "scrollLeft" : "scrollTop";
      return (
        this.each(function () {
          var b = a(this);
          if (this !== document && this !== window)
            return !document.scrollingElement ||
              (this !== document.documentElement && this !== document.body)
              ? void (b[e]() > 0
                  ? c.push(this)
                  : (b[e](1), (d = b[e]() > 0), d && c.push(this), b[e](0)))
              : (c.push(document.scrollingElement), !1);
        }),
        c.length ||
          this.each(function () {
            this === document.documentElement &&
              "smooth" === a(this).css("scrollBehavior") &&
              (c = [this]),
              c.length || "BODY" !== this.nodeName || (c = [this]);
          }),
        "first" === b.el && c.length > 1 && (c = [c[0]]),
        c
      );
    },
    e = /^([\-\+]=)(\d+)/;
  a.fn.extend({
    scrollable: function (a) {
      var b = d.call(this, { dir: a });
      return this.pushStack(b);
    },
    firstScrollable: function (a) {
      var b = d.call(this, { el: "first", dir: a });
      return this.pushStack(b);
    },
    smoothScroll: function (b, c) {
      if ("options" === (b = b || {}))
        return c
          ? this.each(function () {
              var b = a(this),
                d = a.extend(b.data("ssOpts") || {}, c);
              a(this).data("ssOpts", d);
            })
          : this.first().data("ssOpts");
      var d = a.extend({}, a.fn.smoothScroll.defaults, b),
        e = function (b) {
          var c = function (a) {
              return a.replace(/(:|\.|\/)/g, "\\$1");
            },
            e = this,
            f = a(this),
            g = a.extend({}, d, f.data("ssOpts") || {}),
            h = d.exclude,
            i = g.excludeWithin,
            j = 0,
            k = 0,
            l = !0,
            m = {},
            n = a.smoothScroll.filterPath(location.pathname),
            o = a.smoothScroll.filterPath(e.pathname),
            p = location.hostname === e.hostname || !e.hostname,
            q = g.scrollTarget || o === n,
            r = c(e.hash);
          if (
            (r && !a(r).length && (l = !1), g.scrollTarget || (p && q && r))
          ) {
            for (; l && j < h.length; ) f.is(c(h[j++])) && (l = !1);
            for (; l && k < i.length; ) f.closest(i[k++]).length && (l = !1);
          } else l = !1;
          l &&
            (g.preventDefault && b.preventDefault(),
            a.extend(m, g, { scrollTarget: g.scrollTarget || r, link: e }),
            a.smoothScroll(m));
        };
      return (
        null !== b.delegateSelector
          ? this.off("click.smoothscroll", b.delegateSelector).on(
              "click.smoothscroll",
              b.delegateSelector,
              e
            )
          : this.off("click.smoothscroll").on("click.smoothscroll", e),
        this
      );
    },
  });
  var f = function (a) {
      var b = { relative: "" },
        c = "string" == typeof a && e.exec(a);
      return (
        "number" == typeof a
          ? (b.px = a)
          : c && ((b.relative = c[1]), (b.px = parseFloat(c[2]) || 0)),
        b
      );
    },
    g = function (b) {
      var c = a(b.scrollTarget);
      b.autoFocus &&
        c.length &&
        (c[0].focus(),
        c.is(document.activeElement) ||
          (c.prop({ tabIndex: -1 }), c[0].focus())),
        b.afterScroll.call(b.link, b);
    };
  (a.smoothScroll = function (c, d) {
    if ("options" === c && "object" == typeof d) return a.extend(b, d);
    var e,
      h,
      i,
      j,
      k = f(c),
      l = {},
      m = 0,
      n = "offset",
      o = "scrollTop",
      p = {},
      q = {};
    k.px
      ? (e = a.extend({ link: null }, a.fn.smoothScroll.defaults, b))
      : ((e = a.extend({ link: null }, a.fn.smoothScroll.defaults, c || {}, b)),
        e.scrollElement &&
          ((n = "position"),
          "static" === e.scrollElement.css("position") &&
            e.scrollElement.css("position", "relative")),
        d && (k = f(d))),
      (o = "left" === e.direction ? "scrollLeft" : o),
      e.scrollElement
        ? ((h = e.scrollElement),
          k.px || /^(?:HTML|BODY)$/.test(h[0].nodeName) || (m = h[o]()))
        : (h = a("html, body").firstScrollable(e.direction)),
      e.beforeScroll.call(h, e),
      (l = k.px
        ? k
        : {
            relative: "",
            px:
              (a(e.scrollTarget)[n]() && a(e.scrollTarget)[n]()[e.direction]) ||
              0,
          }),
      (p[o] = l.relative + (l.px + m + e.offset)),
      (i = e.speed),
      "auto" === i &&
        ((j = Math.abs(p[o] - h[o]())), (i = j / e.autoCoefficient)),
      (q = {
        duration: i,
        easing: e.easing,
        complete: function () {
          g(e);
        },
      }),
      e.step && (q.step = e.step),
      h.length ? h.stop().animate(p, q) : g(e);
  }),
    (a.smoothScroll.version = "2.2.0"),
    (a.smoothScroll.filterPath = function (a) {
      return (
        (a = a || ""),
        a
          .replace(/^\//, "")
          .replace(/(?:index|default).[a-zA-Z]{3,4}$/, "")
          .replace(/\/$/, "")
      );
    }),
    (a.fn.smoothScroll.defaults = c);
});

/*! jQuery UI - v1.12.1 - 2021-06-24
 * http://jqueryui.com
 * Includes: widget.js, form-reset-mixin.js, keycode.js, labels.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/mouse.js, widgets/slider.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (u) {
  u.ui = u.ui || {};
  u.ui.version = "1.12.1";
  var n,
    i = 0,
    l = Array.prototype.slice;
  (u.cleanData =
    ((n = u.cleanData),
    function (t) {
      for (var e, i, s = 0; null != (i = t[s]); s++)
        try {
          (e = u._data(i, "events")) &&
            e.remove &&
            u(i).triggerHandler("remove");
        } catch (t) {}
      n(t);
    })),
    (u.widget = function (t, i, e) {
      var s,
        n,
        o,
        a = {},
        l = t.split(".")[0],
        h = l + "-" + (t = t.split(".")[1]);
      return (
        e || ((e = i), (i = u.Widget)),
        u.isArray(e) && (e = u.extend.apply(null, [{}].concat(e))),
        (u.expr[":"][h.toLowerCase()] = function (t) {
          return !!u.data(t, h);
        }),
        (u[l] = u[l] || {}),
        (s = u[l][t]),
        (n = u[l][t] =
          function (t, e) {
            if (!this._createWidget) return new n(t, e);
            arguments.length && this._createWidget(t, e);
          }),
        u.extend(n, s, {
          version: e.version,
          _proto: u.extend({}, e),
          _childConstructors: [],
        }),
        ((o = new i()).options = u.widget.extend({}, o.options)),
        u.each(e, function (e, s) {
          function n() {
            return i.prototype[e].apply(this, arguments);
          }
          function o(t) {
            return i.prototype[e].apply(this, t);
          }
          u.isFunction(s)
            ? (a[e] = function () {
                var t,
                  e = this._super,
                  i = this._superApply;
                return (
                  (this._super = n),
                  (this._superApply = o),
                  (t = s.apply(this, arguments)),
                  (this._super = e),
                  (this._superApply = i),
                  t
                );
              })
            : (a[e] = s);
        }),
        (n.prototype = u.widget.extend(
          o,
          { widgetEventPrefix: (s && o.widgetEventPrefix) || t },
          a,
          { constructor: n, namespace: l, widgetName: t, widgetFullName: h }
        )),
        s
          ? (u.each(s._childConstructors, function (t, e) {
              var i = e.prototype;
              u.widget(i.namespace + "." + i.widgetName, n, e._proto);
            }),
            delete s._childConstructors)
          : i._childConstructors.push(n),
        u.widget.bridge(t, n),
        n
      );
    }),
    (u.widget.extend = function (t) {
      for (var e, i, s = l.call(arguments, 1), n = 0, o = s.length; n < o; n++)
        for (e in s[n])
          (i = s[n][e]),
            s[n].hasOwnProperty(e) &&
              void 0 !== i &&
              (u.isPlainObject(i)
                ? (t[e] = u.isPlainObject(t[e])
                    ? u.widget.extend({}, t[e], i)
                    : u.widget.extend({}, i))
                : (t[e] = i));
      return t;
    }),
    (u.widget.bridge = function (o, e) {
      var a = e.prototype.widgetFullName || o;
      u.fn[o] = function (i) {
        var t = "string" == typeof i,
          s = l.call(arguments, 1),
          n = this;
        return (
          t
            ? this.length || "instance" !== i
              ? this.each(function () {
                  var t,
                    e = u.data(this, a);
                  return "instance" === i
                    ? ((n = e), !1)
                    : e
                    ? u.isFunction(e[i]) && "_" !== i.charAt(0)
                      ? (t = e[i].apply(e, s)) !== e && void 0 !== t
                        ? ((n = t && t.jquery ? n.pushStack(t.get()) : t), !1)
                        : void 0
                      : u.error(
                          "no such method '" +
                            i +
                            "' for " +
                            o +
                            " widget instance"
                        )
                    : u.error(
                        "cannot call methods on " +
                          o +
                          " prior to initialization; attempted to call method '" +
                          i +
                          "'"
                      );
                })
              : (n = void 0)
            : (s.length && (i = u.widget.extend.apply(null, [i].concat(s))),
              this.each(function () {
                var t = u.data(this, a);
                t
                  ? (t.option(i || {}), t._init && t._init())
                  : u.data(this, a, new e(i, this));
              })),
          n
        );
      };
    }),
    (u.Widget = function () {}),
    (u.Widget._childConstructors = []),
    (u.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",
      options: { classes: {}, disabled: !1, create: null },
      _createWidget: function (t, e) {
        (e = u(e || this.defaultElement || this)[0]),
          (this.element = u(e)),
          (this.uuid = i++),
          (this.eventNamespace = "." + this.widgetName + this.uuid),
          (this.bindings = u()),
          (this.hoverable = u()),
          (this.focusable = u()),
          (this.classesElementLookup = {}),
          e !== this &&
            (u.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function (t) {
                t.target === e && this.destroy();
              },
            }),
            (this.document = u(e.style ? e.ownerDocument : e.document || e)),
            (this.window = u(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          (this.options = u.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            t
          )),
          this._create(),
          this.options.disabled &&
            this._setOptionDisabled(this.options.disabled),
          this._trigger("create", null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: function () {
        return {};
      },
      _getCreateEventData: u.noop,
      _create: u.noop,
      _init: u.noop,
      destroy: function () {
        var i = this;
        this._destroy(),
          u.each(this.classesElementLookup, function (t, e) {
            i._removeClass(e, t);
          }),
          this.element.off(this.eventNamespace).removeData(this.widgetFullName),
          this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
          this.bindings.off(this.eventNamespace);
      },
      _destroy: u.noop,
      widget: function () {
        return this.element;
      },
      option: function (t, e) {
        var i,
          s,
          n,
          o = t;
        if (0 === arguments.length) return u.widget.extend({}, this.options);
        if ("string" == typeof t)
          if (((o = {}), (t = (i = t.split(".")).shift()), i.length)) {
            for (
              s = o[t] = u.widget.extend({}, this.options[t]), n = 0;
              n < i.length - 1;
              n++
            )
              (s[i[n]] = s[i[n]] || {}), (s = s[i[n]]);
            if (((t = i.pop()), 1 === arguments.length))
              return void 0 === s[t] ? null : s[t];
            s[t] = e;
          } else {
            if (1 === arguments.length)
              return void 0 === this.options[t] ? null : this.options[t];
            o[t] = e;
          }
        return this._setOptions(o), this;
      },
      _setOptions: function (t) {
        for (var e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function (t, e) {
        return (
          "classes" === t && this._setOptionClasses(e),
          (this.options[t] = e),
          "disabled" === t && this._setOptionDisabled(e),
          this
        );
      },
      _setOptionClasses: function (t) {
        var e, i, s;
        for (e in t)
          (s = this.classesElementLookup[e]),
            t[e] !== this.options.classes[e] &&
              s &&
              s.length &&
              ((i = u(s.get())),
              this._removeClass(s, e),
              i.addClass(
                this._classes({ element: i, keys: e, classes: t, add: !0 })
              ));
      },
      _setOptionDisabled: function (t) {
        this._toggleClass(
          this.widget(),
          this.widgetFullName + "-disabled",
          null,
          !!t
        ),
          t &&
            (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"));
      },
      enable: function () {
        return this._setOptions({ disabled: !1 });
      },
      disable: function () {
        return this._setOptions({ disabled: !0 });
      },
      _classes: function (n) {
        var o = [],
          a = this;
        function t(t, e) {
          for (var i, s = 0; s < t.length; s++)
            (i = a.classesElementLookup[t[s]] || u()),
              (i = n.add
                ? u(u.unique(i.get().concat(n.element.get())))
                : u(i.not(n.element).get())),
              (a.classesElementLookup[t[s]] = i),
              o.push(t[s]),
              e && n.classes[t[s]] && o.push(n.classes[t[s]]);
        }
        return (
          (n = u.extend(
            { element: this.element, classes: this.options.classes || {} },
            n
          )),
          this._on(n.element, { remove: "_untrackClassesElement" }),
          n.keys && t(n.keys.match(/\S+/g) || [], !0),
          n.extra && t(n.extra.match(/\S+/g) || []),
          o.join(" ")
        );
      },
      _untrackClassesElement: function (i) {
        var s = this;
        u.each(s.classesElementLookup, function (t, e) {
          -1 !== u.inArray(i.target, e) &&
            (s.classesElementLookup[t] = u(e.not(i.target).get()));
        });
      },
      _removeClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !1);
      },
      _addClass: function (t, e, i) {
        return this._toggleClass(t, e, i, !0);
      },
      _toggleClass: function (t, e, i, s) {
        s = "boolean" == typeof s ? s : i;
        var n = "string" == typeof t || null === t,
          t = {
            extra: n ? e : i,
            keys: n ? t : e,
            element: n ? this.element : t,
            add: s,
          };
        return t.element.toggleClass(this._classes(t), s), this;
      },
      _on: function (n, o, t) {
        var a,
          l = this;
        "boolean" != typeof n && ((t = o), (o = n), (n = !1)),
          t
            ? ((o = a = u(o)), (this.bindings = this.bindings.add(o)))
            : ((t = o), (o = this.element), (a = this.widget())),
          u.each(t, function (t, e) {
            function i() {
              if (
                n ||
                (!0 !== l.options.disabled &&
                  !u(this).hasClass("ui-state-disabled"))
              )
                return ("string" == typeof e ? l[e] : e).apply(l, arguments);
            }
            "string" != typeof e &&
              (i.guid = e.guid = e.guid || i.guid || u.guid++);
            var s = t.match(/^([\w:-]*)\s*(.*)$/),
              t = s[1] + l.eventNamespace,
              s = s[2];
            s ? a.on(t, s, i) : o.on(t, i);
          });
      },
      _off: function (t, e) {
        (e =
          (e || "").split(" ").join(this.eventNamespace + " ") +
          this.eventNamespace),
          t.off(e).off(e),
          (this.bindings = u(this.bindings.not(t).get())),
          (this.focusable = u(this.focusable.not(t).get())),
          (this.hoverable = u(this.hoverable.not(t).get()));
      },
      _delay: function (t, e) {
        var i = this;
        return setTimeout(function () {
          return ("string" == typeof t ? i[t] : t).apply(i, arguments);
        }, e || 0);
      },
      _hoverable: function (t) {
        (this.hoverable = this.hoverable.add(t)),
          this._on(t, {
            mouseenter: function (t) {
              this._addClass(u(t.currentTarget), null, "ui-state-hover");
            },
            mouseleave: function (t) {
              this._removeClass(u(t.currentTarget), null, "ui-state-hover");
            },
          });
      },
      _focusable: function (t) {
        (this.focusable = this.focusable.add(t)),
          this._on(t, {
            focusin: function (t) {
              this._addClass(u(t.currentTarget), null, "ui-state-focus");
            },
            focusout: function (t) {
              this._removeClass(u(t.currentTarget), null, "ui-state-focus");
            },
          });
      },
      _trigger: function (t, e, i) {
        var s,
          n,
          o = this.options[t];
        if (
          ((i = i || {}),
          ((e = u.Event(e)).type = (
            t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
          ).toLowerCase()),
          (e.target = this.element[0]),
          (n = e.originalEvent))
        )
          for (s in n) s in e || (e[s] = n[s]);
        return (
          this.element.trigger(e, i),
          !(
            (u.isFunction(o) &&
              !1 === o.apply(this.element[0], [e].concat(i))) ||
            e.isDefaultPrevented()
          )
        );
      },
    }),
    u.each({ show: "fadeIn", hide: "fadeOut" }, function (o, a) {
      u.Widget.prototype["_" + o] = function (e, t, i) {
        var s;
        "string" == typeof t && (t = { effect: t });
        var n = t ? (!0 !== t && "number" != typeof t && t.effect) || a : o;
        "number" == typeof (t = t || {}) && (t = { duration: t }),
          (s = !u.isEmptyObject(t)),
          (t.complete = i),
          t.delay && e.delay(t.delay),
          s && u.effects && u.effects.effect[n]
            ? e[o](t)
            : n !== o && e[n]
            ? e[n](t.duration, t.easing, i)
            : e.queue(function (t) {
                u(this)[o](), i && i.call(e[0]), t();
              });
      };
    });
  u.widget,
    (u.fn.form = function () {
      return "string" == typeof this[0].form
        ? this.closest("form")
        : u(this[0].form);
    }),
    (u.ui.formResetMixin = {
      _formResetHandler: function () {
        var e = u(this);
        setTimeout(function () {
          var t = e.data("ui-form-reset-instances");
          u.each(t, function () {
            this.refresh();
          });
        });
      },
      _bindFormResetHandler: function () {
        var t;
        (this.form = this.element.form()),
          this.form.length &&
            ((t = this.form.data("ui-form-reset-instances") || []).length ||
              this.form.on("reset.ui-form-reset", this._formResetHandler),
            t.push(this),
            this.form.data("ui-form-reset-instances", t));
      },
      _unbindFormResetHandler: function () {
        var t;
        this.form.length &&
          ((t = this.form.data("ui-form-reset-instances")).splice(
            u.inArray(this, t),
            1
          ),
          t.length
            ? this.form.data("ui-form-reset-instances", t)
            : this.form
                .removeData("ui-form-reset-instances")
                .off("reset.ui-form-reset"));
      },
    }),
    (u.ui.keyCode = {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    }),
    (u.ui.escapeSelector =
      ((e = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g),
      function (t) {
        return t.replace(e, "\\$1");
      })),
    (u.fn.labels = function () {
      var t, e, i;
      return this[0].labels && this[0].labels.length
        ? this.pushStack(this[0].labels)
        : ((e = this.eq(0).parents("label")),
          (t = this.attr("id")) &&
            ((i = (i = this.eq(0).parents().last()).add(
              (i.length ? i : this).siblings()
            )),
            (t = "label[for='" + u.ui.escapeSelector(t) + "']"),
            (e = e.add(i.find(t).addBack(t)))),
          this.pushStack(e));
    });
  var e,
    o = /ui-corner-([a-z]){2,6}/g;
  u.widget("ui.controlgroup", {
    version: "1.12.1",
    defaultElement: "<div>",
    options: {
      direction: "horizontal",
      disabled: null,
      onlyVisible: !0,
      items: {
        button:
          "input[type=button], input[type=submit], input[type=reset], button, a",
        controlgroupLabel: ".ui-controlgroup-label",
        checkboxradio: "input[type='checkbox'], input[type='radio']",
        selectmenu: "select",
        spinner: ".ui-spinner-input",
      },
    },
    _create: function () {
      this._enhance();
    },
    _enhance: function () {
      this.element.attr("role", "toolbar"), this.refresh();
    },
    _destroy: function () {
      this._callChildMethod("destroy"),
        this.childWidgets.removeData("ui-controlgroup-data"),
        this.element.removeAttr("role"),
        this.options.items.controlgroupLabel &&
          this.element
            .find(this.options.items.controlgroupLabel)
            .find(".ui-controlgroup-label-contents")
            .contents()
            .unwrap();
    },
    _initWidgets: function () {
      var o = this,
        a = [];
      u.each(this.options.items, function (s, t) {
        var e,
          n = {};
        if (t)
          return "controlgroupLabel" === s
            ? ((e = o.element.find(t)).each(function () {
                var t = u(this);
                t.children(".ui-controlgroup-label-contents").length ||
                  t
                    .contents()
                    .wrapAll(
                      "<span class='ui-controlgroup-label-contents'></span>"
                    );
              }),
              o._addClass(
                e,
                null,
                "ui-widget ui-widget-content ui-state-default"
              ),
              void (a = a.concat(e.get())))
            : void (
                u.fn[s] &&
                ((n = o["_" + s + "Options"]
                  ? o["_" + s + "Options"]("middle")
                  : { classes: {} }),
                o.element.find(t).each(function () {
                  var t = u(this),
                    e = t[s]("instance"),
                    i = u.widget.extend({}, n);
                  ("button" === s && t.parent(".ui-spinner").length) ||
                    ((e = e || t[s]()[s]("instance")) &&
                      (i.classes = o._resolveClassesValues(i.classes, e)),
                    t[s](i),
                    (i = t[s]("widget")),
                    u.data(i[0], "ui-controlgroup-data", e || t[s]("instance")),
                    a.push(i[0]));
                }))
              );
      }),
        (this.childWidgets = u(u.unique(a))),
        this._addClass(this.childWidgets, "ui-controlgroup-item");
    },
    _callChildMethod: function (e) {
      this.childWidgets.each(function () {
        var t = u(this).data("ui-controlgroup-data");
        t && t[e] && t[e]();
      });
    },
    _updateCornerClass: function (t, e) {
      e = this._buildSimpleOptions(e, "label").classes.label;
      this._removeClass(
        t,
        null,
        "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"
      ),
        this._addClass(t, null, e);
    },
    _buildSimpleOptions: function (t, e) {
      var i = "vertical" === this.options.direction,
        s = { classes: {} };
      return (
        (s.classes[e] = {
          middle: "",
          first: "ui-corner-" + (i ? "top" : "left"),
          last: "ui-corner-" + (i ? "bottom" : "right"),
          only: "ui-corner-all",
        }[t]),
        s
      );
    },
    _spinnerOptions: function (t) {
      t = this._buildSimpleOptions(t, "ui-spinner");
      return (
        (t.classes["ui-spinner-up"] = ""),
        (t.classes["ui-spinner-down"] = ""),
        t
      );
    },
    _buttonOptions: function (t) {
      return this._buildSimpleOptions(t, "ui-button");
    },
    _checkboxradioOptions: function (t) {
      return this._buildSimpleOptions(t, "ui-checkboxradio-label");
    },
    _selectmenuOptions: function (t) {
      var e = "vertical" === this.options.direction;
      return {
        width: e && "auto",
        classes: {
          middle: {
            "ui-selectmenu-button-open": "",
            "ui-selectmenu-button-closed": "",
          },
          first: {
            "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
            "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left"),
          },
          last: {
            "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
            "ui-selectmenu-button-closed":
              "ui-corner-" + (e ? "bottom" : "right"),
          },
          only: {
            "ui-selectmenu-button-open": "ui-corner-top",
            "ui-selectmenu-button-closed": "ui-corner-all",
          },
        }[t],
      };
    },
    _resolveClassesValues: function (i, s) {
      var n = {};
      return (
        u.each(i, function (t) {
          var e = s.options.classes[t] || "",
            e = u.trim(e.replace(o, ""));
          n[t] = (e + " " + i[t]).replace(/\s+/g, " ");
        }),
        n
      );
    },
    _setOption: function (t, e) {
      "direction" === t &&
        this._removeClass("ui-controlgroup-" + this.options.direction),
        this._super(t, e),
        "disabled" !== t
          ? this.refresh()
          : this._callChildMethod(e ? "disable" : "enable");
    },
    refresh: function () {
      var n,
        o = this;
      this._addClass(
        "ui-controlgroup ui-controlgroup-" + this.options.direction
      ),
        "horizontal" === this.options.direction &&
          this._addClass(null, "ui-helper-clearfix"),
        this._initWidgets(),
        (n = this.childWidgets),
        this.options.onlyVisible && (n = n.filter(":visible")),
        n.length &&
          (u.each(["first", "last"], function (t, e) {
            var i,
              s = n[e]().data("ui-controlgroup-data");
            s && o["_" + s.widgetName + "Options"]
              ? (((i = o["_" + s.widgetName + "Options"](
                  1 === n.length ? "only" : e
                )).classes = o._resolveClassesValues(i.classes, s)),
                s.element[s.widgetName](i))
              : o._updateCornerClass(n[e](), e);
          }),
          this._callChildMethod("refresh"));
    },
  });
  u.widget("ui.checkboxradio", [
    u.ui.formResetMixin,
    {
      version: "1.12.1",
      options: {
        disabled: null,
        label: null,
        icon: !0,
        classes: {
          "ui-checkboxradio-label": "ui-corner-all",
          "ui-checkboxradio-icon": "ui-corner-all",
        },
      },
      _getCreateOptions: function () {
        var t,
          e = this,
          i = this._super() || {};
        return (
          this._readType(),
          (t = this.element.labels()),
          (this.label = u(t[t.length - 1])),
          this.label.length ||
            u.error("No label found for checkboxradio widget"),
          (this.originalLabel = ""),
          this.label
            .contents()
            .not(this.element[0])
            .each(function () {
              e.originalLabel +=
                3 === this.nodeType ? u(this).text() : this.outerHTML;
            }),
          this.originalLabel && (i.label = this.originalLabel),
          null != (t = this.element[0].disabled) && (i.disabled = t),
          i
        );
      },
      _create: function () {
        var t = this.element[0].checked;
        this._bindFormResetHandler(),
          null == this.options.disabled &&
            (this.options.disabled = this.element[0].disabled),
          this._setOption("disabled", this.options.disabled),
          this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
          this._addClass(
            this.label,
            "ui-checkboxradio-label",
            "ui-button ui-widget"
          ),
          "radio" === this.type &&
            this._addClass(this.label, "ui-checkboxradio-radio-label"),
          this.options.label && this.options.label !== this.originalLabel
            ? this._updateLabel()
            : this.originalLabel && (this.options.label = this.originalLabel),
          this._enhance(),
          t &&
            (this._addClass(
              this.label,
              "ui-checkboxradio-checked",
              "ui-state-active"
            ),
            this.icon && this._addClass(this.icon, null, "ui-state-hover")),
          this._on({
            change: "_toggleClasses",
            focus: function () {
              this._addClass(
                this.label,
                null,
                "ui-state-focus ui-visual-focus"
              );
            },
            blur: function () {
              this._removeClass(
                this.label,
                null,
                "ui-state-focus ui-visual-focus"
              );
            },
          });
      },
      _readType: function () {
        var t = this.element[0].nodeName.toLowerCase();
        (this.type = this.element[0].type),
          ("input" === t && /radio|checkbox/.test(this.type)) ||
            u.error(
              "Can't create checkboxradio on element.nodeName=" +
                t +
                " and element.type=" +
                this.type
            );
      },
      _enhance: function () {
        this._updateIcon(this.element[0].checked);
      },
      widget: function () {
        return this.label;
      },
      _getRadioGroup: function () {
        var t = this.element[0].name,
          e = "input[name='" + u.ui.escapeSelector(t) + "']";
        return t
          ? (this.form.length
              ? u(this.form[0].elements).filter(e)
              : u(e).filter(function () {
                  return 0 === u(this).form().length;
                })
            ).not(this.element)
          : u([]);
      },
      _toggleClasses: function () {
        var t = this.element[0].checked;
        this._toggleClass(
          this.label,
          "ui-checkboxradio-checked",
          "ui-state-active",
          t
        ),
          this.options.icon &&
            "checkbox" === this.type &&
            this._toggleClass(
              this.icon,
              null,
              "ui-icon-check ui-state-checked",
              t
            )._toggleClass(this.icon, null, "ui-icon-blank", !t),
          "radio" === this.type &&
            this._getRadioGroup().each(function () {
              var t = u(this).checkboxradio("instance");
              t &&
                t._removeClass(
                  t.label,
                  "ui-checkboxradio-checked",
                  "ui-state-active"
                );
            });
      },
      _destroy: function () {
        this._unbindFormResetHandler(),
          this.icon && (this.icon.remove(), this.iconSpace.remove());
      },
      _setOption: function (t, e) {
        if ("label" !== t || e) {
          if ((this._super(t, e), "disabled" === t))
            return (
              this._toggleClass(this.label, null, "ui-state-disabled", e),
              void (this.element[0].disabled = e)
            );
          this.refresh();
        }
      },
      _updateIcon: function (t) {
        var e = "ui-icon ui-icon-background ";
        this.options.icon
          ? (this.icon ||
              ((this.icon = u("<span>")),
              (this.iconSpace = u("<span> </span>")),
              this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
            "checkbox" === this.type
              ? ((e += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank"),
                this._removeClass(
                  this.icon,
                  null,
                  t ? "ui-icon-blank" : "ui-icon-check"
                ))
              : (e += "ui-icon-blank"),
            this._addClass(this.icon, "ui-checkboxradio-icon", e),
            t ||
              this._removeClass(
                this.icon,
                null,
                "ui-icon-check ui-state-checked"
              ),
            this.icon.prependTo(this.label).after(this.iconSpace))
          : void 0 !== this.icon &&
            (this.icon.remove(), this.iconSpace.remove(), delete this.icon);
      },
      _updateLabel: function () {
        var t = this.label.contents().not(this.element[0]);
        this.icon && (t = t.not(this.icon[0])),
          this.iconSpace && (t = t.not(this.iconSpace[0])),
          t.remove(),
          this.label.append(this.options.label);
      },
      refresh: function () {
        var t = this.element[0].checked,
          e = this.element[0].disabled;
        this._updateIcon(t),
          this._toggleClass(
            this.label,
            "ui-checkboxradio-checked",
            "ui-state-active",
            t
          ),
          null !== this.options.label && this._updateLabel(),
          e !== this.options.disabled && this._setOptions({ disabled: e });
      },
    },
  ]);
  var t;
  u.ui.checkboxradio;
  u.widget("ui.button", {
    version: "1.12.1",
    defaultElement: "<button>",
    options: {
      classes: { "ui-button": "ui-corner-all" },
      disabled: null,
      icon: null,
      iconPosition: "beginning",
      label: null,
      showLabel: !0,
    },
    _getCreateOptions: function () {
      var t,
        e = this._super() || {};
      return (
        (this.isInput = this.element.is("input")),
        null != (t = this.element[0].disabled) && (e.disabled = t),
        (this.originalLabel = this.isInput
          ? this.element.val()
          : this.element.html()),
        this.originalLabel && (e.label = this.originalLabel),
        e
      );
    },
    _create: function () {
      !this.option.showLabel & !this.options.icon &&
        (this.options.showLabel = !0),
        null == this.options.disabled &&
          (this.options.disabled = this.element[0].disabled || !1),
        (this.hasTitle = !!this.element.attr("title")),
        this.options.label &&
          this.options.label !== this.originalLabel &&
          (this.isInput
            ? this.element.val(this.options.label)
            : this.element.html(this.options.label)),
        this._addClass("ui-button", "ui-widget"),
        this._setOption("disabled", this.options.disabled),
        this._enhance(),
        this.element.is("a") &&
          this._on({
            keyup: function (t) {
              t.keyCode === u.ui.keyCode.SPACE &&
                (t.preventDefault(),
                this.element[0].click
                  ? this.element[0].click()
                  : this.element.trigger("click"));
            },
          });
    },
    _enhance: function () {
      this.element.is("button") || this.element.attr("role", "button"),
        this.options.icon &&
          (this._updateIcon("icon", this.options.icon), this._updateTooltip());
    },
    _updateTooltip: function () {
      (this.title = this.element.attr("title")),
        this.options.showLabel ||
          this.title ||
          this.element.attr("title", this.options.label);
    },
    _updateIcon: function (t, e) {
      var i = "iconPosition" !== t,
        s = i ? this.options.iconPosition : e,
        t = "top" === s || "bottom" === s;
      this.icon
        ? i && this._removeClass(this.icon, null, this.options.icon)
        : ((this.icon = u("<span>")),
          this._addClass(this.icon, "ui-button-icon", "ui-icon"),
          this.options.showLabel || this._addClass("ui-button-icon-only")),
        i && this._addClass(this.icon, null, e),
        this._attachIcon(s),
        t
          ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
            this.iconSpace && this.iconSpace.remove())
          : (this.iconSpace ||
              ((this.iconSpace = u("<span> </span>")),
              this._addClass(this.iconSpace, "ui-button-icon-space")),
            this._removeClass(this.icon, null, "ui-wiget-icon-block"),
            this._attachIconSpace(s));
    },
    _destroy: function () {
      this.element.removeAttr("role"),
        this.icon && this.icon.remove(),
        this.iconSpace && this.iconSpace.remove(),
        this.hasTitle || this.element.removeAttr("title");
    },
    _attachIconSpace: function (t) {
      this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace);
    },
    _attachIcon: function (t) {
      this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon);
    },
    _setOptions: function (t) {
      var e = (void 0 === t.showLabel ? this.options : t).showLabel,
        i = (void 0 === t.icon ? this.options : t).icon;
      e || i || (t.showLabel = !0), this._super(t);
    },
    _setOption: function (t, e) {
      "icon" === t &&
        (e
          ? this._updateIcon(t, e)
          : this.icon &&
            (this.icon.remove(), this.iconSpace && this.iconSpace.remove())),
        "iconPosition" === t && this._updateIcon(t, e),
        "showLabel" === t &&
          (this._toggleClass("ui-button-icon-only", null, !e),
          this._updateTooltip()),
        "label" === t &&
          (this.isInput
            ? this.element.val(e)
            : (this.element.html(e),
              this.icon &&
                (this._attachIcon(this.options.iconPosition),
                this._attachIconSpace(this.options.iconPosition)))),
        this._super(t, e),
        "disabled" === t &&
          (this._toggleClass(null, "ui-state-disabled", e),
          (this.element[0].disabled = e) && this.element.blur());
    },
    refresh: function () {
      var t = this.element.is("input, button")
        ? this.element[0].disabled
        : this.element.hasClass("ui-button-disabled");
      t !== this.options.disabled && this._setOptions({ disabled: t }),
        this._updateTooltip();
    },
  }),
    !1 !== u.uiBackCompat &&
      (u.widget("ui.button", u.ui.button, {
        options: { text: !0, icons: { primary: null, secondary: null } },
        _create: function () {
          this.options.showLabel &&
            !this.options.text &&
            (this.options.showLabel = this.options.text),
            !this.options.showLabel &&
              this.options.text &&
              (this.options.text = this.options.showLabel),
            this.options.icon ||
            (!this.options.icons.primary && !this.options.icons.secondary)
              ? this.options.icon &&
                (this.options.icons.primary = this.options.icon)
              : this.options.icons.primary
              ? (this.options.icon = this.options.icons.primary)
              : ((this.options.icon = this.options.icons.secondary),
                (this.options.iconPosition = "end")),
            this._super();
        },
        _setOption: function (t, e) {
          "text" !== t
            ? ("showLabel" === t && (this.options.text = e),
              "icon" === t && (this.options.icons.primary = e),
              "icons" === t &&
                (e.primary
                  ? (this._super("icon", e.primary),
                    this._super("iconPosition", "beginning"))
                  : e.secondary &&
                    (this._super("icon", e.secondary),
                    this._super("iconPosition", "end"))),
              this._superApply(arguments))
            : this._super("showLabel", e);
        },
      }),
      (u.fn.button =
        ((t = u.fn.button),
        function () {
          return !this.length ||
            (this.length && "INPUT" !== this[0].tagName) ||
            (this.length &&
              "INPUT" === this[0].tagName &&
              "checkbox" !== this.attr("type") &&
              "radio" !== this.attr("type"))
            ? t.apply(this, arguments)
            : (u.ui.checkboxradio || u.error("Checkboxradio widget missing"),
              0 === arguments.length
                ? this.checkboxradio({ icon: !1 })
                : this.checkboxradio.apply(this, arguments));
        })),
      (u.fn.buttonset = function () {
        return (
          u.ui.controlgroup || u.error("Controlgroup widget missing"),
          "option" === arguments[0] && "items" === arguments[1] && arguments[2]
            ? this.controlgroup.apply(this, [
                arguments[0],
                "items.button",
                arguments[2],
              ])
            : "option" === arguments[0] && "items" === arguments[1]
            ? this.controlgroup.apply(this, [arguments[0], "items.button"])
            : ("object" == typeof arguments[0] &&
                arguments[0].items &&
                (arguments[0].items = { button: arguments[0].items }),
              this.controlgroup.apply(this, arguments))
        );
      }));
  u.ui.button,
    (u.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()));
  var a = !1;
  u(document).on("mouseup", function () {
    a = !1;
  });
  u.widget("ui.mouse", {
    version: "1.12.1",
    options: {
      cancel: "input, textarea, button, select, option",
      distance: 1,
      delay: 0,
    },
    _mouseInit: function () {
      var e = this;
      this.element
        .on("mousedown." + this.widgetName, function (t) {
          return e._mouseDown(t);
        })
        .on("click." + this.widgetName, function (t) {
          if (!0 === u.data(t.target, e.widgetName + ".preventClickEvent"))
            return (
              u.removeData(t.target, e.widgetName + ".preventClickEvent"),
              t.stopImmediatePropagation(),
              !1
            );
        }),
        (this.started = !1);
    },
    _mouseDestroy: function () {
      this.element.off("." + this.widgetName),
        this._mouseMoveDelegate &&
          this.document
            .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .off("mouseup." + this.widgetName, this._mouseUpDelegate);
    },
    _mouseDown: function (t) {
      if (!a) {
        (this._mouseMoved = !1),
          this._mouseStarted && this._mouseUp(t),
          (this._mouseDownEvent = t);
        var e = this,
          i = 1 === t.which,
          s =
            !("string" != typeof this.options.cancel || !t.target.nodeName) &&
            u(t.target).closest(this.options.cancel).length;
        return i && !s && this._mouseCapture(t)
          ? ((this.mouseDelayMet = !this.options.delay),
            this.mouseDelayMet ||
              (this._mouseDelayTimer = setTimeout(function () {
                e.mouseDelayMet = !0;
              }, this.options.delay)),
            this._mouseDistanceMet(t) &&
            this._mouseDelayMet(t) &&
            ((this._mouseStarted = !1 !== this._mouseStart(t)),
            !this._mouseStarted)
              ? (t.preventDefault(), !0)
              : (!0 ===
                  u.data(t.target, this.widgetName + ".preventClickEvent") &&
                  u.removeData(
                    t.target,
                    this.widgetName + ".preventClickEvent"
                  ),
                (this._mouseMoveDelegate = function (t) {
                  return e._mouseMove(t);
                }),
                (this._mouseUpDelegate = function (t) {
                  return e._mouseUp(t);
                }),
                this.document
                  .on("mousemove." + this.widgetName, this._mouseMoveDelegate)
                  .on("mouseup." + this.widgetName, this._mouseUpDelegate),
                t.preventDefault(),
                (a = !0)))
          : !0;
      }
    },
    _mouseMove: function (t) {
      if (this._mouseMoved) {
        if (
          u.ui.ie &&
          (!document.documentMode || document.documentMode < 9) &&
          !t.button
        )
          return this._mouseUp(t);
        if (!t.which)
          if (
            t.originalEvent.altKey ||
            t.originalEvent.ctrlKey ||
            t.originalEvent.metaKey ||
            t.originalEvent.shiftKey
          )
            this.ignoreMissingWhich = !0;
          else if (!this.ignoreMissingWhich) return this._mouseUp(t);
      }
      return (
        (t.which || t.button) && (this._mouseMoved = !0),
        this._mouseStarted
          ? (this._mouseDrag(t), t.preventDefault())
          : (this._mouseDistanceMet(t) &&
              this._mouseDelayMet(t) &&
              ((this._mouseStarted =
                !1 !== this._mouseStart(this._mouseDownEvent, t)),
              this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
      );
    },
    _mouseUp: function (t) {
      this.document
        .off("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .off("mouseup." + this.widgetName, this._mouseUpDelegate),
        this._mouseStarted &&
          ((this._mouseStarted = !1),
          t.target === this._mouseDownEvent.target &&
            u.data(t.target, this.widgetName + ".preventClickEvent", !0),
          this._mouseStop(t)),
        this._mouseDelayTimer &&
          (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer),
        (this.ignoreMissingWhich = !1),
        (a = !1),
        t.preventDefault();
    },
    _mouseDistanceMet: function (t) {
      return (
        Math.max(
          Math.abs(this._mouseDownEvent.pageX - t.pageX),
          Math.abs(this._mouseDownEvent.pageY - t.pageY)
        ) >= this.options.distance
      );
    },
    _mouseDelayMet: function () {
      return this.mouseDelayMet;
    },
    _mouseStart: function () {},
    _mouseDrag: function () {},
    _mouseStop: function () {},
    _mouseCapture: function () {
      return !0;
    },
  }),
    u.widget("ui.slider", u.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        classes: {
          "ui-slider": "ui-corner-all",
          "ui-slider-handle": "ui-corner-all",
          "ui-slider-range": "ui-corner-all ui-widget-header",
        },
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this._addClass(
            "ui-slider ui-slider-" + this.orientation,
            "ui-widget ui-widget-content"
          ),
          this._refresh(),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var t,
          e = this.options,
          i = this.element.find(".ui-slider-handle"),
          s = [],
          n = (e.values && e.values.length) || 1;
        for (
          i.length > n && (i.slice(n).remove(), (i = i.slice(0, n))),
            t = i.length;
          t < n;
          t++
        )
          s.push("<span tabindex='0'></span>");
        (this.handles = i.add(u(s.join("")).appendTo(this.element))),
          this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            u(this).data("ui-slider-handle-index", t).attr("tabIndex", 0);
          });
      },
      _createRange: function () {
        var t = this.options;
        t.range
          ? (!0 === t.range &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : u.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? (this._removeClass(
                  this.range,
                  "ui-slider-range-min ui-slider-range-max"
                ),
                this.range.css({ left: "", bottom: "" }))
              : ((this.range = u("<div>").appendTo(this.element)),
                this._addClass(this.range, "ui-slider-range")),
            ("min" !== t.range && "max" !== t.range) ||
              this._addClass(this.range, "ui-slider-range-" + t.range))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var i,
          s,
          n,
          o,
          e,
          a,
          l = this,
          h = this.options;
        return (
          !h.disabled &&
          ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (a = { x: t.pageX, y: t.pageY }),
          (i = this._normValueFromMouse(a)),
          (s = this._valueMax() - this._valueMin() + 1),
          this.handles.each(function (t) {
            var e = Math.abs(i - l.values(t));
            (e < s ||
              (s === e &&
                (t === l._lastChangedValue || l.values(t) === h.min))) &&
              ((s = e), (n = u(this)), (o = t));
          }),
          !1 !== this._start(t, o) &&
            ((this._mouseSliding = !0),
            (this._handleIndex = o),
            this._addClass(n, null, "ui-state-active"),
            n.trigger("focus"),
            (e = n.offset()),
            (a = !u(t.target).parents().addBack().is(".ui-slider-handle")),
            (this._clickOffset = a
              ? { left: 0, top: 0 }
              : {
                  left: t.pageX - e.left - n.width() / 2,
                  top:
                    t.pageY -
                    e.top -
                    n.height() / 2 -
                    (parseInt(n.css("borderTopWidth"), 10) || 0) -
                    (parseInt(n.css("borderBottomWidth"), 10) || 0) +
                    (parseInt(n.css("marginTop"), 10) || 0),
                }),
            this.handles.hasClass("ui-state-hover") || this._slide(t, o, i),
            (this._animateOff = !0)))
        );
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (t) {
        var e = { x: t.pageX, y: t.pageY },
          e = this._normValueFromMouse(e);
        return this._slide(t, this._handleIndex, e), !1;
      },
      _mouseStop: function (t) {
        return (
          this._removeClass(this.handles, null, "ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(t, this._handleIndex),
          this._change(t, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1)
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (t) {
        var e,
          t =
            "horizontal" === this.orientation
              ? ((e = this.elementSize.width),
                t.x -
                  this.elementOffset.left -
                  (this._clickOffset ? this._clickOffset.left : 0))
              : ((e = this.elementSize.height),
                t.y -
                  this.elementOffset.top -
                  (this._clickOffset ? this._clickOffset.top : 0)),
          t = t / e;
        return (
          1 < t && (t = 1),
          t < 0 && (t = 0),
          "vertical" === this.orientation && (t = 1 - t),
          (e = this._valueMax() - this._valueMin()),
          (e = this._valueMin() + t * e),
          this._trimAlignValue(e)
        );
      },
      _uiHash: function (t, e, i) {
        var s = {
          handle: this.handles[t],
          handleIndex: t,
          value: void 0 !== e ? e : this.value(),
        };
        return (
          this._hasMultipleValues() &&
            ((s.value = void 0 !== e ? e : this.values(t)),
            (s.values = i || this.values())),
          s
        );
      },
      _hasMultipleValues: function () {
        return this.options.values && this.options.values.length;
      },
      _start: function (t, e) {
        return this._trigger("start", t, this._uiHash(e));
      },
      _slide: function (t, e, i) {
        var s,
          n = this.value(),
          o = this.values();
        this._hasMultipleValues() &&
          ((s = this.values(e ? 0 : 1)),
          (n = this.values(e)),
          2 === this.options.values.length &&
            !0 === this.options.range &&
            (i = 0 === e ? Math.min(s, i) : Math.max(s, i)),
          (o[e] = i)),
          i !== n &&
            !1 !== this._trigger("slide", t, this._uiHash(e, i, o)) &&
            (this._hasMultipleValues() ? this.values(e, i) : this.value(i));
      },
      _stop: function (t, e) {
        this._trigger("stop", t, this._uiHash(e));
      },
      _change: function (t, e) {
        this._keySliding ||
          this._mouseSliding ||
          ((this._lastChangedValue = e),
          this._trigger("change", t, this._uiHash(e)));
      },
      value: function (t) {
        return arguments.length
          ? ((this.options.value = this._trimAlignValue(t)),
            this._refreshValue(),
            void this._change(null, 0))
          : this._value();
      },
      values: function (t, e) {
        var i, s, n;
        if (1 < arguments.length)
          return (
            (this.options.values[t] = this._trimAlignValue(e)),
            this._refreshValue(),
            void this._change(null, t)
          );
        if (!arguments.length) return this._values();
        if (!u.isArray(t))
          return this._hasMultipleValues() ? this._values(t) : this.value();
        for (i = this.options.values, s = t, n = 0; n < i.length; n += 1)
          (i[n] = this._trimAlignValue(s[n])), this._change(null, n);
        this._refreshValue();
      },
      _setOption: function (t, e) {
        var i,
          s = 0;
        switch (
          ("range" === t &&
            !0 === this.options.range &&
            ("min" === e
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === e &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          u.isArray(this.options.values) && (s = this.options.values.length),
          this._super(t, e),
          t)
        ) {
          case "orientation":
            this._detectOrientation(),
              this._removeClass(
                "ui-slider-horizontal ui-slider-vertical"
              )._addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.options.range && this._refreshRange(e),
              this.handles.css("horizontal" === e ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), i = s - 1;
              0 <= i;
              i--
            )
              this._change(null, i);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _setOptionDisabled: function (t) {
        this._super(t), this._toggleClass(null, "ui-state-disabled", !!t);
      },
      _value: function () {
        var t = this.options.value;
        return (t = this._trimAlignValue(t));
      },
      _values: function (t) {
        var e, i, s;
        if (arguments.length)
          return (e = this.options.values[t]), this._trimAlignValue(e);
        if (this._hasMultipleValues()) {
          for (i = this.options.values.slice(), s = 0; s < i.length; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (t) {
        if (t <= this._valueMin()) return this._valueMin();
        if (t >= this._valueMax()) return this._valueMax();
        var e = 0 < this.options.step ? this.options.step : 1,
          i = (t - this._valueMin()) % e,
          t = t - i;
        return (
          2 * Math.abs(i) >= e && (t += 0 < i ? e : -e),
          parseFloat(t.toFixed(5))
        );
      },
      _calculateNewMax: function () {
        var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step;
        (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i),
          (this.max = parseFloat(t.toFixed(this._precision())));
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (
          null !== this.options.min &&
            (t = Math.max(t, this._precisionOf(this.options.min))),
          t
        );
      },
      _precisionOf: function (t) {
        var e = t.toString(),
          t = e.indexOf(".");
        return -1 === t ? 0 : e.length - t - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshRange: function (t) {
        "vertical" === t && this.range.css({ width: "", left: "" }),
          "horizontal" === t && this.range.css({ height: "", bottom: "" });
      },
      _refreshValue: function () {
        var e,
          i,
          t,
          s,
          n,
          o = this.options.range,
          a = this.options,
          l = this,
          h = !this._animateOff && a.animate,
          r = {};
        this._hasMultipleValues()
          ? this.handles.each(function (t) {
              (i =
                ((l.values(t) - l._valueMin()) /
                  (l._valueMax() - l._valueMin())) *
                100),
                (r["horizontal" === l.orientation ? "left" : "bottom"] =
                  i + "%"),
                u(this).stop(1, 1)[h ? "animate" : "css"](r, a.animate),
                !0 === l.options.range &&
                  ("horizontal" === l.orientation
                    ? (0 === t &&
                        l.range
                          .stop(1, 1)
                          [h ? "animate" : "css"]({ left: i + "%" }, a.animate),
                      1 === t &&
                        l.range[h ? "animate" : "css"](
                          { width: i - e + "%" },
                          { queue: !1, duration: a.animate }
                        ))
                    : (0 === t &&
                        l.range
                          .stop(1, 1)
                          [h ? "animate" : "css"](
                            { bottom: i + "%" },
                            a.animate
                          ),
                      1 === t &&
                        l.range[h ? "animate" : "css"](
                          { height: i - e + "%" },
                          { queue: !1, duration: a.animate }
                        ))),
                (e = i);
            })
          : ((t = this.value()),
            (s = this._valueMin()),
            (n = this._valueMax()),
            (i = n !== s ? ((t - s) / (n - s)) * 100 : 0),
            (r["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[h ? "animate" : "css"](r, a.animate),
            "min" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: i + "%" }, a.animate),
            "max" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: 100 - i + "%" }, a.animate),
            "min" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: i + "%" }, a.animate),
            "max" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: 100 - i + "%" }, a.animate));
      },
      _handleEvents: {
        keydown: function (t) {
          var e,
            i,
            s,
            n = u(t.target).data("ui-slider-handle-index");
          switch (t.keyCode) {
            case u.ui.keyCode.HOME:
            case u.ui.keyCode.END:
            case u.ui.keyCode.PAGE_UP:
            case u.ui.keyCode.PAGE_DOWN:
            case u.ui.keyCode.UP:
            case u.ui.keyCode.RIGHT:
            case u.ui.keyCode.DOWN:
            case u.ui.keyCode.LEFT:
              if (
                (t.preventDefault(),
                !this._keySliding &&
                  ((this._keySliding = !0),
                  this._addClass(u(t.target), null, "ui-state-active"),
                  !1 === this._start(t, n)))
              )
                return;
          }
          switch (
            ((s = this.options.step),
            (e = i = this._hasMultipleValues() ? this.values(n) : this.value()),
            t.keyCode)
          ) {
            case u.ui.keyCode.HOME:
              i = this._valueMin();
              break;
            case u.ui.keyCode.END:
              i = this._valueMax();
              break;
            case u.ui.keyCode.PAGE_UP:
              i = this._trimAlignValue(
                e + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case u.ui.keyCode.PAGE_DOWN:
              i = this._trimAlignValue(
                e - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case u.ui.keyCode.UP:
            case u.ui.keyCode.RIGHT:
              if (e === this._valueMax()) return;
              i = this._trimAlignValue(e + s);
              break;
            case u.ui.keyCode.DOWN:
            case u.ui.keyCode.LEFT:
              if (e === this._valueMin()) return;
              i = this._trimAlignValue(e - s);
          }
          this._slide(t, n, i);
        },
        keyup: function (t) {
          var e = u(t.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(t, e),
            this._change(t, e),
            this._removeClass(u(t.target), null, "ui-state-active"));
        },
      },
    });
});

/* img zoom */

/*!
 * @name        easyzoom
 * @author       <>
 * @modified    Friday, May 15th, 2020
 * @version     2.5.2
 */
!(function (t, e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], function (t) {
        e(t);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = t.EasyZoom = e(require("jquery")))
    : (t.EasyZoom = e(t.jQuery));
})(this, function (o) {
  "use strict";
  var c,
    l,
    d,
    p,
    u,
    f,
    i = {
      loadingNotice: "Loading image",
      errorNotice: "The image could not be loaded",
      errorDuration: 2500,
      linkAttribute: "href",
      preventClicks: !0,
      beforeShow: o.noop,
      beforeHide: o.noop,
      onShow: o.noop,
      onHide: o.noop,
      onMove: o.noop,
    };
  function s(t, e) {
    (this.$target = o(t)),
      (this.opts = o.extend({}, i, e, this.$target.data())),
      void 0 === this.isOpen && this._init();
  }
  return (
    (s.prototype._init = function () {
      (this.$link = this.$target.find("a")),
        (this.$image = this.$target.find("img")),
        (this.$flyout = o('<div class="easyzoom-flyout" />')),
        (this.$notice = o('<div class="easyzoom-notice" />')),
        this.$target.on({
          "mousemove.easyzoom touchmove.easyzoom": o.proxy(this._onMove, this),
          "mouseleave.easyzoom touchend.easyzoom": o.proxy(this._onLeave, this),
          "mouseenter.easyzoom touchstart.easyzoom": o.proxy(
            this._onEnter,
            this
          ),
        }),
        this.opts.preventClicks &&
          this.$target.on("click.easyzoom", function (t) {
            t.preventDefault();
          });
    }),
    (s.prototype.show = function (t, e) {
      var i = this;
      if (!1 !== this.opts.beforeShow.call(this)) {
        if (!this.isReady)
          return this._loadImage(
            this.$link.attr(this.opts.linkAttribute),
            function () {
              (!i.isMouseOver && e) || i.show(t);
            }
          );
        this.$target.append(this.$flyout);
        var o = this.$target.outerWidth(),
          s = this.$target.outerHeight(),
          h = this.$flyout.width(),
          n = this.$flyout.height(),
          a = this.$zoom.width(),
          r = this.$zoom.height();
        (c = Math.ceil(a - h)),
          (l = Math.ceil(r - n)),
          c < 0 && (c = 0),
          l < 0 && (l = 0),
          (d = c / o),
          (p = l / s),
          (this.isOpen = !0),
          this.opts.onShow.call(this),
          t && this._move(t);
      }
    }),
    (s.prototype._onEnter = function (t) {
      var e = t.originalEvent.touches;
      (this.isMouseOver = !0),
        (e && 1 != e.length) || (t.preventDefault(), this.show(t, !0));
    }),
    (s.prototype._onMove = function (t) {
      this.isOpen && (t.preventDefault(), this._move(t));
    }),
    (s.prototype._onLeave = function () {
      (this.isMouseOver = !1), this.isOpen && this.hide();
    }),
    (s.prototype._onLoad = function (t) {
      t.currentTarget.width &&
        ((this.isReady = !0),
        this.$notice.detach(),
        this.$flyout.html(this.$zoom),
        this.$target.removeClass("is-loading").addClass("is-ready"),
        t.data.call && t.data());
    }),
    (s.prototype._onError = function () {
      var t = this;
      this.$notice.text(this.opts.errorNotice),
        this.$target.removeClass("is-loading").addClass("is-error"),
        (this.detachNotice = setTimeout(function () {
          t.$notice.detach(), (t.detachNotice = null);
        }, this.opts.errorDuration));
    }),
    (s.prototype._loadImage = function (t, e) {
      var i = new Image();
      this.$target
        .addClass("is-loading")
        .append(this.$notice.text(this.opts.loadingNotice)),
        (this.$zoom = o(i)
          .on("error", o.proxy(this._onError, this))
          .on("load", e, o.proxy(this._onLoad, this))),
        (i.style.position = "absolute"),
        (i.src = t);
    }),
    (s.prototype._move = function (t) {
      if (0 === t.type.indexOf("touch")) {
        var e = t.touches || t.originalEvent.touches;
        (u = e[0].pageX), (f = e[0].pageY);
      } else (u = t.pageX || u), (f = t.pageY || f);
      var i = this.$target.offset(),
        o = u - i.left,
        s = f - i.top,
        h = Math.ceil(o * d),
        n = Math.ceil(s * p);
      if (h < 0 || n < 0 || c < h || l < n) this.hide();
      else {
        var a = -1 * n,
          r = -1 * h;
        this.$zoom.css({ top: a, left: r }), this.opts.onMove.call(this, a, r);
      }
    }),
    (s.prototype.hide = function () {
      this.isOpen &&
        !1 !== this.opts.beforeHide.call(this) &&
        (this.$flyout.detach(),
        (this.isOpen = !1),
        this.opts.onHide.call(this));
    }),
    (s.prototype.swap = function (t, e, i) {
      this.hide(),
        (this.isReady = !1),
        this.detachNotice && clearTimeout(this.detachNotice),
        this.$notice.parent().length && this.$notice.detach(),
        this.$target.removeClass("is-loading is-ready is-error"),
        this.$image.attr({ src: t, srcset: o.isArray(i) ? i.join() : i }),
        this.$link.attr(this.opts.linkAttribute, e);
    }),
    (s.prototype.teardown = function () {
      this.hide(),
        this.$target
          .off(".easyzoom")
          .removeClass("is-loading is-ready is-error"),
        this.detachNotice && clearTimeout(this.detachNotice),
        delete this.$link,
        delete this.$zoom,
        delete this.$image,
        delete this.$notice,
        delete this.$flyout,
        delete this.isOpen,
        delete this.isReady;
    }),
    (o.fn.easyZoom = function (e) {
      return this.each(function () {
        var t = o.data(this, "easyZoom");
        t
          ? void 0 === t.isOpen && t._init()
          : o.data(this, "easyZoom", new s(this, e));
      });
    }),
    s
  );
});

/**
 * sticky-sidebar - A JavaScript plugin for making smart and high performance.
 * @version v3.3.1
 * @link https://github.com/abouolia/sticky-sidebar
 * @author Ahmed Bouhuolia
 * @license The MIT License (MIT)
 **/
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.StickySidebar = e());
})(this, function () {
  "use strict";
  "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self && self;
  function t(t) {
    return t &&
      t.__esModule &&
      Object.prototype.hasOwnProperty.call(t, "default")
      ? t.default
      : t;
  }
  function e(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
  }
  var i = e(function (t, e) {
    (function (t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var l,
        n,
        e = (function () {
          function n(t, e) {
            for (var i = 0; i < e.length; i++) {
              var n = e[i];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
            }
          }
          return function (t, e, i) {
            return e && n(t.prototype, e), i && n(t, i), t;
          };
        })(),
        i =
          ((l = ".stickySidebar"),
          (n = {
            topSpacing: 0,
            bottomSpacing: 0,
            containerSelector: !1,
            innerWrapperSelector: ".inner-wrapper-sticky",
            stickyClass: "is-affixed",
            resizeSensor: !0,
            minWidth: !1,
          }),
          (function () {
            function c(t) {
              var e = this,
                i =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              if (
                ((function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, c),
                (this.options = c.extend(n, i)),
                (this.sidebar =
                  "string" == typeof t ? document.querySelector(t) : t),
                void 0 === this.sidebar)
              )
                throw new Error("There is no specific sidebar element.");
              (this.sidebarInner = !1),
                (this.container = this.sidebar.parentElement),
                (this.affixedType = "STATIC"),
                (this.direction = "down"),
                (this.support = { transform: !1, transform3d: !1 }),
                (this._initialized = !1),
                (this._reStyle = !1),
                (this._breakpoint = !1),
                (this.dimensions = {
                  translateY: 0,
                  maxTranslateY: 0,
                  topSpacing: 0,
                  lastTopSpacing: 0,
                  bottomSpacing: 0,
                  lastBottomSpacing: 0,
                  sidebarHeight: 0,
                  sidebarWidth: 0,
                  containerTop: 0,
                  containerHeight: 0,
                  viewportHeight: 0,
                  viewportTop: 0,
                  lastViewportTop: 0,
                }),
                ["handleEvent"].forEach(function (t) {
                  e[t] = e[t].bind(e);
                }),
                this.initialize();
            }
            return (
              e(
                c,
                [
                  {
                    key: "initialize",
                    value: function () {
                      var i = this;
                      if (
                        (this._setSupportFeatures(),
                        this.options.innerWrapperSelector &&
                          ((this.sidebarInner = this.sidebar.querySelector(
                            this.options.innerWrapperSelector
                          )),
                          null === this.sidebarInner &&
                            (this.sidebarInner = !1)),
                        !this.sidebarInner)
                      ) {
                        var t = document.createElement("div");
                        for (
                          t.setAttribute("class", "inner-wrapper-sticky"),
                            this.sidebar.appendChild(t);
                          this.sidebar.firstChild != t;

                        )
                          t.appendChild(this.sidebar.firstChild);
                        this.sidebarInner = this.sidebar.querySelector(
                          ".inner-wrapper-sticky"
                        );
                      }
                      if (this.options.containerSelector) {
                        var e = document.querySelectorAll(
                          this.options.containerSelector
                        );
                        if (
                          ((e = Array.prototype.slice.call(e)).forEach(
                            function (t, e) {
                              t.contains(i.sidebar) && (i.container = t);
                            }
                          ),
                          !e.length)
                        )
                          throw new Error(
                            "The container does not contains on the sidebar."
                          );
                      }
                      "function" != typeof this.options.topSpacing &&
                        (this.options.topSpacing =
                          parseInt(this.options.topSpacing) || 0),
                        "function" != typeof this.options.bottomSpacing &&
                          (this.options.bottomSpacing =
                            parseInt(this.options.bottomSpacing) || 0),
                        this._widthBreakpoint(),
                        this.calcDimensions(),
                        this.stickyPosition(),
                        this.bindEvents(),
                        (this._initialized = !0);
                    },
                  },
                  {
                    key: "bindEvents",
                    value: function () {
                      window.addEventListener("resize", this, {
                        passive: !0,
                        capture: !1,
                      }),
                        window.addEventListener("scroll", this, {
                          passive: !0,
                          capture: !1,
                        }),
                        this.sidebar.addEventListener("update" + l, this),
                        this.options.resizeSensor &&
                          "undefined" != typeof ResizeSensor &&
                          (new ResizeSensor(
                            this.sidebarInner,
                            this.handleEvent
                          ),
                          new ResizeSensor(this.container, this.handleEvent));
                    },
                  },
                  {
                    key: "handleEvent",
                    value: function (t) {
                      this.updateSticky(t);
                    },
                  },
                  {
                    key: "calcDimensions",
                    value: function () {
                      if (!this._breakpoint) {
                        var t = this.dimensions;
                        (t.containerTop = c.offsetRelative(this.container).top),
                          (t.containerHeight = this.container.clientHeight),
                          (t.containerBottom =
                            t.containerTop + t.containerHeight),
                          (t.sidebarHeight = this.sidebarInner.offsetHeight),
                          (t.sidebarWidth = this.sidebarInner.offsetWidth),
                          (t.viewportHeight = window.innerHeight),
                          (t.maxTranslateY =
                            t.containerHeight - t.sidebarHeight),
                          this._calcDimensionsWithScroll();
                      }
                    },
                  },
                  {
                    key: "_calcDimensionsWithScroll",
                    value: function () {
                      var t = this.dimensions;
                      (t.sidebarLeft = c.offsetRelative(this.sidebar).left),
                        (t.viewportTop =
                          document.documentElement.scrollTop ||
                          document.body.scrollTop),
                        (t.viewportBottom = t.viewportTop + t.viewportHeight),
                        (t.viewportLeft =
                          document.documentElement.scrollLeft ||
                          document.body.scrollLeft),
                        (t.topSpacing = this.options.topSpacing),
                        (t.bottomSpacing = this.options.bottomSpacing),
                        "function" == typeof t.topSpacing &&
                          (t.topSpacing =
                            parseInt(t.topSpacing(this.sidebar)) || 0),
                        "function" == typeof t.bottomSpacing &&
                          (t.bottomSpacing =
                            parseInt(t.bottomSpacing(this.sidebar)) || 0),
                        "VIEWPORT-TOP" === this.affixedType
                          ? t.topSpacing < t.lastTopSpacing &&
                            ((t.translateY += t.lastTopSpacing - t.topSpacing),
                            (this._reStyle = !0))
                          : "VIEWPORT-BOTTOM" === this.affixedType &&
                            t.bottomSpacing < t.lastBottomSpacing &&
                            ((t.translateY +=
                              t.lastBottomSpacing - t.bottomSpacing),
                            (this._reStyle = !0)),
                        (t.lastTopSpacing = t.topSpacing),
                        (t.lastBottomSpacing = t.bottomSpacing);
                    },
                  },
                  {
                    key: "isSidebarFitsViewport",
                    value: function () {
                      var t = this.dimensions,
                        e =
                          "down" === this.scrollDirection
                            ? t.lastBottomSpacing
                            : t.lastTopSpacing;
                      return (
                        this.dimensions.sidebarHeight + e <
                        this.dimensions.viewportHeight
                      );
                    },
                  },
                  {
                    key: "observeScrollDir",
                    value: function () {
                      var t = this.dimensions;
                      if (t.lastViewportTop !== t.viewportTop) {
                        var e = "down" === this.direction ? Math.min : Math.max;
                        t.viewportTop === e(t.viewportTop, t.lastViewportTop) &&
                          (this.direction =
                            "down" === this.direction ? "up" : "down");
                      }
                    },
                  },
                  {
                    key: "getAffixType",
                    value: function () {
                      this._calcDimensionsWithScroll();
                      var t = this.dimensions,
                        e = t.viewportTop + t.topSpacing,
                        i = this.affixedType;
                      return (
                        e <= t.containerTop ||
                        t.containerHeight <= t.sidebarHeight
                          ? ((t.translateY = 0), (i = "STATIC"))
                          : (i =
                              "up" === this.direction
                                ? this._getAffixTypeScrollingUp()
                                : this._getAffixTypeScrollingDown()),
                        (t.translateY = Math.max(0, t.translateY)),
                        (t.translateY = Math.min(
                          t.containerHeight,
                          t.translateY
                        )),
                        (t.translateY = Math.round(t.translateY)),
                        (t.lastViewportTop = t.viewportTop),
                        i
                      );
                    },
                  },
                  {
                    key: "_getAffixTypeScrollingDown",
                    value: function () {
                      var t = this.dimensions,
                        e = t.sidebarHeight + t.containerTop,
                        i = t.viewportTop + t.topSpacing,
                        n = t.viewportBottom - t.bottomSpacing,
                        o = this.affixedType;
                      return (
                        this.isSidebarFitsViewport()
                          ? t.sidebarHeight + i >= t.containerBottom
                            ? ((t.translateY = t.containerBottom - e),
                              (o = "CONTAINER-BOTTOM"))
                            : i >= t.containerTop &&
                              ((t.translateY = i - t.containerTop),
                              (o = "VIEWPORT-TOP"))
                          : t.containerBottom <= n
                          ? ((t.translateY = t.containerBottom - e),
                            (o = "CONTAINER-BOTTOM"))
                          : e + t.translateY <= n
                          ? ((t.translateY = n - e), (o = "VIEWPORT-BOTTOM"))
                          : t.containerTop + t.translateY <= i &&
                            0 !== t.translateY &&
                            t.maxTranslateY !== t.translateY &&
                            (o = "VIEWPORT-UNBOTTOM"),
                        o
                      );
                    },
                  },
                  {
                    key: "_getAffixTypeScrollingUp",
                    value: function () {
                      var t = this.dimensions,
                        e = t.sidebarHeight + t.containerTop,
                        i = t.viewportTop + t.topSpacing,
                        n = t.viewportBottom - t.bottomSpacing,
                        o = this.affixedType;
                      return (
                        i <= t.translateY + t.containerTop
                          ? ((t.translateY = i - t.containerTop),
                            (o = "VIEWPORT-TOP"))
                          : t.containerBottom <= n
                          ? ((t.translateY = t.containerBottom - e),
                            (o = "CONTAINER-BOTTOM"))
                          : this.isSidebarFitsViewport() ||
                            (t.containerTop <= i &&
                              0 !== t.translateY &&
                              t.maxTranslateY !== t.translateY &&
                              (o = "VIEWPORT-UNBOTTOM")),
                        o
                      );
                    },
                  },
                  {
                    key: "_getStyle",
                    value: function (t) {
                      if (void 0 !== t) {
                        var e = { inner: {}, outer: {} },
                          i = this.dimensions;
                        switch (t) {
                          case "VIEWPORT-TOP":
                            e.inner = {
                              position: "fixed",
                              top: i.topSpacing,
                              left: i.sidebarLeft - i.viewportLeft,
                              width: i.sidebarWidth,
                            };
                            break;
                          case "VIEWPORT-BOTTOM":
                            e.inner = {
                              position: "fixed",
                              top: "auto",
                              left: i.sidebarLeft,
                              bottom: i.bottomSpacing,
                              width: i.sidebarWidth,
                            };
                            break;
                          case "CONTAINER-BOTTOM":
                          case "VIEWPORT-UNBOTTOM":
                            var n = this._getTranslate(0, i.translateY + "px");
                            e.inner = n
                              ? { transform: n }
                              : {
                                  position: "absolute",
                                  top: i.translateY,
                                  width: i.sidebarWidth,
                                };
                        }
                        switch (t) {
                          case "VIEWPORT-TOP":
                          case "VIEWPORT-BOTTOM":
                          case "VIEWPORT-UNBOTTOM":
                          case "CONTAINER-BOTTOM":
                            e.outer = {
                              height: i.sidebarHeight,
                              position: "relative",
                            };
                        }
                        return (
                          (e.outer = c.extend(
                            { height: "", position: "" },
                            e.outer
                          )),
                          (e.inner = c.extend(
                            {
                              position: "relative",
                              top: "",
                              left: "",
                              bottom: "",
                              width: "",
                              transform: "",
                            },
                            e.inner
                          )),
                          e
                        );
                      }
                    },
                  },
                  {
                    key: "stickyPosition",
                    value: function (t) {
                      if (!this._breakpoint) {
                        (t = this._reStyle || t || !1),
                          this.options.topSpacing,
                          this.options.bottomSpacing;
                        var e = this.getAffixType(),
                          i = this._getStyle(e);
                        if ((this.affixedType != e || t) && e) {
                          var n =
                            "affix." +
                            e.toLowerCase().replace("viewport-", "") +
                            l;
                          for (var o in (c.eventTrigger(this.sidebar, n),
                          "STATIC" === e
                            ? c.removeClass(
                                this.sidebar,
                                this.options.stickyClass
                              )
                            : c.addClass(
                                this.sidebar,
                                this.options.stickyClass
                              ),
                          i.outer)) {
                            var s = "number" == typeof i.outer[o] ? "px" : "";
                            this.sidebar.style[o] = i.outer[o] + s;
                          }
                          for (var r in i.inner) {
                            var a = "number" == typeof i.inner[r] ? "px" : "";
                            this.sidebarInner.style[r] = i.inner[r] + a;
                          }
                          var p =
                            "affixed." +
                            e.toLowerCase().replace("viewport-", "") +
                            l;
                          c.eventTrigger(this.sidebar, p);
                        } else
                          this._initialized &&
                            (this.sidebarInner.style.left = i.inner.left);
                        this.affixedType = e;
                      }
                    },
                  },
                  {
                    key: "_widthBreakpoint",
                    value: function () {
                      window.innerWidth <= this.options.minWidth
                        ? ((this._breakpoint = !0),
                          (this.affixedType = "STATIC"),
                          this.sidebar.removeAttribute("style"),
                          c.removeClass(this.sidebar, this.options.stickyClass),
                          this.sidebarInner.removeAttribute("style"))
                        : (this._breakpoint = !1);
                    },
                  },
                  {
                    key: "updateSticky",
                    value: function () {
                      var t,
                        e = this,
                        i =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                      this._running ||
                        ((this._running = !0),
                        (t = i.type),
                        requestAnimationFrame(function () {
                          switch (t) {
                            case "scroll":
                              e._calcDimensionsWithScroll(),
                                e.observeScrollDir(),
                                e.stickyPosition();
                              break;
                            case "resize":
                            default:
                              e._widthBreakpoint(),
                                e.calcDimensions(),
                                e.stickyPosition(!0);
                          }
                          e._running = !1;
                        }));
                    },
                  },
                  {
                    key: "_setSupportFeatures",
                    value: function () {
                      var t = this.support;
                      (t.transform = c.supportTransform()),
                        (t.transform3d = c.supportTransform(!0));
                    },
                  },
                  {
                    key: "_getTranslate",
                    value: function () {
                      var t =
                          0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : 0,
                        e =
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : 0,
                        i =
                          2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : 0;
                      return this.support.transform3d
                        ? "translate3d(" + t + ", " + e + ", " + i + ")"
                        : !!this.support.translate &&
                            "translate(" + t + ", " + e + ")";
                    },
                  },
                  {
                    key: "destroy",
                    value: function () {
                      window.removeEventListener("resize", this, {
                        capture: !1,
                      }),
                        window.removeEventListener("scroll", this, {
                          capture: !1,
                        }),
                        this.sidebar.classList.remove(this.options.stickyClass),
                        (this.sidebar.style.minHeight = ""),
                        this.sidebar.removeEventListener("update" + l, this);
                      var t = { inner: {}, outer: {} };
                      for (var e in ((t.inner = {
                        position: "",
                        top: "",
                        left: "",
                        bottom: "",
                        width: "",
                        transform: "",
                      }),
                      (t.outer = { height: "", position: "" }),
                      t.outer))
                        this.sidebar.style[e] = t.outer[e];
                      for (var i in t.inner)
                        this.sidebarInner.style[i] = t.inner[i];
                      this.options.resizeSensor &&
                        "undefined" != typeof ResizeSensor &&
                        (ResizeSensor.detach(
                          this.sidebarInner,
                          this.handleEvent
                        ),
                        ResizeSensor.detach(this.container, this.handleEvent));
                    },
                  },
                ],
                [
                  {
                    key: "supportTransform",
                    value: function (t) {
                      var i = !1,
                        e = t ? "perspective" : "transform",
                        n = e.charAt(0).toUpperCase() + e.slice(1),
                        o = document.createElement("support").style;
                      return (
                        (
                          e +
                          " " +
                          ["Webkit", "Moz", "O", "ms"].join(n + " ") +
                          n
                        )
                          .split(" ")
                          .forEach(function (t, e) {
                            if (void 0 !== o[t]) return (i = t), !1;
                          }),
                        i
                      );
                    },
                  },
                  {
                    key: "eventTrigger",
                    value: function (t, e, i) {
                      try {
                        var n = new CustomEvent(e, { detail: i });
                      } catch (t) {
                        (n =
                          document.createEvent("CustomEvent")).initCustomEvent(
                          e,
                          !0,
                          !0,
                          i
                        );
                      }
                      t.dispatchEvent(n);
                    },
                  },
                  {
                    key: "extend",
                    value: function (t, e) {
                      var i = {};
                      for (var n in t)
                        void 0 !== e[n] ? (i[n] = e[n]) : (i[n] = t[n]);
                      return i;
                    },
                  },
                  {
                    key: "offsetRelative",
                    value: function (t) {
                      var e = { left: 0, top: 0 };
                      do {
                        var i = t.offsetTop,
                          n = t.offsetLeft;
                        isNaN(i) || (e.top += i),
                          isNaN(n) || (e.left += n),
                          (t =
                            "BODY" === t.tagName
                              ? t.parentElement
                              : t.offsetParent);
                      } while (t);
                      return e;
                    },
                  },
                  {
                    key: "addClass",
                    value: function (t, e) {
                      c.hasClass(t, e) ||
                        (t.classList
                          ? t.classList.add(e)
                          : (t.className += " " + e));
                    },
                  },
                  {
                    key: "removeClass",
                    value: function (t, e) {
                      c.hasClass(t, e) &&
                        (t.classList
                          ? t.classList.remove(e)
                          : (t.className = t.className.replace(
                              new RegExp(
                                "(^|\\b)" + e.split(" ").join("|") + "(\\b|$)",
                                "gi"
                              ),
                              " "
                            )));
                    },
                  },
                  {
                    key: "hasClass",
                    value: function (t, e) {
                      return t.classList
                        ? t.classList.contains(e)
                        : new RegExp("(^| )" + e + "( |$)", "gi").test(
                            t.className
                          );
                    },
                  },
                  {
                    key: "defaults",
                    get: function () {
                      return n;
                    },
                  },
                ]
              ),
              c
            );
          })());
      (t.default = i), (window.StickySidebar = i);
    })(e);
  });
  return (
    t(i),
    t(
      e(function (t, e) {
        (function (t) {
          var e,
            s = (e = t) && e.__esModule ? e : { default: e };
          !(function () {
            if ("undefined" != typeof window) {
              var n = window.$ || window.jQuery || window.Zepto,
                o = "stickySidebar";
              if (n) {
                (n.fn.stickySidebar = function (i) {
                  return this.each(function () {
                    var t = n(this),
                      e = n(this).data(o);
                    if (
                      (e ||
                        ((e = new s.default(this, "object" == typeof i && i)),
                        t.data(o, e)),
                      "string" == typeof i)
                    ) {
                      if (
                        void 0 === e[i] &&
                        -1 === ["destroy", "updateSticky"].indexOf(i)
                      )
                        throw new Error('No method named "' + i + '"');
                      e[i]();
                    }
                  });
                }),
                  (n.fn.stickySidebar.Constructor = s.default);
                var t = n.fn.stickySidebar;
                n.fn.stickySidebar.noConflict = function () {
                  return (n.fn.stickySidebar = t), this;
                };
              }
            }
          })();
        })(i);
      })
    )
  );
});

/*!
 * jQuery meanMenu v2.0.8
 * @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
 *
 */
/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.
 *
 * Find more information at http://www.meanthemes.com/plugins/meanmenu/
 *
 */
(function ($) {
  "use strict";
  $.fn.meanmenu = function (options) {
    var defaults = {
      meanMenuTarget: jQuery(this), // Target the current HTML markup you wish to replace
      meanMenuContainer: "body", // Choose where meanmenu will be placed within the HTML
      meanMenuClose: "X", // single character you want to represent the close menu button
      meanMenuCloseSize: "18px", // set font size of close button
      meanMenuOpen: "<span /><span /><span />", // text/markup you want when menu is closed
      meanRevealPosition: "", // left right or center positions
      meanRevealPositionDistance: "0", // Tweak the position of the menu
      meanRevealColour: "", // override CSS colours for the reveal background
      meanScreenWidth: "480", // set the screen width you want meanmenu to kick in at
      meanNavPush: "", // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
      meanShowChildren: true, // true to show children in the menu, false to hide them
      meanExpandableChildren: true, // true to allow expand/collapse children
      meanExpand: "+", // single character you want to represent the expand for ULs
      meanContract: "-", // single character you want to represent the contract for ULs
      meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
      onePage: false, // set to true for one page sites
      meanDisplay: "block", // override display method for table cell based layouts e.g. table-cell
      removeElements: "", // set to hide page elements
    };
    options = $.extend(defaults, options);

    // get browser width
    var currentWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return this.each(function () {
      var meanMenu = options.meanMenuTarget;
      var meanContainer = options.meanMenuContainer;
      var meanMenuClose = options.meanMenuClose;
      var meanMenuCloseSize = options.meanMenuCloseSize;
      var meanMenuOpen = options.meanMenuOpen;
      var meanRevealPosition = options.meanRevealPosition;
      var meanRevealPositionDistance = options.meanRevealPositionDistance;
      var meanRevealColour = options.meanRevealColour;
      var meanScreenWidth = options.meanScreenWidth;
      var meanNavPush = options.meanNavPush;
      var meanRevealClass = ".meanmenu-reveal";
      var meanShowChildren = options.meanShowChildren;
      var meanExpandableChildren = options.meanExpandableChildren;
      var meanExpand = options.meanExpand;
      var meanContract = options.meanContract;
      var meanRemoveAttrs = options.meanRemoveAttrs;
      var onePage = options.onePage;
      var meanDisplay = options.meanDisplay;
      var removeElements = options.removeElements;

      //detect known mobile/tablet usage
      var isMobile = false;
      if (
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/Blackberry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        isMobile = true;
      }

      if (
        navigator.userAgent.match(/MSIE 8/i) ||
        navigator.userAgent.match(/MSIE 7/i)
      ) {
        // add scrollbar for IE7 & 8 to stop breaking resize function on small content sites
        jQuery("html").css("overflow-y", "scroll");
      }

      var meanRevealPos = "";
      var meanCentered = function () {
        if (meanRevealPosition === "center") {
          var newWidth =
            window.innerWidth || document.documentElement.clientWidth;
          var meanCenter = newWidth / 2 - 22 + "px";
          meanRevealPos = "left:" + meanCenter + ";right:auto;";

          if (!isMobile) {
            jQuery(".meanmenu-reveal").css("left", meanCenter);
          } else {
            jQuery(".meanmenu-reveal").animate({
              left: meanCenter,
            });
          }
        }
      };

      var menuOn = false;
      var meanMenuExist = false;

      if (meanRevealPosition === "right") {
        meanRevealPos = "right:" + meanRevealPositionDistance + ";left:auto;";
      }
      if (meanRevealPosition === "left") {
        meanRevealPos = "left:" + meanRevealPositionDistance + ";right:auto;";
      }
      // run center function
      meanCentered();

      // set all styles for mean-reveal
      var $navreveal = "";

      var meanInner = function () {
        // get last class name
        if (jQuery($navreveal).is(".meanmenu-reveal.meanclose")) {
          $navreveal.html(meanMenuClose);
        } else {
          $navreveal.html(meanMenuOpen);
        }
      };

      // re-instate original nav (and call this on window.width functions)
      var meanOriginal = function () {
        jQuery(".mean-bar,.mean-push").remove();
        jQuery(meanContainer).removeClass("mean-container");
        jQuery(meanMenu).css("display", meanDisplay);
        menuOn = false;
        meanMenuExist = false;
        jQuery(removeElements).removeClass("mean-remove");
      };

      // navigation reveal
      var showMeanMenu = function () {
        var meanStyles =
          "background:" +
          meanRevealColour +
          ";color:" +
          meanRevealColour +
          ";" +
          meanRevealPos;
        if (currentWidth <= meanScreenWidth) {
          jQuery(removeElements).addClass("mean-remove");
          meanMenuExist = true;
          // add class to body so we don't need to worry about media queries here, all CSS is wrapped in '.mean-container'
          jQuery(meanContainer).addClass("mean-container");
          jQuery(".mean-container").prepend(
            '<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' +
              meanStyles +
              '">Show Navigation</a><nav class="mean-nav"></nav></div>'
          );

          //push meanMenu navigation into .mean-nav
          var meanMenuContents = jQuery(meanMenu).html();
          jQuery(".mean-nav").html(meanMenuContents);

          // remove all classes from EVERYTHING inside meanmenu nav
          if (meanRemoveAttrs) {
            jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function () {
              // First check if this has mean-remove class
              if (jQuery(this).is(".mean-remove")) {
                jQuery(this).attr("class", "mean-remove");
              } else {
                jQuery(this).removeAttr("class");
              }
              jQuery(this).removeAttr("id");
            });
          }

          // push in a holder div (this can be used if removal of nav is causing layout issues)
          jQuery(meanMenu).before('<div class="mean-push" />');
          jQuery(".mean-push").css("margin-top", meanNavPush);

          // hide current navigation and reveal mean nav link
          jQuery(meanMenu).hide();
          jQuery(".meanmenu-reveal").show();

          // turn 'X' on or off
          jQuery(meanRevealClass).html(meanMenuOpen);
          $navreveal = jQuery(meanRevealClass);

          //hide mean-nav ul
          jQuery(".mean-nav ul").hide();

          // hide sub nav
          if (meanShowChildren) {
            // allow expandable sub nav(s)
            if (meanExpandableChildren) {
              jQuery(".mean-nav ul ul").each(function () {
                if (jQuery(this).children().length) {
                  jQuery(this, "li:first")
                    .parent()
                    .append(
                      '<a class="mean-expand" href="#" style="font-size: ' +
                        meanMenuCloseSize +
                        '">' +
                        meanExpand +
                        "</a>"
                    );
                }
              });
              jQuery(".mean-expand").on("click", function (e) {
                e.preventDefault();
                if (jQuery(this).hasClass("mean-clicked")) {
                  jQuery(this).text(meanExpand);
                  jQuery(this)
                    .prev("ul")
                    .slideUp(300, function () {});
                } else {
                  jQuery(this).text(meanContract);
                  jQuery(this)
                    .prev("ul")
                    .slideDown(300, function () {});
                }
                jQuery(this).toggleClass("mean-clicked");
              });
            } else {
              jQuery(".mean-nav ul ul").show();
            }
          } else {
            jQuery(".mean-nav ul ul").hide();
          }

          // add last class to tidy up borders
          jQuery(".mean-nav ul li").last().addClass("mean-last");
          $navreveal.removeClass("meanclose");
          jQuery($navreveal).click(function (e) {
            e.preventDefault();
            if (menuOn === false) {
              $navreveal.css("text-align", "center");
              $navreveal.css("text-indent", "0");
              $navreveal.css("font-size", meanMenuCloseSize);
              jQuery(".mean-nav ul:first").slideDown();
              menuOn = true;
            } else {
              jQuery(".mean-nav ul:first").slideUp();
              menuOn = false;
            }
            $navreveal.toggleClass("meanclose");
            meanInner();
            jQuery(removeElements).addClass("mean-remove");
          });

          // for one page websites, reset all variables...
          if (onePage) {
            jQuery(".mean-nav ul > li > a:first-child").on(
              "click",
              function () {
                jQuery(".mean-nav ul:first").slideUp();
                menuOn = false;
                jQuery($navreveal).toggleClass("meanclose").html(meanMenuOpen);
              }
            );
          }
        } else {
          meanOriginal();
        }
      };

      if (!isMobile) {
        // reset menu on resize above meanScreenWidth
        jQuery(window).resize(function () {
          currentWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (currentWidth > meanScreenWidth) {
            meanOriginal();
          } else {
            meanOriginal();
          }
          if (currentWidth <= meanScreenWidth) {
            showMeanMenu();
            meanCentered();
          } else {
            meanOriginal();
          }
        });
      }

      jQuery(window).resize(function () {
        // get browser width
        currentWidth =
          window.innerWidth || document.documentElement.clientWidth;

        if (!isMobile) {
          meanOriginal();
          if (currentWidth <= meanScreenWidth) {
            showMeanMenu();
            meanCentered();
          }
        } else {
          meanCentered();
          if (currentWidth <= meanScreenWidth) {
            if (meanMenuExist === false) {
              showMeanMenu();
            }
          } else {
            meanOriginal();
          }
        }
      });

      // run main menuMenu function on load
      showMeanMenu();
    });
  };
})(jQuery);

/*-------------------------------------------------------------
    03. Scrollup Jquery 
---------------------------------------------------------------*/
!(function (l, o, e) {
  "use strict";
  (l.fn.scrollUp = function (o) {
    l.data(e.body, "scrollUp") ||
      (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
  }),
    (l.fn.scrollUp.init = function (r) {
      var s,
        t,
        c,
        i,
        n,
        a,
        d,
        p = (l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r)),
        f = !1;
      switch (
        ((d = p.scrollTrigger
          ? l(p.scrollTrigger)
          : l("<a/>", { id: p.scrollName, href: "#top" })),
        p.scrollTitle && d.attr("title", p.scrollTitle),
        d.appendTo("body"),
        p.scrollImg || p.scrollTrigger || d.html(p.scrollText),
        d.css({ display: "none", position: "fixed", zIndex: p.zIndex }),
        p.activeOverlay &&
          l("<div/>", { id: p.scrollName + "-active" })
            .css({
              position: "absolute",
              top: p.scrollDistance + "px",
              width: "100%",
              borderTop: "1px dotted" + p.activeOverlay,
              zIndex: p.zIndex,
            })
            .appendTo("body"),
        p.animation)
      ) {
        case "fade":
          (s = "fadeIn"), (t = "fadeOut"), (c = p.animationSpeed);
          break;
        case "slide":
          (s = "slideDown"), (t = "slideUp"), (c = p.animationSpeed);
          break;
        default:
          (s = "show"), (t = "hide"), (c = 0);
      }
      (i =
        "top" === p.scrollFrom
          ? p.scrollDistance
          : l(e).height() - l(o).height() - p.scrollDistance),
        (n = l(o).scroll(function () {
          l(o).scrollTop() > i
            ? f || (d[s](c), (f = !0))
            : f && (d[t](c), (f = !1));
        })),
        p.scrollTarget
          ? "number" == typeof p.scrollTarget
            ? (a = p.scrollTarget)
            : "string" == typeof p.scrollTarget &&
              (a = Math.floor(l(p.scrollTarget).offset().top))
          : (a = 0),
        d.click(function (o) {
          o.preventDefault(),
            l("html, body").animate(
              { scrollTop: a },
              p.scrollSpeed,
              p.easingType
            );
        });
    }),
    (l.fn.scrollUp.defaults = {
      scrollName: "scrollUp",
      scrollDistance: 300,
      scrollFrom: "top",
      scrollSpeed: 300,
      easingType: "linear",
      animation: "fade",
      animationSpeed: 200,
      scrollTrigger: !1,
      scrollTarget: !1,
      scrollText: "Scroll to top",
      scrollTitle: !1,
      scrollImg: !1,
      activeOverlay: !1,
      zIndex: 2147483647,
    }),
    (l.fn.scrollUp.destroy = function (r) {
      l.removeData(e.body, "scrollUp"),
        l("#" + l.fn.scrollUp.settings.scrollName).remove(),
        l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(),
        l.fn.jquery.split(".")[1] >= 7
          ? l(o).off("scroll", r)
          : l(o).unbind("scroll", r);
    }),
    (l.scrollUp = l.fn.scrollUp);
})(jQuery, window, document);

/*! WOW wow.js - v1.3.0 - 2016-10-04
 * https://wowjs.uk
 * Copyright (c) 2016 Thomas Grainger; Licensed MIT */ !(function (a, b) {
  if ("function" == typeof define && define.amd)
    define(["module", "exports"], b);
  else if ("undefined" != typeof exports) b(module, exports);
  else {
    var c = { exports: {} };
    b(c, c.exports), (a.WOW = c.exports);
  }
})(this, function (a, b) {
  "use strict";
  function c(a, b) {
    if (!(a instanceof b))
      throw new TypeError("Cannot call a class as a function");
  }
  function d(a, b) {
    return b.indexOf(a) >= 0;
  }
  function e(a, b) {
    for (var c in b)
      if (null == a[c]) {
        var d = b[c];
        a[c] = d;
      }
    return a;
  }
  function f(a) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      a
    );
  }
  function g(a) {
    var b =
        arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1],
      c = arguments.length <= 2 || void 0 === arguments[2] ? !1 : arguments[2],
      d =
        arguments.length <= 3 || void 0 === arguments[3] ? null : arguments[3],
      e = void 0;
    return (
      null != document.createEvent
        ? ((e = document.createEvent("CustomEvent")),
          e.initCustomEvent(a, b, c, d))
        : null != document.createEventObject
        ? ((e = document.createEventObject()), (e.eventType = a))
        : (e.eventName = a),
      e
    );
  }
  function h(a, b) {
    null != a.dispatchEvent
      ? a.dispatchEvent(b)
      : b in (null != a)
      ? a[b]()
      : "on" + b in (null != a) && a["on" + b]();
  }
  function i(a, b, c) {
    null != a.addEventListener
      ? a.addEventListener(b, c, !1)
      : null != a.attachEvent
      ? a.attachEvent("on" + b, c)
      : (a[b] = c);
  }
  function j(a, b, c) {
    null != a.removeEventListener
      ? a.removeEventListener(b, c, !1)
      : null != a.detachEvent
      ? a.detachEvent("on" + b, c)
      : delete a[b];
  }
  function k() {
    return "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.clientHeight;
  }
  Object.defineProperty(b, "__esModule", { value: !0 });
  var l,
    m,
    n = (function () {
      function a(a, b) {
        for (var c = 0; c < b.length; c++) {
          var d = b[c];
          (d.enumerable = d.enumerable || !1),
            (d.configurable = !0),
            "value" in d && (d.writable = !0),
            Object.defineProperty(a, d.key, d);
        }
      }
      return function (b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
      };
    })(),
    o =
      window.WeakMap ||
      window.MozWeakMap ||
      (function () {
        function a() {
          c(this, a), (this.keys = []), (this.values = []);
        }
        return (
          n(a, [
            {
              key: "get",
              value: function (a) {
                for (var b = 0; b < this.keys.length; b++) {
                  var c = this.keys[b];
                  if (c === a) return this.values[b];
                }
              },
            },
            {
              key: "set",
              value: function (a, b) {
                for (var c = 0; c < this.keys.length; c++) {
                  var d = this.keys[c];
                  if (d === a) return (this.values[c] = b), this;
                }
                return this.keys.push(a), this.values.push(b), this;
              },
            },
          ]),
          a
        );
      })(),
    p =
      window.MutationObserver ||
      window.WebkitMutationObserver ||
      window.MozMutationObserver ||
      ((m = l =
        (function () {
          function a() {
            c(this, a),
              "undefined" != typeof console &&
                null !== console &&
                (console.warn(
                  "MutationObserver is not supported by your browser."
                ),
                console.warn(
                  "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                ));
          }
          return n(a, [{ key: "observe", value: function () {} }]), a;
        })()),
      (l.notSupported = !0),
      m),
    q =
      window.getComputedStyle ||
      function (a) {
        var b = /(\-([a-z]){1})/g;
        return {
          getPropertyValue: function (c) {
            "float" === c && (c = "styleFloat"),
              b.test(c) &&
                c.replace(b, function (a, b) {
                  return b.toUpperCase();
                });
            var d = a.currentStyle;
            return (null != d ? d[c] : void 0) || null;
          },
        };
      },
    r = (function () {
      function a() {
        var b =
          arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
        c(this, a),
          (this.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null,
            resetAnimation: !0,
          }),
          (this.animate = (function () {
            return "requestAnimationFrame" in window
              ? function (a) {
                  return window.requestAnimationFrame(a);
                }
              : function (a) {
                  return a();
                };
          })()),
          (this.vendors = ["moz", "webkit"]),
          (this.start = this.start.bind(this)),
          (this.resetAnimation = this.resetAnimation.bind(this)),
          (this.scrollHandler = this.scrollHandler.bind(this)),
          (this.scrollCallback = this.scrollCallback.bind(this)),
          (this.scrolled = !0),
          (this.config = e(b, this.defaults)),
          null != b.scrollContainer &&
            (this.config.scrollContainer = document.querySelector(
              b.scrollContainer
            )),
          (this.animationNameCache = new o()),
          (this.wowEvent = g(this.config.boxClass));
      }
      return (
        n(a, [
          {
            key: "init",
            value: function () {
              (this.element = window.document.documentElement),
                d(document.readyState, ["interactive", "complete"])
                  ? this.start()
                  : i(document, "DOMContentLoaded", this.start),
                (this.finished = []);
            },
          },
          {
            key: "start",
            value: function () {
              var a = this;
              if (
                ((this.stopped = !1),
                (this.boxes = [].slice.call(
                  this.element.querySelectorAll("." + this.config.boxClass)
                )),
                (this.all = this.boxes.slice(0)),
                this.boxes.length)
              )
                if (this.disabled()) this.resetStyle();
                else
                  for (var b = 0; b < this.boxes.length; b++) {
                    var c = this.boxes[b];
                    this.applyStyle(c, !0);
                  }
              if (
                (this.disabled() ||
                  (i(
                    this.config.scrollContainer || window,
                    "scroll",
                    this.scrollHandler
                  ),
                  i(window, "resize", this.scrollHandler),
                  (this.interval = setInterval(this.scrollCallback, 50))),
                this.config.live)
              ) {
                var d = new p(function (b) {
                  for (var c = 0; c < b.length; c++)
                    for (var d = b[c], e = 0; e < d.addedNodes.length; e++) {
                      var f = d.addedNodes[e];
                      a.doSync(f);
                    }
                });
                d.observe(document.body, { childList: !0, subtree: !0 });
              }
            },
          },
          {
            key: "stop",
            value: function () {
              (this.stopped = !0),
                j(
                  this.config.scrollContainer || window,
                  "scroll",
                  this.scrollHandler
                ),
                j(window, "resize", this.scrollHandler),
                null != this.interval && clearInterval(this.interval);
            },
          },
          {
            key: "sync",
            value: function () {
              p.notSupported && this.doSync(this.element);
            },
          },
          {
            key: "doSync",
            value: function (a) {
              if (
                (("undefined" != typeof a && null !== a) || (a = this.element),
                1 === a.nodeType)
              ) {
                a = a.parentNode || a;
                for (
                  var b = a.querySelectorAll("." + this.config.boxClass), c = 0;
                  c < b.length;
                  c++
                ) {
                  var e = b[c];
                  d(e, this.all) ||
                    (this.boxes.push(e),
                    this.all.push(e),
                    this.stopped || this.disabled()
                      ? this.resetStyle()
                      : this.applyStyle(e, !0),
                    (this.scrolled = !0));
                }
              }
            },
          },
          {
            key: "show",
            value: function (a) {
              return (
                this.applyStyle(a),
                (a.className = a.className + " " + this.config.animateClass),
                null != this.config.callback && this.config.callback(a),
                h(a, this.wowEvent),
                this.config.resetAnimation &&
                  (i(a, "animationend", this.resetAnimation),
                  i(a, "oanimationend", this.resetAnimation),
                  i(a, "webkitAnimationEnd", this.resetAnimation),
                  i(a, "MSAnimationEnd", this.resetAnimation)),
                a
              );
            },
          },
          {
            key: "applyStyle",
            value: function (a, b) {
              var c = this,
                d = a.getAttribute("data-wow-duration"),
                e = a.getAttribute("data-wow-delay"),
                f = a.getAttribute("data-wow-iteration");
              return this.animate(function () {
                return c.customStyle(a, b, d, e, f);
              });
            },
          },
          {
            key: "resetStyle",
            value: function () {
              for (var a = 0; a < this.boxes.length; a++) {
                var b = this.boxes[a];
                b.style.visibility = "visible";
              }
            },
          },
          {
            key: "resetAnimation",
            value: function (a) {
              if (a.type.toLowerCase().indexOf("animationend") >= 0) {
                var b = a.target || a.srcElement;
                b.className = b.className
                  .replace(this.config.animateClass, "")
                  .trim();
              }
            },
          },
          {
            key: "customStyle",
            value: function (a, b, c, d, e) {
              return (
                b && this.cacheAnimationName(a),
                (a.style.visibility = b ? "hidden" : "visible"),
                c && this.vendorSet(a.style, { animationDuration: c }),
                d && this.vendorSet(a.style, { animationDelay: d }),
                e && this.vendorSet(a.style, { animationIterationCount: e }),
                this.vendorSet(a.style, {
                  animationName: b ? "none" : this.cachedAnimationName(a),
                }),
                a
              );
            },
          },
          {
            key: "vendorSet",
            value: function (a, b) {
              for (var c in b)
                if (b.hasOwnProperty(c)) {
                  var d = b[c];
                  a["" + c] = d;
                  for (var e = 0; e < this.vendors.length; e++) {
                    var f = this.vendors[e];
                    a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = d;
                  }
                }
            },
          },
          {
            key: "vendorCSS",
            value: function (a, b) {
              for (
                var c = q(a), d = c.getPropertyCSSValue(b), e = 0;
                e < this.vendors.length;
                e++
              ) {
                var f = this.vendors[e];
                d = d || c.getPropertyCSSValue("-" + f + "-" + b);
              }
              return d;
            },
          },
          {
            key: "animationName",
            value: function (a) {
              var b = void 0;
              try {
                b = this.vendorCSS(a, "animation-name").cssText;
              } catch (c) {
                b = q(a).getPropertyValue("animation-name");
              }
              return "none" === b ? "" : b;
            },
          },
          {
            key: "cacheAnimationName",
            value: function (a) {
              return this.animationNameCache.set(a, this.animationName(a));
            },
          },
          {
            key: "cachedAnimationName",
            value: function (a) {
              return this.animationNameCache.get(a);
            },
          },
          {
            key: "scrollHandler",
            value: function () {
              this.scrolled = !0;
            },
          },
          {
            key: "scrollCallback",
            value: function () {
              if (this.scrolled) {
                this.scrolled = !1;
                for (var a = [], b = 0; b < this.boxes.length; b++) {
                  var c = this.boxes[b];
                  if (c) {
                    if (this.isVisible(c)) {
                      this.show(c);
                      continue;
                    }
                    a.push(c);
                  }
                }
                (this.boxes = a),
                  this.boxes.length || this.config.live || this.stop();
              }
            },
          },
          {
            key: "offsetTop",
            value: function (a) {
              for (; void 0 === a.offsetTop; ) a = a.parentNode;
              for (var b = a.offsetTop; a.offsetParent; )
                (a = a.offsetParent), (b += a.offsetTop);
              return b;
            },
          },
          {
            key: "isVisible",
            value: function (a) {
              var b = a.getAttribute("data-wow-offset") || this.config.offset,
                c =
                  (this.config.scrollContainer &&
                    this.config.scrollContainer.scrollTop) ||
                  window.pageYOffset,
                d = c + Math.min(this.element.clientHeight, k()) - b,
                e = this.offsetTop(a),
                f = e + a.clientHeight;
              return d >= e && f >= c;
            },
          },
          {
            key: "disabled",
            value: function () {
              return !this.config.mobile && f(navigator.userAgent);
            },
          },
        ]),
        a
      );
    })();
  (b["default"] = r), (a.exports = b["default"]);
});

/*-------------------------------------------------------------
  06. Chosen
---------------------------------------------------------------*/

/* Chosen v1.5.1 | (c) 2011-2016 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
(function () {
  var a,
    AbstractChosen,
    Chosen,
    SelectParser,
    b,
    c = {}.hasOwnProperty,
    d = function (a, b) {
      function d() {
        this.constructor = a;
      }
      for (var e in b) c.call(b, e) && (a[e] = b[e]);
      return (
        (d.prototype = b.prototype),
        (a.prototype = new d()),
        (a.__super__ = b.prototype),
        a
      );
    };
  (SelectParser = (function () {
    function SelectParser() {
      (this.options_index = 0), (this.parsed = []);
    }
    return (
      (SelectParser.prototype.add_node = function (a) {
        return "OPTGROUP" === a.nodeName.toUpperCase()
          ? this.add_group(a)
          : this.add_option(a);
      }),
      (SelectParser.prototype.add_group = function (a) {
        var b, c, d, e, f, g;
        for (
          b = this.parsed.length,
            this.parsed.push({
              array_index: b,
              group: !0,
              label: this.escapeExpression(a.label),
              title: a.title ? a.title : void 0,
              children: 0,
              disabled: a.disabled,
              classes: a.className,
            }),
            f = a.childNodes,
            g = [],
            d = 0,
            e = f.length;
          e > d;
          d++
        )
          (c = f[d]), g.push(this.add_option(c, b, a.disabled));
        return g;
      }),
      (SelectParser.prototype.add_option = function (a, b, c) {
        return "OPTION" === a.nodeName.toUpperCase()
          ? ("" !== a.text
              ? (null != b && (this.parsed[b].children += 1),
                this.parsed.push({
                  array_index: this.parsed.length,
                  options_index: this.options_index,
                  value: a.value,
                  text: a.text,
                  html: a.innerHTML,
                  title: a.title ? a.title : void 0,
                  selected: a.selected,
                  disabled: c === !0 ? c : a.disabled,
                  group_array_index: b,
                  group_label: null != b ? this.parsed[b].label : null,
                  classes: a.className,
                  style: a.style.cssText,
                }))
              : this.parsed.push({
                  array_index: this.parsed.length,
                  options_index: this.options_index,
                  empty: !0,
                }),
            (this.options_index += 1))
          : void 0;
      }),
      (SelectParser.prototype.escapeExpression = function (a) {
        var b, c;
        return null == a || a === !1
          ? ""
          : /[\&\<\>\"\'\`]/.test(a)
          ? ((b = {
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#x27;",
              "`": "&#x60;",
            }),
            (c = /&(?!\w+;)|[\<\>\"\'\`]/g),
            a.replace(c, function (a) {
              return b[a] || "&amp;";
            }))
          : a;
      }),
      SelectParser
    );
  })()),
    (SelectParser.select_to_array = function (a) {
      var b, c, d, e, f;
      for (
        c = new SelectParser(), f = a.childNodes, d = 0, e = f.length;
        e > d;
        d++
      )
        (b = f[d]), c.add_node(b);
      return c.parsed;
    }),
    (AbstractChosen = (function () {
      function AbstractChosen(a, b) {
        (this.form_field = a),
          (this.options = null != b ? b : {}),
          AbstractChosen.browser_is_supported() &&
            ((this.is_multiple = this.form_field.multiple),
            this.set_default_text(),
            this.set_default_values(),
            this.setup(),
            this.set_up_html(),
            this.register_observers(),
            this.on_ready());
      }
      return (
        (AbstractChosen.prototype.set_default_values = function () {
          var a = this;
          return (
            (this.click_test_action = function (b) {
              return a.test_active_click(b);
            }),
            (this.activate_action = function (b) {
              return a.activate_field(b);
            }),
            (this.active_field = !1),
            (this.mouse_on_container = !1),
            (this.results_showing = !1),
            (this.result_highlighted = null),
            (this.allow_single_deselect =
              null != this.options.allow_single_deselect &&
              null != this.form_field.options[0] &&
              "" === this.form_field.options[0].text
                ? this.options.allow_single_deselect
                : !1),
            (this.disable_search_threshold =
              this.options.disable_search_threshold || 0),
            (this.disable_search = this.options.disable_search || !1),
            (this.enable_split_word_search =
              null != this.options.enable_split_word_search
                ? this.options.enable_split_word_search
                : !0),
            (this.group_search =
              null != this.options.group_search
                ? this.options.group_search
                : !0),
            (this.search_contains = this.options.search_contains || !1),
            (this.single_backstroke_delete =
              null != this.options.single_backstroke_delete
                ? this.options.single_backstroke_delete
                : !0),
            (this.max_selected_options =
              this.options.max_selected_options || 1 / 0),
            (this.inherit_select_classes =
              this.options.inherit_select_classes || !1),
            (this.display_selected_options =
              null != this.options.display_selected_options
                ? this.options.display_selected_options
                : !0),
            (this.display_disabled_options =
              null != this.options.display_disabled_options
                ? this.options.display_disabled_options
                : !0),
            (this.include_group_label_in_selected =
              this.options.include_group_label_in_selected || !1),
            (this.max_shown_results =
              this.options.max_shown_results || Number.POSITIVE_INFINITY)
          );
        }),
        (AbstractChosen.prototype.set_default_text = function () {
          return (
            this.form_field.getAttribute("data-placeholder")
              ? (this.default_text =
                  this.form_field.getAttribute("data-placeholder"))
              : this.is_multiple
              ? (this.default_text =
                  this.options.placeholder_text_multiple ||
                  this.options.placeholder_text ||
                  AbstractChosen.default_multiple_text)
              : (this.default_text =
                  this.options.placeholder_text_single ||
                  this.options.placeholder_text ||
                  AbstractChosen.default_single_text),
            (this.results_none_found =
              this.form_field.getAttribute("data-no_results_text") ||
              this.options.no_results_text ||
              AbstractChosen.default_no_result_text)
          );
        }),
        (AbstractChosen.prototype.choice_label = function (a) {
          return this.include_group_label_in_selected && null != a.group_label
            ? "<b class='group-name'>" + a.group_label + "</b>" + a.html
            : a.html;
        }),
        (AbstractChosen.prototype.mouse_enter = function () {
          return (this.mouse_on_container = !0);
        }),
        (AbstractChosen.prototype.mouse_leave = function () {
          return (this.mouse_on_container = !1);
        }),
        (AbstractChosen.prototype.input_focus = function (a) {
          var b = this;
          if (this.is_multiple) {
            if (!this.active_field)
              return setTimeout(function () {
                return b.container_mousedown();
              }, 50);
          } else if (!this.active_field) return this.activate_field();
        }),
        (AbstractChosen.prototype.input_blur = function (a) {
          var b = this;
          return this.mouse_on_container
            ? void 0
            : ((this.active_field = !1),
              setTimeout(function () {
                return b.blur_test();
              }, 100));
        }),
        (AbstractChosen.prototype.results_option_build = function (a) {
          var b, c, d, e, f, g, h;
          for (
            b = "", e = 0, h = this.results_data, f = 0, g = h.length;
            g > f &&
            ((c = h[f]),
            (d = ""),
            (d = c.group
              ? this.result_add_group(c)
              : this.result_add_option(c)),
            "" !== d && (e++, (b += d)),
            (null != a ? a.first : void 0) &&
              (c.selected && this.is_multiple
                ? this.choice_build(c)
                : c.selected &&
                  !this.is_multiple &&
                  this.single_set_selected_text(this.choice_label(c))),
            !(e >= this.max_shown_results));
            f++
          );
          return b;
        }),
        (AbstractChosen.prototype.result_add_option = function (a) {
          var b, c;
          return a.search_match && this.include_option_in_results(a)
            ? ((b = []),
              a.disabled ||
                (a.selected && this.is_multiple) ||
                b.push("active-result"),
              !a.disabled ||
                (a.selected && this.is_multiple) ||
                b.push("disabled-result"),
              a.selected && b.push("result-selected"),
              null != a.group_array_index && b.push("group-option"),
              "" !== a.classes && b.push(a.classes),
              (c = document.createElement("li")),
              (c.className = b.join(" ")),
              (c.style.cssText = a.style),
              c.setAttribute("data-option-array-index", a.array_index),
              (c.innerHTML = a.search_text),
              a.title && (c.title = a.title),
              this.outerHTML(c))
            : "";
        }),
        (AbstractChosen.prototype.result_add_group = function (a) {
          var b, c;
          return (a.search_match || a.group_match) && a.active_options > 0
            ? ((b = []),
              b.push("group-result"),
              a.classes && b.push(a.classes),
              (c = document.createElement("li")),
              (c.className = b.join(" ")),
              (c.innerHTML = a.search_text),
              a.title && (c.title = a.title),
              this.outerHTML(c))
            : "";
        }),
        (AbstractChosen.prototype.results_update_field = function () {
          return (
            this.set_default_text(),
            this.is_multiple || this.results_reset_cleanup(),
            this.result_clear_highlight(),
            this.results_build(),
            this.results_showing ? this.winnow_results() : void 0
          );
        }),
        (AbstractChosen.prototype.reset_single_select_options = function () {
          var a, b, c, d, e;
          for (d = this.results_data, e = [], b = 0, c = d.length; c > b; b++)
            (a = d[b]), a.selected ? e.push((a.selected = !1)) : e.push(void 0);
          return e;
        }),
        (AbstractChosen.prototype.results_toggle = function () {
          return this.results_showing
            ? this.results_hide()
            : this.results_show();
        }),
        (AbstractChosen.prototype.results_search = function (a) {
          return this.results_showing
            ? this.winnow_results()
            : this.results_show();
        }),
        (AbstractChosen.prototype.winnow_results = function () {
          var a, b, c, d, e, f, g, h, i, j, k, l;
          for (
            this.no_results_clear(),
              d = 0,
              f = this.get_search_text(),
              a = f.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
              i = new RegExp(a, "i"),
              c = this.get_search_regex(a),
              l = this.results_data,
              j = 0,
              k = l.length;
            k > j;
            j++
          )
            (b = l[j]),
              (b.search_match = !1),
              (e = null),
              this.include_option_in_results(b) &&
                (b.group && ((b.group_match = !1), (b.active_options = 0)),
                null != b.group_array_index &&
                  this.results_data[b.group_array_index] &&
                  ((e = this.results_data[b.group_array_index]),
                  0 === e.active_options && e.search_match && (d += 1),
                  (e.active_options += 1)),
                (b.search_text = b.group ? b.label : b.html),
                (!b.group || this.group_search) &&
                  ((b.search_match = this.search_string_match(
                    b.search_text,
                    c
                  )),
                  b.search_match && !b.group && (d += 1),
                  b.search_match
                    ? (f.length &&
                        ((g = b.search_text.search(i)),
                        (h =
                          b.search_text.substr(0, g + f.length) +
                          "</em>" +
                          b.search_text.substr(g + f.length)),
                        (b.search_text =
                          h.substr(0, g) + "<em>" + h.substr(g))),
                      null != e && (e.group_match = !0))
                    : null != b.group_array_index &&
                      this.results_data[b.group_array_index].search_match &&
                      (b.search_match = !0)));
          return (
            this.result_clear_highlight(),
            1 > d && f.length
              ? (this.update_results_content(""), this.no_results(f))
              : (this.update_results_content(this.results_option_build()),
                this.winnow_results_set_highlight())
          );
        }),
        (AbstractChosen.prototype.get_search_regex = function (a) {
          var b;
          return (b = this.search_contains ? "" : "^"), new RegExp(b + a, "i");
        }),
        (AbstractChosen.prototype.search_string_match = function (a, b) {
          var c, d, e, f;
          if (b.test(a)) return !0;
          if (
            this.enable_split_word_search &&
            (a.indexOf(" ") >= 0 || 0 === a.indexOf("[")) &&
            ((d = a.replace(/\[|\]/g, "").split(" ")), d.length)
          )
            for (e = 0, f = d.length; f > e; e++)
              if (((c = d[e]), b.test(c))) return !0;
        }),
        (AbstractChosen.prototype.choices_count = function () {
          var a, b, c, d;
          if (null != this.selected_option_count)
            return this.selected_option_count;
          for (
            this.selected_option_count = 0,
              d = this.form_field.options,
              b = 0,
              c = d.length;
            c > b;
            b++
          )
            (a = d[b]), a.selected && (this.selected_option_count += 1);
          return this.selected_option_count;
        }),
        (AbstractChosen.prototype.choices_click = function (a) {
          return (
            a.preventDefault(),
            this.results_showing || this.is_disabled
              ? void 0
              : this.results_show()
          );
        }),
        (AbstractChosen.prototype.keyup_checker = function (a) {
          var b, c;
          switch (
            ((b = null != (c = a.which) ? c : a.keyCode),
            this.search_field_scale(),
            b)
          ) {
            case 8:
              if (
                this.is_multiple &&
                this.backstroke_length < 1 &&
                this.choices_count() > 0
              )
                return this.keydown_backstroke();
              if (!this.pending_backstroke)
                return this.result_clear_highlight(), this.results_search();
              break;
            case 13:
              if ((a.preventDefault(), this.results_showing))
                return this.result_select(a);
              break;
            case 27:
              return this.results_showing && this.results_hide(), !0;
            case 9:
            case 38:
            case 40:
            case 16:
            case 91:
            case 17:
            case 18:
              break;
            default:
              return this.results_search();
          }
        }),
        (AbstractChosen.prototype.clipboard_event_checker = function (a) {
          var b = this;
          return setTimeout(function () {
            return b.results_search();
          }, 50);
        }),
        (AbstractChosen.prototype.container_width = function () {
          return null != this.options.width
            ? this.options.width
            : "" + this.form_field.offsetWidth + "px";
        }),
        (AbstractChosen.prototype.include_option_in_results = function (a) {
          return this.is_multiple &&
            !this.display_selected_options &&
            a.selected
            ? !1
            : !this.display_disabled_options && a.disabled
            ? !1
            : a.empty
            ? !1
            : !0;
        }),
        (AbstractChosen.prototype.search_results_touchstart = function (a) {
          return (this.touch_started = !0), this.search_results_mouseover(a);
        }),
        (AbstractChosen.prototype.search_results_touchmove = function (a) {
          return (this.touch_started = !1), this.search_results_mouseout(a);
        }),
        (AbstractChosen.prototype.search_results_touchend = function (a) {
          return this.touch_started ? this.search_results_mouseup(a) : void 0;
        }),
        (AbstractChosen.prototype.outerHTML = function (a) {
          var b;
          return a.outerHTML
            ? a.outerHTML
            : ((b = document.createElement("div")),
              b.appendChild(a),
              b.innerHTML);
        }),
        (AbstractChosen.browser_is_supported = function () {
          return /iP(od|hone)/i.test(window.navigator.userAgent)
            ? !1
            : /Android/i.test(window.navigator.userAgent) &&
              /Mobile/i.test(window.navigator.userAgent)
            ? !1
            : /IEMobile/i.test(window.navigator.userAgent)
            ? !1
            : /Windows Phone/i.test(window.navigator.userAgent)
            ? !1
            : /BlackBerry/i.test(window.navigator.userAgent)
            ? !1
            : /BB10/i.test(window.navigator.userAgent)
            ? !1
            : "Microsoft Internet Explorer" === window.navigator.appName
            ? document.documentMode >= 8
            : !0;
        }),
        (AbstractChosen.default_multiple_text = "Select Some Options"),
        (AbstractChosen.default_single_text = "Select an Option"),
        (AbstractChosen.default_no_result_text = "No results match"),
        AbstractChosen
      );
    })()),
    (a = jQuery),
    a.fn.extend({
      chosen: function (b) {
        return AbstractChosen.browser_is_supported()
          ? this.each(function (c) {
              var d, e;
              return (
                (d = a(this)),
                (e = d.data("chosen")),
                "destroy" === b
                  ? void (e instanceof Chosen && e.destroy())
                  : void (
                      e instanceof Chosen ||
                      d.data("chosen", new Chosen(this, b))
                    )
              );
            })
          : this;
      },
    }),
    (Chosen = (function (c) {
      function Chosen() {
        return (b = Chosen.__super__.constructor.apply(this, arguments));
      }
      return (
        d(Chosen, c),
        (Chosen.prototype.setup = function () {
          return (
            (this.form_field_jq = a(this.form_field)),
            (this.current_selectedIndex = this.form_field.selectedIndex),
            (this.is_rtl = this.form_field_jq.hasClass("chosen-rtl"))
          );
        }),
        (Chosen.prototype.set_up_html = function () {
          var b, c;
          return (
            (b = ["chosen-container"]),
            b.push(
              "chosen-container-" + (this.is_multiple ? "multi" : "single")
            ),
            this.inherit_select_classes &&
              this.form_field.className &&
              b.push(this.form_field.className),
            this.is_rtl && b.push("chosen-rtl"),
            (c = {
              class: b.join(" "),
              style: "width: " + this.container_width() + ";",
              title: this.form_field.title,
            }),
            this.form_field.id.length &&
              (c.id = this.form_field.id.replace(/[^\w]/g, "_") + "_chosen"),
            (this.container = a("<div />", c)),
            this.is_multiple
              ? this.container.html(
                  '<ul class="chosen-choices"><li class="search-field"><input type="text" value="' +
                    this.default_text +
                    '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'
                )
              : this.container.html(
                  '<a class="chosen-single chosen-default"><span>' +
                    this.default_text +
                    '</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'
                ),
            this.form_field_jq.hide().after(this.container),
            (this.dropdown = this.container.find("div.chosen-drop").first()),
            (this.search_field = this.container.find("input").first()),
            (this.search_results = this.container
              .find("ul.chosen-results")
              .first()),
            this.search_field_scale(),
            (this.search_no_results = this.container
              .find("li.no-results")
              .first()),
            this.is_multiple
              ? ((this.search_choices = this.container
                  .find("ul.chosen-choices")
                  .first()),
                (this.search_container = this.container
                  .find("li.search-field")
                  .first()))
              : ((this.search_container = this.container
                  .find("div.chosen-search")
                  .first()),
                (this.selected_item = this.container
                  .find(".chosen-single")
                  .first())),
            this.results_build(),
            this.set_tab_index(),
            this.set_label_behavior()
          );
        }),
        (Chosen.prototype.on_ready = function () {
          return this.form_field_jq.trigger("chosen:ready", { chosen: this });
        }),
        (Chosen.prototype.register_observers = function () {
          var a = this;
          return (
            this.container.bind("touchstart.chosen", function (b) {
              return a.container_mousedown(b), b.preventDefault();
            }),
            this.container.bind("touchend.chosen", function (b) {
              return a.container_mouseup(b), b.preventDefault();
            }),
            this.container.bind("mousedown.chosen", function (b) {
              a.container_mousedown(b);
            }),
            this.container.bind("mouseup.chosen", function (b) {
              a.container_mouseup(b);
            }),
            this.container.bind("mouseenter.chosen", function (b) {
              a.mouse_enter(b);
            }),
            this.container.bind("mouseleave.chosen", function (b) {
              a.mouse_leave(b);
            }),
            this.search_results.bind("mouseup.chosen", function (b) {
              a.search_results_mouseup(b);
            }),
            this.search_results.bind("mouseover.chosen", function (b) {
              a.search_results_mouseover(b);
            }),
            this.search_results.bind("mouseout.chosen", function (b) {
              a.search_results_mouseout(b);
            }),
            this.search_results.bind(
              "mousewheel.chosen DOMMouseScroll.chosen",
              function (b) {
                a.search_results_mousewheel(b);
              }
            ),
            this.search_results.bind("touchstart.chosen", function (b) {
              a.search_results_touchstart(b);
            }),
            this.search_results.bind("touchmove.chosen", function (b) {
              a.search_results_touchmove(b);
            }),
            this.search_results.bind("touchend.chosen", function (b) {
              a.search_results_touchend(b);
            }),
            this.form_field_jq.bind("chosen:updated.chosen", function (b) {
              a.results_update_field(b);
            }),
            this.form_field_jq.bind("chosen:activate.chosen", function (b) {
              a.activate_field(b);
            }),
            this.form_field_jq.bind("chosen:open.chosen", function (b) {
              a.container_mousedown(b);
            }),
            this.form_field_jq.bind("chosen:close.chosen", function (b) {
              a.input_blur(b);
            }),
            this.search_field.bind("blur.chosen", function (b) {
              a.input_blur(b);
            }),
            this.search_field.bind("keyup.chosen", function (b) {
              a.keyup_checker(b);
            }),
            this.search_field.bind("keydown.chosen", function (b) {
              a.keydown_checker(b);
            }),
            this.search_field.bind("focus.chosen", function (b) {
              a.input_focus(b);
            }),
            this.search_field.bind("cut.chosen", function (b) {
              a.clipboard_event_checker(b);
            }),
            this.search_field.bind("paste.chosen", function (b) {
              a.clipboard_event_checker(b);
            }),
            this.is_multiple
              ? this.search_choices.bind("click.chosen", function (b) {
                  a.choices_click(b);
                })
              : this.container.bind("click.chosen", function (a) {
                  a.preventDefault();
                })
          );
        }),
        (Chosen.prototype.destroy = function () {
          return (
            a(this.container[0].ownerDocument).unbind(
              "click.chosen",
              this.click_test_action
            ),
            this.search_field[0].tabIndex &&
              (this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex),
            this.container.remove(),
            this.form_field_jq.removeData("chosen"),
            this.form_field_jq.show()
          );
        }),
        (Chosen.prototype.search_field_disabled = function () {
          return (
            (this.is_disabled = this.form_field_jq[0].disabled),
            this.is_disabled
              ? (this.container.addClass("chosen-disabled"),
                (this.search_field[0].disabled = !0),
                this.is_multiple ||
                  this.selected_item.unbind(
                    "focus.chosen",
                    this.activate_action
                  ),
                this.close_field())
              : (this.container.removeClass("chosen-disabled"),
                (this.search_field[0].disabled = !1),
                this.is_multiple
                  ? void 0
                  : this.selected_item.bind(
                      "focus.chosen",
                      this.activate_action
                    ))
          );
        }),
        (Chosen.prototype.container_mousedown = function (b) {
          return this.is_disabled ||
            (b &&
              "mousedown" === b.type &&
              !this.results_showing &&
              b.preventDefault(),
            null != b && a(b.target).hasClass("search-choice-close"))
            ? void 0
            : (this.active_field
                ? this.is_multiple ||
                  !b ||
                  (a(b.target)[0] !== this.selected_item[0] &&
                    !a(b.target).parents("a.chosen-single").length) ||
                  (b.preventDefault(), this.results_toggle())
                : (this.is_multiple && this.search_field.val(""),
                  a(this.container[0].ownerDocument).bind(
                    "click.chosen",
                    this.click_test_action
                  ),
                  this.results_show()),
              this.activate_field());
        }),
        (Chosen.prototype.container_mouseup = function (a) {
          return "ABBR" !== a.target.nodeName || this.is_disabled
            ? void 0
            : this.results_reset(a);
        }),
        (Chosen.prototype.search_results_mousewheel = function (a) {
          var b;
          return (
            a.originalEvent &&
              (b =
                a.originalEvent.deltaY ||
                -a.originalEvent.wheelDelta ||
                a.originalEvent.detail),
            null != b
              ? (a.preventDefault(),
                "DOMMouseScroll" === a.type && (b = 40 * b),
                this.search_results.scrollTop(
                  b + this.search_results.scrollTop()
                ))
              : void 0
          );
        }),
        (Chosen.prototype.blur_test = function (a) {
          return !this.active_field &&
            this.container.hasClass("chosen-container-active")
            ? this.close_field()
            : void 0;
        }),
        (Chosen.prototype.close_field = function () {
          return (
            a(this.container[0].ownerDocument).unbind(
              "click.chosen",
              this.click_test_action
            ),
            (this.active_field = !1),
            this.results_hide(),
            this.container.removeClass("chosen-container-active"),
            this.clear_backstroke(),
            this.show_search_field_default(),
            this.search_field_scale()
          );
        }),
        (Chosen.prototype.activate_field = function () {
          return (
            this.container.addClass("chosen-container-active"),
            (this.active_field = !0),
            this.search_field.val(this.search_field.val()),
            this.search_field.focus()
          );
        }),
        (Chosen.prototype.test_active_click = function (b) {
          var c;
          return (
            (c = a(b.target).closest(".chosen-container")),
            c.length && this.container[0] === c[0]
              ? (this.active_field = !0)
              : this.close_field()
          );
        }),
        (Chosen.prototype.results_build = function () {
          return (
            (this.parsing = !0),
            (this.selected_option_count = null),
            (this.results_data = SelectParser.select_to_array(this.form_field)),
            this.is_multiple
              ? this.search_choices.find("li.search-choice").remove()
              : this.is_multiple ||
                (this.single_set_selected_text(),
                this.disable_search ||
                this.form_field.options.length <= this.disable_search_threshold
                  ? ((this.search_field[0].readOnly = !0),
                    this.container.addClass("chosen-container-single-nosearch"))
                  : ((this.search_field[0].readOnly = !1),
                    this.container.removeClass(
                      "chosen-container-single-nosearch"
                    ))),
            this.update_results_content(
              this.results_option_build({ first: !0 })
            ),
            this.search_field_disabled(),
            this.show_search_field_default(),
            this.search_field_scale(),
            (this.parsing = !1)
          );
        }),
        (Chosen.prototype.result_do_highlight = function (a) {
          var b, c, d, e, f;
          if (a.length) {
            if (
              (this.result_clear_highlight(),
              (this.result_highlight = a),
              this.result_highlight.addClass("highlighted"),
              (d = parseInt(this.search_results.css("maxHeight"), 10)),
              (f = this.search_results.scrollTop()),
              (e = d + f),
              (c =
                this.result_highlight.position().top +
                this.search_results.scrollTop()),
              (b = c + this.result_highlight.outerHeight()),
              b >= e)
            )
              return this.search_results.scrollTop(b - d > 0 ? b - d : 0);
            if (f > c) return this.search_results.scrollTop(c);
          }
        }),
        (Chosen.prototype.result_clear_highlight = function () {
          return (
            this.result_highlight &&
              this.result_highlight.removeClass("highlighted"),
            (this.result_highlight = null)
          );
        }),
        (Chosen.prototype.results_show = function () {
          return this.is_multiple &&
            this.max_selected_options <= this.choices_count()
            ? (this.form_field_jq.trigger("chosen:maxselected", {
                chosen: this,
              }),
              !1)
            : (this.container.addClass("chosen-with-drop"),
              (this.results_showing = !0),
              this.search_field.focus(),
              this.search_field.val(this.search_field.val()),
              this.winnow_results(),
              this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this,
              }));
        }),
        (Chosen.prototype.update_results_content = function (a) {
          return this.search_results.html(a);
        }),
        (Chosen.prototype.results_hide = function () {
          return (
            this.results_showing &&
              (this.result_clear_highlight(),
              this.container.removeClass("chosen-with-drop"),
              this.form_field_jq.trigger("chosen:hiding_dropdown", {
                chosen: this,
              })),
            (this.results_showing = !1)
          );
        }),
        (Chosen.prototype.set_tab_index = function (a) {
          var b;
          return this.form_field.tabIndex
            ? ((b = this.form_field.tabIndex),
              (this.form_field.tabIndex = -1),
              (this.search_field[0].tabIndex = b))
            : void 0;
        }),
        (Chosen.prototype.set_label_behavior = function () {
          var b = this;
          return (
            (this.form_field_label = this.form_field_jq.parents("label")),
            !this.form_field_label.length &&
              this.form_field.id.length &&
              (this.form_field_label = a(
                "label[for='" + this.form_field.id + "']"
              )),
            this.form_field_label.length > 0
              ? this.form_field_label.bind("click.chosen", function (a) {
                  return b.is_multiple
                    ? b.container_mousedown(a)
                    : b.activate_field();
                })
              : void 0
          );
        }),
        (Chosen.prototype.show_search_field_default = function () {
          return this.is_multiple &&
            this.choices_count() < 1 &&
            !this.active_field
            ? (this.search_field.val(this.default_text),
              this.search_field.addClass("default"))
            : (this.search_field.val(""),
              this.search_field.removeClass("default"));
        }),
        (Chosen.prototype.search_results_mouseup = function (b) {
          var c;
          return (
            (c = a(b.target).hasClass("active-result")
              ? a(b.target)
              : a(b.target).parents(".active-result").first()),
            c.length
              ? ((this.result_highlight = c),
                this.result_select(b),
                this.search_field.focus())
              : void 0
          );
        }),
        (Chosen.prototype.search_results_mouseover = function (b) {
          var c;
          return (
            (c = a(b.target).hasClass("active-result")
              ? a(b.target)
              : a(b.target).parents(".active-result").first()),
            c ? this.result_do_highlight(c) : void 0
          );
        }),
        (Chosen.prototype.search_results_mouseout = function (b) {
          return a(b.target).hasClass("active-result")
            ? this.result_clear_highlight()
            : void 0;
        }),
        (Chosen.prototype.choice_build = function (b) {
          var c,
            d,
            e = this;
          return (
            (c = a("<li />", { class: "search-choice" }).html(
              "<span>" + this.choice_label(b) + "</span>"
            )),
            b.disabled
              ? c.addClass("search-choice-disabled")
              : ((d = a("<a />", {
                  class: "search-choice-close",
                  "data-option-array-index": b.array_index,
                })),
                d.bind("click.chosen", function (a) {
                  return e.choice_destroy_link_click(a);
                }),
                c.append(d)),
            this.search_container.before(c)
          );
        }),
        (Chosen.prototype.choice_destroy_link_click = function (b) {
          return (
            b.preventDefault(),
            b.stopPropagation(),
            this.is_disabled ? void 0 : this.choice_destroy(a(b.target))
          );
        }),
        (Chosen.prototype.choice_destroy = function (a) {
          return this.result_deselect(
            a[0].getAttribute("data-option-array-index")
          )
            ? (this.show_search_field_default(),
              this.is_multiple &&
                this.choices_count() > 0 &&
                this.search_field.val().length < 1 &&
                this.results_hide(),
              a.parents("li").first().remove(),
              this.search_field_scale())
            : void 0;
        }),
        (Chosen.prototype.results_reset = function () {
          return (
            this.reset_single_select_options(),
            (this.form_field.options[0].selected = !0),
            this.single_set_selected_text(),
            this.show_search_field_default(),
            this.results_reset_cleanup(),
            this.form_field_jq.trigger("change"),
            this.active_field ? this.results_hide() : void 0
          );
        }),
        (Chosen.prototype.results_reset_cleanup = function () {
          return (
            (this.current_selectedIndex = this.form_field.selectedIndex),
            this.selected_item.find("abbr").remove()
          );
        }),
        (Chosen.prototype.result_select = function (a) {
          var b, c;
          return this.result_highlight
            ? ((b = this.result_highlight),
              this.result_clear_highlight(),
              this.is_multiple &&
              this.max_selected_options <= this.choices_count()
                ? (this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this,
                  }),
                  !1)
                : (this.is_multiple
                    ? b.removeClass("active-result")
                    : this.reset_single_select_options(),
                  b.addClass("result-selected"),
                  (c =
                    this.results_data[
                      b[0].getAttribute("data-option-array-index")
                    ]),
                  (c.selected = !0),
                  (this.form_field.options[c.options_index].selected = !0),
                  (this.selected_option_count = null),
                  this.is_multiple
                    ? this.choice_build(c)
                    : this.single_set_selected_text(this.choice_label(c)),
                  ((a.metaKey || a.ctrlKey) && this.is_multiple) ||
                    this.results_hide(),
                  this.show_search_field_default(),
                  (this.is_multiple ||
                    this.form_field.selectedIndex !==
                      this.current_selectedIndex) &&
                    this.form_field_jq.trigger("change", {
                      selected: this.form_field.options[c.options_index].value,
                    }),
                  (this.current_selectedIndex = this.form_field.selectedIndex),
                  a.preventDefault(),
                  this.search_field_scale()))
            : void 0;
        }),
        (Chosen.prototype.single_set_selected_text = function (a) {
          return (
            null == a && (a = this.default_text),
            a === this.default_text
              ? this.selected_item.addClass("chosen-default")
              : (this.single_deselect_control_build(),
                this.selected_item.removeClass("chosen-default")),
            this.selected_item.find("span").html(a)
          );
        }),
        (Chosen.prototype.result_deselect = function (a) {
          var b;
          return (
            (b = this.results_data[a]),
            this.form_field.options[b.options_index].disabled
              ? !1
              : ((b.selected = !1),
                (this.form_field.options[b.options_index].selected = !1),
                (this.selected_option_count = null),
                this.result_clear_highlight(),
                this.results_showing && this.winnow_results(),
                this.form_field_jq.trigger("change", {
                  deselected: this.form_field.options[b.options_index].value,
                }),
                this.search_field_scale(),
                !0)
          );
        }),
        (Chosen.prototype.single_deselect_control_build = function () {
          return this.allow_single_deselect
            ? (this.selected_item.find("abbr").length ||
                this.selected_item
                  .find("span")
                  .first()
                  .after('<abbr class="search-choice-close"></abbr>'),
              this.selected_item.addClass("chosen-single-with-deselect"))
            : void 0;
        }),
        (Chosen.prototype.get_search_text = function () {
          return a("<div/>").text(a.trim(this.search_field.val())).html();
        }),
        (Chosen.prototype.winnow_results_set_highlight = function () {
          var a, b;
          return (
            (b = this.is_multiple
              ? []
              : this.search_results.find(".result-selected.active-result")),
            (a = b.length
              ? b.first()
              : this.search_results.find(".active-result").first()),
            null != a ? this.result_do_highlight(a) : void 0
          );
        }),
        (Chosen.prototype.no_results = function (b) {
          var c;
          return (
            (c = a(
              '<li class="no-results">' +
                this.results_none_found +
                ' "<span></span>"</li>'
            )),
            c.find("span").first().html(b),
            this.search_results.append(c),
            this.form_field_jq.trigger("chosen:no_results", { chosen: this })
          );
        }),
        (Chosen.prototype.no_results_clear = function () {
          return this.search_results.find(".no-results").remove();
        }),
        (Chosen.prototype.keydown_arrow = function () {
          var a;
          return this.results_showing && this.result_highlight
            ? (a = this.result_highlight.nextAll("li.active-result").first())
              ? this.result_do_highlight(a)
              : void 0
            : this.results_show();
        }),
        (Chosen.prototype.keyup_arrow = function () {
          var a;
          return this.results_showing || this.is_multiple
            ? this.result_highlight
              ? ((a = this.result_highlight.prevAll("li.active-result")),
                a.length
                  ? this.result_do_highlight(a.first())
                  : (this.choices_count() > 0 && this.results_hide(),
                    this.result_clear_highlight()))
              : void 0
            : this.results_show();
        }),
        (Chosen.prototype.keydown_backstroke = function () {
          var a;
          return this.pending_backstroke
            ? (this.choice_destroy(this.pending_backstroke.find("a").first()),
              this.clear_backstroke())
            : ((a = this.search_container.siblings("li.search-choice").last()),
              a.length && !a.hasClass("search-choice-disabled")
                ? ((this.pending_backstroke = a),
                  this.single_backstroke_delete
                    ? this.keydown_backstroke()
                    : this.pending_backstroke.addClass("search-choice-focus"))
                : void 0);
        }),
        (Chosen.prototype.clear_backstroke = function () {
          return (
            this.pending_backstroke &&
              this.pending_backstroke.removeClass("search-choice-focus"),
            (this.pending_backstroke = null)
          );
        }),
        (Chosen.prototype.keydown_checker = function (a) {
          var b, c;
          switch (
            ((b = null != (c = a.which) ? c : a.keyCode),
            this.search_field_scale(),
            8 !== b && this.pending_backstroke && this.clear_backstroke(),
            b)
          ) {
            case 8:
              this.backstroke_length = this.search_field.val().length;
              break;
            case 9:
              this.results_showing &&
                !this.is_multiple &&
                this.result_select(a),
                (this.mouse_on_container = !1);
              break;
            case 13:
              this.results_showing && a.preventDefault();
              break;
            case 32:
              this.disable_search && a.preventDefault();
              break;
            case 38:
              a.preventDefault(), this.keyup_arrow();
              break;
            case 40:
              a.preventDefault(), this.keydown_arrow();
          }
        }),
        (Chosen.prototype.search_field_scale = function () {
          var b, c, d, e, f, g, h, i, j;
          if (this.is_multiple) {
            for (
              d = 0,
                h = 0,
                f =
                  "position:absolute; left: -1000px; top: -1000px; display:none;",
                g = [
                  "font-size",
                  "font-style",
                  "font-weight",
                  "font-family",
                  "line-height",
                  "text-transform",
                  "letter-spacing",
                ],
                i = 0,
                j = g.length;
              j > i;
              i++
            )
              (e = g[i]), (f += e + ":" + this.search_field.css(e) + ";");
            return (
              (b = a("<div />", { style: f })),
              b.text(this.search_field.val()),
              a("body").append(b),
              (h = b.width() + 25),
              b.remove(),
              (c = this.container.outerWidth()),
              h > c - 10 && (h = c - 10),
              this.search_field.css({ width: h + "px" })
            );
          }
        }),
        Chosen
      );
    })(AbstractChosen));
}.call(this));

// tilt js for hover 3d
("use strict");
var _typeof =
  "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
    ? function (t) {
        return typeof t;
      }
    : function (t) {
        return t &&
          "function" == typeof Symbol &&
          t.constructor === Symbol &&
          t !== Symbol.prototype
          ? "symbol"
          : typeof t;
      };
!(function (t) {
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "object" ===
        ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
      module.exports
    ? (module.exports = function (i, s) {
        return (
          void 0 === s &&
            (s =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(i)),
          t(s),
          s
        );
      })
    : t(jQuery);
})(function (t) {
  return (
    (t.fn.tilt = function (i) {
      var s = function () {
          this.ticking ||
            (requestAnimationFrame(g.bind(this)), (this.ticking = !0));
        },
        e = function () {
          var i = this;
          t(this).on("mousemove", o),
            t(this).on("mouseenter", a),
            this.settings.reset && t(this).on("mouseleave", l),
            this.settings.glare && t(window).on("resize", d.bind(i));
        },
        n = function () {
          var i = this;
          void 0 !== this.timeout && clearTimeout(this.timeout),
            t(this).css({
              transition: this.settings.speed + "ms " + this.settings.easing,
            }),
            this.settings.glare &&
              this.glareElement.css({
                transition:
                  "opacity " +
                  this.settings.speed +
                  "ms " +
                  this.settings.easing,
              }),
            (this.timeout = setTimeout(function () {
              t(i).css({ transition: "" }),
                i.settings.glare && i.glareElement.css({ transition: "" });
            }, this.settings.speed));
        },
        a = function (i) {
          (this.ticking = !1),
            t(this).css({ "will-change": "transform" }),
            n.call(this),
            t(this).trigger("tilt.mouseEnter");
        },
        r = function (i) {
          return (
            "undefined" == typeof i &&
              (i = {
                pageX: t(this).offset().left + t(this).outerWidth() / 2,
                pageY: t(this).offset().top + t(this).outerHeight() / 2,
              }),
            { x: i.pageX, y: i.pageY }
          );
        },
        o = function (t) {
          (this.mousePositions = r(t)), s.call(this);
        },
        l = function () {
          n.call(this),
            (this.reset = !0),
            s.call(this),
            t(this).trigger("tilt.mouseLeave");
        },
        h = function () {
          var i = t(this).outerWidth(),
            s = t(this).outerHeight(),
            e = t(this).offset().left,
            n = t(this).offset().top,
            a = (this.mousePositions.x - e) / i,
            r = (this.mousePositions.y - n) / s,
            o = (this.settings.maxTilt / 2 - a * this.settings.maxTilt).toFixed(
              2
            ),
            l = (r * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(
              2
            ),
            h =
              Math.atan2(
                this.mousePositions.x - (e + i / 2),
                -(this.mousePositions.y - (n + s / 2))
              ) *
              (180 / Math.PI);
          return {
            tiltX: o,
            tiltY: l,
            percentageX: 100 * a,
            percentageY: 100 * r,
            angle: h,
          };
        },
        g = function () {
          return (
            (this.transforms = h.call(this)),
            this.reset
              ? ((this.reset = !1),
                t(this).css(
                  "transform",
                  "perspective(" +
                    this.settings.perspective +
                    "px) rotateX(0deg) rotateY(0deg)"
                ),
                void (
                  this.settings.glare &&
                  (this.glareElement.css(
                    "transform",
                    "rotate(180deg) translate(-50%, -50%)"
                  ),
                  this.glareElement.css("opacity", "0"))
                ))
              : (t(this).css(
                  "transform",
                  "perspective(" +
                    this.settings.perspective +
                    "px) rotateX(" +
                    ("x" === this.settings.disableAxis
                      ? 0
                      : this.transforms.tiltY) +
                    "deg) rotateY(" +
                    ("y" === this.settings.disableAxis
                      ? 0
                      : this.transforms.tiltX) +
                    "deg) scale3d(" +
                    this.settings.scale +
                    "," +
                    this.settings.scale +
                    "," +
                    this.settings.scale +
                    ")"
                ),
                this.settings.glare &&
                  (this.glareElement.css(
                    "transform",
                    "rotate(" +
                      this.transforms.angle +
                      "deg) translate(-50%, -50%)"
                  ),
                  this.glareElement.css(
                    "opacity",
                    "" +
                      (this.transforms.percentageY * this.settings.maxGlare) /
                        100
                  )),
                t(this).trigger("change", [this.transforms]),
                void (this.ticking = !1))
          );
        },
        c = function () {
          var i = this.settings.glarePrerender;
          if (
            (i ||
              t(this).append(
                '<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'
              ),
            (this.glareElementWrapper = t(this).find(".js-tilt-glare")),
            (this.glareElement = t(this).find(".js-tilt-glare-inner")),
            !i)
          ) {
            var s = {
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            };
            this.glareElementWrapper
              .css(s)
              .css({ overflow: "hidden", "pointer-events": "none" }),
              this.glareElement.css({
                position: "absolute",
                top: "50%",
                left: "50%",
                "background-image":
                  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                width: "" + 2 * t(this).outerWidth(),
                height: "" + 2 * t(this).outerWidth(),
                transform: "rotate(180deg) translate(-50%, -50%)",
                "transform-origin": "0% 0%",
                opacity: "0",
              });
          }
        },
        d = function () {
          this.glareElement.css({
            width: "" + 2 * t(this).outerWidth(),
            height: "" + 2 * t(this).outerWidth(),
          });
        };
      return (
        (t.fn.tilt.destroy = function () {
          t(this).each(function () {
            t(this).find(".js-tilt-glare").remove(),
              t(this).css({ "will-change": "", transform: "" }),
              t(this).off("mousemove mouseenter mouseleave");
          });
        }),
        (t.fn.tilt.getValues = function () {
          var i = [];
          return (
            t(this).each(function () {
              (this.mousePositions = r.call(this)), i.push(h.call(this));
            }),
            i
          );
        }),
        (t.fn.tilt.reset = function () {
          t(this).each(function () {
            var i = this;
            (this.mousePositions = r.call(this)),
              (this.settings = t(this).data("settings")),
              l.call(this),
              setTimeout(function () {
                i.reset = !1;
              }, this.settings.transition);
          });
        }),
        this.each(function () {
          var s = this;
          (this.settings = t.extend(
            {
              maxTilt: t(this).is("[data-tilt-max]")
                ? t(this).data("tilt-max")
                : 20,
              perspective: t(this).is("[data-tilt-perspective]")
                ? t(this).data("tilt-perspective")
                : 300,
              easing: t(this).is("[data-tilt-easing]")
                ? t(this).data("tilt-easing")
                : "cubic-bezier(.03,.98,.52,.99)",
              scale: t(this).is("[data-tilt-scale]")
                ? t(this).data("tilt-scale")
                : "1",
              speed: t(this).is("[data-tilt-speed]")
                ? t(this).data("tilt-speed")
                : "400",
              transition:
                !t(this).is("[data-tilt-transition]") ||
                t(this).data("tilt-transition"),
              disableAxis: t(this).is("[data-tilt-disable-axis]")
                ? t(this).data("tilt-disable-axis")
                : null,
              axis: t(this).is("[data-tilt-axis]")
                ? t(this).data("tilt-axis")
                : null,
              reset:
                !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
              glare:
                !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
              maxGlare: t(this).is("[data-tilt-maxglare]")
                ? t(this).data("tilt-maxglare")
                : 1,
            },
            i
          )),
            null !== this.settings.axis &&
              (console.warn(
                "Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"
              ),
              (this.settings.disableAxis = this.settings.axis)),
            (this.init = function () {
              t(s).data("settings", s.settings),
                s.settings.glare && c.call(s),
                e.call(s);
            }),
            this.init();
        })
      );
    }),
    t("[data-tilt]").tilt(),
    !0
  );
});
