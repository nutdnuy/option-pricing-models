---
title: Unifying Theory
description: Feynman-Kac, Green function และความสัมพันธ์ European-American
inline_math: true
---

# Unifying Theory

<p class="lead">เชื่อมสมการเชิงอนุพันธ์ย่อยกับค่าคาดหวัง แล้วปิดภาพด้วยความสัมพันธ์ No-arbitrage ระหว่างออปชันยุโรปและอเมริกัน</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

## สูตรไฟย์นมัน-แคตซ์ (Feynman-Kac Formula)

สูตรไฟย์นมัน-แคตซ์ พัฒนาจากงานของ ริชาร์ด ไฟย์นมัน (Richard Feynman) (Feynman 1948) และ มาร์ก แคตซ์ (Mark Kac) (Kac 1949) เป็นสะพานเชื่อมระหว่างสมการเชิงอนุพันธ์ย่อยแบบพาราโบลา (parabolic partial differential equation) กับค่าคาดหวังบนกระบวนการสุ่ม วิธีนี้ลดความซับซ้อนของ PDE โดยเปลี่ยนปัญหาให้อยู่ในรูปค่าคาดหวังของฟังก์ชันบนวิถี (trajectory) ของสมการเชิงอนุพันธ์สโทแคสติก (Stochastic Differential Equation) แล้วหาย้อนกลับจากเงื่อนไขปลายทาง (Terminal condition) ที่ทราบ ข้อจำกัดสำคัญคือใช้ได้เมื่อตัวดำเนินการ (operator) ยังคงคุณสมบัติเชิงเส้น (linear) เท่านั้น

**Definition 22** (PDE แบบพาราโบลาและตัวกำเนิดเชิงอนุพันธ์). สมการเชิงอนุพันธ์ย่อยอันดับสองในรูป $$\begin{equation}
\label{eq:parabolic}
  \frac{\partial u}{\partial t} + \mathcal{A}u - r(x,t)u + f(x,t) = 0,
  \qquad
  \mathcal{A} = \mu(x,t)\frac{\partial}{\partial x} + \tfrac12\sigma^2(x,t)\frac{\partial^2}{\partial x^2},
\end{equation}$$ เรียกว่าแบบ *พาราโบลา* เมื่อสัมประสิทธิ์การแพร่ $\sigma^2(x,t)\ge 0$ (ดิสคริมิแนนต์ของส่วนอันดับสองเป็นศูนย์) ตัวดำเนินการ $\mathcal{A}$ เรียกว่าตัวกำเนิดเชิงอนุพันธ์ (infinitesimal generator) ของกระบวนการแพร่ $X_t$ ที่มี drift $\mu$ และความผันผวน $\sigma$.

**Definition 23** (ตัวดำเนินการเชิงเส้นและฟังก์ชันตัวชี้บ่ง). ตัวดำเนินการ $\mathcal{A}$ เป็นเชิงเส้นถ้า $\mathcal{A}(a u + b v) = a\,\mathcal{A}u + b\,\mathcal{A}v$ สำหรับค่าคงที่ $a,b$ ใด ๆ และฟังก์ชัน $u,v$ ที่หาอนุพันธ์ได้พอเพียง; ฟังก์ชันตัวชี้บ่ง (indicator function) นิยามโดย $\mathbf{1}_{A}(x) = 1$ เมื่อ $x\in A$ และ $0$ เมื่ออื่น ๆ ใช้สำหรับแยกบริเวณเงื่อนไข เช่น เขียนผลตอบแทนออปชันซื้อเป็น $(S-K)\mathbf{1}_{\{S>K\}}$.

