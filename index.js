function select(str) {
  return document.querySelector(str);
}
/**
 * @param {object} d3Color 
 * @returns {string}
 */
function d3ToNum(d3Color) {
  return parseInt(d3Color.formatHex().replace(/^#/, ''), 16);
}

const apcaLookup = {
  "byFontSize": {
      "10": {
          "100": "",
          "200": "",
          "300": "",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "11": {
          "100": "",
          "200": "",
          "300": "",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "12": {
          "100": "",
          "200": "",
          "300": "",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "14": {
          "100": "",
          "200": "",
          "300": "",
          "400": "100",
          "500": "90",
          "600": "80",
          "700": "60",
          "800": "",
          "900": ""
      },
      "16": {
          "100": "",
          "200": "",
          "300": "100",
          "400": "90",
          "500": "80",
          "600": "60",
          "700": "55",
          "800": "",
          "900": ""
      },
      "18": {
          "100": "",
          "200": "",
          "300": "90",
          "400": "80",
          "500": "60",
          "600": "55",
          "700": "50",
          "800": "",
          "900": ""
      },
      "24": {
          "100": "",
          "200": "100",
          "300": "80",
          "400": "60",
          "500": "55",
          "600": "50",
          "700": "40",
          "800": "38",
          "900": ""
      },
      "30": {
          "100": "",
          "200": "90",
          "300": "70",
          "400": "55",
          "500": "50",
          "600": "40",
          "700": "38",
          "800": "35",
          "900": "30"
      },
      "36": {
          "100": "",
          "200": "80",
          "300": "60",
          "400": "50",
          "500": "40",
          "600": "38",
          "700": "35",
          "800": "30",
          "900": "25"
      },
      "48": {
          "100": "100",
          "200": "70",
          "300": "55",
          "400": "40",
          "500": "38",
          "600": "35",
          "700": "30",
          "800": "25",
          "900": ">20"
      },
      "60": {
          "100": "90",
          "200": "60",
          "300": "50",
          "400": "38",
          "500": "35",
          "600": "30",
          "700": "25",
          "800": ">20",
          "900": ">20"
      },
      "72": {
          "100": "80",
          "200": "55",
          "300": "40",
          "400": "35",
          "500": "30",
          "600": "25",
          "700": ">20",
          "800": ">20",
          "900": ">20"
      },
      "96": {
          "100": "70",
          "200": "50",
          "300": "35",
          "400": "30",
          "500": "25",
          "600": ">20",
          "700": ">20",
          "800": ">20",
          "900": ">20"
      },
      "120": {
          "100": "60",
          "200": "40",
          "300": "30",
          "400": "25",
          "500": ">20",
          "600": ">20",
          "700": ">20",
          "800": ">20",
          "900": ">20"
      }
  },
  "byFontWeight": {
      "100": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "24": "",
          "30": "",
          "36": "",
          "48": "100",
          "60": "90",
          "72": "80",
          "96": "70",
          "120": "60"
      },
      "200": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "24": "100",
          "30": "90",
          "36": "80",
          "48": "70",
          "60": "60",
          "72": "55",
          "96": "50",
          "120": "40"
      },
      "300": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "100",
          "18": "90",
          "24": "80",
          "30": "70",
          "36": "60",
          "48": "55",
          "60": "50",
          "72": "40",
          "96": "35",
          "120": "30"
      },
      "400": {
          "10": "",
          "11": "",
          "12": "",
          "14": "100",
          "16": "90",
          "18": "80",
          "24": "60",
          "30": "55",
          "36": "50",
          "48": "40",
          "60": "38",
          "72": "35",
          "96": "30",
          "120": "25"
      },
      "500": {
          "10": "",
          "11": "",
          "12": "",
          "14": "90",
          "16": "80",
          "18": "60",
          "24": "55",
          "30": "50",
          "36": "40",
          "48": "38",
          "60": "35",
          "72": "30",
          "96": "25",
          "120": ">20"
      },
      "600": {
          "10": "",
          "11": "",
          "12": "",
          "14": "80",
          "16": "60",
          "18": "55",
          "24": "50",
          "30": "40",
          "36": "38",
          "48": "35",
          "60": "30",
          "72": "25",
          "96": ">20",
          "120": ">20"
      },
      "700": {
          "10": "",
          "11": "",
          "12": "",
          "14": "60",
          "16": "55",
          "18": "50",
          "24": "40",
          "30": "38",
          "36": "35",
          "48": "30",
          "60": "25",
          "72": ">20",
          "96": ">20",
          "120": ">20"
      },
      "800": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "24": "38",
          "30": "35",
          "36": "30",
          "48": "25",
          "60": ">20",
          "72": ">20",
          "96": ">20",
          "120": ">20"
      },
      "900": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "24": "",
          "30": "30",
          "36": "25",
          "48": ">20",
          "60": ">20",
          "72": ">20",
          "96": ">20",
          "120": ">20"
      }
  },
  "lastFontSize": "120"
};

