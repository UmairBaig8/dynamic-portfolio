import { createClient } from "@/lib/supabase/server";
import ProjectForm from "@/components/ProjectForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditProject({ params }) {
  const supabase = await createClient();
  const { data: project } = await supabase.from("projects").select("*").eq("id", params.id).single();
  if (!project) notFound();

  return (
    <div>
      <div className="eyebrow">edit</div>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>{project.title}</h1>
      <ProjectForm project={project} />
    </div>
  );
}
