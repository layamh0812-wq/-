/* ================= 课程数据 ================= */
// lesson.content 内可用的 HTML 片段标记：h3, code, pre>code, .warn, .tip, ul, table

const COURSES = [
{
  id: "sec", title: "网络安全", icon: "🛡️", desc: "从认识网络与攻防原理开始，到漏洞利用、应急响应与实战 CTF。",
  chapters: [
  {
    title: "第一章 · 网络安全认知与法律底线",
    lessons: [
    { title: "什么是网络安全", dur: "15min", content: `
      <h3>定义</h3>
      <p>网络安全（Cybersecurity）是保护网络系统的<b>硬件、软件和数据</b>不因偶然或恶意原因被破坏、更改、泄露，保障系统连续可靠运行。业界常用 <b>CIA 三要素</b> 概括：</p>
      <ul>
        <li><b>机密性（Confidentiality）</b>：信息不被未授权者获取。</li>
        <li><b>完整性（Integrity）</b>：信息不被未授权篡改。</li>
        <li><b>可用性（Availability）</b>：授权用户能及时访问资源。</li>
      </ul>
      <h3>常见威胁全景</h3>
      <table><tr><th>威胁</th><th>说明</th><th>典型案例</th></tr>
      <tr><td>恶意软件</td><td>病毒、木马、勒索软件</td><td>WannaCry 勒索</td></tr>
      <tr><td>社会工程学</td><td>利用人性弱点而非技术漏洞</td><td>钓鱼邮件</td></tr>
      <tr><td>Web 攻击</td><td>SQL 注入、XSS、CSRF 等</td><td>拖库泄露</td></tr>
      <tr><td>DDoS</td><td>耗尽资源使服务不可用</td><td>游戏服被打瘫</td></tr></table>
      <div class="warn">⚠️ 学习安全技术的唯一合法场景是：<b>自己的系统</b>、获得<b>书面授权</b>的渗透测试、或<b>官方靶场</b>（如 DVWA、Pikachu、CTF 平台）。未授权测试他人系统属违法行为。</div>` },
    { title: "法律红线：白帽子守则", dur: "12min", content: `
      <h3>必须了解的法规</h3>
      <ul>
        <li><b>《网络安全法》</b>：2017 年施行，确立网络运营者安全义务。</li>
        <li><b>《数据安全法》</b>：2021 年施行，数据分类分级保护。</li>
        <li><b>《个人信息保护法》</b>：2021 年施行，处理个人信息的合规要求。</li>
        <li><b>《刑法》285/286 条</b>：非法侵入计算机信息系统罪、破坏计算机信息系统罪。</li>
      </ul>
      <h3>白帽子行为准则</h3>
      <div class="tip">✅ 授权渗透前签好授权书；测试范围以授权书为准；发现漏洞通过<b>合法渠道</b>（SRC、CNVD、CVE）提交；不下载数据、不留后门、不炫耀细节。</div>
      <p>正规渗透测试流程：授权 → 信息收集 → 漏洞扫描 → 漏洞验证 → 报告编写 → 复测。</p>` },
    { title: "网络协议基础：TCP/IP", dur: "20min", content: `
      <h3>分层模型</h3>
      <p>TCP/IP 分为四层，每一层解决不同问题，也是防火墙和攻击者各自关注的层面：</p>
      <table><tr><th>层</th><th>协议</th><th>安全关注点</th></tr>
      <tr><td>应用层</td><td>HTTP/HTTPS、DNS、SMTP</td><td>SQL 注入、XSS、DNS 劫持</td></tr>
      <tr><td>传输层</td><td>TCP、UDP</td><td>端口扫描、SYN Flood</td></tr>
      <tr><td>网络层</td><td>IP、ICMP</td><td>IP 欺骗、ICMP 洪水</td></tr>
      <tr><td>链路层</td><td>ARP、以太网</td><td>ARP 欺骗、MAC 泛洪</td></tr></table>
      <h3>TCP 三次握手</h3>
      <pre><code>客户端            服务端
  | ---- SYN ----> |   第一次：请求建立连接
  | <-- SYN+ACK -- |   第二次：确认并回应
  | ---- ACK ----> |   第三次：连接建立</code></pre>
      <p><b>SYN Flood</b> 攻击就是只发第一次握手、不回第三次，把服务端半连接队列占满——理解协议才能理解攻防。</p>` },
    { title: "HTTP 协议与抓包入门", dur: "18min", content: `
      <h3>HTTP 请求结构</h3>
      <pre><code>GET /login.php HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Cookie: sessionid=abc123

username=admin&password=123456</code></pre>
      <h3>常见状态码</h3>
      <ul>
        <li><b>200</b> 成功；<b>301/302</b> 重定向；<b>403</b> 禁止访问；<b>404</b> 未找到；<b>500</b> 服务器内部错误。</li>
      </ul>
      <h3>抓包工具</h3>
      <ul>
        <li><b>Burp Suite</b>：Web 渗透测试标配，拦截、改包、重放。</li>
        <li><b>Wireshark</b>：网络层流量分析。</li>
        <li><b>F12 开发者工具</b>：浏览器自带的轻量抓包。</li>
      </ul>
      <div class="tip">💡 练习：打开任意网站按 F12 → Network 面板，观察请求方法、状态码与 Cookie，这是零成本的第一堂抓包课。</div>` },
    ]
  },
  {
    title: "第二章 · 信息收集与侦察",
    lessons: [
    { title: "域名与子域名收集", dur: "15min", content: `
      <h3>为什么先做信息收集</h3>
      <p>攻击面 = 资产数量。渗透测试 70% 的时间花在侦察上：找到存活主机、开放服务、隐藏子域，才能找到突破口。</p>
      <h3>常用手段</h3>
      <ul>
        <li><b>whois</b>：查询域名注册人、邮箱、NS 记录。</li>
        <li><b>子域名枚举</b>：OneForAll、subfinder、amass。</li>
        <li><b>搜索引擎语法（Google Dork）</b>：</li>
      </ul>
      <pre><code>site:example.com            # 站内收录页面
site:example.com inurl:admin
filetype:xls site:example.com  # 暴露的表格文件</code></pre>
      <div class="warn">⚠️ 对目标做被动收集（查公开数据）风险低；<b>主动扫描</b>必须先获得授权。</div>` },
    { title: "端口扫描原理与 Nmap", dur: "18min", content: `
      <h3>Nmap 基础命令</h3>
      <pre><code>nmap -sV 192.168.1.10        # 服务版本探测
nmap -sS -p 1-1000 target    # SYN 半开扫描（需 root）
nmap -O target               # 操作系统识别
nmap -A -T4 target           # 全面扫描</code></pre>
      <h3>扫描类型</h3>
      <table><tr><th>类型</th><th>原理</th><th>隐蔽性</th></tr>
      <tr><td>SYN 扫描 -sS</td><td>发 SYN 不完成握手</td><td>较高</td></tr>
      <tr><td>全连接 -sT</td><td>完整三次握手</td><td>低</td></tr>
      <tr><td>UDP -sU</td><td>发 UDP 探测包</td><td>中</td></tr></table>
      <div class="warn">⚠️ 只对自己搭建的虚拟机练习 Nmap（如 VulnHub 靶机、Metasploitable）。</div>` },
    { title: "指纹识别与目录爆破", dur: "15min", content: `
      <h3>Web 指纹</h3>
      <p>识别目标用什么语言、框架、服务器：响应头 <code>X-Powered-By</code>、<code>Server</code>、页面特征、favicon hash 都是线索。工具：whatweb、Wappalyzer（浏览器插件）。</p>
      <h3>目录爆破</h3>
      <pre><code># dirsearch 扫描隐藏目录
python3 dirsearch.py -u http://target -e php,asp
# ffuf 快速模糊测试
ffuf -u http://target/FUZZ -w wordlist.txt</code></pre>
      <p>找到 <code>/admin</code>、<code>/.git</code>、<code>/backup.zip</code> 之类路径常常就是突破口。</p>` },
    ]
  },
  {
    title: "第三章 · Web 安全十大漏洞",
    lessons: [
    { title: "SQL 注入原理与防御", dur: "22min", content: `
      <h3>漏洞成因</h3>
      <p>用户输入被直接拼进 SQL 语句。假设后端这样写：</p>
      <pre><code># 危险写法（Python 示例）
sql = "SELECT * FROM users WHERE name='" + username + "'"</code></pre>
      <p>攻击者输入 <code>' OR '1'='1</code>，SQL 变成：</p>
      <pre><code>SELECT * FROM users WHERE name='' OR '1'='1'
# 恒为真 → 返回全部用户 → 登录绕过/拖库</code></pre>
      <h3>防御（按优先级）</h3>
      <ul>
        <li><b>参数化查询（预编译）</b>——根治方案：</li>
      </ul>
      <pre><code>cursor.execute("SELECT * FROM users WHERE name=%s", (username,))</code></pre>
      <ul><li>最小权限数据库账号；WAF 作纵深防御；错误信息不回显 SQL 细节。</li></ul>
      <div class="tip">💡 去「实战演练」页的 SQL 注入模拟器亲手绕过一次登录，再修复它。</div>` },
    { title: "XSS 跨站脚本", dur: "20min", content: `
      <h3>三类 XSS</h3>
      <table><tr><th>类型</th><th>触发方式</th></tr>
      <tr><td>反射型</td><td>恶意代码在 URL 参数中，诱导点击</td></tr>
      <tr><td>存储型</td><td>代码存入数据库（如评论），所有访问者中招</td></tr>
      <tr><td>DOM 型</td><td>前端 JS 直接把不可信数据插入 DOM</td></tr></table>
      <h3>经典 Payload</h3>
      <pre><code>&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code></pre>
      <h3>防御</h3>
      <ul>
        <li>输出编码：HTML 上下文转义 <code>&lt; &gt; &amp; " '</code>。</li>
        <li>输入校验 + 内容安全策略（CSP 头）。</li>
        <li>Cookie 加 <code>HttpOnly</code>，脚本读不到。</li>
      </ul>` },
    { title: "CSRF 与 SSRF", dur: "18min", content: `
      <h3>CSRF 跨站请求伪造</h3>
      <p>利用浏览器<b>自动携带 Cookie</b> 的特性：受害者登录 A 站后访问恶意 B 站，B 站悄悄向 A 发转账请求。</p>
      <pre><code>&lt;img src="http://bank.com/transfer?to=hacker&amount=10000"&gt;</code></pre>
      <p>防御：CSRF Token、SameSite Cookie、校验 Referer。</p>
      <h3>SSRF 服务端请求伪造</h3>
      <p>让服务器替你发请求，访问内网：</p>
      <pre><code>http://target/fetch?url=http://127.0.0.1:6379/  # 打内网 Redis</code></pre>
      <p>防御：URL 白名单、禁止解析内网地址、禁用危险协议（file://、gopher://）。</p>` },
    { title: "文件上传与命令注入", dur: "18min", content: `
      <h3>文件上传漏洞</h3>
      <p>上传 <code>shell.php</code> 获得服务器控制权。绕过手法：改 MIME、双写扩展名、<code>%00</code> 截断、图片马。</p>
      <p>防御：白名单后缀、重命名+随机文件名、存储目录不给执行权限、内容检测。</p>
      <h3>命令注入</h3>
      <pre><code># 危险：把用户输入拼进系统命令
os.system("ping " + user_input)
# 攻击者输入: 127.0.0.1; cat /etc/passwd</code></pre>
      <p>防御：<code>subprocess.run(["ping", ip])</code> 列表传参，避免 shell 解释；或白名单校验输入格式。</p>` },
    ]
  },
  {
    title: "第四章 · 密码学与认证安全",
    lessons: [
    { title: "对称与非对称加密", dur: "18min", content: `
      <h3>对称加密</h3>
      <p>加解密用同一把钥匙：AES、ChaCha20。速度快，适合大文件；难题是<b>密钥分发</b>。</p>
      <h3>非对称加密</h3>
      <p>公钥加密、私钥解密：RSA、ECC。解决密钥分发，但慢，常用于交换对称密钥（HTTPS 的做法）。</p>
      <h3>HTTPS 握手（简化）</h3>
      <pre><code>1. 客户端 → 服务器：你好 + 支持的加密套件
2. 服务器 → 客户端：证书（含公钥）
3. 客户端验证证书 → 生成会话密钥，用公钥加密发送
4. 双方用会话密钥（对称）加密通信</code></pre>
      <div class="tip">💡 凯撒密码是最古老的加密，去实战演练页亲手破一次。</div>` },
    { title: "哈希、加盐与密码存储", dur: "15min", content: `
      <h3>哈希 ≠ 加密</h3>
      <p>哈希单向不可逆：MD5、SHA-256。密码绝不能明文或简单 MD5 存储——彩虹表能秒破。</p>
      <h3>正确做法</h3>
      <pre><code># Python 使用 bcrypt（自动加盐 + 慢哈希）
import bcrypt
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(12))
ok = bcrypt.checkpw(input_pwd.encode(), hashed)</code></pre>
      <ul><li>加盐：给每个用户随机盐，破彩虹表。</li><li>慢哈希：bcrypt/scrypt/argon2，让暴力破解代价指数级上升。</li></ul>` },
    { title: "认证、会话与 OAuth", dur: "15min", content: `
      <h3>Session vs JWT</h3>
      <table><tr><th></th><th>Session</th><th>JWT</th></tr>
      <tr><td>状态</td><td>存服务端</td><td>无状态，签名自校验</td></tr>
      <tr><td>注销</td><td>删服务端记录即可</td><td>难以主动失效</td></tr>
      <tr><td>风险</td><td>Session 劫持</td><td>密钥泄露即全线失守</td></tr></table>
      <h3>多因素认证（MFA）</h3>
      <p>密码（你知道的）+ 手机验证码/TOTP（你拥有的），可挡住 99% 的密码泄露事件。优先开 TOTP 而非短信（防 SIM 卡劫持）。</p>` },
    ]
  },
  {
    title: "第五章 · 社会工程学与应急响应",
    lessons: [
    { title: "社会工程学：最脆弱的环节是人", dur: "15min", content: `
      <h3>常见手法</h3>
      <ul>
        <li><b>钓鱼邮件</b>：仿冒官网催你改密码。看发件域名、看链接真实指向、别急着点。</li>
        <li><b>鱼叉攻击</b>：针对特定人的定制钓鱼。</li>
        <li><b>尾随/伪装</b>：物理渗透，跟在员工身后进机房。</li>
      </ul>
      <h3>防骗四问</h3>
      <div class="tip">✅ 1) 对方真的是他自称的人吗？2) 为什么现在要？3) 走正规流程了吗？4) 我能先核实吗？——企业安全意识培训永远比买设备便宜。</div>` },
    { title: "应急响应与日志分析", dur: "20min", content: `
      <h3>处置六步（PDCERF）</h3>
      <p>准备 → 检测 → 遏制 → 根除 → 恢复 → 复盘。</p>
      <h3>Linux 排查命令</h3>
      <pre><code>last -20                  # 最近登录
ps auxf | grep -v "\["    # 可疑进程
crontab -l                # 恶意定时任务
find / -mtime -1 -type f  # 最近 24h 改动的文件
netstat -antp             # 异常外连</code></pre>
      <h3>Windows 关键日志</h3>
      <p>事件查看器中：4624（登录成功）、4625（失败）、4720（新建账户）。登录失败风暴 = 可能在爆破。</p>` },
    { title: "加固清单：把门焊死", dur: "15min", content: `
      <h3>系统加固基线</h3>
      <ul>
        <li>SSH：禁 root 登录、禁密码登录改用密钥、改默认端口。</li>
        <li>最小开放端口，防火墙默认拒绝（deny all, allow list）。</li>
        <li>定期补丁；最小权限原则；关键操作留审计日志。</li>
        <li>数据库：删除默认账号、限制来源 IP、开启慢查询与审计。</li>
      </ul>
      <h3>备份 3-2-1 原则</h3>
      <p>3 份副本、2 种介质、1 份异地——这是勒索软件最后的防线，且<b>备份必须定期演练恢复</b>。</p>` },
    ]
  },
  {
    title: "第六章 · CTF 实战入门",
    lessons: [
    { title: "CTF 竞赛模式与上手", dur: "15min", content: `
      <h3>三大模式</h3>
      <ul>
        <li><b>解题模式（Jeopardy）</b>：按类别解题拿 flag，新手首选。</li>
        <li><b>攻防模式（Attack-Defense）</b>：互相攻击、守护自己的靶机。</li>
        <li><b>挖矿/解题混合</b>：看主办方规则。</li>
      </ul>
      <h3>方向选择</h3>
      <table><tr><th>方向</th><th>入门难度</th><th>关键技能</th></tr>
      <tr><td>Web</td><td>低</td><td>HTTP、SQL/XSS、Burp</td></tr>
      <tr><td>Misc</td><td>低</td><td>编解码、隐写、取证</td></tr>
      <tr><td>Crypto</td><td>中</td><td>数学、Python</td></tr>
      <tr><td>Pwn/Reverse</td><td>高</td><td>汇编、内存、调试器</td></tr></table>
      <p>练习平台：攻防世界、BUUCTF、PicoCTF（英文但极适合新手）。</p>` },
    { title: "常见解题套路", dur: "18min", content: `
      <h3>Misc 编解码全家桶</h3>
      <pre><code>Base64:  ZmxhZ3toZWxsb30=      -> flag{hello}
Hex:     666c6167              -> flag
Morse:   ..-. .-.. .- --.      -> FLAG
ROT13:   synt                   -> flag</code></pre>
      <h3>Web 手感</h3>
      <ul>
        <li>看源码注释、robots.txt、.git 泄露。</li>
        <li>改 Cookie 里的 isAdmin=0 → 1。</li>
        <li>HTTP 响应头、错误页里的提示。</li>
      </ul>
      <h3>Python 解题利器</h3>
      <pre><code>import base64, binascii
print(base64.b64decode("ZmxhZ3toZWxsb30=").decode())  # flag{hello}
print(bytes.fromhex("666c6167").decode())              # flag</code></pre>` },
    { title: "搭建自己的靶场", dur: "15min", content: `
      <h3>推荐组合</h3>
      <ul>
        <li><b>DVWA</b>：PHP+MySQL，漏洞等级可调，Web 入门标配。</li>
        <li><b>Pikachu</b>：中文界面，漏洞类型全。</li>
        <li><b>Vulhub</b>：docker-compose 一键拉起真实 CVE 环境。</li>
        <li><b>Metasploitable2</b>：Linux 主机漏洞靶机。</li>
      </ul>
      <pre><code># Vulhub 启动一个真实漏洞环境
git clone https://github.com/vulhub/vulhub.git
cd vulhub/tomcat/CVE-2017-12615
docker compose up -d</code></pre>
      <div class="tip">💡 全程在虚拟机/隔离网络里玩，不打公网任何目标。</div>` },
    ]
  },
  {
    title: "第七章 · 小迪安全课堂精讲（文字版）",
    lessons: [
    { title: "Day1-3 精讲：概念名词与基础环境", dur: "25min", video: 1, content: `
      <p>本节文字版对应小迪安全公开课第 1~3 天（P1~P3），内容为听课笔记整理。</p>
      <h3>1. 什么是渗透测试</h3>
      <p>渗透测试 = 以攻击者视角，模拟真实黑客的手法，对<b>授权目标</b>做安全性评估，最后输出报告。它分<b>黑盒</b>（不给任何信息，全靠收集）、<b>白盒</b>（给源码和架构）、<b>灰盒</b>（给部分信息）三种。小迪课程的主线是黑盒 Web 渗透。</p>
      <h3>2. 三个必背概念</h3>
      <ul>
        <li><b>域名与 DNS 解析</b>：域名 → DNS 服务器 → IP。记录类型：A（IP）、CNAME（别名）、MX（邮件）、NS（域名服务器）、TXT（验证/SPF）。做子域名收集本质上就是在挖这些记录。</li>
        <li><b>CDN</b>：内容分发网络，让域名解析到最近的节点，导致你扫到的 IP 不是真实源站。判断有无 CDN：多地 ping 看解析 IP 是否一致。绕过思路：查子域名、查历史解析记录、查国外冷门节点、查邮件头里的源站 IP。</li>
        <li><b>数据包</b>：渗透测试 90% 的操作是「抓包 → 改包 → 重放」。请求 = 请求行 + 请求头 + 请求体；响应 = 状态行 + 响应头 + 响应体。</li>
      </ul>
      <h3>3. 环境搭建清单（跟着 Day2-3 做）</h3>
      <pre><code>攻击机：VMware + Kali Linux（或 Win + 火狐/Burp）
靶机：  XP/2003（老系统练旧漏洞）、Metasploitable2
抓包：  Burp Suite（装证书才能抓 HTTPS）
浏览器：Firefox + FoxyProxy + Wappalyzer + HackTools</code></pre>
      <div class="warn">⚠️ 所有靶机只在虚拟机里跑，网卡选「仅主机模式」，绝不能桥接到公网。</div>` },
    { title: "Day4-12 精讲：Web 基础与信息收集全流程", dur: "30min", video: 4, content: `
      <p>对应小迪课程第 4~12 天。信息收集是渗透测试投入时间最多的阶段，分<b>域名信息、站点信息、服务器信息、敏感信息</b>四条线。</p>
      <h3>1. 域名信息</h3>
      <ul>
        <li>whois 查注册人/邮箱 → 邮箱反查注册的其他域名（社工库思路）。</li>
        <li>子域名：OneForAll / subfinder / SecurityTrails / 备案查询（beian.miit.gov.cn）。</li>
        <li>真实 IP：看上面 CDN 绕过思路；<code>nslookup</code> 对比多地解析。</li>
      </ul>
      <h3>2. 站点信息</h3>
      <ul>
        <li>指纹：whatweb、Wappalyzer、<code>curl -I</code> 看 Server / X-Powered-By。</li>
        <li>敏感目录：dirsearch / ffuf 扫 admin、backup、.git、.svn、phpinfo.php。</li>
        <li>Github / 码云 搜目标域名，常能挖到泄露的配置文件和密钥。</li>
      </ul>
      <h3>3. 服务器与端口</h3>
      <pre><code>nmap -sV -sC -O -p- target     # 全端口+服务+脚本
masscan 10.0.0.0/24 -p 80,443 --rate=1000   # 大段快速预筛</code></pre>
      <h3>4. 敏感信息</h3>
      <p>Google Dork、Fofa/Shodan/Hunter 鹰图（<code>domain="example.com"</code>）、网盘搜索、公众号/小程序资产。小迪反复强调：<b>收集越全，后面漏洞挖掘越轻松，很多站不是被黑进去的，是被「查」进去的</b>。</p>` },
    { title: "Day13-20 精讲：SQL 注入全姿势（联合/报错/盲注）", dur: "35min", video: 13, content: `
      <p>对应小迪课程注入阶段，是全套课的核心章节。</p>
      <h3>1. 注入分类（按数据位置）</h3>
      <table><tr><th>位置</th><th>技巧</th></tr>
      <tr><td>GET 参数</td><td>URL 直接改</td></tr>
      <tr><td>POST 表单</td><td>Burp 抓包改 body</td></tr>
      <tr><td>Cookie</td><td>很多 CMS 用 cookie 存查询条件</td></tr>
      <tr><td>HTTP 头</td><td>User-Agent / X-Forwarded-For 常被写库</td></tr></table>
      <h3>2. 联合查询注入标准六步（sqli-labs 第 1 关流程）</h3>
      <pre><code>1.?id=1'            → 报错说明单引号被拼进 SQL（有注入点）
2.?id=1' order by 3 --+   → 二分法猜列数，报错即到边界
3.?id=-1' union select 1,2,3 --+  → 看回显位（用 -1 让原查询为空）
4.?id=-1' union select 1,version(),database() --+  → 拿库版本和当前库
5.?id=-1' union select 1,2,group_concat(table_name)
   from information_schema.tables where table_schema=database() --+
6. 同理查 columns → 拖数据</code></pre>
      <h3>3. 报错注入（无回显位时）</h3>
      <pre><code>?id=1' and extractvalue(1,concat(0x7e,(select database()))) --+
?id=1' and updatexml(1,concat(0x7e,(select database())),1) --+</code></pre>
      <p>原理：构造 XML 格式错误，把查询结果拼进报错信息回显。一次最多回显 32 字符，长数据用 <code>substr()</code> 截取。</p>
      <h3>4. 盲注（页面完全无回显）</h3>
      <pre><code># 布尔盲注：真页与假页有差异
?id=1' and ascii(substr(database(),1,1))&gt;100 --+
# 时间盲注：差异都没有就用 sleep
?id=1' and if(ascii(substr(database(),1,1))&gt;100, sleep(5), 0) --+</code></pre>
      <p>手工确认后交给 <b>sqlmap</b>：<code>sqlmap -u "url" --dbs --batch</code>。</p>
      <div class="warn">⚠️ 以上全部只在 sqli-labs / DVWA 靶场里练。真实站点测注入也要控制请求频率，大流量盲注可能把目标打挂，属于破坏行为。</div>` },
    { title: "Day25-32 精讲：XSS / CSRF / SSRF / 文件包含", dur: "30min", video: 25, content: `
      <h3>1. XSS（Day25-28）</h3>
      <p>小迪的讲法：先分清三种类型，再按<b>输出位置</b>构造 payload。</p>
      <pre><code>&lt;script&gt;alert(1)&lt;/script&gt;                    # 直出
&lt;img src=x onerror=alert(1)&gt;                 # 标签内
" onmouseover="alert(1)                      # 属性内逃逸
&lt;/textarea&gt;&lt;script&gt;alert(1)&lt;/script&gt;        # 闭合文本域
&lt;svg onload=alert(1)&gt;                        # script 被过滤时换标签</code></pre>
      <p>利用面：盗 Cookie（<code>document.cookie</code> 发到接收平台）、键盘记录、构造钓鱼页面。防御：输出编码、HttpOnly、CSP。</p>
      <h3>2. CSRF（Day29）</h3>
      <p>工具 Burp 自带 CSRF Poc 生成器：抓一个敏感请求 → 右键 Engagement → Generate CSRF PoC → 用受害者浏览器打开 HTML 验证。防御核心是 Token，因为攻击者<b>拿不到</b>目标站的 Token（同源策略），只能"借用"浏览器自动带 Cookie 的行为。</p>
      <h3>3. SSRF（Day30）</h3>
      <p>危险函数：<code>file_get_contents()</code>、<code>curl_exec()</code>、<code>fsockopen()</code>。利用：读内网 Web、探测端口、打 Redis（gopher 协议写计划任务拿 shell）、云环境读 <code>169.254.169.254</code> 元数据拿云密钥。防御：白名单 + 禁内网 IP + 禁 gopher/dict/file 协议。</p>
      <h3>4. 文件包含（Day31-32）</h3>
      <pre><code>?file=../../etc/passwd              # 任意文件读取
?file=php://filter/read=convert.base64-encode/resource=index.php
                                    # php://filter 读源码
?file=data://text/plain,&lt;?php system('whoami');?&gt;  # RCE（需 allow_url_include）
# 配合文件上传：传图片马 + 包含执行</code></pre>
      <p>防御：固定文件白名单、<code>basename()</code> 去路径、关闭 <code>allow_url_include</code>。</p>` },
    { title: "Day33-49 精讲：逻辑越权 / 反序列化 / WAF 绕过", dur: "30min", video: 33, content: `
      <h3>1. 逻辑漏洞与越权（Day33-36）—— 免杀率最高的漏洞</h3>
      <ul>
        <li><b>水平越权</b>：改 userId/订单号看别人的数据。测试法：开两个账号 A/B，拿 A 的请求把 ID 换成 B 的。</li>
        <li><b>垂直越权</b>：普通用户直接访问 /admin 接口，看后端有没有校验角色。</li>
        <li><b>支付逻辑</b>：改价格（负数/0.01）、改数量、重复提交、改返回包（前端校验 result=success）。</li>
        <li><b>短信验证码</b>：爆破 4~6 位、返回包回显验证码、改手机号参数、无频控。</li>
      </ul>
      <p>逻辑漏洞 WAF 完全防不住，只能靠代码层修——所以 SRC 里它含金量高。</p>
      <h3>2. 反序列化与 XXE（Day37-39）</h3>
      <pre><code># PHP 反序列化：unserialize 直接还原用户可控字符串
O:4:"User":2:{s:4:"name";s:5:"admin";s:5:"isAdm";b:1;}
# 篡改属性 + 魔术方法(__destruct/__wakeup)触发危险调用
# XXE：XML 外部实体读取文件
&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
&lt;root&gt;&amp;xxe;&lt;/root&gt;</code></pre>
      <p>防御：反序列化不接受用户输入 / 升级组件；XXE 禁用外部实体（<code>libxml_disable_entity_loader(true)</code>）。</p>
      <h3>3. WAF 绕过（Day46-49）三板斧</h3>
      <ul>
        <li><b>换形态</b>：大小写混写、<code>/**/</code> 内联注释、URL/双重 URL 编码、hex 编码（<code>0x61646d696e</code>）。</li>
        <li><b>换语法</b>：<code>union select</code> 被拦换 <code>union all select</code>；空格换 <code>%09 %0a ()</code>；逗号拦换 <code>from x for y</code>（substr 等价改写）。</li>
        <li><b>换协议</b>：HTTP 参数污染（HPP）、分块传输（chunked）绕 WAF 检测、multipart 里塞垃圾字节。</li>
      </ul>
      <div class="tip">💡 小迪的心法：绕过没有固定答案，先看 WAF 拦截的<b>匹配规则</b>（发探测 payload 看哪种写法放行），再组合以上三板斧。</div>` },
    { title: "Day58-72 精讲：提权与内网渗透", dur: "30min", video: 58, content: `
      <h3>1. 权限提升</h3>
      <p>拿到 webshell 只是低权限（如 www-data），要提权到 root/管理员：</p>
      <pre><code># Linux 提权思路
sudo -l                    # 看能免密 sudo 什么 → gtfobins 查利用
uname -a                   # 内核版本 → 搜 CVE（如脏牛 DirtyCow）
find / -perm -4000 2&gt;/dev/null   # SUID 文件
crontab -l; ls -la /etc/cron*    # 定时任务里可写的脚本
# Windows 提权思路
whoami /priv               # 看特权（SeImpersonate → Potato 系列提权）
systeminfo                 # 补丁情况 → 金山/华硕 HFS 等本地提权 CVE</code></pre>
      <h3>2. 内网渗透流程（Day63-72）</h3>
      <ol style="padding-left:20px;line-height:2">
        <li><b>判内网</b>：<code>ipconfig /all</code> 看网段、有没有域（有 DNS 域名后缀）。</li>
        <li><b>横向信息收集</b>：ARP 表、路由表、扫描存活（fscan / nbtscan）。</li>
        <li><b>凭据收集</b>：mimikatz 抓本机明文/NTLM hash（<code>sekurlsa::logonpasswords</code>）。</li>
        <li><b>横向移动</b>：psexec / wmic / smbexec 用 hash 撞别的机器（PTH 哈希传递）。</li>
        <li><b>域渗透</b>：定位域控（<code>net time</code> / SPN 扫描）、Zerologon/MS17-010 类域漏洞、黄金票据/白银票据。</li>
      </ol>
      <div class="warn">⚠️ 内网技术只允许在「红蓝对抗授权」或自建 AD 靶场（如 GOAD）中练习，公网任何目标都碰不得。</div>` },
    { title: "Day73-88 精讲：应急响应 / Python 开发 / SRC 挖洞", dur: "30min", video: 73, content: `
      <h3>1. 应急响应（Day73-75）</h3>
      <p>小迪的排查清单：先<b>保全证据</b>（内存快照、别急着重启），再查「进来了什么」：</p>
      <ul>
        <li>Webshell 查杀：D盾 / 河马扫 web 目录，重点看最近修改的文件。</li>
        <li>进程/网络：<code>netstat -antp</code>、<code>ps auxf</code>、可疑外连 IP 反查威胁情报。</li>
        <li>持久化：crontab、systemd、SSH 公钥、Windows 计划任务/注册表启动项。</li>
        <li>溯源：Nginx/应用日志里找攻击者 IP、payload、时间线，还原攻击路径。</li>
      </ul>
      <h3>2. Python 安全开发（Day76-79）</h3>
      <p>本应用 Python 课第五章的三个项目（端口扫描器 / 弱口令检测 / 日志分析）就是按这个阶段的能力模型设计的，学完可以直接对照小迪 Day76-79 的实战篇加深。</p>
      <h3>3. SRC 漏洞挖掘（Day86-88）</h3>
      <ul>
        <li>选平台：各厂 SRC（阿里、腾讯、字节）、CNVD/CVE 补证、教育 SRC（edusrc）门槛低适合起步。</li>
        <li>挖洞策略：先信息收集把资产铺满 → 自动扫器（nuclei）铺底 → 手工深挖逻辑/越权。</li>
        <li>报告写法：漏洞标题 + 危害等级 + 复现步骤（带截图）+ 修复建议。<b>报告写得好，评级高一档。</b></li>
        <li>红线：只测范围内资产、不拖库、能证明即止、不外传。</li>
      </ul>
      <div class="tip">💡 毕业建议：把小迪 88 天课当"地图"，本应用的文字版精讲当"笔记"，靶场实验当"作业"——三线并行，学完即具备 Web 渗透的完整知识框架。</div>` },
    ]
  },
]
},
{
  id: "py", title: "Python 编程", icon: "🐍", desc: "零基础语法 → 函数与文件 → 网络与安全工具开发，全部代码可直接运行。",
  chapters: [
  {
    title: "第一章 · 零基础起步",
    lessons: [
    { title: "安装与第一个程序", dur: "12min", content: `
      <h3>安装</h3>
      <p>到 python.org 下载 3.12+，勾选 <b>Add to PATH</b>。验证：</p>
      <pre><code>python --version   # Python 3.12.x</code></pre>
      <h3>Hello World</h3>
      <pre><code>print("你好，网安世界！")</code></pre>
      <h3>注释</h3>
      <pre><code># 单行注释
"""多行字符串/文档字符串"""</code></pre>
      <div class="tip">💡 推荐编辑器：VS Code（装 Python 插件）或 PyCharm。</div>` },
    { title: "变量与数据类型", dur: "15min", content: `
      <h3>基本类型</h3>
      <pre><code>name = "admin"       # str 字符串
age = 25             # int 整数
score = 98.5         # float 浮点
is_admin = True      # bool 布尔
tags = None          # NoneType 空值

print(type(name))    # &lt;class 'str'&gt;</code></pre>
      <h3>类型转换</h3>
      <pre><code>s = "123"
n = int(s) + 1       # 124
f = float("3.14")    # 3.14
t = str(True)        # "True"</code></pre>
      <h3>输入与输出</h3>
      <pre><code>user = input("用户名：")
print(f"欢迎你, {user}")     # f-string 格式化</code></pre>` },
    { title: "运算符与条件判断", dur: "15min", content: `
      <h3>运算符</h3>
      <pre><code>7 // 2    # 3   整除
7 % 2     # 1   取余
2 ** 10   # 1024 幂
==  !=  &lt;  &gt;  &lt;=  &gt;=
and  or  not          # 逻辑运算</code></pre>
      <h3>if / elif / else</h3>
      <pre><code>pwd = input("密码：")
if len(pwd) &lt; 8:
    print("太短了")
elif pwd == "12345678":
    print("弱密码，禁止使用")
else:
    print("密码强度合格")</code></pre>
      <p><b>Python 用缩进（4 空格）表示代码块</b>，这是它最容易让新手翻车的规则。</p>` },
    { title: "循环：for 与 while", dur: "15min", content: `
      <h3>for 遍历</h3>
      <pre><code>for i in range(5):        # 0,1,2,3,4
    print(i)

for ch in "abc":
    print(ch)</code></pre>
      <h3>while + break/continue</h3>
      <pre><code>count = 0
while count &lt; 3:
    pwd = input("密码：")
    if pwd == "admin":
        print("登录成功")
        break
    count += 1
else:
    print("三次失败，账户锁定")  # while 的 else：没 break 时执行</code></pre>
      <p>这就是一个最简单的「密码爆破模拟器」雏形。</p>` },
    ]
  },
  {
    title: "第二章 · 数据结构",
    lessons: [
    { title: "列表 list", dur: "15min", content: `
      <pre><code>ports = [80, 443, 22, 3389]
ports.append(8080)      # 追加
ports.remove(22)        # 删除
ports.sort()            # 排序
print(ports[0], ports[-1])   # 首尾
print(ports[1:3])       # 切片 [3389? 按序取]
print(len(ports))       # 长度
print(80 in ports)      # True 存在性判断</code></pre>
      <h3>列表推导式</h3>
      <pre><code>squares = [x**2 for x in range(10)]
evens   = [x for x in range(100) if x % 2 == 0]</code></pre>` },
    { title: "字典 dict 与集合 set", dur: "15min", content: `
      <h3>字典：键值对（安全工具里最常用）</h3>
      <pre><code>host = {"ip": "10.0.0.5", "ports": [22, 80], "os": "Linux"}
print(host["ip"])
host["risk"] = "high"          # 增改
for k, v in host.items():      # 遍历
    print(k, "=", v)</code></pre>
      <h3>集合：去重神器</h3>
      <pre><code>logs = ["10.0.0.1", "10.0.0.2", "10.0.0.1"]
uniq = set(logs)               # {'10.0.0.1', '10.0.0.2'}
print(len(uniq))               # 统计独立访问者</code></pre>` },
    { title: "字符串处理", dur: "15min", content: `
      <pre><code>log = "2026-10-24 Failed login from 1.2.3.4 user=admin"
print(log.split(" "))            # 按空格切分
print(log.startswith("2026"))    # True
print(log.replace("Failed", "FAIL"))
print(log[12:18])                # Failed
print(log.lower().count("fail")) # 1</code></pre>
      <h3>实战：解析登录日志</h3>
      <pre><code>lines = [
  "Failed login from 1.1.1.1 user=root",
  "Success login from 2.2.2.2 user=admin",
  "Failed login from 1.1.1.1 user=root",
]
from collections import Counter
fails = Counter(l.split("from ")[1].split()[0]
                for l in lines if l.startswith("Failed"))
print(fails.most_common(1))   # [('1.1.1.1', 2)] → 可疑IP</code></pre>` },
    { title: "元组与解包", dur: "10min", content: `
      <pre><code>point = (3, 5)          # 元组不可修改
x, y = point            # 解包
first, *rest = [1,2,3,4]  # first=1, rest=[2,3,4]

def get_pos():
    return 10, 20       # 实质返回元组
a, b = get_pos()</code></pre>
      <p>函数返回多值、交换变量 <code>a, b = b, a</code> 都靠它。</p>` },
    ]
  },
  {
    title: "第三章 · 函数与模块",
    lessons: [
    { title: "函数定义与参数", dur: "18min", content: `
      <pre><code>def check_password(pwd, min_len=8):
    """检查密码强度，返回(是否合格, 原因)"""
    if len(pwd) &lt; min_len:
        return False, "长度不足"
    if pwd.isalpha() or pwd.isdigit():
        return False, "缺少字符多样性"
    return True, "合格"

ok, msg = check_password("abc123")
print(ok, msg)</code></pre>
      <h3>作用域与 *args/**kwargs</h3>
      <pre><code>def report(host, *ports, **options):
    print(host, ports, options)

report("10.0.0.1", 80, 443, timeout=3)
# 10.0.0.1 (80, 443) {'timeout': 3}</code></pre>` },
    { title: "模块与包", dur: "12min", content: `
      <pre><code>import os                     # 标准库
from datetime import datetime
import numpy as np            # 起别名

print(os.getcwd())
print(datetime.now())

# 安装第三方库
# pip install requests</code></pre>
      <h3>常用标准库（安全方向）</h3>
      <ul>
        <li><code>hashlib</code> 哈希 · <code>base64</code> 编解码</li>
        <li><code>socket</code> 网络编程 · <code>subprocess</code> 执行命令</li>
        <li><code>re</code> 正则 · <code>json</code> 数据解析 · <code>argparse</code> 命令行参数</li>
      </ul>` },
    { title: "异常处理", dur: "12min", content: `
      <pre><code>try:
    n = int(input("输入数字："))
    result = 100 / n
except ValueError:
    print("不是有效数字")
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:      # 兜底（放最后）
    print(f"未知错误: {e}")
else:
    print(f"结果={result}")
finally:
    print("无论如何都执行")</code></pre>
      <div class="tip">💡 安全工具开发铁律：网络请求、文件操作必须包 try/except，防止目标异常导致工具崩溃。</div>` },
    { title: "文件操作", dur: "15min", content: `
      <pre><code># 读取（with 自动关闭）
with open("access.log", "r", encoding="utf-8") as f:
    for line in f:              # 逐行读，省内存
        if "Failed" in line:
            print(line.strip())

# 写入
with open("report.txt", "w", encoding="utf-8") as f:
    f.write("扫描报告\n")
    f.write("发现开放端口: 80,443\n")</code></pre>
      <p>模式：<code>r</code> 读 · <code>w</code> 覆盖写 · <code>a</code> 追加 · <code>rb/wb</code> 二进制。</p>` },
    ]
  },
  {
    title: "第四章 · 面向对象与进阶",
    lessons: [
    { title: "类与对象", dur: "18min", content: `
      <pre><code>class Vulnerability:
    def __init__(self, name, severity, cve=None):
        self.name = name
        self.severity = severity   # high / medium / low
        self.cve = cve

    def report(self):
        tag = f"[{self.cve}]" if self.cve else ""
        return f"{self.name} {tag} 严重度:{self.severity}"

    def __lt__(self, other):    # 支持排序
        order = {"high":0, "medium":1, "low":2}
        return order[self.severity] &lt; order[other.severity]

vulns = [
    Vulnerability("SQL注入", "high", "CVE-2024-0001"),
    Vulnerability("XSS", "low"),
]
for v in sorted(vulns):
    print(v.report())</code></pre>` },
    { title: "继承与魔法方法", dur: "15min", content: `
      <pre><code>class Scanner:
    def __init__(self, target):
        self.target = target
    def run(self):
        raise NotImplementedError

class PortScanner(Scanner):
    def run(self):
        return f"扫描 {self.target} 的端口..."

class WebScanner(Scanner):
    def run(self):
        return f"扫描 {self.target} 的 Web 漏洞..."

for s in [PortScanner("10.0.0.1"), WebScanner("http://x.com")]:
    print(s.run())   # 多态</code></pre>
      <p>常用魔法方法：<code>__init__</code> 构造 · <code>__str__</code> 打印 · <code>__len__</code> 长度 · <code>__eq__</code> 比较。</p>` },
    { title: "生成器与装饰器", dur: "15min", content: `
      <h3>生成器：边生成边消费，省内存</h3>
      <pre><code>def ip_range(cidr):
    a, b = cidr.split("/")[0].rsplit(".", 1)
    for i in range(1, 255):
        yield f"{a}.{i}"

for ip in ip_range("10.0.0.0/24"):
    print(ip)   # 处理百万级 IP 也不爆内存</code></pre>
      <h3>装饰器：函数套函数</h3>
      <pre><code>import time, functools
def timed(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        t0 = time.time()
        r = func(*args, **kw)
        print(f"{func.__name__} 耗时 {time.time()-t0:.2f}s")
        return r
    return wrapper

@timed
def scan():
    time.sleep(1)
scan()</code></pre>` },
    ]
  },
  {
    title: "第五章 · Python 安全工具开发",
    lessons: [
    { title: "Socket 网络编程", dur: "20min", content: `
      <h3>TCP 客户端与端口扫描</h3>
      <pre><code>import socket

def port_scan(host, ports=(21,22,80,443,3389,8080)):
    open_ports = []
    for port in ports:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)              # 超时防止卡死
        if s.connect_ex((host, port)) == 0:
            open_ports.append(port)
        s.close()
    return open_ports

print(port_scan("127.0.0.1"))</code></pre>
      <div class="warn">⚠️ 只扫描自己的机器（127.0.0.1）或授权靶机。</div>` },
    { title: "HTTP 请求库 requests", dur: "18min", content: `
      <pre><code>import requests

r = requests.get("https://httpbin.org/get", timeout=5)
print(r.status_code)          # 200
print(r.headers["Content-Type"])

# 带参数与头
r = requests.get("http://httpbin.org/headers",
                 headers={"User-Agent": "MyScanner/1.0"})

# POST 登录模拟
r = requests.post("http://httpbin.org/post",
                  data={"user": "admin", "pass": "123456"})
print(r.json())</code></pre>
      <h3>目录探测小工具</h3>
      <pre><code>paths = ["admin", "login", "backup", ".git"]
for p in paths:
    r = requests.get(f"http://httpbin.org/{p}", timeout=3)
    if r.status_code == 200:
        print("[+] 发现:", p)</code></pre>` },
    { title: "hashlib 与 base64 实战", dur: "15min", content: `
      <pre><code>import hashlib, base64

# 哈希
print(hashlib.md5(b"admin").hexdigest())
print(hashlib.sha256(b"admin").hexdigest())

# Base64 编解码
enc = base64.b64encode("flag{py_rocks}".encode())
print(enc.decode())                       # ZmxhZ3tweV9yb2Nrc30=
print(base64.b64decode(enc).decode())     # 还原

# 简单字典爆破（自测用途）
import itertools
target = hashlib.md5(b"123").hexdigest()
for n in range(1000):
    if hashlib.md5(str(n).encode()).hexdigest() == target:
        print("破解出:", n); break</code></pre>` },
    { title: "正则表达式", dur: "18min", content: `
      <pre><code>import re

log = """
2026-10-24 10:01 Failed login from 192.168.1.23 user=root
2026-10-24 10:02 Failed login from 192.168.1.23 user=admin
2026-10-24 10:05 Success login from 10.0.0.9 user=bob
"""

# 提取所有失败登录的 IP
ips = re.findall(r"Failed login from ([\\d.]+)", log)
print(ips)

# 验证邮箱格式
pattern = r"^[\\w.-]+@[\\w-]+\\.[a-z]{2,}$"
print(re.match(pattern, "a@b.com"))   # 匹配成功

# 敏感信息脱敏
print(re.sub(r"user=\\w+", "user=***", log))</code></pre>
      <p>正则是日志分析、信息提取的核心技能，务必多练。</p>` },
    ]
  },
  {
    title: "第六章 · Python 实战项目",
    lessons: [
    { title: "项目：弱口令检测器", dur: "20min", content: `
      <h3>思路</h3>
      <p>对<b>自己搭建</b>的登录页面，用常见弱密码字典做登录测试，检验是否允许弱口令。</p>
      <pre><code>import requests

url = "http://127.0.0.1:5000/login"   # 本地测试站
usernames = ["admin", "test"]
passwords = ["123456", "admin", "password", "admin123"]

for u in usernames:
    for p in passwords:
        r = requests.post(url, data={"user": u, "pass": p},
                          timeout=5)
        if "welcome" in r.text.lower():   # 依实际响应判断
            print(f"[+] 弱口令: {u} / {p}")
            break</code></pre>
      <div class="warn">⚠️ 加 time.sleep 限速；仅测试授权目标。企业合规做法是导出密码哈希离线跑，而非在线爆破。</div>` },
    { title: "项目：日志分析告警脚本", dur: "20min", content: `
      <pre><code>from collections import Counter
import re, time

THRESHOLD = 5   # 同一 IP 失败超过 5 次即告警

def analyze(path):
    fails = Counter()
    with open(path, encoding="utf-8") as f:
        for line in f:
            m = re.search(r"Failed login from ([\\d.]+)", line)
            if m:
                fails[m.group(1)] += 1
    for ip, cnt in fails.most_common():
        if cnt &gt;= THRESHOLD:
            print(f"[ALERT] {time.ctime()} 疑似爆破: "
                  f"{ip} 失败 {cnt} 次")

analyze("auth.log")</code></pre>
      <p>扩展方向：接入邮件/webhook 告警、增量 tail -f 监控、可视化报表。</p>` },
    { title: "项目：子命令行安全工具箱", dur: "20min", content: `
      <h3>用 argparse 打造专业 CLI</h3>
      <pre><code>import argparse, hashlib, base64

def main():
    p = argparse.ArgumentParser(description="安全工具箱")
    sub = p.add_subparsers(dest="cmd")

    h = sub.add_parser("hash")
    h.add_argument("text")
    h.add_argument("--algo", default="sha256",
                   choices=["md5", "sha256"])

    b = sub.add_parser("b64")
    b.add_argument("text")
    b.add_argument("-d", "--decode", action="store_true")

    args = p.parse_args()
    if args.cmd == "hash":
        m = getattr(hashlib, args.algo)
        print(m(args.text.encode()).hexdigest())
    elif args.cmd == "b64":
        if args.decode:
            print(base64.b64decode(args.text).decode())
        else:
            print(base64.b64encode(args.text.encode()).decode())

if __name__ == "__main__":
    main()</code></pre>
      <pre><code>python toolbox.py hash admin --algo md5
python toolbox.py b64 "ZmxhZw==" -d</code></pre>` },
    { title: "下一步：进阶路线图", dur: "10min", content: `
      <h3>学完本章后去哪</h3>
      <ul>
        <li><b>Web 框架</b>：Flask / FastAPI，自己写安全 API 与管理面板。</li>
        <li><b>并发</b>：threading / asyncio，给扫描器提速。</li>
        <li><b>逆向基础</b>：学 C 与汇编，进入二进制世界。</li>
        <li><b>考证路线</b>：CISP-PTE / OSCP（渗透），CISSP（管理）。</li>
      </ul>
      <div class="tip">💡 最好的学习闭环：学一个工具 → 亲手复现一个 → 给它加一个自己的功能。坚持在 GitHub 上记录你的项目。</div>` },
    ]
  },
]
},
];

