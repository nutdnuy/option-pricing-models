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
  const page=await browser.newPage({viewportSize:viewport});
  page.on('console',message=>{if(message.type()==='error')errors.push(`${viewport.width}:${message.text()}`);});
  for(const item of pages){
   const response=await page.goto(new URL(item.href,base).href,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,item.href);
   assert.ok(await page.locator('#content').isVisible(),`${item.href}: content hidden`);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert.ok(overflow<=1,`${item.href}: horizontal overflow ${overflow}px at ${viewport.width}`);
   const badImages=await page.locator('img').evaluateAll(images=>images.filter(image=>!image.complete||image.naturalWidth===0).map(image=>image.getAttribute('src')));
   assert.deepEqual(badImages,[],`${item.href}: broken images`);
   await page.addScriptTag({content:axe});
   const violations=await page.evaluate(async()=>{const result=await axe.run(document,{rules:{'color-contrast':{enabled:false}}});return result.violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>v.id);});
   assert.deepEqual(violations,[],`${item.href}: axe ${violations.join(', ')}`);
  }
  await page.close();
 }
 const page=await browser.newPage({viewportSize:{width:1280,height:800}});
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
