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

const server = http.createServer((req, res) => {
  // Normalize URL path to prevent directory traversal
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, urlPath);

  // If the request names a directory, serve its index.html. Test the URL, not
  // the joined filesystem path: on Windows path.join() emits '\' separators, so
  // a filePath check for a trailing '/' never matches and '/' fell through to
  // fs.readFile() on the dist directory itself (EISDIR -> 500).
  if (urlPath === '' || urlPath.endsWith('/')) {
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
