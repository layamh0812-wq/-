/* ================= 实战演练（靶场） =================
   全部为浏览器内本地模拟，无真实网络攻击行为。 */

const LABS = [
  { id: "pwd", title: "🔐 实验一：密码强度检测器", desc: "输入密码，实时分析强度。理解为什么弱密码几秒就能被爆破。" },
  { id: "codec", title: "🧩 实验二：CTF 编解码工具箱", desc: "Base64 / Hex / ROT13 / 凯撒密码 编解码与破解，CTF Misc 入门必备。" },
  { id: "sqli", title: "💉 实验三：SQL 注入模拟靶场", desc: "在模拟登录页亲手注入绕过登录，再用参数化查询修复漏洞（本地模拟，无真实攻击）。" },
  { id: "xss", title: "⚡ 实验四：XSS 沙箱演示", desc: "在隔离沙箱中观察 XSS payload 如何被渲染与执行，学会输出编码防御。" },
  { id: "scan", title: "📡 实验五：端口扫描模拟器", desc: "对虚拟靶机执行模拟端口扫描，理解扫描原理、节奏与告警日志。" },
  { id: "ctf", title: "🚩 实验六：CTF 挑战（3 关）", desc: "编解码 → 日志取证 → 密码审计，全部通过即可领取 flag。" },
];

let ctfState = { 1: false, 2: false, 3: false };

function renderLabsPage() {
  return `<h2 class="page-title">🧪 实战演练靶场</h2>
  <p class="page-sub">全部实验在浏览器本地沙箱中运行，不发起任何真实网络攻击。完成每个实验点亮技能。</p>` +
  LABS.map(l => {
    const fn = LAB_RENDER[l.id];
    return `<div class="lab" id="lab-${l.id}">
      <h3>${l.title}</h3><p class="desc">${l.desc}</p>${fn()}
    </div>`;
  }).join("");
}

