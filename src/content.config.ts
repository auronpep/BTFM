import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const audience = z.enum([
  'working-board-member',
  'board-chair',
  'officer',
  'committee-member',
  'executive-director',
  'startup-founder',
  'advisor',
]);

const boardStage = z.enum([
  'startup',
  'working-board',
  'mature-board',
  'annual-cycle',
  'crisis-response',
]);

const jurisdiction = z.enum(['california', 'federal', 'general-us']);

const useBefore = z.enum([
  'board-meeting',
  'budget-approval',
  'audit-review',
  'form-990-review',
  'executive-session',
  'compensation-decision',
  'conflict-vote',
  'insurance-review',
  'bylaws-or-policy-change',
  'annual-meeting',
]);

const fieldManualTopic = z.enum([
  'next-meeting',
  'money-audit',
  'executive-oversight',
  'risk-safety',
  'minutes-records',
  'california-board-rules',
  'tools',
  'training',
  'starting-a-charity',
]);

const documentReference = z.object({
  label: z.string(),
  description: z.string().optional(),
  href: z.string().optional(),
  required: z.boolean().default(false),
});

const escalation = z.object({
  summary: z.string(),
  triggers: z.array(z.string()).default([]),
  npoLawyersUrl: z.url().default('https://NPOlawyers.com'),
});

const sourceCitation = z.object({
  label: z.string(),
  url: z.url(),
  publisher: z.string().optional(),
  accessed: z.coerce.date().optional(),
});

const commonFrontmatter = z.object({
  title: z.string(),
  description: z.string(),
  deck: z.string().optional(),
  audience: z.array(audience).default(['working-board-member']),
  boardStage: z.array(boardStage).default(['working-board']),
  jurisdiction: z.array(jurisdiction).default(['california']),
  topics: z.array(fieldManualTopic).default([]),
  useBefore: z.array(useBefore).default([]),
  documents: z.array(documentReference).default([]),
  questionsToAsk: z.array(z.string()).default([]),
  minutesShouldShow: z.array(z.string()).default([]),
  redFlags: z.array(z.string()).default([]),
  legalEscalation: escalation.optional(),
  relatedTools: z.array(z.string()).default([]),
  relatedContent: z.array(z.string()).default([]),
  trainingCta: z.string().optional(),
  attorneyReviewRequired: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const datedFrontmatter = commonFrontmatter.extend({
  pubDate: z.coerce.date().optional(),
  updatedDate: z.coerce.date().optional(),
});

const createMdxCollection = <Schema extends z.ZodTypeAny>(
  directory: string,
  schema: Schema,
) =>
  defineCollection({
    loader: glob({
      pattern: '**/[^_]*.{md,mdx}',
      base: `./src/content/${directory}`,
    }),
    schema,
  });

const articles = createMdxCollection(
  'articles',
  datedFrontmatter.extend({
    template: z.literal('field-manual-article').default('field-manual-article'),
    category: fieldManualTopic,
    readingTimeMinutes: z.number().int().positive().optional(),
    download: documentReference.optional(),
  }),
);

const scenarios = createMdxCollection(
  'scenarios',
  datedFrontmatter.extend({
    template: z.literal('boardroom-scenario').default('boardroom-scenario'),
    category: fieldManualTopic,
    boardroomProblem: z.string(),
    decisionPressure: z.string().optional(),
    recommendedBoardResponse: z.array(z.string()).default([]),
    whatNotToDo: z.array(z.string()).default([]),
  }),
);

const tools = createMdxCollection(
  'tools',
  commonFrontmatter.extend({
    toolType: z.enum([
      'checklist',
      'worksheet',
      'scorecard',
      'calendar',
      'authority-map',
      'template',
      'lab',
      'guide',
    ]),
    format: z.enum(['page', 'pdf', 'docx', 'xlsx', 'external']).default('page'),
    downloadHref: z.string().optional(),
    estimatedMinutes: z.number().int().positive().optional(),
    inputsNeeded: z.array(z.string()).default([]),
    output: z.string().optional(),
  }),
);

const meetingPrep = createMdxCollection(
  'meetingPrep',
  commonFrontmatter.extend({
    agendaType: useBefore,
    preparationWindow: z.enum(['same-day', '24-hours', '48-hours', 'one-week']),
    packetSections: z.array(z.string()).default([]),
    decisionNeeded: z.string().optional(),
  }),
);

const packetGuides = createMdxCollection(
  'packetGuides',
  commonFrontmatter.extend({
    packetType: z.enum([
      'budget',
      'audit',
      'form-990',
      'executive-director-report',
      'compensation',
      'conflict-of-interest',
      'insurance',
      'bylaws',
      'annual-meeting',
    ]),
    reviewMode: z.enum(['skim', 'standard', 'deep-review']).default('standard'),
    expectedPacketItems: z.array(z.string()).default([]),
    missingItemQuestions: z.array(z.string()).default([]),
  }),
);

const questionBank = createMdxCollection(
  'questionBank',
  commonFrontmatter.extend({
    questionTopic: fieldManualTopic,
    questionType: z.enum(['clarifying', 'oversight', 'risk', 'minutes', 'legal']),
    useInMeeting: z.boolean().default(true),
    followUpQuestions: z.array(z.string()).default([]),
  }),
);

const redFlags = createMdxCollection(
  'redFlags',
  commonFrontmatter.extend({
    severity: z.enum(['watch', 'serious', 'urgent']),
    signal: z.string(),
    whyItMatters: z.string(),
    immediateBoardAction: z.array(z.string()).default([]),
  }),
);

const californiaRules = createMdxCollection(
  'californiaRules',
  commonFrontmatter.extend({
    ruleType: z.enum([
      'audit-threshold',
      'audit-committee',
      'form-990',
      'attorney-general-registry',
      'statement-of-information',
      'conflicts-of-interest',
      'compensation-approval',
      'minutes-records',
      'charitable-solicitation',
    ]),
    sourceCitations: z.array(sourceCitation).default([]),
    effectiveDate: z.coerce.date().optional(),
    attorneyReviewRequired: z.boolean().default(true),
  }),
);

const trainingEvents = createMdxCollection(
  'trainingEvents',
  commonFrontmatter.extend({
    eventType: z.enum(['webinar', 'in-person', 'workshop', 'private-training']),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    registrationUrl: z.url().optional(),
    locationType: z.enum(['online', 'in-person', 'hybrid']).default('online'),
    locationName: z.string().optional(),
    capacity: z.number().int().positive().optional(),
    audienceFit: z.array(z.string()).default([]),
  }),
);

export const collections = {
  articles,
  scenarios,
  tools,
  meetingPrep,
  packetGuides,
  questionBank,
  redFlags,
  californiaRules,
  trainingEvents,
};
