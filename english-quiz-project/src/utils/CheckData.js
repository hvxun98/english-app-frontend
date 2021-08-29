import { getToken } from "./GetData"

export const isLogin = () => {
    const token = getToken();
    if(token === null || token === undefined || token === 'null' || token === 'undefined'){
        return false;
    }
    return true;
}

export const checkDataInLocalStorage = (data) => {

    if(data === null || data === undefined || data === 'null' || data === 'undefined'){
        return false;
    }
    return true;
}