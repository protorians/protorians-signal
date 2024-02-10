

export interface ISignalEvents<I, B> {

    signable: I

    get entries(): ISignalEntries<I, B>

    listen(type: keyof B, callback: ISignalListenOption<I, B>): this;

    dispatch(type: keyof B, details: B[keyof B]): this;

    entry(type: keyof B): ISignalEntries<I, B>[keyof B];

    reset(): this;

}

export type ISignalListenOption<I, B> = ISignalCallback<I, B>

export type ISignalDispatchOption<I, B> = {

    signal: ISignalEvent<I, B>;

    signable: I;

    details: B[keyof B];

}


export interface ISignalEvent<I, B> {

    listen(options: ISignalListenOption<I, B>): this;

    dispatch(args: B[keyof B]): this;

    cancel(): this;

    status(status: boolean): this;

    option(index: number): ISignalListenOption<I, B>;

    get options(): ISignalListenOption<I, B>[];

}


export type ISignalCallback<I, B> = (props: ISignalDispatchOption<I, B>) => void


export type ISignalEntries<I, B> = {

    [K in keyof B]: ISignalEvent<I, B>

}