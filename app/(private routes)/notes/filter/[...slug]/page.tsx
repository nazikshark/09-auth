import type { Metadata } from "next";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || "all";
  const title = `Notes: ${tag}`;
  const description = `Filtered notes by tag ${tag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notes-app.vercel.app/notes/filter/${tag}`,
      images: [{ url: "https://notes-app.vercel.app/og-image.png" }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] || "all";
  const page = Number(slug[1]) || 1;

  return <NotesClient tag={tag} initialPage={page} />;
}