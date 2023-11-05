import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundGridView } from "../view/BattleGroundGridView";
import { BattleGroundShipLayerView } from "../view/BattleGroundShipLayerView";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { BattleShipView } from "@/modules/battle-ship/view/BattleShipView";
import { Coordinate } from "@/modules/engine/model/Coordinate";

interface Props {
  grid: BattleGroundGrid;
  ships: BattleShip[];
}

export function BattleGround({ grid, ships }: Props) {
  return (
    <div className={battleGroundLayer}>
      <BattleGroundGridView model={grid} />
      <BattleGroundShipLayerView>
        {ships.map((ship) => (
          <BattleGroundShipLayerView.Item
            gridSize={grid.size}
            coordinate={ship.coordinate}
          >
            <BattleShipView {...ship} />
          </BattleGroundShipLayerView.Item>
        ))}
      </BattleGroundShipLayerView>
    </div>
  );
}

const battleGroundLayer = css({
  w: "100%",
  h: "100%",
  position: "relative",
});
