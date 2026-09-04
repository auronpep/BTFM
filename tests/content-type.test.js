// Content negotiation and miss handling, driven over HTTP against the real
// server. These lock in the two things a static server must not get wrong:
// what type it claims a file is, and what it does when a file is absent.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { ROOT } from './helpers/loadTs.js';

const PORT = 4572;
const BASE = `http://127.0.0.1:${PORT}`;
const DIST = path.join(ROOT, 'dist');
let child;
const scratch = [];

function writeFixture(name, body) {
  const file = path.join(DIST, name);
  fs.writeFileSync(file, body);
  scratch.push(file);
  return '/' + name;
}

test.before(async () => {
  assert.ok(fs.existsSync(path.join(DIST, 'index.html')), 'run `npm run build` first');
  child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT, env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore',
  });
  for (let i = 0; i < 50; i++) {
    try { await fetch(BASE + '/index.html'); return; }
    catch { await new Promise((r) => setTimeout(r, 100)); }
  }
  throw new Error('server did not start');
});

test.after(() => {
  child?.kill();
  for (const f of scratch) fs.rmSync(f, { force: true });
});

test('HTML is served as text/html', async () => {
  const res = await fetch(BASE + '/index.html');
  assert.match(res.headers.get('content-type'), /^text\/html/);
});

test('CSS is served as text/css', async () => {
  const css = fs.readdirSync(path.join(DIST, 'assets')).find((f) => f.endsWith('.css'));
  const res = await fetch(`${BASE}/assets/${css}`);
  assert.match(res.headers.get('content-type'), /^text\/css/);
});

test('SVG is served as image/svg+xml', async () => {
  const res = await fetch(BASE + '/favicon.svg');
  assert.match(res.headers.get('content-type'), /^image\/svg\+xml/);
});

test('JSON is served as application/json', async () => {
  const url = writeFixture('__test_fixture.json', '{"ok":true}');
  const res = await fetch(BASE + url);
  assert.match(res.headers.get('content-type'), /^application\/json/);
});

test('a client-side route serves the SPA shell, not a 404', async () => {
  const res = await fetch(BASE + '/tools/self-assessment');
  assert.equal(res.status, 200);
  assert.match(await res.text(), /<div id="root">/);
});

// Marked `todo`: fails on main, which answers every miss - including a named
// asset - with 200 and the HTML shell. PR #2 fixes it. Delete the option then.
test('a missing asset returns 404, not the HTML shell',
  { todo: 'passes once #2 lands' }, async () => {
    for (const missing of ['/assets/does-not-exist.js', '/missing.css']) {
      const res = await fetch(BASE + missing);
      assert.equal(res.status, 404, `${missing} should be a 404`);
    }
  });

// Marked `todo`: `.txt` is absent from the MIME table on main, so text files
// are served as application/octet-stream. PR #4 fixes it.
test('plain text is served as text/plain',
  { todo: 'passes once #4 lands' }, async () => {
    const url = writeFixture('__test_fixture.txt', 'hello');
    const res = await fetch(BASE + url);
    assert.match(res.headers.get('content-type'), /^text\/plain/);
  });
