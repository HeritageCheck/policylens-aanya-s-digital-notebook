import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PostForm } from "@/components/PostForm";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/hooks/use-auth";
import { createPost, type PostInput } from "@/lib/posts";

export const Route = createFileRoute("/write/new")({
  head: () => ({
    meta: [{ title: "New post — PolicyLens" }, { name: "robots", content: "noindex" }],
  }),
  component: () => (
    <RequireAuth>
      <NewPostPage />
    </RequireAuth>
  ),
});

function NewPostPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (input: PostInput) => {
    if (!user) return;
    await createPost(input, user.id);
    navigate({ to: "/write" });
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <h1 className="text-3xl leading-tight text-balance-tight sm:text-4xl">New post</h1>
        <div className="mt-10">
          <PostForm onSubmit={handleSubmit} submitLabel="Publish" />
        </div>
      </Reveal>
    </div>
  );
}
