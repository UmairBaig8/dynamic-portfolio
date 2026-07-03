import PostForm from "@/components/PostForm";

export default function NewPost() {
  return (
    <div>
      <div className="eyebrow">new</div>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>Write a post</h1>
      <PostForm />
    </div>
  );
}