**Theorem 24** (สูตรไฟย์นมัน-แคตซ์ รูปทั่วไป). *ให้ $u(x,t)$ เป็นผลเฉลยของ [eq:parabolic] ภายใต้เงื่อนไขปลายทาง $u(x,T)=g(x)$ โดยกระบวนการอ้างอิงเป็นไปตาม $\mathrm{d}X_s = \mu(X_s,s)\mathrm{d}s + \sigma(X_s,s)\mathrm{d}W_s$, $X_t=x$ แล้ว $$\begin{equation}
\label{eq:fk-general}
  u(x,t) = \mathbb{E}\!\left[ \mathrm{e}^{-\int_t^T r(X_s,s)\,\mathrm{d}s} g(X_T)
  + \int_t^T \mathrm{e}^{-\int_t^s r(X_v,v)\,\mathrm{d}v} f(X_s,s)\,\mathrm{d}s \;\Big|\; X_t = x \right].
\end{equation}$$*

*Proof.* นิยามกระบวนการที่คิดลด $Y_s = \mathrm{e}^{-\int_t^s r(X_v,v)\mathrm{d}v}u(X_s,s) + \int_t^s \mathrm{e}^{-\int_t^v r}f(X_v,v)\mathrm{d}v$. ใช้เล็มมาของอิโตกับ $u(X_s,s)$ ร่วมกับตัวประกอบคิดลด แล้วรวมพจน์ที่เป็น $\mathrm{d}s$ $$\begin{equation*}
  \mathrm{d}Y_s = \mathrm{e}^{-\int_t^s r}\Big(\underbrace{u_s + \mathcal{A}u - r u + f}_{=0\ \text{ตาม}~\eqref{eq:parabolic}}\Big)\mathrm{d}s
  + \mathrm{e}^{-\int_t^s r}\,\sigma(X_s,s)\,u_x\,\mathrm{d}W_s.
\end{equation*}$$ พจน์ดริฟท์เป็นศูนย์เพราะ $u$ สอดคล้อง PDE ดังนั้น $Y_s$ เป็นมาร์ทิงเกลเฉพาะที่ (local martingale) ภายใต้เงื่อนไขการเติบโตที่เหมาะสมจะเป็นมาร์ทิงเกลจริง (ดูรายละเอียดเชิงทฤษฎีการวัดใน (Karatzas and Shreve 1991; Shreve 2004)) จับค่าคาดหวังของ $Y_T$ เท่ากับ $Y_t = u(x,t)$ และแทน $u(X_T,T)=g(X_T)$ ได้ [eq:fk-general]. ◻

**Corollary 25** (แบล็ก-โชลส์ที่มีพารามิเตอร์ขึ้นกับเวลา). *สำหรับแบบจำลองแบล็ก-โชลส์ที่มีอัตราดอกเบี้ย $r(t)$ อัตราปันผล $q(t)$ และความผันผวน $\sigma(t)$ ขึ้นกับเวลา (แต่ไม่ขึ้นกับราคา) สูตรไฟย์นมัน-แคตซ์ให้ราคาออปชันซื้อในรูปเดียวกับแบล็ก-โชลส์ โดยแทนพารามิเตอร์คงที่ด้วยค่าเฉลี่ยเชิงปริพันธ์ $$\begin{equation}
\label{eq:fk-bs-avg}
  \bar r = \frac1\tau\!\int_t^T\! r(s)\mathrm{d}s,\quad
  \bar q = \frac1\tau\!\int_t^T\! q(s)\mathrm{d}s,\quad
  \bar\sigma^2 = \frac1\tau\!\int_t^T\! \sigma^2(s)\mathrm{d}s,\quad \tau=T-t,
\end{equation}$$ กล่าวคือ $C = S_0\mathrm{e}^{-\bar q\tau}\Phi(d_1) - K\mathrm{e}^{-\bar r\tau}\Phi(d_2)$ โดย $d_{1,2}$ ใช้ $\bar r,\bar q,\bar\sigma$.*

*Proof.* เนื่องจากพารามิเตอร์ขึ้นกับเวลาแต่เป็นฟังก์ชันกำหนด (deterministic) การอินทิเกรต $\int_t^T r(s)\mathrm{d}s = \bar r\tau$ เป็นค่าคงที่ กระบวนการล็อกราคายังเป็นเกาส์เซียนที่มีค่าเฉลี่ย $(\bar r-\bar q-\tfrac12\bar\sigma^2)\tau$ และความแปรปรวน $\bar\sigma^2\tau$ แทนใน [eq:fk-general] ด้วย $g(S)=(S-K)^+$ แล้วดำเนินการเช่นเดียวกับผลสืบเนื่อง 8 โดยใช้ตัวชี้บ่ง $\mathbf{1}_{\{S_T>K\}}$ ได้ผลลัพธ์. ◻

