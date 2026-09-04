/**
 * Motion preference helpers.
 *
 * The CSS media query in `index.css` neutralises declarative animation and
 * transition, but it cannot touch `window.scrollTo({ behavior: 'smooth' })`:
 * a behaviour passed explicitly in JavaScript overrides the `scroll-behavior`
 * property. Scripted smooth scrolling has to opt out on its own.
 */

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 'auto' (instant) when the visitor asked for reduced motion, otherwise 'smooth'. */
export const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'auto' : 'smooth';
