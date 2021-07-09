function select(str) {
  return document.querySelector(str);
}
function d3ToNum(d3Color) {
  return parseInt(d3Color.formatHex().replace(/^#/, ''), 16);
}
function showError(text) {
  select('#error').textContent = text;
}

const targetContrast = 90;

function attach() {
  const textColorEl = select('#text-color');
  const bgColorEl = select('#bg-color');
  const fontSizeEl = select('#font-size');
  const fontWeightEl = select('#font-weight');
  const previewBgColorEl = select('#preview-bg-color');
  const previewTextColorEl = select('#preview-text-color');
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

    // compute a good contrast color
    if (textColor) {
      const { l: origL, a, b } = d3.lab(d3.rgb(`#${textColor}`));
      const colors = [];
      for (let i = 0; i <= 100; i += 1) {
        const color = d3.lab(i, a, b);
        const contrast = APCAcontrast(d3ToNum(color), parseInt(textColor, 16));
        colors.push({
          lstar: i,
          color: color.formatHex(),
          contrast,
          diff: Math.abs(targetContrast - Math.abs(contrast)),
        });
      }
      console.log(colors)
      const contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
      console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = contrastColor.color;
      previewTextColorEl.textContent = `Bg color ${contrastColor.color}`;
      previewTextColorEl.style.color = `#${textColor}`;
    } else {
      const { l: origL, a, b } = d3.lab(d3.rgb(`#${bgColor}`));
      const colors = [];
      for (let i = 0; i <= 100; i += 1) {
        const color = d3.lab(i, a, b);
        const contrast = APCAcontrast(parseInt(bgColor, 16), d3ToNum(color));
        colors.push({
          lstar: i,
          color: color.formatHex(),
          contrast,
          diff: Math.abs(targetContrast - Math.abs(contrast)),
        });
      }
      console.log(colors)
      const contrastColor = colors.sort((a, b) => a.diff - b.diff)[0];
      console.log(contrastColor);
  
      previewBgColorEl.style.backgroundColor = `#${bgColor}`;
      previewTextColorEl.textContent = `Text color ${contrastColor.color}`;
      previewTextColorEl.style.color = contrastColor.color;
    }
  };
}