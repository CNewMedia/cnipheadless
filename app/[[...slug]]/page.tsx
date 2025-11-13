import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react/rsc";

storyblokInit({
  accessToken: '9mg9DezIfshejrxIxfbAPQtt',
  use: [apiPlugin],
});

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug ? params.slug.join('/') : 'home';
  
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version: "published" });
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>{data.story.name}</h1>
      <pre>{JSON.stringify(data.story.content, null, 2)}</pre>
    </div>
  );
}
