const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');

(async()=>{
 const root=path.resolve(__dirname,'..'),base=process.env.BASE_URL||'http://127.0.0.1:8766/';
 const pages=JSON.parse(fs.readFileSync(path.join(root,'build-manifest.json'),'utf8')).pages;
 const axe=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
 const browser=await chromium.launch({headless:true});
 const errors=[];
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const page=await browser.newPage({viewport:viewport});
  page.on('console',message=>{if(message.type()==='error')errors.push(`${viewport.width}:${message.text()}`);});
  for(const item of pages){
   const response=await page.goto(new URL(item.href,base).href,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,item.href);
   assert.ok(await page.locator('#content').isVisible(),`${item.href}: content hidden`);
   assert.equal(await page.evaluate(()=>innerWidth),viewport.width,'Viewport was not applied');
   assert.equal(await page.locator('.paper-note,.katex-error').count(),0,`${item.href}: import note or math error`);
   assert.equal(await page.locator('.author-card').count(),1,`${item.href}: missing author`);
   assert.ok(!/\[(?:eq|fig|tab):[^\]]+\]/.test(await page.locator('#content').innerText()),`${item.href}: unresolved reference`);
   if(item.file==='intro')assert.equal(await page.locator('.welcome-actions a[href="#lessons"]').count(),1);
   if(item.file==='glossary')assert.ok(await page.locator('.glossary-group h2').count()>0,'Missing glossary heading');
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert.ok(overflow<=1,`${item.href}: horizontal overflow ${overflow}px at ${viewport.width}`);
   assert.equal(await page.locator('#content table').count(),await page.locator('.table-scroll[tabindex="0"] table').count(),`${item.href}: table is not keyboard-scrollable`);
   const badImages=await page.locator('img').evaluateAll(images=>images.filter(image=>!image.complete||image.naturalWidth===0).map(image=>image.getAttribute('src')));
   assert.deepEqual(badImages,[],`${item.href}: broken images`);
   await page.addScriptTag({content:axe});
   for(const theme of ['light','dark']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    const violations=await page.evaluate(async()=>{const result=await axe.run(document);return result.violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}));});
    assert.deepEqual(violations,[],`${item.href}: axe at ${viewport.width}px in ${theme}`);
   }
  }
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto(base,{waitUntil:'networkidle'});
 await page.click('#theme-button');
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 await page.click('#search-button');
 await page.fill('#search-input','Bachelier');
 await page.waitForSelector('#search-results a');
 assert.ok(await page.locator('#search-results a').count()>0);
 await page.goto(new URL('european-models.html',base).href,{waitUntil:'networkidle'});
 assert.ok(await page.locator('#option-model-lab .lab').isVisible());
 await browser.close();
 assert.deepEqual(errors,[],`Console errors:\n${errors.join('\n')}`);
 console.log(`Checked ${pages.length} pages at desktop and mobile, search, theme and option lab.`);
})().catch(error=>{console.error(error);process.exit(1);});
