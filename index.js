function select(str) {
  return document.querySelector(str);
}

function isValidHexColor(str) {
  return /^#?[0-9a-f]{6}$/i.test((str || '').trim());
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

function findClosestContrastColor(hexColor, isTextColor, targetContrast) {
  const { l: h, u: s, v: l } = d3.hsluv(d3.rgb(`#${hexColor}`));
  const colors = [];
  for (let i = 0; i <= 100; i += 1) {
    const color = d3.hsluv(h, s, i);
    /** @type {number} */
    const contrast = isTextColor
      ? computeContrast(color.formatHex(), hexColor)
      : computeContrast(hexColor, color.formatHex());
    const contrastAbs = Math.abs(contrast);
    colors.push({
      lightness: i,
      color: color.formatHex(),
      contrast,
      contrastAbs,
      diff: calcContrastDelta(targetContrast, contrastAbs),
    });
  }
  // console.log(colors)

  let contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
  if (contrastColor.diff === Infinity) {
    contrastColor = colors.sort((a, b) => b.contrastAbs - a.contrastAbs)[0];
  }
  return contrastColor;
}

function findContrastTextColor(bgColor, targetContrast) {
  return findClosestContrastColor(bgColor, false, targetContrast);
}
function findContrastBgColor(textColor, targetContrast) {
  return findClosestContrastColor(textColor, true, targetContrast);
}


// byline text = e.g. copyright text at website footer
// single line text = e.g. text on a button or navigation menu
// dense text = e.g. a large paragraph of text
// non-text = e.g. illustrations
const apcaLookup = {
  "byFontSize": {
    "12": {
      "100": {},
      "200": {},
      "300": {},
      "400": {
        "byline": 30
      },
      "500": {
        "byline": 30
      },
      "600": {
        "byline": 30
      },
      "700": {
        "byline": 30
      },
      "800": {},
      "900": {}
    },
    "14": {
      "100": {},
      "200": {},
      "300": {
        "byline": 30
      },
      "400": {
        "sparseContent": 100,
        "denseTextOffset": 0
      },
      "500": {
        "sparseContent": 100,
        "denseTextOffset": 0
      },
      "600": {
        "sparseContent": 90,
        "denseTextOffset": 0
      },
      "700": {
        "sparseContent": 75,
        "denseTextOffset": 0
      },
      "800": {},
      "900": {}
    },
    "16": {
      "100": {},
      "200": {},
      "300": {
        "byline": 30
      },
      "400": {
        "sparseContent": 90,
        "denseTextOffset": 0
      },
      "500": {
        "sparseContent": 75,
        "denseTextOffset": 0
      },
      "600": {
        "sparseContent": 70,
        "denseTextOffset": 15
      },
      "700": {
        "sparseContent": 60,
        "denseTextOffset": 15
      },
      "800": {
        "sparseContent": 60
      },
      "900": {}
    },
    "18": {
      "100": {},
      "200": {
        "byline": 30
      },
      "300": {
        "sparseContent": 100,
        "denseTextOffset": 0
      },
      "400": {
        "sparseContent": 75,
        "denseTextOffset": 0
      },
      "500": {
        "sparseContent": 70,
        "denseTextOffset": 15
      },
      "600": {
        "sparseContent": 60,
        "denseTextOffset": 15
      },
      "700": {
        "sparseContent": 55,
        "denseTextOffset": 15
      },
      "800": {
        "sparseContent": 55
      },
      "900": {
        "sparseContent": 55
      }
    },
    "24": {
      "100": {},
      "200": {
        "byline": 30
      },
      "300": {
        "sparseContent": 75,
        "denseTextOffset": 0
      },
      "400": {
        "sparseContent": 60,
        "denseTextOffset": 15
      },
      "500": {
        "sparseContent": 55,
        "denseTextOffset": 15
      },
      "600": {
        "sparseContent": 50,
        "denseTextOffset": 15
      },
      "700": {
        "sparseContent": 45,
        "denseTextOffset": 15
      },
      "800": {
        "sparseContent": 45
      },
      "900": {
        "sparseContent": 45
      }
    },
    "36": {
      "100": {},
      "200": {
        "sparseContent": 75
      },
      "300": {
        "sparseContent": 60,
        "denseTextOffset": 15
      },
      "400": {
        "sparseContent": 45,
        "denseTextOffset": 15
      },
      "500": {
        "sparseContent": 43,
        "denseTextOffset": 15
      },
      "600": {
        "sparseContent": 40,
        "denseTextOffset": 15
      },
      "700": {
        "sparseContent": 38,
        "denseTextOffset": 15
      },
      "800": {
        "sparseContent": 38
      },
      "900": {
        "sparseContent": 38
      }
    },
    "48": {
      "100": {
        "sparseContent": 90
      },
      "200": {
        "sparseContent": 60
      },
      "300": {
        "sparseContent": 50
      },
      "400": {
        "sparseContent": 40
      },
      "500": {
        "sparseContent": 38
      },
      "600": {
        "sparseContent": 35
      },
      "700": {
        "nonText": 33
      },
      "800": {
        "nonText": 33
      },
      "900": {
        "nonText": 33
      }
    },
    "60": {
      "100": {
        "sparseContent": 75
      },
      "200": {
        "sparseContent": 55
      },
      "300": {
        "sparseContent": 45
      },
      "400": {
        "sparseContent": 38
      },
      "500": {
        "sparseContent": 35
      },
      "600": {
        "nonText": 33
      },
      "700": {
        "nonText": 30
      },
      "800": {
        "nonText": 30
      },
      "900": {
        "nonText": 30
      }
    },
    "72": {
      "100": {
        "sparseContent": 60
      },
      "200": {
        "sparseContent": 50
      },
      "300": {
        "sparseContent": 40
      },
      "400": {
        "sparseContent": 35
      },
      "500": {
        "nonText": 33
      },
      "600": {
        "nonText": 30
      },
      "700": {
        "nonText": 30
      },
      "800": {
        "nonText": 30
      },
      "900": {
        "nonText": 30
      }
    },
    "96": {
      "100": {
        "sparseContent": 50
      },
      "200": {
        "sparseContent": 45
      },
      "300": {
        "sparseContent": 35
      },
      "400": {
        "nonText": 33
      },
      "500": {
        "nonText": 30
      },
      "600": {
        "nonText": 30
      },
      "700": {
        "nonText": 30
      },
      "800": {
        "nonText": 30
      },
      "900": {
        "nonText": 30
      }
    }
  }
};

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
  const textColorPreviewEl = select('#text-color-change');
  const bgColorPreviewEl = select('#bg-color-change');
  const fontSizeEl = select('#font-size');
  const fontWeightEl = select('#font-weight');
  const contentPurposeEl = select('#content-purpose');
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
    const contentPurpose = contentPurposeEl.value;

    textColorPreviewEl.style.backgroundColor = isValidHexColor(textColor) ? `#${textColor}` : null;
    bgColorPreviewEl.style.backgroundColor = isValidHexColor(bgColor) ? `#${bgColor}` : null;

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

    const byContentType = apcaLookup.byFontSize[fontSize][fontWeight];
    let contrastLevelToMatch = byContentType[contentPurpose];
    if (contrastLevelToMatch === undefined) {
      switch (contentPurpose) {
        case 'nonText':
          contrastLevelToMatch = (
            byContentType.sparseContent || byContentType.byline
          ) ? (byContentType.nonText || 30) : undefined;
          break;
        case 'byline':
          contrastLevelToMatch = byContentType.sparseContent ? 30 : undefined;
          break;
      }
    }
    contrastLevelToMatch = parseFloat(contrastLevelToMatch);
    if (!Number.isFinite(contrastLevelToMatch)) {
      showError('Selected font size + font weight combination is discouraged. Either change font size or font weight');
      return;
    }
    if (contentPurpose === 'denseTextOffset') {
      contrastLevelToMatch += byContentType.sparseContent;
    }

    // compute a good contrast color
    if (textColor && bgColor) {
      const contrastAbs = Math.abs(computeContrast(bgColor, textColor));
      previewBgColorEl.style.backgroundColor = `#${bgColor}`;
      previewTextColorEl.style.color = `#${textColor}`;
      previewTextColorEl.textContent = 'Preview';
      previewTextColorEl.style.fontSize = `${fontSize}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      let note = contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch} (Currently ${contrastAbs.toFixed(1)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      if (fontWeight === 100 && contrastAbs >= contrastLevelToMatch) {
        note += ' (but font weight 100 should be avoided)';
      }
      previewNoteEl.textContent = note;
    } else if (textColor) {
      const contrastColor = findContrastBgColor(textColor, contrastLevelToMatch);
      // console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = contrastColor.color;
      previewTextColorEl.textContent = `Bg color ${contrastColor.color}`;
      previewTextColorEl.style.color = `#${textColor}`;
      previewTextColorEl.style.fontSize = `${fontSize}px`;
      previewTextColorEl.style.fontWeight = fontWeight;
      let note = contrastColor.contrastAbs < contrastLevelToMatch
        ? `Failed to match contrast ${contrastLevelToMatch}. Showing closest match (${contrastColor.contrastAbs.toFixed(1)}). I suggest changing font weight or font size.`
        : `Passes contrast level ${contrastLevelToMatch}`;
      if (fontWeight === 100 && contrastAbs >= contrastLevelToMatch) {
        note += ' (but font weight 100 should be avoided)';
      }
      previewNoteEl.textContent = note;
    } else {
      const contrastColor = findContrastTextColor(bgColor, contrastLevelToMatch);
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

  textColorEl.oninput =
    bgColorEl.oninput =
    fontSizeEl.onchange =
    fontWeightEl.onchange =
    contentPurposeEl.onchange = compute;
}