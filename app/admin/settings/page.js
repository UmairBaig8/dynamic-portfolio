import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/SettingsForm";

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <div>
      <div className="eyebrow">site</div>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>Settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
