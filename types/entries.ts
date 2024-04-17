import {type ISignalable} from "./signalable";

export type ISignalEntries<I, B> = {

  [K in keyof B]: ISignalable<I, B[K]>

}


