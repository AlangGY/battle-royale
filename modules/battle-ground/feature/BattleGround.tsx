"use client";

import { css } from "@/styled-system/css";
import { BattleGroundGrid } from "../model/BattleGroundGrid";
import { BattleGroundGridView } from "../view/BattleGroundGridView";
import { BattleGroundShipLayerView } from "../view/BattleGroundShipLayerView";
import { BattleShip } from "@/modules/battle-ship/model/BattleShip";
import { BattleShipView } from "@/modules/battle-ship/view/BattleShipView";
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

  const clipPathForViewRange =
    myShip &&
    `ellipse(${(100 / grid.size[0]) * (myShip.viewRange + 0.5)}% ${
      (100 / grid.size[1]) * (myShip.viewRange + 0.5)
    }% at ${(100 / grid.size[0]) * (myShip.coordinate.x + 0.5)}% ${
      (100 / grid.size[1]) * (myShip.coordinate.y + 0.5)
    }%)`;

  return (
    <div className={battleGroundLayer}>
      <BattleGroundGridView
        model={grid}
        myBattleShip={myShip}
        onClick={handleGridClick}
      />
      {/* Visible only inside ViewRange Layer */}
      <BattleGroundShipLayerView
        style={{
          clipPath: clipPathForViewRange,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
      >
        {ships
          .toArray()
          .filter((ship) => ship.status !== "dead")
          .map((ship, index) => (
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
        {missiles
          ?.getMissiles()
          .filter((missile) => missile.owner !== myShip)
          .map((missile, index) => (
            <BattleGroundMissileAnimation
              key={missile.id ?? index}
              gridSize={grid.size}
              model={missile}
              onAnimationEnd={() => missile.dispatchEvent("arrival")}
            />
          ))}
      </BattleGroundShipLayerView>
      {/* always Visible Layer */}
      <BattleGroundShipLayerView>
        {ships
          .toArray()
          .filter(
            (ship) =>
              ship.status === "dead" ||
              missiles
                ?.getMissiles()
                .filter((missile) => missile.owner === myShip)
                .some((missile) =>
                  missile.targetCoordinate.isSame(ship.coordinate)
                )
          )
          .map((ship, index) => (
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
        {missiles
          ?.getMissiles()
          .filter((missile) => missile.owner === myShip)
          .map((missile, index) => (
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
