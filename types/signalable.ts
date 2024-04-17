import type { ISignalListenOption} from "./options";
import type {ISignalEntries} from "./entries";

export interface ISignalable<I, D> {

  get signalable(): I

  listen(options: ISignalListenOption<I, D>): this;

  dispatch(args: D): this;

  cancel(): this;

  status(status: boolean): this;

  option(index: number): ISignalListenOption<I, D>;

  get options(): ISignalListenOption<I, D>[];

}


export interface ISignalables<I, B> {

  get signalable(): I

  get entries(): ISignalEntries<I, B>

  listen<K extends keyof B>(type: K, callback: ISignalListenOption<I, B[K]>): this;

  dispatch<K extends keyof B>(type: K, details: B[K]): this;

  entry(type: keyof B):  ISignalEntries<I, B>[keyof B];

  reset(): this;

}
