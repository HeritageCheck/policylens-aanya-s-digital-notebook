import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, BookOpen } from "lucide-react";
import heroArt from "@/assets/hero-illustration.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-24 size-[26rem] rounded-full bg-sage-soft/45 blur-[110px]" />
      <div className="pointer-events-none absolute top-24 -right-20 size-[22rem] rounded-full bg-beige/70 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-xs text-muted-foreground shadow-soft">
            <span className="size-1.5 rounded-full bg-sage" />
            Public policy · Research · Writing
          </span>

          <h1 className="mt-6 text-4xl leading-[1.08] text-balance-tight sm:text-5xl lg:text-6xl">
            Hi, I’m <span className="text-sage">Aanya Monga</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A student passionate about public policy, governance, research, and social impact — and
            about writing it all down clearly enough to be useful.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <BookOpen className="size-4" strokeWidth={1.9} />
              Read my writing
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/50 hover:shadow-soft"
            >
              View projects
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-border/60 bg-secondary/40 grain-bg">
            <motion.img
              src={heroArt}
              alt="Abstract illustration of books, policy documents and charts"
              width={1024}
              height={1024}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="size-full object-contain p-6"
            />
          </div>

          <motion.div
            animate={{ y: [6, -8, 6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-5 -left-4 rounded-2xl border border-border/70 glass-panel px-4 py-3 shadow-soft"
          >
            <p className="font-display text-sm">24 essays</p>
            <p className="text-xs text-muted-foreground">and counting</p>
          </motion.div>

          <motion.div
            animate={{ y: [-6, 8, -6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -top-4 right-2 rounded-2xl border border-border/70 glass-panel px-4 py-3 shadow-soft"
          >
            <p className="font-display text-sm">6 papers</p>
            <p className="text-xs text-muted-foreground">policy research</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
