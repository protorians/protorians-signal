import {Signalables} from "../supports";

/**
 * Signalable on Window's object
 */
export function useGlobalSignal<B>() {

  return new Signalables<Window, B>(window)

}

