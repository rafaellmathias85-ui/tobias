const GITHUB_OWNER = "rafaellmathias85-ui";
const GITHUB_REPO = "tobias";

export const BLOG_PATH = "nextjs_space/content/blog.json";
export const GALLERY_PATH = "nextjs_space/content/gallery.json";
export const PAT_KEY = "admin_github_pat";

export function getStoredPat(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(PAT_KEY) ?? "";
}

export async function readGithubFile(path: string, pat: string) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `GitHub API error: ${res.status}`);
  }
  const data = await res.json() as { content: string; sha: string };
  const content = JSON.parse(atob(data.content.replace(/\n/g, "")));
  return { content, sha: data.sha };
}

export async function writeGithubFile(
  path: string,
  content: unknown,
  sha: string,
  pat: string,
  message: string
) {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({ message, content: encoded, sha }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { message?: string };
    throw new Error(err.message ?? `GitHub API error: ${res.status}`);
  }
}
