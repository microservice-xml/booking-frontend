export default interface GenericProps {
    name : string, 
    control: any,
    type? : any,
    defaultValue?: any, 
    error?: any,
    rules?: any,
    helperText? : string,
    label: string,
    disabled? : boolean,
    placeholder? : string,
    inputRef? : any,
    customClass? : any;
}