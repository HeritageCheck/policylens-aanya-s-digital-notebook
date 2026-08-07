import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { RequireAuth } from "@/components/RequireAuth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { deletePost, formatDate, getMyPosts } from "@/lib/posts";

export const Route = createFileRoute("/write/")({
  head: () => ({
    meta: [{ title: "Write — PolicyLens" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <RequireAuth>
      <WriteDashboard />
    </RequireAuth>
  ),
});

function WriteDashboard() {
  const { signOut } = useAuth();
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({ queryKey: ["my-posts"], queryFn: getMyPosts });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-posts"] }),
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-[0.16em] text-sage uppercase">
              Dashboard
            </span>
            <h1 className="mt-3 text-3xl leading-tight text-balance-tight sm:text-4xl">
              Your posts
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => signOut()}>
              Sign out
            </Button>
            <Button asChild>
              <Link to="/write/new">New post</Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

        {!isLoading && posts?.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nothing here yet — create your first post.
          </p>
        )}

        {posts?.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-soft"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(post.createdAt)}</span>
                {!post.published && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                    Draft
                  </span>
                )}
                {post.featured && (
                  <span className="rounded-full bg-sage-soft/70 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sage uppercase">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-display text-lg leading-snug">{post.title}</p>
            </div>

            <div className="flex items-center gap-2">
              {post.published && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/blogs/$postId" params={{ postId: post.id }}>
                    View
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link to="/write/$postId" params={{ postId: post.id }}>
                  Edit
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={deleteMutation.isPending}
                onClick={() => {
                  if (confirm(`Delete "${post.title}"? This can't be undone.`)) {
                    deleteMutation.mutate(post.id);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
