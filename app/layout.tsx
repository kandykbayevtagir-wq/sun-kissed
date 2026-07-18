import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SITE_CONFIG } from "./site-config";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const metadataBase = new URL(origin);
  const socialImage = new URL("/og.jpg", metadataBase).toString();

  return {
    metadataBase,
    title: {
      default: "Sun Kissed — The Union of the Sun Kissed",
      template: "%s — Sun Kissed",
    },
    description: SITE_CONFIG.description,
    applicationName: SITE_CONFIG.name,
    keywords: [
      "Sun Kissed",
      "Discord community",
      "fictional lore",
      "community rules",
      "solar worldbuilding",
    ],
    authors: [{ name: "Sun Kissed" }],
    creator: "Sun Kissed",
    alternates: { canonical: origin },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_CONFIG.name,
      url: origin,
      title: "Sun Kissed — The Union of the Sun Kissed",
      description: SITE_CONFIG.description,
      images: [
        {
          url: socialImage,
          width: 1730,
          height: 909,
          alt: "Sun Kissed — an enormous amber Sun approaching through deep space",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sun Kissed — The Union of the Sun Kissed",
      description: SITE_CONFIG.description,
      images: [socialImage],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#060504",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
