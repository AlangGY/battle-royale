"use client";

import { RoomForm } from "@/scene/StartScene";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();

  return (
    <RoomForm
      onSubmit={(e) => {
        e.preventDefault();
        const roomIdEl = e.currentTarget.elements.namedItem("room-id");
        if (roomIdEl instanceof HTMLInputElement) {
          router.push(`/room/${roomIdEl.value}`);
        }
      }}
    />
  );
}
