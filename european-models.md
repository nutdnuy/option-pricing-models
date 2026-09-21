---
title: BSM & Black-76
description: แบบจำลอง Black-Scholes-Merton และ Black-76
inline_math: true
---

# BSM & Black-76

<p class="lead">เปรียบเทียบแบบจำลองสำหรับหุ้นกับฟิวเจอร์ และดูว่ากระบวนการสุ่มกับ Cost of carry เปลี่ยนสูตรราคาอย่างไร</p>

<div class="paper-note">เนื้อหานี้นำเข้าจากต้นฉบับ LaTeX ของ Triphop Mahithitarmmatorn และจัดรูปแบบใหม่สำหรับการอ่านบนเว็บ สมการ ตาราง รูป และข้อสรุปยังอ้างอิงต้นฉบับเดิม</div>

## แบบจำลองแบล็ก-โชลส์-เมอร์ตัน (Black-Scholes-Merton Model, 1973)

แบบจำลองในยุคถัดมาถูกเสนอโดย ฟิสเชอร์ แบล็ก (Fischer Black), ไมรอน เอส. โชลส์ (Myron S. Scholes) และ โรเบิร์ต ซี. เมอร์ตัน (Robert C. Merton) (Black and Scholes 1973; Merton 1973) ผลงานนี้ทำให้โชลส์และเมอร์ตันได้รับรางวัลโนเบลสาขาเศรษฐศาสตร์ (Nobel Memorial Prize in Economic Sciences) ในปี ค.ศ. 1997 สิ่งที่แบบจำลองนี้ปรับปรุงจากแบบจำลองบาเชอลิเยคือ ผลตอบแทนของสินทรัพย์มีการกระจายตัวแบบล็อกนอร์มัล (Log-normal Distribution) หรือกล่าวได้ว่าราคาสินทรัพย์เคลื่อนที่แบบสุ่มเชิงเรขาคณิต (Geometric Brownian Motion, GBM) ซึ่งรับประกันว่าราคายังคงเป็นบวกเสมอ อย่างไรก็ตามในยุคเริ่มต้นออปชันถูกพัฒนาสำหรับดัชนีและหุ้นเป็นหลัก หากนำไปใช้กับสัญญาฟิวเจอร์แบบจำลองนี้จะยังไม่เหมาะสม เพราะการถือหุ้นมีค่าเสียโอกาส (cost of carry) จากการนำเงินไปซื้อหุ้นแทนที่จะฝากธนาคาร แต่สำหรับฟิวเจอร์ไม่มีต้นทุนการถือครองในลักษณะเดียวกัน ประเด็นนี้จะนำไปสู่แบบจำลองแบล็ก-76 ในหัวข้อ 4

**Assumption 5** (พลวัตแบบ GBM). ภายใต้มาตรวัดเชิงกลาง-ความเสี่ยง ราคาสินทรัพย์เป็นไปตาม SDE $$\begin{equation}
\label{eq:gbm-sde}
  \mathrm{d}S_t = r S_t\,\mathrm{d}t + \sigma S_t\,\mathrm{d}W_t,
\end{equation}$$ โดย $r$ คืออัตราดอกเบี้ยไร้ความเสี่ยง และ $\sigma>0$ คือความผันผวน จากเล็มมาของอิโต (Itô’s lemma) จะได้ $\mathrm{d}\ln S_t = (r-\tfrac12\sigma^2)\mathrm{d}t + \sigma\,\mathrm{d}W_t$ ดังนั้น $S_T = S_0\exp\!\big((r-\tfrac12\sigma^2)T + \sigma W_T\big)$ ซึ่งเป็นการกระจายตัวแบบล็อกนอร์มัล.

