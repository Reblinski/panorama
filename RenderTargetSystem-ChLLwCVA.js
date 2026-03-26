import { a4 as Ve, $ as oe, M as m, G as Ne, b as je, a as $e, a5 as le, j as l, r as W, a6 as w, a7 as qe, a8 as z, a9 as T, R as V, aa as de, ab as Ke, T as f, d as g, Z as D, w as ue, ac as ee, ad as ce, ae as he, af as pe, ag as fe, O as P, H as Ye, C as E, D as N, _ as y, I as B, ah as Xe, P as Je, ai as Qe, X as Ze, L as te, aj as re, y as p, f as et, q as O, c as tt, z as rt, ak as st, al as nt } from "./pixi-panorama-Cfptddmv.js";
import { F as at } from "./Filter-DaFUxUx9.js";
var it = `in vec2 vMaskCoord;
in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform sampler2D uMaskTexture;

uniform float uAlpha;
uniform vec4 uMaskClamp;
uniform float uInverse;

out vec4 finalColor;

void main(void)
{
    float clip = step(3.5,
        step(uMaskClamp.x, vMaskCoord.x) +
        step(uMaskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, uMaskClamp.z) +
        step(vMaskCoord.y, uMaskClamp.w));

    // TODO look into why this is needed
    float npmAlpha = uAlpha;
    vec4 original = texture(uTexture, vTextureCoord);
    vec4 masky = texture(uMaskTexture, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    float a = alphaMul * masky.r * npmAlpha * clip;

    if (uInverse == 1.0) {
        a = 1.0 - a;
    }

    finalColor = original * a;
}
`, ot = `in vec2 aPosition;

out vec2 vTextureCoord;
out vec2 vMaskCoord;


uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;
uniform mat3 uFilterMatrix;

vec4 filterVertexPosition(  vec2 aPosition )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
       
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(  vec2 aPosition )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

vec2 getFilterCoord( vec2 aPosition )
{
    return  ( uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}   

void main(void)
{
    gl_Position = filterVertexPosition(aPosition);
    vTextureCoord = filterTextureCoord(aPosition);
    vMaskCoord = getFilterCoord(aPosition);
}
`, se = `struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct MaskUniforms {
  uFilterMatrix:mat3x3<f32>,
  uMaskClamp:vec4<f32>,
  uAlpha:f32,
  uInverse:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> filterUniforms : MaskUniforms;
@group(1) @binding(1) var uMaskTexture: texture_2d<f32>;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) filterUv : vec2<f32>,
};

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);
}

fn getFilterCoord(aPosition:vec2<f32> ) -> vec2<f32>
{
  return ( filterUniforms.uFilterMatrix * vec3( filterTextureCoord(aPosition), 1.0)  ).xy;
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}

@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition),
   getFilterCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) filterUv: vec2<f32>,
  @builtin(position) position: vec4<f32>
) -> @location(0) vec4<f32> {

    var maskClamp = filterUniforms.uMaskClamp;
    var uAlpha = filterUniforms.uAlpha;

    var clip = step(3.5,
      step(maskClamp.x, filterUv.x) +
      step(maskClamp.y, filterUv.y) +
      step(filterUv.x, maskClamp.z) +
      step(filterUv.y, maskClamp.w));

    var mask = textureSample(uMaskTexture, uSampler, filterUv);
    var source = textureSample(uTexture, uSampler, uv);
    var alphaMul = 1.0 - uAlpha * (1.0 - mask.a);

    var a: f32 = alphaMul * mask.r * uAlpha * clip;

    if (filterUniforms.uInverse == 1.0) {
        a = 1.0 - a;
    }

    return source * a;
}
`;
class lt extends at {
  constructor(e) {
    const { sprite: t, ...r } = e, s = new Ve(t.texture), n = new oe({
      uFilterMatrix: { value: new m(), type: "mat3x3<f32>" },
      uMaskClamp: { value: s.uClampFrame, type: "vec4<f32>" },
      uAlpha: { value: 1, type: "f32" },
      uInverse: { value: e.inverse ? 1 : 0, type: "f32" }
    }), i = Ne.from({
      vertex: {
        source: se,
        entryPoint: "mainVertex"
      },
      fragment: {
        source: se,
        entryPoint: "mainFragment"
      }
    }), o = je.from({
      vertex: ot,
      fragment: it,
      name: "mask-filter"
    });
    super({
      ...r,
      gpuProgram: i,
      glProgram: o,
      clipToViewport: !1,
      resources: {
        filterUniforms: n,
        uMaskTexture: t.texture.source
      }
    }), this.sprite = t, this._textureMatrix = s;
  }
  set inverse(e) {
    this.resources.filterUniforms.uniforms.uInverse = e ? 1 : 0;
  }
  get inverse() {
    return this.resources.filterUniforms.uniforms.uInverse === 1;
  }
  apply(e, t, r, s) {
    this._textureMatrix.texture = this.sprite.texture, e.calculateSpriteMatrix(
      this.resources.filterUniforms.uniforms.uFilterMatrix,
      this.sprite
    ).prepend(this._textureMatrix.mapCoord), this.resources.uMaskTexture = this.sprite.texture.source, e.applyFilter(this, t, r, s);
  }
}
class me {
  constructor() {
    this.batcherName = "default", this.topology = "triangle-list", this.attributeSize = 4, this.indexSize = 6, this.packAsQuad = !0, this.roundPixels = 0, this._attributeStart = 0, this._batcher = null, this._batch = null;
  }
  get blendMode() {
    return this.renderable.groupBlendMode;
  }
  get color() {
    return this.renderable.groupColorAlpha;
  }
  reset() {
    this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.bounds = null;
  }
  destroy() {
    this.reset();
  }
}
const j = class ge {
  constructor(e, t) {
    var r, s;
    this.state = $e.for2d(), this._batchersByInstructionSet = /* @__PURE__ */ Object.create(null), this._activeBatches = /* @__PURE__ */ Object.create(null), this.renderer = e, this._adaptor = t, (s = (r = this._adaptor).init) == null || s.call(r, this);
  }
  static getBatcher(e) {
    return new this._availableBatchers[e]();
  }
  buildStart(e) {
    let t = this._batchersByInstructionSet[e.uid];
    t || (t = this._batchersByInstructionSet[e.uid] = /* @__PURE__ */ Object.create(null), t.default || (t.default = new le({
      maxTextures: this.renderer.limits.maxBatchableTextures
    }))), this._activeBatches = t, this._activeBatch = this._activeBatches.default;
    for (const r in this._activeBatches)
      this._activeBatches[r].begin();
  }
  addToBatch(e, t) {
    if (this._activeBatch.name !== e.batcherName) {
      this._activeBatch.break(t);
      let r = this._activeBatches[e.batcherName];
      r || (r = this._activeBatches[e.batcherName] = ge.getBatcher(e.batcherName), r.begin()), this._activeBatch = r;
    }
    this._activeBatch.add(e);
  }
  break(e) {
    this._activeBatch.break(e);
  }
  buildEnd(e) {
    this._activeBatch.break(e);
    const t = this._activeBatches;
    for (const r in t) {
      const s = t[r], n = s.geometry;
      n.indexBuffer.setDataWithSize(s.indexBuffer, s.indexSize, !0), n.buffers[0].setDataWithSize(s.attributeBuffer.float32View, s.attributeSize, !1);
    }
  }
  upload(e) {
    const t = this._batchersByInstructionSet[e.uid];
    for (const r in t) {
      const s = t[r], n = s.geometry;
      s.dirty && (s.dirty = !1, n.buffers[0].update(s.attributeSize * 4));
    }
  }
  execute(e) {
    if (e.action === "startBatch") {
      const t = e.batcher, r = t.geometry, s = t.shader;
      this._adaptor.start(this, r, s);
    }
    this._adaptor.execute(this, e);
  }
  destroy() {
    this.state = null, this.renderer = null, this._adaptor = null;
    for (const e in this._activeBatches)
      this._activeBatches[e].destroy();
    this._activeBatches = null;
  }
};
j.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes,
    l.CanvasPipes
  ],
  name: "batch"
};
j._availableBatchers = /* @__PURE__ */ Object.create(null);
let _e = j;
W.handleByMap(l.Batcher, _e._availableBatchers);
W.add(le);
const dt = new z();
class ut extends de {
  constructor() {
    super(), this.filters = [new lt({
      sprite: new Ke(f.EMPTY),
      inverse: !1,
      resolution: "inherit",
      antialias: "inherit"
    })];
  }
  get sprite() {
    return this.filters[0].sprite;
  }
  set sprite(e) {
    this.filters[0].sprite = e;
  }
  get inverse() {
    return this.filters[0].inverse;
  }
  set inverse(e) {
    this.filters[0].inverse = e;
  }
}
class xe {
  constructor(e) {
    this._activeMaskStage = [], this._renderer = e;
  }
  push(e, t, r) {
    const s = this._renderer;
    if (s.renderPipes.batch.break(r), r.add({
      renderPipeId: "alphaMask",
      action: "pushMaskBegin",
      mask: e,
      inverse: t._maskOptions.inverse,
      canBundle: !1,
      maskedContainer: t
    }), e.inverse = t._maskOptions.inverse, e.renderMaskToTexture) {
      const n = e.mask;
      n.includeInBuild = !0, n.collectRenderables(
        r,
        s,
        null
      ), n.includeInBuild = !1;
    }
    s.renderPipes.batch.break(r), r.add({
      renderPipeId: "alphaMask",
      action: "pushMaskEnd",
      mask: e,
      maskedContainer: t,
      inverse: t._maskOptions.inverse,
      canBundle: !1
    });
  }
  pop(e, t, r) {
    this._renderer.renderPipes.batch.break(r), r.add({
      renderPipeId: "alphaMask",
      action: "popMaskEnd",
      mask: e,
      inverse: t._maskOptions.inverse,
      canBundle: !1
    });
  }
  execute(e) {
    const t = this._renderer, r = e.mask.renderMaskToTexture;
    if (e.action === "pushMaskBegin") {
      const s = w.get(ut);
      if (s.inverse = e.inverse, r) {
        e.mask.mask.measurable = !0;
        const n = qe(e.mask.mask, !0, dt);
        e.mask.mask.measurable = !1, n.ceil();
        const i = t.renderTarget.renderTarget.colorTexture.source, o = T.getOptimalTexture(
          n.width,
          n.height,
          i._resolution,
          i.antialias
        );
        t.renderTarget.push(o, !0), t.globalUniforms.push({
          offset: n,
          worldColor: 4294967295
        });
        const d = s.sprite;
        d.texture = o, d.worldTransform.tx = n.minX, d.worldTransform.ty = n.minY, this._activeMaskStage.push({
          filterEffect: s,
          maskedContainer: e.maskedContainer,
          filterTexture: o
        });
      } else
        s.sprite = e.mask.mask, this._activeMaskStage.push({
          filterEffect: s,
          maskedContainer: e.maskedContainer
        });
    } else if (e.action === "pushMaskEnd") {
      const s = this._activeMaskStage[this._activeMaskStage.length - 1];
      r && (t.type === V.WEBGL && t.renderTarget.finishRenderPass(), t.renderTarget.pop(), t.globalUniforms.pop()), t.filter.push({
        renderPipeId: "filter",
        action: "pushFilter",
        container: s.maskedContainer,
        filterEffect: s.filterEffect,
        canBundle: !1
      });
    } else if (e.action === "popMaskEnd") {
      t.filter.pop();
      const s = this._activeMaskStage.pop();
      r && T.returnTexture(s.filterTexture), w.return(s.filterEffect);
    }
  }
  destroy() {
    this._renderer = null, this._activeMaskStage = null;
  }
}
xe.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes,
    l.CanvasPipes
  ],
  name: "alphaMask"
};
class be {
  constructor(e) {
    this._colorStack = [], this._colorStackIndex = 0, this._currentColor = 0, this._renderer = e;
  }
  buildStart() {
    this._colorStack[0] = 15, this._colorStackIndex = 1, this._currentColor = 15;
  }
  push(e, t, r) {
    this._renderer.renderPipes.batch.break(r);
    const n = this._colorStack;
    n[this._colorStackIndex] = n[this._colorStackIndex - 1] & e.mask;
    const i = this._colorStack[this._colorStackIndex];
    i !== this._currentColor && (this._currentColor = i, r.add({
      renderPipeId: "colorMask",
      colorMask: i,
      canBundle: !1
    })), this._colorStackIndex++;
  }
  pop(e, t, r) {
    this._renderer.renderPipes.batch.break(r);
    const n = this._colorStack;
    this._colorStackIndex--;
    const i = n[this._colorStackIndex - 1];
    i !== this._currentColor && (this._currentColor = i, r.add({
      renderPipeId: "colorMask",
      colorMask: i,
      canBundle: !1
    }));
  }
  execute(e) {
    this._renderer.colorMask.setMask(e.colorMask);
  }
  destroy() {
    this._renderer = null, this._colorStack = null;
  }
}
be.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes
  ],
  name: "colorMask"
};
class Te {
  constructor(e) {
    this._maskStackHash = {}, this._maskHash = /* @__PURE__ */ new WeakMap(), this._renderer = e;
  }
  push(e, t, r) {
    var s;
    const n = e, i = this._renderer;
    i.renderPipes.batch.break(r), i.renderPipes.blendMode.setBlendMode(n.mask, "none", r), r.add({
      renderPipeId: "stencilMask",
      action: "pushMaskBegin",
      mask: e,
      inverse: t._maskOptions.inverse,
      canBundle: !1
    });
    const o = n.mask;
    o.includeInBuild = !0, this._maskHash.has(n) || this._maskHash.set(n, {
      instructionsStart: 0,
      instructionsLength: 0
    });
    const d = this._maskHash.get(n);
    d.instructionsStart = r.instructionSize, o.collectRenderables(
      r,
      i,
      null
    ), o.includeInBuild = !1, i.renderPipes.batch.break(r), r.add({
      renderPipeId: "stencilMask",
      action: "pushMaskEnd",
      mask: e,
      inverse: t._maskOptions.inverse,
      canBundle: !1
    });
    const c = r.instructionSize - d.instructionsStart - 1;
    d.instructionsLength = c;
    const h = i.renderTarget.renderTarget.uid;
    (s = this._maskStackHash)[h] ?? (s[h] = 0);
  }
  pop(e, t, r) {
    const s = e, n = this._renderer;
    n.renderPipes.batch.break(r), n.renderPipes.blendMode.setBlendMode(s.mask, "none", r), r.add({
      renderPipeId: "stencilMask",
      action: "popMaskBegin",
      inverse: t._maskOptions.inverse,
      canBundle: !1
    });
    const i = this._maskHash.get(e);
    for (let o = 0; o < i.instructionsLength; o++)
      r.instructions[r.instructionSize++] = r.instructions[i.instructionsStart++];
    r.add({
      renderPipeId: "stencilMask",
      action: "popMaskEnd",
      canBundle: !1
    });
  }
  execute(e) {
    var t;
    const r = this._renderer, s = r, n = r.renderTarget.renderTarget.uid;
    let i = (t = this._maskStackHash)[n] ?? (t[n] = 0);
    e.action === "pushMaskBegin" ? (s.renderTarget.ensureDepthStencil(), s.stencil.setStencilMode(g.RENDERING_MASK_ADD, i), i++, s.colorMask.setMask(0)) : e.action === "pushMaskEnd" ? (e.inverse ? s.stencil.setStencilMode(g.INVERSE_MASK_ACTIVE, i) : s.stencil.setStencilMode(g.MASK_ACTIVE, i), s.colorMask.setMask(15)) : e.action === "popMaskBegin" ? (s.colorMask.setMask(0), i !== 0 ? s.stencil.setStencilMode(g.RENDERING_MASK_REMOVE, i) : (s.renderTarget.clear(null, D.STENCIL), s.stencil.setStencilMode(g.DISABLED, i)), i--) : e.action === "popMaskEnd" && (e.inverse ? s.stencil.setStencilMode(g.INVERSE_MASK_ACTIVE, i) : s.stencil.setStencilMode(g.MASK_ACTIVE, i), s.colorMask.setMask(15)), this._maskStackHash[n] = i;
  }
  destroy() {
    this._renderer = null, this._maskStackHash = null, this._maskHash = null;
  }
}
Te.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes
  ],
  name: "stencilMask"
};
class ye {
  constructor(e) {
    this._renderer = e;
  }
  updateRenderable() {
  }
  destroyRenderable() {
  }
  validateRenderable() {
    return !1;
  }
  addRenderable(e, t) {
    this._renderer.renderPipes.batch.break(t), t.add(e);
  }
  execute(e) {
    e.isRenderable && e.render(this._renderer);
  }
  destroy() {
    this._renderer = null;
  }
}
ye.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes,
    l.CanvasPipes
  ],
  name: "customRender"
};
function L(a, e) {
  const t = a.instructionSet, r = t.instructions;
  for (let s = 0; s < t.instructionSize; s++) {
    const n = r[s];
    e[n.renderPipeId].execute(n);
  }
}
class ve {
  constructor(e) {
    this._renderer = e;
  }
  addRenderGroup(e, t) {
    e.isCachedAsTexture ? this._addRenderableCacheAsTexture(e, t) : this._addRenderableDirect(e, t);
  }
  execute(e) {
    e.isRenderable && (e.isCachedAsTexture ? this._executeCacheAsTexture(e) : this._executeDirect(e));
  }
  destroy() {
    this._renderer = null;
  }
  _addRenderableDirect(e, t) {
    this._renderer.renderPipes.batch.break(t), e._batchableRenderGroup && (w.return(e._batchableRenderGroup), e._batchableRenderGroup = null), t.add(e);
  }
  _addRenderableCacheAsTexture(e, t) {
    const r = e._batchableRenderGroup ?? (e._batchableRenderGroup = w.get(me));
    r.renderable = e.root, r.transform = e.root.relativeGroupTransform, r.texture = e.texture, r.bounds = e._textureBounds, t.add(e), this._renderer.renderPipes.blendMode.pushBlendMode(e, e.root.groupBlendMode, t), this._renderer.renderPipes.batch.addToBatch(r, t), this._renderer.renderPipes.blendMode.popBlendMode(t);
  }
  _executeCacheAsTexture(e) {
    if (e.textureNeedsUpdate) {
      e.textureNeedsUpdate = !1;
      const t = new m().translate(
        -e._textureBounds.x,
        -e._textureBounds.y
      );
      this._renderer.renderTarget.push(e.texture, !0, null, e.texture.frame), this._renderer.globalUniforms.push({
        worldTransformMatrix: t,
        worldColor: 4294967295,
        offset: { x: 0, y: 0 }
      }), L(e, this._renderer.renderPipes), this._renderer.renderTarget.finishRenderPass(), this._renderer.renderTarget.pop(), this._renderer.globalUniforms.pop();
    }
    e._batchableRenderGroup._batcher.updateElement(e._batchableRenderGroup), e._batchableRenderGroup._batcher.geometry.buffers[0].update();
  }
  _executeDirect(e) {
    this._renderer.globalUniforms.push({
      worldTransformMatrix: e.inverseParentTextureTransform,
      worldColor: e.worldColorAlpha
    }), L(e, this._renderer.renderPipes), this._renderer.globalUniforms.pop();
  }
}
ve.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes,
    l.CanvasPipes
  ],
  name: "renderGroup"
};
class Ce {
  constructor(e) {
    this._renderer = e;
  }
  addRenderable(e, t) {
    const r = this._getGpuSprite(e);
    e.didViewUpdate && this._updateBatchableSprite(e, r), this._renderer.renderPipes.batch.addToBatch(r, t);
  }
  updateRenderable(e) {
    const t = this._getGpuSprite(e);
    e.didViewUpdate && this._updateBatchableSprite(e, t), t._batcher.updateElement(t);
  }
  validateRenderable(e) {
    const t = this._getGpuSprite(e);
    return !t._batcher.checkAndUpdateTexture(
      t,
      e._texture
    );
  }
  _updateBatchableSprite(e, t) {
    t.bounds = e.visualBounds, t.texture = e._texture;
  }
  _getGpuSprite(e) {
    return e._gpuData[this._renderer.uid] || this._initGPUSprite(e);
  }
  _initGPUSprite(e) {
    const t = new me();
    return t.renderable = e, t.transform = e.groupTransform, t.texture = e._texture, t.bounds = e.visualBounds, t.roundPixels = this._renderer._roundPixels | e._roundPixels, e._gpuData[this._renderer.uid] = t, t;
  }
  destroy() {
    this._renderer = null;
  }
}
Ce.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes,
    l.CanvasPipes
  ],
  name: "sprite"
};
const v = {};
W.handle(l.BlendMode, (a) => {
  if (!a.name)
    throw new Error("BlendMode extension must have a name property");
  v[a.name] = a.ref;
}, (a) => {
  delete v[a.name];
});
class ke {
  constructor(e) {
    this._blendModeStack = [], this._isAdvanced = !1, this._filterHash = /* @__PURE__ */ Object.create(null), this._renderer = e, this._renderer.runners.prerender.add(this);
  }
  prerender() {
    this._activeBlendMode = "normal", this._isAdvanced = !1;
  }
  /**
   * Push a blend mode onto the internal stack and apply it to the instruction set if needed.
   * @param renderable - The renderable or {@link RenderGroup} associated with the change.
   * @param blendMode - The blend mode to activate.
   * @param instructionSet - The instruction set being built.
   */
  pushBlendMode(e, t, r) {
    this._blendModeStack.push(t), this.setBlendMode(e, t, r);
  }
  /**
   * Pop the last blend mode from the stack and apply the new top-of-stack mode.
   * @param instructionSet - The instruction set being built.
   */
  popBlendMode(e) {
    this._blendModeStack.pop();
    const t = this._blendModeStack[this._activeBlendMode.length - 1] ?? "normal";
    this.setBlendMode(null, t, e);
  }
  /**
   * Ensure a blend mode switch is added to the instruction set when the mode changes.
   * If an advanced blend mode is active, subsequent renderables will be collected so they can be
   * rendered within a single filter pass.
   * @param renderable - The renderable or {@link RenderGroup} to associate with the change, or null when unwinding.
   * @param blendMode - The target blend mode.
   * @param instructionSet - The instruction set being built.
   */
  setBlendMode(e, t, r) {
    var n;
    const s = e instanceof ee;
    if (this._activeBlendMode === t) {
      this._isAdvanced && e && !s && ((n = this._renderableList) == null || n.push(e));
      return;
    }
    this._isAdvanced && this._endAdvancedBlendMode(r), this._activeBlendMode = t, e && (this._isAdvanced = !!v[t], this._isAdvanced && this._beginAdvancedBlendMode(e, r));
  }
  _beginAdvancedBlendMode(e, t) {
    this._renderer.renderPipes.batch.break(t);
    const r = this._activeBlendMode;
    if (!v[r]) {
      ue(`Unable to assign BlendMode: '${r}'. You may want to include: import 'pixi.js/advanced-blend-modes'`);
      return;
    }
    const s = this._ensureFilterEffect(r), n = e instanceof ee, i = {
      renderPipeId: "filter",
      action: "pushFilter",
      filterEffect: s,
      renderables: n ? null : [e],
      container: n ? e.root : null,
      canBundle: !1
    };
    this._renderableList = i.renderables, t.add(i);
  }
  _ensureFilterEffect(e) {
    let t = this._filterHash[e];
    return t || (t = this._filterHash[e] = new de(), t.filters = [new v[e]()]), t;
  }
  _endAdvancedBlendMode(e) {
    this._isAdvanced = !1, this._renderableList = null, this._renderer.renderPipes.batch.break(e), e.add({
      renderPipeId: "filter",
      action: "popFilter",
      canBundle: !1
    });
  }
  /**
   * called when the instruction build process is starting this will reset internally to the default blend mode
   * @internal
   */
  buildStart() {
    this._isAdvanced = !1;
  }
  /**
   * called when the instruction build process is finished, ensuring that if there is an advanced blend mode
   * active, we add the final render instructions added to the instruction set
   * @param instructionSet - The instruction set we are adding to
   * @internal
   */
  buildEnd(e) {
    this._isAdvanced && this._endAdvancedBlendMode(e);
  }
  /** @internal */
  destroy() {
    this._renderer = null, this._renderableList = null;
    for (const e in this._filterHash)
      this._filterHash[e].destroy();
    this._filterHash = null;
  }
}
ke.extension = {
  type: [
    l.WebGLPipes,
    l.WebGPUPipes,
    l.CanvasPipes
  ],
  name: "blendMode"
};
function H(a, e) {
  e || (e = 0);
  for (let t = e; t < a.length && a[t]; t++)
    a[t] = null;
}
const ct = new P(), ne = he | pe | fe;
function Me(a, e = !1) {
  ht(a);
  const t = a.childrenToUpdate, r = a.updateTick++;
  for (const s in t) {
    const n = Number(s), i = t[s], o = i.list, d = i.index;
    for (let c = 0; c < d; c++) {
      const h = o[c];
      h.parentRenderGroup === a && h.relativeRenderGroupDepth === n && Se(h, r, 0);
    }
    H(o, d), i.index = 0;
  }
  if (e)
    for (let s = 0; s < a.renderGroupChildren.length; s++)
      Me(a.renderGroupChildren[s], e);
}
function ht(a) {
  const e = a.root;
  let t;
  if (a.renderGroupParent) {
    const r = a.renderGroupParent;
    a.worldTransform.appendFrom(
      e.relativeGroupTransform,
      r.worldTransform
    ), a.worldColor = ce(
      e.groupColor,
      r.worldColor
    ), t = e.groupAlpha * r.worldAlpha;
  } else
    a.worldTransform.copyFrom(e.localTransform), a.worldColor = e.localColor, t = e.localAlpha;
  t = t < 0 ? 0 : t > 1 ? 1 : t, a.worldAlpha = t, a.worldColorAlpha = a.worldColor + ((t * 255 | 0) << 24);
}
function Se(a, e, t) {
  if (e === a.updateTick) return;
  a.updateTick = e, a.didChange = !1;
  const r = a.localTransform;
  a.updateLocalTransform();
  const s = a.parent;
  if (s && !s.renderGroup ? (t |= a._updateFlags, a.relativeGroupTransform.appendFrom(
    r,
    s.relativeGroupTransform
  ), t & ne && ae(a, s, t)) : (t = a._updateFlags, a.relativeGroupTransform.copyFrom(r), t & ne && ae(a, ct, t)), !a.renderGroup) {
    const n = a.children, i = n.length;
    for (let c = 0; c < i; c++)
      Se(n[c], e, t);
    const o = a.parentRenderGroup, d = a;
    d.renderPipeId && !o.structureDidChange && o.updateRenderable(d);
  }
}
function ae(a, e, t) {
  if (t & pe) {
    a.groupColor = ce(
      a.localColor,
      e.groupColor
    );
    let r = a.localAlpha * e.groupAlpha;
    r = r < 0 ? 0 : r > 1 ? 1 : r, a.groupAlpha = r, a.groupColorAlpha = a.groupColor + ((r * 255 | 0) << 24);
  }
  t & fe && (a.groupBlendMode = a.localBlendMode === "inherit" ? e.groupBlendMode : a.localBlendMode), t & he && (a.globalDisplayStatus = a.localDisplayStatus & e.globalDisplayStatus), a._updateFlags = 0;
}
function pt(a, e) {
  const { list: t } = a.childrenRenderablesToUpdate;
  let r = !1;
  for (let s = 0; s < a.childrenRenderablesToUpdate.index; s++) {
    const n = t[s];
    if (r = e[n.renderPipeId].validateRenderable(n), r)
      break;
  }
  return a.structureDidChange = r, r;
}
const ft = new m();
class Re {
  constructor(e) {
    this._renderer = e;
  }
  render({ container: e, transform: t }) {
    const r = e.parent, s = e.renderGroup.renderGroupParent;
    e.parent = null, e.renderGroup.renderGroupParent = null;
    const n = this._renderer, i = ft;
    t && (i.copyFrom(e.renderGroup.localTransform), e.renderGroup.localTransform.copyFrom(t));
    const o = n.renderPipes;
    this._updateCachedRenderGroups(e.renderGroup, null), this._updateRenderGroups(e.renderGroup), n.globalUniforms.start({
      worldTransformMatrix: t ? e.renderGroup.localTransform : e.renderGroup.worldTransform,
      worldColor: e.renderGroup.worldColorAlpha
    }), L(e.renderGroup, o), o.uniformBatch && o.uniformBatch.renderEnd(), t && e.renderGroup.localTransform.copyFrom(i), e.parent = r, e.renderGroup.renderGroupParent = s;
  }
  destroy() {
    this._renderer = null;
  }
  _updateCachedRenderGroups(e, t) {
    if (e._parentCacheAsTextureRenderGroup = t, e.isCachedAsTexture) {
      if (!e.textureNeedsUpdate) return;
      t = e;
    }
    for (let r = e.renderGroupChildren.length - 1; r >= 0; r--)
      this._updateCachedRenderGroups(e.renderGroupChildren[r], t);
    if (e.invalidateMatrices(), e.isCachedAsTexture) {
      if (e.textureNeedsUpdate) {
        const r = e.root.getLocalBounds(), s = this._renderer, n = e.textureOptions.resolution || s.view.resolution, i = e.textureOptions.antialias ?? s.view.antialias, o = e.textureOptions.scaleMode ?? "linear", d = e.texture;
        r.ceil(), e.texture && T.returnTexture(e.texture, !0);
        const c = T.getOptimalTexture(
          r.width,
          r.height,
          n,
          i
        );
        c._source.style = new Ye({ scaleMode: o }), e.texture = c, e._textureBounds || (e._textureBounds = new z()), e._textureBounds.copyFrom(r), d !== e.texture && e.renderGroupParent && (e.renderGroupParent.structureDidChange = !0);
      }
    } else e.texture && (T.returnTexture(e.texture, !0), e.texture = null);
  }
  _updateRenderGroups(e) {
    const t = this._renderer, r = t.renderPipes;
    if (e.runOnRender(t), e.instructionSet.renderPipes = r, e.structureDidChange ? H(e.childrenRenderablesToUpdate.list, 0) : pt(e, r), Me(e), e.structureDidChange ? (e.structureDidChange = !1, this._buildInstructions(e, t)) : this._updateRenderables(e), e.childrenRenderablesToUpdate.index = 0, t.renderPipes.batch.upload(e.instructionSet), !(e.isCachedAsTexture && !e.textureNeedsUpdate))
      for (let s = 0; s < e.renderGroupChildren.length; s++)
        this._updateRenderGroups(e.renderGroupChildren[s]);
  }
  _updateRenderables(e) {
    const { list: t, index: r } = e.childrenRenderablesToUpdate;
    for (let s = 0; s < r; s++) {
      const n = t[s];
      n.didViewUpdate && e.updateRenderable(n);
    }
    H(t, r);
  }
  _buildInstructions(e, t) {
    const r = e.root, s = e.instructionSet;
    s.reset();
    const n = t.renderPipes ? t : t.batch.renderer, i = n.renderPipes;
    i.batch.buildStart(s), i.blendMode.buildStart(), i.colorMask.buildStart(), r.sortableChildren && r.sortChildren(), r.collectRenderablesWithEffects(s, n, null), i.batch.buildEnd(s), i.blendMode.buildEnd(s);
  }
}
Re.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "renderGroup"
};
const $ = class we {
  constructor() {
    this.clearBeforeRender = !0, this._backgroundColor = new E(0), this.color = this._backgroundColor, this.alpha = 1;
  }
  /**
   * initiates the background system
   * @param options - the options for the background colors
   */
  init(e) {
    e = { ...we.defaultOptions, ...e }, this.clearBeforeRender = e.clearBeforeRender, this.color = e.background || e.backgroundColor || this._backgroundColor, this.alpha = e.backgroundAlpha, this._backgroundColor.setAlpha(e.backgroundAlpha);
  }
  /** The background color to fill if not transparent */
  get color() {
    return this._backgroundColor;
  }
  set color(e) {
    E.shared.setValue(e).alpha < 1 && this._backgroundColor.alpha === 1 && ue(
      "Cannot set a transparent background on an opaque canvas. To enable transparency, set backgroundAlpha < 1 when initializing your Application."
    ), this._backgroundColor.setValue(e);
  }
  /** The background color alpha. Setting this to 0 will make the canvas transparent. */
  get alpha() {
    return this._backgroundColor.alpha;
  }
  set alpha(e) {
    this._backgroundColor.setAlpha(e);
  }
  /** The background color as an [R, G, B, A] array. */
  get colorRgba() {
    return this._backgroundColor.toArray();
  }
  /**
   * destroys the background system
   * @internal
   */
  destroy() {
  }
};
$.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "background",
  priority: 0
};
$.defaultOptions = {
  /**
   * {@link WebGLOptions.backgroundAlpha}
   * @default 1
   */
  backgroundAlpha: 1,
  /**
   * {@link WebGLOptions.backgroundColor}
   * @default 0x000000
   */
  backgroundColor: 0,
  /**
   * {@link WebGLOptions.clearBeforeRender}
   * @default true
   */
  clearBeforeRender: !0
};
let mt = $;
const I = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp"
}, q = class Pe {
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this._renderer = e;
  }
  _normalizeOptions(e, t = {}) {
    return e instanceof P || e instanceof f ? {
      target: e,
      ...t
    } : {
      ...t,
      ...e
    };
  }
  /**
   * Creates an IImage from a display object or texture.
   * @param options - Options for creating the image, or the target to extract
   * @returns Promise that resolves with the generated IImage
   * @example
   * ```ts
   * // Basic usage with a sprite
   * const sprite = new Sprite(texture);
   * const image = await renderer.extract.image(sprite);
   * document.body.appendChild(image);
   *
   * // Advanced usage with options
   * const image = await renderer.extract.image({
   *     target: container,
   *     format: 'webp',
   *     quality: 0.8,
   *     frame: new Rectangle(0, 0, 100, 100),
   *     resolution: 2,
   *     clearColor: '#ff0000',
   *     antialias: true
   * });
   *
   * // Extract directly from a texture
   * const texture = Texture.from('myTexture.png');
   * const image = await renderer.extract.image(texture);
   * ```
   * @see {@link ExtractImageOptions} For detailed options
   * @see {@link ExtractSystem.base64} For base64 string output
   * @see {@link ExtractSystem.canvas} For canvas output
   * @see {@link ImageLike} For the image interface
   * @category rendering
   */
  async image(e) {
    const t = N.get().createImage();
    return t.src = await this.base64(e), t;
  }
  /**
   * Converts the target into a base64 encoded string.
   *
   * This method works by first creating
   * a canvas using `Extract.canvas` and then converting it to a base64 string.
   * @param options - The options for creating the base64 string, or the target to extract
   * @returns Promise that resolves with the base64 encoded string
   * @example
   * ```ts
   * // Basic usage with a sprite
   * const sprite = new Sprite(texture);
   * const base64 = await renderer.extract.base64(sprite);
   * console.log(base64); // data:image/png;base64,...
   *
   * // Advanced usage with options
   * const base64 = await renderer.extract.base64({
   *     target: container,
   *     format: 'webp',
   *     quality: 0.8,
   *     frame: new Rectangle(0, 0, 100, 100),
   *     resolution: 2
   * });
   * ```
   * @throws Will throw an error if the platform doesn't support any of:
   * - ICanvas.toDataURL
   * - ICanvas.toBlob
   * - ICanvas.convertToBlob
   * @see {@link ExtractImageOptions} For detailed options
   * @see {@link ExtractSystem.canvas} For canvas output
   * @see {@link ExtractSystem.image} For HTMLImage output
   * @category rendering
   */
  async base64(e) {
    e = this._normalizeOptions(
      e,
      Pe.defaultImageOptions
    );
    const { format: t, quality: r } = e, s = this.canvas(e);
    if (s.toBlob !== void 0)
      return new Promise((n, i) => {
        s.toBlob((o) => {
          if (!o) {
            i(new Error("ICanvas.toBlob failed!"));
            return;
          }
          const d = new FileReader();
          d.onload = () => n(d.result), d.onerror = i, d.readAsDataURL(o);
        }, I[t], r);
      });
    if (s.toDataURL !== void 0)
      return s.toDataURL(I[t], r);
    if (s.convertToBlob !== void 0) {
      const n = await s.convertToBlob({ type: I[t], quality: r });
      return new Promise((i, o) => {
        const d = new FileReader();
        d.onload = () => i(d.result), d.onerror = o, d.readAsDataURL(n);
      });
    }
    throw new Error("Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented");
  }
  /**
   * Creates a Canvas element, renders the target to it and returns it.
   * This method is useful for creating static images or when you need direct canvas access.
   * @param options - The options for creating the canvas, or the target to extract
   * @returns A Canvas element with the texture rendered on
   * @example
   * ```ts
   * // Basic canvas extraction from a sprite
   * const sprite = new Sprite(texture);
   * const canvas = renderer.extract.canvas(sprite);
   * document.body.appendChild(canvas);
   *
   * // Extract with custom region
   * const canvas = renderer.extract.canvas({
   *     target: container,
   *     frame: new Rectangle(0, 0, 100, 100)
   * });
   *
   * // Extract with high resolution
   * const canvas = renderer.extract.canvas({
   *     target: sprite,
   *     resolution: 2,
   *     clearColor: '#ff0000'
   * });
   *
   * // Extract directly from a texture
   * const texture = Texture.from('myTexture.png');
   * const canvas = renderer.extract.canvas(texture);
   *
   * // Extract with anti-aliasing
   * const canvas = renderer.extract.canvas({
   *     target: graphics,
   *     antialias: true
   * });
   * ```
   * @see {@link ExtractOptions} For detailed options
   * @see {@link ExtractSystem.image} For HTMLImage output
   * @see {@link ExtractSystem.pixels} For raw pixel data
   * @category rendering
   */
  canvas(e) {
    e = this._normalizeOptions(e);
    const t = e.target, r = this._renderer;
    if (t instanceof f)
      return r.texture.generateCanvas(t);
    const s = r.textureGenerator.generateTexture(e), n = r.texture.generateCanvas(s);
    return s.destroy(!0), n;
  }
  /**
   * Returns a one-dimensional array containing the pixel data of the entire texture in RGBA order,
   * with integer values between 0 and 255 (inclusive).
   * > [!NOE] The returned array is a flat Uint8Array where every 4 values represent RGBA
   * @param options - The options for extracting the image, or the target to extract
   * @returns One-dimensional Uint8Array containing the pixel data in RGBA format
   * @example
   * ```ts
   * // Basic pixel extraction
   * const sprite = new Sprite(texture);
   * const pixels = renderer.extract.pixels(sprite);
   * console.log(pixels[0], pixels[1], pixels[2], pixels[3]); // R,G,B,A values
   *
   * // Extract with custom region
   * const pixels = renderer.extract.pixels({
   *     target: sprite,
   *     frame: new Rectangle(0, 0, 100, 100)
   * });
   *
   * // Extract with high resolution
   * const pixels = renderer.extract.pixels({
   *     target: sprite,
   *     resolution: 2
   * });
   * ```
   * @see {@link ExtractOptions} For detailed options
   * @see {@link ExtractSystem.canvas} For canvas output
   * @see {@link ExtractSystem.image} For image output
   * @category rendering
   */
  pixels(e) {
    e = this._normalizeOptions(e);
    const t = e.target, r = this._renderer, s = t instanceof f ? t : r.textureGenerator.generateTexture(e), n = r.texture.getPixels(s);
    return t instanceof P && s.destroy(!0), n;
  }
  /**
   * Creates a texture from a display object or existing texture.
   *
   * This is useful for creating
   * reusable textures from rendered content or making copies of existing textures.
   * > [!NOTE] The returned texture should be destroyed when no longer needed
   * @param options - The options for creating the texture, or the target to extract
   * @returns A new texture containing the extracted content
   * @example
   * ```ts
   * // Basic texture extraction from a sprite
   * const sprite = new Sprite(texture);
   * const extractedTexture = renderer.extract.texture(sprite);
   *
   * // Extract with custom region
   * const regionTexture = renderer.extract.texture({
   *     target: container,
   *     frame: new Rectangle(0, 0, 100, 100)
   * });
   *
   * // Extract with high resolution
   * const hiResTexture = renderer.extract.texture({
   *     target: sprite,
   *     resolution: 2,
   *     clearColor: '#ff0000'
   * });
   *
   * // Create a new sprite from extracted texture
   * const newSprite = new Sprite(
   *     renderer.extract.texture({
   *         target: graphics,
   *         antialias: true
   *     })
   * );
   *
   * // Clean up when done
   * extractedTexture.destroy(true);
   * ```
   * @see {@link ExtractOptions} For detailed options
   * @see {@link Texture} For texture management
   * @see {@link GenerateTextureSystem} For texture generation
   * @category rendering
   */
  texture(e) {
    return e = this._normalizeOptions(e), e.target instanceof f ? e.target : this._renderer.textureGenerator.generateTexture(e);
  }
  /**
   * Extracts and downloads content from the renderer as an image file.
   * This is a convenient way to save screenshots or export rendered content.
   * > [!NOTE] The download will use PNG format regardless of the filename extension
   * @param options - The options for downloading and extracting the image, or the target to extract
   * @example
   * ```ts
   * // Basic download with default filename
   * const sprite = new Sprite(texture);
   * renderer.extract.download(sprite); // Downloads as 'image.png'
   *
   * // Download with custom filename
   * renderer.extract.download({
   *     target: sprite,
   *     filename: 'screenshot.png'
   * });
   *
   * // Download with custom region
   * renderer.extract.download({
   *     target: container,
   *     filename: 'region.png',
   *     frame: new Rectangle(0, 0, 100, 100)
   * });
   *
   * // Download with high resolution and background
   * renderer.extract.download({
   *     target: stage,
   *     filename: 'hd-screenshot.png',
   *     resolution: 2,
   *     clearColor: '#ff0000'
   * });
   *
   * // Download with anti-aliasing
   * renderer.extract.download({
   *     target: graphics,
   *     filename: 'smooth.png',
   *     antialias: true
   * });
   * ```
   * @see {@link ExtractDownloadOptions} For detailed options
   * @see {@link ExtractSystem.image} For creating images without download
   * @see {@link ExtractSystem.canvas} For canvas output
   * @category rendering
   */
  download(e) {
    e = this._normalizeOptions(e);
    const t = this.canvas(e), r = document.createElement("a");
    r.download = e.filename ?? "image.png", r.href = t.toDataURL("image/png"), document.body.appendChild(r), r.click(), document.body.removeChild(r);
  }
  /**
   * Logs the target to the console as an image. This is a useful way to debug what's happening in the renderer.
   * The image will be displayed in the browser's console using CSS background images.
   * @param options - The options for logging the image, or the target to log
   * @param options.width - The width of the logged image preview in the console (in pixels)
   * @example
   * ```ts
   * // Basic usage
   * const sprite = new Sprite(texture);
   * renderer.extract.log(sprite);
   * ```
   * @see {@link ExtractSystem.canvas} For getting raw canvas output
   * @see {@link ExtractSystem.pixels} For raw pixel data
   * @category rendering
   * @advanced
   */
  log(e) {
    const t = e.width ?? 200;
    e = this._normalizeOptions(e);
    const r = this.canvas(e), s = r.toDataURL();
    console.log(`[Pixi Texture] ${r.width}px ${r.height}px`);
    const n = [
      "font-size: 1px;",
      `padding: ${t}px 300px;`,
      `background: url(${s}) no-repeat;`,
      "background-size: contain;"
    ].join(" ");
    console.log("%c ", n);
  }
  destroy() {
    this._renderer = null;
  }
};
q.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "extract"
};
q.defaultImageOptions = {
  format: "png",
  quality: 1
};
let gt = q;
class K extends f {
  /**
   * Creates a RenderTexture. Pass `dynamic: true` in options to allow resizing after creation.
   * @param options - Options for the RenderTexture, including width, height, and dynamic.
   * @returns A new RenderTexture instance.
   * @example
   * const rt = RenderTexture.create({ width: 100, height: 100, dynamic: true });
   * rt.resize(500, 500);
   */
  static create(e) {
    const { dynamic: t, ...r } = e;
    return new K({
      source: new y(r),
      dynamic: t ?? !1
    });
  }
  /**
   * Resizes the render texture.
   * @param width - The new width of the render texture.
   * @param height - The new height of the render texture.
   * @param resolution - The new resolution of the render texture.
   * @returns This texture.
   */
  resize(e, t, r) {
    return this.source.resize(e, t, r), this;
  }
}
const _t = new B(), xt = new z(), bt = [0, 0, 0, 0];
class Be {
  constructor(e) {
    this._renderer = e;
  }
  /**
   * Creates a texture from a display object that can be used for creating sprites and other textures.
   * This is particularly useful for optimizing performance when a complex container needs to be reused.
   * @param options - Generate texture options or a container to convert to texture
   * @returns A new RenderTexture containing the rendered display object
   * @example
   * ```ts
   * // Basic usage with a container
   * const container = new Container();
   * container.addChild(
   *     new Graphics()
   *         .circle(0, 0, 50)
   *         .fill('red')
   * );
   *
   * const texture = renderer.textureGenerator.generateTexture(container);
   *
   * // Advanced usage with options
   * const texture = renderer.textureGenerator.generateTexture({
   *     target: container,
   *     frame: new Rectangle(0, 0, 100, 100), // Specific region
   *     resolution: 2,                        // High DPI
   *     clearColor: '#ff0000',               // Red background
   *     antialias: true                      // Smooth edges
   * });
   *
   * // Create a sprite from the generated texture
   * const sprite = new Sprite(texture);
   *
   * // Clean up when done
   * texture.destroy(true);
   * ```
   * @see {@link GenerateTextureOptions} For detailed texture generation options
   * @see {@link RenderTexture} For the type of texture created
   * @category rendering
   */
  generateTexture(e) {
    var c;
    e instanceof P && (e = {
      target: e,
      frame: void 0,
      textureSourceOptions: {},
      resolution: void 0
    });
    const t = e.resolution || this._renderer.resolution, r = e.antialias || this._renderer.view.antialias, s = e.target;
    let n = e.clearColor;
    n ? n = Array.isArray(n) && n.length === 4 ? n : E.shared.setValue(n).toArray() : n = bt;
    const i = ((c = e.frame) == null ? void 0 : c.copyTo(_t)) || Xe(s, xt).rectangle;
    i.width = Math.max(i.width, 1 / t) | 0, i.height = Math.max(i.height, 1 / t) | 0;
    const o = K.create({
      ...e.textureSourceOptions,
      width: i.width,
      height: i.height,
      resolution: t,
      antialias: r
    }), d = m.shared.translate(-i.x, -i.y);
    return this._renderer.render({
      container: s,
      transform: d,
      target: o,
      clearColor: n
    }), o.source.updateMipmaps(), o;
  }
  destroy() {
    this._renderer = null;
  }
}
Be.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "textureGenerator"
};
function Tt(a) {
  let e = !1;
  for (const r in a)
    if (a[r] == null) {
      e = !0;
      break;
    }
  if (!e) return a;
  const t = /* @__PURE__ */ Object.create(null);
  for (const r in a) {
    const s = a[r];
    s && (t[r] = s);
  }
  return t;
}
function yt(a) {
  let e = 0;
  for (let t = 0; t < a.length; t++)
    a[t] == null ? e++ : a[t - e] = a[t];
  return a.length -= e, a;
}
const Y = class Ge {
  /**
   * Creates a new GCSystem instance.
   * @param renderer - The renderer this garbage collection system works for
   */
  constructor(e) {
    this._managedResources = [], this._managedResourceHashes = [], this._managedCollections = [], this._ready = !1, this._renderer = e;
  }
  /**
   * Initializes the garbage collection system with the provided options.
   * @param options - Configuration options
   */
  init(e) {
    e = { ...Ge.defaultOptions, ...e }, this.maxUnusedTime = e.gcMaxUnusedTime, this._frequency = e.gcFrequency, this.enabled = e.gcActive, this.now = performance.now();
  }
  /**
   * Gets whether the garbage collection system is currently enabled.
   * @returns True if GC is enabled, false otherwise
   */
  get enabled() {
    return !!this._handler;
  }
  /**
   * Enables or disables the garbage collection system.
   * When enabled, schedules periodic cleanup of resources.
   * When disabled, cancels all scheduled cleanups.
   */
  set enabled(e) {
    this.enabled !== e && (e ? (this._handler = this._renderer.scheduler.repeat(
      () => {
        this._ready = !0;
      },
      this._frequency,
      !1
    ), this._collectionsHandler = this._renderer.scheduler.repeat(
      () => {
        for (const t of this._managedCollections) {
          const { context: r, collection: s, type: n } = t;
          n === "hash" ? r[s] = Tt(r[s]) : r[s] = yt(r[s]);
        }
      },
      this._frequency
    )) : (this._renderer.scheduler.cancel(this._handler), this._renderer.scheduler.cancel(this._collectionsHandler), this._handler = 0, this._collectionsHandler = 0));
  }
  /**
   * Called before rendering. Updates the current timestamp.
   * @param options - The render options
   * @param options.container - The container to render
   */
  prerender({ container: e }) {
    this.now = performance.now(), e.renderGroup.gcTick = this._renderer.tick++, this._updateInstructionGCTick(e.renderGroup, e.renderGroup.gcTick);
  }
  /** Performs garbage collection after rendering. */
  postrender() {
    !this._ready || !this.enabled || (this.run(), this._ready = !1);
  }
  /**
   * Updates the GC tick counter for a render group and its children.
   * @param renderGroup - The render group to update
   * @param gcTick - The new tick value
   */
  _updateInstructionGCTick(e, t) {
    e.instructionSet.gcTick = t, e.gcTick = t;
    for (const r of e.renderGroupChildren)
      this._updateInstructionGCTick(r, t);
  }
  /**
   * Registers a collection for garbage collection tracking.
   * @param context - The object containing the collection
   * @param collection - The property name on context that holds the collection
   * @param type - The type of collection to track ('hash' or 'array')
   */
  addCollection(e, t, r) {
    this._managedCollections.push({
      context: e,
      collection: t,
      type: r
    });
  }
  /**
   * Registers a resource for garbage collection tracking.
   * @param resource - The resource to track
   * @param type - The type of resource to track
   */
  addResource(e, t) {
    var s, n;
    if (e._gcLastUsed !== -1) {
      e._gcLastUsed = this.now, (s = e._onTouch) == null || s.call(e, this.now);
      return;
    }
    const r = this._managedResources.length;
    e._gcData = {
      index: r,
      type: t
    }, e._gcLastUsed = this.now, (n = e._onTouch) == null || n.call(e, this.now), e.once("unload", this.removeResource, this), this._managedResources.push(e);
  }
  /**
   * Removes a resource from garbage collection tracking.
   * Call this when manually destroying a resource.
   * @param resource - The resource to stop tracking
   */
  removeResource(e) {
    const t = e._gcData;
    if (!t) return;
    const r = t.index, s = this._managedResources.length - 1;
    if (r !== s) {
      const n = this._managedResources[s];
      this._managedResources[r] = n, n._gcData.index = r;
    }
    this._managedResources.length--, e._gcData = null, e._gcLastUsed = -1;
  }
  /**
   * Registers a hash-based resource collection for garbage collection tracking.
   * Resources in the hash will be automatically tracked and cleaned up when unused.
   * @param context - The object containing the hash property
   * @param hash - The property name on context that holds the resource hash
   * @param type - The type of resources in the hash ('resource' or 'renderable')
   * @param priority - Processing priority (lower values are processed first)
   */
  addResourceHash(e, t, r, s = 0) {
    this._managedResourceHashes.push({
      context: e,
      hash: t,
      type: r,
      priority: s
    }), this._managedResourceHashes.sort((n, i) => n.priority - i.priority);
  }
  /**
   * Performs garbage collection by cleaning up unused resources.
   * Removes resources that haven't been used for longer than maxUnusedTime.
   */
  run() {
    const e = performance.now(), t = this._managedResourceHashes;
    for (const s of t)
      this.runOnHash(s, e);
    let r = 0;
    for (let s = 0; s < this._managedResources.length; s++) {
      const n = this._managedResources[s];
      r = this.runOnResource(n, e, r);
    }
    this._managedResources.length = r;
  }
  updateRenderableGCTick(e, t) {
    var n, i;
    const r = e.renderGroup ?? e.parentRenderGroup, s = ((n = r == null ? void 0 : r.instructionSet) == null ? void 0 : n.gcTick) ?? -1;
    ((r == null ? void 0 : r.gcTick) ?? 0) === s && (e._gcLastUsed = t, (i = e._onTouch) == null || i.call(e, t));
  }
  runOnResource(e, t, r) {
    const s = e._gcData;
    return s.type === "renderable" && this.updateRenderableGCTick(e, t), t - e._gcLastUsed < this.maxUnusedTime || !e.autoGarbageCollect ? (this._managedResources[r] = e, s.index = r, r++) : (e.unload(), e._gcData = null, e._gcLastUsed = -1, e.off("unload", this.removeResource, this)), r;
  }
  /**
   * Creates a clone of the hash, copying all non-null entries up to (but not including) the stop key.
   * @param hashValue - The original hash to clone from
   * @param stopKey - The key to stop at (exclusive)
   * @returns A new hash object with copied entries
   */
  _createHashClone(e, t) {
    const r = /* @__PURE__ */ Object.create(null);
    for (const s in e) {
      if (s === t) break;
      e[s] !== null && (r[s] = e[s]);
    }
    return r;
  }
  runOnHash(e, t) {
    var c;
    const { context: r, hash: s, type: n } = e, i = r[s];
    let o = null, d = 0;
    for (const h in i) {
      const u = i[h];
      if (u === null) {
        d++, d === 1e4 && !o && (o = this._createHashClone(i, h));
        continue;
      }
      if (u._gcLastUsed === -1) {
        u._gcLastUsed = t, (c = u._onTouch) == null || c.call(u, t), o && (o[h] = u);
        continue;
      }
      if (n === "renderable" && this.updateRenderableGCTick(u, t), !(t - u._gcLastUsed < this.maxUnusedTime) && u.autoGarbageCollect) {
        if (o || (d + 1 !== 1e4 ? (i[h] = null, d++) : o = this._createHashClone(i, h)), n === "renderable") {
          const _ = u, x = _.renderGroup ?? _.parentRenderGroup;
          x && (x.structureDidChange = !0);
        }
        u.unload(), u._gcData = null, u._gcLastUsed = -1;
      } else o && (o[h] = u);
    }
    o && (r[s] = o);
  }
  /** Cleans up the garbage collection system. Disables GC and removes all tracked resources. */
  destroy() {
    this.enabled = !1, this._managedResources.forEach((e) => {
      e.off("unload", this.removeResource, this);
    }), this._managedResources.length = 0, this._managedResourceHashes.length = 0, this._managedCollections.length = 0, this._renderer = null;
  }
};
Y.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "gc",
  priority: 0
};
Y.defaultOptions = {
  /** Enable/disable the garbage collector */
  gcActive: !0,
  /** Time in ms before an unused resource is collected (default 1 minute) */
  gcMaxUnusedTime: 6e4,
  /** How often to run garbage collection in ms (default 30 seconds) */
  gcFrequency: 3e4
};
let vt = Y;
class Ue {
  constructor(e) {
    this._stackIndex = 0, this._globalUniformDataStack = [], this._uniformsPool = [], this._activeUniforms = [], this._bindGroupPool = [], this._activeBindGroups = [], this._renderer = e;
  }
  reset() {
    this._stackIndex = 0;
    for (let e = 0; e < this._activeUniforms.length; e++)
      this._uniformsPool.push(this._activeUniforms[e]);
    for (let e = 0; e < this._activeBindGroups.length; e++)
      this._bindGroupPool.push(this._activeBindGroups[e]);
    this._activeUniforms.length = 0, this._activeBindGroups.length = 0;
  }
  start(e) {
    this.reset(), this.push(e);
  }
  bind({
    size: e,
    projectionMatrix: t,
    worldTransformMatrix: r,
    worldColor: s,
    offset: n
  }) {
    const i = this._renderer.renderTarget.renderTarget, o = this._stackIndex ? this._globalUniformDataStack[this._stackIndex - 1] : {
      worldTransformMatrix: new m(),
      worldColor: 4294967295,
      offset: new Je()
    }, d = {
      projectionMatrix: t || this._renderer.renderTarget.projectionMatrix,
      resolution: e || i.size,
      worldTransformMatrix: r || o.worldTransformMatrix,
      worldColor: s || o.worldColor,
      offset: n || o.offset,
      bindGroup: null
    }, c = this._uniformsPool.pop() || this._createUniforms();
    this._activeUniforms.push(c);
    const h = c.uniforms;
    h.uProjectionMatrix = d.projectionMatrix, h.uResolution = d.resolution, h.uWorldTransformMatrix.copyFrom(d.worldTransformMatrix), h.uWorldTransformMatrix.tx -= d.offset.x, h.uWorldTransformMatrix.ty -= d.offset.y, Qe(
      d.worldColor,
      h.uWorldColorAlpha,
      0
    ), c.update();
    let u;
    this._renderer.renderPipes.uniformBatch ? u = this._renderer.renderPipes.uniformBatch.getUniformBindGroup(c, !1) : (u = this._bindGroupPool.pop() || new Ze(), this._activeBindGroups.push(u), u.setResource(c, 0)), d.bindGroup = u, this._currentGlobalUniformData = d;
  }
  push(e) {
    this.bind(e), this._globalUniformDataStack[this._stackIndex++] = this._currentGlobalUniformData;
  }
  pop() {
    this._currentGlobalUniformData = this._globalUniformDataStack[--this._stackIndex - 1], this._renderer.type === V.WEBGL && this._currentGlobalUniformData.bindGroup.resources[0].update();
  }
  get bindGroup() {
    return this._currentGlobalUniformData.bindGroup;
  }
  get globalUniformData() {
    return this._currentGlobalUniformData;
  }
  get uniformGroup() {
    return this._currentGlobalUniformData.bindGroup.resources[0];
  }
  _createUniforms() {
    return new oe({
      uProjectionMatrix: { value: new m(), type: "mat3x3<f32>" },
      uWorldTransformMatrix: { value: new m(), type: "mat3x3<f32>" },
      // TODO - someone smart - set this to be a unorm8x4 rather than a vec4<f32>
      uWorldColorAlpha: { value: new Float32Array(4), type: "vec4<f32>" },
      uResolution: { value: [0, 0], type: "vec2<f32>" }
    }, {
      isStatic: !0
    });
  }
  destroy() {
    this._renderer = null, this._globalUniformDataStack.length = 0, this._uniformsPool.length = 0, this._activeUniforms.length = 0, this._bindGroupPool.length = 0, this._activeBindGroups.length = 0, this._currentGlobalUniformData = null;
  }
}
Ue.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "globalUniforms"
};
let Ct = 1;
class Ae {
  constructor() {
    this._tasks = [], this._offset = 0;
  }
  /** Initializes the scheduler system and starts the ticker. */
  init() {
    te.system.add(this._update, this);
  }
  /**
   * Schedules a repeating task.
   * @param func - The function to execute.
   * @param duration - The interval duration in milliseconds.
   * @param useOffset - this will spread out tasks so that they do not all run at the same time
   * @returns The unique identifier for the scheduled task.
   */
  repeat(e, t, r = !0) {
    const s = Ct++;
    let n = 0;
    return r && (this._offset += 1e3, n = this._offset), this._tasks.push({
      func: e,
      duration: t,
      start: performance.now(),
      offset: n,
      last: performance.now(),
      repeat: !0,
      id: s
    }), s;
  }
  /**
   * Cancels a scheduled task.
   * @param id - The unique identifier of the task to cancel.
   */
  cancel(e) {
    for (let t = 0; t < this._tasks.length; t++)
      if (this._tasks[t].id === e) {
        this._tasks.splice(t, 1);
        return;
      }
  }
  /**
   * Updates and executes the scheduled tasks.
   * @private
   */
  _update() {
    const e = performance.now();
    for (let t = 0; t < this._tasks.length; t++) {
      const r = this._tasks[t];
      if (e - r.offset - r.last >= r.duration) {
        const s = e - r.start;
        r.func(s), r.last = e;
      }
    }
  }
  /**
   * Destroys the scheduler system and removes all tasks.
   * @internal
   */
  destroy() {
    te.system.remove(this._update, this), this._tasks.length = 0;
  }
}
Ae.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "scheduler",
  priority: 0
};
let ie = !1;
function kt(a) {
  if (!ie) {
    if (N.get().getNavigator().userAgent.toLowerCase().indexOf("chrome") > -1) {
      const e = [
        `%c  %c  %c  %c  %c PixiJS %c v${re} (${a}) http://www.pixijs.com/

`,
        "background: #E72264; padding:5px 0;",
        "background: #6CA2EA; padding:5px 0;",
        "background: #B5D33D; padding:5px 0;",
        "background: #FED23F; padding:5px 0;",
        "color: #FFFFFF; background: #E72264; padding:5px 0;",
        "color: #E72264; background: #FFFFFF; padding:5px 0;"
      ];
      globalThis.console.log(...e);
    } else globalThis.console && globalThis.console.log(`PixiJS ${re} - ${a} - http://www.pixijs.com/`);
    ie = !0;
  }
}
class X {
  constructor(e) {
    this._renderer = e;
  }
  /**
   * It all starts here! This initiates every system, passing in the options for any system by name.
   * @param options - the config for the renderer and all its systems
   */
  init(e) {
    if (e.hello) {
      let t = this._renderer.name;
      this._renderer.type === V.WEBGL && (t += ` ${this._renderer.context.webGLVersion}`), kt(t);
    }
  }
}
X.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "hello",
  priority: -2
};
X.defaultOptions = {
  /** {@link WebGLOptions.hello} */
  hello: !1
};
const J = class Ie {
  /**
   * Creates a new RenderableGCSystem instance.
   * @param renderer - The renderer this garbage collection system works for
   */
  constructor(e) {
    this._renderer = e;
  }
  /**
   * Initializes the garbage collection system with the provided options.
   * @param options - Configuration options for the renderer
   */
  init(e) {
    e = { ...Ie.defaultOptions, ...e }, this.maxUnusedTime = e.renderableGCMaxUnusedTime;
  }
  /**
   * Gets whether the garbage collection system is currently enabled.
   * @returns True if GC is enabled, false otherwise
   */
  get enabled() {
    return p("8.15.0", "RenderableGCSystem.enabled is deprecated, please use the GCSystem.enabled instead."), this._renderer.gc.enabled;
  }
  /**
   * Enables or disables the garbage collection system.
   * When enabled, schedules periodic cleanup of resources.
   * When disabled, cancels all scheduled cleanups.
   */
  set enabled(e) {
    p("8.15.0", "RenderableGCSystem.enabled is deprecated, please use the GCSystem.enabled instead."), this._renderer.gc.enabled = e;
  }
  /**
   * Adds a hash table to be managed by the garbage collector.
   * @param context - The object containing the hash table
   * @param hash - The property name of the hash table
   */
  addManagedHash(e, t) {
    p("8.15.0", "RenderableGCSystem.addManagedHash is deprecated, please use the GCSystem.addCollection instead."), this._renderer.gc.addCollection(e, t, "hash");
  }
  /**
   * Adds an array to be managed by the garbage collector.
   * @param context - The object containing the array
   * @param hash - The property name of the array
   */
  addManagedArray(e, t) {
    p("8.15.0", "RenderableGCSystem.addManagedArray is deprecated, please use the GCSystem.addCollection instead."), this._renderer.gc.addCollection(e, t, "array");
  }
  /**
   * Starts tracking a renderable for garbage collection.
   * @param _renderable - The renderable to track
   * @deprecated since 8.15.0
   */
  addRenderable(e) {
    p("8.15.0", "RenderableGCSystem.addRenderable is deprecated, please use the GCSystem instead."), this._renderer.gc.addResource(e, "renderable");
  }
  /**
   * Performs garbage collection by cleaning up unused renderables.
   * Removes renderables that haven't been used for longer than maxUnusedTime.
   */
  run() {
    p("8.15.0", "RenderableGCSystem.run is deprecated, please use the GCSystem instead."), this._renderer.gc.run();
  }
  /** Cleans up the garbage collection system. Disables GC and removes all tracked resources. */
  destroy() {
    this._renderer = null;
  }
};
J.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "renderableGC",
  priority: 0
};
J.defaultOptions = {
  /** Enable/disable the garbage collector */
  renderableGCActive: !0,
  /** Time in ms before an unused resource is collected (default 1 minute) */
  renderableGCMaxUnusedTime: 6e4,
  /** How often to run garbage collection in ms (default 30 seconds) */
  renderableGCFrequency: 3e4
};
let Mt = J;
const Q = class R {
  /**
   * Frame count since started.
   * @readonly
   * @deprecated since 8.15.0
   */
  get count() {
    return this._renderer.tick;
  }
  /**
   * Frame count since last garbage collection.
   * @readonly
   * @deprecated since 8.15.0
   */
  get checkCount() {
    return this._checkCount;
  }
  set checkCount(e) {
    p("8.15.0", "TextureGCSystem.run is deprecated, please use the GCSystem instead."), this._checkCount = e;
  }
  /**
   * Maximum idle frames before a texture is destroyed by garbage collection.
   * @see TextureGCSystem.defaultMaxIdle
   * @deprecated since 8.15.0
   */
  get maxIdle() {
    return this._renderer.gc.maxUnusedTime / 1e3 * 60;
  }
  set maxIdle(e) {
    p("8.15.0", "TextureGCSystem.run is deprecated, please use the GCSystem instead."), this._renderer.gc.maxUnusedTime = e / 60 * 1e3;
  }
  /**
   * Frames between two garbage collections.
   * @see TextureGCSystem.defaultCheckCountMax
   * @deprecated since 8.15.0
   */
  // eslint-disable-next-line dot-notation
  get checkCountMax() {
    return Math.floor(this._renderer.gc._frequency / 1e3);
  }
  set checkCountMax(e) {
    p("8.15.0", "TextureGCSystem.run is deprecated, please use the GCSystem instead.");
  }
  /**
   * Current garbage collection mode.
   * @see TextureGCSystem.defaultMode
   * @deprecated since 8.15.0
   */
  get active() {
    return this._renderer.gc.enabled;
  }
  set active(e) {
    p("8.15.0", "TextureGCSystem.run is deprecated, please use the GCSystem instead."), this._renderer.gc.enabled = e;
  }
  /** @param renderer - The renderer this System works for. */
  constructor(e) {
    this._renderer = e, this._checkCount = 0;
  }
  init(e) {
    e.textureGCActive !== R.defaultOptions.textureGCActive && (this.active = e.textureGCActive), e.textureGCMaxIdle !== R.defaultOptions.textureGCMaxIdle && (this.maxIdle = e.textureGCMaxIdle), e.textureGCCheckCountMax !== R.defaultOptions.textureGCCheckCountMax && (this.checkCountMax = e.textureGCCheckCountMax);
  }
  /**
   * Checks to see when the last time a texture was used.
   * If the texture has not been used for a specified amount of time, it will be removed from the GPU.
   * @deprecated since 8.15.0
   */
  run() {
    p("8.15.0", "TextureGCSystem.run is deprecated, please use the GCSystem instead."), this._renderer.gc.run();
  }
  destroy() {
    this._renderer = null;
  }
};
Q.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem
  ],
  name: "textureGC"
};
Q.defaultOptions = {
  /**
   * If set to true, this will enable the garbage collector on the GPU.
   * @default true
   */
  textureGCActive: !0,
  /**
   * @deprecated since 8.3.0
   * @see {@link TextureGCSystemOptions.textureGCMaxIdle}
   */
  textureGCAMaxIdle: null,
  /**
   * The maximum idle frames before a texture is destroyed by garbage collection.
   * @default 60 * 60
   */
  textureGCMaxIdle: 3600,
  /**
   * Frames between two garbage collections.
   * @default 600
   */
  textureGCCheckCountMax: 600
};
let St = Q;
const De = class Ee {
  /**
   * @param [descriptor] - Options for creating a render target.
   */
  constructor(e = {}) {
    if (this.uid = et("renderTarget"), this.colorTextures = [], this.dirtyId = 0, this.isRoot = !1, this._size = new Float32Array(2), this._managedColorTextures = !1, e = { ...Ee.defaultOptions, ...e }, this.stencil = e.stencil, this.depth = e.depth, this.isRoot = e.isRoot, typeof e.colorTextures == "number") {
      this._managedColorTextures = !0;
      for (let t = 0; t < e.colorTextures; t++)
        this.colorTextures.push(
          new y({
            width: e.width,
            height: e.height,
            resolution: e.resolution,
            antialias: e.antialias
          })
        );
    } else {
      this.colorTextures = [...e.colorTextures.map((r) => r.source)];
      const t = this.colorTexture.source;
      this.resize(t.width, t.height, t._resolution);
    }
    this.colorTexture.source.on("resize", this.onSourceResize, this), (e.depthStencilTexture || this.stencil) && (e.depthStencilTexture instanceof f || e.depthStencilTexture instanceof y ? this.depthStencilTexture = e.depthStencilTexture.source : this.ensureDepthStencilTexture());
  }
  get size() {
    const e = this._size;
    return e[0] = this.pixelWidth, e[1] = this.pixelHeight, e;
  }
  get width() {
    return this.colorTexture.source.width;
  }
  get height() {
    return this.colorTexture.source.height;
  }
  get pixelWidth() {
    return this.colorTexture.source.pixelWidth;
  }
  get pixelHeight() {
    return this.colorTexture.source.pixelHeight;
  }
  get resolution() {
    return this.colorTexture.source._resolution;
  }
  get colorTexture() {
    return this.colorTextures[0];
  }
  onSourceResize(e) {
    this.resize(e.width, e.height, e._resolution, !0);
  }
  /**
   * This will ensure a depthStencil texture is created for this render target.
   * Most likely called by the mask system to make sure we have stencil buffer added.
   * @internal
   */
  ensureDepthStencilTexture() {
    this.depthStencilTexture || (this.depthStencilTexture = new y({
      width: this.width,
      height: this.height,
      resolution: this.resolution,
      format: "depth24plus-stencil8",
      autoGenerateMipmaps: !1,
      antialias: !1,
      mipLevelCount: 1
      // sampleCount: handled by the render target system..
    }));
  }
  resize(e, t, r = this.resolution, s = !1) {
    this.dirtyId++, this.colorTextures.forEach((n, i) => {
      s && i === 0 || n.source.resize(e, t, r);
    }), this.depthStencilTexture && this.depthStencilTexture.source.resize(e, t, r);
  }
  destroy() {
    this.colorTexture.source.off("resize", this.onSourceResize, this), this._managedColorTextures && this.colorTextures.forEach((e) => {
      e.destroy();
    }), this.depthStencilTexture && (this.depthStencilTexture.destroy(), delete this.depthStencilTexture);
  }
};
De.defaultOptions = {
  /** the width of the RenderTarget */
  width: 0,
  /** the height of the RenderTarget */
  height: 0,
  /** the resolution of the RenderTarget */
  resolution: 1,
  /** an array of textures, or a number indicating how many color textures there should be */
  colorTextures: 1,
  /** should this render target have a stencil buffer? */
  stencil: !1,
  /** should this render target have a depth buffer? */
  depth: !1,
  /** should this render target be antialiased? */
  antialias: !1,
  // save on perf by default!
  /** is this a root element, true if this is gl context owners render target */
  isRoot: !1
};
let F = De;
const b = /* @__PURE__ */ new Map();
tt.register(b);
function Oe(a, e) {
  if (!b.has(a)) {
    const t = new f({
      source: new O({
        resource: a,
        ...e
      })
    }), r = () => {
      b.get(a) === t && b.delete(a);
    };
    t.once("destroy", r), t.source.once("destroy", r), b.set(a, t);
  }
  return b.get(a);
}
const Z = class Le {
  /**
   * Whether CSS dimensions of canvas view should be resized to screen dimensions automatically.
   * This is only supported for HTMLCanvasElement and will be ignored if the canvas is an OffscreenCanvas.
   * @type {boolean}
   */
  get autoDensity() {
    return this.texture.source.autoDensity;
  }
  set autoDensity(e) {
    this.texture.source.autoDensity = e;
  }
  /** The resolution / device pixel ratio of the renderer. */
  get resolution() {
    return this.texture.source._resolution;
  }
  set resolution(e) {
    this.texture.source.resize(
      this.texture.source.width,
      this.texture.source.height,
      e
    );
  }
  /**
   * initiates the view system
   * @param options - the options for the view
   */
  init(e) {
    e = {
      ...Le.defaultOptions,
      ...e
    }, e.view && (p(rt, "ViewSystem.view has been renamed to ViewSystem.canvas"), e.canvas = e.view), this.screen = new B(0, 0, e.width, e.height), this.canvas = e.canvas || N.get().createCanvas(), this.antialias = !!e.antialias, this.texture = Oe(this.canvas, e), this.renderTarget = new F({
      colorTextures: [this.texture],
      depth: !!e.depth,
      isRoot: !0
    }), this.texture.source.transparent = e.backgroundAlpha < 1, this.resolution = e.resolution;
  }
  /**
   * Resizes the screen and canvas to the specified dimensions.
   * @param desiredScreenWidth - The new width of the screen.
   * @param desiredScreenHeight - The new height of the screen.
   * @param resolution
   */
  resize(e, t, r) {
    this.texture.source.resize(e, t, r), this.screen.width = this.texture.frame.width, this.screen.height = this.texture.frame.height;
  }
  /**
   * Destroys this System and optionally removes the canvas from the dom.
   * @param {options | false} options - The options for destroying the view, or "false".
   * @example
   * viewSystem.destroy();
   * viewSystem.destroy(true);
   * viewSystem.destroy({ removeView: true });
   */
  destroy(e = !1) {
    (typeof e == "boolean" ? e : !!(e != null && e.removeView)) && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this.texture.destroy();
  }
};
Z.extension = {
  type: [
    l.WebGLSystem,
    l.WebGPUSystem,
    l.CanvasSystem
  ],
  name: "view",
  priority: 0
};
Z.defaultOptions = {
  /**
   * {@link WebGLOptions.width}
   * @default 800
   */
  width: 800,
  /**
   * {@link WebGLOptions.height}
   * @default 600
   */
  height: 600,
  /**
   * {@link WebGLOptions.autoDensity}
   * @default false
   */
  autoDensity: !1,
  /**
   * {@link WebGLOptions.antialias}
   * @default false
   */
  antialias: !1
};
let Rt = Z;
const Ut = [
  mt,
  Ue,
  X,
  Rt,
  Re,
  vt,
  St,
  Be,
  gt,
  st,
  Mt,
  Ae
], At = [
  ke,
  _e,
  Ce,
  ve,
  xe,
  Te,
  be,
  ye
];
function wt(a, e, t, r, s, n) {
  const i = n ? 1 : -1;
  return a.identity(), a.a = 1 / r * 2, a.d = i * (1 / s * 2), a.tx = -1 - e * a.a, a.ty = -i - t * a.d, a;
}
function Pt(a) {
  const e = a.colorTexture.source.resource;
  return globalThis.HTMLCanvasElement && e instanceof HTMLCanvasElement && document.body.contains(e);
}
class It {
  constructor(e) {
    this.rootViewPort = new B(), this.viewport = new B(), this.mipLevel = 0, this.layer = 0, this.onRenderTargetChange = new nt("onRenderTargetChange"), this.projectionMatrix = new m(), this.defaultClearColor = [0, 0, 0, 0], this._renderSurfaceToRenderTargetHash = /* @__PURE__ */ new Map(), this._gpuRenderTargetHash = /* @__PURE__ */ Object.create(null), this._renderTargetStack = [], this._renderer = e, e.gc.addCollection(this, "_gpuRenderTargetHash", "hash");
  }
  /** called when dev wants to finish a render pass */
  finishRenderPass() {
    this.adaptor.finishRenderPass(this.renderTarget);
  }
  /**
   * called when the renderer starts to render a scene.
   * @param options
   * @param options.target - the render target to render to
   * @param options.clear - the clear mode to use. Can be true or a CLEAR number 'COLOR | DEPTH | STENCIL' 0b111
   * @param options.clearColor - the color to clear to
   * @param options.frame - the frame to render to
   * @param options.mipLevel - the mip level to render to
   * @param options.layer - The layer of the render target to render to. Used for array or 3D textures, or when rendering
   * to a specific layer of a layered render target. Optional.
   */
  renderStart({
    target: e,
    clear: t,
    clearColor: r,
    frame: s,
    mipLevel: n,
    layer: i
  }) {
    var o, d;
    this._renderTargetStack.length = 0, this.push(
      e,
      t,
      r,
      s,
      n ?? 0,
      i ?? 0
    ), this.rootViewPort.copyFrom(this.viewport), this.rootRenderTarget = this.renderTarget, this.renderingToScreen = Pt(this.rootRenderTarget), (d = (o = this.adaptor).prerender) == null || d.call(o, this.rootRenderTarget);
  }
  postrender() {
    var e, t;
    (t = (e = this.adaptor).postrender) == null || t.call(e, this.rootRenderTarget);
  }
  /**
   * Binding a render surface! This is the main function of the render target system.
   * It will take the RenderSurface (which can be a texture, canvas, or render target) and bind it to the renderer.
   * Once bound all draw calls will be rendered to the render surface.
   *
   * If a frame is not provided and the render surface is a {@link Texture}, the frame of the texture will be used.
   *
   * IMPORTANT:
   * - `frame` is treated as **base mip (mip 0) pixel space**.
   * - When `mipLevel > 0`, the viewport derived from `frame` is scaled by \(2^{mipLevel}\) and clamped to the
   *   mip dimensions. This keeps "render the same region" semantics consistent across mip levels.
   * - When `renderSurface` is a {@link Texture}, `renderer.render({ container, target: texture, mipLevel })` will
   *   render into
   *   the underlying {@link TextureSource} (Pixi will create/use a {@link RenderTarget} for the source) using the
   *   texture's frame to define the region (in mip 0 space).
   * @param renderSurface - the render surface to bind
   * @param clear - the clear mode to use. Can be true or a CLEAR number 'COLOR | DEPTH | STENCIL' 0b111
   * @param clearColor - the color to clear to
   * @param frame - the frame to render to
   * @param mipLevel - the mip level to render to
   * @param layer - the layer (or slice) of the render surface to render to. For array textures,
   * 3D textures, or cubemaps, this specifies the target layer or face. Defaults to 0 (the first layer/face).
   * Ignored for surfaces that do not support layers.
   * @returns the render target that was bound
   */
  bind(e, t = !0, r, s, n = 0, i = 0) {
    const o = this.getRenderTarget(e), d = this.renderTarget !== o;
    this.renderTarget = o, this.renderSurface = e;
    const c = this.getGpuRenderTarget(o);
    (o.pixelWidth !== c.width || o.pixelHeight !== c.height) && (this.adaptor.resizeGpuRenderTarget(o), c.width = o.pixelWidth, c.height = o.pixelHeight);
    const h = o.colorTexture, u = this.viewport, G = h.arrayLayerCount || 1;
    if ((i | 0) !== i && (i |= 0), i < 0 || i >= G)
      throw new Error(`[RenderTargetSystem] layer ${i} is out of bounds (arrayLayerCount=${G}).`);
    this.mipLevel = n | 0, this.layer = i | 0;
    const _ = Math.max(h.pixelWidth >> n, 1), x = Math.max(h.pixelHeight >> n, 1);
    if (!s && e instanceof f && (s = e.frame), s) {
      const C = h._resolution, k = 1 << Math.max(n | 0, 0), He = s.x * C + 0.5 | 0, Fe = s.y * C + 0.5 | 0, We = s.width * C + 0.5 | 0, ze = s.height * C + 0.5 | 0;
      let M = Math.floor(He / k), S = Math.floor(Fe / k), U = Math.ceil(We / k), A = Math.ceil(ze / k);
      M = Math.min(Math.max(M, 0), _ - 1), S = Math.min(Math.max(S, 0), x - 1), U = Math.min(Math.max(U, 1), _ - M), A = Math.min(Math.max(A, 1), x - S), u.x = M, u.y = S, u.width = U, u.height = A;
    } else
      u.x = 0, u.y = 0, u.width = _, u.height = x;
    return wt(
      this.projectionMatrix,
      0,
      0,
      u.width / h.resolution,
      u.height / h.resolution,
      !o.isRoot
    ), this.adaptor.startRenderPass(o, t, r, u, n, i), d && this.onRenderTargetChange.emit(o), o;
  }
  clear(e, t = D.ALL, r, s = this.mipLevel, n = this.layer) {
    t && (e && (e = this.getRenderTarget(e)), this.adaptor.clear(
      e || this.renderTarget,
      t,
      r,
      this.viewport,
      s,
      n
    ));
  }
  contextChange() {
    this._gpuRenderTargetHash = /* @__PURE__ */ Object.create(null);
  }
  /**
   * Push a render surface to the renderer. This will bind the render surface to the renderer,
   * @param renderSurface - the render surface to push
   * @param clear - the clear mode to use. Can be true or a CLEAR number 'COLOR | DEPTH | STENCIL' 0b111
   * @param clearColor - the color to clear to
   * @param frame - the frame to use when rendering to the render surface
   * @param mipLevel - the mip level to render to
   * @param layer - The layer of the render surface to render to. For array textures or cube maps, this specifies
   * which layer or face to target. Defaults to 0 (the first layer).
   */
  push(e, t = D.ALL, r, s, n = 0, i = 0) {
    const o = this.bind(e, t, r, s, n, i);
    return this._renderTargetStack.push({
      renderTarget: o,
      frame: s,
      mipLevel: n,
      layer: i
    }), o;
  }
  /** Pops the current render target from the renderer and restores the previous render target. */
  pop() {
    this._renderTargetStack.pop();
    const e = this._renderTargetStack[this._renderTargetStack.length - 1];
    this.bind(
      e.renderTarget,
      !1,
      null,
      e.frame,
      e.mipLevel,
      e.layer
    );
  }
  /**
   * Gets the render target from the provide render surface. Eg if its a texture,
   * it will return the render target for the texture.
   * If its a render target, it will return the same render target.
   * @param renderSurface - the render surface to get the render target for
   * @returns the render target for the render surface
   */
  getRenderTarget(e) {
    return e.isTexture && (e = e.source), this._renderSurfaceToRenderTargetHash.get(e) ?? this._initRenderTarget(e);
  }
  /**
   * Copies a render surface to another texture.
   *
   * NOTE:
   * for sourceRenderSurfaceTexture, The render target must be something that is written too by the renderer
   *
   * The following is not valid:
   * @example
   * const canvas = document.createElement('canvas')
   * canvas.width = 200;
   * canvas.height = 200;
   *
   * const ctx = canvas2.getContext('2d')!
   * ctx.fillStyle = 'red'
   * ctx.fillRect(0, 0, 200, 200);
   *
   * const texture = RenderTexture.create({
   *   width: 200,
   *   height: 200,
   * })
   * const renderTarget = renderer.renderTarget.getRenderTarget(canvas2);
   *
   * renderer.renderTarget.copyToTexture(renderTarget,texture, {x:0,y:0},{width:200,height:200},{x:0,y:0});
   *
   * The best way to copy a canvas is to create a texture from it. Then render with that.
   *
   * Parsing in a RenderTarget canvas context (with a 2d context)
   * @param sourceRenderSurfaceTexture - the render surface to copy from
   * @param {Texture} destinationTexture - the texture to copy to
   * @param {object} originSrc - the origin of the copy
   * @param {number} originSrc.x - the x origin of the copy
   * @param {number} originSrc.y - the y origin of the copy
   * @param {object} size - the size of the copy
   * @param {number} size.width - the width of the copy
   * @param {number} size.height - the height of the copy
   * @param {object} originDest - the destination origin (top left to paste from!)
   * @param {number} originDest.x - the x origin of the paste
   * @param {number} originDest.y - the y origin of the paste
   */
  copyToTexture(e, t, r, s, n) {
    r.x < 0 && (s.width += r.x, n.x -= r.x, r.x = 0), r.y < 0 && (s.height += r.y, n.y -= r.y, r.y = 0);
    const { pixelWidth: i, pixelHeight: o } = e;
    return s.width = Math.min(s.width, i - r.x), s.height = Math.min(s.height, o - r.y), this.adaptor.copyToTexture(
      e,
      t,
      r,
      s,
      n
    );
  }
  /**
   * ensures that we have a depth stencil buffer available to render to
   * This is used by the mask system to make sure we have a stencil buffer.
   */
  ensureDepthStencil() {
    this.renderTarget.stencil || (this.renderTarget.stencil = !0, this.adaptor.startRenderPass(this.renderTarget, !1, null, this.viewport, 0, this.layer));
  }
  /** nukes the render target system */
  destroy() {
    this._renderer = null, this._renderSurfaceToRenderTargetHash.forEach((e, t) => {
      e !== t && e.destroy();
    }), this._renderSurfaceToRenderTargetHash.clear(), this._gpuRenderTargetHash = /* @__PURE__ */ Object.create(null);
  }
  _initRenderTarget(e) {
    let t = null;
    return O.test(e) && (e = Oe(e).source), e instanceof F ? t = e : e instanceof y && (t = new F({
      colorTextures: [e]
    }), e.source instanceof O && (t.isRoot = !0), e.once("destroy", () => {
      t.destroy(), this._renderSurfaceToRenderTargetHash.delete(e);
      const r = this._gpuRenderTargetHash[t.uid];
      r && (this._gpuRenderTargetHash[t.uid] = null, this.adaptor.destroyGpuRenderTarget(r));
    })), this._renderSurfaceToRenderTargetHash.set(e, t), t;
  }
  getGpuRenderTarget(e) {
    return this._gpuRenderTargetHash[e.uid] || (this._gpuRenderTargetHash[e.uid] = this.adaptor.initGpuRenderTarget(e));
  }
  resetState() {
    this.renderTarget = null, this.renderSurface = null;
  }
}
export {
  xe as A,
  ke as B,
  ye as C,
  It as R,
  Ut as S,
  _e as a,
  Ce as b,
  ve as c,
  At as d
};
