export interface Scenario {
  title: string;
  slug: string;
  issueType: 'Conflict of Interest' | 'Chain of Command' | 'Financial Oversight' | 'Risk Management' | 'Regulatory Compliance' | 'Board Operations';
  boardStage: 'Startup' | 'Established' | 'Turnaround';
  facts: string;
  risk: string;
  boardQuestion: string;
  recommendedAction: string;
  relatedArticles: string[];
  trainingTieIn: string;
}

export const scenarios: Scenario[] = [
  {
    title: "The Founder Demands the Board Approve Her Salary",
    slug: "founder-salary-conflict",
    issueType: "Conflict of Interest",
    boardStage: "Startup",
    facts: "The passionate founder of a recently incorporated youth literacy program has been working 60 hours a week for no pay. The organization has just secured its first major corporate grant of $150,000. The founder presents a resolution to the board setting her salary at $95,000, claiming she needs to pay her bills and that 'there's no time to lose.' The board consists of the founder, her spouse, her sister-in-law, and two independent community volunteers. The founder intends to run the discussion and vote on the resolution during the upcoming meeting.",
    risk: "If family members and the founder vote on this salary without reviewing independent comparable market data, the IRS will define this as an 'Excess Benefit Transaction' under IRC Section 4958. This triggers immediate, heavy excise taxes (up to 200%) on the founder personally and personal fines on the individual board members who voted 'yes.' The organization's brand-new 501(c)(3) status is also put at serious risk.",
    boardQuestion: "How does the board navigate the founder's urgent personal needs while fulfilling its fiduciary standard of loyalty and satisfying strict IRS rules on executive compensation?",
    recommendedAction: "1. RECUSAL AND REMOVAL: The founder and her spouse and sister-in-law must recuse themselves from the discussion and the vote. They must physically leave the room.\n2. ESTABLISH DISINTERESTED QUORUM: The remaining two independent board members (constituting a disinterested majority of the quorum) must lead the meeting.\n3. SECURE COMPARABILITY DATA: Before voting, the disinterested directors must secure written compensation survey data showing salaries for founders of literacy startups of similar budget size in your region.\n4. DISINTERESTED VOTE: The disinterested directors must negotiate and vote on a reasonable salary based on this data (e.g., $68,000 instead of $95,000).\n5. WRITING COPIOUS MINUTES: Write thorough minutes within 60 days, detailing the recusal, the comparability surveys reviewed, and the unanimous disinterested vote.",
    relatedArticles: ["form-990-and-executive-compensation-governance", "fiduciary-duties-care-loyalty-obedience", "recruiting-five-unrelated-board-directors"],
    trainingTieIn: "This scenario is featured in our Executive Compensation Webinar, showing directors how to establish the Rebuttable Presumption of Reasonableness."
  },
  {
    title: "A Director Starts Micromanaging Staff Between Meetings",
    slug: "director-micromanaging-staff",
    issueType: "Chain of Command",
    boardStage: "Established",
    facts: "Director Jenkins is an active, retired corporate executive who serves on the board of a $3.5M housing organization. Driven by a desire to help, Jenkins visits the organization's main shelter twice a week. He starts giving direct instructions to the program staff, telling the shelter manager to adjust shift schedules, re-allocate the program supplies, and rewrite their intake checklists. The staff, confused and fearing they will offend a powerful board member, obey his instructions. The Executive Director only finds out when a shift scheduling conflict leads to a major shelter staffing shortage over the weekend.",
    risk: "Jenkins' actions violate the corporate chain of command, stripping the Executive Director of operational authority. This creates immense employee confusion, destroys morale, increases staff turnover, and exposes the corporation to labor disputes. Furthermore, individual directors acting outside collective board votes have zero legal authority to bind the corporation, opening the organization to breach of contract and personal liability claims.",
    boardQuestion: "How should the board president intervene to re-establish the legal boundary between collective board governance and executive staff management?",
    recommendedAction: "1. BOARD PRESIDENT INTERVENTION: The Board President must meet privately with Director Jenkins to remind him of the statutory chain of command.\n2. PRIVATE BRIEFING: Remind Jenkins that individual board members hold zero individual executive authority. The board operates only as a collective body during officially called meetings.\n3. REINFORCE CONTRACT ROLES: Clarify that the Executive Director is the sole supervisor of staff. Board inquiries or concerns regarding operations must flow through the Board Chair to the Executive Director.\n4. BOARD POLICY MANUAL UPDATE: Introduce a formal board delegation policy in the Board Policy Manual, explicitly stating that no individual director may issue operational instructions to staff.\n5. BOARD RE-ORIENTATION: Brief the entire board on the distinction between governance (setting boundaries) and management (operating within boundaries).",
    relatedArticles: ["the-chain-of-command-in-governance", "what-does-a-governing-board-actually-do"],
    trainingTieIn: "This case study is utilized in our 'Governance vs. Management' in-person workshop, helping boards create clean operating boundaries."
  },
  {
    title: "The Treasurer Presents Vague Financial Reports",
    slug: "treasurer-vague-financials",
    issueType: "Financial Oversight",
    boardStage: "Turnaround",
    facts: "At each quarterly board meeting of a $4M elder-care organization, the Treasurer distributes a single-page document showing only three numbers: 'Total Cash,' 'Total Expenses,' and 'Net Surplus.' When a new board member, Director Martinez (who has a background in banking), asks to see a detailed Statement of Activities, a Balance Sheet, and a budget-to-actual variance report, the Treasurer brushes the request aside, saying: 'We've operated this way for fifteen years, we trust our staff, and we don't need to overcomplicate things with boring spreadsheets.'",
    risk: "By failing to review detailed financial reports, the board is violating its Duty of Care and Duty of Inquiry. Single-page summaries mask critical financial safety risks: impending cash deficits, unauthorized spending, and lack of internal controls. Under the law, directors cannot rely on 'trust' alone; they must make reasonable inquiry. If the organization goes bankrupt or an employee embezzles funds, the directors can be held personally liable for gross negligence.",
    boardQuestion: "How does the board transition from passive trust to hard-headed, legally-informed financial audit and oversight?",
    recommendedAction: "1. CALL FOR AN AUDIT COMMITTEE: The Board President must immediately form a standalone Audit Committee (a best practice, and mandated by some state laws for organizations over a certain revenue threshold).\n2. MANDATE FINANCIAL STATEMENTS: Pass a resolution requiring the staff and Treasurer to provide a complete 'Board Book' at least 5 business days before every meeting, including: Statement of Activities (P&L), Statement of Financial Position (Balance Sheet), and a Budget-to-Actual variance report.\n3. IMPLEMENT 10-LARGEST-DEVIATIONS RULE: Direct the CFO to provide a written narrative explanation for the ten largest cost and revenue variances from the approved budget.\n4. DEFENSIVE DOCUMENTATION: Record in the minutes that Martinez's inquiries were answered, and detailed financials were reviewed and approved.",
    relatedArticles: ["how-boards-should-review-a-budget", "fiduciary-duties-care-loyalty-obedience", "keeping-clean-boardroom-minutes-and-records"],
    trainingTieIn: "This scenario forms the core of our Financial Literacy Webinar series, training non-financial directors to spot hidden accounting risks."
  },
  {
    title: "The Board Discovers Missing Receipts and Cash Variances",
    slug: "missing-receipts-variance",
    issueType: "Risk Management",
    boardStage: "Established",
    facts: "During a routine audit committee review of the credit card statements of a $2.5M poverty relief charity, a director discovers $18,000 in credit card charges made by the Executive Director over the past nine months that have zero supporting receipts. The charges are labeled as 'donor meals' and 'travel expenses,' but several are dated on weekends or at high-end resort areas. When asked, the Executive Director claims he lost the receipts but asserts that every expense was strictly for business development.",
    risk: "Missing receipts are a major red flag for both the IRS and the state Attorney General's charity regulator. Unsubstantiated executive charges can be legally reclassified by the IRS as 'automatic excess benefit transactions' and 'taxable personal income' to the executive, carrying immediate fines. If the board ignores this, the board members can be sued for breach of fiduciary care and failure to protect charitable assets.",
    boardQuestion: "What immediate regulatory and internal controls steps must the audit committee take to resolve the missing receipts and protect the board's integrity?",
    recommendedAction: "1. ESCALATION TO COUNSEL: The Audit Committee must immediately engage independent legal counsel specializing in charity law (such as CCNL) to guide the investigation.\n2. SUSPEND CREDIT CARD: Suspend the Executive Director's corporate credit card privileges immediately.\n3. DEMAND RECONCILIATION: Issue a formal written demand to the Executive Director to reconcile every charge with written affidavits and business purpose descriptions within 14 business days.\n4. RECLASSIFICATION: Any expense that cannot be fully verified with credible proof must be paid back to the charity by the ED, or reclassified as taxable W-2 compensation (subject to withholding taxes).\n5. ENFORCE EXPENSE POLICY: Adopt a strict expense reimbursement policy stating that no reimbursement or credit card charge will be paid without an itemized receipt, with no exceptions.",
    relatedArticles: ["form-990-and-executive-compensation-governance", "what-insurance-does-a-governing-board-need", "fiduciary-duties-care-loyalty-obedience"],
    trainingTieIn: "This case is reviewed in our 'Board Audit Secrets' seminar, teaching directors how to review expense reports defensively."
  },
  {
    title: "A Donor Restricts a Major Gift After the Money is Spent",
    slug: "donor-restricted-gift-crisis",
    issueType: "Regulatory Compliance",
    boardStage: "Established",
    facts: "A wealthy benefactor sends a $100,000 check to a counseling organization. The cover letter says, 'I am pleased to support your general operations.' The CEO, thrilled with the gift, immediately deposits the check and spends $80,000 on general payroll and rent. Three months later, the donor contacts the board, stating: 'I have decided that my $100,000 gift must be restricted solely to purchasing land for a new counseling wing.' The donor demands to see a dedicated escrow account showing the $100,000 balance.",
    risk: "Under state laws (such as UPMIFA), donor restrictions on gifts are legally binding contracts. Spending restricted funds on unrelated general operations is a misdemeanor and a breach of charitable trust, which can lead to a formal investigation by the state Attorney General. Even if the donor attempts to restrict the gift *after* sending it, an ambiguous letter can lead to expensive contract disputes and reputational ruin.",
    boardQuestion: "How does the board resolve a donor's retroactively-applied restriction on a gift that has already been spent on general operations?",
    recommendedAction: "1. REVIEW ORIGINAL DOCUMENTATION: Secure and review the donor's original cover letter. If the letter explicitly stated 'general operations' and was unconditional at the moment of the gift, the gift is legally unrestricted, and the donor cannot retroactively restrict it.\n2. ENGAGE LEGAL COUNSEL: Consult legal counsel (NPO Lawyers) to draft a highly professional, polite reply to the donor.\n3. COMMUNICATE TRANSPARENTLY: Meet with the donor to present the original letter and explain how their generous gift has already funded critical general operations.\n4. OFFER NEW DESIGNATION: If the board wishes to maintain the relationship, offer to designate a portion of *future* fundraising campaigns or capital reserves to the land project, subject to a formal board-designated restriction resolution.\n5. IMPLEMENT GIFT ACCEPANCE POLICY: Adopt a comprehensive Gift Acceptance Policy requiring all gifts over $10,000 to be governed by a written, signed gift agreement at the time of receipt.",
    relatedArticles: ["fiduciary-duties-care-loyalty-obedience", "how-boards-should-review-a-budget"],
    trainingTieIn: "This scenario is featured in our 'Compliance & Trust' training track, detailing the handling of donor-restricted asset funds."
  },
  {
    title: "A Youth Program Fails to Implement Abuse-Prevention Policies",
    slug: "youth-safety-compliance-failure",
    issueType: "Risk Management",
    boardStage: "Established",
    facts: "The board of a $3M youth mentoring organization receives an anonymous complaint from a volunteer. The letter states that a newly hired mentor has been driving a 14-year-old program participant home alone in his private vehicle, which violates the organization's written 'Two-Adult Rule.' The mentor claims he was just doing a favor because the child's parents were late. Upon inquiry, the board discovers that the program coordinator hasn't run background checks (Live Scan) or conducted safety screening for the last 15 volunteer mentors due to 'heavy administrative backlog.'",
    risk: "Failing to conduct mandated Live Scan background checks and ignoring violations of safety policies is a massive breach of the board's Duty of Care and Safety job. If an abuse incident occurs, the organization is exposed to multimillion-dollar negligence claims. Directors face immediate corporate and personal exposure if they ignore safety screening backlogs or fail to enforce abuse-prevention policies.",
    boardQuestion: "What immediate emergency safety and legal steps must the board take to protect the youth, secure the organization, and satisfy state safety rules?",
    recommendedAction: "1. IMMEDIATE SUSPENSION: Immediately suspend the mentor who drove the youth alone, pending a formal, written administrative review.\n2. HALT UNSCREENED STAFF: Order an immediate halt to all program activities involving any volunteer mentor whose Live Scan and background checks are incomplete.\n3. COMPLIANCE BLITZ: Conduct an emergency audit to run Live Scan checks on all 15 unscreened volunteers within 72 hours.\n4. REVIEW D&O AND CYBER LIABILITY: Verify that the organization's insurance includes specific, active sexual abuse and molestation liability riders.\n5. MANDATE QUARTERLY BOARD MONITORING: Establish a standing 'Safety Committee' on the board that receives a quarterly compliance report showing 100% safety screening completion for all staff and volunteers.",
    relatedArticles: ["what-insurance-does-a-governing-board-need", "fiduciary-duties-care-loyalty-obedience", "what-does-a-governing-board-actually-do"],
    trainingTieIn: "This scenario highlights the core of our Physical Safety and Youth Protection seminars, showing boards how to run proactive safety audits."
  }
];
export default scenarios;
