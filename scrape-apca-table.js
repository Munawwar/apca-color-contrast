var arr = Array
  .from($0.querySelectorAll('td:not(:first-child)'))
  .map(x => x.textContent)
  .map(x => ['⊘', '©§', '©§™'].includes(x) ? '' : x)
  .map(x => x.startsWith('×') ? '' : x);

arr.reduce((acc, x, i) => {
  if (i % 10 === 0) {
    acc.byFontSize[x] = acc.byFontSize[x] || {};
    acc.lastFontSize = x;
  } else {
    const fontWeight = i * 100;
    acc.byFontSize[acc.lastFontSize][fontWeight] = x;
    acc.byFontWeight[fontWeight] = acc.byFontWeight[fontWeight] || {};
    acc.byFontWeight[fontWeight][acc.lastFontSize] = x;
  }
  return acc;
}, {byFontSize: {}, byFontWeight: {}});