const LAB_RENDER = {

/* ---------- 密码强度 ---------- */
pwd: () => `
  <input type="password" id="pwdInput" placeholder="输入密码试试（如 123456 / abc / Admin@2026）" oninput="checkPwd(this.value)">
  <div class="strength-meter"><div id="pwdBar"></div></div>
  <div class="gauge-row" id="pwdChecks"></div>
  <div class="out" id="pwdOut">等待输入…</div>`,

/* ---------- 编解码 ---------- */
codec: () => `
  <textarea id="codecIn" placeholder="输入要转换的内容"></textarea>
  <div class="chip-inputs">
    <button onclick="codecDo('b64e')">Base64 编码</button>
    <button onclick="codecDo('b64d')">Base64 解码</button>
    <button onclick="codecDo('hexe')">转 HEX</button>
    <button onclick="codecDo('hexd')">HEX 还原</button>
    <button onclick="codecDo('rot13')">ROT13</button>
    <button onclick="codecDo('caesar')">凯撒破解(穷举25位)</button>
  </div>
  <div class="out" id="codecOut">结果将显示在这里</div>`,

/* ---------- SQL 注入模拟 ---------- */
sqli: () => `
  <div class="grid2">
    <div>
      <p style="color:var(--muted);font-size:13px">① 模拟登录页（存在漏洞的写法：SQL 字符串直接拼接）</p>
      <div class="mock-site">
        <p style="font-weight:bold;margin-bottom:8px">🧱 漏洞版登录</p>
        <input type="text" id="sqliUser" placeholder="用户名">
        <input type="password" id="sqliPass" placeholder="密码">
        <button onclick="sqliTry(false)">登录</button>
      </div>
      <div class="out" id="sqliOutVuln">后端伪代码：SELECT * FROM users WHERE user='输入' AND pass='输入'</div>
    </div>
    <div>
      <p style="color:var(--muted);font-size:13px">② 修复版（参数化查询，注入无效）</p>
      <div class="mock-site">
        <p style="font-weight:bold;margin-bottom:8px">🛡️ 安全版登录</p>
        <input type="text" id="sqliUser2" placeholder="用户名">
        <input type="password" id="sqliPass2" placeholder="密码">
        <button onclick="sqliTry(true)">登录</button>
      </div>
      <div class="out" id="sqliOutSafe">后端伪代码：SELECT * FROM users WHERE user=? AND pass=?</div>
    </div>
  </div>
  <div class="legend">💡 试试用户名输入 <code style="color:var(--accent)">' OR '1'='1</code>，密码随便填，观察两边的区别。模拟账号：admin / admin123</div>`,

/* ---------- XSS 沙箱 ---------- */
xss: () => `
  <p style="color:var(--muted);font-size:13px">模拟评论区。沙箱内 JS 已被拦截为演示输出，不会真正执行。</p>
  <div class="grid2">
    <div>
      <p style="font-weight:bold;margin-bottom:6px">🧱 未转义渲染</p>
      <textarea id="xssIn" placeholder="输入评论，比如 &lt;img src=x onerror=alert(1)&gt;">&lt;img src=x onerror=alert('XSS!')&gt;</textarea>
      <button onclick="xssTry()">发布评论</button>
      <div class="mock-site" style="margin-top:10px" id="xssRenderVuln"></div>
    </div>
    <div>
      <p style="font-weight:bold;margin-bottom:6px">🛡️ 输出编码后渲染</p>
      <div class="mock-site" id="xssRenderSafe" style="margin-top:52px"></div>
      <div class="legend">右侧将标签转义为纯文本显示，攻击代码失效——这就是「输出编码」防御。</div>
    </div>
  </div>
  <div class="out" id="xssLog">等待提交…</div>`,

/* ---------- 端口扫描模拟 ---------- */
scan: () => `
  <p style="color:var(--muted);font-size:13px">虚拟靶机 target.lab（192.168.56.10），内置若干服务。点开始执行模拟扫描。</p>
  <div class="chip-inputs">
    <select id="scanType" style="width:auto">
      <option value="syn">SYN 半开扫描（隐蔽）</option>
      <option value="tcp">全连接扫描（易被记录）</option>
    </select>
    <button onclick="runScan()">▶ 开始扫描</button>
  </div>
  <div class="out" id="scanOut">[模拟扫描器] 就绪。选择扫描类型后开始。</div>
  <div class="legend">观察：全连接扫描会在靶机日志留下大量连接记录，SYN 扫描日志较少——这就是隐蔽性差异。</div>`,

/* ---------- CTF 挑战 ---------- */
ctf: () => `
  <div class="quiz-q"><h4>第 1 关 · 编解码</h4>
    <p style="font-size:14px;margin-bottom:8px">解码： <code>ZmxhZ3tiYXNlNjRfbWFzdGVyfQ==</code> （提示：Base64，答案格式 flag{xxx}）</p>
    <input type="text" id="ctf1" placeholder="flag{...}">
    <button onclick="ctfCheck(1)">提交</button>
    <span id="ctfR1"></span>
  </div>
  <div class="quiz-q"><h4>第 2 关 · 日志取证</h4>
    <p style="font-size:14px;margin-bottom:8px">日志中哪台 IP 在爆破登录？（输入 IP）<br>
    <code style="font-size:12px">Failed login from 8.8.4.4 user=root × 1<br>Failed login from 203.0.113.7 user=admin × 47<br>Failed login from 203.0.113.7 user=root × 53</code></p>
    <input type="text" id="ctf2" placeholder="x.x.x.x">
    <button onclick="ctfCheck(2)">提交</button>
    <span id="ctfR2"></span>
  </div>
  <div class="quiz-q"><h4>第 3 关 · 密码审计</h4>
    <p style="font-size:14px;margin-bottom:8px">以下哪个密码对彩虹表攻击最安全？ A) P@ssw0rd  B) Tr9#kQ$vLm2!  C) admin2026  D) Qwerty123!</p>
    <input type="text" id="ctf3" placeholder="A / B / C / D">
    <button onclick="ctfCheck(3)">提交</button>
    <span id="ctfR3"></span>
  </div>
  <div class="score-bar" id="ctfResult" style="display:none">
    <span style="font-size:26px">🎉</span><div><b>全部通关！</b><p style="color:var(--muted);font-size:13px">你的 flag：<code class="flag-ok">flag{y0u_4re_5tup3d_0r_wh4t_n0_y0u_4re_pr0}</code> — 记得把这份坚持用在正道上 😉</p></div>
  </div>`,
};

/* ================= 实验逻辑 ================= */
function el(id){ return document.getElementById(id); }

function checkPwd(v){
  const checks = [
    ["长度≥8", v.length >= 8],
    ["含大写", /[A-Z]/.test(v)],
    ["含小写", /[a-z]/.test(v)],
    ["含数字", /[0-9]/.test(v)],
    ["含符号", /[^A-Za-z0-9]/.test(v)],
    ["非纯常见词", !/^(123456|password|admin|qwerty|abc123)/i.test(v)],
  ];
  const score = checks.filter(c=>c[1]).length;
  const bar = el("pwdBar"), color = score<=2 ? "var(--red)" : score<=4 ? "var(--yellow)" : "var(--green)";
  bar.style.width = (score/6*100)+"%"; bar.style.background = color;
  el("pwdChecks").innerHTML = checks.map(c=>`<span class="${c[1]?'on':''}">${c[0]}</span>`).join("");
  const crack = score<=2 ? "秒级" : score<=4 ? "数小时~数天" : "数百年级";
  el("pwdOut").textContent = `强度评分 ${score}/6 → 离线暴力破解预估：${crack}（GPU 每秒百亿次 MD5 假设）`;
}

