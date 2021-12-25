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
          "400": "90",
          "500": "85",
          "600": "80",
          "700": "75",
          "800": "",
          "900": ""
      },
      "16": {
          "100": "",
          "200": "",
          "300": "",
          "400": "75",
          "500": "70",
          "600": "65",
          "700": "60",
          "800": "",
          "900": ""
      },
      "18": {
          "100": "",
          "200": "",
          "300": "90",
          "400": "70",
          "500": "65",
          "600": "60",
          "700": "55",
          "800": "",
          "900": ""
      },
      "21": {
          "100": "",
          "200": "",
          "300": "85",
          "400": "65",
          "500": "60",
          "600": "55",
          "700": "50",
          "800": "",
          "900": ""
      },
      "24": {
          "100": "",
          "200": "90",
          "300": "75",
          "400": "60",
          "500": "55",
          "600": "50",
          "700": "45",
          "800": "",
          "900": ""
      },
      "32": {
          "100": "",
          "200": "85",
          "300": "70",
          "400": "55",
          "500": "50",
          "600": "45",
          "700": "",
          "800": "",
          "900": ""
      },
      "42": {
          "100": "90",
          "200": "75",
          "300": "60",
          "400": "50",
          "500": "45",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "56": {
          "100": "85",
          "200": "70",
          "300": "55",
          "400": "45",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "72": {
          "100": "75",
          "200": "60",
          "300": "50",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "96": {
          "100": "70",
          "200": "55",
          "300": "45",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "128": {
          "100": "60",
          "200": "45",
          "300": "",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
      },
      "10.5": {
          "100": "",
          "200": "",
          "300": "",
          "400": "",
          "500": "",
          "600": "",
          "700": "",
          "800": "",
          "900": ""
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
          "21": "",
          "24": "",
          "32": "",
          "42": "90",
          "56": "85",
          "72": "75",
          "96": "70",
          "128": "60",
          "10.5": ""
      },
      "200": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "21": "",
          "24": "90",
          "32": "85",
          "42": "75",
          "56": "70",
          "72": "60",
          "96": "55",
          "128": "45",
          "10.5": ""
      },
      "300": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "90",
          "21": "85",
          "24": "75",
          "32": "70",
          "42": "60",
          "56": "55",
          "72": "50",
          "96": "45",
          "128": "",
          "10.5": ""
      },
      "400": {
          "10": "",
          "11": "",
          "12": "",
          "14": "90",
          "16": "75",
          "18": "70",
          "21": "65",
          "24": "60",
          "32": "55",
          "42": "50",
          "56": "45",
          "72": "",
          "96": "",
          "128": "",
          "10.5": ""
      },
      "500": {
          "10": "",
          "11": "",
          "12": "",
          "14": "85",
          "16": "70",
          "18": "65",
          "21": "60",
          "24": "55",
          "32": "50",
          "42": "45",
          "56": "",
          "72": "",
          "96": "",
          "128": "",
          "10.5": ""
      },
      "600": {
          "10": "",
          "11": "",
          "12": "",
          "14": "80",
          "16": "65",
          "18": "60",
          "21": "55",
          "24": "50",
          "32": "45",
          "42": "",
          "56": "",
          "72": "",
          "96": "",
          "128": "",
          "10.5": ""
      },
      "700": {
          "10": "",
          "11": "",
          "12": "",
          "14": "75",
          "16": "60",
          "18": "55",
          "21": "50",
          "24": "45",
          "32": "",
          "42": "",
          "56": "",
          "72": "",
          "96": "",
          "128": "",
          "10.5": ""
      },
      "800": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "21": "",
          "24": "",
          "32": "",
          "42": "",
          "56": "",
          "72": "",
          "96": "",
          "128": "",
          "10.5": ""
      },
      "900": {
          "10": "",
          "11": "",
          "12": "",
          "14": "",
          "16": "",
          "18": "",
          "21": "",
          "24": "",
          "32": "",
          "42": "",
          "56": "",
          "72": "",
          "96": "",
          "128": "",
          "10.5": ""
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