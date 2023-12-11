export interface RoomResponse {
  id: number;
  name: string;
  created_at: string;
  players: any[];
}

export const isRoomResponse = (obj: any): obj is RoomResponse => {
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.created_at === "string" &&
    Array.isArray(obj.players)
  );
};
