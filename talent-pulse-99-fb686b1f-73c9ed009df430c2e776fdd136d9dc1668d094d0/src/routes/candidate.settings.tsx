import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Save, Plus, X, Camera } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/candidate/settings")({
  head: () => ({ meta: [{ title: "Profile Settings — SmartRecruit" }] }),
  component: SettingsPage,
});

interface Project { name: string; tech: string; desc: string }
interface Internship { role: string; company: string; duration: string; desc: string }

function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    gender: "",
    dob: "",
    qualification: "",
    college: "",
    cgpa: "",
    experience: "",
    is_fresher: true,
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [langInput, setLangInput] = useState("");
  const [certificates, setCertificates] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setForm({
      full_name: profile.full_name ?? "",
      phone: profile.phone ?? "",
      gender: profile.gender ?? "",
      dob: profile.dob ?? "",
      qualification: profile.qualification ?? "",
      college: profile.college ?? "",
      cgpa: profile.cgpa ?? "",
      experience: profile.experience ?? "",
      is_fresher: profile.is_fresher ?? true,
    });
    setSkills(profile.skills ?? []);
    setLanguages(profile.languages ?? []);
    setCertificates(profile.certificates ?? []);
    setProjects(profile.projects ?? []);
    setInternships(profile.internships ?? []);
  }, [profile]);

  const addTag = (val: string, list: string[], set: (v: string[]) => void, clear: () => void) => {
    const v = val.trim();
    if (!v || list.includes(v)) return;
    set([...list, v]);
    clear();
  };

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      ...form,
      dob: form.dob || null,
      skills,
      languages,
      certificates,
      projects: projects as any,
      internships: internships as any,
    }).eq("id", user.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refreshProfile();
    toast.success("Profile saved");
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    const path = `${user.id}/${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (upErr) { setUploadingAvatar(false); toast.error(upErr.message); return; }
    const { data: signed } = await supabase.storage.from("avatars").createSignedUrl(path, 60 * 60 * 24 * 365);
    const url = signed?.signedUrl ?? null;
    const { error: dbErr } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
    setUploadingAvatar(false);
    if (dbErr) { toast.error(dbErr.message); return; }
    await refreshProfile();
    toast.success("Profile photo updated");
  };

  return (
    <DashboardLayout role="candidate" title="Profile Settings">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2"><CardContent className="p-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20">
              {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt="avatar" />}
              <AvatarFallback>{(profile?.full_name ?? "U").split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Profile photo</h2>
              <p className="text-sm text-muted-foreground">JPG or PNG. Appears in your dashboard and applications.</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
              <Button className="mt-2" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploadingAvatar}>
                <Camera className="mr-2 h-4 w-4" />{uploadingAvatar ? "Uploading…" : profile?.avatar_url ? "Change photo" : "Upload photo"}
              </Button>
            </div>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6 space-y-4">
          <h2 className="font-semibold">Personal details</h2>
          <div>
            <Label htmlFor="full_name">Full name</Label>
            <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" placeholder="e.g. Fresher / 1 year" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value, is_fresher: /fresher|0\s*y/i.test(e.target.value) })} />
            </div>
          </div>
        </CardContent></Card>

        <Card><CardContent className="p-6 space-y-4">
          <h2 className="font-semibold">Education</h2>
          <div>
            <Label htmlFor="qualification">Qualification</Label>
            <Input id="qualification" placeholder="B.Tech Computer Science" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="college">College</Label>
            <Input id="college" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="cgpa">CGPA / %</Label>
            <Input id="cgpa" value={form.cgpa} onChange={(e) => setForm({ ...form, cgpa: e.target.value })} />
          </div>
        </CardContent></Card>

        <Card className="lg:col-span-2"><CardContent className="p-6 space-y-4">
          <h2 className="font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs text-primary">
                {s}
                <button type="button" onClick={() => setSkills(skills.filter(x => x !== s))}><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill (e.g. Java)" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(skillInput, skills, setSkills, () => setSkillInput("")); } }} />
            <Button type="button" variant="outline" onClick={() => addTag(skillInput, skills, setSkills, () => setSkillInput(""))}><Plus className="h-4 w-4" /></Button>
          </div>

          <h2 className="font-semibold pt-4">Languages</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                {s}
                <button type="button" onClick={() => setLanguages(languages.filter(x => x !== s))}><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={langInput} onChange={(e) => setLangInput(e.target.value)} placeholder="Add a language" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(langInput, languages, setLanguages, () => setLangInput("")); } }} />
            <Button type="button" variant="outline" onClick={() => addTag(langInput, languages, setLanguages, () => setLangInput(""))}><Plus className="h-4 w-4" /></Button>
          </div>

          <h2 className="font-semibold pt-4">Certificates</h2>
          <div className="flex flex-wrap gap-2">
            {certificates.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                {s}
                <button type="button" onClick={() => setCertificates(certificates.filter(x => x !== s))}><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={certInput} onChange={(e) => setCertInput(e.target.value)} placeholder="Add certificate name" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(certInput, certificates, setCertificates, () => setCertInput("")); } }} />
            <Button type="button" variant="outline" onClick={() => addTag(certInput, certificates, setCertificates, () => setCertInput(""))}><Plus className="h-4 w-4" /></Button>
          </div>
        </CardContent></Card>

        <Card className="lg:col-span-2"><CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Projects</h2>
            <Button type="button" size="sm" variant="outline" onClick={() => setProjects([...projects, { name: "", tech: "", desc: "" }])}><Plus className="mr-1 h-3 w-3" />Add project</Button>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="grid gap-2 rounded-lg border border-border p-3 md:grid-cols-3">
              <Input placeholder="Project name" value={p.name} onChange={(e) => setProjects(projects.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
              <Input placeholder="Tech (Java, React...)" value={p.tech} onChange={(e) => setProjects(projects.map((x, j) => j === i ? { ...x, tech: e.target.value } : x))} />
              <div className="flex gap-2">
                <Textarea rows={1} placeholder="Description" value={p.desc} onChange={(e) => setProjects(projects.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} />
                <Button type="button" size="icon" variant="ghost" onClick={() => setProjects(projects.filter((_, j) => j !== i))}><X className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </CardContent></Card>

        <Card className="lg:col-span-2"><CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Internships</h2>
            <Button type="button" size="sm" variant="outline" onClick={() => setInternships([...internships, { role: "", company: "", duration: "", desc: "" }])}><Plus className="mr-1 h-3 w-3" />Add internship</Button>
          </div>
          {internships.map((p, i) => (
            <div key={i} className="grid gap-2 rounded-lg border border-border p-3 md:grid-cols-4">
              <Input placeholder="Role" value={p.role} onChange={(e) => setInternships(internships.map((x, j) => j === i ? { ...x, role: e.target.value } : x))} />
              <Input placeholder="Company" value={p.company} onChange={(e) => setInternships(internships.map((x, j) => j === i ? { ...x, company: e.target.value } : x))} />
              <Input placeholder="Duration (Jun-Aug 2025)" value={p.duration} onChange={(e) => setInternships(internships.map((x, j) => j === i ? { ...x, duration: e.target.value } : x))} />
              <div className="flex gap-2">
                <Textarea rows={1} placeholder="What you did" value={p.desc} onChange={(e) => setInternships(internships.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} />
                <Button type="button" size="icon" variant="ghost" onClick={() => setInternships(internships.filter((_, j) => j !== i))}><X className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
        </CardContent></Card>

        <div className="lg:col-span-2 flex justify-end">
          <Button onClick={save} disabled={saving}><Save className="mr-2 h-4 w-4" />{saving ? "Saving…" : "Save profile"}</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
