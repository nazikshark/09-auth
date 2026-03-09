"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

export default function NotesModalPage() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <h2>Всі нотатки</h2>
      <p>Це перехоплений роут для списку нотаток</p>
    </Modal>
  );
}