const targetContrast = 90;

/**
 * calculate value minus target. if delta is negative, cast to +Infinity
 */
const calcContrastDelta = (target, value) => {
  let diff = value - target;
  // Ensure contrast is >= target by giving
  // negative delta a high positive value (Infinity)
  return diff < 0 ? Infinity : diff;
}

function attach() {
  const textColorEl = select('#text-color');
  const bgColorEl = select('#bg-color');
  const fontSizeEl = select('#font-size');
  const fontWeightEl = select('#font-weight');
  const previewBgColorEl = select('#preview-bg-color');
  const previewTextColorEl = select('#preview-text-color');
  const previewNoteEl = select('#preview-note');

  function showError(text) {
    select('#error').textContent = text;
    previewBgColorEl.setAttribute('style', '');
    previewTextColorEl.setAttribute('style', '');
    previewTextColorEl.textContent = '';
    previewNoteEl.textContent = '';
  }

  select('#submit').onclick = () => {
    const textColor = textColorEl.value.trim().replace(/^#/, '');
    const bgColor = bgColorEl.value.trim().replace(/^#/, '');
    const fontSize = parseFloat(fontSizeEl.value);
    const fontWeight = parseFloat(fontWeightEl.value);

    if (!fontSize) {
      showError('Invalid font size');
      return;
    }
    if (!fontWeight) {
      showError('Invalid font weight');
      return;
    }
    if (!textColor && !bgColor) {
      showError('Please fill either text or background color');
      return;
    }
    if (textColor && bgColor) {
      showError('Please fill either text *or* background color, not both');
      return;
    }
    if (textColor && !(/^[0-9a-fA-F]{6}$/).test(textColor)) {
      showError('Invalid text color');
      return;
    } else if (bgColor && !(/^[0-9a-fA-F]{6}$/).test(bgColor)) {
      showError('Invalid background color');
      return;
    }
    showError('');

    let contrastLevelToMatch = apcaLookup.byFontSize[fontSize][fontWeight];
    if (contrastLevelToMatch === '>20') {
      contrastLevelToMatch = '20';
    }
    contrastLevelToMatch = parseFloat(contrastLevelToMatch);
    if (!contrastLevelToMatch) {
      showError('Selected font size + font weight combination is discouraged. Either change font size or font weight');
      return;
    }

    // compute a good contrast color
    if (textColor) {
      const { l: h, u: s, v: l } = d3.hsluv(d3.rgb(`#${textColor}`));
      const colors = [];
      for (let i = 0; i <= 100; i += 1) {
        const color = d3.hsluv(h, s, i);
        /** @type {number} */
        const contrast = APCAcontrast(d3ToNum(color), parseInt(textColor, 16));
        const contrastAbs = Math.abs(contrast);
        colors.push({
          lightness: i,
          color: color.formatHex(),
          contrast,
          contrastAbs,
          diff: calcContrastDelta(contrastLevelToMatch, contrastAbs),
        });
      }
      console.log(colors)

      const contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
      console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = contrastColor.color;
      previewTextColorEl.textContent = `Bg color ${contrastColor.color}`;
      previewTextColorEl.style.color = `#${textColor}`;
      previewTextColorEl.style.fontSize = `${Math.max(fontSize, 24)}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      const note = contrastColor.contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch}. Showing closest match (${contrastColor.contrastAbs.toFixed(0)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      previewNoteEl.textContent = note;
    } else {
      const { l: h, u: s, v: l } = d3.hsluv(d3.rgb(`#${bgColor}`));
      const colors = [];
      for (let i = 0; i <= 100; i += 1) {
        const color = d3.hsluv(h, s, i);
        /** @type {number} */
        const contrast = APCAcontrast(parseInt(bgColor, 16), d3ToNum(color));
        const contrastAbs = Math.abs(contrast);
        colors.push({
          lightness: i,
          /** @type {string} */
          color: color.formatHex(),
          contrast,
          contrastAbs: Math.abs(contrast),
          diff: calcContrastDelta(contrastLevelToMatch, contrastAbs),
        });
      }
      console.log(colors)
      
      const contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
      console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = `#${bgColor}`;
      previewTextColorEl.textContent = `Text color ${contrastColor.color}`;
      previewTextColorEl.style.color = contrastColor.color;
      previewTextColorEl.style.fontSize = `${Math.max(fontSize, 24)}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      const note = contrastColor.contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch}. Showing closest match (${contrastColor.contrastAbs.toFixed(0)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      previewNoteEl.textContent = note;
    }
  };
}