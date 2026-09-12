import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { AchievementCard } from "@/components/AchievementCard";
import { StatCard } from "@/components/StatCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  academicJourney,
  awards,
  competitions,
  interests,
  leadership,
  researchInterests,
  skills,
  stats,
} from "@/data/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Aanya Monga — The Third Eye Economist" },
      {
        name: "description",
        content:
          "Academic journey, research interests, skills, competitions, leadership roles and awards of Aanya Monga, a student of public policy and governance.",
      },
      { property: "og:title", content: "About Aanya Monga — The Third Eye Economist" },
      {
        property: "og:description",
        content:
          "Academic journey, research interests, competitions, leadership and awards of policy student Aanya Monga.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <span className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
          About me
        </span>
        <h1 className="mt-4 text-4xl leading-[1.1] text-balance-tight sm:text-5xl">
          A student of how good intentions become working systems.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          I’m Aanya — I study public policy and governance, spend most of my reading time inside
          budget documents and evaluation reports, and write here to make sense of them. My interest
          is narrow and stubborn: the distance between a scheme as written and a scheme as received.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} suffix={s.suffix} />
        ))}
      </div>

      <section className="mt-24">
        <SectionHeading eyebrow="Academic journey" title="Where I’ve been studying" />
        <div className="mt-10">
          <Timeline items={academicJourney} />
        </div>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Areas of interest" title="What I keep coming back to" />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {interests.map((i) => (
              <span
                key={i}
                className="rounded-2xl border border-border/70 bg-card px-3.5 py-2 text-sm text-foreground/80 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/40"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="Skills" title="How I work" />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-2xl bg-secondary px-3.5 py-2 text-sm text-secondary-foreground transition-all duration-300 hover:-translate-y-0.5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Research interests"
          title="Three questions I’m working on"
          description="Each of these started as a blog post and refused to end there."
        />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {researchInterests.map((r) => (
            <StaggerItem key={r.title} className="h-full">
              <div className="h-full rounded-3xl border border-border/70 bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-sage/40 hover:shadow-lift">
                <h3 className="text-lg leading-snug">{r.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="mt-24">
        <SectionHeading eyebrow="Competitions" title="Cases, committees and papers" />
        <div className="mt-10">
          <Timeline items={competitions} />
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading eyebrow="Leadership" title="Groups I help run" />
        <div className="mt-10">
          <Timeline items={leadership} />
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading eyebrow="Awards & achievements" title="Recognition along the way" />
        <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
          {awards.map((a) => (
            <StaggerItem key={a.title} className="h-full">
              <AchievementCard title={a.title} year={a.year} detail={a.detail} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
