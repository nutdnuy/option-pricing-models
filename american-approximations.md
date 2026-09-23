---
title: American Approximations
description: Barone-Adesi-Whaley และ Bjerksund-Stensland
inline_math: true
---

# American Approximations

<p class="lead">ประมาณมูลค่าของสิทธิใช้ก่อนครบกำหนดด้วย European value และ Early Exercise Premium</p>

สูตรขอบเขตการใช้สิทธิในบทนี้พิจารณา Call ที่ $S,K,\sigma,\tau>0$, $r>0$ และ $b<r$ หาก $b\ge r$ ภายใต้ $r\ge0$ จะไม่มีประโยชน์จากการใช้ Call ก่อนกำหนด จึงใช้ $C^A=c$ และไม่แทนค่าลงสูตรขอบเขตที่มีตัวหาร $r-b$ โดยตรง สำหรับ BAW ที่ $r=0$ ต้องใช้ลิมิต $M/k\to2/(\sigma^2\tau)$ แทนการหาร $0/0$; สูตรขอบเขต Bjerksund–Stensland ที่แสดงด้านล่างจำกัดไว้ที่เงื่อนไขข้างต้น

## การประมาณของบาโรเน-อาเดซี-เวลีย์ (Barone-Adesi-Whaley, 1987)

วิธีบาโรเน-อาเดซี-เวลีย์ เสนอโดย โจวานนี บาโรเน-อาเดซี (Giovanni Barone-Adesi) และ โรเบิร์ต เวลีย์ (Robert E. Whaley) (Barone-Adesi and Whaley 1987) เพื่อแก้ปัญหาที่การคำนวณเชิงต้นไม้ใช้เวลานาน แนวคิดหลักคือมูลค่าออปชันอเมริกันเท่ากับมูลค่าออปชันยุโรปบวกกับส่วนเพิ่มของการใช้สิทธิล่วงหน้า (Early Exercise Premium) จากนั้นใช้การประมาณเชิงวิเคราะห์ (analytical approximation) แบบกำลังสอง (quadratic approximation) โดยแปลงสมการเชิงอนุพันธ์ย่อยให้เป็นสมการเชิงอนุพันธ์สามัญ (ordinary differential equation, ODE) แบบออยเลอร์ (Euler equation) แล้วหาผลเฉลย

ให้ $\varepsilon(S,\tau) = V^{A}(S,\tau) - V^{E}(S,\tau)$ เป็นส่วนเพิ่มของการใช้สิทธิล่วงหน้า โดย $\tau = T-t$ และให้ $b$ เป็นต้นทุนการถือครอง ในบริเวณที่ยังไม่ใช้สิทธิ (continuation region) ทั้ง $V^{A}$ และ $V^{E}$ สอดคล้องกับ PDE แบล็ก-โชลส์เวอร์ชันทั่วไป $$\begin{equation}
\label{eq:baw-pde}
  \frac12\sigma^2 S^2 \varepsilon_{SS} + bS\,\varepsilon_S - r\varepsilon - \varepsilon_\tau = 0,
\end{equation}$$ $\varepsilon$ ก็สอดคล้องกับ PDE เดียวกัน กำหนด $M = 2r/\sigma^2$, $\mathcal{N} = 2b/\sigma^2$ และ $k(\tau) = 1-\mathrm{e}^{-r\tau}$ (เราใช้อักษร $k$ ตัวเล็กเพื่อไม่ให้สับสนกับราคาใช้สิทธิ $K$) แล้วเขียน $\varepsilon = k(\tau)\,g(S,k)$ ตามข้อเสนอของแมกมิลลัน (MacMillan)

**Proposition 17** (สมการกำลังสองของ BAW). *เมื่อประมาณโดยละเลยพจน์ $M(1-k)\,\partial g/\partial k$ ฟังก์ชัน $g$ สอดคล้องกับ ODE แบบออยเลอร์ $$\begin{equation}
\label{eq:baw-euler}
  S^2 g_{SS} + \mathcal{N} S\,g_S - \frac{M}{k}\,g = 0,
