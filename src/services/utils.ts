export const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
}
export const isNotEmpty = (obj: object) => {
    return Object.keys(obj).length != 0;
}