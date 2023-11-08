import { Publisher } from "./Publisher";

export class ReactiveModel extends Publisher {
  effect?(): void;
  id?: string;

  constructor() {
    super();
  }

  spreadReactivity(model: ReactiveModel) {
    model.notify = this.notify.bind(this);
  }

  override notify() {
    super.notify();
    this.effect?.();
  }
}
