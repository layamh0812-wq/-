/* ================= 应用主逻辑 ================= */

const PAGES = [
  { id: "home",     icon: "🏠", name: "首页",       group: "总览" },
  { id: "roadmap",  icon: "🗺️", name: "学习路线",   group: "总览" },
  { id: "sec",      icon: "🛡️", name: "网络安全课", group: "课程", type: "course" },
  { id: "py",       icon: "🐍", name: "Python 课",  group: "课程", type: "course" },
  { id: "videos",   icon: "🎬", name: "视频教程",   group: "学习" },
  { id: "labs",     icon: "🧪", name: "实战演练",   group: "学习" },
  { id: "quiz",     icon: "📝", name: "测验中心",   group: "学习" },
  { id: "notes",    icon: "📔", name: "我的笔记",   group: "我的" },
];

let currentPage = "home";
const STORE_KEY = "cyber_academy_v1";
let state = loadState();

function loadState(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || { done: [], quiz: null, notes: "" }; }
  catch(e){ return { done: [], quiz: null, notes: "" }; }
}
function saveState(){ localStorage.setItem(STORE_KEY, JSON.stringify(state)); refreshProgress(); }

/* ---------- 导航 ---------- */
function buildNav(){
  const nav = document.getElementById("nav");
  let html = "", lastGroup = "";
  PAGES.forEach(p=>{
    if(p.group !== lastGroup){ html += `<div class="nav-group">${p.group}</div>`; lastGroup = p.group; }
    const done = p.type === "course" ? isCourseDone(p.id) : null;
    html += `<div class="nav-item" data-page="${p.id}" onclick="go('${p.id}')">
      <span>${p.icon}</span><span>${p.name}</span>${done===true?'<span class="done-dot">●</span>':""}
    </div>`;
  });
  nav.innerHTML = html;
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active", n.dataset.page===currentPage));
}

function go(page){
  currentPage = page;
  try{ if(("#"+page) !== location.hash) history.replaceState(null,"","#"+page); }catch(e){}
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active", n.dataset.page===page));
  window.scrollTo(0,0);
  if(page==="home") renderHome();
  else if(page==="roadmap") renderRoadmap();
  else if(page==="videos") renderVideos();
  else if(page==="labs") renderMain(renderLabsPage());
  else if(page==="quiz") renderQuiz();
  else if(page==="notes") renderNotes();
  else renderMain(renderCourse(page));
  buildNav();
}

function renderMain(html){ document.getElementById("main").innerHTML = html; }
function renderVideos(){ renderMain(videoPageHTML()); bindVideoCards(); }
function renderHome(){ renderMain(homeHTML()); }
function renderRoadmap(){ renderMain(roadmapHTML()); }
function renderNotes(){ renderMain(notesHTML()); }

/* ---------- 首页 ---------- */
function homeHTML(){
  const doneCount = state.done.length;
  const totalLessons = COURSES.reduce((s,c)=>s+c.chapters.reduce((a,ch)=>a+ch.lessons.length,0), 0);
  const pct = totalLessons ? Math.round(doneCount/totalLessons*100) : 0;
  return `
  <div class="hero">
    <h2>🛡️ 网安学院 · 从 0 到精通</h2>
    <p>一套完整的网络安全 + Python 学习系统：图文课程 → 视频教程 → 本地实战靶场 → 测验闯关。<br>
    ✅ 已接入 <b>B 站小迪安全 88 天全套视频课</b>：每节带「▶视频」标记的课时，打开即内嵌播放对应分 P，无需搜索；「网络安全课·第七章」为小迪课程文字版精讲。<br>
    学习进度自动保存在浏览器中，随时回来继续。学习所有攻防技术请务必遵守法律，只在授权与靶场环境中练习。</p>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn primary" onclick="go('roadmap')">🗺️ 查看学习路线</button>
      <button class="btn" onclick="go('labs')">🧪 进入实战靶场</button>
      <button class="btn" onclick="go('videos')">🎬 视频教程</button>
    </div>
  </div>
  <div class="score-bar">
    <div class="score-big">${pct}%</div>
    <div><b>当前总进度</b><p class="page-sub" style="margin:0">已完成 ${doneCount} / ${totalLessons} 节课</p></div>
  </div>
  <div class="cards">
    ${COURSES.map(c=>{
      const t = c.chapters.reduce((a,ch)=>a+ch.lessons.length,0);
      const d = c.chapters.reduce((a,ch)=>a+ch.lessons.filter(l=>state.done.includes(c.id+"/"+l.title)).length,0);
      return `<div class="card" onclick="go('${c.id}')">
        <h3>${c.icon} ${c.title}</h3><p>${c.desc}</p>
        <div class="meta">${d}/${t} 节完成 · ${c.chapters.length} 个章节</div>
      </div>`;
    }).join("")}
    <div class="card" onclick="go('labs')"><h3>🧪 实战演练靶场</h3><p>SQL 注入模拟、XSS 沙箱、端口扫描模拟、CTF 三关挑战——浏览器内安全演练。</p><div class="meta">6 个交互实验</div></div>
    <div class="card" onclick="go('quiz')"><h3>📝 测验中心</h3><p>${QUIZZES.length} 道精选题，覆盖网络、Web 安全、密码学与 Python，检验学习成果。</p><div class="meta">${state.quiz?`上次得分 ${state.quiz.score} 分`:"尚未测验"}</div></div>
  </div>`;
}

