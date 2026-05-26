export type TopicSlug = "money-audit" | "executive-oversight" | "risk-safety" | "minutes-records";

export type TopicPageConfig = {
  slug: TopicSlug;
  eyebrow: string;
  title: string;
  description: string;
  deck: string;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction: {
    label: string;
    href: string;
  };
  focusAreas: string[];
  questions: string[];
  minutesShouldShow: string[];
  escalationSignals: string[];
  legalVariant:
    | "audit-structure"
    | "compensation"
    | "governance-dispute"
    | "safety-youth-protection"
    | "general";
};

export const topicPages: Record<TopicSlug, TopicPageConfig> = {
  "money-audit": {
    slug: "money-audit",
    eyebrow: "Field Manual / Money & Audit",
    title: "Money & Audit",
    description:
      "Budget review, audit readiness, Form 990 oversight, committee questions, and financial warning signs for governing boards.",
    deck:
      "Use this section when the board is asked to approve a budget, accept an audit, review Form 990, or rely on a finance committee report that needs clearer board judgment.",
    primaryAction: {
      label: "Use Budget Worksheet",
      href: "/tools/budget-deviation-worksheet",
    },
    secondaryAction: {
      label: "Audit Readiness Checklist",
      href: "/tools/audit-committee-readiness-checklist",
    },
    focusAreas: [
      "Budget approvals and material deviations from the approved plan",
      "Audit committee readiness and independent board review",
      "Form 990 governance disclosures and public transparency",
      "Restricted funds, cash warnings, and finance committee escalation",
    ],
    questions: [
      "What decision is the board being asked to make, and what financial information is missing?",
      "Which assumptions changed since the budget was approved?",
      "What did the audit, finance committee, or CPA flag for board attention?",
      "Does the record show that the full board understood the issue before voting?",
    ],
    minutesShouldShow: [
      "The financial report, audit, or budget version reviewed by the board",
      "The motion approved and any spending limits or follow-up conditions",
      "Committee recommendation, abstentions, recusals, and assigned follow-up",
    ],
    escalationSignals: [
      "A major budget gap is explained as timing without documentation",
      "Audit findings are treated as staff-only cleanup",
      "Restricted funds, debt, tax filings, or public disclosures are unclear",
    ],
    legalVariant: "audit-structure",
  },
  "executive-oversight": {
    slug: "executive-oversight",
    eyebrow: "Field Manual / Executive Oversight",
    title: "Executive Oversight",
    description:
      "Board-management boundaries, executive reports, delegation, performance, compensation, and verification practices.",
    deck:
      "Use this section when the board needs to support management without disappearing into passive report-listening or crossing into staff supervision.",
    primaryAction: {
      label: "Open Question Bank",
      href: "/tools/question-bank#executive-oversight",
    },
    secondaryAction: {
      label: "Review Authority Map",
      href: "/tools/board-authority-map",
    },
    focusAreas: [
      "Executive report quality and board-level decision requests",
      "Delegation boundaries between board, officers, committees, and staff",
      "Compensation process, executive session discipline, and conflicts",
      "Verification systems for goals, compliance, safety, and financial risk",
    ],
    questions: [
      "What decision or oversight judgment does management need from the board?",
      "What changed since the last report, and what risk is being underreported?",
      "Is this a board decision, an officer action, a committee recommendation, or staff implementation?",
      "Does the compensation or conflict process need independent review?",
    ],
    minutesShouldShow: [
      "The board-level issue discussed, without turning minutes into a transcript",
      "Any executive session, recusal, delegation, limit, or follow-up assignment",
      "The motion, vote, and authority basis for the action",
    ],
    escalationSignals: [
      "One director is directing staff outside board authority",
      "Executive compensation involves insiders, founders, family, or conflicted directors",
      "The board cannot tell whether it approved, delegated, or merely heard a report",
    ],
    legalVariant: "compensation",
  },
  "risk-safety": {
    slug: "risk-safety",
    eyebrow: "Field Manual / Risk & Safety",
    title: "Risk & Safety",
    description:
      "Insurance, safety, internal controls, restricted gifts, personnel exposure, and board-level risk review.",
    deck:
      "Use this section when operational risk has become a board issue: safety controls, insurance gaps, reporting systems, youth protection, personnel exposure, or donor restrictions.",
    primaryAction: {
      label: "Open Red Flags",
      href: "/tools/red-flags#risk-safety",
    },
    secondaryAction: {
      label: "Use $3M Checklist",
      href: "/tools/3m-board-member-checklist",
    },
    focusAreas: [
      "Insurance coverage, exclusions, renewal timing, and board visibility",
      "Safety controls, incident reporting, youth protection, and facility risk",
      "Internal controls for cash, restricted gifts, data, and personnel exposure",
      "Board escalation when management reports risk as handled but evidence is thin",
    ],
    questions: [
      "What risk changed, and who owns the next board-level decision?",
      "What policy, insurance document, incident report, or control evidence supports the report?",
      "What would the board need in the minutes if this issue is questioned later?",
      "Does this involve legal duties, employment facts, safety reporting, or insurance notice?",
    ],
    minutesShouldShow: [
      "The risk category reviewed and the document or report the board relied on",
      "The board action, assignment, deadline, and any limits on authority",
      "Whether legal, insurance, HR, or safety advice was requested",
    ],
    escalationSignals: [
      "Safety or youth-protection concerns are minimized as operational details",
      "Insurance coverage has not been reviewed in years",
      "An incident, complaint, donor restriction, or personnel issue could create legal exposure",
    ],
    legalVariant: "safety-youth-protection",
  },
  "minutes-records": {
    slug: "minutes-records",
    eyebrow: "Field Manual / Minutes & Records",
    title: "Minutes & Records",
    description:
      "Motions, recusals, abstentions, packet references, corporate records, and evidence of board action.",
    deck:
      "Use this section when the board needs minutes that prove what happened without becoming storytelling, advocacy, or a transcript.",
    primaryAction: {
      label: "Check Minutes Scorecard",
      href: "/tools/minutes-quality-scorecard",
    },
    secondaryAction: {
      label: "Review California Records Rule",
      href: "/california-board-rules/minutes-and-corporate-records",
    },
    focusAreas: [
      "Motions, seconds, votes, abstentions, recusals, and quorum",
      "Packet references and documents the board relied on",
      "Corporate record discipline for bylaws, policies, approvals, and annual meetings",
      "Evidence of board action without unnecessary commentary",
    ],
    questions: [
      "Can a future board tell what was approved and who had authority to act?",
      "Were conflicts, abstentions, recusals, and executive sessions documented clearly?",
      "Which packet, report, policy, or agreement did the board rely on?",
      "Is the board preserving the right record in the right place?",
    ],
    minutesShouldShow: [
      "Attendance, quorum, motion text, vote result, abstentions, recusals, and assignments",
      "Key documents reviewed by title or packet reference",
      "Follow-up owner, deadline, and any limits on delegated authority",
    ],
    escalationSignals: [
      "No one can tell whether a motion actually passed",
      "Minutes include conclusions that are not supported by board action",
      "Records, bylaws, members, officer authority, or approvals are disputed",
    ],
    legalVariant: "governance-dispute",
  },
};
