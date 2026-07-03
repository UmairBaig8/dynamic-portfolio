import ProjectForm from "@/components/ProjectForm";

export default function NewProject() {
  return (
    <div>
      <div className="eyebrow">new</div>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>Add project</h1>
      <ProjectForm />
    </div>
  );
}
