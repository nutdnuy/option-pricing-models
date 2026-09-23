import assert from 'node:assert/strict';
import {positionResult,binomial,europeanPrice,distributions} from '../src/viz-math.mjs';
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
close(positionResult(120,100,8,'call').profit,12);
close(positionResult(80,100,8,'put',-1).profit,-12);
close(positionResult(108,100,8,'call').profit,0);
// Independent one-step replication: u=1.1, d=1/u, r=0, terminal call 10/0.
close(binomial({spot:100,strike:100,vol:Math.log(1.1),rate:0,time:1,steps:1,kind:'call'}).price,10/2.1);
for(const steps of [5,20,100,200]){
 const p={spot:100,strike:100,rate:.05,vol:.2,time:1,steps};
 close(binomial({...p,kind:'call'}).price-binomial({...p,kind:'put'}).price,100-100*Math.exp(-.05));
 close(binomial({...p,kind:'call',american:true}).price,binomial({...p,kind:'call'}).price);
 assert.ok(binomial({...p,kind:'put',american:true}).price>=binomial({...p,kind:'put'}).price);
}
const params={spot:100,strike:100,rate:.05,vol:.2,time:1,kind:'call'};
assert.ok(Math.abs(binomial({...params,steps:200}).price-europeanPrice(params))<.015);
close(binomial({spot:40,strike:100,rate:.05,vol:.2,time:1,steps:100,kind:'put',american:true}).price,60);
assert.throws(()=>binomial({...params,rate:1,vol:.01,steps:1}),/No-arbitrage/);
const d=distributions({spot:100,strike:100,rate:0,vol:.2,time:1});
close(d.normalAbove,.5,1e-7);close(d.logAbove,.46017216,1e-6);close(d.mean,100);
assert.ok(d.normal.every(v=>v.every(Number.isFinite))&&d.lognormal.every(v=>v.every(Number.isFinite)));
assert.ok(d.lognormal.filter(v=>v[0]<=0).every(v=>v[1]===0));
console.log('New Option labs: payoff, replication, parity, exercise, convergence and densities passed.');
