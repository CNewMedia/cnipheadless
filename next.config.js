/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.storyblok.com'],
  },
  env: {
    STORYBLOK_TOKEN: process.env.STORYBLOK_TOKEN,
  },
}

module.exports = nextConfig
```

### Stap 5: Fix de 404 Error

De 404 op `/home` suggereert dat je routing niet goed is. Voor Next.js met Storyblok:

**Optie A**: Als je App Router gebruikt (`app/` directory):
```
app/
  [slug]/
    page.tsx
```

**Optie B**: Als je Pages Router gebruikt (`pages/` directory):
```
pages/
  [slug].tsx
  of
  [[...slug]].tsx