*Remark 26*. ตัวดำเนินการ (operator) ทำหน้าที่ให้เกิดพลวัต (evolution) ของระบบที่สนใจ โดยการนำไปกระทำกับฟังก์ชัน กล่าวได้ว่าตัวดำเนินการทำหน้าที่เป็นตัวกำเนิด (generator) ของพลวัตต่าง ๆ ความเป็นเชิงเส้นของ $\mathcal{A}$ คือเงื่อนไขที่ทำให้ไฟย์นมัน-แคตซ์ใช้ได้ หาก PDE ไม่เป็นเชิงเส้น (เช่น แบบจำลองที่มีต้นทุนธุรกรรมของเลอลันด์ หรือแบบจำลองความผันผวนไม่แน่นอนแบบแบล็ก-โชลส์-บาเรนบลัตต์) การแทนด้วยค่าคาดหวังอย่างง่ายจะไม่เป็นจริง ทั้งนี้พึงสังเกตว่าแบบจำลองความผันผวน*สุ่ม* เช่น เฮสตัน ยังคงให้ PDE เชิงเส้น (เพียงแต่มีมิติสูงขึ้น) จึงยังใช้ไฟย์นมัน-แคตซ์ได้.

## ฟังก์ชันกรีน (Green Function)

ฟังก์ชันกรีน (Green function) เป็นเครื่องมือเชิงวิเคราะห์ที่ให้ผลเฉลยของ PDE เชิงเส้นในรูปปริพันธ์ของเงื่อนไขปลายทาง แนวคิดคือหาผลเฉลยพื้นฐาน (fundamental solution) ที่ตอบสนองต่อแรงกระตุ้นแบบจุด (point source) แล้วซ้อนทับ (superpose) ด้วยหลักการเชิงเส้น

**Definition 27** (ฟังก์ชันกรีน / ผลเฉลยพื้นฐาน). ฟังก์ชันกรีน $G(x,t;y,T)$ ของตัวดำเนินการ [eq:parabolic] (กรณี $f=0$) คือผลเฉลยของ $$\begin{equation}
\label{eq:green-eq}
  \frac{\partial G}{\partial t} + \mathcal{A}G - r(x,t)G = 0,
  \qquad
  \lim_{t\uparrow T} G(x,t;y,T) = \delta(x-y),
\end{equation}$$ โดย $\delta$ คือฟังก์ชันเดลตาของดิแรก (Dirac delta).

**Theorem 28** (การแทนด้วยฟังก์ชันกรีน). *ผลเฉลยของ [eq:parabolic] (กรณี $f=0$) ที่มีเงื่อนไขปลายทาง $u(x,T)=g(x)$ เขียนได้เป็น $$\begin{equation}
\label{eq:green-rep}
  u(x,t) = \int_{-\infty}^{\infty} G(x,t;y,T)\,g(y)\,\mathrm{d}y.
\end{equation}$$ สำหรับแบล็ก-โชลส์ที่มีพารามิเตอร์ขึ้นกับเวลา ฟังก์ชันกรีนในตัวแปรล็อก $\xi=\ln S$ คือเคอร์เนลความร้อนแบบเกาส์ (Gaussian heat kernel) $$\begin{equation}
\label{eq:green-bs}
  G(\xi,t;\eta,T) = \frac{\mathrm{e}^{-\bar r\tau}}{\sqrt{2\pi\bar\sigma^2\tau}}
  \exp\!\left(-\frac{\big(\eta - \xi - (\bar r-\bar q-\tfrac12\bar\sigma^2)\tau\big)^2}{2\bar\sigma^2\tau}\right),
