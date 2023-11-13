"use client";

import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundGridView } from "../view/BattleGroundGridView";
import { BattleGroundShipLayerView } from "../view/BattleGroundShipLayerView";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { BattleShipView } from "@/modules/battle-ship/view/BattleShipView";
import { Missile } from "@/modules/missile/model/Missile";
import { BattleGroundMissileAnimation } from "../view/BattleGroundMissileAnimation";
import { MissileQueue } from "@/modules/engine/model/MissileQueue";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { BattleShipSet } from "@/modules/engine/model/BattleShipSet";

interface Props {
  grid: BattleGroundGrid;
  ships: BattleShipSet;
  myShip?: BattleShip;
  missiles?: MissileQueue;
  onRequestAttack?: (coordinate: Coordinate) => void;
  onRequestMove?: (coordinate: Coordinate) => void;
}

export function BattleGround({
  grid,
  ships,
  myShip,
  missiles,
  onRequestAttack,
  onRequestMove,
}: Props) {
  const handleGridClick = (coordinate: Coordinate) => {
    switch (grid.actionMode) {
      case "attack":
        onRequestAttack?.(coordinate);
        break;
      case "move":
        onRequestMove?.(coordinate);
    }
  };

  return (
    <div className={battleGroundLayer}>
      <BattleGroundGridView
        model={grid}
        myBattleShip={myShip}
        onClick={handleGridClick}
      />
      <BattleGroundShipLayerView>
        {ships.toArray().map((ship, index) => (
          <BattleGroundShipLayerView.Item
            key={ship.id ?? index}
            gridSize={grid.size}
            coordinate={ship.coordinate}
          >
            <BattleShipView
              model={ship}
              onDeadAnimationEnd={() => ships.removeBattleShip(ship)}
            />
          </BattleGroundShipLayerView.Item>
        ))}
        {missiles?.getMissiles().map((missile, index) => (
          <BattleGroundMissileAnimation
            key={missile.id ?? index}
            gridSize={grid.size}
            model={missile}
            onAnimationEnd={() => missile.dispatchEvent("arrival")}
          />
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
