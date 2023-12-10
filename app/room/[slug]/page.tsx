"use client";

import { flex, vstack } from "@/styled-system/patterns";
import { css } from "@/styled-system/css";
import { BattleGround } from "@/modules/battle-ground/feature/BattleGround";
import { useGameEngine } from "@/modules/engine/hook/useGameEngine";
import { nanoid } from "nanoid";
import { GameRoom } from "@/modules/game-room/model/GameRoom";
import { useReactiveModel } from "@/modules/reactive-model/useReactiveModel";
import { Player } from "@/modules/player/model/Player";
import { Coordinate } from "@/modules/engine/model/Coordinate";
import { RoundAction } from "@/modules/action/RoundAction";
import { randomHexColor } from "@/modules/util/randomColor";

const gameRoom = new GameRoom();

export default function Home() {
  useReactiveModel(gameRoom);
  const {
    grid,
    battleShipSet,
    missileQueue,
    handleRoundAction,
    createBattleShipForPlayer,
    controlPlayer,
    setControlPlayer,
  } = useGameEngine({ gameRoom });

  // if (gameRoom.status === "waiting") {
  //   return <StartScene onGameStart={gameRoom.start} />;
  // }

  const handleRequestAttack = (coordinate: Coordinate) => {
    if (!controlPlayer) return;
    gameRoom.playStatus.enqueueRoundAction(
      new RoundAction("attack", {
        player: controlPlayer,
        coordinate,
      })
    );
  };

  const handleRequestMove = (coordinate: Coordinate) => {
    if (!controlPlayer) return;
    gameRoom.playStatus.enqueueRoundAction(
      new RoundAction("move", {
        player: controlPlayer,
        coordinate,
      })
    );
  };

  const handleAction = () => {
    const roundActionQueue = gameRoom.playStatus.roundActionQueue;
    const intervalId = setInterval(() => {
      if (roundActionQueue.length === 0) {
        clearInterval(intervalId);
        return;
      }
      const roundAction = roundActionQueue.shift();
      if (roundAction) {
        handleRoundAction(roundAction);
      }
    }, 200);
  };

  return (
    <main className={vstack()}>
      <div
        className={css({
          height: "80vh",
          aspectRatio: "1/1",
        })}
      >
        <BattleGround
          grid={grid}
          ships={battleShipSet}
          myShip={controlPlayer?.battleShip}
          missiles={missileQueue}
          onRequestAttack={handleRequestAttack}
          onRequestMove={handleRequestMove}
        />
      </div>
      <div
        className={flex({
          gap: 5,
        })}
      >
        <button
          style={{
            backgroundColor:
              grid.actionMode === "attack"
                ? "rgba(255,0,0,0.6)"
                : "transparent",
          }}
          onClick={() => grid.setActionMode("attack")}
        >
          Attack
        </button>
        <button
          style={{
            backgroundColor:
              grid.actionMode === "move" ? "rgba(0,0,255,0.6)" : "transparent",
          }}
          onClick={() => grid.setActionMode("move")}
        >
          Move
        </button>
        <button onClick={handleAction}>Action</button>
      </div>
      <div
        className={flex({
          gap: 5,
        })}
      >
        <button
          onClick={() => {
            if (gameRoom.players.getMe()) return;
            const player = new Player({
              id: nanoid(),
              name: "Alang",
              color: randomHexColor(),
              isMe: true,
            });
            createBattleShipForPlayer(player);
            gameRoom.players.addPlayer(player);
          }}
        >
          Create Player(me)
        </button>
        <button
          onClick={() => {
            const player = new Player({
              id: nanoid(),
              name: "Computer",
              color: randomHexColor(),
            });
            createBattleShipForPlayer(player);
            gameRoom.players.addPlayer(player);
          }}
        >
          Create Player
        </button>
        <button onClick={() => setControlPlayer(gameRoom.players.getMe()!)}>
          Set Control Ship (Me)
        </button>
        <button
          onClick={() => setControlPlayer([...gameRoom.players.players][1])}
        >
          Set Control Ship (Computer)
        </button>
      </div>
    </main>
  );
}
