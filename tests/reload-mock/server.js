// Reloading mock of an ESIC-like PostBack form, to test the step-cursor resume.
// One in-memory session. GET / renders the form; POST / (form.submit on a
// PostBack field) updates state + re-renders — the browser replaces the
// document (load fires) → the resume runner picks up the cursor + continues.
const STATES = { Gujarat: ["Surat", "Amreli District"], Maharashtra: ["Mumbai", "Pune"] }
const DISP = { Gujarat: ["D1", "D2"], Maharashtra: ["D3"] }
const state = { name: "", state: "", district: "", dispState: "", dispList: "", language: "" }

function render() {
  const stateOpts = Object.keys(STATES).map((s) => `<option value="${s}" ${state.state === s ? "selected" : ""}>${s}</option>`).join("")
  const distOpts = state.state ? STATES[state.state].map((d) => `<option value="${d}" ${state.district === d ? "selected" : ""}>${d}</option>`).join("") : ""
  const dispStateOpts = Object.keys(STATES).map((s) => `<option value="${s}" ${state.dispState === s ? "selected" : ""}>${s}</option>`).join("")
  const dispListOpts = state.dispState ? DISP[state.dispState].map((d) => `<option value="${d}" ${state.dispList === d ? "selected" : ""}>${d}</option>`).join("") : ""
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Reload Mock</title>
<style>body{font:13px sans-serif;padding:14px}#log{position:fixed;right:8px;top:8px;width:440px;max-height:92vh;overflow:auto;background:#111;color:#9fe;padding:8px;font:11px monospace;border-radius:6px}</style></head>
<body>
<div id="log">runner log:<br></div>
<h1>PostBack Reload Mock (tests the step-cursor resume)</h1>
<form id="f" method="POST" action="/">
  <div><label>Name: </label><input type="text" id="name" name="name" value="${state.name}"></div>
  <div><label>State (PostBack): </label><select id="state" name="state" onchange="this.form.submit()"><option value="">--Select--</option>${stateOpts}</select> <span class="code">statecode=<b id="statecode">${state.state || "(empty)"}</b></span></div>
  <div><label>District: </label><select id="district" name="district"><option value="">--Select--</option>${distOpts}</select> <span class="code">distcode=<b id="distcode">${state.district || "(empty)"}</b></span></div>
  <div><label>DispState (PostBack): </label><select id="dispState" name="dispState" onchange="this.form.submit()"><option value="">--Select--</option>${dispStateOpts}</select></div>
  <div><label>DispList: </label><select id="dispList" name="dispList"><option value="">--Select--</option>${dispListOpts}</select></div>
  <div><label>Language (plain): </label><select id="language" name="language"><option value="">--Select--</option><option value="Hindi">Hindi</option><option value="English">English</option></select></div>
</form>
<hr><button onclick="startPlan()">▶ Start fill plan</button>

<script>
// ─── fake-chrome (localStorage-backed, persists across reloads) ─────
window.chrome = window.chrome || {};
(function(){
  const NS = "esic_";
  function readAll(){ const o={}; for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i); if(k && k.startsWith(NS)){ try{ o[k.slice(NS.length)]=JSON.parse(localStorage.getItem(k)); }catch{}}} return o; }
  chrome.storage = { local: {
    get: (keys) => new Promise((res) => { const all=readAll(); if(!keys) return res(all); const want=Array.isArray(keys)?keys:(typeof keys==="string"?[keys]:Object.keys(keys||{})); const out={}; want.forEach(k=>{ if(k in all) out[k]=all[k]; }); res(out); }),
    set: (obj) => new Promise((res) => { Object.keys(obj||{}).forEach(k=>{ const v=obj[k]; if(v===null||v===undefined) localStorage.removeItem(NS+k); else localStorage.setItem(NS+k, JSON.stringify(v)); }); res(); }),
  }};
  chrome.runtime = { sendMessage:()=>{}, onMessage:{addListener:()=>{}}, getManifest:()=>({version:"test"}) };
})();
function rlog(m){ const el=document.getElementById("log"); if(el) el.innerHTML += m+"<br>"; console.log(m); const arr=JSON.parse(localStorage.getItem("esic_plog")||"[]"); arr.push(m); localStorage.setItem("esic_plog", JSON.stringify(arr)); }

