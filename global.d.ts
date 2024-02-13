declare module '@protorians/signalable/index' {
  import type { ISignalEvent, ISignalEvents, ISignalEntries, ISignalListenOption } from "@protorians/signalable/types";
  export class SignalEvent<I, B> implements ISignalEvent<I, B> {
      #private;
      constructor(signalable: I);
      get signalable(): I;
      listen(options: ISignalListenOption<I, B>): this;
      dispatch(details: B[keyof B]): this;
      cancel(): this;
      status(status: boolean): this;
      option(index: number): ISignalListenOption<I, B>;
      get options(): ISignalListenOption<I, B>[];
  }
  export default class SignalEvents<I, B> implements ISignalEvents<I, B> {
      #private;
      constructor(signalable: I);
      get signalable(): I;
      listen(type: keyof B, callback: ISignalListenOption<I, B>): this;
      dispatch(type: keyof B, details: B[keyof B]): this;
      reset(): this;
      entry(type: keyof B): ISignalEntries<I, B>[keyof B];
      get entries(): ISignalEntries<I, B>;
  }
  export function useDocumentSignal<B>(): SignalEvents<Document, any>;
  export function useGlobalSignal<B>(): SignalEvents<Window, any>;

}
declare module '@protorians/signalable/types' {
  export interface ISignalEvents<I, B> {
      get signalable(): I;
      get entries(): ISignalEntries<I, B>;
      listen(type: keyof B, callback: ISignalListenOption<I, B>): this;
      dispatch(type: keyof B, details: B[keyof B]): this;
      entry(type: keyof B): ISignalEntries<I, B>[keyof B];
      reset(): this;
  }
  export type ISignalListenOption<I, B> = ISignalCallback<I, B>;
  export type ISignalDispatchOption<I, B> = {
      signal: ISignalEvent<I, B>;
      signalable: I;
      details: B[keyof B];
  };
  export interface ISignalEvent<I, B> {
      get signalable(): I;
      listen(options: ISignalListenOption<I, B>): this;
      dispatch(args: B[keyof B]): this;
      cancel(): this;
      status(status: boolean): this;
      option(index: number): ISignalListenOption<I, B>;
      get options(): ISignalListenOption<I, B>[];
  }
  export type ISignalCallback<I, B> = (props: ISignalDispatchOption<I, B>) => void;
  export type ISignalEntries<I, B> = {
      [K in keyof B]: ISignalEvent<I, B>;
  };

}
declare module '@protorians/signalable' {
  import main = require('@protorians/signalable/index');
  export = main;
}