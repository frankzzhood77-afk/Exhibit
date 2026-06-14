import React, { useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Syne:wght@700;800&family=Sacramento&display=swap');
.ft-scope{
  --silk:#FCFBF7; --panel:#EAE7E0; --ink:#211E19; --ink-soft:#8C877D;
  --line:#DDD9CF; --line-soft:#E5E1D8; --opt:#F8F6F1; --opt-on:#E2DED4;
  --shadow:rgba(50,42,30,.08);
  --grot:'Archivo','Helvetica Neue',-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;
  --syne:'Syne',var(--grot);
  --script:'Sacramento',cursive;
  font-family:var(--grot);color:var(--ink);-webkit-font-smoothing:antialiased;
  background:radial-gradient(130% 70% at 50% -12%, #FFFFFD 0%, rgba(255,255,253,0) 55%), var(--silk);
  min-height:100%;padding:34px 16px 48px;
}
.ft-scope *{box-sizing:border-box;}
.ft-wrap{max-width:418px;margin:0 auto;}

.ft-hero{margin:6px 4px 28px;}
.ft-kick{font-weight:600;font-size:10px;letter-spacing:3px;color:var(--ink-soft);text-transform:uppercase;}
.ft-bigtitle{font-weight:800;font-size:clamp(34px,9.5vw,44px);line-height:1.04;
  letter-spacing:-.5px;text-transform:uppercase;color:var(--ink);margin:14px 0 0;}
.ft-rule{display:block;height:1px;background:var(--ink);margin-top:20px;width:0;
  animation:grow 1.6s .3s cubic-bezier(.2,.7,.2,1) forwards;}
@keyframes grow{to{width:64px}}
.ft-sub{margin-top:18px;color:var(--ink-soft);font-size:13px;max-width:340px;line-height:1.75;letter-spacing:.2px;}

.ft-card{background:var(--panel);border:1px solid var(--line-soft);border-radius:16px;
  padding:26px 22px;box-shadow:0 16px 40px -28px var(--shadow);}
.ft-step-h{display:flex;flex-direction:column;gap:9px;margin-bottom:20px;}
.ft-step-n{font-weight:600;font-size:10.5px;letter-spacing:2px;color:var(--ink-soft);text-transform:uppercase;}
.ft-step-q{font-weight:600;font-size:20px;letter-spacing:.2px;}
.ft-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;}
.ft-grid.tri{grid-template-columns:repeat(3,1fr);}
.ft-opt{border:1px solid var(--line);background:var(--opt);border-radius:12px;
  padding:14px;text-align:left;cursor:pointer;transition:.18s;font:inherit;color:inherit;}
.ft-opt:hover{border-color:var(--ink-soft);transform:translateY(-1px);}
.ft-opt.on{border-color:var(--ink);background:var(--opt-on);box-shadow:0 0 0 1.5px rgba(33,30,25,.16);}
.ft-opt .e{font-size:20px;display:block;margin-bottom:8px;line-height:1;}
.ft-opt .t{font-weight:600;font-size:14px;letter-spacing:.3px;}
.ft-opt .d{font-size:11px;color:var(--ink-soft);margin-top:3px;letter-spacing:.2px;}

.ft-field{display:flex;flex-direction:column;gap:8px;}
.ft-input{border:1px solid var(--line);border-radius:12px;padding:15px 16px;
  font:inherit;font-size:16px;background:var(--opt);outline:none;transition:.18s;letter-spacing:.3px;}
.ft-input:focus{border-color:var(--ink);box-shadow:0 0 0 1.5px rgba(33,30,25,.14);}
.ft-temp{display:flex;align-items:center;gap:14px;}
.ft-temp input[type=range]{flex:1;accent-color:var(--ink);}
.ft-temp .val{font-family:var(--syne);font-weight:800;font-size:32px;min-width:72px;
  text-align:right;color:var(--ink);letter-spacing:-.5px;}

.ft-row{display:flex;gap:10px;margin-top:22px;}
.ft-btn{flex:1;border:none;border-radius:12px;padding:14px;font:inherit;font-weight:600;
  font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:.18s;}
.ft-btn.primary{background:var(--ink);color:var(--silk);box-shadow:0 12px 24px -16px rgba(33,30,25,.5);}
.ft-btn.primary:hover{background:#000;}
.ft-btn.primary:disabled{opacity:.3;cursor:not-allowed;box-shadow:none;}
.ft-btn.ghost{background:transparent;border:1px solid var(--line);color:var(--ink-soft);flex:0 0 auto;padding:14px 18px;}
.ft-dots{display:flex;gap:6px;justify-content:center;margin-top:22px;}
.ft-dot{width:6px;height:6px;border-radius:50%;background:var(--line);transition:.2s;}
.ft-dot.on{background:var(--ink);width:18px;border-radius:5px;}

.ft-load{display:flex;flex-direction:column;align-items:center;gap:30px;padding:34px 10px 30px;}
.ft-write-stage{position:relative;display:inline-block;height:74px;}
.ft-write{font-family:var(--script);font-size:72px;line-height:1;color:var(--ink);
  white-space:nowrap;clip-path:inset(0 100% 0 0);animation:write 3.4s cubic-bezier(.55,.08,.32,1) infinite;}
@keyframes write{
  0%{clip-path:inset(0 100% 0 0);opacity:0} 8%{opacity:1}
  46%{clip-path:inset(0 0 0 0);opacity:1} 74%{clip-path:inset(0 0 0 0);opacity:1}
  86%{clip-path:inset(0 0 0 0);opacity:0} 100%{clip-path:inset(0 100% 0 0);opacity:0}
}
.ft-write-line{position:absolute;left:4px;right:6px;bottom:4px;height:1px;background:var(--ink);
  transform:scaleX(0);transform-origin:left;animation:penline 3.4s cubic-bezier(.55,.08,.32,1) infinite;}
@keyframes penline{
  0%{transform:scaleX(0);opacity:0} 8%{opacity:.55}
  46%{transform:scaleX(1);opacity:.55} 74%{transform:scaleX(1);opacity:.55}
  86%{transform:scaleX(1);opacity:0} 100%{transform:scaleX(0);opacity:0}
}
.ft-steps-l{display:flex;flex-direction:column;gap:10px;width:100%;max-width:250px;}
.ft-steps-l div{font-size:12px;color:#BCB6AA;font-weight:500;transition:.4s;display:flex;gap:9px;
  align-items:center;letter-spacing:.5px;}
.ft-steps-l div::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--line);}
.ft-steps-l div.on{color:var(--ink);}
.ft-steps-l div.on::before{background:var(--ink);box-shadow:0 0 0 4px rgba(33,30,25,.1);}

