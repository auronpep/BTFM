export interface Article {
  title: string;
  slug: string;
  description: string;
  category: 'Strategy' | 'Finance' | 'Safety' | 'Legal' | 'Startup';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: number;
  problem: string;
  ruleTitle: string;
  ruleContent: string;
  askQuestions: { question: string; rationale: string; targetRole?: string }[];
  doNots: { title: string; items: string[]; consequence?: string };
  minutesTemplate?: { agendaItem: string; mockMinutes: string; whyItMatters: string };
  legalEscalation?: { trigger: string; explanation: string; actionText?: string };
  californiaThreshold?: { statute: string; text: string };
  content: string;
}

export const articles: Article[] = [
  {
    title: "What Does a Governing Board Actually Do?",
    slug: "what-does-a-governing-board-actually-do",
    description: "The three core jobs of the board: Strategy, Safety, and Audit. Move away from meddling or ornamenting and into active governance.",
    category: "Strategy",
    difficulty: "Beginner",
    readingTime: 6,
    problem: "Board members are either too meddlesome (micromanaging staff) or too ornamental (sitting passively as yes-men). Both behaviors destroy organizational value.",
    ruleTitle: "The Supreme Focus of Board Authority",
    ruleContent: "Individual board members have zero power on their own. The board's authority exists only when acting collectively in a properly called meeting. The president or chief executive reports directly to the board as a collective governing body, not to individual directors.",
    askQuestions: [
      {
        question: "Does this proposal align with our approved three-year plan, and do we have the raising capacity to support it?",
        rationale: "Ensures the board is exercising Strategy and holding executive operations accountable to the vision.",
        targetRole: "the President"
      },
      {
        question: "What verification checks have we run this quarter to ensure our safety policies are being executed in daily operations?",
        rationale: "Fulfills the Safety job of the board by demanding operational verification rather than passive trust.",
        targetRole: "the Chief Executive Officer"
      }
    ],
    doNots: {
      title: "Boardroom Role Confusion",
      items: [
        "Do not issue directives to staff members directly between quarterly board meetings.",
        "Do not act as a rubber stamp approving executive proposals without asking for verification documents.",
        "Do not allow the CEO to run board meetings; the board chair runs the meetings, while the CEO reports."
      ],
      consequence: "Individual meddling creates legal liability and violates the chain of command, opening individual directors to claims of unauthorized corporate action."
    },
    minutesTemplate: {
      agendaItem: "CEO Quarterly Operational Report",
      mockMinutes: "The Chief Executive Officer presented the operational report for the Q1 period. Directors inquired regarding the enrollment numbers in educational programs. Upon motion duly made and seconded, the Board accepted the operational report as presented, noting that the Executive is directed to provide a verification audit of youth scanning training by the next regular meeting.",
      whyItMatters: "Demonstrates active board oversight and specific inquiry, proving the board exercised its duty of care."
    },
    californiaThreshold: {
      statute: "CA Corp Code § 5210",
      text: "The activities and affairs of a corporation shall be conducted and all corporate powers shall be exercised by or under the direction of the board."
    },
    content: `Many boards are active. Few are effective. The difference is usually not intelligence or goodwill, but clarity. Board members need to know what belongs to governance, what belongs to management, and what should be left mercifully alone. 

To govern a serious organization with millions in revenue and dozens of employees, the board must structure its oversight into three distinct jobs:

### 1. Strategy: Looking Ten Years Out
Strategy involves taking a close look at the purpose and mission of the organization. When new to a board, don't worry about trying to amend the charter or bylaws right away. Better to leave that to those who have been in place for a while. 

A good strategic plan envisions what you would like the organization to be doing ten years from now:
* How much revenue is feasible?
* What projects should be done?
* What would be the measure of success?
* How much program activity is realistic given what you can raise?

Once you have a ten-year vision, break that out into a clear three-year plan, and then work on next year's concrete objectives. This creates a solid foundation for the annual budgeting process.

### 2. Safety: Hard-Headed Risk Mitigation
On safety, the board's primary focus divides into two key areas:
* **Financial Safety:** Ensuring the organization holds adequate Directors and Officers (D&O) insurance, maintains secure cash controls, and avoids speculative investments.
* **Physical & Compliance Safety:** Protecting employees, volunteers, and constituents from harassment and abuse, maintaining facilities, and obeying labor laws.

The board will necessarily know less about daily operations than the officers. Therefore, the officers must actively inform and instruct the board so that it can exercise appropriate legal oversight. This is particularly vital in youth organizations, where scanning, training, and strict abuse prevention policies must be verified.

### 3. Audit: Trust, but Verify
Audit is the process of checking to see if the organization is actually following its approved plans, staying within its budget, and keeping its records clean. 

A competent staff will come up well on all of these checks. However, if they deviate at all, that deviation should be an immediate concern that the board takes up. The board must investigate and consider what can be done to prevent the deviation from happening again.

The board must maintain an uneasy but necessary balance between trust and verification. You have the CEO in place because you believe in that person and trust them. But that does not mean you just rely on trust. Fiduciary care requires that you get proof and verification along the way.`
  },
  {
    title: "The 40-40-20 Rule for Board Meetings",
    slug: "the-40-40-20-rule-for-board-meetings",
    description: "Reclaim your board meetings. Learn how to allocate time to ensure 80% of your board meeting is spent on substantive deliberation rather than passive listening.",
    category: "Strategy",
    difficulty: "Intermediate",
    readingTime: 4,
    problem: "Most board meetings are incredibly boring three-hour marathons where staff read slides aloud, leaving only 10 minutes at the end for rushed decisions.",
    ruleTitle: "The Rule of Tripartite Meeting Allocation",
    ruleContent: "A three-hour board meeting must allocate two hours (80%) of its in-session time to active, engaging deliberation with the person who issued the reports. Written reports must be provided and thoroughly reviewed prior to the meeting.",
    askQuestions: [
      {
        question: "Given that we reviewed the written reports in advance, can we skip the reading of slides and move immediately to discussing the key deviations on page 4?",
        rationale: "Instantly shifts the meeting from passive presentation to active governance inquiry.",
        targetRole: "the Board Chair"
      }
    ],
    doNots: {
      title: "Slide Reading Aloud",
      items: [
        "Do not allow staff to read written reports line-by-line during the meeting.",
        "Do not distribute board packets at the door of the meeting; packets must arrive at least 5 business days prior.",
        "Do not vote on major financial items without having submitted written questions in advance."
      ],
      consequence: "Failing to read materials in advance and rushing decisions is a direct violation of the Duty of Care, exposing directors to liability if transactions fail."
    },
    minutesTemplate: {
      agendaItem: "Annual Program Budget Approval",
      mockMinutes: "The Treasurer presented the proposed budget. The Board discussed the materials, reference questions submitted in advance, and executive clarifications regarding personnel projections. After extensive deliberation, a motion to approve the budget was made, seconded, and carried unanimously.",
      whyItMatters: "Proves that the board didn't just rubber-stamp the budget, but engaged in actual debate and review."
    },
    content: `The "40-40-20 Rule" is a simple, battle-tested framework for getting the most out of your board members' limited time. If a board meets only four times a year for three hours, every minute is premium.

### What is the 40-40-20 Rule?
The rule dictates how a three-hour meeting should be structured:
* **40% of the effort is pre-meeting preparation:** Directors receive excellent, detailed reports five to seven days in advance. They are expected to dedicate two hours to studying these papers, writing down questions, and noting disagreements or areas requiring clarification.
* **40% of the meeting is structured engagement:** Most of the meeting is spent engaging with the materials and the executive who issued the reports. If the author is not present, the CEO must have all the answers. No reading of slides is permitted.
* **20% of the meeting is forward-looking focus:** The final portion is dedicated strictly to strategic planning, scanning the landscape, or discussing the organization's trajectory three to five years out.

### Demand Great Reports
You cannot run a 40-40-20 meeting without demanding great reports from staff. If the board packet is incomplete, poorly formatted, or late, the board chair must push back. 

As a director, if you do not understand a report, do not stay silent. Write to the CEO in advance of the meeting: *"I'm looking at the personnel deviation on page 3 and need more context before we vote. Could you provide a summary of the salary adjustments?"*

By doing this, you save meeting time and allow the CEO to prepare a thoughtful answer rather than getting defensive in front of the entire boardroom.`
  },
  {
    title: "Do We Need to Second Every Motion?",
    slug: "do-we-need-to-second-every-motion",
    description: "Demystifying parliamentary procedure. Learn how informal voting rules work in small governing boards, and why a second is rarely required.",
    category: "Legal",
    difficulty: "Beginner",
    readingTime: 4,
    problem: "Boards get bogged down in formalistic arguments about Robert's Rules of Order, arguing over 'seconds' and 'points of order' instead of making clear decisions.",
    ruleTitle: "The Rule of Common-Sense Parliamentary Decisiveness",
    ruleContent: "Under standard parliamentary procedure for small boards, no second is required for a resolution to proceed to a vote. The board chair may call for a vote when discussion is complete, provided the motion is clearly understood.",
    askQuestions: [
      {
        question: "Can we restate the exact wording of the motion so everyone is clear on what we are about to vote on?",
        rationale: "Prevents confusing, ambiguous votes that later complicate corporate records.",
        targetRole: "the Board Secretary"
      }
    ],
    doNots: {
      title: "Parliamentary Obstructionism",
      items: [
        "Do not allow informal, unstructured conversations to end without a formal, voted resolution.",
        "Do not use complex parliamentary maneuvers to silence minority viewpoints on the board.",
        "Do not forget to record the exact count or consensus of the vote in the minutes."
      ],
      consequence: "Vague, unvoted discussions about policy are legally unenforceable. Policies must be adopted via clear, voted resolutions."
    },
    minutesTemplate: {
      agendaItem: "Office Lease Contract Renewal",
      mockMinutes: "The Board Chair introduced the motion to authorize the renewal of the main office lease for a term of 3 years at the rate of $4,500/month. Following discussion, the motion was approved by a vote of 5 in favor, 0 opposed, and 1 abstention (Director Jones, who abstained due to conflicts).",
      whyItMatters: "Cleanly documents the exact terms, the vote, and the proper handling of a conflicted director."
    },
    content: `Many volunteer board members believe that every corporate action must follow a rigid, hyper-formalistic reading of Robert's Rules of Order. They spend precious time arguing over whether a motion was seconded, or whether an amendment requires a separate vote.

### Robert's Rules is Not the Only Authority
While your bylaws may reference Robert's Rules as a general guideline, the law does not enforce parliamentary pedantry. The law requires only that meetings are fair, that directors have an opportunity to be heard, and that decisions are made by a clear majority of a quorum.

In small boards (typically fewer than 15 directors), parliamentary procedure is designed to be highly informal:
1. **No second is legally needed** for a small board resolution to be voted on.
2. **The chair can make motions** and participate fully in the debate.
3. **Voting can be done orally**, by a show of hands, or by general consensus if there are no objections.

### The True Golden Rule of Motions
The only thing that actually matters when a motion is made is this: **Do the directors know exactly what they are trying to decide?**

Far too often, a director says, *"I move we look into buying a new van."* That is a vague suggestion, not a corporate resolution. A proper motion should state: *"I move we authorize the President to negotiate and execute a purchase agreement for a passenger van, with a total cost not to exceed $35,000, funded from the capital reserve."*

This is a clear, actionable instruction. Once voted on and recorded, it gives the executive officers a precise boundary of operation.`
  },
  {
    title: "What Insurance Does a Governing Board Need?",
    slug: "what-insurance-does-a-governing-board-need",
    description: "Understanding D&O insurance and general liability. Why the corporate shield doesn't protect against gross negligence, and how to verify your coverage.",
    category: "Safety",
    difficulty: "Intermediate",
    readingTime: 5,
    problem: "Directors assume that because they serve on a 'volunteer board,' they have complete immunity from personal lawsuits. This is a dangerous, incorrect assumption.",
    ruleTitle: "The Limit of the Corporate Shield",
    ruleContent: "Incorporation protects directors from simple contract liabilities, but does NOT protect against claims of gross negligence, willful misconduct, or tax non-withholding. Robust Directors & Officers (D&O) insurance is a mandatory cost of board service.",
    askQuestions: [
      {
        question: "Does our D&O policy include coverage for employment practices (wrongful termination, harassment) and is our policy limit adequate for our current $3M+ budget?",
        rationale: "Employment disputes are the most common source of D&O claims in organizations with paid staff.",
        targetRole: "the Insurance Broker"
      },
      {
        question: "Are we fully caught up on our payroll taxes, and does our D&O policy exclude coverage for personal tax liabilities?",
        rationale: "Reminds the board that directors face personal joint and several liability for unpaid payroll taxes.",
        targetRole: "the Treasurer"
      }
    ],
    doNots: {
      title: "Insurance Neglect",
      items: [
        "Do not serve on a governing board that has zero D&O insurance coverage.",
        "Do not assume general commercial liability covers boardroom governance decisions.",
        "Do not skip the annual review of the insurance policy exclusions and limits."
      ],
      consequence: "Serving without D&O insurance means your personal assets (home, savings) are directly exposed if a donor or employee sues the board."
    },
    minutesTemplate: {
      agendaItem: "Annual Insurance Portfolio Review",
      mockMinutes: "The Secretary presented the annual insurance summary prepared by the broker. The Board reviewed the current limits for general liability ($2M), D&O ($1M), and employment practices liability. Following inquiry regarding youth-abuse policy riders, the Board accepted the insurance report and authorized the payment of the annual premium.",
      whyItMatters: "Proves the board actively evaluated risk and maintained appropriate coverage, fulfilling the Duty of Care."
    },
    californiaThreshold: {
      statute: "CA Corp Code § 5047.5",
      text: "Uncompensated directors have limited liability ONLY if the corporation maintains a general liability policy meeting specific statutory minimums."
    },
    content: `It is a common myth that volunteer directors can never be sued. While California and federal laws provide general protections for volunteer board members, these protections are highly conditional.

### Why Incorporation is Not Enough
Incorporation creates a legal barrier that prevents creditors from coming after directors' personal assets for the organization's general debts. However, this "corporate shield" instantly pierces under several circumstances:
1. **Gross Negligence:** Making major decisions without any reasonable inquiry or diligence (e.g., approving a massive building loan without looking at financial statements).
2. **Willful Wrongdoing:** Committing or allowing fraudulent activities, self-dealing, or illegal behaviors.
3. **Unpaid Payroll Taxes:** The IRS holds individual board members personally liable for willfully failing to withhold and pay payroll taxes. This is a non-dischargeable personal liability.

### The Role of D&O Insurance
Because lawsuits can be brought against boards by disgruntled employees, former directors, donors, or the Attorney General, your organization must maintain high-quality **Directors and Officers (D&O) Insurance**.

D&O insurance does two critical things:
* It pays for the legal defense fees, which can accumulate to tens of thousands of dollars even if the lawsuit is completely meritless.
* It covers settlements or judgments rendered against individual directors, provided the conduct was not fraudulent or criminal.

When reviewing your policy, look out for "Employment Practices Liability (EPLI)." Employment disputes (wrongful termination, discrimination, hostile work environment) are the single biggest cause of legal claims against governing boards. If your organization has paid staff, EPLI is absolutely essential.`
  },
  {
    title: "The Chain of Command in Organization Governance",
    slug: "the-chain-of-command-in-governance",
    description: "The legal hierarchy of a corporation: Members, Directors, Officers, Staff, and Volunteers. Understanding where pastors and founders fit.",
    category: "Legal",
    difficulty: "Intermediate",
    readingTime: 5,
    problem: "Founders or senior pastors treat the organization as a personal fiefdom, ignoring the board's legal authority, leading to severe corporate breakdowns.",
    ruleTitle: "The Legal Chain of Corporate Command",
    ruleContent: "Under California law, the board of directors sits at the top of the corporate pyramid. Officers (President, Treasurer, Secretary) receive delegated authority from the board. Staff and volunteers report to the officers, who report collectively to the board.",
    askQuestions: [
      {
        question: "As the board of directors, we are the ultimate authority. Does our CEO's employment contract clearly state that they serve at the pleasure of the board?",
        rationale: "Establishes and reinforces the statutory chain of command.",
        targetRole: "the Board Chair"
      }
    ],
    doNots: {
      title: "Chain of Command Violations",
      items: [
        "Do not allow the CEO or founder to appoint their own board members without board approval.",
        "Do not let a single officer sign major contracts without explicit board authorization or a policy threshold.",
        "Do not allow individual directors to give instructions to employees between meetings."
      ],
      consequence: "Ignoring the chain of command can lead to the 'Alter Ego' doctrine, where the state disregards the corporation and holds individuals personally liable for debts."
    },
    minutesTemplate: {
      agendaItem: "Resolution of Delegated Signatory Authority",
      mockMinutes: "Upon motion duly made and seconded, the Board resolved that the President is authorized to execute operational contracts up to $25,000 without prior board approval. All contracts exceeding $25,000 require disinterested board approval and must be recorded in the official minutes.",
      whyItMatters: "Sets a precise, legally binding boundary on executive authority, protecting both the CEO and the board."
    },
    content: `Who is really in charge of a organization? Many people assume it is the founder, the executive director, or in the case of a church, the senior pastor. Legally, this is completely incorrect.

### The Corporate Pyramid
Under the law, a organization corporation is structured as a clear, legal hierarchy:
1. **The Board of Directors:** The ultimate authority. The board has the final responsibility to see that the organization succeeds and obeys the law.
2. **The Officers:** The board appoints officers (typically President, Treasurer, and Secretary) to manage daily affairs. These officers serve at the pleasure of the board and can be removed by the board at any time.
3. **The Staff:** Employees are hired by and report to the officers (principally the CEO or Executive Director).
4. **Volunteers:** Report to the staff.

### Where Does the Founder or Pastor Fit?
A founder or senior pastor is an agent of the corporation. They may have a seat on the board, and they may be the most influential voice in the room. But they are still accountable to the board. 

In many religious organizations, pastors have dual roles: spiritual leadership and secular management. While the board should respect spiritual leadership, the board is legally responsible for the secular business—finances, taxes, employment, and facilities. You cannot delegate your legal liability to a spiritual figure. The buck stops with the board.

If a founder treats the corporate bank account as their personal wallet, or signs contracts without board knowledge, they are violating the chain of command. This behavior can lead the IRS to revoke the organization's tax exemption, or lead the courts to hold the founder personally liable under the **Alter Ego** doctrine.`
  },
  {
    title: "Fiduciary Duties: Care, Loyalty, and Obedience",
    slug: "fiduciary-duties-care-loyalty-obedience",
    description: "The core legal obligations of every board director. What the law actually requires, and how the Business Judgment Rule protects you.",
    category: "Legal",
    difficulty: "Advanced",
    readingTime: 6,
    problem: "Directors join boards for prestige or social reasons, completely unaware that they have legally binding fiduciary duties that carry potential personal liability.",
    ruleTitle: "The Statutory Standard of Fiduciary Care",
    ruleContent: "A director must perform their duties in good faith, in a manner they believe to be in the best interests of the corporation, and with such care, including reasonable inquiry, as an ordinarily prudent person would use under similar circumstances.",
    askQuestions: [
      {
        question: "Have we consulted qualified independent professionals regarding the tax implications of this joint-venture transaction?",
        rationale: "Fulfills the Duty of Care's reasonable inquiry requirement, and activates the protections of the Business Judgment Rule.",
        targetRole: "the President"
      }
    ],
    doNots: {
      title: "Diligence Failures",
      items: [
        "Do not vote on resolutions without having read the supporting documentation provided in the board book.",
        "Do not participate in any vote or discussion where you have a direct or indirect personal financial interest.",
        "Do not ignore warning signs of financial distress, employee complaints, or regulatory audit requests."
      ],
      consequence: "Failing to conduct reasonable inquiry before a vote is a breach of the Duty of Care, which invalidates the Business Judgment Rule defense."
    },
    minutesTemplate: {
      agendaItem: "Approval of Land Purchase Agreement",
      mockMinutes: "The Board reviewed the independent appraisal report and environmental assessment for the target property. After inquiring regarding zoning restrictions, and relying on the written opinion of counsel, the Board approved the purchase of the property for $1.2M.",
      whyItMatters: "Proves the board relied on independent experts and conducted reasonable inquiry, activating Business Judgment protection."
    },
    californiaThreshold: {
      statute: "CA Corp Code § 5231",
      text: "Protects directors from liability under the Business Judgment Rule if they perform their duties in good faith, with reasonable inquiry, relying on competent experts."
    },
    content: `To serve on a board is a great honor, but it is more work than liberty. The law defines board members as **fiduciaries**—individuals who hold a position of trust and are legally obligated to look out for the best interests of the organization, its members, and the public.

Fiduciary responsibilities boil down to three primary duties:

### 1. The Duty of Care
The Duty of Care involves making decisions based on reasonable information. It is your obligation to "do your diligence." This includes:
* **Actually attending meetings** and participating. You cannot govern if you are not in the room.
* **Being thoroughly acquainted** with the documents that govern the organization, including monthly financial reports.
* **Asking questions** to get at information that is not always provided in staff-prepared materials. This is known as the **Duty of Inquiry**.

### 2. The Duty of Loyalty
Loyalty means caring about the organization more than yourself when there are conflicts. You must put the interest of the organization above your personal, professional, or financial interest.
* **Corporate Opportunities:** If you discover a business opportunity (such as a discounted land purchase or donation) in your capacity as a director, that opportunity belongs first to the corporation. You cannot divert it to your private business.
* **Conflict of Interest:** Never participate in an action or vote by the board in which you or your family members have a personal financial interest.

### 3. The Duty of Obedience
The Duty of Obedience requires directors to ensure the organization remains true to its stated charitable purpose, and complies with all applicable federal, state, and local laws. You cannot authorize the organization to engage in activities that violate its Articles of Incorporation or the Internal Revenue Code.

### The Business Judgment Rule
Fortunately, the law does not expect directors to be infallible. Under the **Business Judgment Rule**, you will not be held personally liable for a decision that turns out poorly, provided you acted:
1. In good faith.
2. With the care of an ordinarily prudent person.
3. After making **reasonable inquiry** under the circumstances.

Crucially, you are legally permitted to **rely on others** whom you reasonably believe to be reliable and competent—including executive officers, independent CPA auditors, legal counsel, and committees of the board.`
  },
  {
    title: "Starting a Organization: Fiscal Sponsorship vs. Starting Fresh",
    slug: "starting-an-organization-and-fiscal-sponsorship",
    description: "Before you spend thousands on legal fees, learn why fiscal sponsorship is the smartest incubator path for any charity under $100k in revenue.",
    category: "Startup",
    difficulty: "Beginner",
    readingTime: 5,
    problem: "Founders spend their entire life savings and six months of critical project time on filing forms, corporate setups, and CPA fees, only to shut down in two years.",
    ruleTitle: "The $100k Incubation Rule",
    ruleContent: "Any startup charity projecting less than $100,000 in annual revenues should seriously consider operating under a Fiscal Sponsor. This avoids startup delays and allows 100% of early donations to fund program operations from day one.",
    askQuestions: [
      {
        question: "Do we have the administrative capacity and $3,000 in seed capital to cover legal setup, tax registration, and annual CPA audits, or is a fiscal sponsor a more viable path?",
        rationale: "Forces founders to evaluate the real costs of administrative overhead before incorporating.",
        targetRole: "the Founder"
      }
    ],
    doNots: {
      title: "Premature Incorporation",
      items: [
        "Do not incorporate a brand-new entity until you have identified five unrelated board members.",
        "Do not spend donation money on administrative filings before programs are operational, unless clearly disclosed.",
        "Do not use a generic online template for your Articles of Incorporation; they must contain strict IRS tax-exempt language."
      ],
      consequence: "Failing to include mandatory tax-exempt language in your Articles will result in the immediate rejection of your IRS Form 1023 application, costing months of delay."
    },
    minutesTemplate: {
      agendaItem: "Evaluation of Fiscal Sponsorship Options",
      mockMinutes: "The Founder presented a comparative report on incorporating vs. entering a Model A fiscal sponsorship with Community Partners. The Board discussed the administrative savings, back-office support, and program timeline. Upon motion, the Board resolved to seek a fiscal sponsorship agreement.",
      whyItMatters: "Documents that the organizers actively evaluated alternatives to reduce waste and maximize early donor funds."
    },
    content: `Most organizations struggle during their first years of operation. Many fail within their first two years, never getting anywhere close to achieving their founders' plans. Many others end up closing because of some form of wrongful operations, where they miss regulatory filing deadlines or violate tax-exempt laws.

Before you begin, you must answer the critical question: **Do I really want to start a charity?**

### The Middle Way: Fiscal Sponsorship
Fortunately, there is a middle way between working with an existing organization and starting a new one from scratch: **Fiscal Sponsorship**.

Under this approach, rather than starting a new corporation, the new program operates as a project under the leadership, tax-exempt status, and guidance of an established charity.

### Key Benefits of Fiscal Sponsorship
1. **Programmatic Start on Day One:** Because the sponsoring organization is already recognized as a 501(c)(3) public charity, you can receive tax-deductible donations immediately.
2. **Back-Office Support:** The fiscal sponsor handles accounting, HR, payroll, tax filings, and general liability insurance.
3. **Low Administrative Cost:** Instead of thousands in legal, accounting, and registration fees, the fiscal sponsor typically charges a small administrative fee (usually 8% to 15% of revenues).

### Finding a Fiscal Sponsor
It is essential that you link up with an experienced charity which has an exempt purpose that covers your project. For example, a new homeless shelter project should seek a social services sponsor. Religiouly affiliated programs can often find incubation under a church or para-church organization, where a broad mandate exists to help others.

Our standard recommendation is that any charity that will not reach **$100,000 in annual revenues** seriously consider finding a fiscal sponsor to "incubate" the program for the first two years. This lets you prove your concept and build a donor base before taking on the massive legal burden of independent corporate administration.`
  },
  {
    title: "Recruiting Five Unrelated Directors for a Strong Board",
    slug: "recruiting-five-unrelated-board-directors",
    description: "The single biggest indicator of organization success. Why starting with fewer than 5 unrelated board members is a recipe for rapid failure.",
    category: "Startup",
    difficulty: "Beginner",
    readingTime: 5,
    problem: "Founders load their boards with spouses, siblings, and best friends to maintain complete control. This results in severe governance breakdown and is a massive red flag for the IRS.",
    ruleTitle: "The Five Unrelated Directors Threshold",
    ruleContent: "An effective, legally compliant board of directors must consist of at least five individuals who are not related by blood, marriage, or shared business interests. The ability to recruit five independent directors is the ultimate test of a founder's leadership.",
    askQuestions: [
      {
        question: "Among our current board members, how many have family relationships or shared business interests, and do we have at least five completely independent directors?",
        rationale: "Identifies whether the board fails the IRS standard of independence, which can trigger tax-exemption delays.",
        targetRole: "the Board President"
      }
    ],
    doNots: {
      title: "The Family Board",
      items: [
        "Do not appoint a husband and wife to serve together on a three-person board.",
        "Do not hire a board member's private business to provide services without a competitive bid and a conflict vote.",
        "Do not allow the CEO's family members to hold voting seats on the board."
      ],
      consequence: "The IRS will intensely scrutinize and frequently deny 501(c)(3) status to organizations whose boards are dominated by family members or business associates."
    },
    minutesTemplate: {
      agendaItem: "Board Expansion and Nominations",
      mockMinutes: "The Nominating Committee presented the qualifications of two independent candidates for the board: Sarah Smith (CPA) and David Miller (Logistics). Following review, the Board voted unanimously to expand the board size to seven and elect both candidates for a 2-year term.",
      whyItMatters: "Proves the board is active in expanding its independent oversight and recruiting specialized skills (finance, logistics)."
    },
    content: `In 25 years of assisting charities in getting started and in continued operations, we have noticed a remarkable pattern: the single most important factor in determining whether a charity will succeed is whether the founders can assemble a strong, diverse board of **five or more people who are not related to each other**.

### The Leadership Bellwether
We have seen founders who have put together astounding business plans of over 40 pages, detailing every market challenge and operational resource. But when those founders state that they cannot locate five unrelated people willing to dedicate a few hours a month to make the project work, failure is nearly inevitable.

The ability to assemble a board is a bellwether for the leadership skill of the founder. A true leader must have the ability to inspire others, reaching beyond relatives and close friends to mobilize people to action.

### Why Small Boards Fail
While smaller boards (three or four people) may seem nimbler and easier to organize, they are highly risky:
1. **Quorum Issues:** A quorum consists of more than half the board. If you have only three directors, you need at least two present to vote. If one of those two is the president, there is no real deliberation—just a casual discussion.
2. **Formality Deficit:** Small boards lack the formality necessary to remember that they are executing a serious corporate business function.
3. **Committee Insufficiency:** Boards get their real work done in specialized committees (Audit, Finance, Programs). You cannot staff committees without enough independent board members to distribute the load.

### Board Size Scale by Revenue
We recommend starting with five independent directors, but increasing the size once annual revenues hit specific thresholds:
* **Under $650,000:** Minimum of 5 directors
* **$650,000 to $800,000:** Add 1 director (6 total)
* **$800,000 to $950,000:** Add 1 director (7 total)
* **$950,000 to $1,100,000:** Add 1 director (8 total)
* **Over $2,000,000:** Build toward 15 directors to staff active committees (Executive, Audit, Nominating).`
  },
  {
    title: "Writing an Effective Organization Business Plan",
    slug: "writing-an-effective-organization-business-plan",
    description: "The seven essential sections of a organization business plan. How to clarify your resources and prepare for your IRS tax-exempt application.",
    category: "Startup",
    difficulty: "Beginner",
    readingTime: 5,
    problem: "Founders jump straight into operations without writing down a plan, leading to running out of cash within 3 months of launching programs.",
    ruleTitle: "The Seven-Section Plan Benchmark",
    ruleContent: "A professional organization business plan must be 12 to 20 pages long, structured into seven essential sections, and completed prior to applying for IRS tax-exempt status.",
    askQuestions: [
      {
        question: "Have we populated the 'Describe the Challenge' section of our business plan with real local data rather than generalities?",
        rationale: "Demonstrates to prospective donors and board members that the organization is solving a validated problem.",
        targetRole: "the Founder"
      }
    ],
    doNots: {
      title: "The Planless Launch",
      items: [
        "Do not launch programs without a 3-year projected cash budget.",
        "Do not write a massive 80-page business plan that is too dense to read.",
        "Do not copy-paste another organization's business plan; your plan must represent your unique operating model."
      ],
      consequence: "An unwritten plan results in failure to qualify for foundation grants, as funders universally require a formal business plan as part of the diligence process."
    },
    content: `Before you set the wheels of operation in motion, you must complete two critical groundwork steps: writing a business plan, and recruiting your board members. 

The business plan serves several vital needs:
* It helps you **clarify what the task ahead is going to look like**, forcing you to think about resources, not just vision.
* It helps you **recruit effective board members** by showing them that you have minimized surprises and thought through operational challenges.
* It **gathers all the information** required when you apply to the IRS for recognition of tax-exempt status (Form 1023).

We recommend that the business plan for a typical charity be about **12 to 20 pages long**. It should have seven essential sections:

### 1. The Executive Summary
Write this last, and keep it to one page. This is your opportunity to sell the reader on how great the new charity is going to be—showing passion for why the charity is necessary, what it will accomplish, and how it will do so.

### 2. Describe the Challenge
State the precise social or community need you are addressing. Use data, local statistics, and clear observations to define the problem.

### 3. The Proposed Solution (The Program)
Describe your programs in detail. What will your staff actually do on a Tuesday morning to address the challenge? Who are the beneficiaries, and how do they access your services?

### 4. Market and Competitor Analysis
Who else is working in this space? Explain why your approach is unique, or how you will collaborate with or supplement existing agencies rather than duplicating effort.

### 5. Management and Governance
Introduce your founder, key staff, and board of directors. Show that you have the right mix of passion and management skills (e.g., finance, legal, programmatic) to execute the plan.

### 6. Marketing and Fundraising Plan
How will donors find you? Detail your fundraising mix: individual gifts, major donors, foundation grants, corporate sponsorships, or fee-for-service program revenue.

### 7. Three-Year Financial Projections
Provide a detailed spreadsheet showing projected revenues and expenses for the first three years. Be realistic. If you expect to raise $100,000, do not budget $150,000 in salaries.`
  },
  {
    title: "How Governing Boards Should Review and Approve a Budget",
    slug: "how-boards-should-review-a-budget",
    description: "The timeline and steps for reviewing a budget. Why the approved budget is a legal limitation on executive officers.",
    category: "Finance",
    difficulty: "Advanced",
    readingTime: 6,
    problem: "Boards approve budgets at the very last meeting of the year without any real debate, treating a critical legal boundary as a minor formality.",
    ruleTitle: "The Dual-Meeting Budget Timeline",
    ruleContent: "The board must discuss budget generalities with the CEO and CFO exactly two meetings before the end of the fiscal year. A complete draft budget must be presented for review one meeting prior, with final approval occurring at the final meeting of the fiscal year.",
    askQuestions: [
      {
        question: "What are the ten biggest cost and revenue deviations from our current year's budget, and what is the operational narrative behind those variances?",
        rationale: "Identifies whether the organization's current spending is aligned with the board's authorized limitations.",
        targetRole: "the Chief Financial Officer"
      },
      {
        question: "Are our projected revenues based on pledged, historical donor data, or are we budgeting based on unverified fundraising hopes?",
        rationale: "Fulfills the Duty of Care by preventing the board from approving an inflated, deficit-prone budget.",
        targetRole: "the Treasurer"
      }
    ],
    doNots: {
      title: "The Retrospective Budget",
      items: [
        "Do not allow the fiscal year to begin without an approved board budget.",
        "Do not let the CEO adjust staff salaries or expand programs beyond the total limits set in the approved budget.",
        "Do not approve a budget that lacks line-item details for executive payroll and benefits."
      ],
      consequence: "Operating without an approved budget means the officers are spending corporate funds without board authorization, which is a breach of corporate governance."
    },
    minutesTemplate: {
      agendaItem: "Fiscal Year 2027 Budget Review and Adoption",
      mockMinutes: "The CFO presented the complete line-item draft budget for FY2027, projecting $3.2M in revenues. The Board discussed the 10 largest budget deviations from the prior year, specifically the 12% increase in employee health benefit costs. Upon motion, the FY2027 budget was adopted as presented, setting a legal operational expenditure limit of $3.1M.",
      whyItMatters: "Proves that the board actively debated the budget line items and set a binding legal limit on spending."
    },
    californiaThreshold: {
      statute: "CA Corp Code § 5239",
      text: "Protects volunteer directors from liability ONLY if their financial oversight decisions are made in good faith and meet the general standard of care."
    },
    content: `The approved budget is not just a financial projection. It is a legal instruction and a strict limitation on what the officers, employees, and volunteers can do in the next year.

To exercise proper oversight, the board must follow a disciplined, dual-meeting timeline before the start of every fiscal year:

### 1. Two Meetings Prior: The Generalities Discussion
Exactly two board meetings before the end of the fiscal year, the board must hold an open, strategic discussion with the CEO and CFO. 
* Do not look at detailed spreadsheets yet.
* Discuss generalities: What are our programmatic priorities? What is the fundraising landscape? What projects should we pursue?
* Let the officers lead with their application of the vision, while the board provides counsel and wisdom. This gives the staff a clear "contour" to prepare the actual budget.

### 2. One Meeting Prior: The Draft Presentation
At the meeting preceding the final meeting of the year, the staff must produce a complete, line-item draft budget following the contours discussed previously. 

The board must review this draft in detail. By doing this, the board completes most of its financial direction and revision before the pressure of the final meeting.

### 3. The Final Meeting: Adoption and Boundaries
At the final meeting of the year, the board votes to formally adopt the budget. Once approved, the budget represents the legal boundary of operations. 

If the CEO wishes to spend funds outside the approved budget categories, or exceed the total authorized spending by a meaningful margin (e.g., more than 5%), they must return to the board for a formal budget amendment.

### How to Review: The Ten Biggest Deviations
When reviewing a budget packet, do not get lost in the pennies. The most effective way to audit the budget is to ask the CFO for a list of the **ten biggest deviations** from the previous year's actual expenditures. 

If travel costs doubled, or program enrollment is projected to drop by 20%, demand the operational narrative behind those numbers. This is where the real governance issues reside.`
  },
  {
    title: "Keeping Clean Boardroom Minutes and Corporate Records",
    slug: "keeping-clean-boardroom-minutes-and-records",
    description: "The legal purpose of minutes. Why recording too much detail is a major corporate risk, and how to draft clean, defensive minutes.",
    category: "Legal",
    difficulty: "Intermediate",
    readingTime: 5,
    problem: "Secretaries write minutes like personal diaries or long transcripts of every debate, recording personal arguments, emotional outbursts, and unvoted opinions, creating massive legal vulnerabilities.",
    ruleTitle: "The Rule of Defensive Minutes Documentation",
    ruleContent: "Minutes are the legal record of the corporation. They must document what was done (resolutions, votes, approvals) and the general scope of deliberation, not what was said by individual directors. Keep entries concise, neutral, and focused.",
    askQuestions: [
      {
        question: "Does this draft of the minutes clearly state that a conflict of interest was disclosed, that the conflicted director left the room, and that the remaining disinterested directors voted?",
        rationale: "Ensures the minutes provide bulletproof documentation that a conflict-of-interest transaction was approved legally.",
        targetRole: "the Board Secretary"
      }
    ],
    doNots: {
      title: "The Transcript Minute",
      items: [
        "Do not record verbatim transcriptions or quotes of what individual directors said during a debate.",
        "Do not include emotional adjectives (e.g., 'Director Smith angrily stated...') in the minutes.",
        "Do not leave the minutes unapproved; minutes must be voted on and signed at the next regular meeting."
      ],
      consequence: "Verbatim or emotionally charged minutes are discoverable in court and are frequently used by plaintiff attorneys to prove internal corporate division, bad faith, or personal animosity."
    },
    minutesTemplate: {
      agendaItem: "Executive Compensation Review",
      mockMinutes: "The Board reviewed independent salary data for executives of comparable California organizations. Following discussion, and with the Executive Director absent from the room, the Board approved a 3% salary adjustment by a unanimous vote of the disinterested directors.",
      whyItMatters: "Clean, professional, and proves compliance with California disinterested director rules without unnecessary detail."
    },
    content: `Board minutes are the official, legal record of a corporation's actions. In a lawsuit or a regulatory audit by the Attorney General, the minutes are the very first document requested. They are the supreme evidence of whether the board is fulfilling its fiduciary duties of Care and Loyalty.

### What Minutes Should Record
The primary goal of minutes is to document **what was decided**, not who said what. Your minutes must always record:
* **The date, time, and location** of the meeting, and whether it was regular or special.
* **The names of those present** and whether a legal quorum was established.
* **The exact wording of every motion** voted on.
* **The names of the moving and seconding parties** (or simply that the motion was 'duly made and seconded').
* **The result of the vote**, including any abstentions.
* **Disclosures of conflicts** and whether the conflicted director recused themselves and left the room.
* **A brief, neutral summary** of any oral reports presented.

### What Minutes Should NOT Record
A board meeting is a place for robust, honest debate. If directors are worried that every comment or disagreement will be recorded in a permanent legal document, they will stay silent. Therefore, minutes should never be written as a transcript.
1. **Never record personal arguments** or finger-pointing.
2. **Never quote individual directors** unless specifically requested for the record.
3. **Do not use emotional language**. Write: *"The Board deliberated on the potential zoning challenges of the project,"* rather than *"Director Jones yelled that the project was a disaster due to zoning."*

### Trust, but Verify
Once minutes are drafted by the Secretary, they must be distributed in the next board packet, reviewed by all directors, voted on for approval, and signed. Once signed, they are filed in the official **Board Policy Manual** and kept permanently as a vital corporate record.`
  },
  {
    title: "Form 990 and Executive Compensation Decisions",
    slug: "form-990-and-executive-compensation-governance",
    description: "Understanding IRS Form 990 governance questions. Why executive salary decisions must be approved by disinterested directors using independent data.",
    category: "Finance",
    difficulty: "Advanced",
    readingTime: 6,
    problem: "The board allows the Executive Director or Founder to set their own salary, or votes to approve a raise without reviewing independent compensation data, triggering massive IRS 'Intermediate Sanctions' fines.",
    ruleTitle: "The Disinterested Compensation Approval Standard",
    ruleContent: "Under IRS rules, executive compensation decisions must be approved in advance by completely disinterested board members, relying on written independent comparability data (such as salary surveys), with the decision and data recorded in the minutes within 60 days.",
    askQuestions: [
      {
        question: "What independent compensation surveys or comparability data did we use to verify that our proposed ED salary represents fair market value?",
        rationale: "Establishes the IRS 'Rebuttable Presumption of Reasonableness,' which shifts the burden of proof off the board.",
        targetRole: "the Compensation Committee Chair"
      },
      {
        question: "Are we certifying on our Form 990 that we have a written conflict-of-interest policy, and does our review process match what we report to the IRS?",
        rationale: "Ensures the organization's public disclosures match its actual boardroom practices.",
        targetRole: "the President"
      }
    ],
    doNots: {
      title: "Conflicted Payroll Approvals",
      items: [
        "Do not allow the CEO to remain in the room or participate in the discussion or vote regarding their own salary.",
        "Do not approve a salary adjustment based solely on what the executive says they need to live on.",
        "Do not omit the formal written compensation review from your annual boardroom records."
      ],
      consequence: "Failing to document an independent compensation review can lead to the IRS imposing an 'excess benefit transaction' tax of up to 200% on the executive, and personal fines on the directors who voted for it."
    },
    minutesTemplate: {
      agendaItem: "Executive Compensation Audit",
      mockMinutes: "The Compensation Committee presented salary comparability data from the 2026 Northern California Organization Compensation Survey. With the Executive Director absent, the disinterested board members reviewed the data showing the median salary for similar $3M budgets is $125,000. Upon motion, the Board approved an annual salary of $122,000.",
      whyItMatters: "Bulletproof documentation that directly satisfies the IRS Rebuttable Presumption requirements."
    },
    californiaThreshold: {
      statute: "CA Gov Code § 12586",
      text: "California Nonprofit Integrity Act requires the board to review and approve the compensation of the President and CFO to ensure it is just and reasonable."
    },
    content: `IRS Form 990 is not just a financial return. It is a highly public governance scorecard. The IRS uses the Form 990 to ask direct, uncomfortable questions about how your board operates:
* *Did the organization review executive compensation using comparability data?*
* *Is there a written conflict of interest policy?*
* *Are board minutes drafted for every meeting?*
* *Does the board have independent, unrelated directors?*

### The Danger of Excess Benefit Transactions
If a board approves a salary, benefit package, or contract for an executive that exceeds "Fair Market Value," the IRS defines this as an **Excess Benefit Transaction**. 

Under IRC Section 4958, the IRS can levy massive, crushing penalties:
* **A 25% tax** on the executive for the excess amount (rising to **200%** if not corrected immediately).
* **A 10% personal tax** (up to $20,000) on the individual board members who knowingly voted to approve the unreasonable compensation.

### How to Protect Your Board: The Rebuttable Presumption
Fortunately, the IRS provides a safe harbor known as the **Rebuttable Presumption of Reasonableness**. If you follow three strict steps, the IRS must prove the compensation is unreasonable, rather than the board proving it is reasonable:

1. **Disinterested Board Approval:** The compensation must be reviewed and approved in advance by an authorized body (the board or a compensation committee) consisting entirely of individuals who do not have a conflict of interest. The executive must leave the room.
2. **Independent Comparability Data:** The board must obtain and rely on appropriate comparability data prior to making its decision. This includes salary surveys of similar-sized organizations in your geographic region, or documented salary offers from comparable institutions.
3. **Concurrent Written Documentation:** The board must adequately document the basis for its determination concurrently (within 60 days of the decision, or before the next meeting, whichever is earlier). The minutes must record: the approved amount, the comparability data relied upon, and the specific directors who voted.`
  }
];
export default articles;
