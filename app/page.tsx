"use client";

import { GameRoomsReactive } from "@/modules/game-room/reactive-model/GameRoomsReactive";
import { GameRoomList } from "@/modules/game-room/view/GameRoomList";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { useRouter } from "next/navigation";
import { useEffectOnce } from "react-use";

const gameRooms = new GameRoomsReactive();

export default function StartPage() {
  useReactiveModel(gameRooms);
  const router = useRouter();

  useEffectOnce(() => {
    gameRooms.fetchRooms();
    return gameRooms.subscribeRooms();
  });

  return (
    <GameRoomList
      rooms={gameRooms.rooms}
      onRoomSelect={(e) => {
        console.log("room select", e);
      }}
    />
  );
}
