import { Vitals } from "@/components/Vitals";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { profile, origin } from "@/data/profile";
import "./style.scss";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "Shashank Kumar Singh · Engineering portfolio",
    template: "%s · Shashank Kumar Singh",
  },
  description: profile.introduction,
  openGraph: {
    title: profile.name,
    description: profile.introduction,
    images: ["/assets/about.webp"],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
        <Vitals />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: origin,
              sameAs: Object.values(profile.links),
              knowsAbout: ["Web development", "Artificial intelligence"],
              description: profile.introduction,
            }),
          }}
        />
      </body>
    </html>
  );
}
