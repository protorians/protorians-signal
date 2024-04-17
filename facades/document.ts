import {Signalables} from "../supports";

/**
 * Signalable on Document's object
 */
export function useDocumentSignal<B>() {

  return new Signalables<Document, B>(document)

}
