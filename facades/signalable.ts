import {Signalables} from "../supports";

/**
 * Create new Signalable instance
 * @param instance
 */
export function useSignalable<IInstance, IBlueprint>(instance: IInstance) {

  return new Signalables<IInstance, IBlueprint>(instance);

}