\end{equation}$$ โดย $\bar r,\bar q,\bar\sigma^2$ ตาม [eq:fk-bs-avg].*

*Proof.* ความเป็นเชิงเส้นของตัวดำเนินการทำให้ผลรวม (integral superposition) ของผลเฉลยพื้นฐานเป็นผลเฉลยด้วย ตรวจสอบเงื่อนไขปลายทางโดยให้ $t\uparrow T$ แล้ว $G\to\delta(x-y)$ ทำให้ $u(x,T)=\int\delta(x-y)g(y)\mathrm{d}y = g(x)$ ตามต้องการ. สำหรับแบล็ก-โชลส์ เปลี่ยนตัวแปรเป็น $\xi=\ln S$ แปลง PDE [eq:bs-pde] ให้เป็นสมการความร้อนที่มีสัมประสิทธิ์คงที่ (หลังดูดพจน์ดริฟท์และพจน์ $-ru$) ผลเฉลยพื้นฐานของสมการความร้อนคือเคอร์เนลเกาส์ ให้ [eq:green-bs]. แทนใน [eq:green-rep] ด้วย $g(S)=(S-K)^+$ จะได้สูตรแบล็ก-โชลส์กลับคืน ซึ่งสอดคล้องกับผลจากไฟย์นมัน-แคตซ์ในผลสืบเนื่อง 25 แสดงให้เห็นความเท่าเทียมกันของมุมมองเชิง PDE (กรีน) และเชิงความน่าจะเป็น (ไฟย์นมัน-แคตซ์). ◻

## ความสัมพันธ์ระหว่างออปชันแบบยุโรปและแบบอเมริกัน

ท้ายที่สุดเราแสดงความสัมพันธ์เชิงไร้การเก็งกำไรระหว่างออปชันสองประเภท ผลลัพธ์เหล่านี้เป็นเหตุผลว่าเหตุใดวิธีประมาณในหัวข้อ 8–9 จึงเริ่มจากราคาออปชันยุโรปแล้วบวกส่วนเพิ่ม

**Proposition 29** (ออปชันอเมริกันมีค่าไม่ต่ำกว่ายุโรป). *สำหรับออปชันชนิดเดียวกันที่มี $K,T$ เท่ากัน $C_A \ge C_E$ และ $P_A \ge P_E$ เสมอ.*

*Proof.* เซตของกลยุทธ์การใช้สิทธิของออปชันอเมริกัน (เวลาหยุด $\tau\in[t,T]$ ใด ๆ) ครอบคลุมกลยุทธ์ของยุโรป (บังคับ $\tau=T$) เป็นเซตย่อย ดังนั้นซูพรีมัมใน [eq:am-price] ย่อมไม่ต่ำกว่าค่าเฉพาะใน [eq:rn-price] เชิงการเก็งกำไร หากสมมติว่า $C_A < C_E$ ผู้ลงทุนสามารถซื้ออเมริกัน ขายยุโรป ได้กำไรทันทีโดยไม่มีความเสี่ยง (เพราะสิทธิของอเมริกันเหนือกว่า) ซึ่งขัดกับหลักไร้การเก็งกำไร. ◻

**Theorem 30** (ออปชันซื้อแบบอเมริกันบนหุ้นไม่จ่ายปันผลเท่ากับแบบยุโรป). *ถ้าสินทรัพย์อ้างอิงไม่จ่ายปันผลระหว่างช่วงชีวิตของออปชัน และ $r\ge 0$ แล้วการใช้สิทธิออปชันซื้อแบบอเมริกันก่อนกำหนดไม่เคยเหมาะสม ดังนั้น $C_A = C_E$.*

*Proof.* จากขอบเขตล่างของราคาออปชันซื้อยุโรป (no-arbitrage lower bound) เรามี $$\begin{equation}
\label{eq:call-bound}
  C_E(S_t,t) \ge S_t - K\mathrm{e}^{-r(T-t)} \ge S_t - K,
