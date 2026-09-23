import assert from 'node:assert/strict';
import {bachelierCall,black76Call,bsmCall,normCdf,optionStrikeGrid} from '../src/math.mjs';

const close=(actual,expected,tolerance=1e-5)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} != ${expected}`);
close(normCdf(0),0.5,1e-7);
close(bsmCall({spot:100,strike:100,rate:0,vol:0.2,time:1}),7.965567,2e-5);
close(black76Call({forward:100,strike:100,rate:0,vol:0.2,time:1}),7.965567,2e-5);
close(bachelierCall({forward:100,strike:100,rate:0,normalVol:20,time:1}),7.978846,2e-5);
assert.ok(bsmCall({spot:100,strike:100,rate:0.02,vol:0.4,time:1})>bsmCall({spot:100,strike:100,rate:0.02,vol:0.2,time:1}));
assert.ok(Number.isFinite(bachelierCall({forward:-5,strike:0,rate:0.02,normalVol:20,time:1})), 'Bachelier must support a negative forward');
// The plot must keep distinct strikes when Bachelier allows a nonpositive forward.
for(const underlying of [-20,0,20,100,180]){
  for(const allowNegative of [false,true]){
    const strikes=optionStrikeGrid({underlying,allowNegative});
    assert.equal(strikes.length,41);
    assert.ok(strikes.every(Number.isFinite));
    assert.ok(strikes.every((strike,index)=>index===0||strike>strikes[index-1]), 'Strike grid must be strictly increasing');
    if(!allowNegative) assert.ok(strikes[0]>0, 'Lognormal strikes must stay positive');
    if(allowNegative){
      assert.ok(strikes[0]<underlying&&strikes.at(-1)>underlying, 'Bachelier grid must bracket the forward');
      const prices=strikes.map(strike=>bachelierCall({forward:underlying,strike,rate:0.02,normalVol:20,time:1}));
      assert.ok(prices.every(value=>Number.isFinite(value)&&value>=0));
      assert.ok(prices.every((value,index)=>index===0||value<=prices[index-1]+1e-8), 'Call prices decrease as strike increases');
    }
  }
}
console.log('Option-pricing formula and strike-grid checks passed.');
