import {type ISignalCallback} from "./callback";
import {type ISignalable} from "./signalable";

export type ISignalListenOption<I, B> = ISignalCallback<I, B>

export type ISignalDispatchOption<I, D> = {

  signal: ISignalable<I, D>;

  signalable: I;

  payload: D;

}

