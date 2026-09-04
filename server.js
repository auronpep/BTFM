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

  // Vite fingerprints everything under /assets (index-BQ06fu8v.js), so those URLs
  // can never point at different bytes - cache them hard. index.html is the one
  // file whose URL is stable while its contents change every deploy, so it must
  // be revalidated or visitors keep booting the previous build's asset names.
  res.setHeader(
    'Cache-Control',
    req.url.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable'
      : 'no-cache'
  );

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

// Running `npm start` before `npm run build` otherwise fails one confusing
// request at a time instead of saying what's wrong once, up front.
if (!fs.existsSync(DIST_DIR)) {
  console.error(`No build found at ${DIST_DIR}`);
  console.error('Run `npm run build` first.');
  process.exit(1);
}

// Without this, a taken port prints an unhandled 'error' event and a raw stack
// trace, which buries the one line the operator needs.
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    console.error('Set a different one with: PORT=3001 npm start');
  } else if (err.code === 'EACCES') {
    console.error(`Not allowed to bind port ${PORT}. Ports below 1024 need elevated privileges.`);
  } else {
    console.error(`Server error: ${err.message}`);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// A host redeploying this process sends SIGTERM. Closing the server lets
// in-flight responses finish instead of cutting them mid-transfer.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log(`\n${signal} received, shutting down.`);
    server.close(() => process.exit(0));
    // Don't hang forever on a wedged keep-alive connection.
    setTimeout(() => process.exit(0), 5000).unref();
  });
}
