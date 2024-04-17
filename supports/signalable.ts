import type {
  ISignalable,
  ISignalables,
  ISignalEntries,
  ISignalListenOption
} from "../types";

/**
 * Signal Manager
 */
export class Signalable<I, D> implements ISignalable<I, D> {

  #options: ISignalListenOption<I, D>[] = [];

  #status: boolean = true;

  #signalable: I;

  constructor(signalable: I) {

    this.#signalable = signalable

  }

  /**
   * Get the object on which the signal management is grafted
   */
  get signalable(): I {

    return this.#signalable

  }

  /**
   * Add a listener callback
   * @param options
   */
  listen(options: ISignalListenOption<I, D>) {

    this.#options.push(options)

    return this;

  }

  /**
   * Dispatch all listen callback
   * @param payload
   */
  dispatch(payload: D) {

    const status = this.#status;

    for (let index = 0; index < this.#options.length; index++) {

      const option = this.#options[index];

      if (!this.#status) break;

      if (typeof option == "function") option({

        signal: this,

        signalable: this.signalable,

        payload,

      })


    }

    this.status(status)

    return this;

  }

  /**
   * Cancel signal execution
   */
  cancel() {
    return this.status(false);
  }

  status(status: boolean) {

    this.#status = status;

    return this;

  }

  /**
   * Signal option
   * @param index
   */
  option(index: number): ISignalListenOption<I, D> {

    return this.#options[index] || undefined

  }

  get options(): ISignalListenOption<I, D>[] {

    return this.#options

  }
}


/**
 * Signal Managers
 */
export class Signalables<I, B> implements ISignalables<I, B> {

  #entries: ISignalEntries<I, B> = {} as ISignalEntries<I, B>

  #signalable: I

  constructor(signalable: I) {

    this.#signalable = signalable

  }

  /**
   * Get the object on which the signal management is grafted
   */
  get signalable(): I {

    return this.#signalable

  }

  /**
   * Add a listener callback
   * @param type
   * @param callback
   */
  listen<K extends keyof B>(type: K, callback: ISignalListenOption<I, B[K]>): this {

    this.#entries[type] = this.#entries[type] || (new Signalable<I, B[keyof B]>(this.signalable))

    this.#entries[type].listen(callback)

    return this;

  }

  /**
   * Dispatch all listen callback
   * @param type
   * @param payload
   */
  dispatch<K extends keyof B>(type: K, payload: B[K]): this {

    if (this.#entries[type]) {

      this.#entries[type].dispatch(payload)

    }

    return this;

  }

  /**
   * Clean Signalable
   */
  reset(): this {

    this.#entries = {} as ISignalEntries<I, B>

    return this;

  }

  /**
   * Get Signalable entry
   * @param type
   */
  entry(type: keyof B): ISignalEntries<I, B>[keyof B] {

    return this.#entries[type] || undefined

  }

  /**
   * Get Signalable all entries
   */
  get entries(): ISignalEntries<I, B> {

    return this.#entries

  }

}

