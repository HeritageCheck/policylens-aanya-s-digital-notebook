import { supabase } from "@/lib/supabase";

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

export type Post = {
  id: string;
  title: string;
  description: string;
  category: Category;
  coverUrl: string | null;
  readingTime: string;
  content: string;
  featured: boolean;
  published: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export type PostInput = {
  title: string;
  description: string;
  category: Category;
  coverUrl: string | null;
  content: string;
  featured: boolean;
  published: boolean;
};

type PostRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  cover_url: string | null;
  reading_time: string;
  content: string;
  featured: boolean;
  published: boolean;
  author_id: string;
  created_at: string;
  updated_at: string;
};

const fromRow = (row: PostRow): Post => ({
  id: row.id,
  title: row.title,
  description: row.description,
  category: row.category as Category,
  coverUrl: row.cover_url,
  readingTime: row.reading_time,
  content: row.content,
  featured: row.featured,
  published: row.published,
  authorId: row.author_id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/** Used to build heading ids for the article's table of contents — not for post identity. */
export const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const estimateReadingTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getPublishedPosts failed:", error.message);
    return [];
  }
  return (data as PostRow[]).map(fromRow);
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("getFeaturedPosts failed:", error.message);
    return [];
  }
  return (data as PostRow[]).map(fromRow);
}

export async function getPublishedPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("getPublishedPostById failed:", error.message);
    return null;
  }
  return data ? fromRow(data as PostRow) : null;
}

export async function getAdjacentPosts(id: string) {
  const posts = await getPublishedPosts();
  const i = posts.findIndex((p) => p.id === id);
  return {
    prev: i > 0 ? posts[i - 1] : undefined,
    next: i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined,
  };
}

export async function getMyPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as PostRow[]).map(fromRow);
}

export async function createPost(input: PostInput, authorId: string): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      description: input.description,
      category: input.category,
      cover_url: input.coverUrl,
      reading_time: estimateReadingTime(input.content),
      content: input.content,
      featured: input.featured,
      published: input.published,
      author_id: authorId,
    })
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data as PostRow);
}

export async function updatePost(id: string, input: PostInput): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .update({
      title: input.title,
      description: input.description,
      category: input.category,
      cover_url: input.coverUrl,
      reading_time: estimateReadingTime(input.content),
      content: input.content,
      featured: input.featured,
      published: input.published,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return fromRow(data as PostRow);
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? fromRow(data as PostRow) : null;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
}
