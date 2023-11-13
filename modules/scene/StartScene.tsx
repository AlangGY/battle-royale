interface Props {
  onGameStart?: () => void;
}

export function StartScene({ onGameStart }: Props) {
  return (
    <div>
      <h1>Start Scene</h1>
      <button type="button" onClick={onGameStart}>
        Start Game
      </button>
    </div>
  );
}
