import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/PostForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditPost({ params }) {
  const supabase = createClient();
  const { data: post } = await supabase.from("posts").select("*").eq("id", params.id).single();
  if (!post) notFound();

  return (
    <div>
      <div className="eyebrow">edit</div>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>{post.title}</h1>
      <PostForm post={post} />
    </div>
  );
}
