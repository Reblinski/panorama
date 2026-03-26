import { L as A, U as Z, P as g, N as te, j as b, E as ie, w as y, r as w, O as V } from "./pixi-panorama-RrriKmcw.js";
import "./webworkerAll-_-rXNOUY.js";
class q {
  constructor(e) {
    this._lastTransform = "", this._observer = null, this._tickerAttached = !1, this.updateTranslation = () => {
      if (!this._canvas) return;
      const t = this._canvas.getBoundingClientRect(), i = this._canvas.width, s = this._canvas.height, n = t.width / i * this._renderer.resolution, o = t.height / s * this._renderer.resolution, r = t.left, h = t.top, d = `translate(${r}px, ${h}px) scale(${n}, ${o})`;
      d !== this._lastTransform && (this._domElement.style.transform = d, this._lastTransform = d);
    }, this._domElement = e.domElement, this._renderer = e.renderer, !(globalThis.OffscreenCanvas && this._renderer.canvas instanceof OffscreenCanvas) && (this._canvas = this._renderer.canvas, this._attachObserver());
  }
  /** The canvas element that this CanvasObserver is associated with. */
  get canvas() {
    return this._canvas;
  }
  /** Attaches the DOM element to the canvas parent if it is not already attached. */
  ensureAttached() {
    !this._domElement.parentNode && this._canvas.parentNode && (this._canvas.parentNode.appendChild(this._domElement), this.updateTranslation());
  }
  /** Sets up a ResizeObserver if available. This ensures that the DOM element is kept in sync with the canvas size . */
  _attachObserver() {
    "ResizeObserver" in globalThis ? (this._observer && (this._observer.disconnect(), this._observer = null), this._observer = new ResizeObserver((e) => {
      for (const t of e) {
        if (t.target !== this._canvas)
          continue;
        const i = this.canvas.width, s = this.canvas.height, n = t.contentRect.width / i * this._renderer.resolution, o = t.contentRect.height / s * this._renderer.resolution;
        (this._lastScaleX !== n || this._lastScaleY !== o) && (this.updateTranslation(), this._lastScaleX = n, this._lastScaleY = o);
      }
    }), this._observer.observe(this._canvas)) : this._tickerAttached || A.shared.add(this.updateTranslation, this, Z.HIGH);
  }
  /** Destroys the CanvasObserver instance, cleaning up observers and Ticker. */
  destroy() {
    this._observer ? (this._observer.disconnect(), this._observer = null) : this._tickerAttached && A.shared.remove(this.updateTranslation), this._domElement = null, this._renderer = null, this._canvas = null, this._tickerAttached = !1, this._lastTransform = "", this._lastScaleX = null, this._lastScaleY = null;
  }
}
class O {
  /**
   * @param manager - The event boundary which manages this event. Propagation can only occur
   *  within the boundary's jurisdiction.
   */
  constructor(e) {
    this.bubbles = !0, this.cancelBubble = !0, this.cancelable = !1, this.composed = !1, this.defaultPrevented = !1, this.eventPhase = O.prototype.NONE, this.propagationStopped = !1, this.propagationImmediatelyStopped = !1, this.layer = new g(), this.page = new g(), this.NONE = 0, this.CAPTURING_PHASE = 1, this.AT_TARGET = 2, this.BUBBLING_PHASE = 3, this.manager = e;
  }
  /** @readonly */
  get layerX() {
    return this.layer.x;
  }
  /** @readonly */
  get layerY() {
    return this.layer.y;
  }
  /** @readonly */
  get pageX() {
    return this.page.x;
  }
  /** @readonly */
  get pageY() {
    return this.page.y;
  }
  /**
   * Fallback for the deprecated `InteractionEvent.data`.
   * @deprecated since 7.0.0
   */
  get data() {
    return this;
  }
  /**
   * The propagation path for this event. Alias for {@link EventBoundary.propagationPath}.
   * @advanced
   */
  composedPath() {
    return this.manager && (!this.path || this.path[this.path.length - 1] !== this.target) && (this.path = this.target ? this.manager.propagationPath(this.target) : []), this.path;
  }
  /**
   * Unimplemented method included for implementing the DOM interface `Event`. It will throw an `Error`.
   * @deprecated
   * @ignore
   * @param _type
   * @param _bubbles
   * @param _cancelable
   */
  initEvent(e, t, i) {
    throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  /**
   * Unimplemented method included for implementing the DOM interface `UIEvent`. It will throw an `Error`.
   * @ignore
   * @deprecated
   * @param _typeArg
   * @param _bubblesArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   */
  initUIEvent(e, t, i, s, n) {
    throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.");
  }
  /**
   * Prevent default behavior of both PixiJS and the user agent.
   * @example
   * ```ts
   * sprite.on('click', (event) => {
   *     // Prevent both browser's default click behavior
   *     // and PixiJS's default handling
   *     event.preventDefault();
   *
   *     // Custom handling
   *     customClickHandler();
   * });
   * ```
   * @remarks
   * - Only works if the native event is cancelable
   * - Does not stop event propagation
   */
  preventDefault() {
    this.nativeEvent instanceof Event && this.nativeEvent.cancelable && this.nativeEvent.preventDefault(), this.defaultPrevented = !0;
  }
  /**
   * Stop this event from propagating to any additional listeners, including those
   * on the current target and any following targets in the propagation path.
   * @example
   * ```ts
   * container.on('pointerdown', (event) => {
   *     // Stop all further event handling
   *     event.stopImmediatePropagation();
   *
   *     // These handlers won't be called:
   *     // - Other pointerdown listeners on this container
   *     // - Any pointerdown listeners on parent containers
   * });
   * ```
   * @remarks
   * - Immediately stops all event propagation
   * - Prevents other listeners on same target from being called
   * - More aggressive than stopPropagation()
   */
  stopImmediatePropagation() {
    this.propagationImmediatelyStopped = !0;
  }
  /**
   * Stop this event from propagating to the next target in the propagation path.
   * The rest of the listeners on the current target will still be notified.
   * @example
   * ```ts
   * child.on('pointermove', (event) => {
   *     // Handle event on child
   *     updateChild();
   *
   *     // Prevent parent handlers from being called
   *     event.stopPropagation();
   * });
   *
   * // This won't be called if child handles the event
   * parent.on('pointermove', (event) => {
   *     updateParent();
   * });
   * ```
   * @remarks
   * - Stops event bubbling to parent containers
   * - Does not prevent other listeners on same target
   * - Less aggressive than stopImmediatePropagation()
   */
  stopPropagation() {
    this.propagationStopped = !0;
  }
}
var I = /iPhone/i, B = /iPod/i, C = /iPad/i, U = /\biOS-universal(?:.+)Mac\b/i, k = /\bAndroid(?:.+)Mobile\b/i, R = /Android/i, E = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i, M = /Silk/i, m = /Windows Phone/i, X = /\bWindows(?:.+)ARM\b/i, K = /BlackBerry/i, Y = /BB10/i, H = /Opera Mini/i, F = /\b(CriOS|Chrome)(?:.+)Mobile/i, N = /Mobile(?:.+)Firefox\b/i, $ = function(a) {
  return typeof a < "u" && a.platform === "MacIntel" && typeof a.maxTouchPoints == "number" && a.maxTouchPoints > 1 && typeof MSStream > "u";
};
function se(a) {
  return function(e) {
    return e.test(a);
  };
}
function j(a) {
  var e = {
    userAgent: "",
    platform: "",
    maxTouchPoints: 0
  };
  !a && typeof navigator < "u" ? e = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    maxTouchPoints: navigator.maxTouchPoints || 0
  } : typeof a == "string" ? e.userAgent = a : a && a.userAgent && (e = {
    userAgent: a.userAgent,
    platform: a.platform,
    maxTouchPoints: a.maxTouchPoints || 0
  });
  var t = e.userAgent, i = t.split("[FBAN");
  typeof i[1] < "u" && (t = i[0]), i = t.split("Twitter"), typeof i[1] < "u" && (t = i[0]);
  var s = se(t), n = {
    apple: {
      phone: s(I) && !s(m),
      ipod: s(B),
      tablet: !s(I) && (s(C) || $(e)) && !s(m),
      universal: s(U),
      device: (s(I) || s(B) || s(C) || s(U) || $(e)) && !s(m)
    },
    amazon: {
      phone: s(E),
      tablet: !s(E) && s(M),
      device: s(E) || s(M)
    },
    android: {
      phone: !s(m) && s(E) || !s(m) && s(k),
      tablet: !s(m) && !s(E) && !s(k) && (s(M) || s(R)),
      device: !s(m) && (s(E) || s(M) || s(k) || s(R)) || s(/\bokhttp\b/i)
    },
    windows: {
      phone: s(m),
      tablet: s(X),
      device: s(m) || s(X)
    },
    other: {
      blackberry: s(K),
      blackberry10: s(Y),
      opera: s(H),
      firefox: s(N),
      chrome: s(F),
      device: s(K) || s(Y) || s(H) || s(N) || s(F)
    },
    any: !1,
    phone: !1,
    tablet: !1
  };
  return n.any = n.apple.device || n.android.device || n.windows.device || n.other.device, n.phone = n.apple.phone || n.android.phone || n.windows.phone, n.tablet = n.apple.tablet || n.android.tablet || n.windows.tablet, n;
}
const ne = j.default ?? j, oe = ne(globalThis.navigator), re = 9, G = 100, ae = 0, le = 0, W = 2, z = 1, he = -1e3, ce = -1e3, de = 2, L = class J {
  // eslint-disable-next-line jsdoc/require-param
  /**
   * @param {WebGLRenderer|WebGPURenderer} renderer - A reference to the current renderer
   */
  constructor(e, t = oe) {
    this._mobileInfo = t, this.debug = !1, this._activateOnTab = !0, this._deactivateOnMouseMove = !0, this._isActive = !1, this._isMobileAccessibility = !1, this._div = null, this._pools = {}, this._renderId = 0, this._children = [], this._androidUpdateCount = 0, this._androidUpdateFrequency = 500, this._isRunningTests = !1, this._boundOnKeyDown = this._onKeyDown.bind(this), this._boundOnMouseMove = this._onMouseMove.bind(this), this._hookDiv = null, (t.tablet || t.phone) && this._createTouchHook(), this._renderer = e;
  }
  /**
   * Value of `true` if accessibility is currently active and accessibility layers are showing.
   * @type {boolean}
   * @readonly
   */
  get isActive() {
    return this._isActive;
  }
  /**
   * Value of `true` if accessibility is enabled for touch devices.
   * @type {boolean}
   * @readonly
   */
  get isMobileAccessibility() {
    return this._isMobileAccessibility;
  }
  /**
   * Button element for handling touch hooks.
   * @readonly
   */
  get hookDiv() {
    return this._hookDiv;
  }
  /**
   * The DOM element that will sit over the PixiJS element. This is where the div overlays will go.
   * @readonly
   */
  get div() {
    return this._div;
  }
  /**
   * Creates the touch hooks.
   * @private
   */
  _createTouchHook() {
    const e = document.createElement("button");
    e.style.width = `${z}px`, e.style.height = `${z}px`, e.style.position = "absolute", e.style.top = `${he}px`, e.style.left = `${ce}px`, e.style.zIndex = de.toString(), e.style.backgroundColor = "#FF0000", e.title = "select to enable accessibility for this content", e.addEventListener("focus", () => {
      this._isMobileAccessibility = !0, this._activate(), this._destroyTouchHook();
    }), document.body.appendChild(e), this._hookDiv = e;
  }
  /**
   * Destroys the touch hooks.
   * @private
   */
  _destroyTouchHook() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), this._hookDiv = null);
  }
  /**
   * Activating will cause the Accessibility layer to be shown.
   * This is called when a user presses the tab key.
   * @private
   */
  _activate() {
    if (this._isActive)
      return;
    this._isActive = !0, this._div || (this._div = document.createElement("div"), this._div.style.position = "absolute", this._div.style.top = `${ae}px`, this._div.style.left = `${le}px`, this._div.style.pointerEvents = "none", this._div.style.zIndex = W.toString(), this._canvasObserver = new q({
      domElement: this._div,
      renderer: this._renderer
    })), this._activateOnTab && globalThis.addEventListener("keydown", this._boundOnKeyDown, !1), this._deactivateOnMouseMove && globalThis.document.addEventListener("mousemove", this._boundOnMouseMove, !0);
    const e = this._renderer.view.canvas;
    if (e.parentNode)
      this._canvasObserver.ensureAttached(), this._initAccessibilitySetup();
    else {
      const t = new MutationObserver(() => {
        e.parentNode && (t.disconnect(), this._canvasObserver.ensureAttached(), this._initAccessibilitySetup());
      });
      t.observe(document.body, { childList: !0, subtree: !0 });
    }
  }
  // New method to handle initialization after div is ready
  _initAccessibilitySetup() {
    this._renderer.runners.postrender.add(this), this._renderer.lastObjectRendered && this._updateAccessibleObjects(this._renderer.lastObjectRendered);
  }
  /**
   * Deactivates the accessibility system. Removes listeners and accessibility elements.
   * @private
   */
  _deactivate() {
    var e, t;
    if (!(!this._isActive || this._isMobileAccessibility)) {
      this._isActive = !1, globalThis.document.removeEventListener("mousemove", this._boundOnMouseMove, !0), this._activateOnTab && globalThis.addEventListener("keydown", this._boundOnKeyDown, !1), this._renderer.runners.postrender.remove(this);
      for (const i of this._children)
        (e = i._accessibleDiv) != null && e.parentNode && (i._accessibleDiv.parentNode.removeChild(i._accessibleDiv), i._accessibleDiv = null), i._accessibleActive = !1;
      for (const i in this._pools)
        this._pools[i].forEach((n) => {
          n.parentNode && n.parentNode.removeChild(n);
        }), delete this._pools[i];
      (t = this._div) != null && t.parentNode && this._div.parentNode.removeChild(this._div), this._pools = {}, this._children = [];
    }
  }
  /**
   * This recursive function will run through the scene graph and add any new accessible objects to the DOM layer.
   * @private
   * @param {Container} container - The Container to check.
   */
  _updateAccessibleObjects(e) {
    if (!e.visible || !e.accessibleChildren)
      return;
    e.accessible && (e._accessibleActive || this._addChild(e), e._renderId = this._renderId);
    const t = e.children;
    if (t)
      for (let i = 0; i < t.length; i++)
        this._updateAccessibleObjects(t[i]);
  }
  /**
   * Runner init called, view is available at this point.
   * @ignore
   */
  init(e) {
    const i = {
      accessibilityOptions: {
        ...J.defaultOptions,
        ...(e == null ? void 0 : e.accessibilityOptions) || {}
      }
    };
    this.debug = i.accessibilityOptions.debug, this._activateOnTab = i.accessibilityOptions.activateOnTab, this._deactivateOnMouseMove = i.accessibilityOptions.deactivateOnMouseMove, i.accessibilityOptions.enabledByDefault && this._activate(), this._renderer.runners.postrender.remove(this);
  }
  /**
   * Updates the accessibility layer during rendering.
   * - Removes divs for containers no longer in the scene
   * - Updates the position and dimensions of the root div
   * - Updates positions of active accessibility divs
   * Only fires while the accessibility system is active.
   * @ignore
   */
  postrender() {
    const e = performance.now();
    if (this._mobileInfo.android.device && e < this._androidUpdateCount || (this._androidUpdateCount = e + this._androidUpdateFrequency, (!this._renderer.renderingToScreen || !this._renderer.view.canvas) && !this._isRunningTests))
      return;
    const t = /* @__PURE__ */ new Set();
    if (this._renderer.lastObjectRendered) {
      this._updateAccessibleObjects(this._renderer.lastObjectRendered);
      for (const i of this._children)
        i._renderId === this._renderId && t.add(this._children.indexOf(i));
    }
    for (let i = this._children.length - 1; i >= 0; i--) {
      const s = this._children[i];
      t.has(i) || (s._accessibleDiv && s._accessibleDiv.parentNode && (s._accessibleDiv.parentNode.removeChild(s._accessibleDiv), this._getPool(s.accessibleType).push(s._accessibleDiv), s._accessibleDiv = null), s._accessibleActive = !1, te(this._children, i, 1));
    }
    this._renderer.renderingToScreen && this._canvasObserver.ensureAttached();
    for (let i = 0; i < this._children.length; i++) {
      const s = this._children[i];
      if (!s._accessibleActive || !s._accessibleDiv)
        continue;
      const n = s._accessibleDiv, o = s.hitArea || s.getBounds().rectangle;
      if (s.hitArea) {
        const r = s.worldTransform;
        n.style.left = `${r.tx + o.x * r.a}px`, n.style.top = `${r.ty + o.y * r.d}px`, n.style.width = `${o.width * r.a}px`, n.style.height = `${o.height * r.d}px`;
      } else
        this._capHitArea(o), n.style.left = `${o.x}px`, n.style.top = `${o.y}px`, n.style.width = `${o.width}px`, n.style.height = `${o.height}px`;
    }
    this._renderId++;
  }
  /**
   * private function that will visually add the information to the
   * accessibility div
   * @param {HTMLElement} div -
   */
  _updateDebugHTML(e) {
    e.innerHTML = `type: ${e.type}</br> title : ${e.title}</br> tabIndex: ${e.tabIndex}`;
  }
  /**
   * Adjust the hit area based on the bounds of a display object
   * @param {Rectangle} hitArea - Bounds of the child
   */
  _capHitArea(e) {
    e.x < 0 && (e.width += e.x, e.x = 0), e.y < 0 && (e.height += e.y, e.y = 0);
    const { width: t, height: i } = this._renderer;
    e.x + e.width > t && (e.width = t - e.x), e.y + e.height > i && (e.height = i - e.y);
  }
  /**
   * Creates or reuses a div element for a Container and adds it to the accessibility layer.
   * Sets up ARIA attributes, event listeners, and positioning based on the container's properties.
   * @private
   * @param {Container} container - The child to make accessible.
   */
  _addChild(e) {
    let i = this._getPool(e.accessibleType).pop();
    i ? (i.innerHTML = "", i.removeAttribute("title"), i.removeAttribute("aria-label"), i.tabIndex = 0) : (e.accessibleType === "button" ? i = document.createElement("button") : (i = document.createElement(e.accessibleType), i.style.cssText = `
                        color: transparent;
                        pointer-events: none;
                        padding: 0;
                        margin: 0;
                        border: 0;
                        outline: 0;
                        background: transparent;
                        box-sizing: border-box;
                        user-select: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                    `, e.accessibleText && (i.innerText = e.accessibleText)), i.style.width = `${G}px`, i.style.height = `${G}px`, i.style.backgroundColor = this.debug ? "rgba(255,255,255,0.5)" : "transparent", i.style.position = "absolute", i.style.zIndex = W.toString(), i.style.borderStyle = "none", navigator.userAgent.toLowerCase().includes("chrome") ? i.setAttribute("aria-live", "off") : i.setAttribute("aria-live", "polite"), navigator.userAgent.match(/rv:.*Gecko\//) ? i.setAttribute("aria-relevant", "additions") : i.setAttribute("aria-relevant", "text"), i.addEventListener("click", this._onClick.bind(this)), i.addEventListener("focus", this._onFocus.bind(this)), i.addEventListener("focusout", this._onFocusOut.bind(this))), i.style.pointerEvents = e.accessiblePointerEvents, i.type = e.accessibleType, e.accessibleTitle && e.accessibleTitle !== null ? i.title = e.accessibleTitle : (!e.accessibleHint || e.accessibleHint === null) && (i.title = `container ${e.tabIndex}`), e.accessibleHint && e.accessibleHint !== null && i.setAttribute("aria-label", e.accessibleHint), e.interactive ? i.tabIndex = e.tabIndex : i.tabIndex = 0, this.debug && this._updateDebugHTML(i), e._accessibleActive = !0, e._accessibleDiv = i, i.container = e, this._children.push(e), this._div.appendChild(e._accessibleDiv);
  }
  /**
   * Dispatch events with the EventSystem.
   * @param e
   * @param type
   * @private
   */
  _dispatchEvent(e, t) {
    const { container: i } = e.target, s = this._renderer.events.rootBoundary, n = Object.assign(new O(s), { target: i });
    s.rootTarget = this._renderer.lastObjectRendered, t.forEach((o) => s.dispatchEvent(n, o));
  }
  /**
   * Maps the div button press to pixi's EventSystem (click)
   * @private
   * @param {MouseEvent} e - The click event.
   */
  _onClick(e) {
    this._dispatchEvent(e, ["click", "pointertap", "tap"]);
  }
  /**
   * Maps the div focus events to pixi's EventSystem (mouseover)
   * @private
   * @param {FocusEvent} e - The focus event.
   */
  _onFocus(e) {
    e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "assertive"), this._dispatchEvent(e, ["mouseover"]);
  }
  /**
   * Maps the div focus events to pixi's EventSystem (mouseout)
   * @private
   * @param {FocusEvent} e - The focusout event.
   */
  _onFocusOut(e) {
    e.target.getAttribute("aria-live") || e.target.setAttribute("aria-live", "polite"), this._dispatchEvent(e, ["mouseout"]);
  }
  /**
   * Is called when a key is pressed
   * @private
   * @param {KeyboardEvent} e - The keydown event.
   */
  _onKeyDown(e) {
    e.keyCode !== re || !this._activateOnTab || this._activate();
  }
  /**
   * Is called when the mouse moves across the renderer element
   * @private
   * @param {MouseEvent} e - The mouse event.
   */
  _onMouseMove(e) {
    e.movementX === 0 && e.movementY === 0 || this._deactivate();
  }
  /**
   * Destroys the accessibility system. Removes all elements and listeners.
   * > [!IMPORTANT] This is typically called automatically when the {@link Application} is destroyed.
   * > A typically user should not need to call this method directly.
   */
  destroy() {
    var e;
    this._deactivate(), this._destroyTouchHook(), (e = this._canvasObserver) == null || e.destroy(), this._canvasObserver = null, this._div = null, this._pools = null, this._children = null, this._renderer = null, this._hookDiv = null, globalThis.removeEventListener("keydown", this._boundOnKeyDown), this._boundOnKeyDown = null, globalThis.document.removeEventListener("mousemove", this._boundOnMouseMove, !0), this._boundOnMouseMove = null;
  }
  /**
   * Enables or disables the accessibility system.
   * @param enabled - Whether to enable or disable accessibility.
   * @example
   * ```js
   * app.renderer.accessibility.setAccessibilityEnabled(true); // Enable accessibility
   * app.renderer.accessibility.setAccessibilityEnabled(false); // Disable accessibility
   * ```
   */
  setAccessibilityEnabled(e) {
    e ? this._activate() : this._deactivate();
  }
  _getPool(e) {
    return this._pools[e] || (this._pools[e] = []), this._pools[e];
  }
};
L.extension = {
  type: [
    b.WebGLSystem,
    b.WebGPUSystem
  ],
  name: "accessibility"
};
L.defaultOptions = {
  /**
   * Whether to enable accessibility features on initialization
   * @default false
   */
  enabledByDefault: !1,
  /**
   * Whether to visually show the accessibility divs for debugging
   * @default false
   */
  debug: !1,
  /**
   * Whether to activate accessibility when tab key is pressed
   * @default true
   */
  activateOnTab: !0,
  /**
   * Whether to deactivate accessibility when mouse moves
   * @default true
   */
  deactivateOnMouseMove: !0
};
let ue = L;
const pe = {
  accessible: !1,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,
  accessibleType: "button",
  accessibleText: null,
  accessiblePointerEvents: "auto",
  accessibleChildren: !0,
  _accessibleActive: !1,
  _accessibleDiv: null,
  _renderId: -1
};
class Q {
  /**
   * Constructor for the DOMPipe class.
   * @param renderer - The renderer instance that this DOMPipe will be associated with.
   */
  constructor(e) {
    this._attachedDomElements = [], this._renderer = e, this._renderer.runners.postrender.add(this), this._renderer.runners.init.add(this), this._domElement = document.createElement("div"), this._domElement.style.position = "absolute", this._domElement.style.top = "0", this._domElement.style.left = "0", this._domElement.style.pointerEvents = "none", this._domElement.style.zIndex = "1000";
  }
  /** Initializes the DOMPipe, setting up the main DOM element and adding it to the document body. */
  init() {
    this._canvasObserver = new q({
      domElement: this._domElement,
      renderer: this._renderer
    });
  }
  /**
   * Adds a renderable DOM container to the list of attached elements.
   * @param domContainer - The DOM container to be added.
   * @param _instructionSet - The instruction set (unused).
   */
  addRenderable(e, t) {
    this._attachedDomElements.includes(e) || this._attachedDomElements.push(e);
  }
  /**
   * Updates a renderable DOM container.
   * @param _domContainer - The DOM container to be updated (unused).
   */
  updateRenderable(e) {
  }
  /**
   * Validates a renderable DOM container.
   * @param _domContainer - The DOM container to be validated (unused).
   * @returns Always returns true as validation is not required.
   */
  validateRenderable(e) {
    return !0;
  }
  /** Handles the post-rendering process, ensuring DOM elements are correctly positioned and visible. */
  postrender() {
    const e = this._attachedDomElements;
    if (e.length === 0) {
      this._domElement.remove();
      return;
    }
    this._canvasObserver.ensureAttached();
    for (let t = 0; t < e.length; t++) {
      const i = e[t], s = i.element;
      if (!i.parent || i.globalDisplayStatus < 7)
        s == null || s.remove(), e.splice(t, 1), t--;
      else {
        this._domElement.contains(s) || (s.style.position = "absolute", s.style.pointerEvents = "auto", this._domElement.appendChild(s));
        const n = i.worldTransform, o = i._anchor, r = i.width * o.x, h = i.height * o.y;
        s.style.transformOrigin = `${r}px ${h}px`, s.style.transform = `matrix(${n.a}, ${n.b}, ${n.c}, ${n.d}, ${n.tx - r}, ${n.ty - h})`, s.style.opacity = i.groupAlpha.toString();
      }
    }
  }
  /** Destroys the DOMPipe, removing all attached DOM elements and cleaning up resources. */
  destroy() {
    var e;
    this._renderer.runners.postrender.remove(this);
    for (let t = 0; t < this._attachedDomElements.length; t++)
      (e = this._attachedDomElements[t].element) == null || e.remove();
    this._attachedDomElements.length = 0, this._domElement.remove(), this._canvasObserver.destroy(), this._renderer = null;
  }
}
Q.extension = {
  type: [
    b.WebGLPipes,
    b.WebGPUPipes,
    b.CanvasPipes
  ],
  name: "dom"
};
class ve {
  constructor() {
    this.interactionFrequency = 10, this._deltaTime = 0, this._didMove = !1, this._tickerAdded = !1, this._pauseUpdate = !0;
  }
  /**
   * Initializes the event ticker.
   * @param events - The event system.
   */
  init(e) {
    this.removeTickerListener(), this.events = e, this.interactionFrequency = 10, this._deltaTime = 0, this._didMove = !1, this._tickerAdded = !1, this._pauseUpdate = !0;
  }
  /** Whether to pause the update checks or not. */
  get pauseUpdate() {
    return this._pauseUpdate;
  }
  set pauseUpdate(e) {
    this._pauseUpdate = e;
  }
  /** Adds the ticker listener. */
  addTickerListener() {
    this._tickerAdded || !this.domElement || (A.system.add(this._tickerUpdate, this, Z.INTERACTION), this._tickerAdded = !0);
  }
  /** Removes the ticker listener. */
  removeTickerListener() {
    this._tickerAdded && (A.system.remove(this._tickerUpdate, this), this._tickerAdded = !1);
  }
  /** Sets flag to not fire extra events when the user has already moved there mouse */
  pointerMoved() {
    this._didMove = !0;
  }
  /** Updates the state of interactive objects. */
  _update() {
    if (!this.domElement || this._pauseUpdate)
      return;
    if (this._didMove) {
      this._didMove = !1;
      return;
    }
    const e = this.events._rootPointerEvent;
    this.events.supportsTouchEvents && e.pointerType === "touch" || globalThis.document.dispatchEvent(this.events.supportsPointerEvents ? new PointerEvent("pointermove", {
      clientX: e.clientX,
      clientY: e.clientY,
      pointerType: e.pointerType,
      pointerId: e.pointerId
    }) : new MouseEvent("mousemove", {
      clientX: e.clientX,
      clientY: e.clientY
    }));
  }
  /**
   * Updates the state of interactive objects if at least {@link interactionFrequency}
   * milliseconds have passed since the last invocation.
   *
   * Invoked by a throttled ticker update from {@link Ticker.system}.
   * @param ticker - The throttled ticker.
   */
  _tickerUpdate(e) {
    this._deltaTime += e.deltaTime, !(this._deltaTime < this.interactionFrequency) && (this._deltaTime = 0, this._update());
  }
  /** Destroys the event ticker. */
  destroy() {
    this.removeTickerListener(), this.events = null, this.domElement = null, this._deltaTime = 0, this._didMove = !1, this._tickerAdded = !1, this._pauseUpdate = !0;
  }
}
const _ = new ve();
class D extends O {
  constructor() {
    super(...arguments), this.client = new g(), this.movement = new g(), this.offset = new g(), this.global = new g(), this.screen = new g();
  }
  /** @readonly */
  get clientX() {
    return this.client.x;
  }
  /** @readonly */
  get clientY() {
    return this.client.y;
  }
  /**
   * Alias for {@link FederatedMouseEvent.clientX this.clientX}.
   * @readonly
   */
  get x() {
    return this.clientX;
  }
  /**
   * Alias for {@link FederatedMouseEvent.clientY this.clientY}.
   * @readonly
   */
  get y() {
    return this.clientY;
  }
  /** @readonly */
  get movementX() {
    return this.movement.x;
  }
  /** @readonly */
  get movementY() {
    return this.movement.y;
  }
  /** @readonly */
  get offsetX() {
    return this.offset.x;
  }
  /** @readonly */
  get offsetY() {
    return this.offset.y;
  }
  /** @readonly */
  get globalX() {
    return this.global.x;
  }
  /** @readonly */
  get globalY() {
    return this.global.y;
  }
  /**
   * The pointer coordinates in the renderer's screen. Alias for `screen.x`.
   * @readonly
   */
  get screenX() {
    return this.screen.x;
  }
  /**
   * The pointer coordinates in the renderer's screen. Alias for `screen.y`.
   * @readonly
   */
  get screenY() {
    return this.screen.y;
  }
  /**
   * Converts global coordinates into container-local coordinates.
   *
   * This method transforms coordinates from world space to a container's local space,
   * useful for precise positioning and hit testing.
   * @param container - The Container to get local coordinates for
   * @param point - Optional Point object to store the result. If not provided, a new Point will be created
   * @param globalPos - Optional custom global coordinates. If not provided, the event's global position is used
   * @returns The local coordinates as a Point object
   * @example
   * ```ts
   * // Basic usage - get local coordinates relative to a container
   * sprite.on('pointermove', (event: FederatedMouseEvent) => {
   *     // Get position relative to the sprite
   *     const localPos = event.getLocalPosition(sprite);
   *     console.log('Local position:', localPos.x, localPos.y);
   * });
   * // Using custom global coordinates
   * const customGlobal = new Point(100, 100);
   * sprite.on('pointermove', (event: FederatedMouseEvent) => {
   *     // Transform custom coordinates
   *     const localPos = event.getLocalPosition(sprite, undefined, customGlobal);
   *     console.log('Custom local position:', localPos.x, localPos.y);
   * });
   * ```
   * @see {@link Container.worldTransform} For the transformation matrix
   * @see {@link Point} For the point class used to store coordinates
   */
  getLocalPosition(e, t, i) {
    return e.worldTransform.applyInverse(i || this.global, t);
  }
  /**
   * Whether the modifier key was pressed when this event natively occurred.
   * @param key - The modifier key.
   */
  getModifierState(e) {
    return "getModifierState" in this.nativeEvent && this.nativeEvent.getModifierState(e);
  }
  /**
   * Not supported.
   * @param _typeArg
   * @param _canBubbleArg
   * @param _cancelableArg
   * @param _viewArg
   * @param _detailArg
   * @param _screenXArg
   * @param _screenYArg
   * @param _clientXArg
   * @param _clientYArg
   * @param _ctrlKeyArg
   * @param _altKeyArg
   * @param _shiftKeyArg
   * @param _metaKeyArg
   * @param _buttonArg
   * @param _relatedTargetArg
   * @deprecated since 7.0.0
   * @ignore
   */
  // eslint-disable-next-line max-params
  initMouseEvent(e, t, i, s, n, o, r, h, d, p, u, l, v, c, Ee) {
    throw new Error("Method not implemented.");
  }
}
class f extends D {
  constructor() {
    super(...arguments), this.width = 0, this.height = 0, this.isPrimary = !1;
  }
  /**
   * Only included for completeness for now
   * @ignore
   */
  getCoalescedEvents() {
    return this.type === "pointermove" || this.type === "mousemove" || this.type === "touchmove" ? [this] : [];
  }
  /**
   * Only included for completeness for now
   * @ignore
   */
  getPredictedEvents() {
    throw new Error("getPredictedEvents is not supported!");
  }
}
class T extends D {
  constructor() {
    super(...arguments), this.DOM_DELTA_PIXEL = 0, this.DOM_DELTA_LINE = 1, this.DOM_DELTA_PAGE = 2;
  }
}
T.DOM_DELTA_PIXEL = 0;
T.DOM_DELTA_LINE = 1;
T.DOM_DELTA_PAGE = 2;
const fe = 2048, me = new g(), P = new g();
class _e {
  /**
   * @param rootTarget - The holder of the event boundary.
   */
  constructor(e) {
    this.dispatch = new ie(), this.moveOnAll = !1, this.enableGlobalMoveEvents = !0, this.mappingState = {
      trackingData: {}
    }, this.eventPool = /* @__PURE__ */ new Map(), this._allInteractiveElements = [], this._hitElements = [], this._isPointerMoveEvent = !1, this.rootTarget = e, this.hitPruneFn = this.hitPruneFn.bind(this), this.hitTestFn = this.hitTestFn.bind(this), this.mapPointerDown = this.mapPointerDown.bind(this), this.mapPointerMove = this.mapPointerMove.bind(this), this.mapPointerOut = this.mapPointerOut.bind(this), this.mapPointerOver = this.mapPointerOver.bind(this), this.mapPointerUp = this.mapPointerUp.bind(this), this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this), this.mapWheel = this.mapWheel.bind(this), this.mappingTable = {}, this.addEventMapping("pointerdown", this.mapPointerDown), this.addEventMapping("pointermove", this.mapPointerMove), this.addEventMapping("pointerout", this.mapPointerOut), this.addEventMapping("pointerleave", this.mapPointerOut), this.addEventMapping("pointerover", this.mapPointerOver), this.addEventMapping("pointerup", this.mapPointerUp), this.addEventMapping("pointerupoutside", this.mapPointerUpOutside), this.addEventMapping("wheel", this.mapWheel);
  }
  /**
   * Adds an event mapping for the event `type` handled by `fn`.
   *
   * Event mappings can be used to implement additional or custom events. They take an event
   * coming from the upstream scene (or directly from the {@link EventSystem}) and dispatch new downstream events
   * generally trickling down and bubbling up to {@link EventBoundary.rootTarget this.rootTarget}.
   *
   * To modify the semantics of existing events, the built-in mapping methods of EventBoundary should be overridden
   * instead.
   * @param type - The type of upstream event to map.
   * @param fn - The mapping method. The context of this function must be bound manually, if desired.
   */
  addEventMapping(e, t) {
    this.mappingTable[e] || (this.mappingTable[e] = []), this.mappingTable[e].push({
      fn: t,
      priority: 0
    }), this.mappingTable[e].sort((i, s) => i.priority - s.priority);
  }
  /**
   * Dispatches the given event
   * @param e - The event to dispatch.
   * @param type - The type of event to dispatch. Defaults to `e.type`.
   */
  dispatchEvent(e, t) {
    e.propagationStopped = !1, e.propagationImmediatelyStopped = !1, this.propagate(e, t), this.dispatch.emit(t || e.type, e);
  }
  /**
   * Maps the given upstream event through the event boundary and propagates it downstream.
   * @param e - The event to map.
   */
  mapEvent(e) {
    if (!this.rootTarget)
      return;
    const t = this.mappingTable[e.type];
    if (t)
      for (let i = 0, s = t.length; i < s; i++)
        t[i].fn(e);
    else
      y(`[EventBoundary]: Event mapping not defined for ${e.type}`);
  }
  /**
   * Finds the Container that is the target of a event at the given coordinates.
   *
   * The passed (x,y) coordinates are in the world space above this event boundary.
   * @param x - The x coordinate of the event.
   * @param y - The y coordinate of the event.
   */
  hitTest(e, t) {
    _.pauseUpdate = !0;
    const s = this._isPointerMoveEvent && this.enableGlobalMoveEvents ? "hitTestMoveRecursive" : "hitTestRecursive", n = this[s](
      this.rootTarget,
      this.rootTarget.eventMode,
      me.set(e, t),
      this.hitTestFn,
      this.hitPruneFn
    );
    return n && n[0];
  }
  /**
   * Propagate the passed event from from {@link EventBoundary.rootTarget this.rootTarget} to its
   * target `e.target`.
   * @param e - The event to propagate.
   * @param type - The type of event to propagate. Defaults to `e.type`.
   */
  propagate(e, t) {
    if (!e.target)
      return;
    const i = e.composedPath();
    e.eventPhase = e.CAPTURING_PHASE;
    for (let s = 0, n = i.length - 1; s < n; s++)
      if (e.currentTarget = i[s], this.notifyTarget(e, t), e.propagationStopped || e.propagationImmediatelyStopped) return;
    if (e.eventPhase = e.AT_TARGET, e.currentTarget = e.target, this.notifyTarget(e, t), !(e.propagationStopped || e.propagationImmediatelyStopped)) {
      e.eventPhase = e.BUBBLING_PHASE;
      for (let s = i.length - 2; s >= 0; s--)
        if (e.currentTarget = i[s], this.notifyTarget(e, t), e.propagationStopped || e.propagationImmediatelyStopped) return;
    }
  }
  /**
   * Emits the event `e` to all interactive containers. The event is propagated in the bubbling phase always.
   *
   * This is used in the `globalpointermove` event.
   * @param e - The emitted event.
   * @param type - The listeners to notify.
   * @param targets - The targets to notify.
   */
  all(e, t, i = this._allInteractiveElements) {
    if (i.length === 0) return;
    e.eventPhase = e.BUBBLING_PHASE;
    const s = Array.isArray(t) ? t : [t];
    for (let n = i.length - 1; n >= 0; n--)
      s.forEach((o) => {
        e.currentTarget = i[n], this.notifyTarget(e, o);
      });
  }
  /**
   * Finds the propagation path from {@link EventBoundary.rootTarget rootTarget} to the passed
   * `target`. The last element in the path is `target`.
   * @param target - The target to find the propagation path to.
   */
  propagationPath(e) {
    const t = [e];
    for (let i = 0; i < fe && e !== this.rootTarget && e.parent; i++) {
      if (!e.parent)
        throw new Error("Cannot find propagation path to disconnected target");
      t.push(e.parent), e = e.parent;
    }
    return t.reverse(), t;
  }
  hitTestMoveRecursive(e, t, i, s, n, o = !1) {
    let r = !1;
    if (this._interactivePrune(e)) return null;
    if ((e.eventMode === "dynamic" || t === "dynamic") && (_.pauseUpdate = !1), e.interactiveChildren && e.children) {
      const p = e.children;
      for (let u = p.length - 1; u >= 0; u--) {
        const l = p[u], v = this.hitTestMoveRecursive(
          l,
          this._isInteractive(t) ? t : l.eventMode,
          i,
          s,
          n,
          o || n(e, i)
        );
        if (v) {
          if (v.length > 0 && !v[v.length - 1].parent)
            continue;
          const c = e.isInteractive();
          (v.length > 0 || c) && (c && this._allInteractiveElements.push(e), v.push(e)), this._hitElements.length === 0 && (this._hitElements = v), r = !0;
        }
      }
    }
    const h = this._isInteractive(t), d = e.isInteractive();
    return d && d && this._allInteractiveElements.push(e), o || this._hitElements.length > 0 ? null : r ? this._hitElements : h && !n(e, i) && s(e, i) ? d ? [e] : [] : null;
  }
  /**
   * Recursive implementation for {@link EventBoundary.hitTest hitTest}.
   * @param currentTarget - The Container that is to be hit tested.
   * @param eventMode - The event mode for the `currentTarget` or one of its parents.
   * @param location - The location that is being tested for overlap.
   * @param testFn - Callback that determines whether the target passes hit testing. This callback
   *  can assume that `pruneFn` failed to prune the container.
   * @param pruneFn - Callback that determiness whether the target and all of its children
   *  cannot pass the hit test. It is used as a preliminary optimization to prune entire subtrees
   *  of the scene graph.
   * @returns An array holding the hit testing target and all its ancestors in order. The first element
   *  is the target itself and the last is {@link EventBoundary.rootTarget rootTarget}. This is the opposite
   *  order w.r.t. the propagation path. If no hit testing target is found, null is returned.
   */
  hitTestRecursive(e, t, i, s, n) {
    if (this._interactivePrune(e) || n(e, i))
      return null;
    if ((e.eventMode === "dynamic" || t === "dynamic") && (_.pauseUpdate = !1), e.interactiveChildren && e.children) {
      const h = e.children, d = i;
      for (let p = h.length - 1; p >= 0; p--) {
        const u = h[p], l = this.hitTestRecursive(
          u,
          this._isInteractive(t) ? t : u.eventMode,
          d,
          s,
          n
        );
        if (l) {
          if (l.length > 0 && !l[l.length - 1].parent)
            continue;
          const v = e.isInteractive();
          return (l.length > 0 || v) && l.push(e), l;
        }
      }
    }
    const o = this._isInteractive(t), r = e.isInteractive();
    return o && s(e, i) ? r ? [e] : [] : null;
  }
  _isInteractive(e) {
    return e === "static" || e === "dynamic";
  }
  _interactivePrune(e) {
    return !e || !e.visible || !e.renderable || !e.measurable || e.eventMode === "none" || e.eventMode === "passive" && !e.interactiveChildren;
  }
  /**
   * Checks whether the container or any of its children cannot pass the hit test at all.
   *
   * {@link EventBoundary}'s implementation uses the {@link Container.hitArea hitArea}
   * and {@link Container._maskEffect} for pruning.
   * @param container - The container to prune.
   * @param location - The location to test for overlap.
   */
  hitPruneFn(e, t) {
    if (e.hitArea && (e.worldTransform.applyInverse(t, P), !e.hitArea.contains(P.x, P.y)))
      return !0;
    if (e.effects && e.effects.length)
      for (let i = 0; i < e.effects.length; i++) {
        const s = e.effects[i];
        if (s.containsPoint && !s.containsPoint(t, this.hitTestFn))
          return !0;
      }
    return !1;
  }
  /**
   * Checks whether the container passes hit testing for the given location.
   * @param container - The container to test.
   * @param location - The location to test for overlap.
   * @returns - Whether `container` passes hit testing for `location`.
   */
  hitTestFn(e, t) {
    return e.hitArea ? !0 : e != null && e.containsPoint ? (e.worldTransform.applyInverse(t, P), e.containsPoint(P)) : !1;
  }
  /**
   * Notify all the listeners to the event's `currentTarget`.
   *
   * If the `currentTarget` contains the property `on<type>`, then it is called here,
   * simulating the behavior from version 6.x and prior.
   * @param e - The event passed to the target.
   * @param type - The type of event to notify. Defaults to `e.type`.
   */
  notifyTarget(e, t) {
    var n, o;
    if (!e.currentTarget.isInteractive())
      return;
    t ?? (t = e.type);
    const i = `on${t}`;
    (o = (n = e.currentTarget)[i]) == null || o.call(n, e);
    const s = e.eventPhase === e.CAPTURING_PHASE || e.eventPhase === e.AT_TARGET ? `${t}capture` : t;
    this._notifyListeners(e, s), e.eventPhase === e.AT_TARGET && this._notifyListeners(e, t);
  }
  /**
   * Maps the upstream `pointerdown` events to a downstream `pointerdown` event.
   *
   * `touchstart`, `rightdown`, `mousedown` events are also dispatched for specific pointer types.
   * @param from - The upstream `pointerdown` event.
   */
  mapPointerDown(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.createPointerEvent(e);
    if (this.dispatchEvent(t, "pointerdown"), t.pointerType === "touch")
      this.dispatchEvent(t, "touchstart");
    else if (t.pointerType === "mouse" || t.pointerType === "pen") {
      const s = t.button === 2;
      this.dispatchEvent(t, s ? "rightdown" : "mousedown");
    }
    const i = this.trackingData(e.pointerId);
    i.pressTargetsByButton[e.button] = t.composedPath(), this.freeEvent(t);
  }
  /**
   * Maps the upstream `pointermove` to downstream `pointerout`, `pointerover`, and `pointermove` events, in that order.
   *
   * The tracking data for the specific pointer has an updated `overTarget`. `mouseout`, `mouseover`,
   * `mousemove`, and `touchmove` events are fired as well for specific pointer types.
   * @param from - The upstream `pointermove` event.
   */
  mapPointerMove(e) {
    var h, d;
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    this._allInteractiveElements.length = 0, this._hitElements.length = 0, this._isPointerMoveEvent = !0;
    const t = this.createPointerEvent(e);
    this._isPointerMoveEvent = !1;
    const i = t.pointerType === "mouse" || t.pointerType === "pen", s = this.trackingData(e.pointerId), n = this.findMountedTarget(s.overTargets);
    if (((h = s.overTargets) == null ? void 0 : h.length) > 0 && n !== t.target) {
      const p = e.type === "mousemove" ? "mouseout" : "pointerout", u = this.createPointerEvent(e, p, n);
      if (this.dispatchEvent(u, "pointerout"), i && this.dispatchEvent(u, "mouseout"), !t.composedPath().includes(n)) {
        const l = this.createPointerEvent(e, "pointerleave", n);
        for (l.eventPhase = l.AT_TARGET; l.target && !t.composedPath().includes(l.target); )
          l.currentTarget = l.target, this.notifyTarget(l), i && this.notifyTarget(l, "mouseleave"), l.target = l.target.parent;
        this.freeEvent(l);
      }
      this.freeEvent(u);
    }
    if (n !== t.target) {
      const p = e.type === "mousemove" ? "mouseover" : "pointerover", u = this.clonePointerEvent(t, p);
      this.dispatchEvent(u, "pointerover"), i && this.dispatchEvent(u, "mouseover");
      let l = n == null ? void 0 : n.parent;
      for (; l && l !== this.rootTarget.parent && l !== t.target; )
        l = l.parent;
      if (!l || l === this.rootTarget.parent) {
        const c = this.clonePointerEvent(t, "pointerenter");
        for (c.eventPhase = c.AT_TARGET; c.target && c.target !== n && c.target !== this.rootTarget.parent; )
          c.currentTarget = c.target, this.notifyTarget(c), i && this.notifyTarget(c, "mouseenter"), c.target = c.target.parent;
        this.freeEvent(c);
      }
      this.freeEvent(u);
    }
    const o = [], r = this.enableGlobalMoveEvents ?? !0;
    this.moveOnAll ? o.push("pointermove") : this.dispatchEvent(t, "pointermove"), r && o.push("globalpointermove"), t.pointerType === "touch" && (this.moveOnAll ? o.splice(1, 0, "touchmove") : this.dispatchEvent(t, "touchmove"), r && o.push("globaltouchmove")), i && (this.moveOnAll ? o.splice(1, 0, "mousemove") : this.dispatchEvent(t, "mousemove"), r && o.push("globalmousemove"), this.cursor = (d = t.target) == null ? void 0 : d.cursor), o.length > 0 && this.all(t, o), this._allInteractiveElements.length = 0, this._hitElements.length = 0, s.overTargets = t.composedPath(), this.freeEvent(t);
  }
  /**
   * Maps the upstream `pointerover` to downstream `pointerover` and `pointerenter` events, in that order.
   *
   * The tracking data for the specific pointer gets a new `overTarget`.
   * @param from - The upstream `pointerover` event.
   */
  mapPointerOver(e) {
    var o;
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.trackingData(e.pointerId), i = this.createPointerEvent(e), s = i.pointerType === "mouse" || i.pointerType === "pen";
    this.dispatchEvent(i, "pointerover"), s && this.dispatchEvent(i, "mouseover"), i.pointerType === "mouse" && (this.cursor = (o = i.target) == null ? void 0 : o.cursor);
    const n = this.clonePointerEvent(i, "pointerenter");
    for (n.eventPhase = n.AT_TARGET; n.target && n.target !== this.rootTarget.parent; )
      n.currentTarget = n.target, this.notifyTarget(n), s && this.notifyTarget(n, "mouseenter"), n.target = n.target.parent;
    t.overTargets = i.composedPath(), this.freeEvent(i), this.freeEvent(n);
  }
  /**
   * Maps the upstream `pointerout` to downstream `pointerout`, `pointerleave` events, in that order.
   *
   * The tracking data for the specific pointer is cleared of a `overTarget`.
   * @param from - The upstream `pointerout` event.
   */
  mapPointerOut(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.trackingData(e.pointerId);
    if (t.overTargets) {
      const i = e.pointerType === "mouse" || e.pointerType === "pen", s = this.findMountedTarget(t.overTargets), n = this.createPointerEvent(e, "pointerout", s);
      this.dispatchEvent(n), i && this.dispatchEvent(n, "mouseout");
      const o = this.createPointerEvent(e, "pointerleave", s);
      for (o.eventPhase = o.AT_TARGET; o.target && o.target !== this.rootTarget.parent; )
        o.currentTarget = o.target, this.notifyTarget(o), i && this.notifyTarget(o, "mouseleave"), o.target = o.target.parent;
      t.overTargets = null, this.freeEvent(n), this.freeEvent(o);
    }
    this.cursor = null;
  }
  /**
   * Maps the upstream `pointerup` event to downstream `pointerup`, `pointerupoutside`,
   * and `click`/`rightclick`/`pointertap` events, in that order.
   *
   * The `pointerupoutside` event bubbles from the original `pointerdown` target to the most specific
   * ancestor of the `pointerdown` and `pointerup` targets, which is also the `click` event's target. `touchend`,
   * `rightup`, `mouseup`, `touchendoutside`, `rightupoutside`, `mouseupoutside`, and `tap` are fired as well for
   * specific pointer types.
   * @param from - The upstream `pointerup` event.
   */
  mapPointerUp(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = performance.now(), i = this.createPointerEvent(e);
    if (this.dispatchEvent(i, "pointerup"), i.pointerType === "touch")
      this.dispatchEvent(i, "touchend");
    else if (i.pointerType === "mouse" || i.pointerType === "pen") {
      const r = i.button === 2;
      this.dispatchEvent(i, r ? "rightup" : "mouseup");
    }
    const s = this.trackingData(e.pointerId), n = this.findMountedTarget(s.pressTargetsByButton[e.button]);
    let o = n;
    if (n && !i.composedPath().includes(n)) {
      let r = n;
      for (; r && !i.composedPath().includes(r); ) {
        if (i.currentTarget = r, this.notifyTarget(i, "pointerupoutside"), i.pointerType === "touch")
          this.notifyTarget(i, "touchendoutside");
        else if (i.pointerType === "mouse" || i.pointerType === "pen") {
          const h = i.button === 2;
          this.notifyTarget(i, h ? "rightupoutside" : "mouseupoutside");
        }
        r = r.parent;
      }
      delete s.pressTargetsByButton[e.button], o = r;
    }
    if (o) {
      const r = this.clonePointerEvent(i, "click");
      r.target = o, r.path = null, s.clicksByButton[e.button] || (s.clicksByButton[e.button] = {
        clickCount: 0,
        target: r.target,
        timeStamp: t
      });
      const h = s.clicksByButton[e.button];
      if (h.target === r.target && t - h.timeStamp < 200 ? ++h.clickCount : h.clickCount = 1, h.target = r.target, h.timeStamp = t, r.detail = h.clickCount, r.pointerType === "mouse") {
        const d = r.button === 2;
        this.dispatchEvent(r, d ? "rightclick" : "click");
      } else r.pointerType === "touch" && this.dispatchEvent(r, "tap");
      this.dispatchEvent(r, "pointertap"), this.freeEvent(r);
    }
    this.freeEvent(i);
  }
  /**
   * Maps the upstream `pointerupoutside` event to a downstream `pointerupoutside` event, bubbling from the original
   * `pointerdown` target to `rootTarget`.
   *
   * (The most specific ancestor of the `pointerdown` event and the `pointerup` event must the
   * `{@link EventBoundary}'s root because the `pointerup` event occurred outside of the boundary.)
   *
   * `touchendoutside`, `mouseupoutside`, and `rightupoutside` events are fired as well for specific pointer
   * types. The tracking data for the specific pointer is cleared of a `pressTarget`.
   * @param from - The upstream `pointerupoutside` event.
   */
  mapPointerUpOutside(e) {
    if (!(e instanceof f)) {
      y("EventBoundary cannot map a non-pointer event as a pointer event");
      return;
    }
    const t = this.trackingData(e.pointerId), i = this.findMountedTarget(t.pressTargetsByButton[e.button]), s = this.createPointerEvent(e);
    if (i) {
      let n = i;
      for (; n; )
        s.currentTarget = n, this.notifyTarget(s, "pointerupoutside"), s.pointerType === "touch" ? this.notifyTarget(s, "touchendoutside") : (s.pointerType === "mouse" || s.pointerType === "pen") && this.notifyTarget(s, s.button === 2 ? "rightupoutside" : "mouseupoutside"), n = n.parent;
      delete t.pressTargetsByButton[e.button];
    }
    this.freeEvent(s);
  }
  /**
   * Maps the upstream `wheel` event to a downstream `wheel` event.
   * @param from - The upstream `wheel` event.
   */
  mapWheel(e) {
    if (!(e instanceof T)) {
      y("EventBoundary cannot map a non-wheel event as a wheel event");
      return;
    }
    const t = this.createWheelEvent(e);
    this.dispatchEvent(t), this.freeEvent(t);
  }
  /**
   * Finds the most specific event-target in the given propagation path that is still mounted in the scene graph.
   *
   * This is used to find the correct `pointerup` and `pointerout` target in the case that the original `pointerdown`
   * or `pointerover` target was unmounted from the scene graph.
   * @param propagationPath - The propagation path was valid in the past.
   * @returns - The most specific event-target still mounted at the same location in the scene graph.
   */
  findMountedTarget(e) {
    if (!e)
      return null;
    let t = e[0];
    for (let i = 1; i < e.length && e[i].parent === t; i++)
      t = e[i];
    return t;
  }
  /**
   * Creates an event whose `originalEvent` is `from`, with an optional `type` and `target` override.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The `originalEvent` for the returned event.
   * @param [type=from.type] - The type of the returned event.
   * @param target - The target of the returned event.
   */
  createPointerEvent(e, t, i) {
    const s = this.allocateEvent(f);
    return this.copyPointerData(e, s), this.copyMouseData(e, s), this.copyData(e, s), s.nativeEvent = e.nativeEvent, s.originalEvent = e, s.target = i ?? this.hitTest(s.global.x, s.global.y) ?? this._hitElements[0], typeof t == "string" && (s.type = t), s;
  }
  /**
   * Creates a wheel event whose `originalEvent` is `from`.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The upstream wheel event.
   */
  createWheelEvent(e) {
    const t = this.allocateEvent(T);
    return this.copyWheelData(e, t), this.copyMouseData(e, t), this.copyData(e, t), t.nativeEvent = e.nativeEvent, t.originalEvent = e, t.target = this.hitTest(t.global.x, t.global.y), t;
  }
  /**
   * Clones the event `from`, with an optional `type` override.
   *
   * The event is allocated using {@link EventBoundary#allocateEvent this.allocateEvent}.
   * @param from - The event to clone.
   * @param [type=from.type] - The type of the returned event.
   */
  clonePointerEvent(e, t) {
    const i = this.allocateEvent(f);
    return i.nativeEvent = e.nativeEvent, i.originalEvent = e.originalEvent, this.copyPointerData(e, i), this.copyMouseData(e, i), this.copyData(e, i), i.target = e.target, i.path = e.composedPath().slice(), i.type = t ?? i.type, i;
  }
  /**
   * Copies wheel {@link FederatedWheelEvent} data from `from` into `to`.
   *
   * The following properties are copied:
   * + deltaMode
   * + deltaX
   * + deltaY
   * + deltaZ
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyWheelData(e, t) {
    t.deltaMode = e.deltaMode, t.deltaX = e.deltaX, t.deltaY = e.deltaY, t.deltaZ = e.deltaZ;
  }
  /**
   * Copies pointer {@link FederatedPointerEvent} data from `from` into `to`.
   *
   * The following properties are copied:
   * + pointerId
   * + width
   * + height
   * + isPrimary
   * + pointerType
   * + pressure
   * + tangentialPressure
   * + tiltX
   * + tiltY
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyPointerData(e, t) {
    e instanceof f && t instanceof f && (t.pointerId = e.pointerId, t.width = e.width, t.height = e.height, t.isPrimary = e.isPrimary, t.pointerType = e.pointerType, t.pressure = e.pressure, t.tangentialPressure = e.tangentialPressure, t.tiltX = e.tiltX, t.tiltY = e.tiltY, t.twist = e.twist);
  }
  /**
   * Copies mouse {@link FederatedMouseEvent} data from `from` to `to`.
   *
   * The following properties are copied:
   * + altKey
   * + button
   * + buttons
   * + clientX
   * + clientY
   * + metaKey
   * + movementX
   * + movementY
   * + pageX
   * + pageY
   * + x
   * + y
   * + screen
   * + shiftKey
   * + global
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyMouseData(e, t) {
    e instanceof D && t instanceof D && (t.altKey = e.altKey, t.button = e.button, t.buttons = e.buttons, t.client.copyFrom(e.client), t.ctrlKey = e.ctrlKey, t.metaKey = e.metaKey, t.movement.copyFrom(e.movement), t.screen.copyFrom(e.screen), t.shiftKey = e.shiftKey, t.global.copyFrom(e.global));
  }
  /**
   * Copies base {@link FederatedEvent} data from `from` into `to`.
   *
   * The following properties are copied:
   * + isTrusted
   * + srcElement
   * + timeStamp
   * + type
   * @param from - The event to copy data from.
   * @param to - The event to copy data into.
   */
  copyData(e, t) {
    t.isTrusted = e.isTrusted, t.srcElement = e.srcElement, t.timeStamp = performance.now(), t.type = e.type, t.detail = e.detail, t.view = e.view, t.which = e.which, t.layer.copyFrom(e.layer), t.page.copyFrom(e.page);
  }
  /**
   * @param id - The pointer ID.
   * @returns The tracking data stored for the given pointer. If no data exists, a blank
   *  state will be created.
   */
  trackingData(e) {
    return this.mappingState.trackingData[e] || (this.mappingState.trackingData[e] = {
      pressTargetsByButton: {},
      clicksByButton: {},
      overTarget: null
    }), this.mappingState.trackingData[e];
  }
  /**
   * Allocate a specific type of event from {@link EventBoundary#eventPool this.eventPool}.
   *
   * This allocation is constructor-agnostic, as long as it only takes one argument - this event
   * boundary.
   * @param constructor - The event's constructor.
   * @returns An event of the given type.
   */
  allocateEvent(e) {
    this.eventPool.has(e) || this.eventPool.set(e, []);
    const t = this.eventPool.get(e).pop() || new e(this);
    return t.eventPhase = t.NONE, t.currentTarget = null, t.defaultPrevented = !1, t.path = null, t.target = null, t;
  }
  /**
   * Frees the event and puts it back into the event pool.
   *
   * It is illegal to reuse the event until it is allocated again, using `this.allocateEvent`.
   *
   * It is also advised that events not allocated from {@link EventBoundary#allocateEvent this.allocateEvent}
   * not be freed. This is because of the possibility that the same event is freed twice, which can cause
   * it to be allocated twice & result in overwriting.
   * @param event - The event to be freed.
   * @throws Error if the event is managed by another event boundary.
   */
  freeEvent(e) {
    if (e.manager !== this) throw new Error("It is illegal to free an event not managed by this EventBoundary!");
    const t = e.constructor;
    this.eventPool.has(t) || this.eventPool.set(t, []), this.eventPool.get(t).push(e);
  }
  /**
   * Similar to {@link EventEmitter.emit}, except it stops if the `propagationImmediatelyStopped` flag
   * is set on the event.
   * @param e - The event to call each listener with.
   * @param type - The event key.
   */
  _notifyListeners(e, t) {
    const i = e.currentTarget._events[t];
    if (i)
      if ("fn" in i)
        i.once && e.currentTarget.removeListener(t, i.fn, void 0, !0), i.fn.call(i.context, e);
      else
        for (let s = 0, n = i.length; s < n && !e.propagationImmediatelyStopped; s++)
          i[s].once && e.currentTarget.removeListener(t, i[s].fn, void 0, !0), i[s].fn.call(i[s].context, e);
  }
}
const ge = 1, ye = {
  touchstart: "pointerdown",
  touchend: "pointerup",
  touchendoutside: "pointerupoutside",
  touchmove: "pointermove",
  touchcancel: "pointercancel"
}, S = class x {
  /**
   * @param {Renderer} renderer
   */
  constructor(e) {
    this.supportsTouchEvents = "ontouchstart" in globalThis, this.supportsPointerEvents = !!globalThis.PointerEvent, this.domElement = null, this.resolution = 1, this.renderer = e, this.rootBoundary = new _e(null), _.init(this), this.autoPreventDefault = !0, this._eventsAdded = !1, this._rootPointerEvent = new f(null), this._rootWheelEvent = new T(null), this.cursorStyles = {
      default: "inherit",
      pointer: "pointer"
    }, this.features = new Proxy({ ...x.defaultEventFeatures }, {
      set: (t, i, s) => (i === "globalMove" && (this.rootBoundary.enableGlobalMoveEvents = s), t[i] = s, !0)
    }), this._onPointerDown = this._onPointerDown.bind(this), this._onPointerMove = this._onPointerMove.bind(this), this._onPointerUp = this._onPointerUp.bind(this), this._onPointerOverOut = this._onPointerOverOut.bind(this), this.onWheel = this.onWheel.bind(this);
  }
  /**
   * The default interaction mode for all display objects.
   * @see Container.eventMode
   * @type {EventMode}
   * @readonly
   * @since 7.2.0
   */
  static get defaultEventMode() {
    return this._defaultEventMode;
  }
  /**
   * Runner init called, view is available at this point.
   * @ignore
   */
  init(e) {
    const { canvas: t, resolution: i } = this.renderer;
    this.setTargetElement(t), this.resolution = i, x._defaultEventMode = e.eventMode ?? "passive", Object.assign(this.features, e.eventFeatures ?? {}), this.rootBoundary.enableGlobalMoveEvents = this.features.globalMove;
  }
  /**
   * Handle changing resolution.
   * @ignore
   */
  resolutionChange(e) {
    this.resolution = e;
  }
  /** Destroys all event listeners and detaches the renderer. */
  destroy() {
    _.destroy(), this.setTargetElement(null), this.renderer = null, this._currentCursor = null;
  }
  /**
   * Sets the current cursor mode, handling any callbacks or CSS style changes.
   * The cursor can be a CSS cursor string, a custom callback function, or a key from the cursorStyles dictionary.
   * @param mode - Cursor mode to set. Can be:
   * - A CSS cursor string (e.g., 'pointer', 'grab')
   * - A key from the cursorStyles dictionary
   * - null/undefined to reset to default
   * @example
   * ```ts
   * // Using predefined cursor styles
   * app.renderer.events.setCursor('pointer');    // Set standard pointer cursor
   * app.renderer.events.setCursor('grab');       // Set grab cursor
   * app.renderer.events.setCursor(null);         // Reset to default
   *
   * // Using custom cursor styles
   * app.renderer.events.cursorStyles.custom = 'url("cursor.png"), auto';
   * app.renderer.events.setCursor('custom');     // Apply custom cursor
   *
   * // Using callback-based cursor
   * app.renderer.events.cursorStyles.dynamic = (mode) => {
   *     document.body.style.cursor = mode === 'hover' ? 'pointer' : 'default';
   * };
   * app.renderer.events.setCursor('dynamic');    // Trigger cursor callback
   * ```
   * @remarks
   * - Has no effect on OffscreenCanvas except for callback-based cursors
   * - Caches current cursor to avoid unnecessary DOM updates
   * - Supports CSS cursor values, style objects, and callback functions
   * @see {@link EventSystem.cursorStyles} For defining custom cursor styles
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor} MDN Cursor Reference
   */
  setCursor(e) {
    e || (e = "default");
    let t = !0;
    if (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas && (t = !1), this._currentCursor === e)
      return;
    this._currentCursor = e;
    const i = this.cursorStyles[e];
    if (i)
      switch (typeof i) {
        case "string":
          t && (this.domElement.style.cursor = i);
          break;
        case "function":
          i(e);
          break;
        case "object":
          t && Object.assign(this.domElement.style, i);
          break;
      }
    else t && typeof e == "string" && !Object.prototype.hasOwnProperty.call(this.cursorStyles, e) && (this.domElement.style.cursor = e);
  }
  /**
   * The global pointer event instance containing the most recent pointer state.
   * This is useful for accessing pointer information without listening to events.
   * @example
   * ```ts
   * // Access current pointer position at any time
   * const eventSystem = app.renderer.events;
   * const pointer = eventSystem.pointer;
   *
   * // Get global coordinates
   * console.log('Position:', pointer.global.x, pointer.global.y);
   *
   * // Check button state
   * console.log('Buttons pressed:', pointer.buttons);
   *
   * // Get pointer type and pressure
   * console.log('Type:', pointer.pointerType);
   * console.log('Pressure:', pointer.pressure);
   * ```
   * @readonly
   * @since 7.2.0
   * @see {@link FederatedPointerEvent} For all available pointer properties
   */
  get pointer() {
    return this._rootPointerEvent;
  }
  /**
   * Event handler for pointer down events on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  _onPointerDown(e) {
    if (!this.features.click) return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const t = this._normalizeToPointerData(e);
    this.autoPreventDefault && t[0].isNormalized && (e.cancelable || !("cancelable" in e)) && e.preventDefault();
    for (let i = 0, s = t.length; i < s; i++) {
      const n = t[i], o = this._bootstrapEvent(this._rootPointerEvent, n);
      this.rootBoundary.mapEvent(o);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer move events on on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch events.
   */
  _onPointerMove(e) {
    if (!this.features.move) return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, _.pointerMoved();
    const t = this._normalizeToPointerData(e);
    for (let i = 0, s = t.length; i < s; i++) {
      const n = this._bootstrapEvent(this._rootPointerEvent, t[i]);
      this.rootBoundary.mapEvent(n);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer up events on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  _onPointerUp(e) {
    if (!this.features.click) return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    let t = e.target;
    e.composedPath && e.composedPath().length > 0 && (t = e.composedPath()[0]);
    const i = t !== this.domElement ? "outside" : "", s = this._normalizeToPointerData(e);
    for (let n = 0, o = s.length; n < o; n++) {
      const r = this._bootstrapEvent(this._rootPointerEvent, s[n]);
      r.type += i, this.rootBoundary.mapEvent(r);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Event handler for pointer over & out events on {@link EventSystem#domElement this.domElement}.
   * @param nativeEvent - The native mouse/pointer/touch event.
   */
  _onPointerOverOut(e) {
    if (!this.features.click) return;
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered;
    const t = this._normalizeToPointerData(e);
    for (let i = 0, s = t.length; i < s; i++) {
      const n = this._bootstrapEvent(this._rootPointerEvent, t[i]);
      this.rootBoundary.mapEvent(n);
    }
    this.setCursor(this.rootBoundary.cursor);
  }
  /**
   * Passive handler for `wheel` events on {@link EventSystem.domElement this.domElement}.
   * @param nativeEvent - The native wheel event.
   */
  onWheel(e) {
    if (!this.features.wheel) return;
    const t = this.normalizeWheelEvent(e);
    this.rootBoundary.rootTarget = this.renderer.lastObjectRendered, this.rootBoundary.mapEvent(t);
  }
  /**
   * Sets the {@link EventSystem#domElement domElement} and binds event listeners.
   * This method manages the DOM event bindings for the event system, allowing you to
   * change or remove the target element that receives input events.
   * > [!IMPORTANT] This will default to the canvas element of the renderer, so you
   * > should not need to call this unless you are using a custom element.
   * @param element - The new DOM element to bind events to, or null to remove all event bindings
   * @example
   * ```ts
   * // Set a new canvas element as the target
   * const canvas = document.createElement('canvas');
   * app.renderer.events.setTargetElement(canvas);
   *
   * // Remove all event bindings
   * app.renderer.events.setTargetElement(null);
   *
   * // Switch to a different canvas
   * const newCanvas = document.querySelector('#game-canvas');
   * app.renderer.events.setTargetElement(newCanvas);
   * ```
   * @remarks
   * - Automatically removes event listeners from previous element
   * - Required for the event system to function
   * - Safe to call multiple times
   * @see {@link EventSystem#domElement} The current DOM element
   * @see {@link EventsTicker} For the ticker system that tracks pointer movement
   */
  setTargetElement(e) {
    this._removeEvents(), this.domElement = e, _.domElement = e, this._addEvents();
  }
  /** Register event listeners on {@link Renderer#domElement this.domElement}. */
  _addEvents() {
    if (this._eventsAdded || !this.domElement)
      return;
    _.addTickerListener();
    const e = this.domElement.style;
    e && (globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "none", e.msTouchAction = "none") : this.supportsPointerEvents && (e.touchAction = "none")), this.supportsPointerEvents ? (globalThis.document.addEventListener("pointermove", this._onPointerMove, !0), this.domElement.addEventListener("pointerdown", this._onPointerDown, !0), this.domElement.addEventListener("pointerleave", this._onPointerOverOut, !0), this.domElement.addEventListener("pointerover", this._onPointerOverOut, !0), globalThis.addEventListener("pointerup", this._onPointerUp, !0)) : (globalThis.document.addEventListener("mousemove", this._onPointerMove, !0), this.domElement.addEventListener("mousedown", this._onPointerDown, !0), this.domElement.addEventListener("mouseout", this._onPointerOverOut, !0), this.domElement.addEventListener("mouseover", this._onPointerOverOut, !0), globalThis.addEventListener("mouseup", this._onPointerUp, !0), this.supportsTouchEvents && (this.domElement.addEventListener("touchstart", this._onPointerDown, !0), this.domElement.addEventListener("touchend", this._onPointerUp, !0), this.domElement.addEventListener("touchmove", this._onPointerMove, !0))), this.domElement.addEventListener("wheel", this.onWheel, {
      passive: !0,
      capture: !0
    }), this._eventsAdded = !0;
  }
  /** Unregister event listeners on {@link EventSystem#domElement this.domElement}. */
  _removeEvents() {
    if (!this._eventsAdded || !this.domElement)
      return;
    _.removeTickerListener();
    const e = this.domElement.style;
    e && (globalThis.navigator.msPointerEnabled ? (e.msContentZooming = "", e.msTouchAction = "") : this.supportsPointerEvents && (e.touchAction = "")), this.supportsPointerEvents ? (globalThis.document.removeEventListener("pointermove", this._onPointerMove, !0), this.domElement.removeEventListener("pointerdown", this._onPointerDown, !0), this.domElement.removeEventListener("pointerleave", this._onPointerOverOut, !0), this.domElement.removeEventListener("pointerover", this._onPointerOverOut, !0), globalThis.removeEventListener("pointerup", this._onPointerUp, !0)) : (globalThis.document.removeEventListener("mousemove", this._onPointerMove, !0), this.domElement.removeEventListener("mousedown", this._onPointerDown, !0), this.domElement.removeEventListener("mouseout", this._onPointerOverOut, !0), this.domElement.removeEventListener("mouseover", this._onPointerOverOut, !0), globalThis.removeEventListener("mouseup", this._onPointerUp, !0), this.supportsTouchEvents && (this.domElement.removeEventListener("touchstart", this._onPointerDown, !0), this.domElement.removeEventListener("touchend", this._onPointerUp, !0), this.domElement.removeEventListener("touchmove", this._onPointerMove, !0))), this.domElement.removeEventListener("wheel", this.onWheel, !0), this.domElement = null, this._eventsAdded = !1;
  }
  /**
   * Maps coordinates from DOM/screen space into PixiJS normalized coordinates.
   * This takes into account the current scale, position, and resolution of the DOM element.
   * @param point - The point to store the mapped coordinates in
   * @param x - The x coordinate in DOM/client space
   * @param y - The y coordinate in DOM/client space
   * @example
   * ```ts
   * // Map mouse coordinates to PixiJS space
   * const point = new Point();
   * app.renderer.events.mapPositionToPoint(
   *     point,
   *     event.clientX,
   *     event.clientY
   * );
   * console.log('Mapped position:', point.x, point.y);
   *
   * // Using with pointer events
   * sprite.on('pointermove', (event) => {
   *     // event.global already contains mapped coordinates
   *     console.log('Global:', event.global.x, event.global.y);
   *
   *     // Map to local coordinates
   *     const local = event.getLocalPosition(sprite);
   *     console.log('Local:', local.x, local.y);
   * });
   * ```
   * @remarks
   * - Accounts for element scaling and positioning
   * - Adjusts for device pixel ratio/resolution
   */
  mapPositionToPoint(e, t, i) {
    const s = this.domElement.isConnected ? this.domElement.getBoundingClientRect() : {
      width: this.domElement.width,
      height: this.domElement.height,
      left: 0,
      top: 0
    }, n = 1 / this.resolution;
    e.x = (t - s.left) * (this.domElement.width / s.width) * n, e.y = (i - s.top) * (this.domElement.height / s.height) * n;
  }
  /**
   * Ensures that the original event object contains all data that a regular pointer event would have
   * @param event - The original event data from a touch or mouse event
   * @returns An array containing a single normalized pointer event, in the case of a pointer
   *  or mouse event, or a multiple normalized pointer events if there are multiple changed touches
   */
  _normalizeToPointerData(e) {
    const t = [];
    if (this.supportsTouchEvents && e instanceof TouchEvent)
      for (let i = 0, s = e.changedTouches.length; i < s; i++) {
        const n = e.changedTouches[i];
        typeof n.button > "u" && (n.button = 0), typeof n.buttons > "u" && (n.buttons = 1), typeof n.isPrimary > "u" && (n.isPrimary = e.touches.length === 1 && e.type === "touchstart"), typeof n.width > "u" && (n.width = n.radiusX || 1), typeof n.height > "u" && (n.height = n.radiusY || 1), typeof n.tiltX > "u" && (n.tiltX = 0), typeof n.tiltY > "u" && (n.tiltY = 0), typeof n.pointerType > "u" && (n.pointerType = "touch"), typeof n.pointerId > "u" && (n.pointerId = n.identifier || 0), typeof n.pressure > "u" && (n.pressure = n.force || 0.5), typeof n.twist > "u" && (n.twist = 0), typeof n.tangentialPressure > "u" && (n.tangentialPressure = 0), typeof n.layerX > "u" && (n.layerX = n.offsetX = n.clientX), typeof n.layerY > "u" && (n.layerY = n.offsetY = n.clientY), n.isNormalized = !0, n.type = e.type, n.altKey ?? (n.altKey = e.altKey), n.ctrlKey ?? (n.ctrlKey = e.ctrlKey), n.metaKey ?? (n.metaKey = e.metaKey), n.shiftKey ?? (n.shiftKey = e.shiftKey), t.push(n);
      }
    else if (!globalThis.MouseEvent || e instanceof MouseEvent && (!this.supportsPointerEvents || !(e instanceof globalThis.PointerEvent))) {
      const i = e;
      typeof i.isPrimary > "u" && (i.isPrimary = !0), typeof i.width > "u" && (i.width = 1), typeof i.height > "u" && (i.height = 1), typeof i.tiltX > "u" && (i.tiltX = 0), typeof i.tiltY > "u" && (i.tiltY = 0), typeof i.pointerType > "u" && (i.pointerType = "mouse"), typeof i.pointerId > "u" && (i.pointerId = ge), typeof i.pressure > "u" && (i.pressure = 0.5), typeof i.twist > "u" && (i.twist = 0), typeof i.tangentialPressure > "u" && (i.tangentialPressure = 0), i.isNormalized = !0, t.push(i);
    } else
      t.push(e);
    return t;
  }
  /**
   * Normalizes the native {@link https://w3c.github.io/uievents/#interface-wheelevent WheelEvent}.
   *
   * The returned {@link FederatedWheelEvent} is a shared instance. It will not persist across
   * multiple native wheel events.
   * @param nativeEvent - The native wheel event that occurred on the canvas.
   * @returns A federated wheel event.
   */
  normalizeWheelEvent(e) {
    const t = this._rootWheelEvent;
    return this._transferMouseData(t, e), t.deltaX = e.deltaX, t.deltaY = e.deltaY, t.deltaZ = e.deltaZ, t.deltaMode = e.deltaMode, this.mapPositionToPoint(t.screen, e.clientX, e.clientY), t.global.copyFrom(t.screen), t.offset.copyFrom(t.screen), t.nativeEvent = e, t.type = e.type, t;
  }
  /**
   * Normalizes the `nativeEvent` into a federateed {@link FederatedPointerEvent}.
   * @param event
   * @param nativeEvent
   */
  _bootstrapEvent(e, t) {
    return e.originalEvent = null, e.nativeEvent = t, e.pointerId = t.pointerId, e.width = t.width, e.height = t.height, e.isPrimary = t.isPrimary, e.pointerType = t.pointerType, e.pressure = t.pressure, e.tangentialPressure = t.tangentialPressure, e.tiltX = t.tiltX, e.tiltY = t.tiltY, e.twist = t.twist, this._transferMouseData(e, t), this.mapPositionToPoint(e.screen, t.clientX, t.clientY), e.global.copyFrom(e.screen), e.offset.copyFrom(e.screen), e.isTrusted = t.isTrusted, e.type === "pointerleave" && (e.type = "pointerout"), e.type.startsWith("mouse") && (e.type = e.type.replace("mouse", "pointer")), e.type.startsWith("touch") && (e.type = ye[e.type] || e.type), e;
  }
  /**
   * Transfers base & mouse event data from the `nativeEvent` to the federated event.
   * @param event
   * @param nativeEvent
   */
  _transferMouseData(e, t) {
    e.isTrusted = t.isTrusted, e.srcElement = t.srcElement, e.timeStamp = performance.now(), e.type = t.type, e.altKey = t.altKey, e.button = t.button, e.buttons = t.buttons, e.client.x = t.clientX, e.client.y = t.clientY, e.ctrlKey = t.ctrlKey, e.metaKey = t.metaKey, e.movement.x = t.movementX, e.movement.y = t.movementY, e.page.x = t.pageX, e.page.y = t.pageY, e.relatedTarget = null, e.shiftKey = t.shiftKey;
  }
};
S.extension = {
  name: "events",
  type: [
    b.WebGLSystem,
    b.CanvasSystem,
    b.WebGPUSystem
  ],
  priority: -1
};
S.defaultEventFeatures = {
  /** Enables pointer events associated with pointer movement. */
  move: !0,
  /** Enables global pointer move events. */
  globalMove: !0,
  /** Enables pointer events associated with clicking. */
  click: !0,
  /** Enables wheel events. */
  wheel: !0
};
let ee = S;
const be = {
  onclick: null,
  onmousedown: null,
  onmouseenter: null,
  onmouseleave: null,
  onmousemove: null,
  onglobalmousemove: null,
  onmouseout: null,
  onmouseover: null,
  onmouseup: null,
  onmouseupoutside: null,
  onpointercancel: null,
  onpointerdown: null,
  onpointerenter: null,
  onpointerleave: null,
  onpointermove: null,
  onglobalpointermove: null,
  onpointerout: null,
  onpointerover: null,
  onpointertap: null,
  onpointerup: null,
  onpointerupoutside: null,
  onrightclick: null,
  onrightdown: null,
  onrightup: null,
  onrightupoutside: null,
  ontap: null,
  ontouchcancel: null,
  ontouchend: null,
  ontouchendoutside: null,
  ontouchmove: null,
  onglobaltouchmove: null,
  ontouchstart: null,
  onwheel: null,
  get interactive() {
    return this.eventMode === "dynamic" || this.eventMode === "static";
  },
  set interactive(a) {
    this.eventMode = a ? "static" : "passive";
  },
  _internalEventMode: void 0,
  get eventMode() {
    return this._internalEventMode ?? ee.defaultEventMode;
  },
  set eventMode(a) {
    this._internalEventMode = a;
  },
  isInteractive() {
    return this.eventMode === "static" || this.eventMode === "dynamic";
  },
  interactiveChildren: !0,
  hitArea: null,
  addEventListener(a, e, t) {
    const i = typeof t == "boolean" && t || typeof t == "object" && t.capture, s = typeof t == "object" ? t.signal : void 0, n = typeof t == "object" ? t.once === !0 : !1, o = typeof e == "function" ? void 0 : e;
    a = i ? `${a}capture` : a;
    const r = typeof e == "function" ? e : e.handleEvent, h = this;
    s && s.addEventListener("abort", () => {
      h.off(a, r, o);
    }), n ? h.once(a, r, o) : h.on(a, r, o);
  },
  removeEventListener(a, e, t) {
    const i = typeof t == "boolean" && t || typeof t == "object" && t.capture, s = typeof e == "function" ? void 0 : e;
    a = i ? `${a}capture` : a, e = typeof e == "function" ? e : e.handleEvent, this.off(a, e, s);
  },
  dispatchEvent(a) {
    if (!(a instanceof O))
      throw new Error("Container cannot propagate events outside of the Federated Events API");
    return a.defaultPrevented = !1, a.path = null, a.target = this, a.manager.dispatchEvent(a), !a.defaultPrevented;
  }
};
w.add(ue);
w.mixin(V, pe);
w.add(Q);
w.add(ee);
w.mixin(V, be);
