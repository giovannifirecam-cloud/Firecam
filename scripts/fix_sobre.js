const fs = require('fs');
let content = fs.readFileSync('sobre.html', 'utf8');
content = content.replace(/duration-500/g, 'duration-300');
content = content.replace(/text-white/g, 'text-zinc-50');
content = content.replace(/firecam-logo-web\.png/g, 'firecam-logo-web.webp');
fs.writeFileSync('sobre.html', content);
