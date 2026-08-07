import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/posts";
import { CategoryBadge } from "./CategoryBadge";

export function BlogCard({ blog }: { blog: Post }) {
  return (
    <Link
      to="/blogs/$postId"
      params={{ postId: blog.id }}
      className="group block break-inside-avoid overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-sage/40 hover:shadow-lift"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-secondary">
        {blog.coverUrl && (
          <img
            src={blog.coverUrl}
            alt=""
            loading="lazy"
            width={1024}
            height={640}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute top-3.5 left-3.5">
          <CategoryBadge category={blog.category} tone="glass" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(blog.createdAt)}</span>
          <span className="size-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" strokeWidth={1.75} />
            {blog.readingTime}
          </span>
        </div>

        <h3 className="mt-3 text-xl leading-snug text-balance-tight">{blog.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{blog.description}</p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sage">
          Continue reading
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
