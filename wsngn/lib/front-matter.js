const fs = require('fs');
const { extname } = require('path');
const mime = require('./mime');
const properties = require('./properties');

const re = /^(?:<!|-|\/\*-)--\s*([\s\S]*?)\s*--(?:-\*\/|-|>)\n*([\s\S]*)$/;

module.exports = function(pathname) {
  const ext = extname(pathname);
  const mimeType = mime[ext];
  if (/^text|(x|ht)ml$/.test(mimeType)) {
    const source = fs.readFileSync(pathname, { encoding: 'utf8' });
    const match = re.exec(
      source,
    );
    if (match) {
      const [_, fm, content] = match;
      const meta = properties(fm, { transform: true });
      if (!meta.mime) {
        meta.mime = mimeType;
      }
      return [meta, content];
    }
  }
};
