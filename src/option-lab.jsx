import React,{useMemo,useState} from 'react';
import {Range,LabTitle,Chart,format} from './ui.jsx';
import {bachelierCall,black76Call,bsmCall,optionStrikeGrid} from './math.mjs';

const modelCopy={
  bsm:{name:'Black–Scholes–Merton',input:'Spot price',note:'ใช้กับสินทรัพย์ Spot ที่ราคาเป็นบวกภายใต้ GBM'},
  black76:{name:'Black-76',input:'Futures / forward price',note:'ใช้ราคา Forward/Futures และคิดลดทั้ง payoff กลับมาปัจจุบัน'},
  bachelier:{name:'Bachelier',input:'Forward price',note:'ใช้ Normal volatility และยังนิยามได้เมื่อราคาอ้างอิงติดลบ'},
};

function price(model,underlying,strike,rate,volPct,normalVol,time){
  if(model==='bsm') return bsmCall({spot:underlying,strike,rate:rate/100,vol:volPct/100,time});
  if(model==='black76') return black76Call({forward:underlying,strike,rate:rate/100,vol:volPct/100,time});
  return bachelierCall({forward:underlying,strike,rate:rate/100,normalVol,time});
}

export function OptionModelLab(){
  const [model,setModel]=useState('bsm');
  const [underlying,setUnderlying]=useState(100),[strike,setStrike]=useState(100),[rate,setRate]=useState(2),[time,setTime]=useState(1),[volPct,setVolPct]=useState(20),[normalVol,setNormalVol]=useState(20);
  const changeModel=nextModel=>{
    setModel(nextModel);
    if(nextModel!=='bachelier'){
      setUnderlying(value=>Math.max(20,value));
      setStrike(value=>Math.max(1,value));
    }
  };
  const value=price(model,underlying,strike,rate,volPct,normalVol,time);
  const intrinsic=Math.exp(-rate/100*time)*Math.max(underlying-strike,0);
  const values=useMemo(()=>optionStrikeGrid({underlying,allowNegative:model==='bachelier'}).map(k=>
    [k,price(model,underlying,k,rate,volPct,normalVol,time)]
  ),[model,underlying,rate,volPct,normalVol,time]);
  const yMax=Math.max(1,...values.map(([,v])=>v))*1.12;
  return <section className="lab" aria-label="ห้องทดลองเปรียบเทียบแบบจำลองราคาออปชัน">
    <LabTitle number="02" title="Option model explorer">เลือกแบบจำลองแล้วปรับพารามิเตอร์เพื่อดู Call price เทียบกับ Strike กราฟคำนวณใหม่จากสูตรในบทนี้</LabTitle>
    <div className="controls two"><div>
      <label className="select-label" htmlFor="option-model">Pricing model</label>
      <select id="option-model" value={model} onChange={e=>changeModel(e.target.value)}><option value="bsm">Black–Scholes–Merton</option><option value="black76">Black-76</option><option value="bachelier">Bachelier</option></select>
      <Range key={`${model}-underlying`} label={modelCopy[model].input} value={underlying} onChange={setUnderlying} min={model==='bachelier'?-20:20} max={180} step={1}/>
      <Range key={`${model}-strike`} label="Strike" value={strike} onChange={setStrike} min={model==='bachelier'?-60:1} max={180} step={1}/>
      <Range label="Time to maturity" value={time} onChange={setTime} min={0.05} max={3} step={0.05} suffix=" yr"/>
    </div><div>
      <Range label="Risk-free rate" value={rate} onChange={setRate} min={0} max={10} step={0.25} suffix="%"/>
      {model==='bachelier'?<Range label="Normal volatility" value={normalVol} onChange={setNormalVol} min={1} max={60} step={1} suffix=" price/√yr"/>:<Range label="Lognormal volatility" value={volPct} onChange={setVolPct} min={5} max={80} step={1} suffix="%"/>}
      <div className="results"><div><span>European Call</span><strong>{format(value,3)}</strong><p>หน่วยราคา</p></div><div><span>Above discounted intrinsic</span><strong>{format(Math.max(0,value-intrinsic),3)}</strong><p>ส่วนต่างจาก payoff ปัจจุบันที่คิดลด</p></div></div>
    </div></div>
    <Chart title={`${modelCopy[model].name} Call price by strike`} description="ราคา Call จากพารามิเตอร์ที่เลือก เทียบกับราคาใช้สิทธิ" xDomain={[values[0][0],values.at(-1)[0]]} yDomain={[0,yMax]} xLabel="Strike" yLabel="Call price" lines={[{values}]} xFormat={v=>format(v,0)} yFormat={v=>format(v,1)}/>
    <p className="lab-note"><strong>{modelCopy[model].name}:</strong> {modelCopy[model].note} ผลลัพธ์เป็นค่าจากแบบจำลองภายใต้ข้อสมมติ ไม่ใช่ราคาเสนอซื้อขายในตลาด</p>
  </section>;
}
