import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { PostForm } from "@/components/PostForm";
import { RequireAuth } from "@/components/RequireAuth";
import { getPostById, updatePost, type PostInput } from "@/lib/posts";

export const Route = createFileRoute("/write/$postId")({
  head: () => ({
    meta: [{ title: "Edit post — PolicyLens" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <RequireAuth>
      <EditPostPage />
    </RequireAuth>
  ),
});

function EditPostPage() {
  const { postId } = Route.useParams();
  const queryClient = useQueryClient();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });

  const handleSubmit = async (input: PostInput) => {
    await updatePost(postId, input);
    await queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    await queryClient.invalidateQueries({ queryKey: ["post", postId] });
  };

  if (isLoading) {
    return <p className="px-5 py-24 text-center text-sm text-muted-foreground">Loading…</p>;
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="text-sm text-muted-foreground">That post doesn't exist.</p>
        <Link to="/write" className="mt-4 inline-block text-sm text-sage hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <h1 className="text-3xl leading-tight text-balance-tight sm:text-4xl">Edit post</h1>
        <div className="mt-10">
          <PostForm post={post} onSubmit={handleSubmit} submitLabel="Save changes" />
        </div>
      </Reveal>
    </div>
  );
}
