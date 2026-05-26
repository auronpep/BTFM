import type { IssueType } from "./site-map";
import type { PrimaryAction } from "./navigation";

export type CtaEntry = {
  key: string;
  label: string;
  href: string;
  action: PrimaryAction;
  issueTypes: IssueType[];
  prompt: string;
  placement: "primary" | "secondary" | "legal-referral";
  isExternal?: boolean;
};

export const ctaMap: Record<string, CtaEntry> = {
  workingBoardGuide: {
    key: "workingBoardGuide",
    label: "Open the Working Board Guide",
    href: "/working-board",
    action: "prepare-read",
    issueTypes: ["next-meeting"],
    prompt: "Start with the field manual path for directors already reviewing budgets, reports, risk, and decisions.",
    placement: "primary",
  },
  startupGuide: {
    key: "startupGuide",
    label: "Start the Founder Path",
    href: "/starting-a-charity",
    action: "prepare-read",
    issueTypes: ["formation", "bylaws", "tax-exemption"],
    prompt: "Use the startup path for formation choices, first-board discipline, bylaws, filings, and exemption planning.",
    placement: "primary",
  },
  boardPacketMode: {
    key: "boardPacketMode",
    label: "Open Board Packet Mode",
    href: "/tools/board-packet-lab",
    action: "prepare-read",
    issueTypes: ["next-meeting", "tools"],
    prompt: "Meeting soon? Review the packet for decisions, missing information, red flags, and minutes notes.",
    placement: "primary",
  },
  budgetWorksheet: {
    key: "budgetWorksheet",
    label: "Use the Budget Deviation Worksheet",
    href: "/tools/budget-deviation-worksheet",
    action: "prepare-read",
    issueTypes: ["budget"],
    prompt: "Use this before approving a budget or reviewing a financial report with major variances.",
    placement: "primary",
  },
  executiveQuestions: {
    key: "executiveQuestions",
    label: "Open Executive Oversight Questions",
    href: "/tools/question-bank#executive-oversight",
    action: "prepare-read",
    issueTypes: ["executive-oversight"],
    prompt: "Ask what decision management needs, what changed, what goal is behind, and what risk is being underreported.",
    placement: "primary",
  },
  riskReview: {
    key: "riskReview",
    label: "Use the Risk Review Checklist",
    href: "/tools/red-flags#risk-safety",
    action: "prepare-read",
    issueTypes: ["risk-safety"],
    prompt: "Review insurance, internal controls, safety, personnel, donor restrictions, and reporting systems before risk becomes a board crisis.",
    placement: "primary",
  },
  minutesScorecard: {
    key: "minutesScorecard",
    label: "Check the Minutes Quality Scorecard",
    href: "/tools/minutes-quality-scorecard",
    action: "prepare-read",
    issueTypes: ["minutes-records"],
    prompt: "Can a future board tell who was present, whether quorum existed, what motion passed, and what follow-up was assigned?",
    placement: "primary",
  },
  boardTraining: {
    key: "boardTraining",
    label: "Explore Board Training",
    href: "/training",
    action: "understand-training",
    issueTypes: ["training"],
    prompt: "Bring the Strategy, Safety, Audit framework to your board through practical training.",
    placement: "secondary",
  },
  toolTraining: {
    key: "toolTraining",
    label: "Train Your Board on These Tools",
    href: "/training",
    action: "understand-training",
    issueTypes: ["tools", "training"],
    prompt: "Use the field manual tools as the agenda for a practical board training session.",
    placement: "secondary",
  },
  registerWebinar: {
    key: "registerWebinar",
    label: "Register for a Webinar",
    href: "/training/webinars",
    action: "webinar-in-person-inquiry",
    issueTypes: ["training"],
    prompt: "Join a webinar on board duties, meeting preparation, risk, finances, and governance boundaries.",
    placement: "primary",
  },
  requestInPersonTraining: {
    key: "requestInPersonTraining",
    label: "Request In-Person Training",
    href: "/training/in-person",
    action: "webinar-in-person-inquiry",
    issueTypes: ["training"],
    prompt: "Ask about bringing board training to your organization, board retreat, or leadership group.",
    placement: "primary",
  },
  auditLegalHelp: {
    key: "auditLegalHelp",
    label: "Get Legal Help With Audit Structure",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["audit", "form-990", "california-rules"],
    prompt:
      "Need help reviewing audit committee structure, governance policies, Form 990 process, or board responsibilities? Visit NPOlawyers.com.",
    placement: "legal-referral",
    isExternal: true,
  },
  compensationLegalHelp: {
    key: "compensationLegalHelp",
    label: "Get Legal Help With Compensation",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["compensation", "conflict"],
    prompt:
      "Founder, executive, or insider compensation can create conflict and tax issues. For legal advice about a specific decision, visit NPOlawyers.com.",
    placement: "legal-referral",
    isExternal: true,
  },
  recordsLegalHelp: {
    key: "recordsLegalHelp",
    label: "Get Legal Help With Records",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["minutes-records", "california-rules"],
    prompt:
      "If minutes, records, motions, or board approvals are unclear, get legal review before relying on informal memory. Visit NPOlawyers.com.",
    placement: "legal-referral",
    isExternal: true,
  },
  safetyLegalHelp: {
    key: "safetyLegalHelp",
    label: "Get Legal Help With Risk and Safety",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["risk-safety"],
    prompt:
      "Safety, insurance, youth protection, employment, and reporting failures can become legal matters. Visit NPOlawyers.com for advice on specific facts.",
    placement: "legal-referral",
    isExternal: true,
  },
  governanceDisputeLegalHelp: {
    key: "governanceDisputeLegalHelp",
    label: "Get Legal Help With Governance Disputes",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["executive-oversight", "conflict", "bylaws", "legal-help"],
    prompt:
      "If authority, bylaws, officer powers, conflicts, or board disputes are unclear, route the specific legal issue to NPOlawyers.com.",
    placement: "legal-referral",
    isExternal: true,
  },
  formationLegalHelp: {
    key: "formationLegalHelp",
    label: "Get Legal Help Starting a Charity",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["formation", "bylaws", "tax-exemption", "california-rules"],
    prompt:
      "Formation, fiscal sponsorship, bylaws, exemption, registry, and first-board decisions can affect the organization for years. Visit NPOlawyers.com.",
    placement: "legal-referral",
    isExternal: true,
  },
  californiaRules: {
    key: "californiaRules",
    label: "Review California Board Rules",
    href: "/california-board-rules",
    action: "prepare-read",
    issueTypes: ["california-rules"],
    prompt: "Use California-specific pages for sourced, attorney-review-flagged governance topics.",
    placement: "secondary",
  },
  generalLegalHelp: {
    key: "generalLegalHelp",
    label: "Visit NPOlawyers.com",
    href: "https://NPOlawyers.com",
    action: "visit-npo-lawyers",
    issueTypes: ["legal-help"],
    prompt:
      "For legal advice about specific governance, compliance, tax-exempt, dispute, or board authority issues, visit NPOlawyers.com.",
    placement: "legal-referral",
    isExternal: true,
  },
};

export const referralCtas = Object.values(ctaMap).filter((cta) => cta.placement === "legal-referral");
