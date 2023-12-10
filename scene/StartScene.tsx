import { FormEventHandler } from "react";

interface Props {
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export function RoomForm({ onSubmit }: Props) {
  return (
    <div>
      <h1>Start Game</h1>
      <form onSubmit={onSubmit}>
        <label>
          <span>Room Id</span>
          <input name="room-id" type="text" required />
        </label>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}
