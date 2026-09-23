const assert=require('node:assert/strict');
const {chromium}=require('playwright');

async function setRange(page,label,value){
  const input=page.getByLabel(label,{exact:true});
  const {min,step}=await input.evaluate(element=>({min:Number(element.min),step:Number(element.step)}));
  await input.focus();
  await input.press('Home');
  for(let i=0;i<Math.round((value-min)/step);i++) await input.press('ArrowRight');
  assert.equal(Number(await input.inputValue()),value,`${label}: selected value`);
  await page.waitForFunction(({id,value})=>document.getElementById(id).closest('.range').querySelector('output').textContent===String(value),{id:await input.getAttribute('id'),value},{timeout:3000});
}

async function assertFiniteChart(page){
  const points=await page.locator('#option-model-lab polyline').getAttribute('points');
  const coordinates=points.trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
  assert.equal(coordinates.length,41);
  assert.ok(coordinates.every(pair=>pair.every(Number.isFinite)), 'Chart coordinates must remain finite');
  assert.ok(coordinates.at(-1)[0]>coordinates[0][0], 'Strike axis must have positive width');
  const values=await page.locator('#option-model-lab .results strong').allTextContents();
  assert.ok(values.every(value=>Number.isFinite(Number(value.replaceAll(',','')))), 'Displayed prices must stay finite');
}

(async()=>{
  const base=process.env.BASE_URL||'http://127.0.0.1:8766/';
  const browser=await chromium.launch({headless:true});
  const errors=[];
  try{
    for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
      const page=await browser.newPage({viewport});
      page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto(new URL('european-models.html',base).href,{waitUntil:'networkidle'});
      const model=page.locator('#option-model');
      await model.selectOption('bachelier');
      await setRange(page,'Forward price',-20);
      await setRange(page,'Strike',-10);
      await assertFiniteChart(page);
      await setRange(page,'Forward price',0);
      await assertFiniteChart(page);
      for(const nextModel of ['bsm','black76']){
        await model.selectOption('bachelier');
        await setRange(page,'Forward price',-20);
        await setRange(page,'Strike',-10);
        await model.selectOption(nextModel);
        const label=nextModel==='bsm'?'Spot price':'Futures / forward price';
        assert.equal(Number(await page.getByLabel(label,{exact:true}).inputValue()),20);
        assert.equal(Number(await page.getByLabel('Strike',{exact:true}).inputValue()),1);
        assert.equal(await page.getByLabel(label,{exact:true}).evaluate(element=>element.closest('.range').querySelector('output').textContent),'20');
        assert.equal(await page.getByLabel('Strike',{exact:true}).evaluate(element=>element.closest('.range').querySelector('output').textContent),'1');
        await assertFiniteChart(page);
      }
      await page.close();
    }
    assert.deepEqual(errors,[],'The option lab must not produce browser errors');
    console.log('Option lab negative/zero forwards and model-switch regression checks passed at desktop and mobile.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
