import { Publisher } from "./Publisher";

export class ReactiveModel extends Publisher {
  effect?(): void;
  private _id?: string;

  constructor() {
    super();

    if (this.effect) {
      this.effect = this.effect.bind(this);
    }
  }

  spreadReactivity(model: ReactiveModel) {
    model.notify = this.notify.bind(this);
  }

  override notify() {
    super.notify();
    this.effect?.();
  }
}
