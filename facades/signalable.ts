import {Signalables} from "../supports";


export function useSignalable<IInstance, IBlueprint>(instance: IInstance) {

  return new Signalables<IInstance, IBlueprint>(instance);

}