import assert from 'node:assert/strict';
import {bachelierCall,black76Call,bsmCall,normCdf} from '../src/math.mjs';

const close=(actual,expected,tolerance=1e-5)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} != ${expected}`);
close(normCdf(0),0.5,1e-7);
close(bsmCall({spot:100,strike:100,rate:0,vol:0.2,time:1}),7.965567,2e-5);
close(black76Call({forward:100,strike:100,rate:0,vol:0.2,time:1}),7.965567,2e-5);
close(bachelierCall({forward:100,strike:100,rate:0,normalVol:20,time:1}),7.978846,2e-5);
assert.ok(bsmCall({spot:100,strike:100,rate:0.02,vol:0.4,time:1})>bsmCall({spot:100,strike:100,rate:0.02,vol:0.2,time:1}));
assert.ok(Number.isFinite(bachelierCall({forward:-5,strike:0,rate:0.02,normalVol:20,time:1})), 'Bachelier must support a negative forward');
console.log('Option-pricing formula checks passed.');
