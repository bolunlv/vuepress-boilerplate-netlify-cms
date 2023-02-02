class Ro {
  _ro: ResizeObserver;
  cbs: Map<Element, (entry: ResizeObserverEntry) => void> = new Map();

  observe(el: Element, cb: (entry: ResizeObserverEntry) => void, options?: ResizeObserverOptions) {
    if (this.cbs.has(el)) {
      if (import.meta.env.DEV) {
        throw Error('dom已被监听');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
      }
    }
    this.cbs.set(el, cb);
    this.ro.observe(el, options);
    return () => {
      if (this.cbs.has(el)) {
        this.ro.unobserve(el);
        this.cbs.delete(el);
        if (!this.cbs.size) {
          this.ro.disconnect();
          this._ro = null;
        }
      }
    };
  }

  callback(entries: ResizeObserverEntry[]) {
    entries.forEach(x => {
      const el = x.target;
      const cb = this.cbs.get(el);
      cb?.(x);
    });
  }

  get ro() {
    return this._ro || (this._ro = new ResizeObserver(this.callback.bind(this)));
  }
}

export const $ro = new Ro();