\end{equation}$$ ซึ่งมีผลเฉลยรูป $g = S^{q}$ โดย $q$ เป็นรากของสมการกำลังสองลักษณะเฉพาะ (characteristic quadratic) $$\begin{equation}
\label{eq:baw-char}
  q^2 + (\mathcal{N}-1)q - \frac{M}{k} = 0,
  \qquad
  q_2 = \frac{-(\mathcal{N}-1) + \sqrt{(\mathcal{N}-1)^2 + 4M/k}}{2}.
\end{equation}$$*

*Proof.* แทน $\varepsilon = k(\tau)g(S,k)$ ลงใน [eq:baw-pde] โดยใช้กฎลูกโซ่ $\varepsilon_\tau = k'g + k\,g_k\,k'$ และ $k'(\tau) = r\mathrm{e}^{-r\tau} = r(1-k)$ ดังนั้น $\varepsilon_\tau = r(1-k)\big(g + k\,g_k\big)$. หารตลอดด้วย $\tfrac12\sigma^2 k$ และใช้ $M,\mathcal{N}$ ที่นิยามไว้ พร้อมรวมพจน์ $-Mg - \frac{M}{k}(1-k)g = -\frac{M}{k}g$ ได้ $$\begin{equation*}
  S^2 g_{SS} + \mathcal{N}S g_S - \frac{M}{k}g - M(1-k)\,g_k = 0.
\end{equation*}$$ การประมาณกำลังสองของ BAW คือละพจน์ $M(1-k)g_k$ ซึ่งสมเหตุสมผลในสองขีดจำกัด: เมื่อ $\tau\to\infty$ ตัวประกอบ $(1-k)=\mathrm{e}^{-r\tau}\to 0$ และเมื่อ $\tau\to 0$ ส่วนเพิ่มของการใช้สิทธิล่วงหน้า $\varepsilon$ เองมีค่าเล็กมากจนความคลาดเคลื่อนจากการละพจน์นี้ไม่ส่งผลต่อราคาอย่างมีนัยสำคัญ เหลือ [eq:baw-euler]. เนื่องจากเป็นสมการออยเลอร์ ลองผลเฉลย $g=S^q$ แทนแล้วได้ $q(q-1)+\mathcal{N}q - M/k = 0$ ซึ่งจัดรูปเป็น [eq:baw-char]. เลือกรากบวก $q_2$ สำหรับออปชันซื้อเพื่อให้ส่วนเพิ่ม $\varepsilon$ ลู่เข้าสู่ศูนย์เมื่อ $S\to0$. ◻

**Theorem 18** (สูตรประมาณ BAW สำหรับออปชันซื้อแบบอเมริกัน). *ราคาออปชันซื้อแบบอเมริกันประมาณได้ด้วย $$\begin{equation}
\label{eq:baw-call}
  C^{A}(S) \approx
  \begin{cases}
    c(S) + A_2\left(\dfrac{S}{S^\ast}\right)^{q_2}, & S < S^\ast,\\[2ex]
    S - K, & S \ge S^\ast,
  \end{cases}
\end{equation}$$ โดย $c(S)$ คือราคาออปชันซื้อแบบยุโรป (แบล็ก-โชลส์/แบล็ก-76 ตามค่า $b$) ราคาวิกฤต $S^\ast$ (critical exercise price) เป็นผลเฉลยของเงื่อนไขการเชื่อมต่อแบบราบรื่น (value-matching และ smooth-pasting) $$\begin{equation}
\label{eq:baw-boundary}
  S^\ast - K = c(S^\ast) + \frac{S^\ast}{q_2}\Big(1 - \mathrm{e}^{(b-r)\tau}\Phi(d_1(S^\ast))\Big),
