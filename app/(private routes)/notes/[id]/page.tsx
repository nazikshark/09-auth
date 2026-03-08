import type { Metadata } from "next";
import { getNoteById } from "@/lib/api/clientApi"; 
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await getNoteById(id);
    const title = `Note: ${note?.title || "Details"}`;
    const description = note?.content?.substring(0, 100) || "Note details";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notes-app.vercel.app/notes/${id}`,
        images: [{ url: "https://notes-app.vercel.app/og-image.png" }],
      },
    };
  } catch (error) {
    return {
      title: "Note Not Found",
    };
  }
}

export default function Page({ params }: Props) {
  return <NoteDetailsClient params={params} />;
}