import type { PrimaryAction } from "./navigation";

export type IssueType =
  | "next-meeting"
  | "budget"
  | "audit"
  | "form-990"
  | "executive-oversight"
  | "compensation"
  | "conflict"
  | "risk-safety"
  | "minutes-records"
  | "california-rules"
  | "tools"
  | "training"
  | "formation"
  | "bylaws"
  | "tax-exemption"
  | "legal-help";

export type RouteMapEntry = {
  path: string;
  label: string;
  summary: string;
  primaryAction: PrimaryAction;
  audience: "working-board" | "startup-founder" | "both";
  issueTypes: IssueType[];
  ctaKeys: string[];
  owner: string;
};

export const routeMap: RouteMapEntry[] = [
  {
    path: "/working-board",
    label: "Serving on a Working Board",
    summary:
      "Primary launch path for directors of established California organizations that need boardroom judgment support.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["next-meeting", "budget", "audit", "executive-oversight", "risk-safety", "minutes-records"],
    ctaKeys: ["workingBoardGuide", "boardTraining", "generalLegalHelp"],
    owner: "Worker 2",
  },
  {
    path: "/next-meeting",
    label: "Next Meeting",
    summary:
      "Agenda-first meeting prep for budget approval, audits, executive reports, compensation, conflicts, safety, bylaws, and annual meetings.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["next-meeting", "budget", "audit", "executive-oversight", "compensation", "conflict", "risk-safety", "bylaws"],
    ctaKeys: ["boardPacketMode", "boardTraining", "governanceDisputeLegalHelp"],
    owner: "Worker 4",
  },
  {
    path: "/money-audit",
    label: "Money & Audit",
    summary:
      "Budget review, major deviations, audit committee readiness, Form 990 review, and finance red flags.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["budget", "audit", "form-990", "california-rules"],
    ctaKeys: ["budgetWorksheet", "auditLegalHelp", "boardTraining"],
    owner: "Worker 6 / Worker 7",
  },
  {
    path: "/executive-oversight",
    label: "Executive Oversight",
    summary:
      "Guidance for reviewing executive reports, goals, compensation, delegation, performance, and board-management boundaries.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["executive-oversight", "compensation", "conflict"],
    ctaKeys: ["executiveQuestions", "compensationLegalHelp", "boardTraining"],
    owner: "Worker 6 / Worker 8",
  },
  {
    path: "/risk-safety",
    label: "Risk & Safety",
    summary:
      "Insurance, youth protection, internal controls, personnel risk, donor restrictions, facilities, and board safety review.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["risk-safety", "legal-help"],
    ctaKeys: ["riskReview", "safetyLegalHelp", "boardTraining"],
    owner: "Worker 6 / Worker 8",
  },
  {
    path: "/minutes-records",
    label: "Minutes & Records",
    summary:
      "Minutes, motions, abstentions, recusals, board packets, corporate records, and proof of board action.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["minutes-records", "california-rules"],
    ctaKeys: ["minutesScorecard", "recordsLegalHelp", "boardTraining"],
    owner: "Worker 6 / Worker 7",
  },
  {
    path: "/california-board-rules",
    label: "California Board Rules",
    summary:
      "California-specific rule pages for audit thresholds, registry, Form 990, conflicts, compensation, solicitation, and records.",
    primaryAction: "prepare-read",
    audience: "both",
    issueTypes: ["california-rules", "audit", "form-990", "conflict", "compensation"],
    ctaKeys: ["californiaRules", "generalLegalHelp", "boardTraining"],
    owner: "Worker 7",
  },
  {
    path: "/tools",
    label: "Tools",
    summary:
      "Board Packet Lab, Board Question Bank, Board Red Flags, self-assessment, checklists, worksheets, and calendars.",
    primaryAction: "prepare-read",
    audience: "working-board",
    issueTypes: ["tools", "next-meeting", "budget", "audit", "minutes-records", "risk-safety"],
    ctaKeys: ["boardPacketMode", "toolTraining", "generalLegalHelp"],
    owner: "Worker 5",
  },
  {
    path: "/training",
    label: "Training",
    summary:
      "Program overview for the Strategy, Safety, Audit training model with webinar and in-person inquiry paths.",
    primaryAction: "understand-training",
    audience: "both",
    issueTypes: ["training"],
    ctaKeys: ["registerWebinar", "requestInPersonTraining", "generalLegalHelp"],
    owner: "Worker 8",
  },
  {
    path: "/training/webinars",
    label: "Webinars",
    summary: "Registration path for free or scheduled board training webinars.",
    primaryAction: "webinar-in-person-inquiry",
    audience: "both",
    issueTypes: ["training"],
    ctaKeys: ["registerWebinar"],
    owner: "Worker 8",
  },
  {
    path: "/training/in-person",
    label: "In-Person Training",
    summary: "Inquiry path for boards that want the training brought to their organization.",
    primaryAction: "webinar-in-person-inquiry",
    audience: "both",
    issueTypes: ["training"],
    ctaKeys: ["requestInPersonTraining"],
    owner: "Worker 8",
  },
  {
    path: "/starting-a-charity",
    label: "Starting a Charity",
    summary:
      "Secondary path for founders and first boards working through fiscal sponsorship, formation, first meetings, bylaws, and exemption.",
    primaryAction: "prepare-read",
    audience: "startup-founder",
    issueTypes: ["formation", "bylaws", "tax-exemption", "california-rules"],
    ctaKeys: ["startupGuide", "formationLegalHelp", "boardTraining"],
    owner: "Worker 2",
  },
  {
    path: "https://NPOlawyers.com",
    label: "Visit NPOlawyers.com",
    summary: "External referral route for specific legal advice and specialized legal services.",
    primaryAction: "visit-npo-lawyers",
    audience: "both",
    issueTypes: ["legal-help"],
    ctaKeys: ["generalLegalHelp"],
    owner: "External",
  },
];

export const primaryActionLabels: Record<PrimaryAction, string> = {
  "prepare-read": "Read articles, scenarios, tools, or field manual guidance",
  "understand-training": "Understand the board training program",
  "webinar-in-person-inquiry": "Register for a webinar or request in-person training",
  "visit-npo-lawyers": "Visit NPOlawyers.com",
};
