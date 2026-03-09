"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NoteIdModalPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <h2>Нотатка {params.id}</h2>
      <p>Це перехоплений роут для перегляду окремої нотатки</p>
    </Modal>
  );
}