import { D as nt, T as Z, C as U, M as ft, p as at, F as et, w as ht, E as Ft, f as Pt, t as X, v as pt, x as gt, y as j, z as N, H as St, I as rt, J as It, K as R, h as Ht } from "./pixi-panorama-Cfptddmv.js";
import { C as xt } from "./CanvasPool-DcMvUpTL.js";
/**
 * tiny-lru
 *
 * @copyright 2026 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 11.4.7
 */
class Rt {
  /**
   * Creates a new LRU cache instance.
   * Note: Constructor does not validate parameters. Use lru() factory function for parameter validation.
   *
   * @constructor
   * @param {number} [max=0] - Maximum number of items to store. 0 means unlimited.
   * @param {number} [ttl=0] - Time to live in milliseconds. 0 means no expiration.
   * @param {boolean} [resetTtl=false] - Whether to reset TTL when accessing existing items via get().
   * @example
   * const cache = new LRU(1000, 60000, true); // 1000 items, 1 minute TTL, reset on access
   * @see {@link lru} For parameter validation
   * @since 1.0.0
   */
  constructor(t = 0, e = 0, i = !1) {
    this.first = null, this.items = /* @__PURE__ */ Object.create(null), this.last = null, this.max = t, this.resetTtl = i, this.size = 0, this.ttl = e;
  }
  /**
   * Removes all items from the cache.
   *
   * @method clear
   * @memberof LRU
   * @returns {LRU} The LRU instance for method chaining.
   * @example
   * cache.clear();
   * console.log(cache.size); // 0
   * @since 1.0.0
   */
  clear() {
    return this.first = null, this.items = /* @__PURE__ */ Object.create(null), this.last = null, this.size = 0, this;
  }
  /**
   * Removes an item from the cache by key.
   *
   * @method delete
   * @memberof LRU
   * @param {string} key - The key of the item to delete.
   * @returns {LRU} The LRU instance for method chaining.
   * @example
   * cache.set('key1', 'value1');
   * cache.delete('key1');
   * console.log(cache.has('key1')); // false
   * @see {@link LRU#has}
   * @see {@link LRU#clear}
   * @since 1.0.0
   */
  delete(t) {
    if (this.has(t)) {
      const e = this.items[t];
      delete this.items[t], this.size--, e.prev !== null && (e.prev.next = e.next), e.next !== null && (e.next.prev = e.prev), this.first === e && (this.first = e.next), this.last === e && (this.last = e.prev);
    }
    return this;
  }
  /**
   * Returns an array of [key, value] pairs for the specified keys.
   * Order follows LRU order (least to most recently used).
   *
   * @method entries
   * @memberof LRU
   * @param {string[]} [keys=this.keys()] - Array of keys to get entries for. Defaults to all keys.
   * @returns {Array<Array<*>>} Array of [key, value] pairs in LRU order.
   * @example
   * cache.set('a', 1).set('b', 2);
   * console.log(cache.entries()); // [['a', 1], ['b', 2]]
   * console.log(cache.entries(['a'])); // [['a', 1]]
   * @see {@link LRU#keys}
   * @see {@link LRU#values}
   * @since 11.1.0
   */
  entries(t = this.keys()) {
    const e = new Array(t.length);
    for (let i = 0; i < t.length; i++) {
      const s = t[i];
      e[i] = [s, this.get(s)];
    }
    return e;
  }
  /**
   * Removes the least recently used item from the cache.
   *
   * @method evict
   * @memberof LRU
   * @param {boolean} [bypass=false] - Whether to force eviction even when cache is empty.
   * @returns {LRU} The LRU instance for method chaining.
   * @example
   * cache.set('old', 'value').set('new', 'value');
   * cache.evict(); // Removes 'old' item
   * @see {@link LRU#setWithEvicted}
   * @since 1.0.0
   */
  evict(t = !1) {
    if (t || this.size > 0) {
      const e = this.first;
      delete this.items[e.key], --this.size === 0 ? (this.first = null, this.last = null) : (this.first = e.next, this.first.prev = null);
    }
    return this;
  }
  /**
   * Returns the expiration timestamp for a given key.
   *
   * @method expiresAt
   * @memberof LRU
   * @param {string} key - The key to check expiration for.
   * @returns {number|undefined} The expiration timestamp in milliseconds, or undefined if key doesn't exist.
   * @example
   * const cache = new LRU(100, 5000); // 5 second TTL
   * cache.set('key1', 'value1');
   * console.log(cache.expiresAt('key1')); // timestamp 5 seconds from now
   * @see {@link LRU#get}
   * @see {@link LRU#has}
   * @since 1.0.0
   */
  expiresAt(t) {
    let e;
    return this.has(t) && (e = this.items[t].expiry), e;
  }
  /**
   * Retrieves a value from the cache by key. Updates the item's position to most recently used.
   *
   * @method get
   * @memberof LRU
   * @param {string} key - The key to retrieve.
   * @returns {*} The value associated with the key, or undefined if not found or expired.
   * @example
   * cache.set('key1', 'value1');
   * console.log(cache.get('key1')); // 'value1'
   * console.log(cache.get('nonexistent')); // undefined
   * @see {@link LRU#set}
   * @see {@link LRU#has}
   * @since 1.0.0
   */
  get(t) {
    const e = this.items[t];
    if (e !== void 0) {
      if (this.ttl > 0 && e.expiry <= Date.now()) {
        this.delete(t);
        return;
      }
      return this.moveToEnd(e), e.value;
    }
  }
  /**
   * Checks if a key exists in the cache.
   *
   * @method has
   * @memberof LRU
   * @param {string} key - The key to check for.
   * @returns {boolean} True if the key exists, false otherwise.
   * @example
   * cache.set('key1', 'value1');
   * console.log(cache.has('key1')); // true
   * console.log(cache.has('nonexistent')); // false
   * @see {@link LRU#get}
   * @see {@link LRU#delete}
   * @since 9.0.0
   */
  has(t) {
    return t in this.items;
  }
  /**
   * Efficiently moves an item to the end of the LRU list (most recently used position).
   * This is an internal optimization method that avoids the overhead of the full set() operation
   * when only LRU position needs to be updated.
   *
   * @method moveToEnd
   * @memberof LRU
   * @param {Object} item - The cache item with prev/next pointers to reposition.
   * @private
   * @since 11.3.5
   */
  moveToEnd(t) {
    this.last !== t && (t.prev !== null && (t.prev.next = t.next), t.next !== null && (t.next.prev = t.prev), this.first === t && (this.first = t.next), t.prev = this.last, t.next = null, this.last !== null && (this.last.next = t), this.last = t, this.first === null && (this.first = t));
  }
  /**
   * Returns an array of all keys in the cache, ordered from least to most recently used.
   *
   * @method keys
   * @memberof LRU
   * @returns {string[]} Array of keys in LRU order.
   * @example
   * cache.set('a', 1).set('b', 2);
   * cache.get('a'); // Move 'a' to most recent
   * console.log(cache.keys()); // ['b', 'a']
   * @see {@link LRU#values}
   * @see {@link LRU#entries}
   * @since 9.0.0
   */
  keys() {
    const t = new Array(this.size);
    let e = this.first, i = 0;
    for (; e !== null; )
      t[i++] = e.key, e = e.next;
    return t;
  }
  /**
   * Sets a value in the cache and returns any evicted item.
   *
   * @method setWithEvicted
   * @memberof LRU
   * @param {string} key - The key to set.
   * @param {*} value - The value to store.
   * @param {boolean} [resetTtl=this.resetTtl] - Whether to reset the TTL for this operation.
   * @returns {Object|null} The evicted item (if any) with shape {key, value, expiry, prev, next}, or null.
   * @example
   * const cache = new LRU(2);
   * cache.set('a', 1).set('b', 2);
   * const evicted = cache.setWithEvicted('c', 3); // evicted = {key: 'a', value: 1, ...}
   * @see {@link LRU#set}
   * @see {@link LRU#evict}
   * @since 11.3.0
   */
  setWithEvicted(t, e, i = this.resetTtl) {
    let s = null;
    if (this.has(t))
      this.set(t, e, !0, i);
    else {
      this.max > 0 && this.size === this.max && (s = { ...this.first }, this.evict(!0));
      let n = this.items[t] = {
        expiry: this.ttl > 0 ? Date.now() + this.ttl : this.ttl,
        key: t,
        prev: this.last,
        next: null,
        value: e
      };
      ++this.size === 1 ? this.first = n : this.last.next = n, this.last = n;
    }
    return s;
  }
  /**
   * Sets a value in the cache. Updates the item's position to most recently used.
   *
   * @method set
   * @memberof LRU
   * @param {string} key - The key to set.
   * @param {*} value - The value to store.
   * @param {boolean} [bypass=false] - Internal parameter for setWithEvicted method.
   * @param {boolean} [resetTtl=this.resetTtl] - Whether to reset the TTL for this operation.
   * @returns {LRU} The LRU instance for method chaining.
   * @example
   * cache.set('key1', 'value1')
   *      .set('key2', 'value2')
   *      .set('key3', 'value3');
   * @see {@link LRU#get}
   * @see {@link LRU#setWithEvicted}
   * @since 1.0.0
   */
  set(t, e, i = !1, s = this.resetTtl) {
    let n = this.items[t];
    return i || n !== void 0 ? (n.value = e, i === !1 && s && (n.expiry = this.ttl > 0 ? Date.now() + this.ttl : this.ttl), this.moveToEnd(n)) : (this.max > 0 && this.size === this.max && this.evict(!0), n = this.items[t] = {
      expiry: this.ttl > 0 ? Date.now() + this.ttl : this.ttl,
      key: t,
      prev: this.last,
      next: null,
      value: e
    }, ++this.size === 1 ? this.first = n : this.last.next = n, this.last = n), this;
  }
  /**
   * Returns an array of all values in the cache for the specified keys.
   * Order follows LRU order (least to most recently used).
   *
   * @method values
   * @memberof LRU
   * @param {string[]} [keys=this.keys()] - Array of keys to get values for. Defaults to all keys.
   * @returns {Array<*>} Array of values corresponding to the keys in LRU order.
   * @example
   * cache.set('a', 1).set('b', 2);
   * console.log(cache.values()); // [1, 2]
   * console.log(cache.values(['a'])); // [1]
   * @see {@link LRU#keys}
   * @see {@link LRU#entries}
   * @since 11.1.0
   */
  values(t = this.keys()) {
    const e = new Array(t.length);
    for (let i = 0; i < t.length; i++)
      e[i] = this.get(t[i]);
    return e;
  }
}
function Ct(r = 1e3, t = 0, e = !1) {
  if (isNaN(r) || r < 0)
    throw new TypeError("Invalid max value");
  if (isNaN(t) || t < 0)
    throw new TypeError("Invalid ttl value");
  if (typeof e != "boolean")
    throw new TypeError("Invalid resetTtl value");
  return new Rt(r, t, e);
}
function Tt(r) {
  return !!r.tagStyles && Object.keys(r.tagStyles).length > 0;
}
function Bt(r) {
  return r.includes("<");
}
function Ot(r, t) {
  return r.clone().assign(t);
}
function jt(r, t) {
  const e = [], i = t.tagStyles;
  if (!Tt(t) || !Bt(r))
    return e.push({ text: r, style: t }), e;
  const s = [t], n = [];
  let o = "", h = 0;
  for (; h < r.length; ) {
    const a = r[h];
    if (a === "<") {
      const l = r.indexOf(">", h);
      if (l === -1) {
        o += a, h++;
        continue;
      }
      const c = r.slice(h + 1, l);
      if (c.startsWith("/")) {
        const u = c.slice(1).trim();
        if (n.length > 0 && n[n.length - 1] === u) {
          o.length > 0 && (e.push({
            text: o,
            style: s[s.length - 1]
          }), o = ""), s.pop(), n.pop(), h = l + 1;
          continue;
        } else {
          o += r.slice(h, l + 1), h = l + 1;
          continue;
        }
      } else {
        const u = c.trim();
        if (i[u]) {
          o.length > 0 && (e.push({
            text: o,
            style: s[s.length - 1]
          }), o = "");
          const w = s[s.length - 1], y = Ot(w, i[u]);
          s.push(y), n.push(u), h = l + 1;
          continue;
        } else {
          o += r.slice(h, l + 1), h = l + 1;
          continue;
        }
      }
    } else
      o += a, h++;
  }
  return o.length > 0 && e.push({
    text: o,
    style: s[s.length - 1]
  }), e;
}
const Nt = [
  10,
  // line feed
  13
  // carriage return
], $t = new Set(Nt), Gt = [
  9,
  // character tabulation
  32,
  // space
  8192,
  // en quad
  8193,
  // em quad
  8194,
  // en space
  8195,
  // em space
  8196,
  // three-per-em space
  8197,
  // four-per-em space
  8198,
  // six-per-em space
  8200,
  // punctuation space
  8201,
  // thin space
  8202,
  // hair space
  8287,
  // medium mathematical space
  12288
  // ideographic space
], Kt = new Set(Gt), Dt = [
  9,
  // character tabulation (tab)
  32
  // space
], Vt = new Set(Dt), Yt = [
  45,
  // hyphen-minus
  8208,
  // unicode hyphen
  8211,
  // en-dash
  8212,
  // em-dash
  173
  // soft hyphen
], Xt = new Set(Yt), Ut = /(\r\n|\r|\n)/, qt = /(?:\r\n|\r|\n)/;
function it(r) {
  return typeof r != "string" ? !1 : $t.has(r.charCodeAt(0));
}
function v(r, t) {
  return typeof r != "string" ? !1 : Kt.has(r.charCodeAt(0));
}
function wt(r) {
  return typeof r != "string" ? !1 : Vt.has(r.charCodeAt(0));
}
function bt(r) {
  return typeof r != "string" ? !1 : Xt.has(r.charCodeAt(0));
}
function lt(r) {
  return r === "normal" || r === "pre-line";
}
function ct(r) {
  return r === "normal";
}
function O(r) {
  if (typeof r != "string")
    return "";
  let t = r.length - 1;
  for (; t >= 0 && v(r[t]); )
    t--;
  return t < r.length - 1 ? r.slice(0, t + 1) : r;
}
function At(r) {
  const t = [], e = [];
  if (typeof r != "string")
    return t;
  for (let i = 0; i < r.length; i++) {
    const s = r[i], n = r[i + 1];
    if (v(s) || it(s)) {
      e.length > 0 && (t.push(e.join("")), e.length = 0), s === "\r" && n === `
` ? (t.push(`\r
`), i++) : t.push(s);
      continue;
    }
    e.push(s), bt(s) && n && !v(n) && !it(n) && (t.push(e.join("")), e.length = 0);
  }
  return e.length > 0 && t.push(e.join("")), t;
}
function zt(r, t, e, i) {
  const s = e(r), n = [];
  for (let o = 0; o < s.length; o++) {
    let h = s[o], a = h, l = 1;
    for (; s[o + l]; ) {
      const c = s[o + l];
      if (!i(a, c, r, o, t))
        h += c, a = c, l++;
      else
        break;
    }
    o += l - 1, n.push(h);
  }
  return n;
}
const Jt = /\r\n|\r|\n/g;
function Zt(r, t, e, i, s, n, o, h) {
  var D, H;
  const a = jt(r, t);
  if (ct(t.whiteSpace))
    for (let E = 0; E < a.length; E++) {
      const P = a[E];
      a[E] = { text: P.text.replace(Jt, " "), style: P.style };
    }
  const c = [];
  let u = [];
  for (const E of a) {
    const P = E.text.split(Ut);
    for (let L = 0; L < P.length; L++) {
      const A = P[L];
      A === `\r
` || A === "\r" || A === `
` ? (c.push(u), u = []) : A.length > 0 && u.push({ text: A, style: E.style });
    }
  }
  (u.length > 0 || c.length === 0) && c.push(u);
  const w = e ? Qt(
    c,
    t,
    i,
    s,
    o,
    h
  ) : c, y = [], k = [], T = [], F = [], C = [];
  let m = 0;
  const B = t._fontString, S = n(B);
  S.fontSize === 0 && (S.fontSize = t.fontSize, S.ascent = t.fontSize);
  let f = "", d = !!t.dropShadow, g = ((D = t._stroke) == null ? void 0 : D.width) || 0;
  for (const E of w) {
    let P = 0, L = S.ascent, A = S.descent, Y = "";
    for (const G of E) {
      const K = G.style._fontString, J = n(K);
      K !== f && (i.font = K, f = K);
      const Mt = s(G.text, G.style.letterSpacing, i);
      P += Mt, L = Math.max(L, J.ascent), A = Math.max(A, J.descent), Y += G.text;
      const ut = ((H = G.style._stroke) == null ? void 0 : H.width) || 0;
      ut > g && (g = ut), !d && G.style.dropShadow && (d = !0);
    }
    E.length === 0 && (L = S.ascent, A = S.descent), y.push(P), k.push(L), T.push(A), C.push(Y);
    const q = t.lineHeight || L + A;
    F.push(q + t.leading), m = Math.max(m, P);
  }
  const _ = g, I = (e && t.align !== "left" ? Math.max(m, t.wordWrapWidth) : m) + _ + (t.dropShadow ? t.dropShadow.distance : 0);
  let x = 0;
  for (let E = 0; E < F.length; E++)
    x += F[E];
  x = Math.max(x, F[0] + _);
  const z = x + (t.dropShadow ? t.dropShadow.distance : 0), b = t.lineHeight || S.fontSize;
  return {
    width: I,
    height: z,
    lines: C,
    lineWidths: y,
    lineHeight: b + t.leading,
    maxLineWidth: m,
    fontProperties: S,
    runsByLine: w,
    lineAscents: k,
    lineDescents: T,
    lineHeights: F,
    hasDropShadow: d
  };
}
function Qt(r, t, e, i, s, n) {
  var F;
  const { letterSpacing: o, whiteSpace: h, wordWrapWidth: a, breakWords: l } = t, c = lt(h), u = a + o, w = {};
  let y = "";
  const k = (C, m) => {
    const B = `${C}|${m.styleKey}`;
    let S = w[B];
    if (S === void 0) {
      const f = m._fontString;
      f !== y && (e.font = f, y = f), S = i(C, m.letterSpacing, e) + m.letterSpacing, w[B] = S;
    }
    return S;
  }, T = [];
  for (const C of r) {
    const m = te(C), B = T.length, S = (x) => {
      let z = 0, b = x;
      do {
        const { token: D, style: H } = m[b];
        z += k(D, H), b++;
      } while (b < m.length && m[b].continuesFromPrevious);
      return z;
    }, f = (x) => {
      const z = [];
      let b = x;
      do
        z.push({ token: m[b].token, style: m[b].style }), b++;
      while (b < m.length && m[b].continuesFromPrevious);
      return z;
    };
    let d = [], g = 0, _ = !c, W = null;
    const M = () => {
      W && W.text.length > 0 && d.push(W), W = null;
    }, I = () => {
      if (M(), d.length > 0) {
        const x = d[d.length - 1];
        x.text = O(x.text), x.text.length === 0 && d.pop();
      }
      T.push(d), d = [], g = 0, _ = !1;
    };
    for (let x = 0; x < m.length; x++) {
      const { token: z, style: b, continuesFromPrevious: D } = m[x], H = k(z, b);
      if (c) {
        const L = v(z), A = (W == null ? void 0 : W.text[W.text.length - 1]) ?? ((F = d[d.length - 1]) == null ? void 0 : F.text.slice(-1)) ?? "", Y = A ? v(A) : !1;
        if (L && Y)
          continue;
      }
      const E = !D, P = E ? S(x) : H;
      if (P > u && E)
        if (g > 0 && I(), l) {
          const L = f(x);
          for (let A = 0; A < L.length; A++) {
            const Y = L[A].token, q = L[A].style, G = zt(
              Y,
              l,
              n,
              s
            );
            for (const K of G) {
              const J = k(K, q);
              J + g > u && I(), !W || W.style !== q ? (M(), W = { text: K, style: q }) : W.text += K, g += J;
            }
          }
          x += L.length - 1;
        } else {
          const L = f(x);
          M(), T.push(L.map((A) => ({ text: A.token, style: A.style }))), _ = !1, x += L.length - 1;
        }
      else if (P + g > u && E) {
        if (v(z)) {
          _ = !1;
          continue;
        }
        I(), W = { text: z, style: b }, g = H;
      } else if (D && !l)
        !W || W.style !== b ? (M(), W = { text: z, style: b }) : W.text += z, g += H;
      else {
        const L = v(z);
        if (g === 0 && L && !_)
          continue;
        !W || W.style !== b ? (M(), W = { text: z, style: b }) : W.text += z, g += H;
      }
    }
    if (M(), d.length > 0) {
      const x = d[d.length - 1];
      x.text = O(x.text), x.text.length === 0 && d.pop();
    }
    (d.length > 0 || T.length === B) && T.push(d);
  }
  return T;
}
function te(r) {
  const t = [];
  let e = !1;
  for (const i of r) {
    const s = At(i.text);
    let n = !0;
    for (const o of s) {
      const h = v(o) || it(o), a = n && e && !h;
      t.push({ token: o, style: i.style, continuesFromPrevious: a }), e = !h, n = !1;
    }
  }
  return t;
}
const ee = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
};
function mt(r, t, e, i, s) {
  let n = e[r];
  return typeof n != "number" && (n = s(r, t, i) + t, e[r] = n), n;
}
function ie(r, t, e, i, s, n, o) {
  const h = e.getContext("2d", ee);
  h.font = t._fontString;
  let a = 0, l = "";
  const c = [], u = /* @__PURE__ */ Object.create(null), { letterSpacing: w, whiteSpace: y } = t, k = lt(y), T = ct(y);
  let F = !k;
  const C = t.wordWrapWidth + w, m = At(r);
  for (let S = 0; S < m.length; S++) {
    let f = m[S];
    if (it(f)) {
      if (!T) {
        c.push(O(l)), F = !k, l = "", a = 0;
        continue;
      }
      f = " ";
    }
    if (k) {
      const g = v(f), _ = v(l[l.length - 1]);
      if (g && _)
        continue;
    }
    const d = mt(f, w, u, h, i);
    if (d > C)
      if (l !== "" && (c.push(O(l)), l = "", a = 0), s(f, t.breakWords)) {
        const g = zt(f, t.breakWords, o, n);
        for (const _ of g) {
          const W = mt(_, w, u, h, i);
          W + a > C && (c.push(O(l)), F = !1, l = "", a = 0), l += _, a += W;
        }
      } else
        l.length > 0 && (c.push(O(l)), l = "", a = 0), c.push(O(f)), F = !1, l = "", a = 0;
    else
      d + a > C && (F = !1, c.push(O(l)), l = "", a = 0), (l.length > 0 || !v(f) || F) && (l += f, a += d);
  }
  const B = O(l);
  return B.length > 0 && c.push(B), c.join(`
`);
}
const _t = {
  // TextMetrics requires getImageData readback for measuring fonts.
  willReadFrequently: !0
}, $ = class p {
  /**
   * Checking that we can use modern canvas 2D API.
   *
   * Note: This is an unstable API, Chrome < 94 use `textLetterSpacing`, later versions use `letterSpacing`.
   * @see CanvasTextMetrics.experimentalLetterSpacing
   * @see https://developer.mozilla.org/en-US/docs/Web/API/ICanvasRenderingContext2D/letterSpacing
   * @see https://developer.chrome.com/origintrials/#/view_trial/3585991203293757441
   */
  static get experimentalLetterSpacingSupported() {
    let t = p._experimentalLetterSpacingSupported;
    if (t === void 0) {
      const e = nt.get().getCanvasRenderingContext2D().prototype;
      t = p._experimentalLetterSpacingSupported = "letterSpacing" in e || "textLetterSpacing" in e;
    }
    return t;
  }
  /**
   * @param text - the text that was measured
   * @param style - the style that was measured
   * @param width - the measured width of the text
   * @param height - the measured height of the text
   * @param lines - an array of the lines of text broken by new lines and wrapping if specified in style
   * @param lineWidths - an array of the line widths for each line matched to `lines`
   * @param lineHeight - the measured line height for this style
   * @param maxLineWidth - the maximum line width for all measured lines
   * @param fontProperties - the font properties object from TextMetrics.measureFont
   * @param taggedData - optional object containing tagged text specific data
   * @param taggedData.runsByLine - per-line style runs for tagged text
   * @param taggedData.lineAscents - per-line ascent values for tagged text
   * @param taggedData.lineDescents - per-line descent values for tagged text
   * @param taggedData.lineHeights - per-line height values for tagged text
   * @param taggedData.hasDropShadow - whether any run has a drop shadow
   */
  constructor(t, e, i, s, n, o, h, a, l, c) {
    this.text = t, this.style = e, this.width = i, this.height = s, this.lines = n, this.lineWidths = o, this.lineHeight = h, this.maxLineWidth = a, this.fontProperties = l, c && (this.runsByLine = c.runsByLine, this.lineAscents = c.lineAscents, this.lineDescents = c.lineDescents, this.lineHeights = c.lineHeights, this.hasDropShadow = c.hasDropShadow);
  }
  /**
   * Measures the supplied string of text and returns a Rectangle.
   * @param text - The text to measure.
   * @param style - The text style to use for measuring
   * @param canvas - optional specification of the canvas to use for measuring.
   * @param wordWrap
   * @returns Measured width and height of the text.
   */
  static measureText(t = " ", e, i = p._canvas, s = e.wordWrap) {
    var f;
    const n = `${t}-${e.styleKey}-wordWrap-${s}`;
    if (p._measurementCache.has(n))
      return p._measurementCache.get(n);
    if (Tt(e) && Bt(t)) {
      const d = Zt(
        t,
        e,
        s,
        p._context,
        p._measureText,
        p.measureFont,
        p.canBreakChars,
        p.wordWrapSplit
      ), g = new p(
        t,
        e,
        d.width,
        d.height,
        d.lines,
        d.lineWidths,
        d.lineHeight,
        d.maxLineWidth,
        d.fontProperties,
        {
          runsByLine: d.runsByLine,
          lineAscents: d.lineAscents,
          lineDescents: d.lineDescents,
          lineHeights: d.lineHeights,
          hasDropShadow: d.hasDropShadow
        }
      );
      return p._measurementCache.set(n, g), g;
    }
    const h = e._fontString, a = p.measureFont(h);
    a.fontSize === 0 && (a.fontSize = e.fontSize, a.ascent = e.fontSize, a.descent = 0);
    const l = p._context;
    l.font = h;
    const u = (s ? p._wordWrap(t, e, i) : t).split(qt), w = new Array(u.length);
    let y = 0;
    for (let d = 0; d < u.length; d++) {
      const g = p._measureText(u[d], e.letterSpacing, l);
      w[d] = g, y = Math.max(y, g);
    }
    const k = ((f = e._stroke) == null ? void 0 : f.width) ?? 0, T = e.lineHeight || a.fontSize, F = p._getAlignWidth(y, e, s), C = p._adjustWidthForStyle(F, e), m = Math.max(T, a.fontSize + k) + (u.length - 1) * (T + e.leading), B = p._adjustHeightForStyle(m, e), S = new p(
      t,
      e,
      C,
      B,
      u,
      w,
      T + e.leading,
      y,
      a
    );
    return p._measurementCache.set(n, S), S;
  }
  /**
   * Adjusts the measured width to account for stroke and drop shadow.
   * @param baseWidth - The base content width
   * @param style - The text style
   * @returns The adjusted width
   */
  static _adjustWidthForStyle(t, e) {
    var n;
    const i = ((n = e._stroke) == null ? void 0 : n.width) || 0;
    let s = t + i;
    return e.dropShadow && (s += e.dropShadow.distance), s;
  }
  /**
   * Adjusts the measured height to account for drop shadow.
   * @param baseHeight - The base content height
   * @param style - The text style
   * @returns The adjusted height
   */
  static _adjustHeightForStyle(t, e) {
    let i = t;
    return e.dropShadow && (i += e.dropShadow.distance), i;
  }
  /**
   * Calculates the base width for alignment purposes.
   * When word wrap is enabled with center/right alignment, uses wordWrapWidth.
   * @param maxLineWidth - The maximum line width
   * @param style - The text style
   * @param wordWrapEnabled - Whether word wrap is enabled
   * @returns The width to use for alignment calculations
   */
  static _getAlignWidth(t, e, i) {
    return i && e.align !== "left" ? Math.max(t, e.wordWrapWidth) : t;
  }
  /**
   * Measures the rendered width of a string, accounting for letter spacing and using the provided context.
   * @param text - The text to measure
   * @param letterSpacing - Letter spacing in pixels
   * @param context - Canvas 2D context
   * @returns The measured width of the text with spacing
   * @internal
   */
  static _measureText(t, e, i) {
    let s = !1;
    p.experimentalLetterSpacingSupported && (p.experimentalLetterSpacing ? (i.letterSpacing = `${e}px`, i.textLetterSpacing = `${e}px`, s = !0) : (i.letterSpacing = "0px", i.textLetterSpacing = "0px"));
    const n = i.measureText(t);
    let o = n.width;
    const h = -(n.actualBoundingBoxLeft ?? 0);
    let l = (n.actualBoundingBoxRight ?? 0) - h;
    if (o > 0)
      if (s)
        o -= e, l -= e;
      else {
        const c = (p.graphemeSegmenter(t).length - 1) * e;
        o += c, l += c;
      }
    return Math.max(o, l);
  }
  /**
   * Applies newlines to a string to have it optimally fit into the horizontal
   * bounds set by the Text object's wordWrapWidth property.
   * @param text - String to apply word wrapping to
   * @param style - the style to use when wrapping
   * @param canvas - optional specification of the canvas to use for measuring.
   * @returns New string with new lines applied where required
   */
  static _wordWrap(t, e, i = p._canvas) {
    return ie(
      t,
      e,
      i,
      p._measureText,
      p.canBreakWords,
      p.canBreakChars,
      p.wordWrapSplit
    );
  }
  /**
   * Determines if char is a breaking whitespace.
   *
   * It allows one to determine whether char should be a breaking whitespace
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param char - The character
   * @param [_nextChar] - The next character
   * @returns True if whitespace, False otherwise.
   */
  static isBreakingSpace(t, e) {
    return v(t);
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to customise which words should break
   * Examples are if the token is CJK or numbers.
   * It must return a boolean.
   * @param _token - The token
   * @param breakWords - The style attr break words
   * @returns Whether to break word or not
   */
  static canBreakWords(t, e) {
    return e;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It allows one to determine whether a pair of characters
   * should be broken by newlines
   * For example certain characters in CJK langs or numbers.
   * It must return a boolean.
   * @param _char - The character
   * @param _nextChar - The next character
   * @param _token - The token/word the characters are from
   * @param _index - The index in the token of the char
   * @param _breakWords - The style attr break words
   * @returns whether to break word or not
   */
  static canBreakChars(t, e, i, s, n) {
    return !0;
  }
  /**
   * Overridable helper method used internally by TextMetrics, exposed to allow customizing the class's behavior.
   *
   * It is called when a token (usually a word) has to be split into separate pieces
   * in order to determine the point to break a word.
   * It must return an array of characters.
   * @param token - The token to split
   * @returns The characters of the token
   * @see CanvasTextMetrics.graphemeSegmenter
   */
  static wordWrapSplit(t) {
    return p.graphemeSegmenter(t);
  }
  /**
   * Calculates the ascent, descent and fontSize of a given font-style
   * @param font - String representing the style of the font
   * @returns Font properties object
   */
  static measureFont(t) {
    if (p._fonts[t])
      return p._fonts[t];
    const e = p._context;
    e.font = t;
    const i = e.measureText(p.METRICS_STRING + p.BASELINE_SYMBOL), s = i.actualBoundingBoxAscent ?? 0, n = i.actualBoundingBoxDescent ?? 0, o = {
      ascent: s,
      descent: n,
      fontSize: s + n
    };
    return p._fonts[t] = o, o;
  }
  /**
   * Clear font metrics in metrics cache.
   * @param {string} [font] - font name. If font name not set then clear cache for all fonts.
   */
  static clearMetrics(t = "") {
    t ? delete p._fonts[t] : p._fonts = {};
  }
  /**
   * Cached canvas element for measuring text
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _canvas() {
    if (!p.__canvas) {
      let t;
      try {
        const e = new OffscreenCanvas(0, 0), i = e.getContext("2d", _t);
        if (i != null && i.measureText)
          return p.__canvas = e, e;
        t = nt.get().createCanvas();
      } catch {
        t = nt.get().createCanvas();
      }
      t.width = t.height = 10, p.__canvas = t;
    }
    return p.__canvas;
  }
  /**
   * TODO: this should be private, but isn't because of backward compat, will fix later.
   * @ignore
   */
  static get _context() {
    return p.__context || (p.__context = p._canvas.getContext("2d", _t)), p.__context;
  }
};
$.METRICS_STRING = "|ÉqÅ";
$.BASELINE_SYMBOL = "M";
$.BASELINE_MULTIPLIER = 1.4;
$.HEIGHT_MULTIPLIER = 2;
$.graphemeSegmenter = (() => {
  if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
    const r = new Intl.Segmenter();
    return (t) => {
      const e = r.segment(t), i = [];
      let s = 0;
      for (const n of e)
        i[s++] = n.segment;
      return i;
    };
  }
  return (r) => [...r];
})();
$.experimentalLetterSpacing = !1;
$._fonts = {};
$._measurementCache = Ct(1e3);
let tt = $;
const se = [
  "serif",
  "sans-serif",
  "monospace",
  "cursive",
  "fantasy",
  "system-ui"
];
function ot(r) {
  const t = typeof r.fontSize == "number" ? `${r.fontSize}px` : r.fontSize;
  let e = r.fontFamily;
  Array.isArray(r.fontFamily) || (e = r.fontFamily.split(","));
  for (let i = e.length - 1; i >= 0; i--) {
    let s = e[i].trim();
    !/([\"\'])[^\'\"]+\1/.test(s) && !se.includes(s) && (s = `"${s}"`), e[i] = s;
  }
  return `${r.fontStyle} ${r.fontVariant} ${r.fontWeight} ${t} ${e.join(",")}`;
}
function yt(r, t, e, i = 0, s = 0, n = 0) {
  if (r.texture === Z.WHITE && !r.fill)
    return U.shared.setValue(r.color).setAlpha(r.alpha ?? 1).toHexa();
  if (r.fill) {
    if (r.fill instanceof at) {
      const o = r.fill, h = t.createPattern(o.texture.source.resource, "repeat"), a = o.transform.copyTo(ft.shared);
      return a.scale(
        o.texture.source.pixelWidth,
        o.texture.source.pixelHeight
      ), h.setTransform(a), h;
    } else if (r.fill instanceof et) {
      const o = r.fill, h = o.type === "linear";
      o.textureSpace;
      let a = 1, l = 1, c;
      if (h) {
        const { start: u, end: w } = o;
        c = t.createLinearGradient(
          u.x * a + s,
          u.y * l + n,
          w.x * a + s,
          w.y * l + n
        ), Math.abs(w.x - u.x) < Math.abs((w.y - u.y) * 0.1);
      } else {
        const { center: u, innerRadius: w, outerCenter: y, outerRadius: k } = o;
        c = t.createRadialGradient(
          u.x * a + s,
          u.y * l + n,
          w * a,
          y.x * a + s,
          y.y * l + n,
          k * a
        );
      }
      return o.colorStops.forEach((u) => {
        c.addColorStop(u.offset, U.shared.setValue(u.color).toHex());
      }), c;
    }
  } else {
    const o = t.createPattern(r.texture.source.resource, "repeat"), h = r.matrix.copyTo(ft.shared);
    return h.scale(r.texture.source.pixelWidth, r.texture.source.pixelHeight), o.setTransform(h), o;
  }
  return ht("FillStyle not recognised", r), "red";
}
const dt = class V extends Ft {
  constructor(t = {}) {
    super(), this.uid = Pt("textStyle"), this._tick = 0, this._cachedFontString = null, ne(t), t instanceof V && (t = t._toObject());
    const s = { ...V.defaultTextStyle, ...t };
    for (const n in s) {
      const o = n;
      this[o] = s[n];
    }
    this._tagStyles = t.tagStyles ?? void 0, this.update(), this._tick = 0;
  }
  /**
   * Alignment for multiline text, does not affect single line text.
   * @type {'left'|'center'|'right'|'justify'}
   */
  get align() {
    return this._align;
  }
  set align(t) {
    this._align !== t && (this._align = t, this.update());
  }
  /** Indicates if lines can be wrapped within words, it needs wordWrap to be set to true. */
  get breakWords() {
    return this._breakWords;
  }
  set breakWords(t) {
    this._breakWords !== t && (this._breakWords = t, this.update());
  }
  /** Set a drop shadow for the text. */
  get dropShadow() {
    return this._dropShadow;
  }
  set dropShadow(t) {
    this._dropShadow !== t && (t !== null && typeof t == "object" ? this._dropShadow = this._createProxy({ ...V.defaultDropShadow, ...t }) : this._dropShadow = t ? this._createProxy({ ...V.defaultDropShadow }) : null, this.update());
  }
  /** The font family, can be a single font name, or a list of names where the first is the preferred font. */
  get fontFamily() {
    return this._fontFamily;
  }
  set fontFamily(t) {
    this._fontFamily !== t && (this._fontFamily = t, this.update());
  }
  /** The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em') */
  get fontSize() {
    return this._fontSize;
  }
  set fontSize(t) {
    this._fontSize !== t && (typeof t == "string" ? this._fontSize = parseInt(t, 10) : this._fontSize = t, this.update());
  }
  /**
   * The font style.
   * @type {'normal'|'italic'|'oblique'}
   */
  get fontStyle() {
    return this._fontStyle;
  }
  set fontStyle(t) {
    this._fontStyle !== t && (this._fontStyle = t.toLowerCase(), this.update());
  }
  /**
   * The font variant.
   * @type {'normal'|'small-caps'}
   */
  get fontVariant() {
    return this._fontVariant;
  }
  set fontVariant(t) {
    this._fontVariant !== t && (this._fontVariant = t, this.update());
  }
  /**
   * The font weight.
   * @type {'normal'|'bold'|'bolder'|'lighter'|'100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'}
   */
  get fontWeight() {
    return this._fontWeight;
  }
  set fontWeight(t) {
    this._fontWeight !== t && (this._fontWeight = t, this.update());
  }
  /** The space between lines. */
  get leading() {
    return this._leading;
  }
  set leading(t) {
    this._leading !== t && (this._leading = t, this.update());
  }
  /** The amount of spacing between letters, default is 0. */
  get letterSpacing() {
    return this._letterSpacing;
  }
  set letterSpacing(t) {
    this._letterSpacing !== t && (this._letterSpacing = t, this.update());
  }
  /** The line height, a number that represents the vertical space that a letter uses. */
  get lineHeight() {
    return this._lineHeight;
  }
  set lineHeight(t) {
    this._lineHeight !== t && (this._lineHeight = t, this.update());
  }
  /**
   * Occasionally some fonts are cropped. Adding some padding will prevent this from happening
   * by adding padding to all sides of the text.
   * > [!NOTE] This will NOT affect the positioning or bounds of the text.
   */
  get padding() {
    return this._padding;
  }
  set padding(t) {
    this._padding !== t && (this._padding = t, this.update());
  }
  /**
   * An optional filter or array of filters to apply to the text, allowing for advanced visual effects.
   * These filters will be applied to the text as it is created, resulting in faster rendering for static text
   * compared to applying the filter directly to the text object (which would be applied at run time).
   * @default null
   */
  get filters() {
    return this._filters;
  }
  set filters(t) {
    this._filters !== t && (this._filters = Object.freeze(t), this.update());
  }
  /**
   * Trim transparent borders from the text texture.
   * > [!IMPORTANT] PERFORMANCE WARNING:
   * > This is a costly operation as it requires scanning pixel alpha values.
   * > Avoid using `trim: true` for dynamic text, as it could significantly impact performance.
   */
  get trim() {
    return this._trim;
  }
  set trim(t) {
    this._trim !== t && (this._trim = t, this.update());
  }
  /**
   * The baseline of the text that is rendered.
   * @type {'alphabetic'|'top'|'hanging'|'middle'|'ideographic'|'bottom'}
   */
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(t) {
    this._textBaseline !== t && (this._textBaseline = t, this.update());
  }
  /**
   * How newlines and spaces should be handled.
   * Default is 'pre' (preserve, preserve).
   *
   *  value       | New lines     |   Spaces
   *  ---         | ---           |   ---
   * 'normal'     | Collapse      |   Collapse
   * 'pre'        | Preserve      |   Preserve
   * 'pre-line'   | Preserve      |   Collapse
   * @type {'normal'|'pre'|'pre-line'}
   */
  get whiteSpace() {
    return this._whiteSpace;
  }
  set whiteSpace(t) {
    this._whiteSpace !== t && (this._whiteSpace = t, this.update());
  }
  /** Indicates if word wrap should be used. */
  get wordWrap() {
    return this._wordWrap;
  }
  set wordWrap(t) {
    this._wordWrap !== t && (this._wordWrap = t, this.update());
  }
  /** The width at which text will wrap, it needs wordWrap to be set to true. */
  get wordWrapWidth() {
    return this._wordWrapWidth;
  }
  set wordWrapWidth(t) {
    this._wordWrapWidth !== t && (this._wordWrapWidth = t, this.update());
  }
  /**
   * The fill style that will be used to color the text.
   * This can be:
   * - A color string like 'red', '#00FF00', or 'rgba(255,0,0,0.5)'
   * - A hex number like 0xff0000 for red
   * - A FillStyle object with properties like { color: 0xff0000, alpha: 0.5 }
   * - A FillGradient for gradient fills
   * - A FillPattern for pattern/texture fills
   *
   * When using a FillGradient, vertical gradients (angle of 90 degrees) are applied per line of text,
   * while gradients at any other angle are spread across the entire text body as a whole.
   * @example
   * // Vertical gradient applied per line
   * const verticalGradient = new FillGradient(0, 0, 0, 1)
   *     .addColorStop(0, 0xff0000)
   *     .addColorStop(1, 0x0000ff);
   *
   * const text = new Text({
   *     text: 'Line 1\nLine 2',
   *     style: { fill: verticalGradient }
   * });
   *
   * To manage the gradient in a global scope, set the textureSpace property of the FillGradient to 'global'.
   * @type {string|number|FillStyle|FillGradient|FillPattern}
   */
  get fill() {
    return this._originalFill;
  }
  set fill(t) {
    t !== this._originalFill && (this._originalFill = t, this._isFillStyle(t) && (this._originalFill = this._createProxy({ ...X.defaultFillStyle, ...t }, () => {
      this._fill = pt(
        { ...this._originalFill },
        X.defaultFillStyle
      );
    })), this._fill = pt(
      t === 0 ? "black" : t,
      X.defaultFillStyle
    ), this.update());
  }
  /** A fillstyle that will be used on the text stroke, e.g., 'blue', '#FCFF00'. */
  get stroke() {
    return this._originalStroke;
  }
  set stroke(t) {
    t !== this._originalStroke && (this._originalStroke = t, this._isFillStyle(t) && (this._originalStroke = this._createProxy({ ...X.defaultStrokeStyle, ...t }, () => {
      this._stroke = gt(
        { ...this._originalStroke },
        X.defaultStrokeStyle
      );
    })), this._stroke = gt(t, X.defaultStrokeStyle), this.update());
  }
  /**
   * Custom styles to apply to specific tags within the text.
   * Allows for rich text formatting using simple tag markup like `<red>text</red>`.
   *
   * Tags are only parsed when this property has entries. If `tagStyles` is undefined,
   * `<` characters in text are treated as literal.
   * @example
   * ```ts
   * const text = new Text({
   *     text: '<red>Red</red>, <blue>Blue</blue>',
   *     style: {
   *         fill: 'white',
   *         tagStyles: {
   *             red: { fill: 'red' },
   *             blue: { fill: 'blue' }
   *         }
   *     }
   * });
   * ```
   */
  get tagStyles() {
    return this._tagStyles;
  }
  set tagStyles(t) {
    this._tagStyles !== t && (this._tagStyles = t ?? void 0, this.update());
  }
  update() {
    this._tick++, this._cachedFontString = null, this.emit("update", this);
  }
  /** Resets all properties to the default values */
  reset() {
    const t = V.defaultTextStyle;
    for (const e in t)
      this[e] = t[e];
  }
  /**
   * Assigns partial style options to this TextStyle instance.
   * Uses public setters to ensure proper value transformation.
   * @param values - Partial style options to assign
   * @returns This TextStyle instance for chaining
   */
  assign(t) {
    for (const e in t) {
      const i = e;
      this[i] = t[e];
    }
    return this;
  }
  /**
   * Returns a unique key for this instance.
   * This key is used for caching.
   * @returns {string} Unique key for the instance
   */
  get styleKey() {
    return `${this.uid}-${this._tick}`;
  }
  /**
   * Returns the CSS font string for this style, cached for performance.
   * @internal
   * @returns CSS font string
   */
  get _fontString() {
    return this._cachedFontString === null && (this._cachedFontString = ot(this)), this._cachedFontString;
  }
  /**
   * Returns an object with the same values as this TextStyle instance.
   * @returns Object with the same values as this TextStyle instance
   * @example
   * ```ts
   * const style = new TextStyle({
   *     fontSize: 24,
   *     fill: 0xff0000,
   *     stroke: { color: 0x0000ff, width: 2 }
   * });
   * const object = style.toObject();
   * console.log(object);
   * // { fontSize: 24, fill: 0xff0000, stroke: { color: 0x0000ff, width: 2 } }
   * ```
   */
  _toObject() {
    return {
      align: this.align,
      breakWords: this.breakWords,
      dropShadow: this._dropShadow ? { ...this._dropShadow } : null,
      fill: this._fill ? { ...this._fill } : void 0,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      fontStyle: this.fontStyle,
      fontVariant: this.fontVariant,
      fontWeight: this.fontWeight,
      leading: this.leading,
      letterSpacing: this.letterSpacing,
      lineHeight: this.lineHeight,
      padding: this.padding,
      stroke: this._stroke ? { ...this._stroke } : void 0,
      textBaseline: this.textBaseline,
      trim: this.trim,
      whiteSpace: this.whiteSpace,
      wordWrap: this.wordWrap,
      wordWrapWidth: this.wordWrapWidth,
      filters: this._filters ? [...this._filters] : void 0,
      tagStyles: this._tagStyles ? { ...this._tagStyles } : void 0
    };
  }
  /**
   * Creates a new TextStyle object with the same values as this one.
   * @returns New cloned TextStyle object
   */
  clone() {
    return new V(this._toObject());
  }
  /**
   * Returns the final padding for the text style, taking into account any filters applied.
   * Used internally for correct measurements
   * @internal
   * @returns {number} The final padding for the text style.
   */
  _getFinalPadding() {
    let t = 0;
    if (this._filters)
      for (let e = 0; e < this._filters.length; e++)
        t += this._filters[e].padding;
    return Math.max(this._padding, t);
  }
  /**
   * Destroys this text style.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @example
   * // Destroy the text style and its textures
   * textStyle.destroy({ texture: true, textureSource: true });
   * textStyle.destroy(true);
   */
  destroy(t = !1) {
    var i, s, n, o;
    if (this.removeAllListeners(), typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
      const h = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      (i = this._fill) != null && i.texture && this._fill.texture.destroy(h), (s = this._originalFill) != null && s.texture && this._originalFill.texture.destroy(h), (n = this._stroke) != null && n.texture && this._stroke.texture.destroy(h), (o = this._originalStroke) != null && o.texture && this._originalStroke.texture.destroy(h);
    }
    this._fill = null, this._stroke = null, this.dropShadow = null, this._originalStroke = null, this._originalFill = null;
  }
  _createProxy(t, e) {
    return new Proxy(t, {
      set: (i, s, n) => (i[s] === n || (i[s] = n, e == null || e(s, n), this.update()), !0)
    });
  }
  _isFillStyle(t) {
    return (t ?? null) !== null && !(U.isColorLike(t) || t instanceof et || t instanceof at);
  }
};
dt.defaultDropShadow = {
  alpha: 1,
  angle: Math.PI / 6,
  blur: 0,
  color: "black",
  distance: 5
};
dt.defaultTextStyle = {
  align: "left",
  breakWords: !1,
  dropShadow: null,
  fill: "black",
  fontFamily: "Arial",
  fontSize: 26,
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  padding: 0,
  stroke: null,
  textBaseline: "alphabetic",
  trim: !1,
  whiteSpace: "pre",
  wordWrap: !1,
  wordWrapWidth: 100
};
let st = dt;
function ne(r) {
  const t = r;
  if (typeof t.dropShadow == "boolean" && t.dropShadow) {
    const e = st.defaultDropShadow;
    r.dropShadow = {
      alpha: t.dropShadowAlpha ?? e.alpha,
      angle: t.dropShadowAngle ?? e.angle,
      blur: t.dropShadowBlur ?? e.blur,
      color: t.dropShadowColor ?? e.color,
      distance: t.dropShadowDistance ?? e.distance
    };
  }
  if (t.strokeThickness !== void 0) {
    j(N, "strokeThickness is now a part of stroke");
    const e = t.stroke;
    let i = {};
    if (U.isColorLike(e))
      i.color = e;
    else if (e instanceof et || e instanceof at)
      i.fill = e;
    else if (Object.hasOwnProperty.call(e, "color") || Object.hasOwnProperty.call(e, "fill"))
      i = e;
    else
      throw new Error("Invalid stroke value.");
    r.stroke = {
      ...i,
      width: t.strokeThickness
    };
  }
  if (Array.isArray(t.fillGradientStops)) {
    if (j(N, "gradient fill is now a fill pattern: `new FillGradient(...)`"), !Array.isArray(t.fill) || t.fill.length === 0)
      throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");
    t.fill.length !== t.fillGradientStops.length && ht("The number of fill colors must match the number of fill gradient stops.");
    const e = new et({
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
      textureSpace: "local"
    }), i = t.fillGradientStops.slice(), s = t.fill.map((n) => U.shared.setValue(n).toNumber());
    i.forEach((n, o) => {
      e.addColorStop(n, s[o]);
    }), r.fill = {
      fill: e
    };
  }
}
class Lt extends Ft {
  constructor() {
    super(...arguments), this.chars = /* @__PURE__ */ Object.create(null), this.lineHeight = 0, this.fontFamily = "", this.fontMetrics = { fontSize: 0, ascent: 0, descent: 0 }, this.baseLineOffset = 0, this.distanceField = { type: "none", range: 0 }, this.pages = [], this.applyFillAsTint = !0, this.baseMeasurementFontSize = 100, this.baseRenderedFontSize = 100;
  }
  /**
   * The name of the font face.
   * @deprecated since 8.0.0 Use `fontFamily` instead.
   */
  get font() {
    return j(N, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."), this.fontFamily;
  }
  /**
   * The map of base page textures (i.e., sheets of glyphs).
   * @deprecated since 8.0.0 Use `pages` instead.
   */
  get pageTextures() {
    return j(N, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  /**
   * The size of the font face in pixels.
   * @deprecated since 8.0.0 Use `fontMetrics.fontSize` instead.
   */
  get size() {
    return j(N, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."), this.fontMetrics.fontSize;
  }
  /**
   * The kind of distance field for this font or "none".
   * @deprecated since 8.0.0 Use `distanceField.type` instead.
   */
  get distanceFieldRange() {
    return j(N, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."), this.distanceField.range;
  }
  /**
   * The range of the distance field in pixels.
   * @deprecated since 8.0.0 Use `distanceField.range` instead.
   */
  get distanceFieldType() {
    return j(N, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."), this.distanceField.type;
  }
  destroy(t = !1) {
    var e;
    this.emit("destroy", this), this.removeAllListeners();
    for (const i in this.chars)
      (e = this.chars[i].texture) == null || e.destroy();
    this.chars = null, t && (this.pages.forEach((i) => i.texture.destroy(!0)), this.pages = null);
  }
}
const Et = class vt extends Lt {
  /**
   * @param options - The options for the dynamic bitmap font.
   */
  constructor(t) {
    super(), this.resolution = 1, this.pages = [], this._padding = 0, this._measureCache = /* @__PURE__ */ Object.create(null), this._currentChars = [], this._currentX = 0, this._currentY = 0, this._currentMaxCharHeight = 0, this._currentPageIndex = -1, this._skipKerning = !1;
    const e = { ...vt.defaultOptions, ...t };
    this._textureSize = e.textureSize, this._mipmap = e.mipmap;
    const i = e.style.clone();
    e.overrideFill && (i._fill.color = 16777215, i._fill.alpha = 1, i._fill.texture = Z.WHITE, i._fill.fill = null), this.applyFillAsTint = e.overrideFill;
    const s = i.fontSize;
    i.fontSize = this.baseMeasurementFontSize;
    const n = ot(i);
    e.overrideSize ? (i._stroke && (i._stroke.width *= this.baseRenderedFontSize / s), i.dropShadow && (i.dropShadow.blur *= this.baseRenderedFontSize / s, i.dropShadow.distance *= this.baseRenderedFontSize / s)) : i.fontSize = this.baseRenderedFontSize = s, this._style = i, this._skipKerning = e.skipKerning ?? !1, this.resolution = e.resolution ?? 1, this._padding = e.padding ?? 4, e.textureStyle && (this._textureStyle = e.textureStyle instanceof St ? e.textureStyle : new St(e.textureStyle)), this.fontMetrics = tt.measureFont(n), this.lineHeight = i.lineHeight || this.fontMetrics.fontSize || i.fontSize;
  }
  ensureCharacters(t) {
    var C, m;
    const e = tt.graphemeSegmenter(t).filter((B) => !this._currentChars.includes(B)).filter((B, S, f) => f.indexOf(B) === S);
    if (!e.length) return;
    this._currentChars = [...this._currentChars, ...e];
    let i;
    this._currentPageIndex === -1 ? i = this._nextPage() : i = this.pages[this._currentPageIndex];
    let { canvas: s, context: n } = i.canvasAndContext, o = i.texture.source;
    const h = this._style;
    let a = this._currentX, l = this._currentY, c = this._currentMaxCharHeight;
    const u = this.baseRenderedFontSize / this.baseMeasurementFontSize, w = (((C = h.dropShadow) == null ? void 0 : C.distance) ?? 0) + (((m = h._stroke) == null ? void 0 : m.width) ?? 0), y = this._padding + w;
    let k = !1;
    const T = s.width / this.resolution, F = s.height / this.resolution;
    for (let B = 0; B < e.length; B++) {
      const S = e[B], f = tt.measureText(S, h, s, !1);
      f.lineHeight = f.height;
      const d = f.width * u, g = Math.ceil((h.fontStyle === "italic" ? 2 : 1) * d), _ = f.height * u, W = g + y * 2, M = _ + y * 2;
      if (k = !1, S !== `
` && S !== "\r" && S !== "	" && S !== " " && (k = !0, c = Math.ceil(Math.max(M, c))), a + W > T && (l += c, c = M, a = 0, l + c > F)) {
        o.update();
        const x = this._nextPage();
        s = x.canvasAndContext.canvas, n = x.canvasAndContext.context, o = x.texture.source, a = 0, l = 0, c = 0;
      }
      const I = n.measureText(S).width / u;
      if (this.chars[S] = {
        id: S.codePointAt(0),
        xOffset: -(y / u),
        yOffset: -(y / u),
        xAdvance: I,
        kerning: {}
      }, k) {
        this._drawGlyph(
          n,
          f,
          a + y,
          l + y,
          u,
          h
        );
        const x = o.width * u, z = o.height * u, b = new rt(
          a / x * o.width,
          l / z * o.height,
          W / x * o.width,
          M / z * o.height
        );
        this.chars[S].texture = new Z({
          source: o,
          frame: b
        }), a += Math.ceil(W);
      }
    }
    o.update(), this._currentX = a, this._currentY = l, this._currentMaxCharHeight = c, this._skipKerning || this._applyKerning(e, n, u);
  }
  /**
   * @deprecated since 8.0.0
   * The map of base page textures (i.e., sheets of glyphs).
   */
  get pageTextures() {
    return j(N, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."), this.pages;
  }
  _applyKerning(t, e, i) {
    const s = this._measureCache;
    for (let n = 0; n < t.length; n++) {
      const o = t[n];
      for (let h = 0; h < this._currentChars.length; h++) {
        const a = this._currentChars[h];
        let l = s[o];
        l || (l = s[o] = e.measureText(o).width);
        let c = s[a];
        c || (c = s[a] = e.measureText(a).width);
        let u = e.measureText(o + a).width, w = u - (l + c);
        w && this.chars[o] && (this.chars[o].kerning[a] = w / i), u = e.measureText(o + a).width, w = u - (l + c), w && this.chars[a] && (this.chars[a].kerning[o] = w / i);
      }
    }
  }
  _nextPage() {
    this._currentPageIndex++;
    const t = this.resolution, e = xt.getOptimalCanvasAndContext(
      this._textureSize,
      this._textureSize,
      t
    );
    this._setupContext(e.context, this._style, t);
    const i = t * (this.baseRenderedFontSize / this.baseMeasurementFontSize), s = new Z({
      source: new It({
        resource: e.canvas,
        resolution: i,
        alphaMode: "premultiply-alpha-on-upload",
        autoGenerateMipmaps: this._mipmap
      })
    });
    this._textureStyle && (s.source.style = this._textureStyle);
    const n = {
      canvasAndContext: e,
      texture: s
    };
    return this.pages[this._currentPageIndex] = n, n;
  }
  // canvas style!
  _setupContext(t, e, i) {
    e.fontSize = this.baseRenderedFontSize, t.scale(i, i), t.font = ot(e), e.fontSize = this.baseMeasurementFontSize, t.textBaseline = e.textBaseline;
    const s = e._stroke, n = (s == null ? void 0 : s.width) ?? 0;
    if (s && (t.lineWidth = n, t.lineJoin = s.join, t.miterLimit = s.miterLimit, t.strokeStyle = yt(s, t)), e._fill && (t.fillStyle = yt(e._fill, t)), e.dropShadow) {
      const o = e.dropShadow, h = U.shared.setValue(o.color).toArray(), a = o.blur * i, l = o.distance * i;
      t.shadowColor = `rgba(${h[0] * 255},${h[1] * 255},${h[2] * 255},${o.alpha})`, t.shadowBlur = a, t.shadowOffsetX = Math.cos(o.angle) * l, t.shadowOffsetY = Math.sin(o.angle) * l;
    } else
      t.shadowColor = "black", t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0;
  }
  _drawGlyph(t, e, i, s, n, o) {
    const h = e.text, a = e.fontProperties, l = o._stroke, c = ((l == null ? void 0 : l.width) ?? 0) * n, u = i + c / 2, w = s - c / 2, y = a.descent * n, k = e.lineHeight * n;
    let T = !1;
    o.stroke && c && (T = !0, t.strokeText(h, u, w + k - y));
    const { shadowBlur: F, shadowOffsetX: C, shadowOffsetY: m } = t;
    o._fill && (T && (t.shadowBlur = 0, t.shadowOffsetX = 0, t.shadowOffsetY = 0), t.fillText(h, u, w + k - y)), T && (t.shadowBlur = F, t.shadowOffsetX = C, t.shadowOffsetY = m);
  }
  destroy() {
    super.destroy();
    for (let t = 0; t < this.pages.length; t++) {
      const { canvasAndContext: e, texture: i } = this.pages[t];
      xt.returnCanvasAndContext(e), i.destroy(!0);
    }
    this.pages = null;
  }
};
Et.defaultOptions = {
  textureSize: 512,
  style: new st(),
  mipmap: !0
};
let Wt = Et;
function re(r, t, e, i) {
  var B, S;
  const s = {
    width: 0,
    height: 0,
    offsetY: 0,
    scale: t.fontSize / e.baseMeasurementFontSize,
    lines: [{
      width: 0,
      charPositions: [],
      spaceWidth: 0,
      spacesIndex: [],
      chars: []
    }]
  };
  s.offsetY = e.baseLineOffset;
  let n = s.lines[0], o = null, h = !0;
  const a = {
    width: 0,
    start: 0,
    index: 0,
    // use index to not modify the array as we use it a lot!
    positions: [],
    chars: []
  }, l = e.baseMeasurementFontSize / t.fontSize, c = t.letterSpacing * l, u = t.wordWrapWidth * l, w = t.lineHeight ? t.lineHeight * l : e.lineHeight, y = t.wordWrap && t.breakWords, k = lt(t.whiteSpace), T = ct(t.whiteSpace);
  if (k || T) {
    const f = [];
    let d = k;
    for (let g = 0; g < r.length; g++) {
      let _ = r[g];
      if (_ === "\r" || _ === `
`)
        if (T)
          _ === "\r" && r[g + 1] === `
` && g++, _ = " ";
        else {
          k && (d = !0), f.push(_);
          continue;
        }
      if (v(_))
        if (k && wt(_)) {
          if (d) continue;
          d = !0, f.push(" ");
        } else
          d = !1, f.push(_);
      else
        d = !1, f.push(_);
    }
    r = f;
  }
  const F = (f) => {
    const d = n.width;
    for (let g = 0; g < a.index; g++) {
      const _ = f.positions[g];
      n.chars.push(f.chars[g]), n.charPositions.push(_ + d);
    }
    n.width += f.width, (a.index > 0 || !k) && (h = !1), a.width = 0, a.index = 0, a.chars.length = 0;
  }, C = () => {
    let f = n.chars.length - 1;
    if (i) {
      let d = n.chars[f];
      for (; wt(d); )
        n.width -= e.chars[d].xAdvance, n.spacesIndex.pop(), d = n.chars[--f];
    }
    s.width = Math.max(s.width, n.width), n = {
      width: 0,
      charPositions: [],
      chars: [],
      spaceWidth: 0,
      spacesIndex: []
    }, h = !0, s.lines.push(n), s.height += w;
  }, m = (f) => f - c > u;
  for (let f = 0; f < r.length + 1; f++) {
    let d;
    const g = f === r.length;
    g || (d = r[f]);
    const _ = e.chars[d];
    if (/(?:\s)/.test(d) || d === "\r" || d === `
` || g) {
      if (!h && t.wordWrap && m(n.width + a.width) ? (C(), F(a), g || n.charPositions.push(0)) : (a.start = n.width, F(a), g || n.charPositions.push(0)), d === "\r" || d === `
`)
        C();
      else if (!g && _) {
        const x = _.xAdvance + (((B = _.kerning) == null ? void 0 : B[o]) || 0) + c;
        n.width += x, n.spaceWidth = x, n.spacesIndex.push(n.charPositions.length), n.chars.push(d);
      }
    } else if (_) {
      const I = ((S = _.kerning) == null ? void 0 : S[o]) || 0, x = _.xAdvance + I + c;
      y && m(a.width + x) && (h || C(), F(a), C()), a.positions[a.index++] = a.width + I, a.chars.push(d), a.width += x, bt(d) && (!h && t.wordWrap && m(n.width + a.width) && C(), F(a));
    }
    o = d;
  }
  return C(), t.wordWrap && t.align !== "left" && (s.width = Math.max(s.width, u)), t.align === "center" ? oe(s) : t.align === "right" ? ae(s) : t.align === "justify" && he(s), s;
}
function oe(r) {
  for (let t = 0; t < r.lines.length; t++) {
    const e = r.lines[t], i = r.width / 2 - e.width / 2;
    for (let s = 0; s < e.charPositions.length; s++)
      e.charPositions[s] += i;
  }
}
function ae(r) {
  for (let t = 0; t < r.lines.length; t++) {
    const e = r.lines[t], i = r.width - e.width;
    for (let s = 0; s < e.charPositions.length; s++)
      e.charPositions[s] += i;
  }
}
function he(r) {
  const t = r.width;
  for (let e = 0; e < r.lines.length - 2; e++) {
    const i = r.lines[e];
    let s = 0, n = i.spacesIndex[s++], o = 0;
    const h = i.spacesIndex.length, l = (t - i.width) / h;
    for (let c = 0; c < i.charPositions.length; c++)
      c === n && (n = i.spacesIndex[s++], o += l), i.charPositions[c] += o;
  }
}
function le(r) {
  if (r === "")
    return [];
  typeof r == "string" && (r = [r]);
  const t = [];
  for (let e = 0, i = r.length; e < i; e++) {
    const s = r[e];
    if (Array.isArray(s)) {
      if (s.length !== 2)
        throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${s.length}.`);
      if (s[0].length === 0 || s[1].length === 0)
        throw new Error("[BitmapFont]: Invalid character delimiter.");
      const n = s[0].charCodeAt(0), o = s[1].charCodeAt(0);
      if (o < n)
        throw new Error("[BitmapFont]: Invalid character range.");
      for (let h = n, a = o; h <= a; h++)
        t.push(String.fromCharCode(h));
    } else
      t.push(...Array.from(s));
  }
  if (t.length === 0)
    throw new Error("[BitmapFont]: Empty set when resolving characters.");
  return t;
}
let Q = 0;
class ce {
  constructor() {
    this.ALPHA = [["a", "z"], ["A", "Z"], " "], this.NUMERIC = [["0", "9"]], this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "], this.ASCII = [[" ", "~"]], this.defaultOptions = {
      chars: this.ALPHANUMERIC,
      resolution: 1,
      padding: 4,
      skipKerning: !1,
      textureStyle: null
    }, this.measureCache = Ct(1e3);
  }
  /**
   * Get a font for the specified text and style.
   * @param text - The text to get the font for
   * @param style - The style to use
   */
  getFont(t, e) {
    var o, h;
    let i = `${e.fontFamily}-bitmap`, s = !0;
    if (R.has(i)) {
      const a = R.get(i);
      return (o = a.ensureCharacters) == null || o.call(a, t), a;
    }
    if (e._fill.fill && !e._stroke ? (i += e._fill.fill.styleKey, s = !1) : (e._stroke || e.dropShadow) && (i = `${e.styleKey}-bitmap`, s = !1), i += `-${e.fontStyle}`, i += `-${e.fontVariant}`, i += `-${e.fontWeight}`, !R.has(i)) {
      const a = Object.create(e);
      a._lineHeight = 0;
      const l = new Wt({
        style: a,
        overrideFill: s,
        overrideSize: !0,
        ...this.defaultOptions
      });
      Q++, Q > 50 && ht("BitmapText", `You have dynamically created ${Q} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``), l.once("destroy", () => {
        Q--, R.remove(i);
      }), R.set(
        i,
        l
      );
    }
    const n = R.get(i);
    return (h = n.ensureCharacters) == null || h.call(n, t), n;
  }
  /**
   * Get the layout of a text for the specified style.
   * @param text - The text to get the layout for
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  getLayout(t, e, i = !0) {
    const s = this.getFont(t, e), n = `${t}-${e.styleKey}-${i}`;
    if (this.measureCache.has(n))
      return this.measureCache.get(n);
    const o = tt.graphemeSegmenter(t), h = re(o, e, s, i);
    return this.measureCache.set(n, h), h;
  }
  /**
   * Measure the text using the specified style.
   * @param text - The text to measure
   * @param style - The style to use
   * @param trimEnd - Whether to ignore whitespaces at the end of each line
   */
  measureText(t, e, i = !0) {
    return this.getLayout(t, e, i);
  }
  // eslint-disable-next-line max-len
  install(...t) {
    var l, c, u, w;
    let e = t[0];
    typeof e == "string" && (e = {
      name: e,
      style: t[1],
      chars: (l = t[2]) == null ? void 0 : l.chars,
      resolution: (c = t[2]) == null ? void 0 : c.resolution,
      padding: (u = t[2]) == null ? void 0 : u.padding,
      skipKerning: (w = t[2]) == null ? void 0 : w.skipKerning
    }, j(N, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
    const i = e == null ? void 0 : e.name;
    if (!i)
      throw new Error("[BitmapFontManager] Property `name` is required.");
    e = { ...this.defaultOptions, ...e };
    const s = e.style, n = s instanceof st ? s : new st(s), o = e.dynamicFill ?? this._canUseTintForStyle(n), h = new Wt({
      style: n,
      overrideFill: o,
      skipKerning: e.skipKerning,
      padding: e.padding,
      resolution: e.resolution,
      overrideSize: !1,
      textureStyle: e.textureStyle
    }), a = le(e.chars);
    return h.ensureCharacters(a.join("")), R.set(`${i}-bitmap`, h), h.once("destroy", () => R.remove(`${i}-bitmap`)), h;
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * @param {string} name - The name of the bitmap font to uninstall.
   */
  uninstall(t) {
    const e = `${t}-bitmap`, i = R.get(e);
    i && i.destroy();
  }
  /**
   * Determines if a style can use tinting instead of baking colors into the bitmap.
   * Tinting is more efficient as it allows reusing the same bitmap with different colors.
   * @param style - The text style to evaluate
   * @returns true if the style can use tinting, false if colors must be baked in
   * @private
   */
  _canUseTintForStyle(t) {
    return !t._stroke && (!t.dropShadow || t.dropShadow.color === 0) && !t._fill.fill && t._fill.color === 16777215;
  }
}
const kt = new ce();
class fe extends Lt {
  constructor(t, e) {
    super();
    const { textures: i, data: s } = t;
    Object.keys(s.pages).forEach((n) => {
      const o = s.pages[parseInt(n, 10)], h = i[o.id];
      this.pages.push({ texture: h });
    }), Object.keys(s.chars).forEach((n) => {
      const o = s.chars[n], {
        frame: h,
        source: a,
        rotate: l
      } = i[o.page], c = Ht.transformRectCoords(
        o,
        h,
        l,
        new rt()
      ), u = new Z({
        frame: c,
        orig: new rt(0, 0, o.width, o.height),
        source: a,
        rotate: l
      });
      this.chars[n] = {
        id: n.codePointAt(0),
        xOffset: o.xOffset,
        yOffset: o.yOffset,
        xAdvance: o.xAdvance,
        kerning: o.kerning ?? {},
        texture: u
      };
    }), this.baseRenderedFontSize = s.fontSize, this.baseMeasurementFontSize = s.fontSize, this.fontMetrics = {
      ascent: 0,
      descent: 0,
      fontSize: s.fontSize
    }, this.baseLineOffset = s.baseLineOffset, this.lineHeight = s.lineHeight, this.fontFamily = s.fontFamily, this.distanceField = s.distanceField ?? {
      type: "none",
      range: 0
    }, this.url = e;
  }
  /** Destroys the BitmapFont object. */
  destroy() {
    super.destroy();
    for (let t = 0; t < this.pages.length; t++) {
      const { texture: e } = this.pages[t];
      e.destroy(!0);
    }
    this.pages = null;
  }
  /**
   * Generates and installs a bitmap font with the specified options.
   * The font will be cached and available for use in BitmapText objects.
   * @param options - Setup options for font generation
   * @returns Installed font instance
   * @example
   * ```ts
   * // Install a basic font
   * BitmapFont.install({
   *     name: 'Title',
   *     style: {
   *         fontFamily: 'Arial',
   *         fontSize: 32,
   *         fill: '#ffffff'
   *     }
   * });
   *
   * // Install with advanced options
   * BitmapFont.install({
   *     name: 'Custom',
   *     style: {
   *         fontFamily: 'Arial',
   *         fontSize: 24,
   *         fill: '#00ff00',
   *         stroke: { color: '#000000', width: 2 }
   *     },
   *     chars: [['a', 'z'], ['A', 'Z'], ['0', '9']],
   *     resolution: 2,
   *     padding: 4,
   *     textureStyle: {
   *         scaleMode: 'nearest'
   *     }
   * });
   * ```
   */
  static install(t) {
    kt.install(t);
  }
  /**
   * Uninstalls a bitmap font from the cache.
   * This frees up memory and resources associated with the font.
   * @param name - The name of the bitmap font to uninstall
   * @example
   * ```ts
   * // Remove a font when it's no longer needed
   * BitmapFont.uninstall('MyCustomFont');
   *
   * // Clear multiple fonts
   * ['Title', 'Heading', 'Body'].forEach(BitmapFont.uninstall);
   * ```
   */
  static uninstall(t) {
    kt.uninstall(t);
  }
}
export {
  fe as BitmapFont
};