.ft-meta{font-weight:600;font-size:10.5px;color:var(--ink-soft);letter-spacing:2px;text-transform:uppercase;}
.ft-reading{font-size:15px;line-height:1.9;margin:14px 0 4px;letter-spacing:.3px;color:var(--ink);}
.ft-block{margin-top:26px;}
.ft-block-t{font-weight:600;font-size:10.5px;letter-spacing:2.5px;color:var(--ink-soft);
  text-transform:uppercase;margin-bottom:13px;display:flex;align-items:center;gap:9px;}
.ft-logic{background:var(--opt);border-left:2px solid var(--ink);border-radius:0 10px 10px 0;
  padding:15px 17px;font-size:13.5px;line-height:1.8;color:var(--ink);letter-spacing:.3px;}

.ft-flat{position:relative;background:radial-gradient(120% 95% at 50% 40%,#F9F7F1,#E7E4DC);
  border-radius:14px;height:240px;overflow:hidden;}
.ft-flat img{position:absolute;object-fit:contain;filter:drop-shadow(0 5px 7px rgba(58,53,44,.16));}
.ft-flat .ph{position:absolute;border-radius:10px;opacity:.4;}

.ft-pal{display:flex;gap:7px;}
.ft-sw{flex:1;height:50px;border-radius:9px;border:1px solid rgba(0,0,0,.04);position:relative;}
.ft-sw span{position:absolute;left:7px;bottom:6px;font-size:9px;font-weight:600;
  color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.4);letter-spacing:.4px;}

.ft-item{display:flex;align-items:center;gap:13px;padding:13px 0;border-bottom:1px solid var(--line-soft);}
.ft-item:last-child{border-bottom:none;}
.ft-chip{width:32px;height:32px;border-radius:7px;flex:0 0 auto;border:1px solid rgba(0,0,0,.04);}
.ft-item .cat{font-size:9.5px;color:var(--ink-soft);font-weight:600;letter-spacing:1px;text-transform:uppercase;}
.ft-item .nm{font-size:14px;font-weight:500;letter-spacing:.3px;margin-top:2px;}
.ft-item .br{margin-left:auto;font-size:11px;color:var(--ink);font-weight:600;
  background:var(--opt);border:1px solid var(--line);padding:4px 11px;border-radius:6px;white-space:nowrap;letter-spacing:.3px;}

