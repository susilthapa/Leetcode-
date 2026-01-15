type Callback = (...args: any[]) => any;
type Subscription = {
  unsubscribe: () => void;
};

class EventEmitter {
  private subscriptions: Record<string, Callback[]> = {};
  subscribe(eventName: string, callback: Callback): Subscription {
    if (eventName in this.subscriptions) {
      this.subscriptions[eventName] = [
        ...this.subscriptions[eventName],
        callback,
      ];
    } else {
      this.subscriptions[eventName] = [callback];
    }
    return {
      unsubscribe: () => {
        this.subscriptions[eventName] = this.subscriptions[eventName].filter(
          (cb) => cb !== callback
        );
      },
    };
  }

  emit(eventName: string, args: any[] = []): any[] {
    return this.subscriptions[eventName]?.map((cb) => cb(...args)) ?? [];
  }

  getEvents() {
    return this.subscriptions;
  }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
