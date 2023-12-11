import { GameRoomEntity } from "../entity/GameRoomEntity";

interface Props {
  rooms: GameRoomEntity[];
  onRoomSelect: (room: GameRoomEntity) => void;
}

export function GameRoomList({ rooms, onRoomSelect }: Props) {
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <button onClick={() => onRoomSelect(room)}>{room.name}</button>
        </li>
      ))}
    </ul>
  );
}