**Theorem 6** (สมการเชิงอนุพันธ์ย่อยแบล็ก-โชลส์). *ให้ $V(S,t)$ เป็นมูลค่าพอร์ตของอนุพันธ์ที่ขึ้นกับ $S$ และ $t$ ภายใต้สมมติฐาน 5 และการซื้อขายต่อเนื่องโดยไม่มีต้นทุนธุรกรรม มูลค่า $V$ ต้องสอดคล้องกับสมการเชิงอนุพันธ์ย่อย (partial differential equation, PDE) $$\begin{equation}
\label{eq:bs-pde}
  \frac{\partial V}{\partial t}
  + \frac12\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}
  + r S \frac{\partial V}{\partial S}
  - r V = 0.
\end{equation}$$*

*Proof.* สร้างพอร์ตโฟลิโอป้องกันความเสี่ยง $\Pi = V - \Delta S$ โดยถืออนุพันธ์หนึ่งหน่วยและขายชอร์ตสินทรัพย์อ้างอิง $\Delta$ หน่วย เพื่อหลีกเลี่ยงการวนตรรกะ (เพราะมาตรวัดเชิงกลาง-ความเสี่ยงเป็น*ผลลัพธ์*ของหลักไร้การเก็งกำไร) เราทำงานภายใต้มาตรวัดจริงซึ่งราคาเป็นไปตาม $\mathrm{d}S_t = \mu S_t\,\mathrm{d}t + \sigma S_t\,\mathrm{d}W_t$ โดย $\mu$ คืออัตราผลตอบแทนคาดหวังใด ๆ ใช้เล็มมาของอิโตกับ $V(S,t)$ $$\begin{equation*}
  \mathrm{d}V = \Big(\frac{\partial V}{\partial t} + \mu S\frac{\partial V}{\partial S}
  + \frac12\sigma^2 S^2\frac{\partial^2 V}{\partial S^2}\Big)\mathrm{d}t
  + \sigma S\frac{\partial V}{\partial S}\,\mathrm{d}W_t.
\end{equation*}$$ ดังนั้น $$\begin{equation*}
  \mathrm{d}\Pi = \mathrm{d}V - \Delta\,\mathrm{d}S
  = \Big(\frac{\partial V}{\partial t} + \frac12\sigma^2 S^2\frac{\partial^2 V}{\partial S^2}
  + \mu S\Big(\frac{\partial V}{\partial S} - \Delta\Big)\Big)\mathrm{d}t
  + \sigma S\Big(\frac{\partial V}{\partial S} - \Delta\Big)\mathrm{d}W_t.
\end{equation*}$$ เลือก $\Delta = \partial V/\partial S$ เพื่อกำจัดพจน์สุ่ม $\mathrm{d}W_t$ ซึ่งกำจัดพจน์ที่ขึ้นกับ $\mu$ ไปพร้อมกัน (นี่คือเหตุผลที่ราคาออปชันไม่ขึ้นกับอัตราผลตอบแทนคาดหวังของสินทรัพย์) ทำให้พอร์ตโฟลิโอไร้ความเสี่ยงในทันที ตามหลักไร้การเก็งกำไรผลตอบแทนของพอร์ตโฟลิโอไร้ความเสี่ยงต้องเท่ากับอัตราไร้ความเสี่ยง $\mathrm{d}\Pi = r\Pi\,\mathrm{d}t = r(V-\Delta S)\mathrm{d}t$ เมื่อจับพจน์ $\mathrm{d}t$ ให้เท่ากันและแทน $\Delta=\partial V/\partial S$ จะได้ [eq:bs-pde] ตามต้องการ. ◻

*Remark 7*. บทพิสูจน์ข้างต้นเป็นแบบฮิวริสติกตามตำรามาตรฐาน: ขั้นตอน $\mathrm{d}\Pi = \mathrm{d}V - \Delta\,\mathrm{d}S$ ละเลยพจน์จากการเปลี่ยนแปลงของ $\Delta$ เอง ซึ่งจะถูกต้องเคร่งครัดก็ต่อเมื่อกลยุทธ์เป็นแบบหาเงินทุนในตัว (self-financing) การพิสูจน์อย่างเคร่งครัดสร้างพอร์ตโฟลิโอจำลอง (replicating portfolio) แบบ self-financing โดยตรง ดู (Karatzas and Shreve 1991; Shreve 2004).

