import type { Metadata } from "next";

const data = {
  title: "Linkfy",
  description: "Linkfy is a free and open source URL shortener with custom domains and stats.",
  siteName: "Linkfy"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://linkfy.fr/"),

  title: {
    template: "%s - Linkfy",
    default: "Linkfy",
    absolute: data.title
  },
  description: data.description,
  applicationName: data.siteName,

  themeColor: "#0f172a",

  openGraph: {
    title: {
      template: "%s - Linkfy",
      default: "Linkfy",
      absolute: data.title
    },
    description: data.description,
    siteName: data.siteName,
    url: "https://linkfy.fr/",
    type: "website"
  },

  twitter: {
    title: {
      template: "%s - Linkfy",
      default: "Linkfy",
      absolute: data.title
    },
    description: data.description
  }
};