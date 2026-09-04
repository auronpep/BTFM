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
