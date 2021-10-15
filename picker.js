let colorPickerInitialized = false;
let initColorPicker = (() => {
  var aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
      if (a == Array.prototype || a == Object.prototype)
          return a;
      a[b] = c.value;
      return a
  }
  ;
  function ba(a) {
      a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
      for (var b = 0; b < a.length; ++b) {
          var c = a[b];
          if (c && c.Math == Math)
              return c
      }
      throw Error("Cannot find global object");
  }
  var ca = ba(this);
  function x(a, b) {
      if (b)
          a: {
              var c = ca;
              a = a.split(".");
              for (var e = 0; e < a.length - 1; e++) {
                  var f = a[e];
                  if (!(f in c))
                      break a;
                  c = c[f]
              }
              a = a[a.length - 1];
              e = c[a];
              b = b(e);
              b != e && null != b && aa(c, a, {
                  configurable: !0,
                  writable: !0,
                  value: b
              })
          }
  }
  x("Array.prototype.fill", function(a) {
      return a ? a : function(b, c, e) {
          var f = this.length || 0;
          0 > c && (c = Math.max(0, f + c));
          if (null == e || e > f)
              e = f;
          e = Number(e);
          0 > e && (e = Math.max(0, f + e));
          for (c = Number(c || 0); c < e; c++)
              this[c] = b;
          return this
      }
  });
  function y(a) {
      return a ? a : Array.prototype.fill
  }
  x("Int8Array.prototype.fill", y);
  x("Uint8Array.prototype.fill", y);
  x("Uint8ClampedArray.prototype.fill", y);
  x("Int16Array.prototype.fill", y);
  x("Uint16Array.prototype.fill", y);
  x("Int32Array.prototype.fill", y);
  x("Uint32Array.prototype.fill", y);
  x("Float32Array.prototype.fill", y);
  x("Float64Array.prototype.fill", y);
  if (!da)
      var da = {};
  function ea(a) {
      a = ha(a);
      for (var b = a.length, c = 0, e = null, f = null, h = 0, g = b; h < g; ) {
          var m = h++
            , l = ia(a[m]);
          if (null == f || l < f)
              f = l,
              e = m
      }
      h = a[e];
      l = z(h, {
          a: -(1 / h.a),
          b: 0
      });
      var n = Math.atan2(l.y, l.x);
      m = [];
      h = 0;
      for (g = b - 1; h < g; )
          for (var k = h++, p = k + 1, v = b; p < v; ) {
              var w = p++;
              l = z(a[k], a[w]);
              var A = Math.atan2(l.y, l.x);
              m.push({
                  j: k,
                  l: w,
                  i: l,
                  C: A,
                  s: ja(A - n)
              })
          }
      m.sort(function(N, O) {
          return N.s > O.s ? 1 : -1
      });
      b = [];
      n = [];
      A = [];
      l = [];
      h = 0;
      for (g = m.length; h < g; )
          k = h++,
          p = m[k],
          k = null,
          p.j == e ? k = p.l : p.l == e && (k = p.j),
          null != k && (e = k,
          l.push(e),
          b.push(a[k]),
          n.push(p.i),
          A.push(p.C),
          k = G(p.i),
          k > c && (c = k));
      return {
          lines: b,
          c: n,
          u: A,
          o: c,
          B: f
      }
  }
  function ka(a, b) {
      for (var c = Math.atan2(b.y, b.x), e = a.c.length, f, h = 2 * Math.PI, g = 0, m = 0; m < e; ) {
          var l = m++;
          f = ja(a.u[l] - c);
          f < h && (h = f,
          g = l)
      }
      e = (g - 1 + e) % e;
      f = a.lines[e];
      if (G(b) < f.b / (Math.sin(c) - f.a * Math.cos(c)))
          return b;
      c = -1 / f.a;
      b = z(f, {
          a: c,
          b: b.y - c * b.x
      });
      g = a.c[g];
      c = a.c[e];
      g.x > c.x ? (a = g,
      g = c) : a = c;
      return b.x > a.x ? a : b.x < g.x ? g : b
  }
  function z(a, b) {
      b = (a.b - b.b) / (b.a - a.a);
      return {
          x: b,
          y: a.a * b + a.b
      }
  }
  function G(a) {
      return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2))
  }
  function ia(a) {
      return Math.abs(a.b) / Math.sqrt(Math.pow(a.a, 2) + 1)
  }
  function ja(a) {
      var b = 2 * Math.PI;
      return (a % b + b) % b
  }
  function ha(a) {
      var b = []
        , c = Math.pow(a + 16, 3) / 1560896;
      c = c > la ? c : a / H;
      for (var e = 0; 3 > e; ) {
          var f = e++
            , h = I[f][0]
            , g = I[f][1];
          f = I[f][2];
          var m = (632260 * f - 126452 * g) * c;
          b.push({
              a: (284517 * h - 94839 * f) * c / m,
              b: ((838422 * f + 769860 * g + 731718 * h) * a * c - 0 * a) / m
          });
          m = (632260 * f - 126452 * g) * c + 126452;
          b.push({
              a: (284517 * h - 94839 * f) * c / m,
              b: ((838422 * f + 769860 * g + 731718 * h) * a * c - 769860 * a) / m
          })
      }
      return b
  }
  function J(a, b) {
      b = b / 360 * Math.PI * 2;
      a = ha(a);
      for (var c = Infinity, e = 0; e < a.length; ) {
          var f = a[e];
          ++e;
          f = f.b / (Math.sin(b) - f.a * Math.cos(b));
          0 <= f && (c = Math.min(c, f))
      }
      return c
  }
  function K(a, b) {
      for (var c = 0, e = 0, f = a.length; e < f; ) {
          var h = e++;
          c += a[h] * b[h]
      }
      return c
  }
  function P(a) {
      return .0031308 >= a ? 12.92 * a : 1.055 * Math.pow(a, .4166666666666667) - .055
  }
  function Q(a) {
      return .04045 < a ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92
  }
  function R(a) {
      return [P(K(I[0], a)), P(K(I[1], a)), P(K(I[2], a))]
  }
  function S(a) {
      var b = a[0];
      if (0 == b)
          return [0, 0, 0];
      var c = a[1] / (13 * b) + ma;
      a = a[2] / (13 * b) + na;
      b = 8 >= b ? U * b / H : U * Math.pow((b + 16) / 116, 3);
      c = -(9 * b * c / ((c - 4) * a - c * a));
      return [c, b, (9 * b - 15 * a * b - a * c) / (3 * a)]
  }
  function oa(a) {
      var b = a[0]
        , c = a[1]
        , e = a[2];
      a = Math.sqrt(c * c + e * e);
      1E-8 > a ? c = 0 : (c = 180 * Math.atan2(e, c) / Math.PI,
      0 > c && (c = 360 + c));
      return [b, a, c]
  }
  function V(a) {
      var b = a[1]
        , c = a[2] / 360 * 2 * Math.PI;
      return [a[0], Math.cos(c) * b, Math.sin(c) * b]
  }
  function W(a) {
      var b = a[0]
        , c = a[1];
      a = a[2];
      if (99.9999999 < a)
          return [100, 0, b];
      if (1E-8 > a)
          return [0, 0, b];
      c = J(a, b) / 100 * c;
      return [a, c, b]
  }
  function pa(a) {
      var b = a[0]
        , c = a[1];
      a = a[2];
      if (99.9999999 < b)
          return [a, 0, 100];
      if (1E-8 > b)
          return [a, 0, 0];
      var e = J(b, a);
      return [a, c / e * 100, b]
  }
  function X(a) {
      var b = a[0];
      b = Math.round(255 * b);
      var c = b % 16;
      var e = "#" + (Y.charAt((b - c) / 16 | 0) + Y.charAt(c));
      b = a[1];
      b = Math.round(255 * b);
      c = b % 16;
      e += Y.charAt((b - c) / 16 | 0) + Y.charAt(c);
      b = a[2];
      b = Math.round(255 * b);
      c = b % 16;
      return e += Y.charAt((b - c) / 16 | 0) + Y.charAt(c)
  }
  var I = [[3.240969941904521, -1.537383177570093, -.498610760293], [-.96924363628087, 1.87596750150772, .041555057407175], [.055630079696993, -.20397695888897, 1.056971514242878]]
    , wa = [[.41239079926595, .35758433938387, .18048078840183], [.21263900587151, .71516867876775, .072192315360733], [.019330818715591, .11919477979462, .95053215224966]]
    , U = 1
    , ma = .19783000664283
    , na = .46831999493879
    , H = 903.2962962
    , la = .0088564516
    , Y = "0123456789abcdef";
  function xa(a, b) {
      a = parseFloat(a);
      return 0 <= a && a <= b
  }
  function ya(a) {
      for (var b = [], c = 0; c < a; c++)
          b.push(c / (a - 1));
      return b
  }
  function za(a, b) {
      function c(n) {
          var k = a.getBoundingClientRect();
          if (n.touches) {
              var p = n.touches[0].clientX;
              n = n.touches[0].clientY
          } else
              p = n.clientX,
              n = n.clientY;
          return {
              x: Math.min(1, Math.max(0, (p - k.left) / k.width)),
              y: Math.min(1, Math.max(0, (n - k.top) / k.height))
          }
      }
      function e(n) {
          if (3 !== n.which) {
              var k = c(n);
              m(k) && (l = !0,
              n.preventDefault(),
              g(k))
          }
      }
      function f() {
          l = !1
      }
      function h(n) {
          l && (n.preventDefault(),
          g(c(n)))
      }
      var g = b.m
        , m = b.v || function() {
          return !0
      }
        , l = !1;
      a.addEventListener("mousedown", e);
      a.addEventListener("touchstart", e);
      document.addEventListener("mousemove", h);
      document.addEventListener("touchmove", h);
      document.addEventListener("mouseup", f);
      document.addEventListener("touchend", f)
  }
  function Aa(a, b, c) {
      var e = this;
      this.f = a;
      this.h = b;
      this.g = document.createElement("div");
      this.g.className = "range-slider-handle";
      this.A = this.f.getBoundingClientRect().width;
      a.appendChild(this.g);
      za(this.f, {
          m: function(f) {
              Z(e, f.x);
              c(f.x)
          }
      })
  }
  function Z(a, b) {
      a.h = b;
      a.g.style.left = a.h * a.A - 5 + "px"
  }
  function Ba(a, b) {
      a.f.style.background = "linear-gradient(to right," + b.join(",") + ")"
  }
  return function initColorPicker() {
      if (colorPickerInitialized) return;
      colorPickerInitialized = true;
      function a(d) {
          return {
              x: d.x * m + 200,
              y: 200 - d.y * m
          }
      }
      function b(d) {
          return {
              x: (d.x - 200) / m,
              y: (200 - d.y) / m
          }
      }
      function c() {
          L.setAttribute("fill", n);
          D.setAttribute("stroke", n);
          if (0 !== g && 100 !== g) {
              var d = J(g, f) * h / 100
                , r = f / 360 * 2 * Math.PI;
              d = a({
                  x: d * Math.cos(r),
                  y: d * Math.sin(r)
              });
              u.setAttribute("cx", d.x.toString());
              u.setAttribute("cy", d.y.toString());
              u.setAttribute("stroke", n);
              u.style.display = "inline";
              D.setAttribute("r", (m * l.B).toString())
          } else
              u.style.display = "none",
              D.setAttribute("r", "0");
          d = ya(20).map(function(t) {
              return X(R(S(V(W([360 * t, h, g])))))
          });
          r = ya(10).map(function(t) {
              return X(R(S(V(W([f, 100 * t, g])))))
          });
          var q = ya(10).map(function(t) {
              return X(R(S(V(W([f, h, 100 * t])))))
          });
          Ba(qa, d);
          Ba(ra, r);
          Ba(sa, q)
      }
      function e(d, r, q, t) {
          q && (n = 70 < g ? "#1b1b1b" : "#ffffff",
          l = ea(g),
          m = 190 / l.o);
          c();
          var B = X(R(S(V(W([f, h, g])))));
          Ca.style.backgroundColor = B;
          6 !== t && (A.value = B);
          if (q && (B = l.c.map(a),
          p.clearRect(0, 0, 400, 400),
          p.globalCompositeOperation = "source-over",
          0 !== g && 100 !== g)) {
              for (var C = [], M = [], E, F = 0; F < B.length; F++)
                  E = B[F],
                  C.push(E.x),
                  M.push(E.y);
              F = Math.floor(Math.min.apply(Math, C) / 8);
              E = Math.floor(Math.min.apply(Math, M) / 8);
              C = Math.ceil(Math.max.apply(Math, C) / 8);
              for (M = Math.ceil(Math.max.apply(Math, M) / 8); F < C; F++)
                  for (var fa = E; fa < M; fa++) {
                      var ta = 8 * F
                        , ua = 8 * fa
                        , T = b({
                          x: ta + 4,
                          y: ua + 4
                      });
                      T = ka(l, T);
                      p.fillStyle = X(R(S([g, T.x, T.y])));
                      p.fillRect(ta, ua, 8, 8)
                  }
              p.globalCompositeOperation = "destination-in";
              p.beginPath();
              p.moveTo(B[0].x, B[0].y);
              for (C = 1; C < B.length; C++)
                  E = B[C],
                  p.lineTo(E.x, E.y);
              p.closePath();
              p.fill()
          }
          d && 0 !== t && Z(qa, f / 360);
          r && 1 !== t && Z(ra, h / 100);
          q && 2 !== t && Z(sa, g / 100);
          d && 3 !== t && (N.value = f.toFixed(1));
          r && 4 !== t && (O.value = h.toFixed(1));
          q && 5 !== t && (va.value = g.toFixed(1))
      }
      var f = 0, h = 100, g = 50, m = 1, l, n, k = document.getElementById("picker"), p = k.getElementsByTagName("canvas")[0].getContext("2d"), v = document.getElementById("control-s").getElementsByClassName("range-slider")[0], w = document.getElementById("control-h").getElementsByClassName("range-slider")[0], A = k.getElementsByClassName("input-hex")[0], N = k.getElementsByClassName("counter-hue")[0], O = k.getElementsByClassName("counter-saturation")[0], va = k.getElementsByClassName("counter-lightness")[0], Ca = k.getElementsByClassName("swatch")[0];
      k = k.getElementsByTagName("svg")[0];
      var sa = new Aa(document.getElementById("control-l").getElementsByClassName("range-slider")[0],.5,function(d) {
          g = 100 * d;
          e(!1, !1, !0, 2)
      }
      )
        , ra = new Aa(v,.5,function(d) {
          h = 100 * d;
          e(!1, !0, !1, 1)
      }
      )
        , qa = new Aa(w,0,function(d) {
          f = 360 * d;
          e(!0, !1, !0, 0)
      }
      );
      N.addEventListener("input", function() {
          xa(this.value, 360) && (f = parseFloat(this.value),
          e(!0, !1, !1, 3))
      });
      O.addEventListener("input", function() {
          xa(this.value, 100) && (h = parseFloat(this.value),
          e(!1, !0, !1, 4))
      });
      va.addEventListener("input", function() {
          xa(this.value, 100) && (g = parseFloat(this.value),
          e(!1, !1, !0, 5))
      });
      v = a({
          x: 0,
          y: 0
      });
      var D = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      D.setAttribute("cx", v.x.toString());
      D.setAttribute("cy", v.y.toString());
      D.setAttribute("fill", "none");
      D.setAttribute("stroke-width", "2");
      k.appendChild(D);
      var L = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      L.setAttribute("cx", v.x.toString());
      L.setAttribute("cy", v.y.toString());
      L.setAttribute("r", (2).toString());
      k.appendChild(L);
      w = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      w.setAttribute("cx", v.x.toString());
      w.setAttribute("cy", v.y.toString());
      w.setAttribute("r", (190).toString());
      w.setAttribute("fill", "none");
      w.setAttribute("stroke", "black");
      w.setAttribute("stroke-width", "1");
      k.appendChild(w);
      var u = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      u.setAttribute("cx", v.x.toString());
      u.setAttribute("cy", v.y.toString());
      u.setAttribute("r", "4");
      u.setAttribute("fill", "none");
      u.setAttribute("stroke-width", "2");
      u.style.display = "none";
      u.className = "scope";
      k.appendChild(u);
      za(k, {
          m: function(d) {
              d = b({
                  x: 400 * d.x,
                  y: 400 * d.y
              });
              d = ka(l, d);
              d = pa(oa([g, d.x, d.y]));
              f = d[0];
              h = d[1];
              e(!0, !0, !1, null)
          },
          v: function(d) {
              var r = l.o;
              return G(b({
                  x: 400 * d.x,
                  y: 400 * d.y
              })) < r
          }
      });
      A.addEventListener("input", function() {
          var d = (d = A.value.match(/^\s*#?([0-9a-f]{6})\s*$/i)) ? "#" + d[1] : null;
          if (null !== d) {
              d = d.toLowerCase();
              var r = []
                , q = Y.indexOf(d.charAt(1))
                , t = Y.indexOf(d.charAt(2));
              r.push((16 * q + t) / 255);
              q = Y.indexOf(d.charAt(3));
              t = Y.indexOf(d.charAt(4));
              r.push((16 * q + t) / 255);
              q = Y.indexOf(d.charAt(5));
              t = Y.indexOf(d.charAt(6));
              r.push((16 * q + t) / 255);
              d = [Q(r[0]), Q(r[1]), Q(r[2])];
              q = [K(wa[0], d), K(wa[1], d), K(wa[2], d)];
              r = q[0];
              d = q[1];
              q = r + 15 * d + 3 * q[2];
              0 != q ? (r = 4 * r / q,
              q = 9 * d / q) : q = r = NaN;
              d = d <= la ? d / U * H : 116 * Math.pow(d / U, .3333333333333333) - 16;
              d = pa(oa(0 == d ? [0, 0, 0] : [d, 13 * d * (r - ma), 13 * d * (q - na)]));
              f = d[0];
              h = d[1];
              g = d[2];
              e(!0, !0, !0, 6)
          }
      });
      e(!0, !0, !0, null)
  };
})();


(() => {
  let internalHexInput = document.querySelector('.input-hex');
  let dialog = document.querySelector('#picker');
  let saveColorButton = document.querySelector('#picker-save-color');
  function setPicker(hex) {
    if (hex.replace('#', '') === internalHexInput.value.replace('#', '')) return;
    internalHexInput.value = '#' + hex.replace('#', '');
    internalHexInput.dispatchEvent(new Event('input'));
  }

  window.createColorPickerOnClickHandler = (colorInputEl) => () => {
    dialog.open = true;
    initColorPicker();
    // setTimeout(initColorPicker, 500);
    setPicker(colorInputEl.value);
    saveColorButton.onclick = () => {
      colorInputEl.value = internalHexInput.value.replace('#', '');
      colorInputEl.dispatchEvent(new Event('input'));
      saveColorButton.onclick = null;
      dialog.open = false;
    }
  }

  document.querySelector('#picker-cancel-color').onclick = () => {
    dialog.open = false;
  }
})();