/* ---------- 学习路线 ---------- */
function roadmapHTML(){
  const steps = [
    { icon:"1️⃣", t:"第 1~2 周 · 打地基", d:"完成「Python 编程」第一、二章 + 「网络安全」第一章。理解变量、循环、条件，以及 TCP/IP、HTTP、法律红线。每天 1~2 小时。" },
    { icon:"2️⃣", t:"第 3~4 周 · 数据与网络", d:"Python 数据结构、函数模块 + 网络安全信息收集章。在实战演练里做编解码与密码强度实验。" },
    { icon:"3️⃣", t:"第 5~7 周 · Web 安全核心", d:"学完 Web 十大漏洞章，每学一个漏洞就去靶场实验对应模拟（SQL 注入、XSS）。同时用 Python 的 requests 写第一个目录探测脚本。" },
    { icon:"4️⃣", t:"第 8~9 周 · 密码学与认证", d:"加密、哈希、加盐、Session/JWT。用 hashlib/base64 写编解码工具箱 CLI。" },
    { icon:"5️⃣", t:"第 10~11 周 · 攻防进阶", d:"社会工程学、应急响应、加固清单；搭建 DVWA/Vulhub 本地靶场，跟随视频教程实操。" },
    { icon:"6️⃣", t:"第 12 周 · 毕业实战", d:"Python 实战项目三连：弱口令检测器、日志分析告警、CLI 工具箱。完成 CTF 三关挑战 + 测验中心 80 分以上 → 从 0 到精通达成 🎓" },
  ];
  return `<h2 class="page-title">🗺️ 12 周学习路线</h2>
  <p class="page-sub">按顺序推进，每周学新课时回头做实验巩固。打勾表示该阶段所有课程完成。</p>
  ${steps.map(s=>`<div class="roadmap-step">
    <div class="roadmap-line"><div class="roadmap-dot">${s.icon}</div></div>
    <div class="roadmap-body"><h4>${s.t}</h4><p>${s.d}</p></div>
  </div>`).join("")}`;
}

/* ---------- 课程页 ---------- */
function renderCourse(courseId){
  const c = COURSES.find(x=>x.id===courseId);
  const chs = c.chapters.map((ch,ci)=>{
    const items = ch.lessons.map((l,li)=>{
      const key = c.id+"/"+l.title;
      return `<div class="lesson-item ${state.done.includes(key)?"done":""}" onclick="openLesson('${c.id}',${ci},${li})">
        <span class="num">${state.done.includes(key)?"✓":li+1}</span>
        <span>${l.title}${(l.video||XIAODI_MAP[c.id+"/"+l.title])?' <span style="color:var(--accent);font-size:11px">▶视频</span>':""}</span><span class="dur">${l.dur}</span>
      </div>`;
    }).join("");
    return `<div class="chapter ${ci===0?"open":""}" onclick="toggleChapter(event)">
      <div class="chapter-head"><span class="chev">▶</span><h3>${ch.title}</h3>
      <span class="tag">${ch.lessons.length} 节</span></div>
      <div class="lesson-list">${items}</div>
    </div>`;
  }).join("");
  return `<h2 class="page-title">${c.icon} ${c.title}</h2>
  <p class="page-sub">${c.desc}</p>${chs}`;
}
function toggleChapter(e){
  const head = e.target.closest(".chapter-head");
  if(head) head.parentElement.classList.toggle("open");
}

