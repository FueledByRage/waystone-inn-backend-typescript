export function errorFactory(message:string, status: Number = 0) {
    const error = new Error(message);

    //@ts-ignore
    error.status = status == 0 ? 500 : status;
    return error;
}