const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const slug=require('../package.json').name;
const config=slug==='option-pricing-models'?[['foundations','payoff-lab'],['foundations','distribution-lab'],['lattice-models','tree-lab'],['lattice-models','convergence-lab']]:[['calendar-structure','expiry-lab'],['calendar-structure','decay-lab'],['results','iv-shift-lab'],['experiment','carry-lab']];
(async()=>{
 const browser=await chromium.launch(),errors=[],base=process.env.BASE_URL||`http://127.0.0.1:${slug==='option-pricing-models'?8766:8767}/`;
 const axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
 try{for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});page.on('pageerror',e=>errors.push(e.message));
  for(const [file,id]of config){
   await page.goto(new URL(file+'.html',base).href,{waitUntil:'networkidle'});
   const root=page.locator('#'+id);await root.locator('.viz-lab').waitFor();
   const baseline=await root.locator('.viz-stats').allTextContents();
   const ranges=root.locator('input[type=range]');
   for(let i=0;i<await ranges.count();i++){
    const range=ranges.nth(i);if(await range.isDisabled())continue;
    for(const attr of ['min','max']){
     await range.fill(await range.getAttribute(attr));
     const finite=await root.locator('svg').evaluateAll(svgs=>svgs.every(svg=>!/(?:NaN|Infinity)/.test(svg.outerHTML)));
     assert.ok(finite,`${id}: nonfinite SVG at ${width}`);
     assert.ok(!/(?:NaN|Infinity|undefined)/.test(await root.innerText()),`${id}: invalid output`);
    }
   }
   const selects=root.locator('select');for(let i=0;i<await selects.count();i++){const select=selects.nth(i);for(const val of await select.locator('option').evaluateAll(xs=>xs.map(x=>x.value)))await select.selectOption(val);}
   await root.getByRole('button',{name:'Reset',exact:true}).click();
   assert.deepEqual(await root.locator('.viz-stats').allTextContents(),baseline,`${id}: reset did not restore values`);
   const first=ranges.first();await first.focus();await first.press('End');
   assert.equal(await first.inputValue(),await first.getAttribute('max'),'Keyboard range input');
   await root.getByRole('button',{name:'Reset',exact:true}).click();
   await page.addScriptTag({content:axe});
   for(const theme of ['light','dark']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    const violations=await page.evaluate(async id=>(await axe.run(document.getElementById(id))).violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),id);
    assert.deepEqual(violations,[],`${id}: accessibility ${width} ${theme}`);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${id}: viewport overflow`);
   }
   if(id!=='tree-lab'){await root.locator('summary').click();assert.ok(await root.locator('table').isVisible());}
  }await page.close();
 }
 // Offline export must mount all the added labs without any network dependency.
 const offline=await browser.newPage();for(const [file,id]of config){await offline.goto('file://'+path.join(__dirname,'..','_site',file+'.html'));await offline.locator('#'+id+' .viz-lab').waitFor();}await offline.close();
 assert.deepEqual(errors,[]);console.log(`Verified ${config.length} new labs: extrema, reset, keyboard, mobile/desktop, both themes and offline export.`);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