/* ================= 视频教程数据 =================
   bvid 为 B 站真实视频号；page 为多 P 系列的集数 */
const XD_BV = "BV1JZ4y1c7ro"; // 【小迪安全】web安全|渗透测试|网络安全（6个月线上培训全套）b23.tv/Un2XH7j

const VIDEOS = [
  { title: "【小迪安全】Web安全｜渗透测试｜网络安全（6个月线上培训全套）", level: "主线课程", bvid: "BV1JZ4y1c7ro", page: 1,
    note: "B 站公开全套 88 天课程：基础→信息收集→注入→XSS→提权内网→应急响应→SRC。本应用每个课时右侧已内嵌对应分 P。" },
  { title: "【小迪安全】全栈网络安全 2024 最新版（完）", level: "进阶课程", bvid: "BV123yAYMEwb", page: 1,
    note: "2024 版全栈网安+红蓝对抗，学完主线后进阶观看。" },
  { title: "零基础小白入门网安学习秘诀（学习方法论）", level: "入门先看", bvid: "BV1dM3ezNEFH", page: 1,
    note: "盲打、搜资料、找资源、学习方法——正式开课前先看这个。" },
  { title: "【暗月渗透】红队攻防工程师｜渗透测试（完结版）", level: "第二视角", bvid: "BV1NQ4y1n7rM", page: 1,
    note: "另一套优质体系课，适合学完小迪后交叉印证。" },
];