**Corollary 8** (สูตรราคาออปชันแบล็ก-โชลส์). *ราคาออปชันซื้อและออปชันขายแบบยุโรปที่สอดคล้องกับ [eq:bs-pde] ภายใต้เงื่อนไขปลายทาง [eq:payoff] คือ $$\begin{align}
  C_{\mathrm{BS}} &= S_0\,\Phi(d_1) - K\mathrm{e}^{-rT}\Phi(d_2), \label{eq:bs-call}\\
  P_{\mathrm{BS}} &= K\mathrm{e}^{-rT}\Phi(-d_2) - S_0\,\Phi(-d_1), \label{eq:bs-put}
\end{align}$$ โดย $$\begin{equation}
\label{eq:bs-d1d2}
  d_1 = \frac{\ln(S_0/K) + (r+\tfrac12\sigma^2)T}{\sigma\sqrt{T}},
  \qquad d_2 = d_1 - \sigma\sqrt{T}.
\end{equation}$$*

*Proof.* คำนวณค่าคาดหวัง [eq:rn-price] โดยตรง เขียน $S_T = S_0\mathrm{e}^{(r-\frac12\sigma^2)T+\sigma\sqrt{T}Z}$ โดย $Z\sim\mathcal{N}(0,1)$ ผลตอบแทนเป็นบวกเมื่อ $S_T>K$ กล่าวคือ $Z > -d_2$ ดังนั้น $$\begin{equation*}
  C_{\mathrm{BS}} = \mathrm{e}^{-rT}\!\int_{-d_2}^{\infty}\!\big(S_0\mathrm{e}^{(r-\frac12\sigma^2)T+\sigma\sqrt{T}z} - K\big)\varphi(z)\,\mathrm{d}z.
\end{equation*}$$ สำหรับพจน์แรก ทำการเติมกำลังสองสมบูรณ์ (complete the square) ในเลขชี้กำลัง $$\begin{equation*}
  -\tfrac12 z^2 + \sigma\sqrt{T}\,z = -\tfrac12(z-\sigma\sqrt{T})^2 + \tfrac12\sigma^2 T,
\end{equation*}$$ ทำให้พจน์คิดลดและพจน์ $\mathrm{e}^{-\frac12\sigma^2 T}$ ตัดกับตัวประกอบ $\mathrm{e}^{rT}$ เหลือ $S_0\int_{-d_2}^\infty \varphi(z-\sigma\sqrt{T})\mathrm{d}z = S_0\,\Phi(d_2+\sigma\sqrt{T}) = S_0\,\Phi(d_1)$. พจน์ที่สองให้ $-K\mathrm{e}^{-rT}\Phi(d_2)$ โดยตรง รวมกันได้ [eq:bs-call]. สูตรออปชันขาย [eq:bs-put] ตามมาจากความเสมอภาคระหว่างพุต-คอล (put-call parity) $C - P = S_0 - K\mathrm{e}^{-rT}$. ◻

## แบบจำลองแบล็ก-76 (Black-76 Model, 1976)

แบบจำลองแบล็ก-76 เสนอโดย ฟิสเชอร์ แบล็ก (Fischer Black) ในปี ค.ศ. 1976 (Black 1976) เป็นแนวทางแก้ปัญหาที่แบบจำลองแบล็ก-โชลส์เดิมใช้กับสัญญาฟิวเจอร์ไม่ได้ ประเด็นหลักคือต้นทุนการถือครองสินทรัพย์ (cost of carry, $b$) เนื่องจากฟิวเจอร์ไม่มีภาระการถือครอง จึงกำหนดให้ $b=0$ สำหรับฟิวเจอร์ ราคาฟิวเจอร์ $F$ ที่ตกลงกันถือเป็นมูลค่าในอนาคตที่ถูกคิดกลับมาสู่ปัจจุบันเรียบร้อยแล้ว ต่างจากหุ้นที่ราคาปัจจุบันเป็นมูลค่าที่ต้องจ่ายจริงในทันที ดังนั้นทั้งราคาฟิวเจอร์ $F$ และราคาใช้สิทธิ $K$ จึงถูกคิดลด (discounting) กลับสู่มูลค่าปัจจุบัน (present value) ด้วยตัวประกอบ $\mathrm{e}^{-rT}$ เพียงตัวเดียว

