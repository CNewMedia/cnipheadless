// TEMP TEST – Storyblok PUBLIC (CDN) token:
const PUBLIC_FALLBACK = "9mg9DezIfshejrxIxfbAPQtt";

export const dynamic = "force-dynamic";

type SBStory = { story?: { content?: { title?: string; intro?: string } } };

async function getHome(): Promise<SBStory> {
  const token = process.env.STORYBLOK_TOKEN || PUBLIC_FALLBACK;
  const url = `https://api.storyblok.com/v2/cdn/stories/home?token=${token}&version=published&cv=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return {};
  return res.json();
}

export default async function HomePage() {
  const data = await getHome();
  const title = data.story?.content?.title ?? "Systematic Marketing Execution";
  const intro =
    data.story?.content?.intro ??
    "Maandelijkse SEO-groei. Consistente social verhalen. AI-gedreven automation.";
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p>{intro}</p>
      <a className="underline" href="/seo">→ SEO Aanvraag</a>
    </main>
  );
}
