import type {
    ISignalEvent,
    ISignalEvents,
    ISignalEntries,
    ISignalListenOption
} from "./types";

export class SignalEvent<I, B> implements ISignalEvent<I, B> {

    #options: ISignalListenOption<I, B>[] = [];

    #status: boolean = false;

    #signalable: I

    constructor( signalable: I ) { 

        this.#signalable = signalable
        
    }

    get signalable(): I{

        return this.#signalable
        
    }

    listen(options: ISignalListenOption<I, B>) {

        this.#options.push(options)

        return this;

    }

    dispatch(details: B[keyof B]) {

        for (let index = 0; index < this.#options.length; index++) {

            const option = this.#options[index];

            if (this.#status) break;

            if(typeof option == "function") option({

                signal: this,

                signalable: this.signalable,

                details,

            })


        }

        return this;

    }

    cancel() { return this.status(false); }

    status(status: boolean) {

        this.#status = status;

        return this;

    }

    option(index: number): ISignalListenOption<I, B> {

        return this.#options[index] || undefined

    }

    get options(): ISignalListenOption<I, B>[] {

        return this.#options

    }
}


export default class SignalEvents<I, B> implements ISignalEvents<I, B>{

    #entries: ISignalEntries<I, B> = {} as ISignalEntries<I, B>

    #signalable: I

    constructor( signalable: I ) { 

        this.#signalable = signalable
        
    }

    get signalable(): I{

        return this.#signalable
        
    }

    listen(type: keyof B, callback: ISignalListenOption<I, B>) {

        this.#entries[type] = this.#entries[type] || (new SignalEvent<I, B>(this.signalable))

        this.#entries[type].listen(callback)

        return this;

    }

    dispatch(type: keyof B, details: B[keyof B]) {

        if (this.#entries[type]) {

            this.#entries[type].dispatch(details)

        }

        return this;

    }

    reset(): this {

        this.#entries = {} as ISignalEntries<I, B>

        return this;

    }

    entry(type: keyof B): ISignalEntries<I, B>[keyof B] {

        return this.#entries[type] || undefined

    }

    get entries(): ISignalEntries<I, B> {

        return this.#entries

    }

}