**Theorem 9** (สูตรราคาออปชันแบล็ก-76). *ให้ราคาฟิวเจอร์เป็นไปตาม $\mathrm{d}F_t = \sigma F_t\,\mathrm{d}W_t$ ภายใต้มาตรวัดเชิงกลาง-ความเสี่ยง (drift เป็นศูนย์เพราะฟิวเจอร์เป็นมาร์ทิงเกล) ราคาออปชันซื้อและขายแบบยุโรปคือ $$\begin{align}
  C_{76} &= \mathrm{e}^{-rT}\big[F\,\Phi(d_1) - K\,\Phi(d_2)\big], \label{eq:b76-call}\\
  P_{76} &= \mathrm{e}^{-rT}\big[K\,\Phi(-d_2) - F\,\Phi(-d_1)\big], \label{eq:b76-put}
\end{align}$$ โดย $$\begin{equation}
\label{eq:b76-d}
  d_1 = \frac{\ln(F/K)+\tfrac12\sigma^2 T}{\sigma\sqrt{T}}, \qquad d_2 = d_1-\sigma\sqrt{T}.
\end{equation}$$*

*Proof.* เนื่องจากฟิวเจอร์ไม่ต้องใช้เงินลงทุนเริ่มต้น ราคาฟิวเจอร์จึงเป็นมาร์ทิงเกลภายใต้ $\mathbb{Q}$ กล่าวคือ drift เท่ากับศูนย์ ดังนั้น $F_T = F\exp(-\tfrac12\sigma^2 T + \sigma\sqrt{T}Z)$ โดย $Z\sim\mathcal{N}(0,1)$ แทนใน $C_{76} = \mathrm{e}^{-rT}\mathbb{E}[(F_T-K)^+]$ แล้วดำเนินการเติมกำลังสองสมบูรณ์เช่นเดียวกับบทพิสูจน์ของผลสืบเนื่อง 8 จะได้ [eq:b76-call]. อีกวิธีหนึ่งคือแทน $S_0 = F\mathrm{e}^{-rT}$ ลงใน [eq:bs-call] ซึ่งให้ผลลัพธ์เดียวกันทันที เพราะการแทนดังกล่าวทำให้ $\ln(S_0/K)+(r+\tfrac12\sigma^2)T = \ln(F/K)+\tfrac12\sigma^2 T$. ◻

*Remark 10*. สูตร [eq:b76-call] เป็นกรณีเฉพาะของสูตรทั่วไปที่มีต้นทุนการถือครอง $b$ โดยแทน drift ของสินทรัพย์ด้วย $b$ และคิดลดด้วย $r$; กรณี $b=r$ ให้แบล็ก-โชลส์ (หุ้นไม่จ่ายปันผล) กรณี $b=0$ ให้แบล็ก-76 (ฟิวเจอร์) กรณี $b=r-q$ ให้แบบจำลองของเมอร์ตันสำหรับหุ้นจ่ายปันผลต่อเนื่องอัตรา $q$ (Merton 1973) และกรณี $b=r-r_f$ ให้แบบจำลองการ์มัน-โคลฮาเกนสำหรับออปชันอัตราแลกเปลี่ยน โดย $r_f$ คืออัตราดอกเบี้ยของสกุลเงินต่างประเทศ.

<div id="option-model-lab" class="interactive-mount"></div>
