
export const setIteminLocalStorage = (key, value)=>{
    // console.log(value)
    if(!key || !value){
        return console.log("connot not store LS")
    }

    const valuetoStore = typeof value != "string" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valuetoStore);
}


export const getItemLocalStorage = (key)=>{
    if(!key){
        return console.log("connot not get the value from LS")
    }

    return localStorage.getItem(key);
}

export const removeItemLocalStorage = (key)=>{
    if(!key){
        return console.log("connot not get the value from LS")
    }

    return localStorage.removeItem(key);
}