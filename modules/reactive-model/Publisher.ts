export class Publisher {
  subscribers: Function[];

  constructor() {
    this.subscribers = [];
  }

  addSubscriber(subscriber: Function) {
    this.subscribers.push(subscriber);
  }

  removeSubscriber(subscriberToRemove: Function) {
    this.subscribers = this.subscribers.filter(
      (subs) => subscriberToRemove !== subs
    );
  }

  protected notify() {
    this.subscribers.forEach((subs) => subs());
  }

  getSubscribers() {
    return this.subscribers;
  }
}
