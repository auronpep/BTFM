// Integrity of the curriculum content modules. These are plain data, edited by
// hand, and nothing else in the build checks them - a typo'd slug produces a
// dead link at runtime rather than a build error.
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from './helpers/loadTs.js';

const { articles } = loadTs('src/data/articles.ts');
const { scenarios } = loadTs('src/data/scenarios.ts');

test('content modules are non-empty', () => {
  assert.ok(articles.length > 0, 'expected at least one article');
  assert.ok(scenarios.length > 0, 'expected at least one scenario');
});

test('article slugs are unique', () => {
  const seen = articles.map((a) => a.slug);
  assert.deepEqual(seen.filter((s, i) => seen.indexOf(s) !== i), []);
});

test('scenario slugs are unique', () => {
  const seen = scenarios.map((s) => s.slug);
  assert.deepEqual(seen.filter((s, i) => seen.indexOf(s) !== i), []);
});

test('slugs are URL-safe', () => {
  // The router builds #/article/<slug> and #/scenario/<slug> from these.
  for (const { slug } of [...articles, ...scenarios]) {
    assert.match(slug, /^[a-z0-9]+(-[a-z0-9]+)*$/, `unsafe slug: ${slug}`);
  }
});

test('every article has the fields the reader renders', () => {
  for (const a of articles) {
    for (const field of ['title', 'slug', 'description', 'category', 'content']) {
      assert.ok(a[field], `article "${a.slug}" is missing ${field}`);
    }
  }
});

test('every scenario has the fields the reader renders', () => {
  for (const s of scenarios) {
    for (const field of ['title', 'slug', 'facts', 'risk', 'recommendedAction']) {
      assert.ok(s[field], `scenario "${s.slug}" is missing ${field}`);
    }
  }
});

test('scenario relatedArticles all resolve to real articles', () => {
  const known = new Set(articles.map((a) => a.slug));
  const broken = [];
  for (const s of scenarios) {
    for (const ref of s.relatedArticles || []) {
      if (!known.has(ref)) broken.push(`${s.slug} -> ${ref}`);
    }
  }
  assert.deepEqual(broken, [], 'scenarios link to articles that do not exist');
});
