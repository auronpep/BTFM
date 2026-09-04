import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Baseline security headers. Set via setHeader() rather than being spread into
// each writeHead() call so that every exit path - success, SPA fallback, 404,
// 500 - carries them, including any response branch added later.
const SECURITY_HEADERS = {
  // Don't let a browser second-guess our Content-Type and execute a .txt or an
  // image as script.
  'X-Content-Type-Options': 'nosniff',
  // Send the full URL only to this origin; send just the origin cross-site.
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // The site is never meant to be framed by a third party.
  'X-Frame-Options': 'SAMEORIGIN',
  // Nothing here uses these; deny them rather than leaving them available.
  'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
};

const server = http.createServer((req, res) => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    res.setHeader(name, value);
  }

  // Normalize URL path to prevent directory traversal
  let filePath = path.join(DIST_DIR, req.url.split('?')[0]);
  
  // If the path is a directory, serve index.html
  if (filePath === DIST_DIR || filePath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html');
  }

  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Fallback to index.html for SPA client-side routing
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err, indexContent) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