\end{equation}$$ โดยอสมการแรกมาจากการเปรียบเทียบพอร์ต “ถือออปชันซื้อกับเงินสด $K\mathrm{e}^{-r(T-t)}$” เทียบกับ “ถือหุ้นหนึ่งหน่วย” (Merton 1973) และอสมการที่สองมาจาก $r\ge 0$ ทำให้ $K\mathrm{e}^{-r(T-t)}\le K$. เนื่องจาก $C_E\ge 0$ ด้วยเสมอ จึงสรุปได้ว่า $C_E(S,s) \ge (S-K)^+$ สำหรับทุก $s\in[t,T]$.

พิจารณาเวลาหยุด $\tau\in\mathcal{T}_{[t,T]}$ ใด ๆ นำอสมการข้างต้น ณ เวลา $\tau$ มาใช้ได้ $(S_\tau-K)^+ \le C_E(S_\tau,\tau)$ และเนื่องจากกระบวนการราคายุโรปที่คิดลด $\mathrm{e}^{-rs}C_E(S_s,s)$ เป็นมาร์ทิงเกลภายใต้ $\mathbb{Q}$ (เพราะเป็นค่าคาดหวังแบบมีเงื่อนไขของผลตอบแทนคิดลดที่ตายตัว) ทฤษฎีบทการสุ่มหยุดเหมาะสม (optional sampling) ให้ $$\begin{equation*}
  \mathbb{E}^{\mathbb{Q}}\big[\mathrm{e}^{-r(\tau-t)}(S_\tau-K)^+ \,\big|\, \mathcal{F}_t\big]
  \;\le\; \mathbb{E}^{\mathbb{Q}}\big[\mathrm{e}^{-r(\tau-t)}C_E(S_\tau,\tau) \,\big|\, \mathcal{F}_t\big]
  \;=\; C_E(S_t,t).
\end{equation*}$$ จับซูพรีมัมทางซ้ายเหนือทุก $\tau\in\mathcal{T}_{[t,T]}$ ได้ $C_A \le C_E$ รวมกับ $C_A \ge C_E$ จากบทตั้ง 29 สรุป $C_A = C_E$ กล่าวคือส่วนเพิ่มของการใช้สิทธิล่วงหน้าเป็นศูนย์ และการใช้สิทธิก่อนกำหนดไม่เคยให้มูลค่าสูงกว่าการถือจนครบกำหนด (อสมการเคร่งเมื่อ $r>0$ และ $t<T$). ◻

*Remark 31*. สำหรับออปชัน*ขาย*แบบอเมริกัน ผลลัพธ์ต่างออกไป เพราะขอบเขตล่าง $P_E \ge K\mathrm{e}^{-r(T-t)} - S_t$ อาจต่ำกว่ามูลค่าการใช้สิทธิทันที $K - S_t$ เมื่อออปชันอยู่ในเงินลึก ทำให้การใช้สิทธิก่อนกำหนดอาจเหมาะสม จึงเกิดส่วนเพิ่ม $P_A > P_E$ อย่างแท้จริง และเป็นเหตุผลที่ต้องอาศัยวิธีเชิงต้นไม้หรือวิธีประมาณเชิงวิเคราะห์ในหัวข้อ 8–9 สำหรับกรณีนี้.

## บทสรุป (Conclusion)

บทความนี้ได้ทบทวนพัฒนาการของแบบจำลองการกำหนดราคาออปชันอย่างเป็นระบบ เริ่มจากแบบจำลองบาเชอลิเยที่รองรับราคาติดลบ ไปสู่แบล็ก-โชลส์-เมอร์ตันและแบล็ก-76 สำหรับสัญญาที่ต่างชนิดกัน ในส่วนของออปชันแบบอเมริกันเราได้แสดงแบบจำลองเชิงต้นไม้ทั้งทวินามและไตรนามพร้อมบทพิสูจน์การลู่เข้าสู่แบล็ก-โชลส์ด้วยทฤษฎีบทลิมิตกลาง และยืนยันอัตราการลู่เข้าเชิงคำนวณ ตลอดจนวิธีประมาณเชิงวิเคราะห์ของบาโรเน-อาเดซี-เวลีย์และบเยิร์กซุนด์-สเตนสลันด์ สุดท้ายเราได้ร้อยเรียงแบบจำลองเหล่านี้เข้ากับเครื่องมือเชิงทฤษฎีคือสูตรไฟย์นมัน-แคตซ์และฟังก์ชันกรีน ซึ่งแสดงความเท่าเทียมกันระหว่างมุมมองเชิงความน่าจะเป็นและเชิงสมการเชิงอนุพันธ์ย่อย พร้อมทั้งพิสูจน์ความสัมพันธ์ไร้การเก็งกำไรระหว่างออปชันแบบยุโรปและอเมริกัน

