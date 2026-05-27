export default interface IPeripheral<TConfig = unknown, TState = unknown> {
    id: number;
    name: string;
    device:number;
    isOnline?: boolean;
    pending:string[];
    available_event:string[];
    available_action:string[];
    config: TConfig;
    state: TState;
}
