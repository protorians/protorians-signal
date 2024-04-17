import {type ISignalDispatchOption} from "./options";

export type ISignalCallback<I, B> = (props: ISignalDispatchOption<I, B>) => void