.ft-soft{border:1px solid var(--line);border-radius:12px;padding:16px;background:var(--opt);}
.ft-soft .nm{font-weight:600;font-size:15.5px;letter-spacing:.4px;}
.ft-arearow{display:flex;align-items:center;gap:9px;margin-top:6px;flex-wrap:wrap;}
.ft-soft .area{font-size:11.5px;color:var(--ink-soft);font-weight:500;letter-spacing:.3px;}
.ft-mapbtn{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:600;
  letter-spacing:1.5px;text-transform:uppercase;color:var(--silk);background:var(--ink);
  padding:5px 11px;border-radius:20px;text-decoration:none;transition:.18s;white-space:nowrap;}
.ft-mapbtn:hover{background:#000;}
.ft-soft .ds{font-size:13px;color:var(--ink-soft);line-height:1.75;margin-top:9px;letter-spacing:.2px;}
.ft-line{display:flex;align-items:center;gap:10px;}
.ft-linebadge{font-weight:600;font-size:12.5px;color:#fff;padding:5px 13px;border-radius:20px;white-space:nowrap;letter-spacing:.5px;}
.ft-persona{background:var(--ink);color:#EAE6DD;border-radius:13px;padding:22px;position:relative;overflow:hidden;}
.ft-persona .tag{font-weight:600;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#A9A294;}
.ft-persona .ln{font-size:15.5px;line-height:1.7;font-weight:400;margin-top:11px;letter-spacing:.4px;}

.ft-err{background:var(--opt);border:1px solid var(--line);color:var(--ink);border-radius:12px;
  padding:14px 16px;font-size:14px;line-height:1.7;margin-top:14px;letter-spacing:.3px;}
.ft-foot{text-align:center;color:#BCB6AA;font-size:10px;line-height:1.9;margin-top:30px;letter-spacing:.4px;}
`;

const GENDERS = [
  { k: "male", e: "♂", t: "男" },
  { k: "female", e: "♀", t: "女" },
  { k: "neutral", e: "⚥", t: "中性" },
];
const SCENES = [
  { k: "约会", e: "🌹", d: "想留下好印象" },
  { k: "朋友聚会 / 逛街", e: "🛍️", d: "轻松又出片" },
  { k: "上班 / 工作", e: "💼", d: "得体不死板" },
  { k: "正式场合", e: "🥂", d: "晚宴 / 面试" },
  { k: "运动健身", e: "🏋️", d: "好动好排汗" },
  { k: "看展 / 观影", e: "🖼️", d: "安静有腔调" },
  { k: "旅行 / 出游", e: "✈️", d: "舒适又上镜" },
  { k: "日常通勤", e: "🚇", d: "省心万能款" },
];
const VIBES = [
  { k: "极简冷淡", e: "🤍" }, { k: "街头机能", e: "🛹" },
  { k: "复古文艺", e: "🎞️" }, { k: "清爽通勤", e: "👔" },
  { k: "暗黑前卫", e: "🖤" }, { k: "运动休闲", e: "👟" },
  { k: "甜酷反差", e: "🎀" }, { k: "随性松弛", e: "🌿" },
];
const VIBES_F = [
  { k: "法式优雅", e: "🤍" }, { k: "甜美少女", e: "🎀" },
  { k: "复古文艺", e: "🎞️" }, { k: "知性通勤", e: "👜" },
  { k: "性感魅力", e: "💋" }, { k: "清新自然", e: "🌷" },
  { k: "酷飒中性", e: "🖤" }, { k: "慵懒松弛", e: "☁️" },
];
const VIBES_N = [
  { k: "极简冷淡", e: "🤍" }, { k: "中性机能", e: "🧊" },
  { k: "复古文艺", e: "🎞️" }, { k: "简约通勤", e: "👔" },
  { k: "暗黑前卫", e: "🖤" }, { k: "运动休闲", e: "👟" },
  { k: "工装硬朗", e: "🧰" }, { k: "松弛慵懒", e: "🌿" },
];
const LOAD_STEPS = ["读懂场景与温度", "对照当下流行趋势", "推演配色与廓形", "挑本地美食与线路", "取单品图"];

export default function App() {
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(18);
  const [scene, setScene] = useState("");
  const [vibe, setVibe] = useState("");
  const [status, setStatus] = useState("form");
  const [loadIdx, setLoadIdx] = useState(0);
  const [data, setData] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const total = 5;
  const canNext =
    (step === 0 && gender) || (step === 1 && city.trim()) || step === 2 ||
    (step === 3 && scene) || (step === 4 && vibe);

  function parseJSON(raw) {
    let t = String(raw).trim().replace(/```json/gi, "").replace(/```/g, "").trim();
    const a = t.indexOf("{"); const b = t.lastIndexOf("}");
    if (a !== -1 && b !== -1) t = t.slice(a, b + 1);
    t = t.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(t);
  }

  async function generate() {
    setStatus("loading"); setLoadIdx(0); setErrMsg("");
    const timer = setInterval(() => setLoadIdx((i) => (i < LOAD_STEPS.length - 1 ? i + 1 : i)), 1400);
    const payload = { gender: GENDERS.find((g) => g.k === gender)?.t || gender, city, temp, scene, vibe };

    let lastErr = "";
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const resp = await fetch("/.netlify/functions/outfit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const json = await resp.json();
        if (json.error) { lastErr = json.error; if (resp.status === 429) break; continue; }
        const parsed = parseJSON(json.text || "");
        if (parsed && Array.isArray(parsed.items) && parsed.items.length) {
          clearInterval(timer); setData(parsed); setStatus("done"); return;
        }
        lastErr = "返回内容不完整";
      } catch (e) { lastErr = (e && e.message) || "解析失败"; }
    }
    clearInterval(timer); setErrMsg(lastErr); setStatus("error");
  }

  function reset() { setStatus("form"); setStep(0); setData(null); }

  function mapUrl(food) {
    const q = [food.name, food.area, city].filter(Boolean).join(" ");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  // ── 廓形映射：真实无背景单品图（本地真图 → Twemoji 透明图 → 占位）──
  function FlatLay({ items, palette }) {
    const pal = (palette || []).map((p) => p.hex);
    const find = (kw) => (items || []).find((it) => kw.some((k) => (it.category || "").includes(k)));
    const c = (it, i) => it?.color || pal[i % (pal.length || 1)] || "#C9C4B8";

    const coat = find(["外套", "夹克", "大衣", "风衣", "西装"]);
    const top = find(["上装", "针织", "毛衣", "T恤", "衬", "卫衣"]) || (items && items[0]) || {};
    const bottom = find(["下装", "裤", "裙"]) || {};
    const shoes = find(["鞋", "靴"]) || {};
    const bag = find(["包", "配饰"]);

    const twe = (code) => `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code}.svg`;
    const local = (slug) => `/items/${slug}.png`;

    const pick = (it, cat) => {
      const n = (it && (it.name || "")) || "";
      const has = (re) => re.test(n);
      if (cat === "coat") return { slug: "coat", code: "1f9e5" };
      if (cat === "top") {
        if (has(/衬衫|衬衣/)) return { slug: "shirt", code: "1f454" };
        if (has(/连衣裙|裙/)) return { slug: "dress", code: "1f457" };
        return { slug: "top", code: "1f455" };
      }
      if (cat === "bottom") {
        if (has(/裙/)) return { slug: "skirt", code: "1f457" };
        if (has(/短裤/)) return { slug: "shorts", code: "1fa73" };
        return { slug: "trousers", code: "1f456" };
      }
      if (cat === "shoes") {
        if (has(/高跟|细跟/)) return { slug: "heels", code: "1f460" };
        if (has(/靴/)) return { slug: "boots", code: "1f462" };
        if (has(/皮鞋|德比|乐福|正装/)) return { slug: "derby", code: "1f45e" };
        return { slug: "sneakers", code: "1f45f" };
      }
      if (cat === "bag") {
        if (has(/双肩|背包/)) return { slug: "backpack", code: "1f392" };
        if (has(/斜挎|链条|手拿/)) return { slug: "crossbody", code: "1f45b" };
        return { slug: "tote", code: "1f45c" };
      }
      return { slug: "item", code: "1f455" };
    };

    function Piece({ it, cat, style, flip }) {
      const [i, setI] = useState(0);
      if (!it) return null;
      const p = pick(it, cat);
      const srcs = [local(p.slug), twe(p.code)];
      if (i >= srcs.length) return <div className="ph" style={{ ...style, height: "30%", background: it.color || c(it, 0) }} />;
      return <img src={srcs[i]} alt="" loading="lazy" onError={() => setI(i + 1)}
        style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }} />;
    }

    return (
      <div className="ft-flat">
        <Piece it={coat} cat="coat" style={{ left: "3%", top: "8%", width: "39%" }} />
        <Piece it={top} cat="top" style={{ right: "4%", top: "6%", width: "32%" }} />
        <Piece it={bottom} cat="bottom" style={{ left: "34%", top: "38%", width: "32%" }} />
        <Piece it={bag} cat="bag" style={{ left: "4%", bottom: "5%", width: "26%" }} />
        <Piece it={shoes} cat="shoes" style={{ right: "22%", bottom: "8%", width: "19%" }} />
        <Piece it={shoes} cat="shoes" style={{ right: "4%", bottom: "5%", width: "19%" }} flip />
      </div>
    );
  }

  const vibeList = gender === "female" ? VIBES_F : gender === "neutral" ? VIBES_N : VIBES;

  return (
    <div className="ft-scope">
      <style>{CSS}</style>
      <div className="ft-wrap">
        <div className="ft-hero">
          <div className="ft-kick">Today's Look</div>
          <h1 className="ft-bigtitle">The Daily Exhibit</h1>
          <span className="ft-rule" />
          <p className="ft-sub">告诉我你在哪、多少度、去干嘛、想要什么调性——给你一套从配色到出行的完整今日方案。</p>
        </div>

        {status === "form" && (
          <div className="ft-card">
            {step === 0 && (<>
              <div className="ft-step-h"><span className="ft-step-n">[ FIGURE / 性别 ]</span><span className="ft-step-q">今天你是什么性别？</span></div>
              <div className="ft-grid tri">
                {GENDERS.map((g) => (
                  <button key={g.k} className={"ft-opt" + (gender === g.k ? " on" : "")} onClick={() => { setGender(g.k); setVibe(""); }}>
                    <span className="e">{g.e}</span><span className="t">{g.t}</span>
                  </button>
                ))}
              </div>
            </>)}
            {step === 1 && (<>
              <div className="ft-step-h"><span className="ft-step-n">[ SITE / 地点 ]</span><span className="ft-step-q">你在哪座城市？</span></div>
              <div className="ft-field"><input className="ft-input" placeholder="例如：墨尔本、上海、东京…" value={city} onChange={(e) => setCity(e.target.value)} /></div>
            </>)}
            {step === 2 && (<>
              <div className="ft-step-h"><span className="ft-step-n">[ CLIMATE / 气象 ]</span><span className="ft-step-q">现在大概多少度？</span></div>
              <div className="ft-temp"><input type="range" min={-5} max={40} value={temp} onChange={(e) => setTemp(+e.target.value)} /><span className="val">{temp}°</span></div>
            </>)}
            {step === 3 && (<>
              <div className="ft-step-h"><span className="ft-step-n">[ SCHEMA / 场景 ]</span><span className="ft-step-q">今天去干嘛？</span></div>
              <div className="ft-grid">
                {SCENES.map((s) => (
                  <button key={s.k} className={"ft-opt" + (scene === s.k ? " on" : "")} onClick={() => setScene(s.k)}>
                    <span className="e">{s.e}</span><span className="t">{s.k}</span><span className="d">{s.d}</span>
                  </button>
                ))}
              </div>
            </>)}
            {step === 4 && (<>
              <div className="ft-step-h"><span className="ft-step-n">[ TONE / 调性 ]</span><span className="ft-step-q">想要什么调性？</span></div>
              <div className="ft-grid">
                {vibeList.map((v) => (
                  <button key={v.k} className={"ft-opt" + (vibe === v.k ? " on" : "")} onClick={() => setVibe(v.k)}>
                    <span className="e">{v.e}</span><span className="t">{v.k}</span>
                  </button>
                ))}
              </div>
            </>)}

            <div className="ft-row">
              {step > 0 && <button className="ft-btn ghost" onClick={() => setStep(step - 1)}>Back</button>}
              {step < total - 1
                ? <button className="ft-btn primary" disabled={!canNext} onClick={() => setStep(step + 1)}>Next</button>
                : <button className="ft-btn primary" disabled={!canNext} onClick={generate}>[ Launch Curation / 发布策展 ]</button>}
            </div>
            <div className="ft-dots">
              {Array.from({ length: total }).map((_, i) => (<span key={i} className={"ft-dot" + (i === step ? " on" : "")} />))}
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="ft-card">
            <div className="ft-load">
              <div className="ft-write-stage"><div className="ft-write">style</div><div className="ft-write-line" /></div>
              <div className="ft-steps-l">{LOAD_STEPS.map((s, i) => (<div key={i} className={i <= loadIdx ? "on" : ""}>{s}</div>))}</div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="ft-card">
            <div className="ft-err">{errMsg || "稍等再来一次吧。"}</div>
            <div className="ft-row">
              <button className="ft-btn ghost" onClick={reset}>Restart</button>
              <button className="ft-btn primary" onClick={generate}>Retry</button>
            </div>
          </div>
        )}

        {status === "done" && data && (
          <div className="ft-card">
            <div className="ft-meta">{city} · {temp}° · {scene} · {vibe}</div>
            <p className="ft-reading">{data.reading}</p>

            {Array.isArray(data.palette) && data.palette.length > 0 && (
              <div className="ft-block">
                <div className="ft-block-t">Palette · 今日配色板</div>
                <div className="ft-pal">{data.palette.map((p, i) => (<div key={i} className="ft-sw" style={{ background: p.hex }}><span>{p.name}</span></div>))}</div>
              </div>
            )}

            <div className="ft-block">
              <div className="ft-block-t">Silhouette Mapping · 廓形映射</div>
              <FlatLay items={data.items} palette={data.palette} />
            </div>

            <div className="ft-block">
              <div className="ft-block-t">The Pieces · 单品清单</div>
              {data.items.map((it, i) => (
                <div className="ft-item" key={i}>
                  <span className="ft-chip" style={{ background: it.color || "#C9C4B8" }} />
                  <div><div className="cat">{it.category}</div><div className="nm">{it.name}</div></div>
                  {it.brand && <span className="br">{it.brand}</span>}
                </div>
              ))}
            </div>

            {data.logic && (
              <div className="ft-block">
                <div className="ft-block-t">The Why · 穿搭解读</div>
                <div className="ft-logic">{data.logic}</div>
              </div>
            )}

            {data.food && (
              <div className="ft-block">
                <div className="ft-block-t">Gastronomic Parallel · 烹饪平行线</div>
                <div className="ft-soft">
                  <div className="nm">{data.food.name}</div>
                  <div className="ft-arearow">
                    {data.food.area && <span className="area">📍 {data.food.area}</span>}
                    <a className="ft-mapbtn" href={mapUrl(data.food)} target="_blank" rel="noopener noreferrer">Open Map ↗</a>
                  </div>
                  {data.food.desc && <div className="ds">{data.food.desc}</div>}
                </div>
              </div>
            )}

            {data.transit && (
              <div className="ft-block">
                <div className="ft-block-t">Transit · 今日出行</div>
                <div className="ft-soft">
                  <div className="ft-line">
                    <span className="nm">{data.transit.mode}</span>
                    {data.transit.line && <span className="ft-linebadge" style={{ background: data.transit.lineColor || "#211E19" }}>{data.transit.line}</span>}
                  </div>
                  {data.transit.why && <div className="ds">{data.transit.why}</div>}
                </div>
              </div>
            )}

            {data.persona && (
              <div className="ft-block">
                <div className="ft-persona">
                  <div className="tag">Today's Persona</div>
                  <div className="ln">{data.persona}</div>
                </div>
              </div>
            )}

            <div className="ft-row">
              <button className="ft-btn ghost" onClick={reset}>Reset</button>
              <button className="ft-btn primary" onClick={generate}>[ Re-curate / 换一套 ]</button>
            </div>
          </div>
        )}

        <div className="ft-foot">
          全球城市 · −5～40° · 8 类场景 · 8 种风格<br />
          含配色板 / 品牌 / 美食 / 出行建议 · 内容由 AI 生成，仅供参考
        </div>
      </div>
    </div>
  );
}
