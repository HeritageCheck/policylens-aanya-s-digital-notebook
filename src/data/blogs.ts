import policyCover from "@/assets/blog-policy.jpg";
import educationCover from "@/assets/blog-education.jpg";
import environmentCover from "@/assets/blog-environment.jpg";
import techCover from "@/assets/blog-tech.jpg";
import irCover from "@/assets/blog-ir.jpg";
import societyCover from "@/assets/blog-society.jpg";

export const categories = [
  "Public Policy",
  "Governance",
  "Education",
  "Society",
  "International Relations",
  "Environment",
  "Technology Policy",
] as const;

export type Category = (typeof categories)[number];

export type BlogSection = {
  id: string;
  heading: string;
  /** Simple block content — swap for MDX bodies later. */
  blocks: Array<
    | { type: "p"; text: string }
    | { type: "quote"; text: string }
    | { type: "list"; items: string[] }
  >;
};

export type Blog = {
  slug: string;
  title: string;
  description: string;
  category: Category;
  date: string;
  readingTime: string;
  cover: string;
  featured?: boolean;
  lede: string;
  sections: BlogSection[];
};

export const blogs: Blog[] = [
  {
    slug: "welfare-schemes-last-mile",
    title: "The Last Mile Problem in Welfare Delivery",
    description:
      "Why well-designed schemes still fail the households they were written for, and what implementation research tells us about closing that gap.",
    category: "Public Policy",
    date: "2026-07-18",
    readingTime: "8 min read",
    cover: policyCover,
    featured: true,
    lede: "A policy is only as good as the last kilometre it has to travel. Between a well-drafted scheme and a household that actually receives it sits a long chain of forms, verification steps, and human discretion.",
    sections: [
      {
        id: "design-vs-delivery",
        heading: "Design is not delivery",
        blocks: [
          {
            type: "p",
            text: "Most policy conversations end where the hardest work begins. We debate eligibility thresholds and budget outlays at length, then treat implementation as an administrative footnote. In practice, the shape of a scheme on the ground is decided by whoever sits at the counter on a Tuesday afternoon.",
          },
          {
            type: "p",
            text: "When I began reading district-level audit reports, the recurring theme was not corruption or scarcity. It was friction: a missing certificate, a portal that times out, an office three bus rides away. Each individually small, and cumulatively decisive.",
          },
          {
            type: "quote",
            text: "Friction is a form of exclusion that never has to be written into the rules.",
          },
        ],
      },
      {
        id: "three-frictions",
        heading: "Three frictions worth measuring",
        blocks: [
          {
            type: "list",
            items: [
              "Informational: households do not know a benefit exists, or believe they are ineligible.",
              "Procedural: documentation requirements assume a paper trail that informal workers rarely have.",
              "Relational: applicants must repeatedly trust an institution that has previously turned them away.",
            ],
          },
          {
            type: "p",
            text: "Each of these can be measured. Uptake surveys catch the first, application-drop-off data catches the second, and qualitative interviews are the only honest window into the third.",
          },
        ],
      },
      {
        id: "what-works",
        heading: "What tends to work",
        blocks: [
          {
            type: "p",
            text: "Auto-enrolment, saturation camps, and single-window verification consistently outperform awareness campaigns. Not because information does not matter, but because removing a step is more reliable than persuading someone to complete it.",
          },
          {
            type: "p",
            text: "The uncomfortable conclusion is that good policy writing is mostly subtraction — fewer documents, fewer visits, fewer opportunities for a legitimate claim to quietly fail.",
          },
        ],
      },
    ],
  },
  {
    slug: "reading-a-budget-document",
    title: "How to Read a Budget Document Without Losing Your Mind",
    description:
      "A practical method for turning hundreds of pages of allocations into three or four claims you can actually defend.",
    category: "Governance",
    date: "2026-06-02",
    readingTime: "6 min read",
    cover: societyCover,
    featured: true,
    lede: "Budget documents are not written to be read; they are written to be filed. But with a fixed reading order, they become one of the most honest descriptions of what a government actually intends to do.",
    sections: [
      {
        id: "start-at-the-back",
        heading: "Start at the back",
        blocks: [
          {
            type: "p",
            text: "The speech is a narrative; the expenditure profile is the plot. I read statements of revised estimates before anything else, because the gap between last year's promise and last year's spending predicts this year's credibility.",
          },
        ],
      },
      {
        id: "three-ratios",
        heading: "Three ratios to write down",
        blocks: [
          {
            type: "list",
            items: [
              "Revised estimate against budget estimate, by ministry.",
              "Capital expenditure share of total outlay.",
              "Share of allocation flowing through centrally sponsored schemes.",
            ],
          },
          {
            type: "p",
            text: "These three numbers explain most headline claims, and quietly contradict a fair share of them.",
          },
        ],
      },
    ],
  },
  {
    slug: "learning-outcomes-over-enrolment",
    title: "Enrolment Was the Easy Part",
    description:
      "India solved school access at remarkable speed. The unfinished agenda is what happens after a child sits down in the classroom.",
    category: "Education",
    date: "2026-05-14",
    readingTime: "7 min read",
    cover: educationCover,
    featured: true,
    lede: "Near-universal enrolment is a genuine achievement, and it has made the next problem harder to see: a classroom can be full and still not be a place where learning happens.",
    sections: [
      {
        id: "the-metric-trap",
        heading: "The metric trap",
        blocks: [
          {
            type: "p",
            text: "Systems optimise for what they report. Enrolment is countable, visible, and politically legible. Reading fluency is none of those things, so it goes unmeasured for years at a time.",
          },
          {
            type: "quote",
            text: "We built the building. We are still learning to ask what happens inside it.",
          },
        ],
      },
      {
        id: "teaching-at-the-right-level",
        heading: "Teaching at the right level",
        blocks: [
          {
            type: "p",
            text: "The most replicated finding in Indian education research is unglamorous: group children by current level rather than age, and give teachers a script they believe in. Both are administrative choices, not pedagogical mysteries.",
          },
        ],
      },
    ],
  },
  {
    slug: "climate-adaptation-is-local",
    title: "Climate Adaptation Is a Municipal Problem",
    description:
      "National targets get the headlines, but heat action plans, drainage, and tree cover are decided by city budgets nobody reads.",
    category: "Environment",
    date: "2026-04-08",
    readingTime: "9 min read",
    cover: environmentCover,
    lede: "Mitigation is negotiated in conference halls. Adaptation is negotiated in ward offices, and it is almost always underfunded.",
    sections: [
      {
        id: "who-actually-decides",
        heading: "Who actually decides",
        blocks: [
          {
            type: "p",
            text: "A heat action plan lives or dies on whether a municipal corporation has the staff to run it in May. Most of the ones I read were written well and resourced poorly.",
          },
          {
            type: "list",
            items: [
              "Shaded bus stops and public water points are cheap and rarely budgeted.",
              "Ward-level heat mortality data is almost never collected in real time.",
              "Adaptation spending sits across departments, so nobody owns the total.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "algorithms-in-public-administration",
    title: "When the State Uses an Algorithm",
    description:
      "Automated eligibility decisions promise consistency. They also move discretion somewhere much harder to appeal.",
    category: "Technology Policy",
    date: "2026-03-11",
    readingTime: "10 min read",
    cover: techCover,
    lede: "Every automated system inherits a policy question it was never asked to answer: what happens to the person the model gets wrong?",
    sections: [
      {
        id: "discretion-moves",
        heading: "Discretion does not disappear",
        blocks: [
          {
            type: "p",
            text: "Automation is often sold as the removal of human judgment. In reality judgment moves upstream, into thresholds and training data, where it becomes invisible and much harder to contest.",
          },
          {
            type: "quote",
            text: "A right without an appeal route is a preference.",
          },
        ],
      },
      {
        id: "minimum-safeguards",
        heading: "Minimum safeguards",
        blocks: [
          {
            type: "list",
            items: [
              "A published, plain-language statement of what the system decides.",
              "A named human who can reverse an outcome.",
              "Public error rates, disaggregated by district and social group.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "middle-powers-and-multilateralism",
    title: "Middle Powers and the Quiet Work of Multilateralism",
    description:
      "The interesting diplomacy of this decade is procedural: who drafts the text, who chairs the working group, who sets the agenda.",
    category: "International Relations",
    date: "2026-02-20",
    readingTime: "8 min read",
    cover: irCover,
    lede: "Influence in multilateral forums accrues to whoever shows up to the unglamorous meetings with a drafted paragraph in hand.",
    sections: [
      {
        id: "agenda-setting",
        heading: "Agenda-setting as power",
        blocks: [
          {
            type: "p",
            text: "Formal voting weight explains less than it seems to. The states that shape outcomes are the ones that arrive with technical capacity and a text other delegations can live with.",
          },
        ],
      },
      {
        id: "capacity",
        heading: "Capacity is the constraint",
        blocks: [
          {
            type: "p",
            text: "This is ultimately a staffing question. Sustained procedural influence requires people who stay in the same negotiation for a decade — a very different investment from summit diplomacy.",
          },
        ],
      },
    ],
  },
];

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);

export const getAdjacent = (slug: string) => {
  const i = blogs.findIndex((b) => b.slug === slug);
  return {
    prev: i > 0 ? blogs[i - 1] : undefined,
    next: i >= 0 && i < blogs.length - 1 ? blogs[i + 1] : undefined,
  };
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
