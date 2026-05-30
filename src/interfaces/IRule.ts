
export interface IRule {
    id:number,
    device:number,
    enabled:boolean,
    is_local:boolean,
    name:string|null,
    conditions?:IRuleCondition[] | null,
    actions:IRuleAction[],
    triggers:IRuleTrigger[],
}


export interface IRuleAction{
    id:number,
    order:number,
    action:string,
    device_name:string,
    peripheral_name:string,
    extra_settings:object,
}

export interface IRuleTrigger{
    id:number,
    event:string,
    description:number,
    device_name:string,
    peripheral_name:string,
    extra_settings:object,
}

export interface IRuleCondition{
    id:number,
    event:string,
    peripheral:number,
    rule:number,
    triggered:boolean,
    condition:object
}
