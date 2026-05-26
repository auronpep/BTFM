export type PrimaryAction =
  | 'prepare-read'
  | 'understand-training'
  | 'webinar-in-person-inquiry'
  | 'visit-npo-lawyers';

export type NavigationItem = {
  label: string;
  href: string;
  action: PrimaryAction;
  description: string;
  external?: boolean;
  isExternal?: boolean;
};

export const primaryNavigation = [
  {
    label: 'Next Meeting',
    href: '/next-meeting',
    action: 'prepare-read',
    description:
      'Agenda-first prep for decisions, missing packet items, questions, red flags, and minutes notes.',
  },
  {
    label: 'Money & Audit',
    href: '/money-audit',
    action: 'prepare-read',
    description:
      'Budget review, audit readiness, Form 990 oversight, committee questions, and financial warning signs.',
  },
  {
    label: 'Executive Oversight',
    href: '/executive-oversight',
    action: 'prepare-read',
    description:
      'Board-management boundaries, executive reports, compensation, delegation, performance, and verification.',
  },
  {
    label: 'Risk & Safety',
    href: '/risk-safety',
    action: 'prepare-read',
    description:
      'Insurance, safety, internal controls, restricted gifts, personnel exposure, and board-level risk review.',
  },
  {
    label: 'Minutes & Records',
    href: '/minutes-records',
    action: 'prepare-read',
    description:
      'Motions, recusals, abstentions, packet references, corporate records, and evidence of board action.',
  },
  {
    label: 'California Board Rules',
    href: '/california-board-rules',
    action: 'prepare-read',
    description:
      'California-specific rule pages for audit thresholds, registry, filings, conflicts, compensation, and records.',
  },
  {
    label: 'Tools',
    href: '/tools',
    action: 'prepare-read',
    description:
      'Board Packet Lab, question bank, red flags, checklists, worksheets, calendars, and scorecards.',
  },
  {
    label: 'Training',
    href: '/training',
    action: 'understand-training',
    description:
      'Webinar and in-person training paths built around Strategy, Safety, Audit, and boardroom practice.',
  },
  {
    label: 'Visit NPOlawyers.com',
    href: 'https://NPOlawyers.com',
    action: 'visit-npo-lawyers',
    description:
      'External legal-services path for specific legal advice outside the educational field manual.',
    external: true,
    isExternal: true,
  },
] satisfies NavigationItem[];

export type SitePath = NavigationItem & {
  promise: string;
  priority: 'primary' | 'secondary';
};

export const sitePaths = [
  {
    label: 'Serving on a Working Board',
    href: '/working-board',
    action: 'prepare-read',
    description:
      'Primary launch path for directors of established California organizations with staff, budgets, audits, insurance, filings, and board risk.',
    promise:
      'Board service gets serious when the organization gets serious: prepare for meetings, budgets, audits, executive oversight, records, risk, and legal escalation.',
    priority: 'primary',
  },
  {
    label: 'Starting a Charity',
    href: '/starting-a-charity',
    action: 'prepare-read',
    description:
      'Secondary path for founders and first boards making formation, fiscal sponsorship, bylaws, filings, and exemption decisions.',
    promise:
      'Start with structure: make formation choices, build early board discipline, document decisions, and understand when specific legal advice is needed.',
    priority: 'secondary',
  },
] satisfies SitePath[];

export const pathNavigation = sitePaths;