/* 课时 → 小迪安全分P 映射（课程大纲 Day 对应，部分为约数） */
const XIAODI_MAP = {
  "sec/什么是网络安全": 1, "sec/法律红线：白帽子守则": 2,
  "sec/网络协议基础：TCP/IP": 4, "sec/HTTP 协议与抓包入门": 6,
  "sec/域名与子域名收集": 13, "sec/端口扫描原理与 Nmap": 14, "sec/指纹识别与目录爆破": 15,
  "sec/SQL 注入原理与防御": 16, "sec/XSS 跨站脚本": 25, "sec/CSRF 与 SSRF": 29,
  "sec/文件上传与命令注入": 31,
  "sec/对称与非对称加密": 7, "sec/哈希、加盐与密码存储": 8, "sec/认证、会话与 OAuth": 9,
  "sec/社会工程学：最脆弱的环节是人": 42, "sec/应急响应与日志分析": 73, "sec/加固清单：把门焊死": 74,
  "sec/CTF 竞赛模式与上手": 83, "sec/常见解题套路": 84, "sec/搭建自己的靶场": 3,
  "py/Socket 网络编程": 76, "py/HTTP 请求库 requests": 77, "py/hashlib 与 base64 实战": 77,
  "py/正则表达式": 78, "py/项目：弱口令检测器": 79, "py/项目：日志分析告警脚本": 79,
  "py/项目：子命令行安全工具箱": 79,
};

