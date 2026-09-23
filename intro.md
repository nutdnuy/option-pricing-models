---
title: Option Pricing Models
description: แบบจำลองการกำหนดราคาออปชันจาก Bachelier ถึงวิธีประมาณออปชันแบบอเมริกัน พร้อมสมการ กราฟ และห้องทดลอง
---

# Option Pricing Models

<div class="welcome-hero">
<p class="welcome-kicker">QuantCorner · Mathematical Finance</p>
<div class="welcome-lead">จาก Bachelier<br>ถึง American Approximations</div>
<p class="welcome-summary">อ่านพัฒนาการของแบบจำลองราคาออปชันอย่างเป็นลำดับ ตั้งแต่การเคลื่อนที่แบบบราวน์ สูตรแบบยุโรป ต้นไม้เชิงตัวเลข ไปจนถึง Early Exercise Premium และเครื่องมือที่เชื่อมทั้งหมดเข้าด้วยกัน</p>
<div class="welcome-actions"><a class="button primary" href="foundations.html">เริ่มจากพื้นฐาน <span aria-hidden="true">→</span></a><a class="welcome-text-link" href="#lessons">ดูทั้ง 5 ตอน <span aria-hidden="true">↓</span></a></div>
<p class="welcome-format">สมการที่อ่านได้บนเว็บ · กราฟจากแบบจำลอง · ห้องทดลองปรับพารามิเตอร์</p>
</div>

<ol class="model-timeline" aria-label="พัฒนาการของแบบจำลองราคาออปชัน">
<li><strong>1900</strong><span>Bachelier</span></li><li><strong>1973</strong><span>Black–Scholes–Merton</span></li><li><strong>1976</strong><span>Black-76</span></li><li><strong>1979–86</strong><span>Binomial & Trinomial</span></li><li><strong>1987–93</strong><span>American Approximations</span></li>
</ol>

<div class="welcome-preparation"><h2>ก่อนเริ่ม</h2><p>ควรคุ้นกับมูลค่าเวลา ความผันผวน การแจกแจงปกติ และแนวคิด No-arbitrage เนื้อหานี้อธิบายแบบจำลองและข้อสมมติ ไม่ใช่คำแนะนำลงทุนหรือราคาที่ใช้ซื้อขายได้ทันที</p></div>

<h2 id="lessons">บทเรียน 5 ตอน</h2>

<div class="welcome-lessons">
<article class="welcome-lesson"><span class="welcome-lesson-number">01</span><div><p class="welcome-lesson-label">เริ่มจาก payoff และ stochastic process</p><h3><a href="foundations.html">Foundations & Bachelier</a></h3><p>European vs American, risk-neutral valuation, ABM และแบบจำลองที่รองรับราคาอ้างอิงติดลบ</p><p class="welcome-topics">Payoff · Risk-neutral measure · ABM</p><a class="welcome-text-link" href="foundations.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">02</span><div><p class="welcome-lesson-label">สูตรปิดสำหรับออปชันแบบยุโรป</p><h3><a href="european-models.html">BSM & Black-76</a></h3><p>แยกการใช้กับหุ้นและฟิวเจอร์ พร้อมดูผลของพารามิเตอร์ผ่านห้องทดลอง</p><p class="welcome-topics">GBM · PDE · Futures options</p><a class="welcome-text-link" href="european-models.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">03</span><div><p class="welcome-lesson-label">จากเวลาแบบต่อเนื่องสู่ต้นไม้</p><h3><a href="lattice-models.html">Lattice Models</a></h3><p>Binomial, Trinomial และการลู่เข้าสู่ราคา Black–Scholes</p><p class="welcome-topics">Backward induction · Convergence · CLT</p><a class="welcome-text-link" href="lattice-models.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">04</span><div><p class="welcome-lesson-label">เมื่อสิทธิใช้ได้ก่อนครบกำหนด</p><h3><a href="american-approximations.html">American Approximations</a></h3><p>มองราคาเป็น European value บวก Early Exercise Premium</p><p class="welcome-topics">BAW · Bjerksund–Stensland · Exercise boundary</p><a class="welcome-text-link" href="american-approximations.html">อ่านตอนนี้ →</a></div></article>
<article class="welcome-lesson"><span class="welcome-lesson-number">05</span><div><p class="welcome-lesson-label">ภาพเดียวที่เชื่อมทุกแบบจำลอง</p><h3><a href="unifying-theory.html">Unifying Theory</a></h3><p>Feynman–Kac, Green function และความสัมพันธ์ระหว่างออปชันยุโรปกับอเมริกัน</p><p class="welcome-topics">PDE ↔ Expectation · Green function · No-arbitrage</p><a class="welcome-text-link" href="unifying-theory.html">อ่านตอนนี้ →</a></div></article>
</div>

<div class="viz-directory"><h2>Interactive labs · ทดลองได้ 5 ชุด</h2><p>ปรับพารามิเตอร์ ดูกราฟ และอ่านผลคำนวณจากสถานการณ์สมมติ</p><ul><li><a href="european-models.html#option-model-lab">Option model explorer</a></li><li><a href="foundations.html#payoff-lab">Payoff และกำไรขาดทุน</a></li><li><a href="foundations.html#distribution-lab">Normal กับ Lognormal</a></li><li><a href="lattice-models.html#tree-lab">ทดลองต้นไม้ Binomial</a></li><li><a href="lattice-models.html#convergence-lab">จำนวนขั้นและการลู่เข้า</a></li></ul></div>

<!-- author-profile -->

<div class="welcome-resources"><h3>ต้นฉบับ</h3><p>เรียบเรียงจากบทความ “แบบจำลองการกำหนดราคาออปชัน: จากบาเชอลิเยถึงการประมาณค่าออปชันแบบอเมริกัน” โดย Triphop Mahithitarmmatorn</p><div class="welcome-download"><a href="downloads/option-pricing-models.pdf" download>ดาวน์โหลด PDF</a><a href="foundations.md" download>ดาวน์โหลด Markdown ตอนแรก</a></div></div>
