export const findIndex = (array: Array<any>, element2find: any) =>{
    array.forEach((element, index) =>{
        if(element == element2find) return index;
    });
}