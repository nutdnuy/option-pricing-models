const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('yaml');
const { createReferences } = require('../scripts/references.cjs');

// Forward references, aligned rows and table captions must resolve to the same
// numbering/anchors regardless of which page is rendered first.
const fixtures = [
  { href: 'index.html', source: '' },
  { href: 'first.html', source: String.raw`$$\begin{align}a&=b\label{eq:a}\\c&=d\label{eq:b}\end{align}$$` },
  { href: 'second.html', source: '<table></table><table id="tab:summary"></table>' }
];
const references = createReferences(fixtures);
const prose = references.resolve('[eq:b] [tab:summary]');
assert.ok(prose.includes('href="first.html#eq:b">(1.2)</a>'));
assert.ok(prose.includes('href="second.html#tab:summary">2.2</a>'));
assert.ok(references.resolve(fixtures[2].source).includes('<caption>ตาราง 2.2</caption>'));
const captionedSource = '<table id="tab:original"><caption><strong>ตารางที่ 10.</strong> Summary</caption></table>';
const captioned = createReferences([{ href: 'results.html', source: captionedSource }]);
assert.equal(captioned.resolve(captionedSource), captionedSource);
assert.ok(captioned.resolve('[tab:original]').includes('href="results.html#tab:original">10</a>'));
const titledSource = '<table id="tab:titled"><caption>Strategy parameters</caption></table>';
assert.equal(createReferences([{ href: 'setup.html', source: titledSource }]).resolve(titledSource), titledSource);

const aligned = references.equation(String.raw`\begin{align}a&=b\label{eq:a}\\c&=d\label{eq:b}\end{align}`);
assert.ok(aligned.tex.includes(String.raw`\begin{align*}`));
assert.ok(aligned.tex.includes(String.raw`\tag{1.1}`));
assert.ok(aligned.tex.includes(String.raw`\tag{1.2}`));
assert.ok(aligned.anchors.includes('id="eq:b"'));
assert.equal(references.equation(String.raw`x=\eqref{eq:b}`).tex, 'x=(1.2)');
assert.throws(() => references.resolve('[eq:missing]'), /Unresolved reference/);
assert.throws(() => createReferences([...fixtures, fixtures[1]]), /Duplicate reference label/);

// Use the generated book to catch integration regressions: every label has an
// actual target, math is rendered, and the landing-page jump link survives.
const root = path.resolve(__dirname, '..');
const toc = yaml.parse(fs.readFileSync(path.join(root, '_toc.yml'), 'utf8'));
const files = [toc.root, ...toc.chapters.map(page => page.file)];
let equations = 0;
let links = 0;
for (const [index, file] of files.entries()) {
  const source = fs.readFileSync(path.join(root, file + '.md'), 'utf8');
  const html = fs.readFileSync(path.join(root, index ? file + '.html' : 'index.html'), 'utf8');
  for (const [, label] of source.matchAll(/\\label\{([^}]+)\}/g)) {
    assert.ok(html.includes(`id="${label}"`), `${file}: missing ${label}`);
    equations++;
  }
  links += [...html.matchAll(/class="source-reference"/g)].length;
  assert.ok(!/\[(?:eq|tab):[^\]]+\]/.test(html), `${file}: unresolved reference`);
  assert.ok(!html.includes('class="katex-error"'), `${file}: invalid equation`);
  assert.ok(!html.includes('class="eqn-num"'), `${file}: unintended automatic equation number`);
  for (const [table] of html.matchAll(/<table\b[^>]*>[\s\S]*?<\/table>/g)) {
    assert.ok([...table.matchAll(/<caption\b/g)].length <= 1, `${file}: duplicate table caption`);
  }
  if (!index) assert.ok(html.includes('href="#lessons"'), 'Welcome jump link missing');
}
assert.ok(equations > 0 && links > 0, 'Expected equation labels and reference links');
console.log(`Reference checks passed: ${equations} equation anchors and ${links} linked references.`);
