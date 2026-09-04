import { useEffect } from 'react';

/**
 * Per-route document titles.
 *
 * This is a hash-router SPA: the browser only ever parses `index.html`, so
 * without this every one of the 24 routes shares one <title>. That makes tab
 * strips, bookmarks, and history entries indistinguishable, and a screen
 * reader announces the same page name after every navigation (WCAG 2.4.2).
 *
 * Titles are taken from each view's own <h1> so the tab matches the page.
 */

export const SITE_NAME = 'The Boardroom Field Manual';

/** Kept byte-identical to the <title> in index.html so the landing page is unchanged. */
export const DEFAULT_TITLE = `The Principles of Board Training | ${SITE_NAME}`;

/**
 * Routes whose title depends on content that only the view can resolve
 * (the article/scenario looked up from the slug). Those views call
 * `useDocumentTitle` themselves; the router-level hook must stay out of the
 * way, because effects run child-first and a parent write would clobber the
 * specific title with a generic one.
 */
const DELEGATED_ROUTES = new Set(['article', 'scenario']);

const PAGE_NAMES: Record<string, string> = {
  library: 'The Desk Reference Library',
  articles: 'The Desk Reference Library',
  scenarios: 'Scenarios',
  'money-audit': 'Finance Articles',
  'executive-oversight': 'Strategy Articles',
  'risk-safety': 'Safety Articles',
  'minutes-records': 'Legal Articles',
  'federal-governance-checklist': 'Federal Tax & Governance Checklist',
  'california-board-rules': 'Federal Tax & Governance Checklist',
  'next-meeting': 'Prepare for Your Next Meeting',
  tools: 'The Tools & Workshops Center',
  training: 'The Boardroom Training Center',
  'webinar-registration': 'Webinar Enrollment Suite',
  'about-us': 'About the Faculty',
  'contact-us': 'Request Training Information',
  'boards-101': 'Boards 101: Core Governance Training',
  'tools/self-assessment': 'Mature Board Self-Assessment',
  'tools/board-packet-lab': 'The Board Packet Audit Lab',
  'tools/minutes-scorecard': 'Minutes Quality Scorecard',
  'tools/budget-worksheet': 'Budget Deviation Worksheet',
  'tools/authority-map': 'Board Authority Delegation Map',
};

/** Appends the site name, matching the existing "Page | Site" shape in index.html. */
export const withSiteName = (pageName: string): string => `${pageName} | ${SITE_NAME}`;

/**
 * The title for a router path, or `undefined` when the view owns its own title.
 * Unknown paths fall back to the default, because `App` renders <Home /> for them.
 */
export const titleForPath = (path: string): string | undefined => {
  if (DELEGATED_ROUTES.has(path)) return undefined;
  const pageName = PAGE_NAMES[path];
  return pageName ? withSiteName(pageName) : DEFAULT_TITLE;
};

/** Sets `document.title`. A no-op when the title is undefined, so a delegating view can own it. */
export const useDocumentTitle = (title: string | undefined): void => {
  useEffect(() => {
    if (!title) return;
    document.title = title;
  }, [title]);
};


/**
 * Trims prose to a length search engines will actually display (~155 chars),
 * cutting on a word boundary rather than mid-word.
 */
export const truncateForMeta = (text: string, max = 155): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).trimEnd() + '…';
};

/** Kept byte-identical to the <meta name="description"> in index.html. */
export const DEFAULT_DESCRIPTION =
  'Practical boardroom field manual and interactive governance tools for working nonprofit board directors nationwide, featuring specialized state overlays.';

const PAGE_DESCRIPTIONS: Record<string, string> = {
  library: 'Browse the desk reference library of practical governance articles and boardroom scenarios for nonprofit directors.',
  articles: 'Browse the desk reference library of practical governance articles and boardroom scenarios for nonprofit directors.',
  scenarios: 'Work through realistic boardroom scenarios - conflicts of interest, executive pay, restricted funds - and see how each decision plays out.',
  'money-audit': 'Finance and audit articles for nonprofit boards: budget oversight, audit committees, and reading financial statements.',
  'executive-oversight': 'Executive oversight articles for nonprofit boards: compensation review, evaluation, and the board-executive boundary.',
  'risk-safety': 'Risk and safety articles for nonprofit boards: insurance, liability exposure, and protecting directors.',
  'minutes-records': 'Minutes and records articles for nonprofit boards: what to record, what to omit, and how minutes hold up later.',
  'federal-governance-checklist': 'A federal tax and governance checklist for nonprofit boards, with specialized state overlays.',
  'california-board-rules': 'A federal tax and governance checklist for nonprofit boards, with specialized state overlays.',
  'next-meeting': 'Prepare for your next board meeting: agenda balance, advance packets, and the questions directors should ask.',
  tools: 'Interactive governance tools for nonprofit boards: self-assessment, board packet audit, minutes scorecard, budget worksheet, and authority map.',
  training: 'Board training programs, webinars, and in-person sessions for nonprofit governing boards.',
  'webinar-registration': 'Register for an upcoming nonprofit board governance webinar.',
  'about-us': 'About the faculty behind the Boardroom Field Manual, published with the California Center for Nonprofit Law / NPO Lawyers.',
  'contact-us': 'Request board training information or a governance consultation for your nonprofit board.',
  'boards-101': 'Boards 101: core governance training covering the duties of care, loyalty, and obedience for new nonprofit directors.',
  'tools/self-assessment': 'Score your board against a mature-governance benchmark and see where the gaps are.',
  'tools/board-packet-lab': 'Audit a board packet against what directors actually need before a meeting.',
  'tools/minutes-scorecard': 'Grade your board minutes and build compliant resolutions.',
  'tools/budget-worksheet': 'Spot budget deviations that a governing board is expected to question.',
  'tools/authority-map': 'Map which decisions belong to the board, a committee, or the executive.',
};

/**
 * The meta description for a router path, or `undefined` when the view owns it.
 * Mirrors `titleForPath` so the two never disagree about which routes delegate.
 */
export const descriptionForPath = (path: string): string | undefined => {
  if (DELEGATED_ROUTES.has(path)) return undefined;
  return PAGE_DESCRIPTIONS[path] ?? DEFAULT_DESCRIPTION;
};

/**
 * Updates <meta name="description">. Hash navigation never reloads the document,
 * so without this every route keeps whatever index.html shipped with.
 */
export const useMetaDescription = (description: string | undefined): void => {
  useEffect(() => {
    if (!description) return;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute('content', description);
  }, [description]);
};
