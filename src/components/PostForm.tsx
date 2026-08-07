import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, type Category, type Post, type PostInput } from "@/lib/posts";

export function PostForm({
  post,
  onSubmit,
  submitLabel,
}: {
  post?: Post;
  onSubmit: (input: PostInput) => Promise<void>;
  submitLabel: string;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [description, setDescription] = useState(post?.description ?? "");
  const [category, setCategory] = useState<Category>(post?.category ?? categories[0]);
  const [coverUrl, setCoverUrl] = useState(post?.coverUrl ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [featured, setFeatured] = useState(post?.featured ?? false);
  const [published, setPublished] = useState(post?.published ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !description.trim() || !content.trim()) {
      setError("Title, description and content are all required.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        category,
        coverUrl: coverUrl.trim() || null,
        content,
        featured,
        published,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description (shown on the blog card)</Label>
        <Textarea
          id="description"
          required
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger id="category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cover">Cover image URL (optional)</Label>
          <Input
            id="cover"
            type="url"
            placeholder="https://…"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={featured} onCheckedChange={(v) => setFeatured(v === true)} />
          Feature on homepage
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox checked={published} onCheckedChange={(v) => setPublished(v === true)} />
          Published (visible to everyone)
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Content (Markdown)</Label>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="text-xs font-medium text-sage hover:underline"
          >
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>

        {showPreview ? (
          <div className="prose-article min-h-[16rem] rounded-md border border-input px-4 py-3">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "*Nothing yet.*"}</ReactMarkdown>
          </div>
        ) : (
          <Textarea
            id="content"
            required
            rows={18}
            className="font-mono text-sm"
            placeholder={"Write in Markdown — ## for headings, > for quotes, - for lists."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
