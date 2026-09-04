// Behavioural tests for the static server. It is started as a real child
// process on an ephemeral port and driven over HTTP, so these exercise the
// shipped server rather than a re-implementation of it.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import net from 'node:net';
import { ROOT } from './helpers/loadTs.js';

const PORT = 4571;
const BASE = `http://127.0.0.1:${PORT}`;
let child;

test.before(async () => {
  assert.ok(
    fs.existsSync(path.join(ROOT, 'dist', 'index.html')),
    'run `npm run build` before `npm test` - these tests serve dist/'
  );
  child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore',
  });
  // Poll until it accepts connections rather than sleeping a fixed amount.
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(BASE + '/index.html');
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error('server did not start');
});

test.after(() => child?.kill());

test('serves index.html', async () => {
  const res = await fetch(BASE + '/index.html');
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/html/);
  assert.match(await res.text(), /<div id="root">/);
});

test('serves hashed assets with a JavaScript content type', async () => {
  const asset = fs
    .readdirSync(path.join(ROOT, 'dist', 'assets'))
    .find((f) => f.endsWith('.js'));
  const res = await fetch(`${BASE}/assets/${asset}`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /javascript/);
});

test('falls back to the SPA shell for client-side routes', async () => {
  for (const route of ['/tools', '/tools/self-assessment', '/about-us']) {
    const res = await fetch(BASE + route);
    assert.equal(res.status, 200, `${route} should serve the shell`);
    assert.match(await res.text(), /<div id="root">/);
  }
});

// fetch() normalises "/../" out of a URL before it ever hits the wire, so a
// traversal test written with fetch silently tests nothing. Send the raw
// request line over a socket instead - the equivalent of curl --path-as-is.
function rawGet(target) {
  const CRLF = String.fromCharCode(13, 10);
  const request =
    `GET ${target} HTTP/1.1` + CRLF +
    'Host: 127.0.0.1' + CRLF +
    'Connection: close' + CRLF + CRLF;
  return new Promise((resolve, reject) => {
    const socket = net.connect(PORT, '127.0.0.1', () => socket.write(request));
    let data = '';
    socket.setTimeout(5000, () => { socket.destroy(); reject(new Error('timeout')); });
    socket.on('data', (chunk) => { data += chunk; });
    socket.on('end', () => resolve(data));
    socket.on('error', reject);
  });
}

test('raw traversal requests are actually sent unnormalised', async () => {
  // Guard the guard: prove the helper transmits "/.." verbatim, otherwise the
  // traversal test below would pass for the wrong reason.
  const res = await rawGet('/../package.json');
  assert.ok(res.startsWith('HTTP/1.1'), 'expected a raw HTTP response');
  assert.doesNotMatch(res, /^HTTP\/1\.1 400/, 'request line was malformed - the traversal never reached the server');
});

// Marked `todo`: this FAILS on main today, because the server really does
// serve files from outside dist/. PR #1 fixes it. node:test reports a failing
// todo without failing the run, so this documents the expected behaviour and
// turns into a passing regression test the moment #1 lands - at which point
// the `{ todo: ... }` option should be deleted.
test('does not serve files from outside dist/', { todo: 'passes once #1 lands' }, async () => {
  for (const attack of [
    '/../package.json',
    '/../../../../Windows/win.ini',
    '/..%5c..%5cpackage.json',
  ]) {
    const res = await rawGet(attack);
    assert.doesNotMatch(res, /"devDependencies"/, `leaked package.json via ${attack}`);
    assert.doesNotMatch(res, /16-bit app support/, `leaked win.ini via ${attack}`);
  }
});