/* ================= 测验题库 ================= */
const QUIZZES = [
  { q: "网络安全 CIA 三要素不包括以下哪项？", opts: ["机密性", "完整性", "可审计性", "可用性"], ans: 2 },
  { q: "TCP 建立连接需要几次握手？", opts: ["2 次", "3 次", "4 次", "1 次"], ans: 1 },
  { q: "防止 SQL 注入最有效的方法是：", opts: ["过滤单引号", "参数化查询", "前端校验", "隐藏报错"], ans: 1 },
  { q: "以下哪种哈希算法适合存储用户密码？", opts: ["MD5", "SHA-1", "bcrypt", "CRC32"], ans: 2 },
  { q: "存储型 XSS 的恶意代码存放在哪里？", opts: ["URL 参数", "数据库", "HTTP 头", "浏览器缓存"], ans: 1 },
  { q: "CSRF 攻击利用了浏览器的什么机制？", opts: ["自动执行 JS", "自动携带 Cookie", "缓存策略", "同源策略"], ans: 1 },
  { q: "Nmap 的 SYN 半开扫描对应哪个参数？", opts: ["-sT", "-sS", "-sU", "-sV"], ans: 1 },
  { q: "HTTPS 中用于验证服务器身份的是：", opts: ["对称密钥", "数字证书", "MAC 地址", "Session ID"], ans: 1 },
  { q: "Python 中以下哪个是不可变类型？", opts: ["list", "dict", "set", "tuple"], ans: 3 },
  { q: "以下代码输出什么？ print(type({}))", opts: ["&lt;class 'set'&gt;", "&lt;class 'dict'&gt;", "&lt;class 'list'&gt;", "&lt;class 'tuple'&gt;"], ans: 1 },
  { q: "Python 表达式 7 // 2 的结果是：", opts: ["3.5", "3", "4", "1"], ans: 1 },
  { q: "with open(...) 的主要好处是：", opts: ["读得更快", "自动关闭文件", "支持加密", "能写二进制"], ans: 1 },
  { q: "下列哪个不是合法的 Python 变量名？", opts: ["_pwd", "pwd2", "2pwd", "PwD"], ans: 2 },
  { q: "防爆破登录最合理的措施是：", opts: ["隐藏登录入口", "失败锁定+验证码+限速", "换默认端口", "加密传输"], ans: 1 },
  { q: "勒索软件防御的最后防线通常是：", opts: ["杀毒软件", "离线备份", "防火墙", "强密码"], ans: 1 },
];
