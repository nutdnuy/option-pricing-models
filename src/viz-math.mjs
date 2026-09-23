import {bsmCall,normCdf,normPdf} from './math.mjs';
export const grid=(lo,hi,n=81)=>Array.from({length:n},(_,i)=>lo+(hi-lo)*i/(n-1));
export const payoff=(spot,strike,kind='call')=>Math.max(kind==='call'?spot-strike:strike-spot,0);
export const positionResult=(spot,strike,premium,kind,side=1)=>({payoff:side*payoff(spot,strike,kind),profit:side*(payoff(spot,strike,kind)-premium)});
export function europeanPrice({spot,strike,rate,vol,time,kind='call'}){
 const call=bsmCall({spot,strike,rate,vol,time});
 return kind==='call'?call:call-spot+strike*Math.exp(-rate*time);
}
export function binomial({spot=100,strike=100,rate=.05,vol=.2,time=1,steps=3,kind='put',american=false}){
 if(!(spot>0&&strike>0&&vol>0&&time>0&&Number.isInteger(steps)&&steps>0))throw Error('Invalid tree parameters');
 const dt=time/steps,u=Math.exp(vol*Math.sqrt(dt)),d=1/u,q=(Math.exp(rate*dt)-d)/(u-d),discount=Math.exp(-rate*dt);
 if(q<0||q>1)throw Error('No-arbitrage probability is outside [0,1]; increase steps');
 const levels=Array.from({length:steps+1},(_,i)=>Array.from({length:i+1},(_,j)=>{const s=spot*u**j*d**(i-j);return {spot:s,intrinsic:payoff(s,strike,kind)};}));
 for(let i=steps;i>=0;i--)for(let j=0;j<=i;j++){
  const node=levels[i][j];node.continuation=i===steps?null:discount*((1-q)*levels[i+1][j].value+q*levels[i+1][j+1].value);
  node.value=i===steps?node.intrinsic:american?Math.max(node.intrinsic,node.continuation):node.continuation;
  node.exercise=american&&i<steps&&node.intrinsic>node.continuation+1e-9;
 }
 return {price:levels[0][0].value,q,u,d,levels};
}
export function distributions({spot,rate,vol,time,strike}){
 const mean=spot*Math.exp(rate*time),sd=spot*vol*Math.sqrt(time),s=vol*Math.sqrt(time),mu=Math.log(spot)+(rate-.5*vol*vol)*time;
 const logSd=mean*Math.sqrt(Math.expm1(s*s));
 const xs=grid(Math.min(0,mean-4*sd),Math.max(mean+4*logSd,strike*1.05),161);
 return {mean,normal:xs.map(x=>[x,normPdf((x-mean)/sd)/sd]),lognormal:xs.map(x=>[x,x>0?normPdf((Math.log(x)-mu)/s)/(x*s):0]),negative:normCdf(-mean/sd),normalAbove:1-normCdf((strike-mean)/sd),logAbove:strike<=0?1:1-normCdf((Math.log(strike)-mu)/s)};
}
