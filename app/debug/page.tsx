type SBStory = { story?: { content?: { title?: string; intro?: string } } };

async function probe() {
  const token = process.env.STORYBLOK_TOKEN;
  if (!token) return { token: false, ok: false, msg: "No STORYBLOK_TOKEN" };
  const url = `https://api.storyblok.com/v2/cdn/stories/home?token=${token}&version=draft`;
  try {
    const r = await fetch(url, { cache: "no-store" });
    const txt = await r.text();
    return { token: true, ok: r.ok, msg: r.ok ? "OK" : `HTTP ${r.status}`, body: txt.slice(0, 400) };
  } catch (e: any) {
    return { token: true, ok: false, msg: String(e) };
  }
}

export default async function Debug() {
  const res = await probe();
  return (
    <pre style={{ padding: 16, fontFamily: "ui-monospace" }}>
{JSON.stringify(res, null, 2)}
    </pre>
  );
}