function codecDo(mode){
  const v = el("codecIn").value, out = el("codecOut");
  try{
    let r = "";
    if(mode==="b64e") r = btoa(unescape(encodeURIComponent(v)));
    else if(mode==="b64d") r = decodeURIComponent(escape(atob(v.trim())));
    else if(mode==="hexe") r = [...new TextEncoder().encode(v)].map(b=>b.toString(16).padStart(2,"0")).join(" ");
    else if(mode==="hexd") r = new TextDecoder().decode(new Uint8Array(v.trim().split(/\s+/).map(h=>parseInt(h,16))));
    else if(mode==="rot13") r = v.replace(/[a-zA-Z]/g, c=>String.fromCharCode((c<="Z"?90:122) >= (c=c.charCodeAt(0)+13) ? c : c-26));
    else if(mode==="caesar"){
      const lines=[];
      for(let k=1;k<26;k++){
        const d = v.replace(/[a-zA-Z]/g, c=>{
          const base = c<="Z"?65:97;
          return String.fromCharCode((c.charCodeAt(0)-base+26-k)%26+base);
        });
        if(/flag|the|is|key|pass/i.test(d)) lines.push(`✅ k=${k}: ${d}`);
      }
      r = lines.length ? lines.join("\n") : "未识别出可读词，试输出若干：\n" +
        [3,7,13].map(k=>"k="+k+": "+v.replace(/[a-zA-Z]/g,c=>{const b=c<="Z"?65:97;return String.fromCharCode((c.charCodeAt(0)-b+26-k)%26+b)})).join("\n");
    }
    out.textContent = r;
  }catch(e){ out.textContent = "❌ 转换失败：输入格式不正确（"+e.message+"）"; }
}

function sqliTry(safe){
  const u = el(safe?"sqliUser2":"sqliUser").value;
  const p = el(safe?"sqliPass2":"sqliPass").value;
  const out = el(safe?"sqliOutSafe":"sqliOutVuln");
  if(safe){
    // 参数化：输入整体作为字符串匹配
    const ok = u==="admin" && p==="admin123";
    out.textContent = (ok ? "✅ 登录成功，欢迎 admin" : "❌ 用户名或密码错误") + "\n[参数化查询] 输入被当作纯文本处理，注入无效。";
    return;
  }
  const sql = `SELECT * FROM users WHERE user='${u}' AND pass='${p}'`;
  const injected = /'\s*or\s*'1'\s*=\s*'1/i.test(u) || /'\s*or\s*'1'\s*=\s*'1/i.test(p);
  if(injected){
    out.innerHTML = `<span class="injected">🚨 注入成功！SQL 变为恒真条件，绕过登录返回全部用户。</span>\n实际执行的 SQL：\n${sql}\n❗ 漏洞根因：用户输入被直接拼进 SQL。修复 = 参数化查询。`;
  } else {
    const ok = u==="admin" && p==="admin123";
    out.textContent = (ok ? "✅ 登录成功，欢迎 admin" : "❌ 用户名或密码错误") + `\n实际执行的 SQL：\n${sql}`;
  }
}

function xssTry(){
  const v = el("xssIn").value;
  el("xssRenderVuln").innerHTML = `评论（未转义）：${v}`;   // 沙箱演示：真注入但当前浏览器上下文无害
  const safe = v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  el("xssRenderSafe").innerHTML = `评论（已转义）：${safe}`;
  el("xssLog").textContent =
`提交内容: ${v}
[未转义侧] HTML 原样插入 DOM → onerror 等事件属性会被浏览器执行 → 攻击者可窃取 Cookie。
[已转义侧] < > " 被编码为 &lt; &gt; &quot; → 浏览器当纯文本显示 → 攻击失效。
防御清单：输出编码 + CSP + Cookie HttpOnly。`;
}

function runScan(){
  const type = el("scanType").value, out = el("scanOut");
  const services = [[21,"ftp"],[22,"ssh"],[80,"http"],[443,"https"],[3306,"mysql"],[3389,"rdp"]];
  const open = [21,22,80,443,3306];
  out.textContent = `[${type==="syn"?"SYN 半开":"全连接"}扫描] 目标 target.lab (192.168.56.10) 扫描中…\n`;
  let i = 0;
  const timer = setInterval(()=>{
    if(i>=services.length){
      clearInterval(timer);
      out.textContent += `\n结论：开放端口 ${open.join(", ")}\n` +
        (type==="tcp" ? "靶机日志：记录到 6 次 connect() 连接（暴露明显）⚠️" : "靶机日志：无完整连接记录（较隐蔽）✅");
      return;
    }
    const [p,n] = services[i++];
    out.textContent += `端口 ${p}/${n} : ${open.includes(p)?"开放 ✅":"关闭 ✖"}\n`;
    out.scrollTop = out.scrollHeight;
  }, 260);
}

function ctfCheck(n){
  const v = el("ctf"+n).value.trim();
  const r = el("ctfR"+n);
  const answers = {
    1: () => { try{ return atob("ZmxhZ3tiYXNlNjRfbWFzdGVyfQ==").toLowerCase() === v.toLowerCase(); }catch(e){return false;} },
    2: () => v === "203.0.113.7",
    3: () => v.toUpperCase() === "B",
  };
  if(answers[n]()){
    r.innerHTML = `<span class="flag-ok">✓ 正确</span>`;
    ctfState[n] = true;
  } else {
    r.innerHTML = `<span style="color:var(--red)">✗ 再想想</span>`;
    ctfState[n] = false;
  }
  if(ctfState[1]&&ctfState[2]&&ctfState[3]) el("ctfResult").style.display = "flex";
}
