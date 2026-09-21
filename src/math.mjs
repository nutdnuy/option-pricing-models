export const normPdf=x=>Math.exp(-0.5*x*x)/Math.sqrt(2*Math.PI);

export function normCdf(x){
  const sign=x<0?-1:1;
  const z=Math.abs(x)/Math.sqrt(2);
  const t=1/(1+0.3275911*z);
  const erf=1-(((((1.061405429*t-1.453152027)*t+1.421413741)*t-0.284496736)*t+0.254829592)*t)*Math.exp(-z*z);
  return 0.5*(1+sign*erf);
}

export function bsmCall({spot,strike,rate,vol,time}){
  if(spot<=0||strike<=0||vol<=0||time<=0) return Math.max(spot-strike,0);
  const root=Math.sqrt(time);
  const d1=(Math.log(spot/strike)+(rate+0.5*vol*vol)*time)/(vol*root);
  const d2=d1-vol*root;
  return spot*normCdf(d1)-strike*Math.exp(-rate*time)*normCdf(d2);
}

export function black76Call({forward,strike,rate,vol,time}){
  if(forward<=0||strike<=0||vol<=0||time<=0) return Math.exp(-rate*time)*Math.max(forward-strike,0);
  const root=Math.sqrt(time);
  const d1=(Math.log(forward/strike)+0.5*vol*vol*time)/(vol*root);
  const d2=d1-vol*root;
  return Math.exp(-rate*time)*(forward*normCdf(d1)-strike*normCdf(d2));
}

export function bachelierCall({forward,strike,rate,normalVol,time}){
  if(normalVol<=0||time<=0) return Math.exp(-rate*time)*Math.max(forward-strike,0);
  const scale=normalVol*Math.sqrt(time);
  const d=(forward-strike)/scale;
  return Math.exp(-rate*time)*((forward-strike)*normCdf(d)+scale*normPdf(d));
}
