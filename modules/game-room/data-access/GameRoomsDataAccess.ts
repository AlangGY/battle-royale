import { RoomsFetcher } from "@/modules/api/fetcher/RoomFetcher";
import { RoomResponse } from "@/modules/api/schemas";
import {
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import { GameRoomEntity } from "../entity/GameRoomEntity";

type InsertEvent = {
  type: "insert";
  roomEntity: GameRoomEntity;
};
type UpdateEvent = {
  type: "update";
  roomEntity: GameRoomEntity;
};
type DeleteEvent = {
  type: "delete";
  roomId: number;
};

type InsertSubscriber = (e: InsertEvent) => void;
type UpdateSubscriber = (e: UpdateEvent) => void;
type DeleteSubscriber = (e: DeleteEvent) => void;

export type GameRoomSubscriber = InsertSubscriber &
  UpdateSubscriber &
  DeleteSubscriber;

export class GameRoomsDataAccess {
  private static roomsFetcher = RoomsFetcher;

  static async get() {
    const res = await GameRoomsDataAccess.roomsFetcher.get();
    const rooms = res.rooms?.map(
      (room) => new GameRoomEntity(room.id, room.name, "waiting")
    );
    const error = res.error;

    return { rooms, error };
  }

  static subscribe(callback: GameRoomSubscriber) {
    return GameRoomsDataAccess.roomsFetcher.subscribe((e) => {
      switch (e.eventType) {
        case "INSERT":
          callback({
            type: "insert",
            roomEntity: GameRoomsDataAccess.convertInsertPayload(e),
          });
          break;
        case "UPDATE":
          callback({
            type: "update",
            roomEntity: GameRoomsDataAccess.convertUpdatePayload(e),
          });
          break;
        case "DELETE":
          callback({
            type: "delete",
            roomId: GameRoomsDataAccess.convertDeletePayload(e),
          });
          break;
      }
    });
  }

  private static convertInsertPayload(
    e: RealtimePostgresInsertPayload<RoomResponse>
  ) {
    return new GameRoomEntity(e.new.id, e.new.name, "waiting");
  }

  private static convertUpdatePayload(
    e: RealtimePostgresUpdatePayload<RoomResponse>
  ) {
    return new GameRoomEntity(e.new.id, e.new.name, "waiting");
  }

  private static convertDeletePayload(
    e: RealtimePostgresDeletePayload<RoomResponse>
  ) {
    return e.old.id ?? 0;
  }
}
