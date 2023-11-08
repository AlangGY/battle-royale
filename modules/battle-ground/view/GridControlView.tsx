import { flex, hstack, vstack } from "@/styled-system/patterns";

interface Props {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
}

export function GridControlView({
  width,
  height,
  onWidthChange,
  onHeightChange,
}: Props) {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) {
      return;
    }
    onWidthChange(Number(e.target.value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) {
      return;
    }
    onHeightChange(Number(e.target.value));
  };

  return (
    <div className={vstack()}>
      <h1>GridController</h1>
      <label
        className={hstack({
          gap: "8px",
        })}
      >
        Width
        <input type="number" value={width} onChange={handleWidthChange} />
      </label>
      <label
        className={hstack({
          gap: "8px",
        })}
      >
        Height
        <input type="number" value={height} onChange={handleHeightChange} />
      </label>
    </div>
  );
}
