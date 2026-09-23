// Index source labels before rendering, so references may cross lesson pages.
const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

function createReferences(pages) {
  const targets = new Map();
  function add(id, target) {
    if (targets.has(id)) throw Error(`Duplicate reference label: ${id}`);
    targets.set(id, { id, ...target });
  }
  for (const [index, page] of pages.entries()) {
    let equation = 0;
    for (const block of page.source.matchAll(/\$\$([\s\S]+?)\$\$/g)) {
      for (const label of block[1].matchAll(/\\label\{([^}]+)\}/g)) {
        add(label[1], { href: page.href, number: `${index}.${++equation}`, kind: 'equation' });
      }
    }
    let table = 0;
    for (const match of page.source.matchAll(/(<table\b[^>]*>)([\s\S]*?)<\/table>/g)) {
      table++;
      const id = match[1].match(/\bid=["'](tab:[^"']+)["']/)?.[1];
      const caption = match[2].match(/<caption\b[^>]*>([\s\S]*?)<\/caption>/)?.[1];
      const explicitNumber = caption?.replace(/<[^>]+>/g, '').match(/ตารางที่\s+(\d+(?:\.\d+)*)/)?.[1];
      if (id) add(id, {
        href: page.href, number: explicitNumber || `${index}.${table}`,
        kind: 'table', hasCaption: caption !== undefined
      });
    }
  }

  function targetFor(id) {
    const target = targets.get(id);
    if (!target) throw Error(`Unresolved reference: ${id}`);
    return target;
  }

  function equation(tex) {
    tex = tex.replace(/\\(eqref|ref)\{([^}]+)\}/g, (_, kind, id) => {
      const { number } = targetFor(id);
      return kind === 'eqref' ? `(${number})` : number;
    });
    const labels = [...tex.matchAll(/\\label\{([^}]+)\}/g)].map(match => targetFor(match[1]));
    let numbered;
    if (/\\begin\{align\*?\}/.test(tex)) {
      // KaTeX supports align and tags per row; aligned would discard numbering.
      numbered = tex.replace(/\\(begin|end)\{align\*?\}/g, '\\$1{align*}')
        .replace(/\\label\{([^}]+)\}/g, (_, id) => `\\tag{${targetFor(id).number}}`);
    } else {
      if (labels.length > 1) throw Error('Multiple equation labels require an align environment');
      numbered = tex.replace(/\\label\{[^}]+\}/g, '') + (labels.length ? `\\tag{${labels[0].number}}` : '');
    }
    return {
      tex: numbered,
      anchors: labels.map(({ id }) => `<span id="${escape(id)}" class="equation-anchor"></span>`).join(''),
      label: labels.length ? `สมการ ${labels.map(({ number }) => number).join(', ')}` : 'สมการ'
    };
  }

  function resolve(source) {
    return source.replace(/\[((?:eq|tab):[^\]\s]+)\]/g, (_, id) => {
      const target = targetFor(id);
      const text = target.kind === 'equation' ? `(${target.number})` : target.number;
      return `<a class="source-reference" href="${escape(target.href)}#${escape(id)}">${text}</a>`;
    }).replace(/<table\b[^>]*>/g, tag => {
      const id = tag.match(/\bid=["'](tab:[^"']+)["']/)?.[1];
      if (!id) return tag;
      const target = targetFor(id);
      return target.hasCaption ? tag : `${tag}<caption>ตาราง ${target.number}</caption>`;
    });
  }

  return { equation, resolve };
}

module.exports = { createReferences };
