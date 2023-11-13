import { RoundAction } from "@/modules/action/RoundAction";
import { ReactiveModel } from "@/modules/reactive-model/ReactiveModel";

type TurnType = "standby" | "action-choice" | "action-result";

export class PlayStatus extends ReactiveModel {
  public round: number = 0;
  public turn: TurnType = "standby";
  public roundActionQueue: RoundAction[] = [];

  constructor() {
    super();
  }

  nextRound() {
    this.round += 1;
    this.initializeRound();
    this.notify();
  }

  nextTurn() {
    if (this.turn === "standby") {
      this.turn = "action-choice";
    } else if (this.turn === "action-choice") {
      this.turn = "action-result";
    } else if (this.turn === "action-result") {
      this.turn = "standby";
    }
    this.notify();
  }

  initializeRound() {
    this.turn = "standby";
    this.notify();
  }

  enqueueRoundAction(roundAction: RoundAction) {
    this.roundActionQueue.push(roundAction);
    this.notify();
  }

  dequeueRoundAction() {
    const roundAction = this.roundActionQueue.shift();
    this.notify();
    return roundAction;
  }

  clearRoundActionQueue() {
    this.roundActionQueue = [];
    this.notify();
  }
}
