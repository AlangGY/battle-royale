import { Publisher } from "./Publisher";

export class ReactiveModel extends Publisher {
  constructor() {
    super();
  }

  spreadReactivity(model: ReactiveModel) {
    model.notify = this.notify.bind(this);
  }
}