/* ---------- B 站视频注入 ---------- */
function bilibiliEmbed(bvid, page, height){
  return `<div class="video-embed open" style="aspect-ratio:16/9;display:block;background:#000;border-radius:8px;overflow:hidden;${height?"":""}">
    <iframe src="https://player.bilibili.com/player.html?bvid=${bvid}&page=${page||1}&autoplay=0&high_quality=1&danmaku=0"
      allowfullscreen scrolling="no" frameborder="no" referrerpolicy="no-referrer"></iframe></div>`;
}
function lessonVideoBlock(cid, title, lesson){
  const page = lesson.video || XIAODI_MAP[cid+"/"+title];
  if(!page) return "";
  return `<div class="lesson-video">
    <h4>🎬 配套视频 · 小迪安全公开课 第 ${page} 天（P${page}）</h4>
    ${bilibiliEmbed(XD_BV, page)}
    <p class="legend">播放器内可切换该系列全部 88 个分 P。文字版为本应用整理的听课精讲，与视频对照学习。</p>
  </div>`;
}

/* ---------- 课程弹层 ---------- */
let currentLesson = null;
function openLesson(cid, ci, li){
  const c = COURSES.find(x=>x.id===cid);
  const l = c.chapters[ci].lessons[li];
  currentLesson = { cid, title: l.title, key: cid+"/"+l.title };
  document.getElementById("lessonTitle").textContent = l.title;
  document.getElementById("lessonBody").innerHTML = l.content + lessonVideoBlock(cid, l.title, l);
  const done = state.done.includes(currentLesson.key);
  document.getElementById("markDoneBtn").disabled = done;
  document.getElementById("markDoneBtn").textContent = done ? "✓ 已完成" : "✓ 完成本课";
  document.getElementById("lessonModal").classList.remove("hidden");
}
function closeLesson(){ document.getElementById("lessonModal").classList.add("hidden"); }
function markLessonDone(){
  if(!currentLesson) return;
  if(!state.done.includes(currentLesson.key)) state.done.push(currentLesson.key);
  saveState();
  document.getElementById("markDoneBtn").disabled = true;
  document.getElementById("markDoneBtn").textContent = "✓ 已完成";
  go(currentPage);
  openLesson(currentLesson.cid,
    COURSES.find(x=>x.id===currentLesson.cid).chapters.findIndex(ch=>ch.lessons.some(l=>l.title===currentLesson.title)),
    COURSES.find(x=>x.id===currentLesson.cid).chapters.find(ch=>ch.lessons.some(l=>l.title===currentLesson.title)).lessons.findIndex(l=>l.title===currentLesson.title));
}
function isCourseDone(cid){
  const c = COURSES.find(x=>x.id===cid);
  return c.chapters.every(ch=>ch.lessons.every(l=>state.done.includes(cid+"/"+l.title)));
}

/* ---------- 视频页 ---------- */
function videoPageHTML(){
  return `<h2 class="page-title">🎬 视频教程</h2>
  <p class="page-sub">全部为已验证的 B 站真实课程，页面加载即内嵌播放（可直接切换分 P）。课程每节课右侧也注入了对应的小迪安全分 P。</p>
  ${VIDEOS.map((v,i)=>`
  <div class="video-card open" data-idx="${i}">
    <div class="vhead"><span>▶</span><h4>${v.title}</h4><span class="tag">${v.level}</span></div>
    ${bilibiliEmbed(v.bvid, v.page)}
    <div style="padding:8px 18px 14px;color:var(--muted);font-size:12.5px">💡 ${v.note}</div>
  </div>`).join("")}`;
}
function bindVideoCards(){}

