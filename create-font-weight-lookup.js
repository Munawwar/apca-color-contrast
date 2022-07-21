// Usage: Go to browser dev tools and select the apca table element and run the code
// $0 is the table element

var fontWeights = [100,200,300,400,500,600,700,800,900];
var fontSizes = [12,14,16,18,24,36,48,60,72,96];
var fontLookupTable = Array
    .from($0.querySelectorAll('tr'))
    .slice(6) // the first 6 lines are just headers
    .map(el => Array
        .from(el.querySelectorAll('th,td'))
        .map(el2 => [el2, el2.textContent.trim()])
    )
    .filter(arr => arr.length > 10) // the last row is copyright stuff
    .reduce((acc, row) => {
        const [, fontSize] = row[1];
        if (!fontSizes.includes(+fontSize)) return acc;
        acc[fontSize] = acc[fontSize] || {};
        row.slice(2).reduce((acc2, [el, value], index) => {
            const fontWeight = fontWeights[index];
            acc2[fontWeight] = acc2[fontWeight] || {};
            const obj = acc2[fontWeight];
            if (value === '®©') {
                obj.byline = 30;
            } else if (+value < 35) {
                obj.nonText = +value;
            } else if (value !== '⊘') {
                obj.sparseContent = +value;
                const denseTextOffset = window.getComputedStyle(el, '::after').getPropertyValue('content').slice(1,-1);
                if (denseTextOffset === 'B') {
                    obj.denseTextOffset = 0;
                } else if (Number.isFinite(+denseTextOffset)) {
                    obj.denseTextOffset = +denseTextOffset;
                }
            }
            return acc2;
        }, acc[fontSize]);
        return acc;
    }, {});

console.log(JSON.stringify(fontLookupTable, 0, 2));
// console.log(JSON.stringify(byFontWeight, 0, 2));