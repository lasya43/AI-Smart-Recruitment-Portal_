// Placeholder REST client — point baseURL to your Spring Boot service later.
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export const api = {
  // Auth
  register: (body: unknown) => request("/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: unknown) => request("/login", { method: "POST", body: JSON.stringify(body) }),
  // Jobs
  listJobs: () => request("/jobs"),
  createJob: (body: unknown) => request("/jobs", { method: "POST", body: JSON.stringify(body) }),
  updateJob: (id: string, body: unknown) => request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteJob: (id: string) => request(`/jobs/${id}`, { method: "DELETE" }),
  // Applications
  apply: (body: unknown) => request("/apply", { method: "POST", body: JSON.stringify(body) }),
  applications: () => request("/applications"),
  // Resume + AI match
  uploadResume: (body: unknown) => request("/resume/upload", { method: "POST", body: JSON.stringify(body) }),
  matchScore: (jobId: string) => request(`/matchscore?jobId=${jobId}`),
  // Misc
  companies: () => request("/companies"),
  dashboard: () => request("/dashboard"),
};
