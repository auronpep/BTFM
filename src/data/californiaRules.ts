export interface CaliforniaRule {
  id: string;
  title: string;
  statute: string;
  threshold: string;
  consequenceOfFailure: string;
  complianceActionList: string[];
  fullExplanation: string;
  legalEscalationTrigger: string;
  relatedArticleSlug?: string;
}

export const californiaRules: CaliforniaRule[] = [
  {
    id: "two-million-audit-rule",
    title: "The $2M Gross Revenue Independent Audit Threshold",
    statute: "California Government Code § 12586(e)(1)",
    threshold: "Gross revenues of $2,000,000 or more in any fiscal year (excluding government grants/fees).",
    consequenceOfFailure: "Administrative suspension by the Registry of Charitable Trusts, loss of good standing, and potential personal liability for directors if financial mismanagement goes unnoticed due to lack of an audit.",
    complianceActionList: [
      "Retain an independent Certified Public Accountant (CPA) to perform an annual audit in accordance with GAAP.",
      "Establish a standalone Board Audit Committee by formal resolution.",
      "Ensure the Audit Committee contains zero staff members, zero executive officers, and no Treasurer.",
      "Limit Finance Committee members on the Audit Committee to less than 50% of the Audit Committee seats.",
      "Ensure the Audit Committee Chair is not a member of the Finance Committee.",
      "Verify that the audited financial statements are made available to the public and filed with the Registry."
    ],
    fullExplanation: "Under the California Nonprofit Integrity Act of 2004, any charitable corporation with gross annual revenues of $2 million or more must prepare annual audited financial statements. The audit must be conducted by an independent CPA. Critically, the Act mandates the creation of a Board Audit Committee. This committee has strict membership requirements designed to prevent conflicts: it must consist of disinterested directors, excluding any staff, officers, the President, or the Treasurer. The Audit Committee is responsible for recommending the CPA firm, negotiating compensation, and reviewing the scope and results of the audit.",
    legalEscalationTrigger: "The organization is approaching or has exceeded $1.8M in gross revenues, or has a combined Finance and Audit Committee with shared members.",
    relatedArticleSlug: "form-990-and-executive-compensation-governance"
  },
  {
    id: "form-rrf-1-filing",
    title: "Annual Registration Renewal (Form RRF-1)",
    statute: "California Government Code § 12586",
    threshold: "Required annually for all registered charities operating in California, regardless of revenue.",
    consequenceOfFailure: "Immediate designation of 'Delinquent' status on the Registry. Delinquency makes it illegal to solicit or spend charitable funds, triggers automatic IRS tax-exempt suspension, and results in late penalties of $800+ and personal director liability.",
    complianceActionList: [
      "File Form RRF-1 with the Registry of Charitable Trusts within 4.5 months after the close of the fiscal year (e.g., May 15 for calendar year entities).",
      "Attach a complete copy of IRS Form 990, 990-EZ, or 990-PF if gross revenues exceed $50,000.",
      "Submit Form CT-TR-1 alongside RRF-1 if gross revenues are under $50,000.",
      "Pay the sliding-scale renewal fee based on gross annual revenue (ranging from $0 to $300).",
      "Draft a board resolution formally accepting the completed filing prior to submission."
    ],
    fullExplanation: "The Attorney General's Registry of Charitable Trusts monitors charities to prevent the diversion of charitable assets. Form RRF-1 is the primary vehicle for this monitoring. Every California charity must file this form annually. Filing RRF-1 late or without the accompanying Form 990 or CT-TR-1 will result in a 'Delinquency' notice. In California, directors who allow an organization to become delinquent are personally liable for any late fees or penalties; charitable assets cannot be used to pay delinquency fines.",
    legalEscalationTrigger: "The organization's Registry status is listed as 'Delinquent,' 'Suspended,' or 'Revoked' on the Attorney General website.",
    relatedArticleSlug: "keeping-clean-boardroom-minutes-and-records"
  },
  {
    id: "form-si-100-statement",
    title: "Secretary of State Statement of Information (Form SI-100)",
    statute: "California Corporations Code § 6210",
    threshold: "Required biennially (every two years) for all California organization corporations.",
    consequenceOfFailure: "A mandatory $250 penalty levied by the Secretary of State, followed by administrative suspension of corporate powers, rendering the organization unable to sign contracts, protect its trademark, or defend lawsuits.",
    complianceActionList: [
      "File Form SI-100 with the Secretary of State every two years.",
      "File within the designated 5-month filing window (the anniversary month of incorporation and the preceding 4 months).",
      "Record current, verified names and physical addresses of the President, Secretary, and Treasurer.",
      "Appoint and maintain a valid Agent for Service of Process with a physical California address.",
      "File an updated SI-100 immediately (within 30 days) if there is any change in officers, directors, or Agent."
    ],
    fullExplanation: "The Statement of Information (Form SI-100) is a public filing that keeps the state and the public informed of the identity of the corporation's officers, directors, and its Agent for Service of Process (the individual authorized to receive legal notices). Fines for late filing are automatic and non-negotiable. If suspended, the corporation loses all of its corporate rights, meaning it cannot legally operate or enter into contracts.",
    legalEscalationTrigger: "The corporation has elected new officers (President, Secretary, or Treasurer) or has missed its biennial SI-100 filing deadline.",
    relatedArticleSlug: "the-chain-of-command-in-governance"
  },
  {
    id: "attorney-general-guide-compliance",
    title: "Compliance with the California AG's Guide for Charities",
    statute: "California Government Code § 12580-12599.8",
    threshold: "Applicable to all organization public benefit corporations holding assets in trust for the public.",
    consequenceOfFailure: "Investigation by the Attorney General's Charitable Trusts Section, dissolution of the corporation, and civil lawsuits against individual directors for breach of trust.",
    complianceActionList: [
      "Maintain a written Board Conflict of Interest Policy.",
      "Conduct annual board reviews of conflict-of-interest disclosures.",
      "Strictly prohibit loans to any director or officer (which are completely illegal in California).",
      "Review the AG's Guide for Charities as part of annual board onboarding procedures.",
      "Ensure all fundraising solicitation disclosures are transparent and accurate."
    ],
    fullExplanation: "The California Attorney General publishes the 'Guide for Charities' to outline the legal boundaries of public trusts. Under California law, a charity's assets are held in trust for the benefit of the public, not the founders. The AG holds broad supervisory power to investigate board self-dealing, excessive compensation, fraudulent fundraising, and negligent oversight. A key compliance rule is that a California organization is strictly prohibited from making loans of corporate funds to any director, officer, or key employee.",
    legalEscalationTrigger: "A director discloses a potential conflict-of-interest transaction, or a founder requests a short-term cash loan from corporate accounts.",
    relatedArticleSlug: "fiduciary-duties-care-loyalty-obedience"
  },
  {
    id: "independent-director-fifty-one-percent",
    title: "The 51% Independent Board Standard",
    statute: "California Corporations Code § 5227",
    threshold: "Mandatory standard for all California organization public benefit corporations.",
    consequenceOfFailure: "The corporation's transactions can be invalidated, contracts can be set aside, and the Attorney General can file a civil lawsuit to remove the board and dissolve the corporation.",
    complianceActionList: [
      "Ensure that not more than 49% of the voting board members are 'interested persons.'",
      "Define 'interested person' as anyone currently compensated by the corporation for services (staff, contractors) or related to them by blood or marriage.",
      "Verify that at least 51% of the board consists of completely independent, uncompensated directors.",
      "Review board compensation structures annually to confirm compliance."
    ],
    fullExplanation: "California Corporations Code Section 5227 is a unique, strict rule designed to prevent self-dealing. It dictates that not more than 49% of the board can be 'interested persons.' In practice, this means that if you have a 5-person board, only 2 people can be compensated employees (such as the CEO) or related to compensated employees by blood or marriage. At least 3 directors must be completely independent and uncompensated. This prevents family-run or employee-dominated boards from spending charitable assets without independent oversight.",
    legalEscalationTrigger: "The board has decreased in size, leaving compensated staff or their relatives with 50% or more of the voting seats.",
    relatedArticleSlug: "recruiting-five-board-directors"
  }
];
export default californiaRules;
