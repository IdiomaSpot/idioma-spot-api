export function evalBool(value: string) {
    value = value.toLowerCase();
    return value && value == "true" ? true : false;
}