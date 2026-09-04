// Loads a TypeScript source module for testing without adding a test-time
// transpiler dependency: `typescript` is already a devDependency, and
// `node --test` ships with Node itself.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const cache = new Map();

function resolveRelative(fromFile, id) {
  const base = path.resolve(path.dirname(fromFile), id);
  for (const candidate of [base + '.ts', base + '.tsx', path.join(base, 'index.ts')]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

/** Transpile and evaluate a .ts/.tsx module, returning its exports. */
export function loadTs(relPath) {
  const file = path.resolve(ROOT, relPath);
  if (cache.has(file)) return cache.get(file);

  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.React,
    },
  }).outputText;

  const mod = { exports: {} };
  cache.set(file, mod.exports);
  const localRequire = (id) => {
    if (id.startsWith('.')) {
      const resolved = resolveRelative(file, id);
      if (resolved) return loadTs(path.relative(ROOT, resolved));
    }
    return require(id);
  };
  new Function('module', 'exports', 'require', js)(mod, mod.exports, localRequire);
  cache.set(file, mod.exports);
  return mod.exports;
}