Amin, Kaushik, and Ajay Khanna. 1994. “Convergence of American Option Values from Discrete- to Continuous-Time Financial Models.” *Mathematical Finance* 4 (4): 289–304. <https://doi.org/10.1111/j.1467-9965.1994.tb00059.x>.

Bachelier, Louis. 1900. “Théorie de La Spéculation.” *Annales Scientifiques de l’École Normale Supérieure* 17: 21–86. <https://doi.org/10.24033/asens.476>.

Barone-Adesi, Giovanni, and Robert E. Whaley. 1987. “Efficient Analytic Approximation of American Option Values.” *The Journal of Finance* 42 (2): 301–20. <https://doi.org/10.1111/j.1540-6261.1987.tb02569.x>.

Bjerksund, Petter, and Gunnar Stensland. 1993. “Closed-Form Approximation of American Options.” *Scandinavian Journal of Management* 9: S87–99. <https://doi.org/10.1016/0956-5221(93)90009-H>.

Black, Fischer. 1976. “The Pricing of Commodity Contracts.” *Journal of Financial Economics* 3 (1–2): 167–79. <https://doi.org/10.1016/0304-405X(76)90024-6>.

Black, Fischer, and Myron Scholes. 1973. “The Pricing of Options and Corporate Liabilities.” *Journal of Political Economy* 81 (3): 637–54. <https://doi.org/10.1086/260062>.

Boyle, Phelim P. 1986. “Option Valuation Using a Three-Jump Process.” *International Options Journal* 3: 7–12.

CME Group. 2020a. *Advisory Notice \#20-152: CME Clearing Plan to Address the Potential of a Negative Underlying in Certain Energy Options Contracts*. CME Group Advisory.

CME Group. 2020b. *Advisory Notice \#20-171: Switch to Bachelier Options Pricing Model – Effective April 22, 2020*. CME Group Advisory.

Cox, John C., Stephen A. Ross, and Mark Rubinstein. 1979. “Option Pricing: A Simplified Approach.” *Journal of Financial Economics* 7 (3): 229–63. <https://doi.org/10.1016/0304-405X(79)90015-1>.

Feynman, Richard P. 1948. “Space-Time Approach to Non-Relativistic Quantum Mechanics.” *Reviews of Modern Physics* 20 (2): 367–87. <https://doi.org/10.1103/RevModPhys.20.367>.

Hull, John C. 2018. *Options, Futures, and Other Derivatives*. 10th ed. Pearson.

Kac, Mark. 1949. “On Distributions of Certain Wiener Functionals.” *Transactions of the American Mathematical Society* 65 (1): 1–13. <https://doi.org/10.2307/1990512>.

Karatzas, Ioannis, and Steven E. Shreve. 1991. *Brownian Motion and Stochastic Calculus*. 2nd ed. Vol. 113. Graduate Texts in Mathematics. Springer. <https://doi.org/10.1007/978-1-4612-0949-2>.

Merton, Robert C. 1973. “Theory of Rational Option Pricing.” *The Bell Journal of Economics and Management Science* 4 (1): 141–83. <https://doi.org/10.2307/3003143>.

Shreve, Steven E. 2004. *Stochastic Calculus for Finance II: Continuous-Time Models*. Springer Finance. <https://doi.org/10.1007/978-1-4757-4296-1>.
