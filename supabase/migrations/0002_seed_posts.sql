-- Optional: run this AFTER you've created your account (see README-SUPABASE-SETUP.md).
-- Seeds the six sample essays that used to be hardcoded, so the site isn't empty
-- while you write real posts. Safe to skip entirely.
--
-- This assumes you are the only row in auth.users. If that's ever not true,
-- replace the subquery below with a specific email lookup instead.
--
-- Meant to be run once — running it twice will create duplicate posts,
-- since there's no unique field left to de-duplicate on.

insert into public.posts (title, description, category, reading_time, featured, published, content, author_id)
values
(
  'The Last Mile Problem in Welfare Delivery',
  'Why well-designed schemes still fail the households they were written for, and what implementation research tells us about closing that gap.',
  'Public Policy',
  '8 min read',
  true,
  true,
  $$A policy is only as good as the last kilometre it has to travel. Between a well-drafted scheme and a household that actually receives it sits a long chain of forms, verification steps, and human discretion.

## Design is not delivery

Most policy conversations end where the hardest work begins. We debate eligibility thresholds and budget outlays at length, then treat implementation as an administrative footnote. In practice, the shape of a scheme on the ground is decided by whoever sits at the counter on a Tuesday afternoon.

When I began reading district-level audit reports, the recurring theme was not corruption or scarcity. It was friction: a missing certificate, a portal that times out, an office three bus rides away. Each individually small, and cumulatively decisive.

> Friction is a form of exclusion that never has to be written into the rules.

## Three frictions worth measuring

- Informational: households do not know a benefit exists, or believe they are ineligible.
- Procedural: documentation requirements assume a paper trail that informal workers rarely have.
- Relational: applicants must repeatedly trust an institution that has previously turned them away.

Each of these can be measured. Uptake surveys catch the first, application-drop-off data catches the second, and qualitative interviews are the only honest window into the third.

## What tends to work

Auto-enrolment, saturation camps, and single-window verification consistently outperform awareness campaigns. Not because information does not matter, but because removing a step is more reliable than persuading someone to complete it.

The uncomfortable conclusion is that good policy writing is mostly subtraction — fewer documents, fewer visits, fewer opportunities for a legitimate claim to quietly fail.$$,
  (select id from auth.users order by created_at asc limit 1)
),
(
  'reading-a-budget-document',
  'How to Read a Budget Document Without Losing Your Mind',
  'A practical method for turning hundreds of pages of allocations into three or four claims you can actually defend.',
  'Governance',
  '6 min read',
  true,
  true,
  $$Budget documents are not written to be read; they are written to be filed. But with a fixed reading order, they become one of the most honest descriptions of what a government actually intends to do.

## Start at the back

The speech is a narrative; the expenditure profile is the plot. I read statements of revised estimates before anything else, because the gap between last year's promise and last year's spending predicts this year's credibility.

## Three ratios to write down

- Revised estimate against budget estimate, by ministry.
- Capital expenditure share of total outlay.
- Share of allocation flowing through centrally sponsored schemes.

These three numbers explain most headline claims, and quietly contradict a fair share of them.$$,
  (select id from auth.users order by created_at asc limit 1)
),
(
  'learning-outcomes-over-enrolment',
  'Enrolment Was the Easy Part',
  'India solved school access at remarkable speed. The unfinished agenda is what happens after a child sits down in the classroom.',
  'Education',
  '7 min read',
  true,
  true,
  $$Near-universal enrolment is a genuine achievement, and it has made the next problem harder to see: a classroom can be full and still not be a place where learning happens.

## The metric trap

Systems optimise for what they report. Enrolment is countable, visible, and politically legible. Reading fluency is none of those things, so it goes unmeasured for years at a time.

> We built the building. We are still learning to ask what happens inside it.

## Teaching at the right level

The most replicated finding in Indian education research is unglamorous: group children by current level rather than age, and give teachers a script they believe in. Both are administrative choices, not pedagogical mysteries.$$,
  (select id from auth.users order by created_at asc limit 1)
),
(
  'climate-adaptation-is-local',
  'Climate Adaptation Is a Municipal Problem',
  'National targets get the headlines, but heat action plans, drainage, and tree cover are decided by city budgets nobody reads.',
  'Environment',
  '9 min read',
  false,
  true,
  $$Mitigation is negotiated in conference halls. Adaptation is negotiated in ward offices, and it is almost always underfunded.

## Who actually decides

A heat action plan lives or dies on whether a municipal corporation has the staff to run it in May. Most of the ones I read were written well and resourced poorly.

- Shaded bus stops and public water points are cheap and rarely budgeted.
- Ward-level heat mortality data is almost never collected in real time.
- Adaptation spending sits across departments, so nobody owns the total.$$,
  (select id from auth.users order by created_at asc limit 1)
),
(
  'algorithms-in-public-administration',
  'When the State Uses an Algorithm',
  'Automated eligibility decisions promise consistency. They also move discretion somewhere much harder to appeal.',
  'Technology Policy',
  '10 min read',
  false,
  true,
  $$Every automated system inherits a policy question it was never asked to answer: what happens to the person the model gets wrong?

## Discretion does not disappear

Automation is often sold as the removal of human judgment. In reality judgment moves upstream, into thresholds and training data, where it becomes invisible and much harder to contest.

> A right without an appeal route is a preference.

## Minimum safeguards

- A published, plain-language statement of what the system decides.
- A named human who can reverse an outcome.
- Public error rates, disaggregated by district and social group.$$,
  (select id from auth.users order by created_at asc limit 1)
),
(
  'middle-powers-and-multilateralism',
  'Middle Powers and the Quiet Work of Multilateralism',
  'The interesting diplomacy of this decade is procedural: who drafts the text, who chairs the working group, who sets the agenda.',
  'International Relations',
  '8 min read',
  false,
  true,
  $$Influence in multilateral forums accrues to whoever shows up to the unglamorous meetings with a drafted paragraph in hand.

## Agenda-setting as power

Formal voting weight explains less than it seems to. The states that shape outcomes are the ones that arrive with technical capacity and a text other delegations can live with.

## Capacity is the constraint

This is ultimately a staffing question. Sustained procedural influence requires people who stay in the same negotiation for a decade — a very different investment from summit diplomacy.$$,
  (select id from auth.users order by created_at asc limit 1)
)
on conflict (slug) do nothing;