\end{equation}$$ และ $A_2 = \dfrac{S^\ast}{q_2}\big(1 - \mathrm{e}^{(b-r)\tau}\Phi(d_1(S^\ast))\big)$ โดยที่ $d_1$ ในที่นี้ใช้รูปทั่วไปที่มีต้นทุนการถือครอง $b$ คือ $d_1(S) = \big[\ln(S/K)+(b+\tfrac12\sigma^2)\tau\big]\big/\big(\sigma\sqrt{\tau}\big)$ (ลดรูปเป็น [eq:bs-d1d2] เมื่อ $b=r$ และเป็น [eq:b76-d] เมื่อ $b=0$).*

*แนวพิสูจน์.* ที่ราคาใต้จุดวิกฤต ($S<S^\ast$) ยังไม่ใช้สิทธิ มูลค่าเท่ากับออปชันยุโรปบวกส่วนเพิ่ม $\varepsilon = A_2 (S/S^\ast)^{q_2}$ ที่ราคาเหนือหรือเท่ากับ $S^\ast$ ใช้สิทธิทันทีจึงได้ $S-K$. ค่าคงตัว $A_2$ และราคาวิกฤต $S^\ast$ กำหนดจากเงื่อนไขสองข้อ ณ $S=S^\ast$: (i) value-matching $c(S^\ast)+A_2 = S^\ast - K$ และ (ii) smooth-pasting คือความชันเท่ากันสองข้าง $c'(S^\ast) + q_2 A_2/S^\ast = 1$. ใช้ $c'(S^\ast) = \mathrm{e}^{(b-r)\tau}\Phi(d_1(S^\ast))$ (เดลตาของออปชันยุโรป) แก้ (ii) หา $A_2$ แล้วแทนใน (i) ได้ [eq:baw-boundary] ซึ่งแก้เชิงตัวเลข (เช่น นิวตัน-ราฟสัน) เพื่อหา $S^\ast$. ◻

*Remark 19*. กรณีออปชันขายแบบอเมริกันใช้รากลบ $q_1 = \tfrac12\big[-(\mathcal{N}-1)-\sqrt{(\mathcal{N}-1)^2+4M/k}\big]$ และส่วนเพิ่ม $A_1(S/S^{\ast\ast})^{q_1}$ โดยมีเงื่อนไขขอบเขตในลักษณะคู่ขนาน.

## การประมาณของบเยิร์กซุนด์-สเตนสลันด์ (Bjerksund-Stensland, 1993)

วิธีบเยิร์กซุนด์-สเตนสลันด์ ถูกเสนอโดย เพตเตอร์ บเยิร์กซุนด์ (Petter Bjerksund) และ กุนนาร์ สเตนสลันด์ (Gunnar Stensland) (Bjerksund and Stensland 1993) แนวคิดหลักคือแทนขอบเขตการใช้สิทธิที่แท้จริง (ซึ่งขึ้นกับเวลา) ด้วย *ขอบเขตแบน* (flat exercise boundary) ที่เป็นราคากระตุ้นคงที่ $X$ (trigger price) เพียงค่าเดียว วิธีนี้ให้สูตรปิดโดยประมาณที่คำนวณเร็วมากและมีความแม่นยำใกล้เคียงกับ BAW

**Theorem 20** (สูตรปิดโดยประมาณของบเยิร์กซุนด์-สเตนสลันด์). *กำหนดค่าคงที่ $$\begin{equation}
\label{eq:bjerk-beta}
  \beta = \Big(\tfrac12 - \tfrac{b}{\sigma^2}\Big) + \sqrt{\Big(\tfrac{b}{\sigma^2}-\tfrac12\Big)^2 + \tfrac{2r}{\sigma^2}},
\end{equation}$$ ราคากระตุ้น $X$ และค่าคงตัว $\alpha$ $$\begin{equation}
\label{eq:bjerk-trigger}
  B_\infty = \frac{\beta}{\beta-1}K,\quad
  B_0 = \max\!\Big(K,\ \tfrac{r}{r-b}K\Big),\quad
  X = B_0 + (B_\infty-B_0)\big(1-\mathrm{e}^{h(\tau)}\big),\quad
  \alpha = (X-K)X^{-\beta},
