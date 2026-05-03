const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Enhanced routing logic:
  // 1. If root is requested, serve /pages/login.html
  // 2. If an HTML file is requested at the root, check /pages/
  // 3. Otherwise, use the URL as is
  
  let filePath = req.url === '/' ? '/pages/login.html' : req.url;
  
  // Check if it's an HTML file and not already pointing to /pages/
  const isHtml = filePath.endsWith('.html');
  const alreadyInPages = filePath.startsWith('/pages/');
  
  let fullPath = path.join(__dirname, filePath);
  
  // If HTML requested at root level, try prepending /pages/
  if (isHtml && !alreadyInPages) {
    const pagesPath = path.join(__dirname, 'pages', filePath);
    if (fs.existsSync(pagesPath)) {
      fullPath = pagesPath;
    }
  }

  // Get file extension
  const extname = String(path.extname(fullPath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Check if file exists
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Fallback for SPA-like behavior or generic 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1><p>The requested file could not be found. Path: ' + filePath + '</p>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + err, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🌐 SkySafe Frontend Server running on http://localhost:${PORT}`);
  console.log(`📄 Open browser and go to: http://localhost:${PORT}`);
  console.log(`\n📂 Serving files from: ${__dirname}\n`);
});
