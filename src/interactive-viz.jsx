import React,{useMemo} from 'react';
import {format} from './ui.jsx';
import {useParams,Choice,Shell,Stats,Plot} from './viz-ui.jsx';
import {grid,positionResult,binomial,europeanPrice,distributions} from './viz-math.mjs';
export function PayoffLab(){
 const [p,R,set,reset]=useParams({kind:'call',side:'1',strike:100,premium:8,terminal:110});
 const xs=grid(0,200),at=s=>positionResult(s,p.strike,p.premium,p.kind,Number(p.side)),selected=at(p.terminal);
 return <Shell title="Payoff vs profit" question="ได้รับเงินจากสิทธิเท่าไร และเหลือกำไรเท่าไรหลังหัก premium?" reset={reset} note="ตัวอย่างสมมติ ณ วันหมดอายุ ต่อ 1 หน่วยสินทรัพย์ ไม่รวมดอกเบี้ยและต้นทุนธุรกรรม Premium เป็นค่าที่กำหนดเอง ไม่ใช่ราคาที่โมเดลประเมิน">
 <div className="controls two"><div><Choice label="Option type" value={p.kind} onChange={v=>set('kind',v)} options={[["call","Call"],["put","Put"]]}/><Choice label="Position" value={p.side} onChange={v=>set('side',v)} options={[["1","Long"],["-1","Short"]]}/>{R('strike','Strike',60,140)}</div><div>{R('premium','Premium',0,25,.5)}{R('terminal','Price at expiry',0,200)}</div></div>
 <Stats items={[["Signed payoff",selected.payoff,"กระแสเงินสดของสถานะ"],["Profit / loss",selected.profit,"หลังรวม premium"],["Breakeven",p.kind==='call'?p.strike+p.premium:p.strike-p.premium,"ราคาวันหมดอายุ"]]}/>
 <Plot title="Payoff and profit at expiry" xLabel="Expiry price" yLabel="Price units" series={[{name:'Signed payoff · เส้นทึบ',values:xs.map(s=>[s,at(s).payoff])},{name:'Profit / loss · เส้นประ',values:xs.map(s=>[s,at(s).profit])}]} markers={[{x:p.terminal,y:selected.profit}]}/></Shell>;
}
export function TreeLab(){
 const [p,R,set,reset]=useParams({kind:'put',american:'yes',spot:100,strike:100,rate:5,vol:20,time:1,steps:3,step:0,ups:0});
 const tree=useMemo(()=>binomial({...p,rate:p.rate/100,vol:p.vol/100,american:p.american==='yes'}),[p.spot,p.strike,p.rate,p.vol,p.time,p.steps,p.kind,p.american]);
 const i=Math.min(p.step,p.steps),j=Math.min(p.ups,i),node=tree.levels[i][j];
 const x=k=>55+k*690/p.steps,y=(k,l)=>210+(k-2*l)*150/p.steps;
 return <Shell title="Binomial tree & early exercise" question="คำนวณราคาย้อนกลับอย่างไร และเมื่อใดการใช้ Put ก่อนกำหนดคุ้มกว่าถือต่อ?" reset={reset} note="CRR tree ภายใต้ risk-neutral q ไม่มีปันผล/ต้นทุนธุรกรรม ค่า q ใช้กำหนดราคา ไม่ใช่ความน่าจะเป็นจริง โหนดเส้นประพร้อมตัว E หมายถึงควรใช้สิทธิก่อนกำหนดตามต้นไม้นี้; M คือวันหมดอายุ ใช้แถบเลื่อนด้านล่างเพื่อตรวจแต่ละโหนด">
 <div className="controls two"><div><Choice label="Tree option" value={p.kind} onChange={v=>set('kind',v)} options={[["put","Put"],["call","Call"]]}/><Choice label="Exercise style" value={p.american} onChange={v=>set('american',v)} options={[["yes","American"],["no","European"]]}/>{R('spot','Initial price',60,140)}{R('strike','Tree strike',60,140)}</div><div>{R('vol','Tree volatility',10,60,1,'%')}{R('rate','Tree interest rate',0,8,.5,'%')}{R('time','Tree maturity',.25,2,.25,' yr')}{R('steps','Tree steps',2,6)}</div></div>
 <Stats items={[["Option price",tree.price,"หน่วยราคา"],["Risk-neutral q",format(tree.q*100,2)+'%',"ความน่าจะเป็นขึ้นสำหรับ pricing"],["Up / down",`${format(tree.u,3)} / ${format(tree.d,3)}`,"ตัวคูณราคาต่อขั้น"]]}/>
 <div className="viz-tree-scroll" tabIndex="0" role="region" aria-label="ต้นไม้ Binomial เลื่อนซ้ายขวาเพื่ออ่าน"><svg viewBox="0 0 810 430" role="img" aria-label="ต้นไม้ราคา S และมูลค่าออปชัน V คำนวณย้อนกลับ"><title>Stock price S and option value V at every node</title>{tree.levels.slice(0,-1).flatMap((row,k)=>row.flatMap((n,l)=>[0,1].map(up=><line key={`${k}-${l}-${up}`} x1={x(k)} y1={y(k,l)} x2={x(k+1)} y2={y(k+1,l+up)} className="viz-tree-edge"/>)))}{tree.levels.flatMap((row,k)=>row.map((n,l)=><g key={`${k}-${l}`}><rect x={x(k)-35} y={y(k,l)-21} width="70" height="42" rx="8" className={n.exercise?'viz-node exercise':'viz-node'} strokeWidth={k===i&&l===j?4:1}/><text x={x(k)} y={y(k,l)-5} textAnchor="middle">S {format(n.spot,1)}</text><text x={x(k)} y={y(k,l)+11} textAnchor="middle">V {format(n.value,2)}</text>{(n.exercise||k===p.steps)&&<text x={x(k)+40} y={y(k,l)+4}>{k===p.steps?'M':'E'}</text>}</g>))}</svg></div>
 <div className="controls two"><div><label className="viz-inspect">Inspect node</label><input aria-label="Inspect step" type="range" min="0" max={p.steps} value={i} onChange={e=>set('step',Number(e.target.value))}/><p>Step {i} of {p.steps}</p></div><div><input aria-label="Up moves" type="range" min="0" max={Math.max(1,i)} value={j} disabled={i===0} onChange={e=>set('ups',Number(e.target.value))}/><p>Up {j} · Down {i-j}</p></div></div>
 <Stats items={[["Exercise value",node.intrinsic,"มูลค่าถ้าใช้สิทธิ"],["Continuation",node.continuation===null?'—':node.continuation,"มูลค่าถือต่อที่คิดลดแล้ว"],["Decision",i===p.steps?'Maturity':node.exercise?'Exercise':'Hold',`Step ${i}, up ${j}`]]}/></Shell>;
}
export function ConvergenceLab(){
 const [p,R,set,reset]=useParams({kind:'call',vol:20,rate:5,time:1,steps:100});
 const params={spot:100,strike:100,rate:p.rate/100,vol:p.vol/100,time:p.time,kind:p.kind};
 const values=useMemo(()=>Array.from({length:p.steps/5},(_,i)=>{const n=(i+1)*5;return [n,binomial({...params,steps:n}).price];}),[p.kind,p.vol,p.rate,p.time,p.steps]);
 const exact=europeanPrice(params),last=values.at(-1)[1];
 return <Shell title="Convergence to Black–Scholes" question="เพิ่มจำนวนขั้นแล้วราคาเข้าใกล้สูตรปิดอย่างไร? ทำไมความคลาดเคลื่อนจึงอาจแกว่ง?" reset={reset} note="European option; S₀ = K = 100 ไม่มีปันผล ใช้ CRR probability แบบ exponential และ BSM ภายใต้พารามิเตอร์เดียวกัน กราฟแสดงทุก 5 ขั้น และขยายแกนราคาเพื่อให้เห็นความคลาดเคลื่อน การเพิ่มขั้นไม่จำเป็นต้องลด error ทุกครั้ง และไม่ช่วยยืนยันความเหมาะสมของแบบจำลองกับตลาด">
 <div className="controls two"><div><Choice label="Convergence option" value={p.kind} onChange={v=>set('kind',v)} options={[["call","European Call"],["put","European Put"]]}/>{R('steps','Maximum steps',20,200,20)}</div><div>{R('vol','Convergence volatility',10,50,1,'%')}{R('rate','Convergence interest',0,8,.5,'%')}{R('time','Convergence maturity',.25,2,.25,' yr')}</div></div>
 <Stats items={[["CRR price",last,`${p.steps} ขั้น`],["BSM price",exact,"สูตรปิด"],["Absolute error",Math.abs(last-exact),"หน่วยราคา"]]}/><Plot includeZero={false} title="CRR price converges to BSM" xLabel="Steps N" yLabel="Option price" series={[{name:'CRR · เส้นทึบ',values},{name:'BSM · เส้นประ',values:values.map(([n])=>[n,exact])}]}/></Shell>;
}
export function DistributionLab(){
 const [p,R,set,reset]=useParams({spot:100,rate:2,vol:20,time:1,strike:100});
 const d=distributions({...p,rate:p.rate/100,vol:p.vol/100});
 return <Shell title="Normal vs lognormal prices" question="ค่าเฉลี่ยเท่ากัน แต่รูปร่างและโอกาสเกิดราคาติดลบต่างกันอย่างไร?" reset={reset} note="การแจกแจงเชิงทฤษฎี ไม่ใช่ข้อมูลตลาดหรือการพยากรณ์: GBM ใช้ drift r; เส้น Normal ของ ABM กำหนดค่าเฉลี่ยปลายทางเดียวกันและ normal volatility = S₀σ เพื่อเทียบ noise เริ่มต้น หน่วยความหนาแน่นคือ 1/หน่วยราคา กราฟตัดหางเพื่ออ่านง่าย ไม่ใช่ขอบเขตราคา; log returns ของ GBM เป็น Normal">
 <div className="controls two"><div>{R('spot','Distribution initial price',60,140)}{R('strike','Threshold price',40,180)}</div><div>{R('vol','Distribution volatility',10,50,1,'%')}{R('time','Distribution horizon',.25,2,.25,' yr')}{R('rate','Distribution rate',0,8,.5,'%')}</div></div>
 <Stats items={[["Common mean",d.mean,"ราคาปลายทางคาดหมาย"],["Normal: P(S < 0)",format(d.negative*100,3)+'%',"Lognormal = 0%"],["P(S > threshold)",`${format(d.normalAbove*100,1)}% / ${format(d.logAbove*100,1)}%`,"Normal / Lognormal"]]}/><Plot verticals={[p.strike]} title="Terminal price densities" xLabel="Terminal price" yLabel="Density" digits={3} series={[{name:'Normal / ABM · เส้นทึบ',values:d.normal},{name:'Lognormal / GBM · เส้นประ',values:d.lognormal}]}/></Shell>;
}
