declare module '@protorians/signalable/facades/document' {
  import { Signalables } from "@protorians/signalable/supports/index";
  /**
   * Signalable on Document's object
   */
  export function useDocumentSignal<B>(): Signalables<Document, B>;

}
declare module '@protorians/signalable/facades/index' {
  export * from "@protorians/signalable/facades/window";
  export * from "@protorians/signalable/facades/document";

}
declare module '@protorians/signalable/facades/signalable' {
  import { Signalables } from "@protorians/signalable/supports/index";
  export function useSignalable<IInstance, IBlueprint>(instance: IInstance): Signalables<IInstance, IBlueprint>;

}
declare module '@protorians/signalable/facades/window' {
  import { Signalables } from "@protorians/signalable/supports/index";
  /**
   * Signalable on Window's object
   */
  export function useGlobalSignal<B>(): Signalables<Window, B>;

}
declare module '@protorians/signalable/index' {
  export * from "@protorians/signalable/types/index";
  export * from "@protorians/signalable/facades/index";
  export * from "@protorians/signalable/supports/index";

}
declare module '@protorians/signalable/supports/index' {
  export * from "@protorians/signalable/supports/signalable";

}
declare module '@protorians/signalable/supports/signalable' {
  import type { ISignalable, ISignalables, ISignalEntries, ISignalListenOption } from "@protorians/signalable/types/index";
  /**
   * Signal Manager
   */
  export class Signalable<I, D> implements ISignalable<I, D> {
      #private;
      constructor(signalable: I);
      /**
       * Get the object on which the signal management is grafted
       */
      get signalable(): I;
      /**
       * Add a listener callback
       * @param options
       */
      listen(options: ISignalListenOption<I, D>): this;
      /**
       * Dispatch all listen callback
       * @param payload
       */
      dispatch(payload: D): this;
      /**
       * Cancel signal execution
       */
      cancel(): this;
      status(status: boolean): this;
      /**
       * Signal option
       * @param index
       */
      option(index: number): ISignalListenOption<I, D>;
      get options(): ISignalListenOption<I, D>[];
  }
  /**
   * Signal Managers
   */
  export class Signalables<I, B> implements ISignalables<I, B> {
      #private;
      constructor(signalable: I);
      /**
       * Get the object on which the signal management is grafted
       */
      get signalable(): I;
      /**
       * Add a listener callback
       * @param type
       * @param callback
       */
      listen<K extends keyof B>(type: K, callback: ISignalListenOption<I, B[K]>): this;
      /**
       * Dispatch all listen callback
       * @param type
       * @param payload
       */
      dispatch<K extends keyof B>(type: K, payload: B[K]): this;
      /**
       * Clean Signalable
       */
      reset(): this;
      /**
       * Get Signalable entry
       * @param type
       */
      entry(type: keyof B): ISignalEntries<I, B>[keyof B];
      /**
       * Get Signalable all entries
       */
      get entries(): ISignalEntries<I, B>;
  }

}
declare module '@protorians/signalable/types/callback' {
  import { type ISignalDispatchOption } from "@protorians/signalable/types/options";
  export type ISignalCallback<I, B> = (props: ISignalDispatchOption<I, B>) => void;

}
declare module '@protorians/signalable/types/entries' {
  import { type ISignalable } from "@protorians/signalable/types/signalable";
  export type ISignalEntries<I, B> = {
      [K in keyof B]: ISignalable<I, B[K]>;
  };

}
declare module '@protorians/signalable/types/index' {
  export * from '@protorians/signalable/types/callback';
  export * from '@protorians/signalable/types/entries';
  export * from '@protorians/signalable/types/options';
  export * from '@protorians/signalable/types/signalable';

}
declare module '@protorians/signalable/types/options' {
  import { type ISignalCallback } from "@protorians/signalable/types/callback";
  import { type ISignalable } from "@protorians/signalable/types/signalable";
  export type ISignalListenOption<I, B> = ISignalCallback<I, B>;
  export type ISignalDispatchOption<I, D> = {
      signal: ISignalable<I, D>;
      signalable: I;
      payload: D;
  };

}
declare module '@protorians/signalable/types/signalable' {
  import type { ISignalListenOption } from "@protorians/signalable/types/options";
  import type { ISignalEntries } from "@protorians/signalable/types/entries";
  export interface ISignalable<I, D> {
      get signalable(): I;
      listen(options: ISignalListenOption<I, D>): this;
      dispatch(args: D): this;
      cancel(): this;
      status(status: boolean): this;
      option(index: number): ISignalListenOption<I, D>;
      get options(): ISignalListenOption<I, D>[];
  }
  export interface ISignalables<I, B> {
      get signalable(): I;
      get entries(): ISignalEntries<I, B>;
      listen<K extends keyof B>(type: K, callback: ISignalListenOption<I, B[K]>): this;
      dispatch<K extends keyof B>(type: K, details: B[K]): this;
      entry(type: keyof B): ISignalEntries<I, B>[keyof B];
      reset(): this;
  }

}
declare module '@protorians/signalable' {
  import main = require('@protorians/signalable/index');
  export = main;
}