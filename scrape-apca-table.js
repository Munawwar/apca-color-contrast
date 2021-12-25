// select table element from dev tools first
var arr = Array
  .from($0.querySelectorAll('td:not(:first-child)'))
  .map(x => x.textContent)
  .map(x => ['⊘', '©§', '©§™', 'NT'].some(search => x.includes(search)) ? '' : x)
  .map(x => x.startsWith('×') ? '' : x)
  .map(x => x === '30' ? '' : x); // 30 is minimum. we already skipped x35, so 30 shouldn't be included.

var lookup = arr.reduce((acc, x, i) => {
  if (i % 10 === 0) {
    acc.byFontSize[x] = acc.byFontSize[x] || {};
    acc.lastFontSize = x;
  } else {
    const fontWeight = (i % 10) * 100;
    acc.byFontSize[acc.lastFontSize][fontWeight] = x;
    acc.byFontWeight[fontWeight] = acc.byFontWeight[fontWeight] || {};
    acc.byFontWeight[fontWeight][acc.lastFontSize] = x;
  }
  return acc;
}, {byFontSize: {}, byFontWeight: {}});

delete lookup.lastFontSize;
console.log(lookup)