const fs = require('fs');
const path = require('path');

// Patch 1: Fix ajv-keywords _formatLimit.js
const problematicFile = path.join(__dirname, '..', 'node_modules', 'fork-ts-checker-webpack-plugin', 'node_modules', 'ajv-keywords', 'keywords', '_formatLimit.js');

if (fs.existsSync(problematicFile)) {
  try {
    let content = fs.readFileSync(problematicFile, 'utf8');
    // Patch: Fix the extendFormats function to handle undefined formats
    const oldFunction = `function extendFormats(ajv) {
  var formats = ajv._formats;
  for (var name in COMPARE_FORMATS) {
        var format = formats && formats[name];
    // the last condition is needed if it's RegExp from another window
    if (typeof format != 'object' || format instanceof RegExp || !format.validate)
      format = formats[name] = { validate: format };
    if (!format.compare)
      format.compare = COMPARE_FORMATS[name];
  }
}`;
    
    const newFunction = `function extendFormats(ajv) {
  var formats = ajv._formats;
  if (!formats) return;
  for (var name in COMPARE_FORMATS) {
    var format = formats[name];
    // the last condition is needed if it's RegExp from another window
    if (typeof format != 'object' || format instanceof RegExp || !format.validate)
      format = formats[name] = { validate: format };
    if (!format.compare)
      format.compare = COMPARE_FORMATS[name];
  }
}`;
    
    if (content.includes('function extendFormats(ajv)')) {
      content = content.replace(oldFunction, newFunction);
      fs.writeFileSync(problematicFile, content, 'utf8');
      console.log('✓ Patched ajv-keywords _formatLimit.js');
    }
  } catch (err) {
    // Silently fail
  }
}

