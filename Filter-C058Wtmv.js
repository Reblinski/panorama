import { S as n, a as u, G as o, b as f } from "./pixi-panorama-RrriKmcw.js";
const s = class i extends n {
  /**
   * @param options - The optional parameters of this filter.
   */
  constructor(e) {
    e = { ...i.defaultOptions, ...e }, super(e), this.enabled = !0, this._state = u.for2d(), this.blendMode = e.blendMode, this.padding = e.padding, typeof e.antialias == "boolean" ? this.antialias = e.antialias ? "on" : "off" : this.antialias = e.antialias, this.resolution = e.resolution, this.blendRequired = e.blendRequired, this.clipToViewport = e.clipToViewport, this.addResource("uTexture", 0, 1), e.blendRequired && this.addResource("uBackTexture", 0, 3);
  }
  /**
   * Applies the filter
   * @param filterManager - The renderer to retrieve the filter from
   * @param input - The input render target.
   * @param output - The target to output to.
   * @param clearMode - Should the output be cleared before rendering to it
   */
  apply(e, t, a, r) {
    e.applyFilter(this, t, a, r);
  }
  /**
   * Get the blend mode of the filter.
   * @default "normal"
   */
  get blendMode() {
    return this._state.blendMode;
  }
  /** Sets the blend mode of the filter. */
  set blendMode(e) {
    this._state.blendMode = e;
  }
  /**
   * A short hand function to create a filter based of a vertex and fragment shader src.
   * @param options
   * @returns A shiny new PixiJS filter!
   */
  static from(e) {
    const { gpu: t, gl: a, ...r } = e;
    let l, d;
    return t && (l = o.from(t)), a && (d = f.from(a)), new i({
      gpuProgram: l,
      glProgram: d,
      ...r
    });
  }
};
s.defaultOptions = {
  blendMode: "normal",
  resolution: 1,
  padding: 0,
  antialias: "off",
  blendRequired: !1,
  clipToViewport: !0
};
let b = s;
export {
  b as F
};