\end{equation}$$ โดย $h(\tau) = -\big(b\tau + 2\sigma\sqrt{\tau}\big)\dfrac{B_0}{B_\infty-B_0}$ ราคาออปชันซื้อแบบอเมริกันสำหรับกรณี $S<X$ ประมาณได้ด้วย $$\begin{multline}
\label{eq:bjerk-call}
  C^{A}(S) \approx \alpha S^{\beta}
  - \alpha\,\phi(S,\tau;\beta,X,X)
  + \phi(S,\tau;1,X,X)\\
  {}- \phi(S,\tau;1,K,X)
  - K\,\phi(S,\tau;0,X,X)
  + K\,\phi(S,\tau;0,K,X),
\end{multline}$$ ส่วนกรณี $S\ge X$ ใช้สิทธิทันทีได้ $C^{A}(S)=S-K$. ฟังก์ชันช่วย $\phi$ นิยามเป็น $$\begin{equation}
\label{eq:bjerk-phi}
  \phi(S,\tau;\gamma,H,X) = \mathrm{e}^{\lambda\tau}S^{\gamma}\Big[\Phi(d) - \Big(\tfrac{X}{S}\Big)^{\kappa}\Phi\!\Big(d - \tfrac{2\ln(X/S)}{\sigma\sqrt{\tau}}\Big)\Big],
\end{equation}$$ และ $$\begin{equation}
\label{eq:bjerk-aux}
  \lambda = -r + \gamma b + \tfrac12\gamma(\gamma-1)\sigma^2,\quad
  d = -\frac{\ln(S/H) + \big(b+(\gamma-\tfrac12)\sigma^2\big)\tau}{\sigma\sqrt{\tau}},\quad
  \kappa = \frac{2b}{\sigma^2} + (2\gamma-1).
\end{equation}$$*

*แนวพิสูจน์.* กำหนดกลยุทธ์การใช้สิทธิแบบง่าย: ใช้สิทธิทันทีที่ $S$ แตะราคากระตุ้นคงที่ $X\ge K$ เป็นครั้งแรก มูลค่าของกลยุทธ์นี้เป็นขอบเขตล่างของราคาออปชันอเมริกันที่แท้จริง (เพราะเป็นเวลาหยุดที่ยอมรับได้แต่ไม่จำเป็นต้องเหมาะสมที่สุด) ฟังก์ชัน $\phi(S,\tau;\gamma,H,X)$ คือค่าคาดหวังคิดลดของ $S_\tau^{\gamma}\mathbf{1}_{\{S_\tau<H\}}$ ภายใต้เงื่อนไขว่าราคายังไม่เคยแตะ $X$ ตลอดช่วง ซึ่งคำนวณได้ในรูปปิดโดยหลักการสะท้อน (reflection principle) ของการเคลื่อนที่แบบบราวน์ที่มีอุปสรรค (barrier) พจน์ $\alpha S^\beta$ แทนมูลค่าเมื่อราคาแตะขอบเขต ส่วนพจน์ $\phi$ ที่เหลือปรับแก้ผลตอบแทนภายในบริเวณต่อเนื่อง เมื่อรวมเข้าด้วยกันตามโครงสร้าง [eq:bjerk-call] จะได้ราคาประมาณ ราคากระตุ้น $X$ ถูกเลือกให้เหมาะสมโดยประมาณผ่าน [eq:bjerk-trigger] ซึ่งสอดแทรกระหว่างค่าขอบเขตทันที $B_0$ กับค่าขอบเขตเมื่อ $\tau\to\infty$ คือ $B_\infty$. ◻

*Remark 21*. บเยิร์กซุนด์และสเตนสลันด์ปรับปรุงวิธีนี้ในปี ค.ศ. 2002 โดยใช้ขอบเขตแบนสองช่วง (two-step flat boundary) เพื่อเพิ่มความแม่นยำ แต่โครงสร้างเชิงทฤษฎีของฟังก์ชัน $\phi$ ยังคงเดิม.