/* ---------- 测验 ---------- */
let quizAnswers = [];
function renderQuiz(){
  const last = state.quiz;
  quizAnswers = new Array(QUIZZES.length).fill(-1);
  renderMain(`<h2 class="page-title">📝 测验中心</h2>
  <p class="page-sub">共 ${QUIZZES.length} 题，答完点「提交测验」。${last?`上次成绩：<b style="color:var(--accent)">${last.score} 分</b>（${last.date}）`:""}</p>
  ${QUIZZES.map((q,i)=>`<div class="quiz-q" id="qz-${i}">
    <h4>${i+1}. ${q.q}<span class="badge wait" id="badge-${i}">待答</span></h4>
    ${q.opts.map((o,oi)=>`<div class="quiz-opt" data-oi="${oi}" onclick="pickOpt(${i},${oi},event)">${String.fromCharCode(65+oi)}. ${o}</div>`).join("")}
  </div>`).join("")}
  <div style="display:flex;gap:10px;align-items:center">
    <button class="btn primary" onclick="submitQuiz()">提交测验</button>
    <button class="btn" onclick="go('quiz')">重新作答</button>
  </div>`);
}
function pickOpt(qi, oi, ev){
  quizAnswers[qi] = oi;
  document.querySelectorAll(`#qz-${qi} .quiz-opt`).forEach((n,idx)=>{
    n.classList.toggle("correct", false); n.classList.toggle("wrong", false);
  });
  (ev || event).target.classList.add("correct");
  document.getElementById("badge-"+qi).className = "badge wait";
  document.getElementById("badge-"+qi).textContent = "已选";
}
function submitQuiz(){
  let score = 0;
  QUIZZES.forEach((q,i)=>{
    const badge = document.getElementById("badge-"+i);
    document.querySelectorAll(`#qz-${i} .quiz-opt`).forEach((n,idx)=>{
      n.classList.toggle("correct", idx===q.ans);
      if(idx===quizAnswers[i] && idx!==q.ans) n.classList.add("wrong");
    });
    if(quizAnswers[i]===q.ans){ score+=10; badge.className="badge pass"; badge.textContent="答对"; }
    else { badge.className="badge fail"; badge.textContent=quizAnswers[i]===-1?"未答":"答错"; }
  });
  state.quiz = { score, date: new Date().toLocaleDateString("zh-CN") };
  saveState();
  renderMain(`<h2 class="page-title">📝 测验成绩</h2>
  <div class="score-bar"><div class="score-big">${score}分</div>
  <div><b>${score>=80?"🎉 优秀，可以毕业了！":score>=60?"👍 及格，错题回炉一下":"💪 继续加油，回看错题对应章节"}</b>
  <p class="page-sub" style="margin:0">满分 100。点击下方查看解析或重考。</p></div></div>
  <div style="display:flex;gap:10px"><button class="btn primary" onclick="go('quiz')">重考一次</button>
  <button class="btn" onclick="go('home')">返回首页</button></div>`);
}

/* ---------- 笔记 ---------- */
function renderNotes(){
  renderMain(`<h2 class="page-title">📔 我的笔记</h2>
  <p class="page-sub">随手记录学习心得，自动保存在本地浏览器。</p>
  <textarea id="noteArea" style="width:100%;min-height:320px;background:#0a0e14;border:1px solid var(--border);border-radius:10px;color:var(--fg);padding:14px;font-size:14px;line-height:1.7;font-family:inherit" oninput="state.notes=this.value;saveState()" placeholder="例如：SQL 注入的三种防御方式……">${state.notes||""}</textarea>`);
}

/* ---------- 进度刷新 ---------- */
function refreshProgress(){
  const totalLessons = COURSES.reduce((s,c)=>s+c.chapters.reduce((a,ch)=>a+ch.lessons.length,0), 0);
  const pct = totalLessons ? Math.round(state.done.length/totalLessons*100) : 0;
  document.getElementById("totalProgress").style.width = pct+"%";
  document.getElementById("totalProgressText").textContent = pct+"%";
}

/* ---------- 初始化 ---------- */
const PIDS = PAGES.map(p=>p.id);
// 支持 #lesson/课程id/章/课 深链，直接打开对应课时（含内嵌视频）
const lm = location.hash.match(/^#lesson\/(\w+)\/(\d+)\/(\d+)$/);
let initPage = PIDS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
buildNav();
go(initPage);
if(lm){ currentPage = lm[1]; go(lm[1]); openLesson(lm[1], +lm[2], +lm[3]); }
window.addEventListener("hashchange", ()=>{ const h=location.hash.slice(1); if(PIDS.includes(h) && h!==currentPage) go(h); });
refreshProgress();
