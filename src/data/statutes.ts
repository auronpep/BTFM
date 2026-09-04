/**
 * Statute and glossary reference data.
 *
 * Kept out of StatuteTooltip.tsx so that file exports only React components:
 * a module mixing components with plain data/helpers cannot be hot-reloaded,
 * which is what eslint-plugin-react-refresh reports.
 */

export interface StatuteInfo {
  standard: string;
  desc: string;
}

export const statuteDict: Record<string, StatuteInfo> = {
  'cacorpcode5233': {
    standard: 'California Corporations Code § 5233',
    desc: 'Prohibits self-dealing transactions where a director has a material financial interest, voiding contracts unless strict, disinterested board approval is obtained first.'
  },
  'cacorpcode5231': {
    standard: 'California Corporations Code § 5231',
    desc: 'Establishes the fiduciary Duty of Care, requiring directors to perform their duties in good faith, with the care of an ordinarily prudent person.'
  },
  'cacorpcode5227': {
    standard: 'California Corporations Code § 5227',
    desc: 'Mandates that no more than 49% of the board can be interested persons (compensated employees or their relatives), ensuring an independent majority.'
  },
  'cacorpcode5239': {
    standard: 'California Corporations Code § 5239',
    desc: 'Protects volunteer directors of certain organizations from personal monetary liability to third parties for negligent acts if acting in good faith.'
  },
  'cacorpcode5047.5': {
    standard: 'California Corporations Code § 5047.5',
    desc: 'Immunizes volunteer directors from personal liability, but only if the corporation maintains a compliant general liability and D&O insurance policy.'
  },
  'cacorpcode50475': {
    standard: 'California Corporations Code § 5047.5',
    desc: 'Immunizes volunteer directors from personal liability, but only if the corporation maintains a compliant general liability and D&O insurance policy.'
  },
  'cagovcode12586': {
    standard: 'California Government Code § 12586',
    desc: 'Mandates a formal financial audit by an independent CPA and a separate audit committee for organizations with annual revenues of $2 Million or more.'
  },
  'cacorpcode12586': {
    standard: 'California Government Code § 12586',
    desc: 'Mandates a formal financial audit by an independent CPA and a separate audit committee for organizations with annual revenues of $2 Million or more.'
  },
  'cagovcode12580': {
    standard: 'California Government Code § 12580',
    desc: 'Regulates charitable trust assets under the Supervision Act, making directors personally liable for diverting donor-restricted funds.'
  },
  'cauicode1735': {
    standard: 'California Unemployment Insurance Code § 1735',
    desc: 'Imposes personal, joint-and-several liability on directors and officers who fail to pay employee payroll and state withholding taxes.'
  },
  'irc4958': {
    standard: 'Internal Revenue Code § 4958',
    desc: 'Imposes severe IRS excise tax sanctions (up to 200%) on disqualified insiders and board fiduciaries who authorize excessive executive compensation.'
  },
  'irc6672': {
    standard: 'Internal Revenue Code § 6672',
    desc: 'Imposes a 100% personal Trust Fund Recovery Penalty on individual board members for willfully failing to deposit withheld federal employee payroll taxes.'
  },
  'cacorpcode5212': {
    standard: 'California Corporations Code § 5212',
    desc: 'Authorizes board committees, but explicitly forbids them from amending bylaws, filling vacancies, or approving interested director contracts.'
  },
  'cacorpcode5211': {
    standard: 'California Corporations Code § 5211',
    desc: 'Regulates strict board meeting procedures, notice periods, quorum requirements, and limitations on email/telephonic voting.'
  },
  'cacorpcode5215': {
    standard: 'California Corporations Code § 5215',
    desc: 'Confirms that certified copies of board meeting minutes serve as prima facie evidence of meeting proceedings and valid resolutions.'
  },
  'cacorpcode5210': {
    standard: 'California Corporations Code § 5210',
    desc: 'Mandates that the activities and affairs of a corporation shall be managed and all corporate powers shall be exercised by or under the direction of the board.'
  },
  'cacorpcode5150': {
    standard: 'California Corporations Code § 5150',
    desc: 'Details board and member authority to adopt, amend, or repeal bylaws, establishing default limits on structural changes.'
  },
  'cacorpcode5230': {
    standard: 'California Corporations Code § 5230',
    desc: 'Applies trust-stewardship duties to directors managing assets, including tracking and adhering strictly to donor-imposed restricted conditions.'
  },
  'cacorpcode5141': {
    standard: 'California Corporations Code § 5141',
    desc: 'Asserts the doctrine of Ultra Vires, limiting claims that actions are invalid because the corporation lacked the capacity to act.'
  },
  'cacorpcode5220': {
    standard: 'California Corporations Code § 5220',
    desc: 'Sets limits on director terms of office, providing that terms of directors of public benefit corporations may not exceed three years.'
  },
  'cacorpcode5213': {
    standard: 'California Corporations Code § 5213',
    desc: 'Mandates that a corporation must have a President, a Secretary, and a Chief Financial Officer / Treasurer to prevent absolute delegation of authority.'
  },
  'cacorpcode5238': {
    standard: 'California Corporations Code § 5238',
    desc: 'Dictates the rules under which a corporation may indemnify directors and officers against legal costs, settlements, or judgments.'
  },
  'calaborcode1102.5': {
    standard: 'California Labor Code § 1102.5',
    desc: 'Protects employees against retaliation for disclosing information regarding potential employer violations of law or regulations to fiduciaries or agencies.'
  },
  'calaborcode11025': {
    standard: 'California Labor Code § 1102.5',
    desc: 'Protects employees against retaliation for disclosing information regarding potential employer violations of law or regulations to fiduciaries or agencies.'
  },
  'upmifa': {
    standard: 'Uniform Prudent Management of Institutional Funds Act',
    desc: 'Establishes statutory standards for the investment and expenditure of donor-restricted endowment funds under California law.'
  }
};

export const getStatuteKey = (token: string): string => {
  let cleaned = token.toLowerCase().replace(/[^a-z0-9.]/g, '');
  // Normalize California codes
  cleaned = cleaned.replace('californiacorporationscode', 'cacorpcode');
  cleaned = cleaned.replace('californiagovernmentcode', 'cagovcode');
  cleaned = cleaned.replace('californiaunemploymentinsurancecode', 'cauicode');
  cleaned = cleaned.replace('californialaborcode', 'calaborcode');
  cleaned = cleaned.replace('unemploymentinsurancecode', 'uicode');
  cleaned = cleaned.replace('corporationscode', 'corpcode');
  cleaned = cleaned.replace('governmentcode', 'govcode');
  cleaned = cleaned.replace('laborcode', 'laborcode');
  
  // Clean up any trailing parentheses or letters for simple dictionary matches
  // e.g. "cacorpcode5212a1" -> "cacorpcode5212"
  if (cleaned.startsWith('cacorpcode') || cleaned.startsWith('cagovcode')) {
    const match = cleaned.match(/^(cacorpcode|cagovcode|cauicode|calaborcode)\d+(\.\d+)?/);
    if (match) {
      cleaned = match[0];
    }
  }
  return cleaned;
};

// React component wrapping statutory text in an interactive hover card
