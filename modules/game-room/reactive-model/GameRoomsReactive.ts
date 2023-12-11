import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";
import {
  GameRoomSubscriber,
  GameRoomsDataAccess,
} from "../data-access/GameRoomsDataAccess";
import { GameRoomEntity } from "../entity/GameRoomEntity";

export class GameRoomsReactive extends ReactiveModel {
  dataAccess = GameRoomsDataAccess;
  rooms: GameRoomEntity[] = [];

  constructor() {
    super();
  }

  private setRooms(rooms: GameRoomEntity[]) {
    this.rooms = rooms;
    this.notify();
  }

  subscribeRooms() {
    this.dataAccess.subscribe((e) => {
      switch (e.type) {
        case "insert":
          this.handleInsert(e.roomEntity);
          break;
        case "update":
          this.handleUpdate(e.roomEntity);
          break;
        case "delete":
          this.handleDelete(e.roomId);
          break;
      }
    });
  }

  private handleInsert(roomEntity: GameRoomEntity) {
    const newRooms = [...this.rooms, roomEntity];
    this.setRooms(newRooms);
  }

  private handleUpdate(roomEntity: GameRoomEntity) {
    const newRooms = this.rooms.map((room) => {
      if (room.id === roomEntity.id) {
        return roomEntity;
      } else {
        return room;
      }
    });
    this.setRooms(newRooms);
  }

  private handleDelete(id: number) {
    const newRooms = this.rooms.filter((room) => room.id !== id);
    this.setRooms(newRooms);
  }

  async fetchRooms() {
    try {
      const { rooms, error } = await this.dataAccess.get();
      if (error) throw error;
      if (!rooms) return;
      this.setRooms(rooms);
    } catch (e) {
      console.error(e);
    }
  }
}