// ─── generic step-cursor resume runner ──────────────────────────────
window.__plans = {};
window.registerPlan = (id, plan) => { window.__plans[id] = plan; };
async function getCursor(){ const c = await chrome.storage.local.get("cursor"); return c.cursor; }
async function setCursor(c){ return chrome.storage.local.set({cursor: c}); }

async function runPlan(planId){
  let cursor = await getCursor();
  if(!cursor || cursor.planId !== planId){ cursor = {planId, stepIndex:0, attempts:0}; }
  const plan = window.__plans[planId];
  if(!plan){ rlog("[runner] no plan "+planId); return; }
  for(let i = cursor.stepIndex; i < plan.length; i++){
    const step = plan[i];
    if(step.postback){ cursor.stepIndex = i+1; await setCursor(cursor); rlog("[runner] step "+i+": "+step.name+" — POSTBACK (persist cursor="+cursor.stepIndex+", run, then wait for reload)"); }
    else { rlog("[runner] step "+i+": "+step.name); }
    const triggered = await step.run();
    if(step.postback && triggered){ rlog("[runner] postback triggered → returning (reload will resume)"); return; }
    cursor.stepIndex = i+1; await setCursor(cursor);
  }
  rlog("[runner] ✓ PLAN COMPLETE — all fields filled");
  await setCursor(null);
  window.__resumeDone = true;
}
async function resume(){
  const cursor = await getCursor();
  if(!cursor){ rlog("[runner] load: no active cursor"); return; }
  rlog("[runner] load: resume planId="+cursor.planId+" stepIndex="+cursor.stepIndex);
  await runPlan(cursor.planId);
}
window.runPlan = runPlan;
window.resume = resume;
rlog("[runner] script loaded; readyState="+document.readyState);
if(document.readyState==="complete"||document.readyState==="interactive") setTimeout(resume,150);
else document.addEventListener("DOMContentLoaded", ()=>setTimeout(resume,150));
window.addEventListener("pageshow", (e)=>{ if(e.persisted) setTimeout(resume,150); });  // only on back/forward (persisted) — initial load fires DOMContentLoaded resume

// ─── the plan for this mock form ────────────────────────────────────
const $ = (id) => document.getElementById(id);
function setText(id,v){ const e=$(id); if(!e) return false; if(e.value===String(v)){ rlog("  skip "+id+" (already)"); return false; } e.value=String(v); e.dispatchEvent(new Event("change",{bubbles:true})); rlog("  set "+id+"="+v); return true; }
function setSel(id,v){ const e=$(id); if(!e) return false; if(e.value===String(v)){ rlog("  skip "+id+" (already)"); return false; }
  // find option by value or text
  for(const o of e.options){ if(o.value===String(v)||o.text===String(v)){ e.value=o.value; e.dispatchEvent(new Event("change",{bubbles:true})); rlog("  set "+id+"="+o.value); return true; } }
  rlog("  SELECTION NOT APPLIED "+id+": "+v+" not in ["+Array.from(e.options).slice(0,5).map(o=>o.value).join(",")+"]"); return false;
}
registerPlan("mock-form", [
  { name: "setName",        run: async () => setText("name","KISHAN") },
  { name: "setState(postback)", postback: true, run: async () => setSel("state","Gujarat") },     // onchange=submit → reload
  { name: "setDistrict",    run: async () => setSel("district","Surat") },
  { name: "setDispState(postback)", postback: true, run: async () => setSel("dispState","Gujarat") }, // reload
  { name: "setDispList",    run: async () => setSel("dispList","D1") },
  { name: "setLanguage",    run: async () => setSel("language","Hindi") },
]);
async function startPlan(){ rlog("=== START ==="); await setCursor(null); await runPlan("mock-form"); }
</script>
</body></html>`;
}

Bun.serve({
  port: 3009,
  async fetch(req) {
    if (req.method === "POST") {
      const form = new URLSearchParams(await req.text());
      for (const k of Object.keys(state)) if (form.has(k)) state[k] = form.get(k);
      return new Response(render(), { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return new Response(render(), { headers: { "Content-Type": "text/html; charset=utf-8" } });
  },
});
console.log("reload-mock server on http://localhost:3009");
