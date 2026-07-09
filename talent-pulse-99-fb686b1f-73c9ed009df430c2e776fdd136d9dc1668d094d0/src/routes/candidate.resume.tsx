import { createFileRoute } from "@tanstack/react-router";
import { FileText, Upload, Trash2, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/candidate/resume")({
  head: () => ({ meta: [{ title: "Resume — SmartRecruit" }] }),
  component: ResumePage,
});

function ResumePage() {
  const { user, profile, refreshProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const uploadFile = async (file: File) => {
    if (!user) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5 MB"); return; }
    setBusy(true);
    // remove existing
    if (profile?.resume_url) {
      const oldPath = profile.resume_url;
      await supabase.storage.from("resumes").remove([oldPath]);
    }
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from("resumes").upload(path, file, { upsert: true });
    if (upErr) { toast.error(upErr.message); setBusy(false); return; }
    const { error: pErr } = await supabase.from("profiles").update({
      resume_name: file.name,
      resume_url: path,
      resume_uploaded_at: new Date().toISOString(),
    }).eq("id", user.id);
    setBusy(false);
    if (pErr) { toast.error(pErr.message); return; }
    await refreshProfile();
    toast.success("Resume uploaded");
  };

  const remove = async () => {
    if (!user || !profile?.resume_url) return;
    setBusy(true);
    await supabase.storage.from("resumes").remove([profile.resume_url]);
    await supabase.from("profiles").update({ resume_name: null, resume_url: null, resume_uploaded_at: null }).eq("id", user.id);
    setBusy(false);
    await refreshProfile();
    toast.success("Resume removed");
  };

  const download = async () => {
    if (!profile?.resume_url) return;
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(profile.resume_url, 60);
    if (error || !data) { toast.error("Could not open resume"); return; }
    window.open(data.signedUrl, "_blank");
  };

  return (
    <DashboardLayout role="candidate" title="Resume">
      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardContent className="p-6">
          <h2 className="font-semibold">Current Resume</h2>
          {profile?.resume_name ? (
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-border p-4">
              <FileText className="h-10 w-10 text-primary" />
              <div className="flex-1">
                <button onClick={download} className="font-medium text-primary hover:underline">{profile.resume_name}</button>
                <p className="text-xs text-muted-foreground">
                  Uploaded {profile.resume_uploaded_at ? new Date(profile.resume_uploaded_at).toLocaleDateString() : "—"}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => fileRef.current?.click()} disabled={busy} title="Replace"><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={remove} disabled={busy} title="Delete"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">No resume uploaded yet.</p>
          )}
        </CardContent></Card>

        <Card><CardContent className="p-6">
          <h2 className="font-semibold">{profile?.resume_name ? "Replace Resume" : "Upload Resume"}</h2>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary hover:bg-primary-soft/30">
            <Upload className="h-8 w-8 text-primary" />
            <p className="text-sm font-medium">Drop your PDF/DOCX or click to upload</p>
            <p className="text-xs text-muted-foreground">Max 5 MB · ATS-friendly PDF recommended</p>
            <input ref={fileRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.currentTarget.value = ""; }} />
          </label>
        </CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
