function select(str) {
  return document.querySelector(str);
}

/**
 * @param {string} bgColor in sRGB hex (# allowed as prefix)
 * @param {string} textColor in sRGB hex (# allowed as prefix)
 */
function computeContrast(bgColor, textColor) {
  return APCAcontrast(
    sRGBtoY(parseInt(textColor.replace(/^#/, ''), 16)),
    sRGBtoY(parseInt(bgColor.replace(/^#/, ''), 16))
  )
}

const apcaLookup = {
  "byFontSize": {
    "12": {
      "100": "",
      "200": "",
      "300": "",
      "400": "100",
      "500": "100",
      "600": "90",
      "700": "90",
      "800": "",
      "900": ""
    },
    "14": {
      "100": "",
      "200": "",
      "300": "",
      "400": "95",
      "500": "90",
      "600": "80",
      "700": "75",
      "800": "",
      "900": ""
    },
    "16": {
      "100": "",
      "200": "",
      "300": "95",
      "400": "85",
      "500": "80",
      "600": "70",
      "700": "60",
      "800": "60",
      "900": ""
    },
    "18": {
      "100": "",
      "200": "",
      "300": "90",
      "400": "75",
      "500": "70",
      "600": "60",
      "700": "55",
      "800": "55",
      "900": "55"
    },
    "24": {
      "100": "",
      "200": "90",
      "300": "75",
      "400": "60",
      "500": "55",
      "600": "45",
      "700": "40",
      "800": "40",
      "900": "40"
    },
    "36": {
      "100": "",
      "200": "75",
      "300": "60",
      "400": "45",
      "500": "40",
      "600": "35",
      "700": "35",
      "800": "30",
      "900": "30"
    },
    "48": {
      "100": "",
      "200": "55",
      "300": "50",
      "400": "40",
      "500": "35",
      "600": "30",
      "700": "30",
      "800": "30",
      "900": "30"
    },
    "60": {
      "100": "",
      "200": "60",
      "300": "45",
      "400": "35",
      "500": "30",
      "600": "",
      "700": "",
      "800": "",
      "900": ""
    },
    "72": {
      "100": "",
      "200": "55",
      "300": "40",
      "400": "30",
      "500": "",
      "600": "",
      "700": "",
      "800": "",
      "900": ""
    }
  },
  "byFontWeight": {
    "100": {
      "12": "",
      "14": "",
      "16": "",
      "18": "",
      "24": "",
      "36": "",
      "48": "",
      "60": "",
      "72": ""
    },
    "200": {
      "12": "",
      "14": "",
      "16": "",
      "18": "",
      "24": "90",
      "36": "75",
      "48": "55",
      "60": "60",
      "72": "55"
    },
    "300": {
      "12": "",
      "14": "",
      "16": "95",
      "18": "90",
      "24": "75",
      "36": "60",
      "48": "50",
      "60": "45",
      "72": "40"
    },
    "400": {
      "12": "100",
      "14": "95",
      "16": "85",
      "18": "75",
      "24": "60",
      "36": "45",
      "48": "40",
      "60": "35",
      "72": "30"
    },
    "500": {
      "12": "100",
      "14": "90",
      "16": "80",
      "18": "70",
      "24": "55",
      "36": "40",
      "48": "35",
      "60": "30",
      "72": ""
    },
    "600": {
      "12": "90",
      "14": "80",
      "16": "70",
      "18": "60",
      "24": "45",
      "36": "35",
      "48": "30",
      "60": "",
      "72": ""
    },
    "700": {
      "12": "90",
      "14": "75",
      "16": "60",
      "18": "55",
      "24": "40",
      "36": "35",
      "48": "30",
      "60": "",
      "72": ""
    },
    "800": {
      "12": "",
      "14": "",
      "16": "60",
      "18": "55",
      "24": "40",
      "36": "30",
      "48": "30",
      "60": "",
      "72": ""
    },
    "900": {
      "12": "",
      "14": "",
      "16": "",
      "18": "55",
      "24": "40",
      "36": "30",
      "48": "30",
      "60": "",
      "72": ""
    }
  }
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

let valid = false;
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

  function compute() {
    const textColor = textColorEl.value.trim().replace(/^#/, '');
    const bgColor = bgColorEl.value.trim().replace(/^#/, '');
    const fontSize = parseFloat(fontSizeEl.value);
    const fontWeight = parseFloat(fontWeightEl.value);

    valid = false;
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
    if (textColor && !(/^[0-9a-fA-F]{6}$/).test(textColor)) {
      showError('Invalid text color');
      return;
    } else if (bgColor && !(/^[0-9a-fA-F]{6}$/).test(bgColor)) {
      showError('Invalid background color');
      return;
    }
    valid = true;
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
    if (textColor && bgColor) {
      const contrastAbs = Math.abs(computeContrast(bgColor, textColor));
      previewBgColorEl.style.backgroundColor = `#${bgColor}`;
      previewTextColorEl.style.color = `#${textColor}`;
      previewTextColorEl.textContent = 'Preview';
      previewTextColorEl.style.fontSize = `${fontSize}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      const note = contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch} (Currently ${contrastAbs.toFixed(1)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      previewNoteEl.textContent = note;
    } else if (textColor) {
      const { l: h, u: s, v: l } = d3.hsluv(d3.rgb(`#${textColor}`));
      const colors = [];
      for (let i = 0; i <= 100; i += 1) {
        const color = d3.hsluv(h, s, i);
        /** @type {number} */
        const contrast = computeContrast(color.formatHex(), textColor);
        const contrastAbs = Math.abs(contrast);
        colors.push({
          lightness: i,
          color: color.formatHex(),
          contrast,
          contrastAbs,
          diff: calcContrastDelta(contrastLevelToMatch, contrastAbs),
        });
      }
      // console.log(colors)

      let contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
      if (contrastColor.diff === Infinity) {
        contrastColor = colors.sort((a, b) => b.contrastAbs - a.contrastAbs)[0];
      }
      // console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = contrastColor.color;
      previewTextColorEl.textContent = `Bg color ${contrastColor.color}`;
      previewTextColorEl.style.color = `#${textColor}`;
      previewTextColorEl.style.fontSize = `${fontSize}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      const note = contrastColor.contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch}. Showing closest match (${contrastColor.contrastAbs.toFixed(1)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      previewNoteEl.textContent = note;
    } else {
      const { l: h, u: s, v: l } = d3.hsluv(d3.rgb(`#${bgColor}`));
      const colors = [];
      for (let i = 0; i <= 100; i += 1) {
        const color = d3.hsluv(h, s, i);
        /** @type {number} */
        const contrast = computeContrast(bgColor, color.formatHex());
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
      // console.log(colors)
      
      let contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
      if (contrastColor.diff === Infinity) {
        contrastColor = colors.sort((a, b) => b.contrastAbs - a.contrastAbs)[0];
      }
      // console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = `#${bgColor}`;
      previewTextColorEl.textContent = `Text color ${contrastColor.color}`;
      previewTextColorEl.style.color = contrastColor.color;
      previewTextColorEl.style.fontSize = `${fontSize}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      const note = contrastColor.contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch}. Showing closest match (${contrastColor.contrastAbs.toFixed(1)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      previewNoteEl.textContent = note;
    }
  };
  compute();

  select('#text-color').oninput =
    select('#bg-color').oninput =
    select('#font-size').onchange =
    select('#font-weight').onchange = compute;
}