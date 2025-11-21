// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://cnip.be"), // later je echte domein
  title: {
    default: "CNIP | Marketing Bureau Gent | Video, SEO & Social Media",
    template: "%s | CNIP",
  },
  description:
    "Boutique marketing bureau Gent ⭐ 23 jaar expertise in video productie, SEO & social media ✓ 50K+ volgers voor Hof van Cleve ✓ 51+ keywords top 3 voor Willems Veranda ✓ HubSpot Gold Partner",
  keywords: [
    "marketing bureau gent",
    "video productie gent",
    "SEO bureau gent",
    "social media marketing",
    "marketing automation",
    "HubSpot partner",
    "boutique agency gent",
    "premium marketing",
  ],
  authors: [{ name: "CNIP" }],
  creator: "CNIP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxImagePreview: "large",
      maxSnippet: -1,
      maxVideoPreview: -1,
    },
  },
  alternates: {
    canonical: "https://cnip.be/", // mag voorlopig ook je fly-url zijn
  },
  openGraph: {
    type: "website",
    url: "https://cnip.be/",
    title: "CNIP | Marketing Bureau Gent | Video, SEO & Social Media sinds 2002",
    description:
      "Boutique marketing bureau in Gent met 23 jaar expertise. Van 0 naar 50k volgers voor Hof van Cleve. 51+ keywords top 3 voor Willems Veranda. Premium resultaten voor premium merken.",
    siteName: "CNIP",
    locale: "nl_BE",
    images: [
      {
        url: "/images/og-image.jpg", // zorg dat deze in /public/images staat
        width: 1200,
        height: 630,
        alt: "CNIP Marketing Bureau Gent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CNIP | Marketing Bureau Gent | 23 Jaar Expertise",
    description:
      "Boutique marketing bureau Gent. 50K+ volgers voor Hof van Cleve. 51+ keywords top 3. HubSpot Gold Partner.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl-BE">
      <body>{children}</body>

      {/* === JSON-LD: Organization === */}
      <Script
        id="ld-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CNIP",
            legalName: "CNIP Marketing Bureau",
            alternateName: ["CNIP Agency", "CNIP Gent", "CNIP Marketing"],
            description:
              "Boutique marketing bureau in Gent gespecialiseerd in video productie, SEO, social media en marketing automation sinds 2002. HubSpot Gold Partner met bewezen resultaten voor premium merken.",
            url: "https://cnip.be",
            logo: "https://cnip.be/images/cnip-logo.png",
            image: "https://cnip.be/images/og-image.jpg",
            foundingDate: "2002",
            founders: [
              {
                "@type": "Person",
                name: "Christophe Dejaeghere",
                jobTitle: "Founder & CEO",
              },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ottergemsesteenweg Zuid 808",
              addressLocality: "Gent",
              addressRegion: "Oost-Vlaanderen",
              postalCode: "9000",
              addressCountry: "BE",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+32-9-396-58-83",
              contactType: "Customer Service",
              email: "info@cnip.be",
              areaServed: "BE",
              availableLanguage: ["nl", "en"],
            },
            sameAs: [
              "https://linkedin.com/company/cnipagency",
              "https://instagram.com/cnip.be",
              "https://www.facebook.com/cnipagency",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "23",
              bestRating: "5",
              worstRating: "1",
            },
            slogan: "Marketing die vooruit denkt",
            knowsAbout: [
              "Video Production",
              "SEO",
              "Social Media Marketing",
              "Marketing Automation",
              "HubSpot",
              "Content Marketing",
              "Brand Strategy",
            ],
            award: [
              "HubSpot Gold Partner",
              "Google Ads Certified",
              "Cambridge Certified",
            ],
          }),
        }}
      />

      {/* === JSON-LD: Local Business === */}
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "CNIP Marketing Bureau Gent",
            image: "https://cnip.be/images/og-image.jpg",
            priceRange: "€€€",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Ottergemsesteenweg Zuid 808",
              addressLocality: "Gent",
              postalCode: "9000",
              addressCountry: "BE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "51.0259",
              longitude: "3.7009",
            },
            url: "https://cnip.be",
            telephone: "+32-9-396-58-83",
            email: "info@cnip.be",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            ],
            paymentAccepted: "Bank Transfer, Credit Card",
            currenciesAccepted: "EUR",
          }),
        }}
      />

      {/* === JSON-LD: Services === */}
      <Script
        id="ld-services"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Marketing Services",
            provider: {
              "@type": "Organization",
              name: "CNIP",
            },
            areaServed: {
              "@type": "Country",
              name: "Belgium",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Marketing Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Video Productie",
                    description:
                      "Cinema-kwaliteit video's die converteren. 500+ producties.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SEO Services",
                    description:
                      "51+ keywords top 3. Meetbare organische groei.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Social Media Marketing",
                    description:
                      "0 naar 50k volgers met authentieke content.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Marketing Automation",
                    description:
                      "HubSpot workflows en AI systemen voor €5-50M bedrijven.",
                  },
                },
              ],
            },
          }),
        }}
      />
    </html>
  );
}
